import { CATALOGS, STORES } from '../data/stores';
import {
  CategoryMeta,
  GridPoint,
  ListItem,
  MapZone,
  OptimizedListItem,
  Product,
  Store,
  StoreId,
} from '../types';

export function normalizeText(str: string): string {
  return (str || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/·/g, ' ')
    .trim();
}

function stemWord(w: string): string {
  if (w.length > 4 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s')) return w.slice(0, -1);
  return w;
}

const SYNONYMS: Record<string, string[]> = {
  lactic: ['llet', 'iogurt', 'formatge', 'mantega'],
  esmorzar: ['cereals', 'galetes', 'torrades', 'suc', 'iogurt', 'llet'],
  sabates: ['calcat', 'sabatilles', 'botes'],
  saba: ['sabatilles', 'sabates'],
  jeans: ['texans', 'pantalons'],
  llibre: ['novella', 'fantasia', 'infantil', 'aventura', 'assaig'],
  neteja: ['detergent', 'rentaplats', 'paper', 'suavitzant'],
};

export function smartSearchStore(
  storeId: StoreId,
  query: string
): { categories: CategoryMeta[]; products: Product[] } {
  const store = STORES[storeId];
  const products = CATALOGS[storeId] || [];
  const qNorm = normalizeText(query);
  if (!qNorm) return { categories: [], products: [] };

  const qTokens = qNorm.split(/\s+/).filter(Boolean).map(stemWord);

  const matchedCategories = store.categories.filter((cat) => {
    const cNorm = normalizeText(cat.name);
    return qTokens.every((t) => cNorm.includes(t) || stemWord(cNorm).includes(t));
  });

  const matchedProducts = products.filter((p) => {
    const haystack = normalizeText(
      [p.name, p.brand, p.category, p.section, p.aisle, ...(p.tags || [])].join(' ')
    );
    const words = haystack.split(/\s+/);

    return qTokens.every((t) => {
      if (haystack.includes(t)) return true;
      if (words.some((w) => stemWord(w).startsWith(t) || w.startsWith(t))) return true;
      const syns = SYNONYMS[t] || [];
      return syns.some((s) => haystack.includes(s));
    });
  });

  return { categories: matchedCategories, products: matchedProducts };
}

export function buildWalkableGrid(store: Store): boolean[][] {
  const { cols, rows, zones } = store.map;
  const grid = Array.from({ length: rows }, () => Array(cols).fill(true));
  for (const z of zones) {
    for (let y = z.y; y < z.y + z.h; y++) {
      for (let x = z.x; x < z.x + z.w; x++) {
        if (y >= 0 && y < rows && x >= 0 && x < cols) {
          grid[y][x] = false;
        }
      }
    }
  }
  grid[store.entrance.y][store.entrance.x] = true;
  return grid;
}

export function findGridPath(store: Store, start: GridPoint, goal: GridPoint): GridPoint[] {
  const grid = buildWalkableGrid(store);
  const { cols, rows } = store.map;
  const sx = Math.round(start.x);
  const sy = Math.round(start.y);
  const gx = Math.round(goal.x);
  const gy = Math.round(goal.y);

  if (sy >= 0 && sy < rows && sx >= 0 && sx < cols) grid[sy][sx] = true;
  if (gy >= 0 && gy < rows && gx >= 0 && gx < cols) grid[gy][gx] = true;

  const queue: [number, number][] = [[sx, sy]];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent: ([number, number] | null)[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );
  if (sy >= 0 && sy < rows && sx >= 0 && sx < cols) {
    visited[sy][sx] = true;
  }

  const dirs: [number, number][] = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const [cx, cy] = queue.shift()!;
    if (cx === gx && cy === gy) break;
    for (const [dx, dy] of dirs) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && !visited[ny][nx] && grid[ny][nx]) {
        visited[ny][nx] = true;
        parent[ny][nx] = [cx, cy];
        queue.push([nx, ny]);
      }
    }
  }

  if (!visited[gy]?.[gx]) {
    return [
      { x: sx, y: sy },
      { x: gx, y: gy },
    ];
  }

  const path: GridPoint[] = [];
  let cur: [number, number] | null = [gx, gy];
  while (cur) {
    path.unshift({ x: cur[0], y: cur[1] });
    cur = parent[cur[1]][cur[0]];
  }
  return path;
}

