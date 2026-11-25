import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Check, MapPin, Navigation, Route } from 'lucide-react';
import { CATALOGS, STORES } from '../data/stores';
import { ListItem, StoreId } from '../types';
import { generateWrittenDirections, optimizeListItems } from '../utils/navigationEngine';
import { APP_URL } from './LandingHeader';
import { MultiStopPin, StoreMap2D } from './StoreMap2D';

const STORE_IDS: StoreId[] = ['mercadona', 'zara', 'biblioteca', 'decathlon'];

const SAMPLE_LIST_PRODUCT_IDS: Record<StoreId, string[]> = {
  mercadona: ['m-lle1', 'm-arr', 'm-ton', 'm-tom'],
  zara: ['z-cam1', 'z-tex1', 'z-cal1'],
  biblioteca: ['b-hp', 'b-nov1', 'b-pp'],
  decathlon: ['d-run1', 'd-cic1', 'd-nat1'],
};

export const LandingInteractiveDemo: React.FC = () => {
  const [selectedStoreId, setSelectedStoreId] = useState<StoreId>('mercadona');
  const [mode, setMode] = useState<'product' | 'list'>('product');
  const [selectedProductId, setSelectedProductId] = useState<string>('m-lle1');
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [zoom, setZoom] = useState<number>(1);

  const store = STORES[selectedStoreId];
  const featuredProducts = useMemo(() => {
    const all = CATALOGS[selectedStoreId] || [];
    const pickIds = new Set(SAMPLE_LIST_PRODUCT_IDS[selectedStoreId]);
    const picked = all.filter((p) => pickIds.has(p.id));
    return picked.length >= 3 ? picked : all.slice(0, 4);
  }, [selectedStoreId]);

  const activeProduct = useMemo(() => {
    return (
      featuredProducts.find((p) => p.id === selectedProductId) ||
      featuredProducts[0] ||
      CATALOGS[selectedStoreId][0]
    );
  }, [featuredProducts, selectedProductId, selectedStoreId]);

  const productRoute = useMemo(() => {
    if (!activeProduct) return null;
    return generateWrittenDirections(selectedStoreId, activeProduct);
  }, [selectedStoreId, activeProduct]);

  const optimizedList = useMemo(() => {
    const baseItems: ListItem[] = featuredProducts.map((p) => ({
      uid: `demo-${p.id}`,
      productId: p.id,
      variantLabel: p.format,
      found: Boolean(checkedIds[p.id]),
    }));
    return optimizeListItems(selectedStoreId, baseItems);
  }, [selectedStoreId, featuredProducts, checkedIds]);

  const multiStops: MultiStopPin[] = useMemo(() => {
    return optimizedList
      .filter((item) => item.zone)
      .map((item, idx) => ({
        zone: item.zone!,
        index: idx + 1,
        found: item.found,
        label: item.product?.name || '',
      }));
  }, [optimizedList]);

  const handleSelectStore = (storeId: StoreId) => {
    setSelectedStoreId(storeId);
    const firstProd = CATALOGS[storeId]?.[0];
    if (firstProd) setSelectedProductId(firstProd.id);
    setCheckedIds({});
    setZoom(1);
  };

  const toggleChecked = (productId: string) => {
    setCheckedIds((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  return (
    <section
      id="prova-mapa"
      className="py-20 lg:py-24 bg-[#F5F9FF] border-y border-[#E3E8F0]"
      aria-labelledby="demo-heading"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#246BCE] mb-2">
              Demostració en directe
            </p>
            <h2
              id="demo-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#202A36] font-display text-balance"
            >
              Prova com FINDIT calcula la ruta dins de cada establiment
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Selecciona un establiment d'exemple"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-[#E3E8F0] rounded-xl self-start"
          >
            {STORE_IDS.map((id) => {
              const s = STORES[id];
              const isActive = selectedStoreId === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectStore(id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#202A36] text-white'
                      : 'text-[#475569] hover:text-[#202A36] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E3E8F0] p-6 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                <div>
                  <h3 className="text-lg font-bold text-[#202A36] font-display">
                    {store.name}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">{store.desc}</p>
                </div>

                <div className="inline-flex items-center p-1 bg-[#F1F5F9] rounded-lg shrink-0">
                  <button
                    type="button"
                    onClick={() => setMode('product')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      mode === 'product'
                        ? 'bg-white text-[#202A36] shadow-xs'
                        : 'text-[#64748B] hover:text-[#202A36]'
                    }`}
                  >
                    Producte
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('list')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      mode === 'list'
                        ? 'bg-white text-[#202A36] shadow-xs'
                        : 'text-[#64748B] hover:text-[#202A36]'
                    }`}
                  >
                    Llista òptima
                  </button>
                </div>
              </div>

              {mode === 'product' ? (
                <div className="mt-5">
                  <p className="text-xs font-semibold text-[#64748B] mb-2.5">
                    Selecciona un producte per traçar la ruta des de {store.entrance.label}:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                    {featuredProducts.map((prod) => {
                      const isSelected = activeProduct?.id === prod.id;
                      return (
                        <button
                          key={prod.id}
                          type="button"
                          onClick={() => setSelectedProductId(prod.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                            isSelected
                              ? 'border-[#246BCE] bg-[#F5F9FF]'
                              : 'border-[#E3E8F0] bg-white hover:border-[#CBD5E1]'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-[#202A36] truncate">
                              {prod.name}
                            </div>
                            <div className="text-xs text-[#64748B] truncate">
                              {prod.aisle} · {prod.shelf} · {prod.level}
                            </div>
                          </div>
                          <MapPin
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? 'text-[#246BCE]' : 'text-[#94A3B8]'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      );
                    })}
                  </div>

                  {productRoute && (
                    <div className="mt-5 pt-4 border-t border-[#F1F5F9]">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#174A91] mb-2.5">
                        <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Indicacions pas a pas</span>
                      </div>
                      <ol className="space-y-2 text-xs text-[#475569] leading-relaxed">
                        {productRoute.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-2.5">
                            <span className="tabular-nums font-bold text-[#246BCE] shrink-0">
                              0{index + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-xs font-semibold text-[#64748B]">
                      Ordre automàtic per minimitzar passadissos:
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#246BCE] tabular-nums">
                      <Route className="w-3.5 h-3.5" aria-hidden="true" />
                      {optimizedList.length} parades
                    </span>
                  </div>

                  <div className="space-y-2">
                    {optimizedList.map((item, idx) => {
                      const prod = item.product;
                      if (!prod) return null;
                      return (
                        <button
                          key={item.uid}
                          type="button"
                          onClick={() => toggleChecked(prod.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-colors flex items-center gap-3 cursor-pointer ${
                            item.found
                              ? 'border-[#CBD5E1] bg-[#F8FAFC] opacity-70'
                              : 'border-[#E3E8F0] bg-white hover:border-[#246BCE]/50'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full text-xs font-bold tabular-nums flex items-center justify-center shrink-0 ${
                              item.found
                                ? 'bg-[#0D8A4E] text-white'
                                : 'bg-[#EAF3FF] text-[#174A91]'
                            }`}
                          >
                            {item.found ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-sm font-semibold truncate ${
                                item.found ? 'line-through text-[#64748B]' : 'text-[#202A36]'
                              }`}
                            >
                              {prod.name}
                            </div>
                            <div className="text-xs text-[#64748B] truncate">
                              {prod.aisle} · {prod.shelf}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-[#64748B] mt-3">
                    Fes clic sobre qualsevol producte per marcar-lo com a recollit.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between gap-4">
              <span className="text-xs text-[#64748B]">
                Vols provar el cercador complet?
              </span>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#246BCE] hover:text-[#174A91] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Obrir a l&apos;app</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <StoreMap2D
              storeId={selectedStoreId}
              title={
                mode === 'product' && activeProduct
                  ? `${store.name} · Ruta fins a ${activeProduct.name}`
                  : `${store.name} · Recorregut optimitzat (${optimizedList.length} productes)`
              }
              targetZone={mode === 'product' ? productRoute?.zone || null : null}
              singlePath={mode === 'product' ? productRoute?.path || null : null}
              multiStops={mode === 'list' ? multiStops : null}
              zoom={zoom}
              onZoomChange={(delta) =>
                setZoom((z) => Math.min(2.0, Math.max(0.8, +(z + delta).toFixed(1))))
              }
              legendMode={mode === 'product' ? 'single' : 'multi'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
