import { useEffect, useRef, useState } from 'react';
import {
  DetectStoreView,
  GlobalStoreSearchView,
  HomeView,
  QrScanView,
} from './components/HomeViews';
import {
  FullListMapView,
  ListCompleteView,
  ListDetailView,
  ListsHomeView,
  ListTourView,
} from './components/ListViews';
import { BottomNav, DesktopSidebar } from './components/NavigationShell';
import {
  ProfileHelpView,
  ProfileHistoryView,
  ProfileInfoView,
  ProfileView,
  ReturnsHomeView,
} from './components/ReturnsAndProfileViews';
import {
  CategoryProductsView,
  DirectionsView,
  ProductDetailView,
  ProductMapView,
  StoreMapOnlyView,
  StoreSearchView,
} from './components/StoreViews';
import { CATALOGS, STORES } from './data/stores';
import {
  AppState,
  NavigationContext,
  NavTab,
  StoreId,
  UserPreferences,
  ViewState,
} from './types';
import { optimizeListItems } from './utils/navigationEngine';

const STORAGE_KEY = 'findit_app_state_v1';

function defaultState(): AppState {
  return {
    activeTab: 'inici',
    activeStoreId: null,
    recentStores: [],
    userName: 'Usuari Demo',
    preferences: {
      largeText: false,
      showPrices: true,
    },
    viewStack: [{ type: 'home' }],
    lists: {
      mercadona: [
        { uid: 'init-1', productId: 'm-lle1', variantLabel: 'Brick 1 L', found: false },
        { uid: 'init-2', productId: 'm-arr', variantLabel: 'Paquet 1 kg', found: false },
        { uid: 'init-3', productId: 'm-ton', variantLabel: 'Pack 6x80 g', found: false },
        { uid: 'init-4', productId: 'm-gal', variantLabel: 'Paquet 800 g', found: false },
        { uid: 'init-5', productId: 'm-iog2', variantLabel: 'Pack 4x125 g', found: false },
        { uid: 'init-6', productId: 'm-tom', variantLabel: 'Malla 1 kg', found: false },
      ],
      zara: [],
      biblioteca: [],
      decathlon: [],
    },
    templates: [],
    activeTour: null,
    returns: [
      { id: 'ret-1', storeId: 'zara', productId: 'z-cam1', variantLabel: 'Talla M · Blanc', status: 'pending' },
      { id: 'ret-2', storeId: 'decathlon', productId: 'd-run1', variantLabel: 'Talla 42 · Blau elèctric', status: 'pending' },
      { id: 'ret-3', storeId: 'biblioteca', productId: 'b-hp', variantLabel: 'Tapa dura', status: 'pending' },
    ],
    stats: { listsCompleted: 0, returnsCompleted: 0 },
    mapZoom: 1,
    modal: null,
  };
}

function loadInitialState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const base = defaultState();
    return {
      ...base,
      ...parsed,
      userName: typeof parsed.userName === 'string' ? parsed.userName : base.userName,
      preferences: { ...base.preferences, ...(parsed.preferences || {}) },
      lists: { ...base.lists, ...(parsed.lists || {}) },
      stats: { ...base.stats, ...(parsed.stats || {}) },
      viewStack: parsed.viewStack && parsed.viewStack.length > 0 ? parsed.viewStack : base.viewStack,
      modal: null,
    };
  } catch {
    return defaultState();
  }
}