export function getZoneForProduct(storeId: StoreId, product: Product): MapZone {
  const store = STORES[storeId];
  return store.map.zones.find((z) => z.id === product.zoneId) || store.map.zones[0];
}

export function getCategoryMeta(storeId: StoreId, categoryName: string): CategoryMeta {
  const store = STORES[storeId];
  return (
    store.categories.find((c) => c.name === categoryName) || {
      name: categoryName,
      color: '#246BCE',
      bg: '#EAF3FF',
      icon: '📦',
    }
  );
}

export function formatProductPrice(price: number | string): string {
  return typeof price === 'number' ? `${price.toFixed(2).replace('.', ',')} €` : price;
}

export function generateWrittenDirections(
  storeId: StoreId,
  product: Product
): { steps: string[]; zone: MapZone; path: GridPoint[] } {
  const store = STORES[storeId];
  const zone = getZoneForProduct(storeId, product);
  const path = findGridPath(store, store.entrance, zone.approach);

  const turns: { x: number; y: number; dir: string }[] = [];
  for (let i = 1; i < path.length - 1; i++) {
    const prev = path[i - 1];
    const cur = path[i];
    const next = path[i + 1];
    const dx1 = cur.x - prev.x;
    const dy1 = cur.y - prev.y;
    const dx2 = next.x - cur.x;
    const dy2 = next.y - cur.y;
    if (dx1 !== dx2 || dy1 !== dy2) {
      const cross = dx1 * dy2 - dy1 * dx2;
      const turnDir = cross > 0 ? 'a la dreta' : "a l'esquerra";
      turns.push({ x: cur.x, y: cur.y, dir: turnDir });
    }
  }

  const steps: string[] = [];
  steps.push(`Des de ${store.entrance.label}, avança cap a l'interior seguint el passadís principal.`);
  if (turns.length > 0) {
    const firstTurn = turns[0];
    steps.push(`Després d'avançar uns metres, gira ${firstTurn.dir} en direcció a ${product.aisle}.`);
    if (turns.length > 1) {
      const lastTurn = turns[turns.length - 1];
      steps.push(
        `Continua pel passadís fins a l'encreuament i gira ${lastTurn.dir} cap a la secció de ${product.section}.`
      );
    }
  } else {
    steps.push(`Continua recte pel passadís principal en direcció a ${product.aisle}.`);
  }
  steps.push(`Localitza la secció «${product.section}» i dirigeix-te a «${product.shelf}» (${zone.label}).`);
  steps.push(`Trobaràs el producte exactament a: ${product.level}.`);

  return { steps, zone, path };
}

export function optimizeListItems(storeId: StoreId, items: ListItem[]): OptimizedListItem[] {
  if (!items || items.length === 0) return [];
  const store = STORES[storeId];
  const productsMap = Object.fromEntries((CATALOGS[storeId] || []).map((p) => [p.id, p]));

  const valid: (ListItem & { product: Product; zone: MapZone })[] = [];
  const unlocatable: OptimizedListItem[] = [];

  for (const item of items) {
    const prod = productsMap[item.productId];
    if (!prod || !prod.zoneId) {
      unlocatable.push({ ...item, product: prod, unlocatable: true });
    } else {
      valid.push({ ...item, product: prod, zone: getZoneForProduct(storeId, prod) });
    }
  }

  const remaining = [...valid];
  const ordered: OptimizedListItem[] = [];
  let currentPos: GridPoint = store.entrance;

  while (remaining.length > 0) {
    let bestIdx = 0;
    let bestScore = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const cand = remaining[i];
      const pathLen = findGridPath(store, currentPos, cand.zone.approach).length;
      const sameZoneBonus =
        ordered.length > 0 && ordered[ordered.length - 1].zone?.id === cand.zone.id ? -4 : 0;
      const score = pathLen + sameZoneBonus;
      if (score < bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }
    const chosen = remaining.splice(bestIdx, 1)[0];
    ordered.push(chosen);
    currentPos = chosen.zone.approach;
  }

  return [...ordered, ...unlocatable];
}
