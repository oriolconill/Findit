export type StoreId = 'mercadona' | 'zara' | 'biblioteca' | 'decathlon';

export type NavTab = 'inici' | 'cerca' | 'llistes' | 'devolucions' | 'perfil';

export interface GridPoint {
  x: number;
  y: number;
}

export interface CategoryMeta {
  name: string;
  color: string;
  bg: string;
  icon: string;
}

export interface MapZone {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  border: string;
  aisle: string;
  approach: GridPoint;
  pin: GridPoint;
}

export interface StoreMapConfig {
  cols: number;
  rows: number;
  zones: MapZone[];
}

export interface Store {
  id: StoreId;
  name: string;
  short: string;
  color: string;
  desc: string;
  entrance: GridPoint & { label: string };
  categories: CategoryMeta[];
  map: StoreMapConfig;
}

export interface ProductVariants {
  sizes?: string[];
  colors?: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  format: string;
  price: number | string;
  category: string;
  availability: 'En estoc' | 'Estoc limitat' | 'Disponible';
  zoneId: string;
  aisle: string;
  section: string;
  shelf: string;
  level: string;
  variants?: ProductVariants;
  tags: string[];
  icon: string;
}

export interface ListItem {
  uid: string;
  productId: string;
  variantLabel: string;
  found: boolean;
}

export interface OptimizedListItem extends ListItem {
  product?: Product;
  zone?: MapZone;
  unlocatable?: boolean;
}

export interface ListTemplate {
  id: string;
  storeId: StoreId;
  name: string;
  createdAt: number;
  items: { productId: string; variantLabel: string }[];
}

export interface ReturnItem {
  id: string;
  storeId: StoreId;
  productId: string;
  variantLabel: string;
  status: 'pending' | 'completed';
}

export interface ActiveTour {
  storeId: StoreId;
  currentUid: string;
  paused: boolean;
}

export interface NavigationContext {
  source: 'search' | 'list' | 'return';
  storeId: StoreId;
  productId: string;
  itemUid?: string;
  returnId?: string;
}

export type ViewState =
  | { type: 'home' }
  | { type: 'globalStoreSearch'; query: string }
  | { type: 'qrScan' }
  | { type: 'detectStore' }
  | { type: 'storeSearch'; storeId: StoreId; query: string }
  | { type: 'categoryProducts'; storeId: StoreId; category: string }
  | {
      type: 'productDetail';
      storeId: StoreId;
      productId: string;
      source: 'search' | 'return';
      selectedSize: string | null;
      selectedColor: string | null;
      returnId: string | null;
    }
  | { type: 'directions'; ctx: NavigationContext }
  | { type: 'productMap'; ctx: NavigationContext }
  | { type: 'storeMapOnly'; storeId: StoreId }
  | { type: 'listsHome' }
  | { type: 'listDetail'; storeId: StoreId; addQuery: string }
  | { type: 'fullListMap'; storeId: StoreId }
  | { type: 'listTour'; storeId: StoreId }
  | { type: 'listComplete'; storeId: StoreId }
  | { type: 'returnsHome' }
  | { type: 'profile' }
  | { type: 'profileHistory' }
  | { type: 'profileHelp' }
  | { type: 'profileInfo' };

export interface ConfirmModalState {
  title: string;
  message: string;
  confirmText: string;
  actionType: 'deleteList' | 'clearHistory' | 'resetDemo';
  storeIdToDelete?: StoreId;
}

export interface UserPreferences {
  largeText: boolean;
  showPrices: boolean;
}

export interface AppState {
  activeTab: NavTab;
  activeStoreId: StoreId | null;
  recentStores: StoreId[];
  userName: string;
  preferences: UserPreferences;
  viewStack: ViewState[];
  lists: Record<StoreId, ListItem[]>;
  templates: ListTemplate[];
  activeTour: ActiveTour | null;
  returns: ReturnItem[];
  stats: {
    listsCompleted: number;
    returnsCompleted: number;
  };
  mapZoom: number;
  modal: ConfirmModalState | null;
}