export default function App() {
  const [state, setState] = useState<AppState>(loadInitialState);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const toSave: AppState = { ...state, modal: null };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // Ignore storage quota errors
    }
  }, [state]);

  useEffect(() => {
    document.documentElement.style.fontSize = state.preferences.largeText ? '18px' : '16px';
    return () => {
      document.documentElement.style.fontSize = '';
    };
  }, [state.preferences.largeText]);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 2400);
  };

  const currentView = state.viewStack[state.viewStack.length - 1] || { type: 'home' };

  const pushView = (view: ViewState) => {
    setState((prev) => ({
      ...prev,
      viewStack: [...prev.viewStack, view],
      mapZoom: 1,
    }));
  };

  const replaceView = (view: ViewState) => {
    setState((prev) => ({
      ...prev,
      viewStack: [...prev.viewStack.slice(0, -1), view],
      mapZoom: 1,
    }));
  };

  const popView = () => {
    setState((prev) => {
      if (prev.viewStack.length <= 1) return prev;
      return {
        ...prev,
        viewStack: prev.viewStack.slice(0, -1),
        mapZoom: 1,
      };
    });
  };

  const enterStore = (storeId: StoreId) => {
    setState((prev) => ({
      ...prev,
      activeStoreId: storeId,
      recentStores: [storeId, ...prev.recentStores.filter((id) => id !== storeId)].slice(0, 4),
      activeTab: 'cerca',
      viewStack: [{ type: 'storeSearch', storeId, query: '' }],
      mapZoom: 1,
    }));
  };

  const switchTab = (tab: NavTab) => {
    setState((prev) => {
      let nextStack: ViewState[] = [{ type: 'home' }];
      if (tab === 'inici') {
        nextStack = [{ type: 'home' }];
      } else if (tab === 'cerca') {
        nextStack = prev.activeStoreId
          ? [{ type: 'storeSearch', storeId: prev.activeStoreId, query: '' }]
          : [{ type: 'globalStoreSearch', query: '' }];
      } else if (tab === 'llistes') {
        nextStack = [{ type: 'listsHome' }];
      } else if (tab === 'devolucions') {
        nextStack = [{ type: 'returnsHome' }];
      } else if (tab === 'perfil') {
        nextStack = [{ type: 'profile' }];
      }
      return {
        ...prev,
        activeTab: tab,
        viewStack: nextStack,
        mapZoom: 1,
      };
    });
  };

  const updateCurrentQuery = (query: string) => {
    setState((prev) => {
      const top = prev.viewStack[prev.viewStack.length - 1];
      if (!top || (top.type !== 'globalStoreSearch' && top.type !== 'storeSearch')) return prev;
      const updated = { ...top, query };
      return {
        ...prev,
        viewStack: [...prev.viewStack.slice(0, -1), updated],
      };
    });
  };

  const updateListAddQuery = (addQuery: string) => {
    setState((prev) => {
      const top = prev.viewStack[prev.viewStack.length - 1];
      if (!top || top.type !== 'listDetail') return prev;
      const updated = { ...top, addQuery };
      return {
        ...prev,
        viewStack: [...prev.viewStack.slice(0, -1), updated],
      };
    });
  };

  const openProductDetail = (
    storeId: StoreId,
    productId: string,
    source: 'search' | 'return' = 'search',
    extra?: { returnId?: string }
  ) => {
    const prod = CATALOGS[storeId].find((p) => p.id === productId);
    const defaultSize = prod?.variants?.sizes ? prod.variants.sizes[0] : null;
    const defaultColor = prod?.variants?.colors ? prod.variants.colors[0] : null;
    pushView({
      type: 'productDetail',
      storeId,
      productId,
      source,
      selectedSize: defaultSize,
      selectedColor: defaultColor,
      returnId: extra?.returnId || null,
    });
  };

  const setDetailVariant = (key: 'selectedSize' | 'selectedColor', val: string) => {
    setState((prev) => {
      const top = prev.viewStack[prev.viewStack.length - 1];
      if (!top || top.type !== 'productDetail') return prev;
      return {
        ...prev,
        viewStack: [...prev.viewStack.slice(0, -1), { ...top, [key]: val }],
      };
    });
  };

  const adjustZoom = (delta: number) => {
    setState((prev) => ({
      ...prev,
      mapZoom: Math.min(2.0, Math.max(0.8, +(prev.mapZoom + delta).toFixed(1))),
    }));
  };

  const addProductToStoreList = (
    storeId: StoreId,
    productId: string,
    variantLabel: string,
    stayInList = false
  ) => {
    const uid = `li-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setState((prev) => {
      const nextLists = {
        ...prev.lists,
        [storeId]: [...(prev.lists[storeId] || []), { uid, productId, variantLabel, found: false }],
      };
      let nextStack = prev.viewStack;
      if (stayInList) {
        const top = prev.viewStack[prev.viewStack.length - 1];
        if (top && top.type === 'listDetail') {
          nextStack = [...prev.viewStack.slice(0, -1), { ...top, addQuery: '' }];
        }
      }
      return { ...prev, lists: nextLists, viewStack: nextStack };
    });
    if (!stayInList) {
      showToast(`Afegit a la llista de ${STORES[storeId].name}`);
    }
  };

  const removeListItem = (storeId: StoreId, uid: string) => {
    setState((prev) => ({
      ...prev,
      lists: {
        ...prev.lists,
        [storeId]: (prev.lists[storeId] || []).filter((i) => i.uid !== uid),
      },
    }));
  };

  const startListTour = (storeId: StoreId) => {
    const optimized = optimizeListItems(storeId, state.lists[storeId] || []);
    const pending = optimized.filter((i) => !i.found && !i.unlocatable);
    if (pending.length === 0) {
      pushView({ type: 'listComplete', storeId });
      return;
    }
    const resumeUid =
      state.activeTour?.storeId === storeId &&
      pending.some((i) => i.uid === state.activeTour?.currentUid)
        ? state.activeTour.currentUid
        : pending[0].uid;

    setState((prev) => ({
      ...prev,
      activeTour: { storeId, currentUid: resumeUid, paused: false },
      viewStack: [...prev.viewStack, { type: 'listTour', storeId }],
      mapZoom: 1,
    }));
  };

  const markTourItemFound = (storeId: StoreId, itemUid: string, fromSubScreen: boolean) => {
    setState((prev) => {
      const updatedList = (prev.lists[storeId] || []).map((i) =>
        i.uid === itemUid ? { ...i, found: true } : i
      );
      const optimized = optimizeListItems(storeId, updatedList).filter((i) => !i.unlocatable);
      const nextPending = optimized.find((i) => !i.found);

      let stack = prev.viewStack;
      if (fromSubScreen && stack.length > 1) {
        stack = stack.slice(0, -1);
      }

      if (!nextPending) {
        return {
          ...prev,
          lists: { ...prev.lists, [storeId]: updatedList },
          activeTour: null,
          stats: { ...prev.stats, listsCompleted: prev.stats.listsCompleted + 1 },
          viewStack: [...stack.slice(0, -1), { type: 'listComplete', storeId }],
          mapZoom: 1,
        };
      }

      return {
        ...prev,
        lists: { ...prev.lists, [storeId]: updatedList },
        activeTour: { storeId, currentUid: nextPending.uid, paused: false },
        viewStack: stack,
      };
    });
  };

  const skipTourItem = (storeId: StoreId, currentUid: string) => {
    const optimized = optimizeListItems(storeId, state.lists[storeId] || []).filter(
      (i) => !i.unlocatable && !i.found
    );
    if (optimized.length <= 1) {
      showToast("És l'últim producte pendent!");
      return;
    }
    const idx = optimized.findIndex((i) => i.uid === currentUid);
    const next = optimized[(idx + 1) % optimized.length];
    setState((prev) => ({
      ...prev,
      activeTour: { storeId, currentUid: next.uid, paused: false },
    }));
  };

  const skipTourItemFromMap = (storeId: StoreId, currentUid: string) => {
    const optimized = optimizeListItems(storeId, state.lists[storeId] || []).filter(
      (i) => !i.unlocatable && !i.found
    );
    if (optimized.length <= 1) {
      showToast("És l'últim producte pendent!");
      return;
    }
    const idx = optimized.findIndex((i) => i.uid === currentUid);
    const next = optimized[(idx + 1) % optimized.length];
    setState((prev) => ({
      ...prev,
      activeTour: { storeId, currentUid: next.uid, paused: false },
      viewStack: prev.viewStack.length > 1 ? prev.viewStack.slice(0, -1) : prev.viewStack,
      mapZoom: 1,
    }));
  };

  const continueSearchingFromMap = (storeId: StoreId, markFound: boolean) => {
    setState((prev) => ({
      ...prev,
      activeStoreId: storeId,
      activeTab: 'cerca',
      viewStack: [{ type: 'storeSearch', storeId, query: '' }],
      mapZoom: 1,
    }));
    showToast(
      markFound
        ? 'Producte trobat! Cerca el següent producte'
        : 'Cerca el següent producte'
    );
  };

  const pauseTour = () => {
    setState((prev) => ({
      ...prev,
      activeTour: prev.activeTour ? { ...prev.activeTour, paused: true } : null,
      viewStack: prev.viewStack.length > 1 ? prev.viewStack.slice(0, -1) : prev.viewStack,
      mapZoom: 1,
    }));
  };

  const confirmDeleteList = (storeId: StoreId) => {
    setState((prev) => ({
      ...prev,
      modal: {
        title: 'Eliminar llista',
        message: 'Vols eliminar aquesta llista? Aquesta acció no es pot desfer.',
        confirmText: 'Eliminar definitivament',
        actionType: 'deleteList',
        storeIdToDelete: storeId,
      },
    }));
  };

  const confirmClearHistory = () => {
    setState((prev) => ({
      ...prev,
      modal: {
        title: "Esborrar l'historial d'establiments",
        message: "S'eliminaran els establiments recents del teu historial. Vols continuar?",
        confirmText: "Esborrar historial",
        actionType: 'clearHistory',
      },
    }));
  };

  const confirmResetDemoData = () => {
    setState((prev) => ({
      ...prev,
      modal: {
        title: 'Restablir dades de demostració',
        message: 'Es restauraran les llistes, devolucions, preferències i historial inicials.',
        confirmText: 'Restablir dades',
        actionType: 'resetDemo',
      },
    }));
  };

  const executeModalAction = () => {
    if (!state.modal) return;
    if (state.modal.actionType === 'deleteList' && state.modal.storeIdToDelete) {
      const storeId = state.modal.storeIdToDelete;
      setState((prev) => ({
        ...prev,
        lists: { ...prev.lists, [storeId]: [] },
        activeTour: prev.activeTour?.storeId === storeId ? null : prev.activeTour,
        modal: null,
        activeTab: 'llistes',
        viewStack: [{ type: 'listsHome' }],
        mapZoom: 1,
      }));
    } else if (state.modal.actionType === 'clearHistory') {
      setState((prev) => ({
        ...prev,
        recentStores: [],
        modal: null,
      }));
      showToast("Historial d'establiments esborrat");
    } else if (state.modal.actionType === 'resetDemo') {
      localStorage.removeItem(STORAGE_KEY);
      setState(defaultState());
      showToast('Dades de demostració restablertes');
    }
  };

  const saveListAsTemplate = (storeId: StoreId) => {
    const items = (state.lists[storeId] || []).map((i) => ({
      productId: i.productId,
      variantLabel: i.variantLabel,
    }));
    if (items.length === 0) return;

    const store = STORES[storeId];
    const count = state.templates.filter((t) => t.storeId === storeId).length + 1;

    setState((prev) => ({
      ...prev,
      templates: [
        {
          id: `tpl-${Date.now()}`,
          storeId,
          name: `Compra habitual ${store.name} #${count}`,
          createdAt: Date.now(),
          items,
        },
        ...prev.templates,
      ],
      activeTour: null,
      activeTab: 'llistes',
      viewStack: [{ type: 'listsHome' }],
      mapZoom: 1,
    }));
    showToast('Plantilla guardada per a futures compres!');
  };

  const startFromTemplate = (tplId: string) => {
    const tpl = state.templates.find((t) => t.id === tplId);
    if (!tpl) return;
    const newItems = tpl.items.map((it, idx) => ({
      uid: `tpl-item-${Date.now()}-${idx}`,
      productId: it.productId,
      variantLabel: it.variantLabel,
      found: false,
    }));

    setState((prev) => ({
      ...prev,
      lists: { ...prev.lists, [tpl.storeId]: newItems },
      activeTour: null,
      viewStack: [...prev.viewStack, { type: 'listDetail', storeId: tpl.storeId, addQuery: '' }],
      mapZoom: 1,
    }));
  };

  const deleteTemplate = (tplId: string) => {
    setState((prev) => ({
      ...prev,
      templates: prev.templates.filter((t) => t.id !== tplId),
    }));
  };

  const addProductToReturns = (storeId: StoreId, productId: string, variantLabel: string) => {
    setState((prev) => ({
      ...prev,
      returns: [
        {
          id: `ret-${Date.now()}`,
          storeId,
          productId,
          variantLabel,
          status: 'pending',
        },
        ...prev.returns,
      ],
    }));
    showToast('Producte afegit a Devolucions');
  };

  const completeReturnItem = (returnId: string) => {
    setState((prev) => ({
      ...prev,
      returns: prev.returns.filter((r) => r.id !== returnId),
      stats: { ...prev.stats, returnsCompleted: prev.stats.returnsCompleted + 1 },
      activeTab: 'devolucions',
      viewStack: [{ type: 'returnsHome' }],
      mapZoom: 1,
    }));
    showToast('Producte retornat a la seva ubicació original!');
  };

  const exitActiveStore = () => {
    setState((prev) => ({ ...prev, activeStoreId: null }));
    showToast("Has sortit de l'establiment");
  };

  const updateUserName = (userName: string) => {
    setState((prev) => ({ ...prev, userName }));
  };

  const togglePreference = (key: keyof UserPreferences) => {
    setState((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key],
      },
    }));
  };

  const openDirections = (ctx: NavigationContext) => pushView({ type: 'directions', ctx });
  const openProductMap = (ctx: NavigationContext) => pushView({ type: 'productMap', ctx });

  const pendingReturnsCount = state.returns.filter((r) => r.status === 'pending').length;

  const renderMainView = () => {
    switch (currentView.type) {
      case 'home':
        return (
          <HomeView
            recentStores={state.recentStores}
            onPushView={pushView}
            onEnterStore={enterStore}
          />
        );
      case 'globalStoreSearch':
        return (
          <GlobalStoreSearchView
            query={currentView.query}
            canGoBack={state.viewStack.length > 1}
            activeStoreId={state.activeStoreId}
            onQueryChange={updateCurrentQuery}
            onBack={popView}
            onEnterStore={enterStore}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'qrScan':
        return (
          <QrScanView
            activeStoreId={state.activeStoreId}
            onBack={popView}
            onEnterStore={enterStore}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'detectStore':
        return (
          <DetectStoreView
            activeStoreId={state.activeStoreId}
            onBack={popView}
            onEnterStore={enterStore}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'storeSearch':
        return (
          <StoreSearchView
            storeId={currentView.storeId}
            query={currentView.query}
            showPrices={state.preferences.showPrices}
            onQueryChange={updateCurrentQuery}
            onPushView={pushView}
            onOpenProductDetail={(sId, pId) => openProductDetail(sId, pId, 'search')}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'categoryProducts':
        return (
          <CategoryProductsView
            storeId={currentView.storeId}
            category={currentView.category}
            showPrices={state.preferences.showPrices}
            onBack={popView}
            onOpenProductDetail={(sId, pId) => openProductDetail(sId, pId, 'search')}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'productDetail':
        return (
          <ProductDetailView
            storeId={currentView.storeId}
            productId={currentView.productId}
            source={currentView.source}
            selectedSize={currentView.selectedSize}
            selectedColor={currentView.selectedColor}
            returnId={currentView.returnId}
            showPrices={state.preferences.showPrices}
            onBack={popView}
            onSetVariant={setDetailVariant}
            onOpenDirections={openDirections}
            onOpenProductMap={openProductMap}
            onAddToList={(sId, pId, vLabel) => addProductToStoreList(sId, pId, vLabel, false)}
            onAddToReturns={addProductToReturns}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'directions':
        return (
          <DirectionsView
            ctx={currentView.ctx}
            activeStoreId={state.activeStoreId}
            onBack={popView}
            onSwitchToMap={(ctx) => replaceView({ type: 'productMap', ctx })}
            onMarkTourItemFound={markTourItemFound}
            onCompleteReturn={completeReturnItem}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'productMap':
        return (
          <ProductMapView
            ctx={currentView.ctx}
            activeStoreId={state.activeStoreId}
            zoom={state.mapZoom}
            onZoomChange={adjustZoom}
            onBack={popView}
            onContinueSearch={continueSearchingFromMap}
            onMarkTourItemFound={markTourItemFound}
            onSkipTourItemFromMap={skipTourItemFromMap}
            onCompleteReturn={completeReturnItem}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'storeMapOnly':
        return (
          <StoreMapOnlyView
            storeId={currentView.storeId}
            activeStoreId={state.activeStoreId}
            zoom={state.mapZoom}
            onZoomChange={adjustZoom}
            onBack={popView}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'listsHome':
        return (
          <ListsHomeView
            lists={state.lists}
            templates={state.templates}
            activeStoreId={state.activeStoreId}
            onOpenListDetail={(storeId) => pushView({ type: 'listDetail', storeId, addQuery: '' })}
            onStartFromTemplate={startFromTemplate}
            onDeleteTemplate={deleteTemplate}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'listDetail':
        return (
          <ListDetailView
            storeId={currentView.storeId}
            addQuery={currentView.addQuery}
            items={state.lists[currentView.storeId] || []}
            activeTour={state.activeTour}
            activeStoreId={state.activeStoreId}
            showPrices={state.preferences.showPrices}
            onBack={popView}
            onAddQueryChange={updateListAddQuery}
            onAddProduct={(sId, pId, vLabel) => addProductToStoreList(sId, pId, vLabel, true)}
            onRemoveItem={removeListItem}
            onStartTour={startListTour}
            onPushView={pushView}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'fullListMap':
        return (
          <FullListMapView
            storeId={currentView.storeId}
            items={state.lists[currentView.storeId] || []}
            activeStoreId={state.activeStoreId}
            zoom={state.mapZoom}
            onZoomChange={adjustZoom}
            onBack={popView}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'listTour':
        return (
          <ListTourView
            storeId={currentView.storeId}
            items={state.lists[currentView.storeId] || []}
            activeTour={state.activeTour}
            activeStoreId={state.activeStoreId}
            showPrices={state.preferences.showPrices}
            onBack={popView}
            onOpenDirections={openDirections}
            onOpenProductMap={openProductMap}
            onMarkFound={(sId, uid) => markTourItemFound(sId, uid, false)}
            onSkipItem={skipTourItem}
            onPauseTour={pauseTour}
            onOpenFullMap={(sId) => pushView({ type: 'fullListMap', storeId: sId })}
            onFinishEarly={(sId) => replaceView({ type: 'listComplete', storeId: sId })}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'listComplete':
        return (
          <ListCompleteView
            storeId={currentView.storeId}
            items={state.lists[currentView.storeId] || []}
            activeStoreId={state.activeStoreId}
            onSaveTemplate={saveListAsTemplate}
            onConfirmDelete={confirmDeleteList}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'returnsHome':
        return (
          <ReturnsHomeView
            returns={state.returns}
            activeStoreId={state.activeStoreId}
            onInspectReturn={(sId, pId, rId) =>
              openProductDetail(sId, pId, 'return', { returnId: rId })
            }
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'profile':
        return (
          <ProfileView
            activeStoreId={state.activeStoreId}
            recentStores={state.recentStores}
            userName={state.userName}
            preferences={state.preferences}
            returns={state.returns}
            templates={state.templates}
            stats={state.stats}
            onUserNameChange={updateUserName}
            onTogglePreference={togglePreference}
            onPushView={pushView}
            onExitStore={exitActiveStore}
            onSwitchTab={switchTab}
            onConfirmClearHistory={confirmClearHistory}
            onConfirmResetDemoData={confirmResetDemoData}
          />
        );
      case 'profileHistory':
        return (
          <ProfileHistoryView
            recentStores={state.recentStores}
            activeStoreId={state.activeStoreId}
            onBack={popView}
            onEnterStore={enterStore}
            onConfirmClearHistory={confirmClearHistory}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'profileHelp':
        return (
          <ProfileHelpView
            activeStoreId={state.activeStoreId}
            onBack={popView}
            onChangeStore={() => switchTab('inici')}
          />
        );
      case 'profileInfo':
        return (
          <ProfileInfoView
            activeStoreId={state.activeStoreId}
            onBack={popView}
            onEnterStore={enterStore}
            onChangeStore={() => switchTab('inici')}
          />
        );
      default:
        return (
          <HomeView
            recentStores={state.recentStores}
            onPushView={pushView}
            onEnterStore={enterStore}
          />
        );
    }
  };

  return (
    <div className="min-h-screen h-[100dvh] w-full bg-[#F5F9FF] flex overflow-hidden relative">
      <DesktopSidebar
        activeTab={state.activeTab}
        pendingReturnsCount={pendingReturnsCount}
        activeStoreId={state.activeStoreId}
        onSwitchTab={switchTab}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {renderMainView()}
      </div>

      <BottomNav
        activeTab={state.activeTab}
        pendingReturnsCount={pendingReturnsCount}
        activeStoreId={state.activeStoreId}
        onSwitchTab={switchTab}
      />

      {state.modal && (
        <div
          className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-[2px] flex items-center justify-center p-5 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-[18px] p-5 w-full max-w-[360px] shadow-xl border border-[#E3E8F0]">
            <h3 id="modal-title" className="text-lg font-extrabold text-[#202A36] mb-2 font-display">
              {state.modal.title}
            </h3>
            <p className="text-sm text-[#737B87] leading-relaxed mb-4">{state.modal.message}</p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={executeModalAction}
                className="w-full min-h-[46px] px-4 py-2.5 rounded-[12px] bg-white border-[1.5px] border-[#FECACA] text-[#DC2626] hover:bg-[#FEF2F2] text-sm font-bold cursor-pointer"
              >
                {state.modal.confirmText}
              </button>
              <button
                type="button"
                onClick={() => setState((prev) => ({ ...prev, modal: null }))}
                className="w-full min-h-[46px] px-4 py-2.5 rounded-[12px] bg-white border-[1.5px] border-[#E3E8F0] text-[#202A36] hover:bg-[#F5F9FF] text-sm font-bold cursor-pointer"
              >
                Cancel·lar
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 bg-[#202A36] text-white px-4 py-2.5 rounded-full text-[13px] font-semibold z-50 shadow-lg whitespace-nowrap"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
