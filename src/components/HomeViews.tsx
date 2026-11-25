import React from 'react';
import { ChevronRight, LocateFixed, MapPin, QrCode, Search, X } from 'lucide-react';
import { STORES } from '../data/stores';
import { StoreId, ViewState } from '../types';
import { normalizeText } from '../utils/navigationEngine';
import { TopBar } from './NavigationShell';

interface HomeViewProps {
  recentStores: StoreId[];
  onPushView: (view: ViewState) => void;
  onEnterStore: (storeId: StoreId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  recentStores,
  onPushView,
  onEnterStore,
}) => {
  return (
    <main className="flex-1 overflow-y-auto px-4 pt-5 pb-24 lg:px-8 lg:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4 lg:hidden">
          <div className="w-11 h-11 rounded-[13px] bg-gradient-to-br from-[#246BCE] to-[#174A91] flex items-center justify-center text-white shadow-md shadow-[#246BCE]/25">
            <MapPin className="w-6 h-6" />
          </div>
          <span className="text-[22px] font-extrabold tracking-tight text-[#174A91] font-display">
            FINDIT
          </span>
        </div>

        <h1 className="text-[26px] lg:text-3xl font-extrabold tracking-tight text-[#202A36] leading-tight mb-1.5 font-display text-balance">
          On vols començar?
        </h1>
        <p className="text-sm lg:text-[15px] text-[#737B87] leading-relaxed mb-6">
          Troba fàcilment qualsevol producte dins del teu establiment.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <section className="lg:col-span-7 flex flex-col gap-3" aria-label="Opcions d'inici">
            <button
              type="button"
              onClick={() => onPushView({ type: 'globalStoreSearch', query: '' })}
              className="w-full rounded-[18px] p-4 flex items-center gap-3.5 text-left bg-gradient-to-br from-[#246BCE] to-[#174A91] text-white shadow-md shadow-[#174A91]/15 active:scale-[0.985] transition-transform cursor-pointer min-h-[76px]"
            >
              <div className="w-[52px] h-[52px] rounded-[14px] bg-white/20 flex items-center justify-center shrink-0">
                <Search className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold leading-snug">Cercar</div>
                <div className="text-[13px] text-white/85">Busca un establiment</div>
              </div>
              <ChevronRight className="w-5 h-5 shrink-0 opacity-90" />
            </button>

            <button
              type="button"
              onClick={() => onPushView({ type: 'qrScan' })}
              className="w-full rounded-[18px] p-4 flex items-center gap-3.5 text-left bg-white border border-[#E3E8F0] shadow-sm hover:border-[#246BCE]/40 active:scale-[0.985] transition cursor-pointer min-h-[76px]"
            >
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#EAF3FF] text-[#246BCE] flex items-center justify-center shrink-0">
                <QrCode className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold text-[#202A36] leading-snug">Escanejar QR</div>
                <div className="text-[13px] text-[#737B87]">Identifica el teu establiment</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#94A3B8] shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => onPushView({ type: 'detectStore' })}
              className="w-full rounded-[18px] p-4 flex items-center gap-3.5 text-left bg-white border border-[#E3E8F0] shadow-sm hover:border-[#246BCE]/40 active:scale-[0.985] transition cursor-pointer min-h-[76px]"
            >
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#EAF3FF] text-[#246BCE] flex items-center justify-center shrink-0">
                <LocateFixed className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold text-[#202A36] leading-snug">
                  Detectar establiment
                </div>
                <div className="text-[13px] text-[#737B87]">Utilitza la teva ubicació</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#94A3B8] shrink-0" />
            </button>
          </section>

          <section className="lg:col-span-5" aria-label="Els teus últims establiments">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-3 mt-2 lg:mt-0">
              Els teus últims establiments
            </h2>

            {recentStores.length === 0 ? (
              <div className="text-center p-6 bg-white rounded-[18px] border border-dashed border-[#CBD5E1] text-[#737B87] text-sm leading-relaxed">
                Encara no has visitat cap establiment. Comença seleccionant-ne un.
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {recentStores.map((id) => {
                  const s = STORES[id];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onEnterStore(s.id)}
                      className="w-full bg-white rounded-[14px] p-3.5 flex items-center gap-3 border border-[#E3E8F0] shadow-sm hover:border-[#246BCE]/40 active:scale-[0.985] transition text-left cursor-pointer"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-base text-white shrink-0"
                        style={{ backgroundColor: s.color }}
                      >
                        {s.short}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-bold text-[#202A36] truncate">
                          {s.name}
                        </div>
                        <div className="text-xs text-[#737B87] truncate">{s.desc}</div>
                      </div>
                      <span className="px-3 py-2 rounded-lg bg-[#EAF3FF] text-[#174A91] text-xs font-bold shrink-0">
                        Entrar
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

interface GlobalStoreSearchViewProps {
  query: string;
  canGoBack: boolean;
  activeStoreId: StoreId | null;
  onQueryChange: (val: string) => void;
  onBack: () => void;
  onEnterStore: (storeId: StoreId) => void;
  onChangeStore: () => void;
}

export const GlobalStoreSearchView: React.FC<GlobalStoreSearchViewProps> = ({
  query,
  canGoBack,
  activeStoreId,
  onQueryChange,
  onBack,
  onEnterStore,
  onChangeStore,
}) => {
  const qNorm = normalizeText(query);
  const list = Object.values(STORES).filter((s) => {
    if (!qNorm) return true;
    return normalizeText(`${s.name} ${s.desc}`).includes(qNorm);
  });

  return (
    <>
      <TopBar
        title="Troba un establiment"
        subtitle="Selecciona on vols comprar o consultar"
        showBack={canGoBack}
        onBack={onBack}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative mb-5">
            <Search className="w-5 h-5 text-[#737B87] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Cerca un establiment..."
              autoFocus
              className="w-full h-12 rounded-[14px] border-[1.5px] border-[#E3E8F0] bg-white pl-11 pr-11 text-[15px] font-medium text-[#202A36] shadow-sm outline-none focus:border-[#246BCE] transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Esborrar cerca"
                className="w-8 h-8 rounded-full bg-[#F1F3F6] text-[#737B87] absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center hover:bg-[#E2E8F0] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-3 tabular-nums">
            Establiments disponibles ({list.length})
          </h2>

          {list.length === 0 ? (
            <div className="text-center p-7 bg-white rounded-[18px] border border-dashed border-[#CBD5E1] text-[#737B87] text-sm">
              No s&apos;ha trobat cap establiment amb «{query}».
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {list.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onEnterStore(s.id)}
                  className="w-full bg-white rounded-[14px] p-4 flex items-center gap-3 border border-[#E3E8F0] shadow-sm hover:border-[#246BCE]/50 active:scale-[0.985] transition text-left cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-base text-white shrink-0"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.short}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-bold text-[#202A36] truncate">{s.name}</div>
                    <div className="text-xs text-[#737B87] mt-0.5 line-clamp-2">{s.desc}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#246BCE] shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

interface SimulatorViewProps {
  activeStoreId: StoreId | null;
  onBack: () => void;
  onEnterStore: (storeId: StoreId) => void;
  onChangeStore: () => void;
}

export const QrScanView: React.FC<SimulatorViewProps> = ({
  activeStoreId,
  onBack,
  onEnterStore,
  onChangeStore,
}) => {
  return (
    <>
      <TopBar
        title="Escanejar QR"
        subtitle="Identifica l'establiment amb la càmera"
        onBack={onBack}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0F172A] rounded-[18px] p-6 text-white text-center mb-6">
            <div className="text-xs font-semibold text-[#93C5FD] tracking-wide">
              Càmera en directe (simulació)
            </div>
            <div className="w-44 h-44 mx-auto my-4 border-2 border-white/25 rounded-[18px] relative flex items-center justify-center bg-white/5 overflow-hidden">
              <div className="animate-scan-laser absolute top-4 left-2.5 right-2.5 h-[3px] bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]" />
              <QrCode className="w-20 h-20 text-white/55" />
            </div>
            <p className="text-[13px] text-[#CBD5E1] leading-relaxed max-w-md mx-auto">
              Apunta al codi QR situat a l&apos;entrada de l&apos;establiment o selecciona&apos;n un a
              continuació per simular la lectura:
            </p>
          </div>

          <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-3">
            Simular lectura QR de:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.values(STORES).map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onEnterStore(s.id)}
                className="w-full bg-white rounded-[14px] p-3.5 flex items-center gap-3 border border-[#E3E8F0] shadow-sm hover:border-[#246BCE]/50 active:scale-[0.985] transition text-left cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-base text-white shrink-0"
                  style={{ backgroundColor: s.color }}
                >
                  {s.short}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold text-[#202A36]">QR · {s.name}</div>
                  <div className="text-xs text-[#737B87]">Toca per identificar i entrar</div>
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-[#EAF3FF] text-[#174A91] text-xs font-bold shrink-0">
                  Escanejar
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export const DetectStoreView: React.FC<SimulatorViewProps> = ({
  activeStoreId,
  onBack,
  onEnterStore,
  onChangeStore,
}) => {
  return (
    <>
      <TopBar
        title="Detectar establiment"
        subtitle="Geolocalització en temps real"
        onBack={onBack}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0F172A] rounded-[18px] p-6 text-white text-center mb-6">
            <div className="text-xs font-semibold text-[#93C5FD] tracking-wide">
              GPS actiu (simulació)
            </div>
            <div className="w-40 h-40 rounded-full mx-auto my-4 bg-[radial-gradient(circle,rgba(36,107,206,0.35)_0%,rgba(36,107,206,0.06)_70%)] border-2 border-[#38BDF8]/40 relative flex items-center justify-center">
              <div className="animate-radar-pulse absolute inset-0 rounded-full border-2 border-[#38BDF8]" />
              <MapPin className="w-9 h-9 text-[#38BDF8]" />
            </div>
            <div className="text-[15px] font-bold mb-1">Buscant un establiment proper...</div>
            <p className="text-xs text-[#CBD5E1]">
              S&apos;han detectat 4 establiments compatibles a menys de 500 m.
            </p>
          </div>

          <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-3">
            Establiments detectats a prop:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.values(STORES).map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onEnterStore(s.id)}
                className="w-full bg-white rounded-[14px] p-3.5 flex items-center gap-3 border border-[#E3E8F0] shadow-sm hover:border-[#246BCE]/50 active:scale-[0.985] transition text-left cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-base text-white shrink-0"
                  style={{ backgroundColor: s.color }}
                >
                  {s.short}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold text-[#202A36]">{s.name}</div>
                  <div className="text-xs text-[#737B87] tabular-nums">
                    A {(idx + 1) * 45} metres · Senyal òptim
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] text-xs font-bold shrink-0">
                  Entrar
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
