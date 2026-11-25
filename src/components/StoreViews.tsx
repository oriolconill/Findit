import React from 'react';
import { Check, ChevronRight, Map as MapIcon, Navigation, RotateCcw, Search, SkipForward, X } from 'lucide-react';
import { CATALOGS, STORES } from '../data/stores';
import { NavigationContext, Product, StoreId, ViewState } from '../types';
import {
  formatProductPrice,
  generateWrittenDirections,
  getCategoryMeta,
  smartSearchStore,
} from '../utils/navigationEngine';
import { TopBar } from './NavigationShell';
import { ProductArt } from './ProductArt';
import { StoreMap2D } from './StoreMap2D';

interface ProductRowProps {
  storeId: StoreId;
  product: Product;
  showPrices: boolean;
  onSelect: () => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ storeId, product, showPrices, onSelect }) => {
  const priceText = formatProductPrice(product.price);
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full bg-white rounded-[14px] p-3 border border-[#E3E8F0] flex items-center gap-3 shadow-sm hover:border-[#246BCE]/45 active:scale-[0.985] transition text-left cursor-pointer"
    >
      <ProductArt storeId={storeId} product={product} size="md" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-[#202A36] leading-snug mb-0.5 truncate">
          {product.name}
        </div>
        <div className="text-xs text-[#737B87] mb-1 truncate">
          {product.brand} · {product.category}
        </div>
        <div className="flex items-center gap-2 text-xs flex-wrap">
          {showPrices && (
            <>
              <span className="font-bold text-[#174A91] tabular-nums">{priceText}</span>
              <span className="text-[#CBD5E1]" aria-hidden="true">·</span>
            </>
          )}
          <span className="font-semibold text-[#246BCE] truncate">
            {product.aisle} · {product.shelf}
          </span>
        </div>
      </div>
      <ChevronRight className="w-[18px] h-[18px] text-[#94A3B8] shrink-0" />
    </button>
  );
};

interface StoreSearchViewProps {
  storeId: StoreId;
  query: string;
  showPrices: boolean;
  onQueryChange: (q: string) => void;
  onPushView: (view: ViewState) => void;
  onOpenProductDetail: (storeId: StoreId, productId: string) => void;
  onChangeStore: () => void;
}

export const StoreSearchView: React.FC<StoreSearchViewProps> = ({
  storeId,
  query,
  showPrices,
  onQueryChange,
  onPushView,
  onOpenProductDetail,
  onChangeStore,
}) => {
  const store = STORES[storeId];
  const hasQuery = query.trim().length > 0;
  const results = hasQuery ? smartSearchStore(storeId, query) : null;

  return (
    <>
      <TopBar
        title={store.name}
        subtitle="Cerca de productes i categories"
        showBack={false}
        onBack={() => {}}
        activeStoreId={storeId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-4">
            <Search className="w-5 h-5 text-[#737B87] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Cerca productes o categories (ex: Lle, Làctics)..."
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

          {!hasQuery ? (
            <>
              <div
                className="rounded-[18px] p-4 text-white mb-5 shadow-sm flex items-center justify-between gap-3"
                style={{
                  background: `linear-gradient(135deg, ${store.color}, #174A91)`,
                }}
              >
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-white/85 tracking-wide">
                    Establiment actiu
                  </div>
                  <div className="text-xl font-extrabold font-display my-0.5 truncate">
                    {store.name}
                  </div>
                  <div className="text-xs text-white/90 tabular-nums">
                    {CATALOGS[storeId].length} referències · {store.categories.length} categories
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onPushView({ type: 'storeMapOnly', storeId })}
                  className="px-4 py-2.5 min-h-[44px] rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold shrink-0 inline-flex items-center gap-1.5 transition cursor-pointer"
                >
                  <MapIcon className="w-4 h-4" />
                  <span>Mapa</span>
                </button>
              </div>

              <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-2.5">
                Categories de {store.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {store.categories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() =>
                      onPushView({ type: 'categoryProducts', storeId, category: cat.name })
                    }
                    className="bg-white rounded-[14px] p-3 border border-[#E3E8F0] flex items-center gap-2.5 text-left shadow-sm hover:border-[#246BCE]/45 active:scale-[0.985] transition cursor-pointer min-h-[60px]"
                  >
                    <div
                      className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg shrink-0"
                      style={{ backgroundColor: cat.bg, color: cat.color }}
                    >
                      {cat.icon}
                    </div>
                    <span className="text-[13px] font-bold text-[#202A36] leading-tight">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>

              <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-2.5">
                Productes destacats
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {CATALOGS[storeId].slice(0, 6).map((p) => (
                  <ProductRow
                    key={p.id}
                    storeId={storeId}
                    product={p}
                    showPrices={showPrices}
                    onSelect={() => onOpenProductDetail(storeId, p.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {results && results.categories.length > 0 && (
                <div className="mb-5">
                  <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-2.5 tabular-nums">
                    Categories relacionades ({results.categories.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {results.categories.map((cat) => (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() =>
                          onPushView({ type: 'categoryProducts', storeId, category: cat.name })
                        }
                        className="bg-white rounded-[14px] p-3 border flex items-center gap-3 text-left shadow-sm active:scale-[0.985] transition cursor-pointer"
                        style={{ borderColor: cat.color }}
                      >
                        <div
                          className="w-10 h-10 rounded-[10px] flex items-center justify-center text-lg shrink-0"
                          style={{ backgroundColor: cat.bg, color: cat.color }}
                        >
                          {cat.icon}
                        </div>
                        <div className="min-w-0">
                          <div
                            className="text-[13px] font-extrabold truncate"
                            style={{ color: cat.color }}
                          >
                            {cat.name}
                          </div>
                          <div className="text-[11px] text-[#737B87]">
                            Veure tots els productes
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-2.5 tabular-nums">
                Productes trobats ({results?.products.length ?? 0})
              </h2>
              {!results || results.products.length === 0 ? (
                <div className="text-center p-7 bg-white rounded-[18px] border border-dashed border-[#CBD5E1] text-[#737B87] text-sm leading-relaxed">
                  No s&apos;han trobat productes per «{query}» dins de {store.name}. Prova amb una
                  altra paraula o categoria.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {results.products.map((p) => (
                    <ProductRow
                      key={p.id}
                      storeId={storeId}
                      product={p}
                      showPrices={showPrices}
                      onSelect={() => onOpenProductDetail(storeId, p.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
};

interface CategoryProductsViewProps {
  storeId: StoreId;
  category: string;
  showPrices: boolean;
  onBack: () => void;
  onOpenProductDetail: (storeId: StoreId, productId: string) => void;
  onChangeStore: () => void;
}

export const CategoryProductsView: React.FC<CategoryProductsViewProps> = ({
  storeId,
  category,
  showPrices,
  onBack,
  onOpenProductDetail,
  onChangeStore,
}) => {
  const store = STORES[storeId];
  const catMeta = getCategoryMeta(storeId, category);
  const list = CATALOGS[storeId].filter((p) => p.category === category);

  return (
    <>
      <TopBar
        title={category}
        subtitle={`${store.name} · ${list.length} productes`}
        onBack={onBack}
        activeStoreId={storeId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-[18px] p-4 border mb-4 flex items-center gap-3.5"
            style={{ backgroundColor: catMeta.bg, borderColor: `${catMeta.color}44` }}
          >
            <div className="text-3xl leading-none">{catMeta.icon}</div>
            <div>
              <div className="text-[17px] font-extrabold text-[#202A36] font-display">
                {category}
              </div>
              <div className="text-xs text-[#737B87] tabular-nums">
                {list.length} productes disponibles a {store.name}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {list.map((p) => (
              <ProductRow
                key={p.id}
                storeId={storeId}
                product={p}
                showPrices={showPrices}
                onSelect={() => onOpenProductDetail(storeId, p.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

interface ProductDetailViewProps {
  storeId: StoreId;
  productId: string;
  source: 'search' | 'return';
  selectedSize: string | null;
  selectedColor: string | null;
  returnId: string | null;
  showPrices: boolean;
  onBack: () => void;
  onSetVariant: (key: 'selectedSize' | 'selectedColor', val: string) => void;
  onOpenDirections: (ctx: NavigationContext) => void;
  onOpenProductMap: (ctx: NavigationContext) => void;
  onAddToList: (storeId: StoreId, productId: string, variantLabel: string) => void;
  onAddToReturns: (storeId: StoreId, productId: string, variantLabel: string) => void;
  onChangeStore: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  storeId,
  productId,
  source,
  selectedSize,
  selectedColor,
  returnId,
  showPrices,
  onBack,
  onSetVariant,
  onOpenDirections,
  onOpenProductMap,
  onAddToList,
  onAddToReturns,
  onChangeStore,
}) => {
  const store = STORES[storeId];
  const p = CATALOGS[storeId].find((x) => x.id === productId);
  if (!p) return null;

  const priceText = formatProductPrice(p.price);
  const variantLabel = [selectedSize, selectedColor].filter(Boolean).join(' · ') || p.format;

  const ctx: NavigationContext =
    source === 'return'
      ? { source: 'return', returnId: returnId || undefined, storeId, productId }
      : { source: 'search', storeId, productId };

  return (
    <>
      <TopBar
        title={source === 'return' ? 'Devolució de producte' : 'Fitxa del producte'}
        subtitle={store.name}
        onBack={onBack}
        activeStoreId={storeId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[18px] p-5 border border-[#E3E8F0] shadow-sm text-center">
            <div className="flex justify-center mb-3.5">
              <ProductArt storeId={storeId} product={p} size="lg" />
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-semibold mb-2">
              <span
                className={
                  p.availability === 'Estoc limitat' ? 'text-[#D97706]' : 'text-[#16A34A]'
                }
              >
                {p.availability}
              </span>
              <span className="text-[#CBD5E1]" aria-hidden="true">·</span>
              <span className="text-[#174A91]">{p.category}</span>
            </div>

            <h1 className="text-xl font-extrabold text-[#202A36] leading-snug mb-1 font-display text-balance">
              {p.name}
            </h1>
            <div className="text-sm text-[#737B87] mb-2.5">
              {p.brand} · {p.format}
            </div>
            {showPrices && (
              <div className="text-2xl font-extrabold text-[#246BCE] tabular-nums">{priceText}</div>
            )}

            {p.variants && (
              <div className="text-left mt-4 pt-4 border-t border-[#E3E8F0]">
                {p.variants.sizes && (
                  <div className="mb-3">
                    <div className="text-xs font-bold text-[#737B87] mb-1.5">Talla / Format</div>
                    <div className="flex flex-wrap gap-2">
                      {p.variants.sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => onSetVariant('selectedSize', sz)}
                          className={`px-3 py-2 min-h-[40px] rounded-[10px] border-[1.5px] text-[13px] font-semibold transition cursor-pointer ${
                            selectedSize === sz
                              ? 'border-[#246BCE] bg-[#EAF3FF] text-[#174A91]'
                              : 'border-[#E3E8F0] bg-white text-[#202A36] hover:bg-[#F5F9FF]'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {p.variants.colors && (
                  <div>
                    <div className="text-xs font-bold text-[#737B87] mb-1.5">Color</div>
                    <div className="flex flex-wrap gap-2">
                      {p.variants.colors.map((cl) => (
                        <button
                          key={cl}
                          type="button"
                          onClick={() => onSetVariant('selectedColor', cl)}
                          className={`px-3 py-2 min-h-[40px] rounded-[10px] border-[1.5px] text-[13px] font-semibold transition cursor-pointer ${
                            selectedColor === cl
                              ? 'border-[#246BCE] bg-[#EAF3FF] text-[#174A91]'
                              : 'border-[#E3E8F0] bg-white text-[#202A36] hover:bg-[#F5F9FF]'
                          }`}
                        >
                          {cl}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-gradient-to-br from-[#EAF3FF] to-[#F5F9FF] border-[1.5px] border-[#BFDBFE] rounded-[14px] p-3.5 my-4 text-left">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#246BCE] mb-1">
                {source === 'return'
                  ? "Ubicació original dins de l'establiment"
                  : 'Ubicació exacta'}
              </div>
              <div className="text-[15px] font-bold text-[#174A91] leading-snug">
                {p.aisle} · {p.section} · {p.shelf} · {p.level}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onOpenDirections(ctx)}
                className="min-h-[48px] px-4 py-3 rounded-[14px] bg-[#246BCE] text-white text-[15px] font-bold shadow-md shadow-[#246BCE]/25 inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
              >
                <Navigation className="w-4 h-4 shrink-0" />
                <span>Com arribar-hi</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenProductMap(ctx)}
                className="min-h-[48px] px-4 py-3 rounded-[14px] bg-[#174A91] text-white text-[15px] font-bold inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
              >
                <MapIcon className="w-4 h-4 shrink-0" />
                <span>Veure mapa</span>
              </button>
            </div>
          </div>

          {source !== 'return' && (
            <div className="bg-white rounded-[18px] p-4 border border-[#E3E8F0] shadow-sm mt-3 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => onAddToList(storeId, p.id, variantLabel)}
                className="w-full min-h-[48px] px-4 py-3 rounded-[14px] bg-[#EAF3FF] hover:bg-[#DCEBFF] text-[#174A91] text-[15px] font-bold active:scale-[0.98] transition cursor-pointer"
              >
                + Afegir a la meva llista de {store.name}
              </button>
              <button
                type="button"
                onClick={() => onAddToReturns(storeId, p.id, variantLabel)}
                className="w-full min-h-[48px] px-4 py-3 rounded-[14px] bg-white border-[1.5px] border-[#E3E8F0] hover:bg-[#F5F9FF] text-[#202A36] text-[15px] font-bold inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Marcar per retornar a aquesta ubicació</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

interface DirectionsViewProps {
  ctx: NavigationContext;
  activeStoreId: StoreId | null;
  onBack: () => void;
  onSwitchToMap: (ctx: NavigationContext) => void;
  onMarkTourItemFound: (storeId: StoreId, itemUid: string, fromSubScreen: boolean) => void;
  onCompleteReturn: (returnId: string) => void;
  onChangeStore: () => void;
}

export const DirectionsView: React.FC<DirectionsViewProps> = ({
  ctx,
  activeStoreId,
  onBack,
  onSwitchToMap,
  onMarkTourItemFound,
  onCompleteReturn,
  onChangeStore,
}) => {
  const store = STORES[ctx.storeId];
  const p = CATALOGS[ctx.storeId].find((x) => x.id === ctx.productId);
  if (!p) return null;

  const { steps, zone } = generateWrittenDirections(ctx.storeId, p);

  return (
    <>
      <TopBar
        title="Com arribar-hi"
        subtitle={`${store.name} · ${p.name}`}
        onBack={onBack}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[18px] p-4 border border-[#E3E8F0] shadow-sm mb-4 flex items-center gap-3">
            <ProductArt storeId={ctx.storeId} product={p} size="md" />
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-extrabold text-[#202A36] truncate">{p.name}</div>
              <div className="text-xs text-[#246BCE] font-bold mt-0.5">
                {p.aisle} · {p.section} · {p.shelf} · {p.level}
              </div>
            </div>
          </div>

          <h2 className="text-xs font-bold tracking-wider uppercase text-[#737B87] mb-2.5">
            Indicacions pas a pas ({zone.label})
          </h2>

          <div className="flex flex-col gap-2.5 mb-4">
            {steps.map((txt, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-3.5 bg-white rounded-[14px] border border-[#E3E8F0] items-start"
              >
                <div className="w-[30px] h-[30px] rounded-full bg-[#246BCE] text-white font-extrabold text-sm flex items-center justify-center shrink-0 tabular-nums">
                  {idx + 1}
                </div>
                <div className="text-sm font-medium leading-relaxed text-[#202A36]">{txt}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => onSwitchToMap(ctx)}
              className="w-full min-h-[48px] px-4 py-3 rounded-[14px] bg-[#174A91] hover:bg-[#123A73] text-white text-[15px] font-bold inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
            >
              <MapIcon className="w-4 h-4 shrink-0" />
              <span>Veure mapa</span>
            </button>

            {ctx.source === 'list' && ctx.itemUid && (
              <button
                type="button"
                onClick={() => onMarkTourItemFound(ctx.storeId, ctx.itemUid!, true)}
                className="w-full min-h-[50px] px-4 py-3 rounded-[14px] bg-[#16A34A] hover:bg-[#15803D] text-white text-[15px] font-bold shadow-md shadow-[#16A34A]/25 inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
              >
                <Check className="w-5 h-5" />
                <span>PRODUCTE TROBAT</span>
              </button>
            )}

            {ctx.source === 'return' && ctx.returnId && (
              <button
                type="button"
                onClick={() => onCompleteReturn(ctx.returnId!)}
                className="w-full min-h-[50px] px-4 py-3 rounded-[14px] bg-[#16A34A] hover:bg-[#15803D] text-white text-[15px] font-bold shadow-md shadow-[#16A34A]/25 inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
              >
                <Check className="w-5 h-5" />
                <span>PRODUCTE RETORNAT</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

interface ProductMapViewProps {
  ctx: NavigationContext;
  activeStoreId: StoreId | null;
  zoom: number;
  onZoomChange: (delta: number) => void;
  onBack: () => void;
  onContinueSearch: (storeId: StoreId, markFound: boolean) => void;
  onMarkTourItemFound: (storeId: StoreId, itemUid: string, fromSubScreen: boolean) => void;
  onSkipTourItemFromMap: (storeId: StoreId, itemUid: string) => void;
  onCompleteReturn: (returnId: string) => void;
  onChangeStore: () => void;
}

export const ProductMapView: React.FC<ProductMapViewProps> = ({
  ctx,
  activeStoreId,
  zoom,
  onZoomChange,
  onBack,
  onContinueSearch,
  onMarkTourItemFound,
  onSkipTourItemFromMap,
  onCompleteReturn,
  onChangeStore,
}) => {
  const store = STORES[ctx.storeId];
  const p = CATALOGS[ctx.storeId].find((x) => x.id === ctx.productId);
  if (!p) return null;

  const { zone, path } = generateWrittenDirections(ctx.storeId, p);

  return (
    <>
      <TopBar
        title="Mapa de l'establiment"
        subtitle={`${store.name} · ${p.name}`}
        onBack={onBack}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#EAF3FF] to-[#F5F9FF] border-[1.5px] border-[#BFDBFE] rounded-[14px] p-3.5 mb-3.5">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#246BCE] mb-1">
              {ctx.source === 'return' ? 'Destí de devolució' : 'Destí del producte'}
            </div>
            <div className="text-[15px] font-bold text-[#174A91] leading-snug">
              {p.aisle} · {p.section} · {p.shelf} · {p.level}
            </div>
          </div>

          <StoreMap2D
            storeId={ctx.storeId}
            title={`Vista superior 2D · ${store.name}`}
            targetZone={zone}
            singlePath={path}
            zoom={zoom}
            onZoomChange={onZoomChange}
            legendMode="single"
          />

          <div className="flex flex-col gap-2.5 mt-3">
            {ctx.source === 'search' && (
              <>
                <button
                  type="button"
                  onClick={() => onContinueSearch(ctx.storeId, true)}
                  className="w-full min-h-[50px] px-4 py-3 rounded-[14px] bg-[#16A34A] hover:bg-[#15803D] text-white text-[15px] font-bold shadow-md shadow-[#16A34A]/25 inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
                >
                  <Check className="w-5 h-5" />
                  <span>PRODUCTE TROBAT</span>
                </button>
                <button
                  type="button"
                  onClick={() => onContinueSearch(ctx.storeId, false)}
                  className="w-full min-h-[48px] px-4 py-3 rounded-[14px] bg-[#EAF3FF] hover:bg-[#DCEBFF] text-[#174A91] text-[15px] font-bold inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
                >
                  <Search className="w-4 h-4 shrink-0" />
                  <span>Seguir buscant un altre producte</span>
                </button>
              </>
            )}

            {ctx.source === 'list' && ctx.itemUid && (
              <>
                <button
                  type="button"
                  onClick={() => onMarkTourItemFound(ctx.storeId, ctx.itemUid!, true)}
                  className="w-full min-h-[50px] px-4 py-3 rounded-[14px] bg-[#16A34A] hover:bg-[#15803D] text-white text-[15px] font-bold shadow-md shadow-[#16A34A]/25 inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
                >
                  <Check className="w-5 h-5" />
                  <span>PRODUCTE TROBAT</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSkipTourItemFromMap(ctx.storeId, ctx.itemUid!)}
                  className="w-full min-h-[48px] px-4 py-3 rounded-[14px] bg-[#EAF3FF] hover:bg-[#DCEBFF] text-[#174A91] text-[15px] font-bold inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
                >
                  <SkipForward className="w-4 h-4 shrink-0" />
                  <span>Passar al següent producte</span>
                </button>
              </>
            )}

            {ctx.source === 'return' && ctx.returnId && (
              <button
                type="button"
                onClick={() => onCompleteReturn(ctx.returnId!)}
                className="w-full min-h-[50px] px-4 py-3 rounded-[14px] bg-[#16A34A] hover:bg-[#15803D] text-white text-[15px] font-bold shadow-md shadow-[#16A34A]/25 inline-flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
              >
                <Check className="w-5 h-5" />
                <span>PRODUCTE RETORNAT</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

interface StoreMapOnlyViewProps {
  storeId: StoreId;
  activeStoreId: StoreId | null;
  zoom: number;
  onZoomChange: (delta: number) => void;
  onBack: () => void;
  onChangeStore: () => void;
}

export const StoreMapOnlyView: React.FC<StoreMapOnlyViewProps> = ({
  storeId,
  activeStoreId,
  zoom,
  onZoomChange,
  onBack,
  onChangeStore,
}) => {
  const store = STORES[storeId];

  return (
    <>
      <TopBar
        title="Mapa general"
        subtitle={store.name}
        onBack={onBack}
        activeStoreId={activeStoreId}
        onChangeStore={onChangeStore}
      />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:px-8 lg:py-6">
        <div className="max-w-3xl mx-auto">
          <StoreMap2D
            storeId={storeId}
            title={`Plànol complet · ${store.name}`}
            zoom={zoom}
            onZoomChange={onZoomChange}
            legendMode="general"
          />
        </div>
      </main>
    </>
  );
};
