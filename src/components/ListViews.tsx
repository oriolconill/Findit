import React from 'react';
import { Check, Map as MapIcon, Navigation, Pause, Play, Search, SkipForward, Trash2, X } from 'lucide-react';
import { CATALOGS, STORES } from '../data/stores';
import {
  ActiveTour,
  ListItem,
  ListTemplate,
  NavigationContext,
  Product,
  StoreId,
  ViewState,
} from '../types';
import {
  formatProductPrice,
  optimizeListItems,
  smartSearchStore,
} from '../utils/navigationEngine';
import { TopBar } from './NavigationShell';
import { ProductArt } from './ProductArt';
import { MultiStopPin, StoreMap2D } from './StoreMap2D';

interface ListsHomeViewProps {
  lists: Record<StoreId, ListItem[]>;
  templates: ListTemplate[];
  activeStoreId: StoreId | null;
  onOpenListDetail: (storeId: StoreId) => void;
  onStartFromTemplate: (tplId: string) => void;
  onDeleteTemplate: (tplId: string) => void;
  onChangeStore: () => void;
}

export const ListsHomeView: React.FC<ListsHomeViewProps> = ({
  lists,
  templates,
  activeStoreId,
  onOpenListDetail,
  onStartFromTemplate,
  onDeleteTemplate,
  onChangeStore,
}) => {
  return (
    <>
      <TopBar
        title="Llistes de compra"
        subtitle="Organitzades i optimitzades per establiment"
        showBack={false}
        onBack={() => {}}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {Object.values(STORES).map((s) => {
              const items = lists[s.id] || [];
              const total = items.length;
              const found = items.filter((i) => i.found).length;
              const pct = total > 0 ? Math.round((found / total) * 100) : 0;

              return (
                <div
                  key={s.id}
                  className="bg-white rounded-[18px] p-4 border border-[#E3E8F0] shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-base text-white shrink-0"
                        style={{ backgroundColor: s.color }}
                      >
                        {s.short}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-extrabold text-[#202A36] truncate font-display">
                          La meva llista de {s.name}
                        </div>
                        <div className="text-[13px] text-[#737B87] tabular-nums">
                          {total} productes · {found} trobats ({pct}%)
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-2.5 bg-[#F1F3F6] rounded-full overflow-hidden mb-3.5">
                      <div
                        className="h-full bg-gradient-to-r from-[#246BCE] to-[#38BDF8] rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenListDetail(s.id)}
                    className="w-full min-h-[44px] px-4 py-2 rounded-[12px] bg-[#EAF3FF] hover:bg-[#DCEBFF] text-[#174A91] text-sm font-bold active:scale-[0.98] transition cursor-pointer"
                  >
                    Veure llista
                  </button>
                </div>
              );
            })}
          </div>

          {templates.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-3">
                Llistes guardades per a futures compres
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {templates.map((tpl) => {
                  const s = STORES[tpl.storeId];
                  return (
                    <div
                      key={tpl.id}
                      className="bg-white rounded-[18px] p-4 border border-[#E3E8F0] shadow-sm"
                    >
                      <div className="flex items-center gap-2.5 mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs text-white shrink-0"
                          style={{ backgroundColor: s.color }}
                        >
                          {s.short}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[15px] font-bold text-[#202A36] truncate">
                            {tpl.name}
                          </div>
                          <div className="text-xs text-[#737B87] tabular-nums">
                            {s.name} · {tpl.items.length} productes
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => onStartFromTemplate(tpl.id)}
                          className="min-h-[42px] px-3 py-2 rounded-[10px] bg-[#246BCE] hover:bg-[#174A91] text-white text-xs font-bold active:scale-[0.98] transition cursor-pointer"
                        >
                          Iniciar nova compra
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteTemplate(tpl.id)}
                          className="min-h-[42px] px-3 py-2 rounded-[10px] bg-white border-[1.5px] border-[#FECACA] text-[#DC2626] hover:bg-[#FEF2F2] text-xs font-bold active:scale-[0.98] transition cursor-pointer"
                        >
                          Eliminar plantilla
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

interface ListDetailViewProps {
  storeId: StoreId;
  addQuery: string;
  items: ListItem[];
  activeTour: ActiveTour | null;
  activeStoreId: StoreId | null;
  showPrices: boolean;
  onBack: () => void;
  onAddQueryChange: (q: string) => void;
  onAddProduct: (storeId: StoreId, productId: string, variantLabel: string) => void;
  onRemoveItem: (storeId: StoreId, uid: string) => void;
  onStartTour: (storeId: StoreId) => void;
  onPushView: (view: ViewState) => void;
  onChangeStore: () => void;
}

export const ListDetailView: React.FC<ListDetailViewProps> = ({
  storeId,
  addQuery,
  items,
  activeTour,
  activeStoreId,
  showPrices,
  onBack,
  onAddQueryChange,
  onAddProduct,
  onRemoveItem,
  onStartTour,
  onPushView,
  onChangeStore,
}) => {
  const store = STORES[storeId];
  const optimized = optimizeListItems(storeId, items);
  const total = optimized.length;
  const foundCount = optimized.filter((i) => i.found).length;
  const pct = total > 0 ? Math.round((foundCount / total) * 100) : 0;
  const hasPending = optimized.some((i) => !i.found && !i.unlocatable);

  let catalogMatches: Product[] = [];
  if (addQuery.trim().length > 0) {
    const res = smartSearchStore(storeId, addQuery);
    const catProds = res.categories.flatMap((c) =>
      CATALOGS[storeId].filter((p) => p.category === c.name)
    );
    const seen = new Set<string>();
    [...res.products, ...catProds].forEach((p) => {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        catalogMatches.push(p);
      }
    });
  }

  // Group optimized items by aisle & section
  const groupedSections: { key: string; entries: { item: (typeof optimized)[number]; index: number }[] }[] = [];
  optimized.forEach((item, idx) => {
    if (item.unlocatable || !item.product) {
      const last = groupedSections[groupedSections.length - 1];
      if (last && last.key === 'NO_LOC') {
        last.entries.push({ item, index: idx });
      } else {
        groupedSections.push({ key: 'NO_LOC', entries: [{ item, index: idx }] });
      }
      return;
    }
    const gKey = `${item.product.aisle} — ${item.product.section}`;
    const last = groupedSections[groupedSections.length - 1];
    if (last && last.key === gKey) {
      last.entries.push({ item, index: idx });
    } else {
      groupedSections.push({ key: gKey, entries: [{ item, index: idx }] });
    }
  });

  return (
    <>
      <TopBar
        title={`Llista de ${store.name}`}
        subtitle={`${total} productes · Ordre optimitzat automàticament`}
        onBack={onBack}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[18px] p-4 border border-[#E3E8F0] shadow-sm mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-extrabold text-[#202A36]">Progrés de la compra</span>
              <span className="text-sm font-extrabold text-[#246BCE] tabular-nums">
                {foundCount} / {total} ({pct}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#F1F3F6] rounded-full overflow-hidden mb-3.5">
              <div
                className="h-full bg-gradient-to-r from-[#246BCE] to-[#38BDF8] rounded-full transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>

            {total > 0 && (
              <div className="flex flex-col sm:flex-row gap-2.5">
                {hasPending ? (
                  <button
                    type="button"
                    onClick={() => onStartTour(storeId)}
                    className="flex-1 min-h-[48px] px-4 py-3 rounded-[14px] bg-[#246BCE] hover:bg-[#174A91] text-white text-sm font-bold shadow-md shadow-[#246BCE]/25 inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                    <span>
                      {activeTour?.storeId === storeId && activeTour.paused
                        ? 'REPRENDRE RECORREGUT'
                        : 'COMENÇAR RECORREGUT'}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onPushView({ type: 'listComplete', storeId })}
                    className="flex-1 min-h-[48px] px-4 py-3 rounded-[14px] bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-bold shadow-md shadow-[#16A34A]/25 active:scale-[0.98] transition cursor-pointer"
                  >
                    VEURE RESUM DE FINALITZACIÓ
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onPushView({ type: 'fullListMap', storeId })}
                  className="flex-1 min-h-[48px] px-4 py-3 rounded-[14px] bg-[#EAF3FF] hover:bg-[#DCEBFF] text-[#174A91] text-sm font-bold inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
                >
                  <MapIcon className="w-4 h-4" />
                  <span>Veure mapa del recorregut complet</span>
                </button>
              </div>
            )}
          </div>

          <div className="relative mb-4">
            <Search className="w-5 h-5 text-[#737B87] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={addQuery}
              onChange={(e) => onAddQueryChange(e.target.value)}
              placeholder="Quin producte vols afegir?"
              className="w-full h-12 rounded-[14px] border-[1.5px] border-[#E3E8F0] bg-white pl-11 pr-11 text-[15px] font-medium text-[#202A36] shadow-sm outline-none focus:border-[#246BCE] transition-colors"
            />
            {addQuery && (
              <button
                type="button"
                onClick={() => onAddQueryChange('')}
                aria-label="Esborrar cerca"
                className="w-8 h-8 rounded-full bg-[#F1F3F6] text-[#737B87] absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center hover:bg-[#E2E8F0] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {addQuery.trim().length > 0 && (
            <div className="bg-[#F5F9FF] rounded-[18px] p-4 border-[1.5px] border-[#246BCE] mb-4">
              <div className="text-xs font-extrabold text-[#174A91] mb-2.5 tabular-nums">
                Resultats del catàleg ({catalogMatches.length})
              </div>
              {catalogMatches.length === 0 ? (
                <div className="text-[13px] text-[#737B87]">
                  Cap coincidència a {store.name}.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {catalogMatches.slice(0, 8).map((p) => {
                    const variants = p.variants?.sizes
                      ? p.variants.sizes
                          .slice(0, 3)
                          .map(
                            (sz) =>
                              `${sz}${p.variants?.colors ? ' · ' + p.variants.colors[0] : ''}`
                          )
                      : [p.format];
                    const priceText = formatProductPrice(p.price);

                    return variants.map((vLabel) => (
                      <div
                        key={`${p.id}-${vLabel}`}
                        className="bg-white rounded-xl p-2.5 flex items-center gap-2.5 border border-[#E3E8F0]"
                      >
                        <ProductArt storeId={storeId} product={p} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold text-[#202A36] truncate">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-[#737B87] truncate tabular-nums">
                            {p.brand} · {vLabel}
                            {showPrices ? ` · ${priceText}` : ''}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onAddProduct(storeId, p.id, vLabel)}
                          className="min-h-[38px] px-3.5 py-1.5 rounded-[10px] bg-[#246BCE] hover:bg-[#174A91] text-white text-xs font-bold shrink-0 cursor-pointer"
                        >
                          Afegir
                        </button>
                      </div>
                    ));
                  })}
                </div>
              )}
            </div>
          )}

          {total === 0 ? (
            <div className="text-center p-7 bg-white rounded-[18px] border border-dashed border-[#CBD5E1] text-[#737B87] text-sm leading-relaxed">
              La teva llista de {store.name} és buida. Cerca productes o categories a dalt per
              afegir-los i FINDIT optimitzarà el recorregut automàticament.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {groupedSections.map((group) => (
                <section key={group.key}>
                  {group.key !== 'NO_LOC' && (
                    <h3 className="text-xs font-bold tracking-wider uppercase text-[#174A91] mb-2">
                      {group.key}
                    </h3>
                  )}
                  <div className="flex flex-col gap-2">
                    {group.entries.map(({ item, index }) => {
                      if (item.unlocatable || !item.product) {
                        return (
                          <div
                            key={item.uid}
                            className="bg-[#FEF2F2] rounded-[14px] p-3 border border-[#FECACA] flex items-center justify-between gap-3"
                          >
                            <div>
                              <div className="text-sm font-bold text-[#202A36]">
                                Producte no localitzable
                              </div>
                              <div className="text-xs text-[#737B87]">
                                Sense ubicació definida al mapa
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(storeId, item.uid)}
                              className="min-h-[38px] px-3 py-1.5 rounded-[10px] bg-white border border-[#FECACA] text-[#DC2626] text-xs font-bold cursor-pointer"
                            >
                              Eliminar
                            </button>
                          </div>
                        );
                      }

                      const p = item.product;
                      const priceText = formatProductPrice(p.price);

                      return (
                        <div
                          key={item.uid}
                          className={`bg-white rounded-[14px] p-3 border border-[#E3E8F0] shadow-sm flex items-center gap-3 transition-opacity ${
                            item.found ? 'opacity-60' : 'opacity-100'
                          }`}
                        >
                          <div
                            className={`w-[30px] h-[30px] rounded-full text-white font-extrabold text-sm flex items-center justify-center shrink-0 tabular-nums ${
                              item.found ? 'bg-[#16A34A]' : 'bg-[#246BCE]'
                            }`}
                          >
                            {item.found ? <Check className="w-4 h-4" /> : index + 1}
                          </div>
                          <ProductArt storeId={storeId} product={p} size="md" />
                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-sm font-bold text-[#202A36] truncate ${
                                item.found ? 'line-through' : ''
                              }`}
                            >
                              {p.name}
                            </div>
                            <div className="text-xs text-[#737B87] truncate tabular-nums">
                              {p.brand} · {item.variantLabel || p.format}
                              {showPrices ? ` · ${priceText}` : ''}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] mt-0.5 flex-wrap">
                              <span className="font-bold text-[#246BCE]">
                                {p.shelf} · {p.level}
                              </span>
                              <span className="text-[#CBD5E1]" aria-hidden="true">·</span>
                              <span
                                className={`font-bold ${
                                  item.found ? 'text-[#16A34A]' : 'text-[#D97706]'
                                }`}
                              >
                                {item.found ? 'Trobat' : 'Pendent'}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(storeId, item.uid)}
                            title="Eliminar de la llista"
                            aria-label={`Eliminar ${p.name} de la llista`}
                            className="w-10 h-10 rounded-xl border border-[#FECACA] bg-white text-[#DC2626] hover:bg-[#FEF2F2] flex items-center justify-center shrink-0 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

interface FullListMapViewProps {
  storeId: StoreId;
  items: ListItem[];
  activeStoreId: StoreId | null;
  zoom: number;
  onZoomChange: (delta: number) => void;
  onBack: () => void;
  onChangeStore: () => void;
}

export const FullListMapView: React.FC<FullListMapViewProps> = ({
  storeId,
  items,
  activeStoreId,
  zoom,
  onZoomChange,
  onBack,
  onChangeStore,
}) => {
  const store = STORES[storeId];
  const optimized = optimizeListItems(storeId, items).filter((i) => !i.unlocatable);
  const stops: MultiStopPin[] = optimized
    .filter((i) => i.zone && i.product)
    .map((item, idx) => ({
      zone: item.zone!,
      index: idx + 1,
      found: item.found,
      label: item.product!.name,
    }));

  return (
    <>
      <TopBar
        title="Mapa del recorregut complet"
        subtitle={`${store.name} · ${stops.length} parades optimitzades`}
        onBack={onBack}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-5">
            <StoreMap2D
              storeId={storeId}
              title="Ruta completa optimitzada"
              multiStops={stops}
              zoom={zoom}
              onZoomChange={onZoomChange}
              legendMode="multi"
            />
          </div>

          <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-2.5">
            Ordre de parades del recorregut
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {optimized.map((item, idx) => (
              <div
                key={item.uid}
                className={`flex gap-3 p-3 bg-white rounded-[14px] border border-[#E3E8F0] items-center ${
                  item.found ? 'opacity-60' : 'opacity-100'
                }`}
              >
                <div
                  className={`w-[30px] h-[30px] rounded-full text-white font-extrabold text-sm flex items-center justify-center shrink-0 tabular-nums ${
                    item.found ? 'bg-[#16A34A]' : 'bg-[#246BCE]'
                  }`}
                >
                  {item.found ? <Check className="w-4 h-4" /> : idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-[#202A36] truncate">
                    {item.product?.name}
                  </div>
                  <div className="text-xs text-[#737B87] truncate">
                    {item.product?.aisle} · {item.product?.shelf} ·{' '}
                    {item.found ? 'Trobat' : 'Pendent'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

interface ListTourViewProps {
  storeId: StoreId;
  items: ListItem[];
  activeTour: ActiveTour | null;
  activeStoreId: StoreId | null;
  showPrices: boolean;
  onBack: () => void;
  onOpenDirections: (ctx: NavigationContext) => void;
  onOpenProductMap: (ctx: NavigationContext) => void;
  onMarkFound: (storeId: StoreId, itemUid: string) => void;
  onSkipItem: (storeId: StoreId, currentUid: string) => void;
  onPauseTour: () => void;
  onOpenFullMap: (storeId: StoreId) => void;
  onFinishEarly: (storeId: StoreId) => void;
  onChangeStore: () => void;
}

export const ListTourView: React.FC<ListTourViewProps> = ({
  storeId,
  items,
  activeTour,
  activeStoreId,
  showPrices,
  onBack,
  onOpenDirections,
  onOpenProductMap,
  onMarkFound,
  onSkipItem,
  onPauseTour,
  onOpenFullMap,
  onFinishEarly,
  onChangeStore,
}) => {
  const store = STORES[storeId];
  const optimized = optimizeListItems(storeId, items).filter((i) => !i.unlocatable);
  const total = optimized.length;
  const foundCount = optimized.filter((i) => i.found).length;
  const pct = total > 0 ? Math.round((foundCount / total) * 100) : 0;

  const currentIdx = optimized.findIndex(
    (i) => i.uid === activeTour?.currentUid && !i.found
  );
  const currentItem =
    currentIdx >= 0 ? optimized[currentIdx] : optimized.find((i) => !i.found);

  if (!currentItem || !currentItem.product) {
    return (
      <>
        <TopBar
          title={`Recorregut · ${store.name}`}
          onBack={onBack}
          activeStoreId={activeStoreId}
          onChangeStore={onChangeStore}
        />
        <main className="flex-1 overflow-y-auto px-4 pt-6 pb-24">
          <div className="max-w-md mx-auto bg-white rounded-[18px] p-6 border border-[#E3E8F0] text-center">
            <p className="text-sm text-[#737B87] mb-4">
              Tots els productes d&apos;aquesta llista ja estan marcats com a trobats.
            </p>
            <button
              type="button"
              onClick={() => onFinishEarly(storeId)}
              className="w-full min-h-[48px] px-4 py-3 rounded-[14px] bg-[#16A34A] text-white font-bold cursor-pointer"
            >
              Veure resum final
            </button>
          </div>
        </main>
      </>
    );
  }

  const displayPos = optimized.findIndex((i) => i.uid === currentItem.uid) + 1;
  const p = currentItem.product;
  const priceText = formatProductPrice(p.price);
  const ctx: NavigationContext = {
    source: 'list',
    storeId,
    itemUid: currentItem.uid,
    productId: p.id,
  };

  return (
    <>
      <TopBar
        title={`Recorregut · ${store.name}`}
        subtitle={`Producte ${displayPos} de ${total}`}
        onBack={onBack}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-xl mx-auto">
          <div className="mb-3.5">
            <div className="flex justify-between text-xs font-bold text-[#174A91] mb-1.5 tabular-nums">
              <span>
                Producte {displayPos} de {total}
              </span>
              <span>
                {foundCount} trobats ({pct}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#246BCE] to-[#38BDF8] rounded-full transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-[18px] p-5 border border-[#E3E8F0] shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <ProductArt storeId={storeId} product={p} size="lg" />
            </div>

            <h1 className="text-xl font-extrabold text-[#202A36] mb-1 font-display text-balance">
              {p.name}
            </h1>
            <div className="text-sm text-[#737B87] mb-2">
              {p.brand} · {currentItem.variantLabel || p.format}
            </div>
            {showPrices && (
              <div className="text-[22px] font-extrabold text-[#246BCE] tabular-nums">
                {priceText}
              </div>
            )}

            <div className="bg-gradient-to-br from-[#EAF3FF] to-[#F5F9FF] border-[1.5px] border-[#BFDBFE] rounded-[14px] p-3.5 my-4 text-left">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#246BCE] mb-1">
                Ubicació exacta
              </div>
              <div className="text-[15px] font-bold text-[#174A91] leading-snug">
                {p.aisle} · {p.section} · {p.shelf} · {p.level}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-2.5">
              <button
                type="button"
                onClick={() => onOpenDirections(ctx)}
                className="min-h-[48px] px-3 py-3 rounded-[14px] bg-[#EAF3FF] hover:bg-[#DCEBFF] text-[#174A91] text-sm font-bold inline-flex items-center justify-center gap-1.5 active:scale-[0.98] transition cursor-pointer"
              >
                <Navigation className="w-4 h-4 shrink-0" />
                <span>Com arribar-hi</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenProductMap(ctx)}
                className="min-h-[48px] px-3 py-3 rounded-[14px] bg-[#174A91] hover:bg-[#123A73] text-white text-sm font-bold inline-flex items-center justify-center gap-1.5 active:scale-[0.98] transition cursor-pointer"
              >
                <MapIcon className="w-4 h-4 shrink-0" />
                <span>Veure mapa</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onMarkFound(storeId, currentItem.uid)}
              className="w-full min-h-[50px] px-4 py-3 rounded-[14px] bg-[#16A34A] hover:bg-[#15803D] text-white text-[15px] font-bold shadow-md shadow-[#16A34A]/25 inline-flex items-center justify-center gap-2 mb-2.5 active:scale-[0.98] transition cursor-pointer"
            >
              <Check className="w-5 h-5" />
              <span>Producte trobat</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onSkipItem(storeId, currentItem.uid)}
                className="min-h-[42px] px-3 py-2 rounded-[10px] bg-white border-[1.5px] border-[#E3E8F0] text-[#202A36] hover:bg-[#F5F9FF] text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Ometre per ara</span>
              </button>
              <button
                type="button"
                onClick={onPauseTour}
                className="min-h-[42px] px-3 py-2 rounded-[10px] bg-white border-[1.5px] border-[#E3E8F0] text-[#202A36] hover:bg-[#F5F9FF] text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pausar recorregut</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenFullMap(storeId)}
            className="w-full min-h-[46px] px-4 py-3 rounded-[14px] bg-white border-[1.5px] border-[#E3E8F0] text-[#202A36] hover:bg-[#F5F9FF] text-sm font-bold mt-3 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <MapIcon className="w-4 h-4" />
            <span>Veure mapa del recorregut complet</span>
          </button>
        </div>
      </main>
    </>
  );
};

interface ListCompleteViewProps {
  storeId: StoreId;
  items: ListItem[];
  activeStoreId: StoreId | null;
  onSaveTemplate: (storeId: StoreId) => void;
  onConfirmDelete: (storeId: StoreId) => void;
  onChangeStore: () => void;
}

export const ListCompleteView: React.FC<ListCompleteViewProps> = ({
  storeId,
  items,
  activeStoreId,
  onSaveTemplate,
  onConfirmDelete,
  onChangeStore,
}) => {
  const store = STORES[storeId];
  const optimized = optimizeListItems(storeId, items);
  const total = optimized.length;
  const found = optimized.filter((i) => i.found).length;

  return (
    <>
      <TopBar
        title="Recorregut completat"
        subtitle={store.name}
        showBack={false}
        onBack={() => {}}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[18px] p-6 border border-[#E3E8F0] shadow-sm text-center mb-6">
            <div className="w-[74px] h-[74px] rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto mb-3.5">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>
            <div className="text-xs font-extrabold text-[#16A34A] tracking-wider uppercase mb-1.5">
              100% Completat
            </div>
            <h1 className="text-[22px] font-extrabold text-[#202A36] mb-1.5 font-display text-balance">
              HAS COMPLETAT LA TEVA LLISTA!
            </h1>
            <p className="text-sm text-[#737B87] mb-4 tabular-nums">
              Tots els {found} de {total} productes a{' '}
              <strong className="text-[#202A36]">{store.name}</strong> s&apos;han trobat
              correctament.
            </p>

            <div className="w-full h-2.5 bg-[#F1F3F6] rounded-full overflow-hidden mb-5">
              <div className="h-full w-full bg-[#16A34A] rounded-full" />
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => onSaveTemplate(storeId)}
                className="w-full min-h-[48px] px-4 py-3 rounded-[14px] bg-[#246BCE] hover:bg-[#174A91] text-white text-sm font-bold shadow-md shadow-[#246BCE]/25 active:scale-[0.98] transition cursor-pointer"
              >
                GUARDAR PER A FUTURES COMPRES
              </button>
              <button
                type="button"
                onClick={() => onConfirmDelete(storeId)}
                className="w-full min-h-[48px] px-4 py-3 rounded-[14px] bg-white border-[1.5px] border-[#FECACA] text-[#DC2626] hover:bg-[#FEF2F2] text-sm font-bold active:scale-[0.98] transition cursor-pointer"
              >
                ELIMINAR LLISTA
              </button>
            </div>
          </div>

          <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-2.5 tabular-nums">
            Resum dels productes ({total})
          </h2>
          <div className="flex flex-col gap-2">
            {optimized.map((i) => (
              <div
                key={i.uid}
                className="flex items-center gap-3 px-3.5 py-2.5 bg-white rounded-[14px] border border-[#E3E8F0]"
              >
                <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1 text-[13px] font-bold text-[#202A36] truncate">
                  {i.product ? i.product.name : 'Producte'}
                </div>
                {i.variantLabel && (
                  <span className="text-[11px] text-[#737B87] shrink-0">{i.variantLabel}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
