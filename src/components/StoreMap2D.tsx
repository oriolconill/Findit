import React, { useMemo } from 'react';
import { Minus, Plus } from 'lucide-react';
import { STORES } from '../data/stores';
import { GridPoint, MapZone, StoreId } from '../types';
import { findGridPath } from '../utils/navigationEngine';

export interface MultiStopPin {
  zone: MapZone;
  index: number;
  found: boolean;
  label: string;
}

interface StoreMap2DProps {
  storeId: StoreId;
  title: string;
  targetZone?: MapZone | null;
  singlePath?: GridPoint[] | null;
  multiStops?: MultiStopPin[] | null;
  zoom: number;
  onZoomChange: (delta: number) => void;
  legendMode?: 'single' | 'multi' | 'general';
}

export const StoreMap2D: React.FC<StoreMap2DProps> = ({
  storeId,
  title,
  targetZone = null,
  singlePath = null,
  multiStops = null,
  zoom,
  onZoomChange,
  legendMode = 'single',
}) => {
  const store = STORES[storeId];
  const { cols, rows, zones } = store.map;
  const cell = 28;
  const W = cols * cell;
  const H = rows * cell;

  const pathPointsString = useMemo(() => {
    const toPx = (pt: GridPoint) => `${(pt.x + 0.5) * cell},${(pt.y + 0.5) * cell}`;
    if (singlePath && singlePath.length > 0) {
      return singlePath.map(toPx).join(' ');
    }
    if (multiStops && multiStops.length > 0) {
      let multiPathPoints: GridPoint[] = [];
      let cur: GridPoint = store.entrance;
      for (const stop of multiStops) {
        const seg = findGridPath(store, cur, stop.zone.approach);
        if (multiPathPoints.length > 0) seg.shift();
        multiPathPoints = multiPathPoints.concat(seg);
        cur = stop.zone.approach;
      }
      return multiPathPoints.map(toPx).join(' ');
    }
    return '';
  }, [singlePath, multiStops, store]);

  const stopPlacements = useMemo(() => {
    if (!multiStops || multiStops.length === 0) return [];
    const seenCoords: Record<string, number> = {};
    return multiStops.map((st) => {
      const key = st.zone.id;
      const offsetIdx = seenCoords[key] || 0;
      seenCoords[key] = offsetIdx + 1;
      const px = st.zone.pin.x * cell + (offsetIdx * 15 - (offsetIdx > 0 ? 7 : 0));
      const py = st.zone.pin.y * cell - offsetIdx * 8;
      return { ...st, px, py };
    });
  }, [multiStops]);

  const ex = (store.entrance.x + 0.5) * cell;
  const ey = (store.entrance.y + 0.5) * cell;

  return (
    <div className="bg-white rounded-2xl border border-[#E3E8F0] overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#E3E8F0] bg-[#F5F9FF]">
        <span className="text-xs font-bold text-[#174A91] truncate pr-2">{title}</span>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onZoomChange(-0.2)}
            disabled={zoom <= 0.8}
            aria-label="Reduir zoom del mapa"
            className="min-h-[36px] min-w-[36px] rounded-lg border border-[#E3E8F0] bg-white text-[#202A36] flex items-center justify-center hover:bg-[#F1F3F6] active:scale-95 transition disabled:opacity-40 cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-[#737B87] tabular-nums w-10 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => onZoomChange(0.2)}
            disabled={zoom >= 2.0}
            aria-label="Ampliar zoom del mapa"
            className="min-h-[36px] min-w-[36px] rounded-lg border border-[#E3E8F0] bg-white text-[#202A36] flex items-center justify-center hover:bg-[#F1F3F6] active:scale-95 transition disabled:opacity-40 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="w-full h-[340px] lg:h-[420px] overflow-auto bg-[#F8FAFC] flex items-center justify-center p-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: `${Math.round(100 * zoom)}%` }}
          className="min-w-[340px] h-auto block bg-[#F8FAFC] rounded-lg"
          role="img"
          aria-label={`Mapa 2D de ${store.name}`}
        >
          <defs>
            <pattern id={`gridPat-${storeId}`} width={cell} height={cell} patternUnits="userSpaceOnUse">
              <path d={`M ${cell} 0 L 0 0 0 ${cell}`} fill="none" stroke="#E2E8F0" strokeWidth="0.6" />
            </pattern>
          </defs>

          <rect x="0" y="0" width={W} height={H} fill={`url(#gridPat-${storeId})`} />
          <rect x="2" y="2" width={W - 4} height={H - 4} fill="none" stroke="#94A3B8" strokeWidth="3" rx="8" />

          {zones.map((z) => {
            const isTarget = targetZone && targetZone.id === z.id;
            return (
              <g key={z.id}>
                <rect
                  x={z.x * cell + 2}
                  y={z.y * cell + 2}
                  width={z.w * cell - 4}
                  height={z.h * cell - 4}
                  rx="6"
                  fill={z.color}
                  stroke={isTarget ? '#246BCE' : z.border}
                  strokeWidth={isTarget ? 3 : 1.5}
                />
                <text
                  x={(z.x + z.w / 2) * cell}
                  y={(z.y + z.h / 2) * cell + 3}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="700"
                  fill="#1E293B"
                >
                  {z.label}
                </text>
              </g>
            );
          })}

          {pathPointsString && (
            <polyline
              points={pathPointsString}
              fill="none"
              stroke="#246BCE"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8 6"
            />
          )}

          {/* Entrance marker */}
          <g>
            <circle cx={ex} cy={ey} r="11" fill="#174A91" stroke="#FFFFFF" strokeWidth="2.5" />
            <text x={ex} y={ey + 3} textAnchor="middle" fontSize="9" fontWeight="800" fill="#FFFFFF">
              TU
            </text>
            <rect x={ex - 36} y={ey - 27} width="72" height="15" rx="4" fill="#174A91" />
            <text x={ex} y={ey - 17} textAnchor="middle" fontSize="8" fontWeight="800" fill="#FFFFFF">
              TU ETS AQUÍ
            </text>
          </g>

          {/* Single target pin */}
          {targetZone && (
            <g>
              <circle cx={targetZone.pin.x * cell} cy={targetZone.pin.y * cell} r="14" fill="#246BCE" opacity="0.22">
                <animate attributeName="r" values="10;18;10" dur="1.6s" repeatCount="indefinite" />
              </circle>
              <circle
                cx={targetZone.pin.x * cell}
                cy={targetZone.pin.y * cell}
                r="8"
                fill="#246BCE"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
              <circle cx={targetZone.pin.x * cell} cy={targetZone.pin.y * cell} r="3" fill="#FFFFFF" />
            </g>
          )}

          {/* Multi-stop pins */}
          {stopPlacements.map((st) => (
            <g key={`${st.zone.id}-${st.index}`}>
              <circle
                cx={st.px}
                cy={st.py}
                r="10.5"
                fill={st.found ? '#16A34A' : '#246BCE'}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <text x={st.px} y={st.py + 3.5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#FFFFFF">
                {st.index}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex flex-wrap gap-3 px-3.5 py-2.5 bg-white border-t border-[#E3E8F0] text-[11px] font-semibold text-[#737B87]">
        {legendMode === 'multi' ? (
          <>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#174A91] inline-block" /> Entrada
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#246BCE] inline-block" /> Pendent
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#16A34A] inline-block" /> Trobat
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-[#246BCE] inline-block rounded-sm" /> Ruta completa
            </span>
          </>
        ) : legendMode === 'general' ? (
          <>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#174A91] inline-block" /> Entrada / TU ETS AQUÍ
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#CBD5E1] inline-block" /> Prestatgeries i zones
            </span>
          </>
        ) : (
          <>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#174A91] inline-block" /> TU ETS AQUÍ
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#246BCE] inline-block" /> Destinació
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-[#246BCE] inline-block rounded-sm" /> Ruta
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#FDE68A] border border-[#D97706] inline-block" /> Prestatgeries
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#F8FAFC] border border-[#CBD5E1] inline-block" /> Passadissos
            </span>
          </>
        )}
      </div>
    </div>
  );
};
