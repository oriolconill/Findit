import { Product, Store, StoreId } from '../types';

export const STORES: Record<StoreId, Store> = {
  mercadona: {
    id: 'mercadona',
    name: 'Mercadona',
    short: 'M',
    color: '#0D8A4E',
    desc: 'Supermercat · Alimentació, llar i productes frescos',
    entrance: { x: 2, y: 14, label: 'Entrada Principal' },
    categories: [
      { name: 'Làctics i refrigerats', color: '#0EA5E9', bg: '#E0F2FE', icon: '🥛' },
      { name: 'Conserves i llegums', color: '#D97706', bg: '#FEF3C7', icon: '🥫' },
      { name: 'Cereals i esmorzar', color: '#EA580C', bg: '#FFEDD5', icon: '🥣' },
      { name: 'Fruita', color: '#DC2626', bg: '#FEE2E2', icon: '🍎' },
      { name: 'Verdura i hortalisses', color: '#16A34A', bg: '#DCFCE7', icon: '🥬' },
      { name: 'Begudes', color: '#0284C7', bg: '#E0F2FE', icon: '🥤' },
      { name: 'Carn i peix', color: '#BE123C', bg: '#FFE4E6', icon: '🥩' },
      { name: 'Congelats', color: '#4F46E5', bg: '#E0E7FF', icon: '❄️' },
      { name: 'Neteja i llar', color: '#7C3AED', bg: '#EDE9FE', icon: '🧴' },
    ],
    map: {
      cols: 20,
      rows: 16,
      zones: [
        { id: 'FV', label: 'Fruita i Verdura', x: 1, y: 1, w: 5, h: 2, color: '#BBF7D0', border: '#16A34A', aisle: 'Zona Fruita i Verdura', approach: { x: 3, y: 3 }, pin: { x: 3.5, y: 2.2 } },
        { id: 'CP', label: 'Carn i Peix', x: 7, y: 1, w: 6, h: 2, color: '#FECDD3', border: '#E11D48', aisle: 'Taulell Carn i Peix', approach: { x: 10, y: 3 }, pin: { x: 10, y: 2 } },
        { id: 'CG', label: 'Congelats', x: 14, y: 1, w: 5, h: 2, color: '#C7D2FE', border: '#4F46E5', aisle: 'Zona Congelats', approach: { x: 16, y: 3 }, pin: { x: 16.5, y: 2 } },
        { id: 'C1', label: 'C1 · Conserves', x: 2, y: 5, w: 2, h: 3, color: '#FDE68A', border: '#D97706', aisle: 'Passadís 1', approach: { x: 4, y: 6 }, pin: { x: 3.5, y: 6.5 } },
        { id: 'C2', label: 'C2 · Llegums', x: 2, y: 8, w: 2, h: 3, color: '#FDE68A', border: '#D97706', aisle: 'Passadís 1', approach: { x: 4, y: 9 }, pin: { x: 3.5, y: 9.5 } },
        { id: 'CE1', label: 'CE1 · Cereals', x: 6, y: 5, w: 2, h: 3, color: '#FED7AA', border: '#EA580C', aisle: 'Passadís 2', approach: { x: 8, y: 6 }, pin: { x: 7.5, y: 6.5 } },
        { id: 'CE2', label: 'CE2 · Esmorzar', x: 6, y: 8, w: 2, h: 3, color: '#FED7AA', border: '#EA580C', aisle: 'Passadís 2', approach: { x: 8, y: 9 }, pin: { x: 7.5, y: 9.5 } },
        { id: 'L1', label: 'L1 · Làctics', x: 10, y: 5, w: 2, h: 3, color: '#BAE6FD', border: '#0284C7', aisle: 'Passadís 3', approach: { x: 9, y: 6 }, pin: { x: 10.5, y: 6.5 } },
        { id: 'L2', label: 'L2 · Formatges', x: 10, y: 8, w: 2, h: 3, color: '#BAE6FD', border: '#0284C7', aisle: 'Passadís 3', approach: { x: 9, y: 9 }, pin: { x: 10.5, y: 9.5 } },
        { id: 'B1', label: 'B1 · Begudes', x: 14, y: 5, w: 2, h: 3, color: '#A5F3FC', border: '#0891B2', aisle: 'Passadís 4', approach: { x: 13, y: 6 }, pin: { x: 14.5, y: 6.5 } },
        { id: 'N1', label: 'N1 · Neteja', x: 14, y: 8, w: 2, h: 3, color: '#DDD6FE', border: '#7C3AED', aisle: 'Passadís 4', approach: { x: 13, y: 9 }, pin: { x: 14.5, y: 9.5 } },
        { id: 'N2', label: 'N2 · Llar', x: 17, y: 5, w: 2, h: 6, color: '#DDD6FE', border: '#7C3AED', aisle: 'Passadís 5', approach: { x: 16, y: 8 }, pin: { x: 17.5, y: 8 } },
        { id: 'CAIXES', label: 'Caixes', x: 7, y: 13, w: 9, h: 2, color: '#E2E8F0', border: '#64748B', aisle: 'Sortida', approach: { x: 6, y: 13 }, pin: { x: 11, y: 14 } },
      ],
    },
  },

  zara: {
    id: 'zara',
    name: 'Zara',
    short: 'Z',
    color: '#1E293B',
    desc: 'Moda i complements · Roba, calçat i accessoris',
    entrance: { x: 10, y: 14, label: 'Entrada Principal' },
    categories: [
      { name: 'Pantalons', color: '#475569', bg: '#F1F5F9', icon: '👖' },
      { name: 'Texans', color: '#1D4ED8', bg: '#DBEAFE', icon: '👖' },
      { name: 'Samarretes', color: '#059669', bg: '#D1FAE5', icon: '👕' },
      { name: 'Camises', color: '#0F766E', bg: '#CCFBF1', icon: '👔' },
      { name: 'Polos i tops', color: '#DB2777', bg: '#FCE7F3', icon: '👚' },
      { name: 'Dessuadores', color: '#7C3AED', bg: '#EDE9FE', icon: '🧥' },
      { name: 'Jerseis', color: '#B45309', bg: '#FEF3C7', icon: '🧶' },
      { name: 'Jaquetes', color: '#334155', bg: '#E2E8F0', icon: '🧥' },
      { name: 'Abrics', color: '#9A3412', bg: '#FFEDD5', icon: '🧥' },
      { name: 'Vestits', color: '#BE185D', bg: '#FCE7F3', icon: '👗' },
      { name: 'Faldilles', color: '#E11D48', bg: '#FFE4E6', icon: '👗' },
      { name: 'Calçat', color: '#854D0E', bg: '#FEF9C3', icon: '👟' },
      { name: 'Bosses i motxilles', color: '#9333EA', bg: '#F3E8FF', icon: '👜' },
      { name: 'Complements', color: '#0891B2', bg: '#CFFAFE', icon: '🕶️' },
    ],
    map: {
      cols: 20,
      rows: 16,
      zones: [
        { id: 'Z-CAM', label: 'Penjadors Camises', x: 2, y: 2, w: 3, h: 3, color: '#CCFBF1', border: '#0F766E', aisle: 'Zona Nord-Oest', approach: { x: 5, y: 3 }, pin: { x: 3.5, y: 3.5 } },
        { id: 'Z-SAM', label: 'Taula Samarretes', x: 7, y: 3, w: 3, h: 3, color: '#D1FAE5', border: '#059669', aisle: 'Zona Central Nord', approach: { x: 6, y: 4 }, pin: { x: 8.5, y: 4.5 } },
        { id: 'Z-PAN', label: 'Expositor Pantalons', x: 11, y: 2, w: 4, h: 3, color: '#DBEAFE', border: '#1D4ED8', aisle: 'Zona Denim', approach: { x: 10, y: 3 }, pin: { x: 13, y: 3.5 } },
        { id: 'Z-EMP', label: 'Emprovadors', x: 16, y: 2, w: 3, h: 6, color: '#F3E8FF', border: '#7E22CE', aisle: 'Zona Emprovadors', approach: { x: 15, y: 5 }, pin: { x: 17.5, y: 5 } },
        { id: 'Z-ABR', label: 'Penjadors Abrics', x: 2, y: 7, w: 3, h: 3, color: '#FFEDD5', border: '#C2410C', aisle: 'Zona Oest', approach: { x: 5, y: 8 }, pin: { x: 3.5, y: 8.5 } },
        { id: 'Z-VES', label: 'Taula Vestits', x: 7, y: 8, w: 3, h: 3, color: '#FCE7F3', border: '#BE185D', aisle: 'Zona Central Sud', approach: { x: 10, y: 9 }, pin: { x: 8.5, y: 9.5 } },
        { id: 'Z-CAL', label: 'Zona de Calçat', x: 12, y: 8, w: 3, h: 3, color: '#FEF3C7', border: '#B45309', aisle: 'Zona Calçat', approach: { x: 11, y: 9 }, pin: { x: 13.5, y: 9.5 } },
        { id: 'Z-COM', label: 'Complements i Bosses', x: 16, y: 10, w: 3, h: 3, color: '#CFFAFE', border: '#0891B2', aisle: 'Zona Complements', approach: { x: 15, y: 11 }, pin: { x: 17.5, y: 11.5 } },
        { id: 'Z-CAIX', label: 'Caixes', x: 2, y: 12, w: 4, h: 2, color: '#E2E8F0', border: '#64748B', aisle: 'Sortida', approach: { x: 6, y: 13 }, pin: { x: 4, y: 13 } },
      ],
    },
  },

  biblioteca: {
    id: 'biblioteca',
    name: 'Biblioteca de Vilanova',
    short: 'BV',
    color: '#9333EA',
    desc: 'Biblioteca municipal · Llibres, novel·la, còmic i assaig',
    entrance: { x: 2, y: 14, label: 'Entrada Biblioteca' },
    categories: [
      { name: 'Novel·la', color: '#7C3AED', bg: '#EDE9FE', icon: '📖' },
      { name: 'Novel·la negra i policíaca', color: '#334155', bg: '#E2E8F0', icon: '🕵️' },
      { name: 'Infantil', color: '#F59E0B', bg: '#FEF3C7', icon: '🧸' },
      { name: 'Fantasia', color: '#9333EA', bg: '#F3E8FF', icon: '🐉' },
      { name: 'Aventura', color: '#059669', bg: '#D1FAE5', icon: '🧭' },
      { name: 'Romàntica', color: '#E11D48', bg: '#FFE4E6', icon: '💐' },
      { name: 'Història', color: '#B45309', bg: '#FFEDD5', icon: '🏛️' },
      { name: 'Biografies', color: '#0284C7', bg: '#E0F2FE', icon: '✍️' },
      { name: 'Ciència-ficció', color: '#4F46E5', bg: '#E0E7FF', icon: '🚀' },
      { name: 'Còmics i manga', color: '#EA580C', bg: '#FFEDD5', icon: '💥' },
      { name: 'Assaig', color: '#475569', bg: '#F1F5F9', icon: '🧠' },
    ],
    map: {
      cols: 20,
      rows: 16,
      zones: [
        { id: 'BIB-NOV', label: 'Prestatgeries Novel·la', x: 2, y: 2, w: 6, h: 2, color: '#EDE9FE', border: '#7C3AED', aisle: 'Passadís A', approach: { x: 5, y: 4 }, pin: { x: 5, y: 3 } },
        { id: 'BIB-NEG', label: 'Novel·la Negra', x: 10, y: 2, w: 6, h: 2, color: '#E2E8F0', border: '#475569', aisle: 'Passadís A', approach: { x: 13, y: 4 }, pin: { x: 13, y: 3 } },
        { id: 'BIB-FAN', label: 'Fantasia i Ciència-Ficció', x: 2, y: 5, w: 6, h: 2, color: '#F3E8FF', border: '#9333EA', aisle: 'Passadís B', approach: { x: 5, y: 7 }, pin: { x: 5, y: 6 } },
        { id: 'BIB-AVE', label: 'Aventura i Romàntica', x: 10, y: 5, w: 6, h: 2, color: '#D1FAE5', border: '#059669', aisle: 'Passadís B', approach: { x: 13, y: 7 }, pin: { x: 13, y: 6 } },
        { id: 'BIB-HIS', label: 'Història, Bio i Assaig', x: 2, y: 8, w: 6, h: 2, color: '#FFEDD5', border: '#C2410C', aisle: 'Passadís C', approach: { x: 5, y: 10 }, pin: { x: 5, y: 9 } },
        { id: 'BIB-COM', label: 'Còmics i Manga', x: 10, y: 8, w: 5, h: 2, color: '#FEE2E2', border: '#EA580C', aisle: 'Passadís C', approach: { x: 12, y: 10 }, pin: { x: 12.5, y: 9 } },
        { id: 'BIB-INF', label: 'Secció Infantil', x: 14, y: 11, w: 5, h: 3, color: '#FEF3C7', border: '#D97706', aisle: 'Zona Infantil', approach: { x: 13, y: 12 }, pin: { x: 16.5, y: 12.5 } },
        { id: 'BIB-TAU', label: 'Taulell Préstec', x: 5, y: 13, w: 5, h: 2, color: '#CBD5E1', border: '#475569', aisle: 'Recepció', approach: { x: 4, y: 13 }, pin: { x: 7.5, y: 14 } },
      ],
    },
  },

  decathlon: {
    id: 'decathlon',
    name: 'Decathlon',
    short: 'D',
    color: '#0082C3',
    desc: 'Esports · Equipament, tèxtil i material esportiu',
    entrance: { x: 10, y: 14, label: 'Zona J · Entrada' },
    categories: [
      { name: 'Running', color: '#EA580C', bg: '#FFEDD5', icon: '🏃' },
      { name: 'Fitness i musculació', color: '#7C3AED', bg: '#EDE9FE', icon: '🏋️' },
      { name: 'Ciclisme', color: '#059669', bg: '#D1FAE5', icon: '🚴' },
      { name: 'Muntanya i senderisme', color: '#B45309', bg: '#FEF3C7', icon: '🥾' },
      { name: 'Natació', color: '#0284C7', bg: '#E0F2FE', icon: '🏊' },
      { name: "Futbol i esports d'equip", color: '#16A34A', bg: '#DCFCE7', icon: '⚽' },
      { name: 'Esports de raqueta', color: '#D97706', bg: '#FEF9C3', icon: '🎾' },
      { name: 'Roba i calçat esportiu', color: '#DC2626', bg: '#FEE2E2', icon: '👟' },
    ],
    map: {
      cols: 20,
      rows: 16,
      zones: [
        { id: 'A1', label: 'Zona A · Running (A1-A2)', x: 2, y: 2, w: 4, h: 3, color: '#FFEDD5', border: '#EA580C', aisle: 'Zona A', approach: { x: 6, y: 3 }, pin: { x: 4, y: 3.5 } },
        { id: 'B1', label: 'Zona B · Fitness (B1-B2)', x: 8, y: 2, w: 4, h: 3, color: '#EDE9FE', border: '#7C3AED', aisle: 'Zona B', approach: { x: 7, y: 3 }, pin: { x: 10, y: 3.5 } },
        { id: 'C1', label: 'Zona C · Ciclisme (C1-C3)', x: 14, y: 2, w: 5, h: 3, color: '#D1FAE5', border: '#059669', aisle: 'Zona C', approach: { x: 13, y: 3 }, pin: { x: 16.5, y: 3.5 } },
        { id: 'D1', label: 'Zona D · Muntanya (D1)', x: 2, y: 7, w: 4, h: 3, color: '#FEF3C7', border: '#B45309', aisle: 'Zona D', approach: { x: 6, y: 8 }, pin: { x: 4, y: 8.5 } },
        { id: 'E1', label: 'Zona E · Natació (E1)', x: 8, y: 7, w: 4, h: 3, color: '#E0F2FE', border: '#0284C7', aisle: 'Zona E', approach: { x: 7, y: 8 }, pin: { x: 10, y: 8.5 } },
        { id: 'F1', label: 'Zona F · Futbol (F1)', x: 14, y: 7, w: 4, h: 3, color: '#DCFCE7', border: '#16A34A', aisle: 'Zona F', approach: { x: 13, y: 8 }, pin: { x: 16, y: 8.5 } },
        { id: 'G1', label: 'Zona G · Raqueta (G1)', x: 14, y: 11, w: 4, h: 3, color: '#FEF9C3', border: '#D97706', aisle: 'Zona G', approach: { x: 13, y: 12 }, pin: { x: 16, y: 12.5 } },
        { id: 'H1', label: 'Zona H · Roba Esportiva', x: 8, y: 11, w: 4, h: 2, color: '#FEE2E2', border: '#DC2626', aisle: 'Zona H', approach: { x: 12, y: 11 }, pin: { x: 10, y: 12 } },
        { id: 'I1', label: 'Zona I · Caixes i sortida', x: 2, y: 13, w: 5, h: 2, color: '#E2E8F0', border: '#64748B', aisle: 'Zona I', approach: { x: 7, y: 13 }, pin: { x: 4.5, y: 14 } },
      ],
    },
  },
};

export const CATALOGS: Record<StoreId, Product[]> = {
  mercadona: [
    // Làctics i refrigerats
    { id: 'm-lle1', name: 'Llet sencera', brand: 'Hacendado', format: 'Brick 1 L', price: 0.99, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L1', aisle: 'Passadís 3', section: 'Làctics', shelf: 'Prestatgeria L1', level: 'Prestatge 2', tags: ['llet', 'lactics', 'esmorzar', 'refrigerat'], icon: '🥛' },
    { id: 'm-lle2', name: 'Llet semidesnatada', brand: 'Hacendado', format: 'Brick 1 L', price: 0.95, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L1', aisle: 'Passadís 3', section: 'Làctics', shelf: 'Prestatgeria L1', level: 'Prestatge 3', tags: ['llet', 'lactics', 'esmorzar'], icon: '🥛' },
    { id: 'm-lle3', name: 'Llet desnatada', brand: 'Hacendado', format: 'Brick 1 L', price: 0.95, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L1', aisle: 'Passadís 3', section: 'Làctics', shelf: 'Prestatgeria L1', level: 'Prestatge 4', tags: ['llet', 'lactics', 'esmorzar'], icon: '🥛' },
    { id: 'm-lle4', name: 'Llet sense lactosa', brand: 'Hacendado', format: 'Brick 1 L', price: 1.15, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L1', aisle: 'Passadís 3', section: 'Làctics', shelf: 'Prestatgeria L1', level: 'Prestatge 1', tags: ['llet', 'sense lactosa', 'lactics'], icon: '🥛' },
    { id: 'm-begc', name: 'Beguda de civada', brand: 'Hacendado', format: 'Brick 1 L', price: 1.25, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L1', aisle: 'Passadís 3', section: 'Làctics i vegetals', shelf: 'Prestatgeria L1', level: 'Prestatge 5', tags: ['civada', 'beguda vegetal', 'esmorzar'], icon: '🌾' },
    { id: 'm-begs', name: 'Beguda de soja', brand: 'Hacendado', format: 'Brick 1 L', price: 1.10, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L1', aisle: 'Passadís 3', section: 'Làctics i vegetals', shelf: 'Prestatgeria L1', level: 'Prestatge 5', tags: ['soja', 'beguda vegetal'], icon: '🫘' },
    { id: 'm-iog1', name: 'Iogurt natural', brand: 'Hacendado', format: 'Pack 4x125 g', price: 1.35, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L1', aisle: 'Passadís 3', section: 'Làctics', shelf: 'Prestatgeria L1', level: 'Prestatge 2', tags: ['iogurt', 'lactic', 'refrigerat', 'esmorzar'], icon: '🍨' },
    { id: 'm-iog2', name: 'Iogurt grec natural', brand: 'Hacendado', format: 'Pack 4x125 g', price: 1.65, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L1', aisle: 'Passadís 3', section: 'Làctics', shelf: 'Prestatgeria L1', level: 'Prestatge 2', tags: ['iogurt', 'grec', 'lactic', 'refrigerat', 'esmorzar'], icon: '🍨' },
    { id: 'm-iog3', name: 'Iogurt de sabors (maduixa i plàtan)', brand: 'Hacendado', format: 'Pack 8x125 g', price: 2.10, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L1', aisle: 'Passadís 3', section: 'Làctics', shelf: 'Prestatgeria L1', level: 'Prestatge 3', tags: ['iogurt', 'sabors', 'maduixa'], icon: '🍓' },
    { id: 'm-for1', name: 'Formatge fresc tipus Burgos', brand: 'Hacendado', format: 'Pack 3x75 g', price: 1.85, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L2', aisle: 'Passadís 3', section: 'Formatges', shelf: 'Prestatgeria L2', level: 'Prestatge 2', tags: ['formatge', 'fresc', 'lactics'], icon: '🧀' },
    { id: 'm-for2', name: 'Mozzarella fresca', brand: 'Hacendado', format: 'Bossa 125 g', price: 1.20, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L2', aisle: 'Passadís 3', section: 'Formatges', shelf: 'Prestatgeria L2', level: 'Prestatge 3', tags: ['mozzarella', 'formatge'], icon: '🧀' },
    { id: 'm-for3', name: 'Formatge ratllat quatre formatges', brand: 'Hacendado', format: 'Bossa 200 g', price: 1.95, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L2', aisle: 'Passadís 3', section: 'Formatges', shelf: 'Prestatgeria L2', level: 'Prestatge 4', tags: ['formatge', 'ratllat'], icon: '🧀' },
    { id: 'm-man1', name: 'Mantega tradicional i nata per cuinar', brand: 'Hacendado', format: 'Terrina 250 g', price: 2.30, category: 'Làctics i refrigerats', availability: 'En estoc', zoneId: 'L2', aisle: 'Passadís 3', section: 'Làctics', shelf: 'Prestatgeria L2', level: 'Prestatge 1', tags: ['mantega', 'nata', 'lactics'], icon: '🧈' },

    // Conserves i llegums
    { id: 'm-ton', name: "Tonyina clara en oli d'oliva", brand: 'Hacendado', format: 'Pack 6x80 g', price: 4.50, category: 'Conserves i llegums', availability: 'En estoc', zoneId: 'C1', aisle: 'Passadís 1', section: 'Conserves', shelf: 'Prestatgeria C1', level: 'Prestatge 2', tags: ['tonyina', 'peix', 'llauna'], icon: '🐟' },
    { id: 'm-tomf', name: 'Tomàquet fregit estil casolà', brand: 'Hacendado', format: 'Pot vidre 560 g', price: 1.45, category: 'Conserves i llegums', availability: 'En estoc', zoneId: 'C1', aisle: 'Passadís 1', section: 'Conserves', shelf: 'Prestatgeria C1', level: 'Prestatge 3', tags: ['tomaquet', 'fregit', 'salsa'], icon: '🍅' },
    { id: 'm-blat', name: 'Blat de moro dolç', brand: 'Hacendado', format: 'Pack 3x140 g', price: 1.80, category: 'Conserves i llegums', availability: 'En estoc', zoneId: 'C1', aisle: 'Passadís 1', section: 'Conserves', shelf: 'Prestatgeria C1', level: 'Prestatge 4', tags: ['blat de moro', 'amanida'], icon: '🌽' },
    { id: 'm-cigr', name: 'Cigrons, llenties i mongetes cuits', brand: 'Hacendado', format: 'Pot 570 g', price: 1.05, category: 'Conserves i llegums', availability: 'En estoc', zoneId: 'C2', aisle: 'Passadís 1', section: 'Llegums', shelf: 'Prestatgeria C2', level: 'Prestatge 2', tags: ['cigrons', 'llenties', 'mongetes', 'llegums'], icon: '🫘' },
    { id: 'm-oliv', name: "Olives farcides d'anxova", brand: 'Hacendado', format: 'Pot 350 g', price: 1.65, category: 'Conserves i llegums', availability: 'En estoc', zoneId: 'C2', aisle: 'Passadís 1', section: 'Conserves', shelf: 'Prestatgeria C2', level: 'Prestatge 3', tags: ['olives', 'aperitiu'], icon: '🫒' },
    { id: 'm-espa', name: 'Espàrrecs blancs en conserva', brand: 'Hacendado', format: 'Pot 330 g', price: 2.95, category: 'Conserves i llegums', availability: 'En estoc', zoneId: 'C2', aisle: 'Passadís 1', section: 'Conserves', shelf: 'Prestatgeria C2', level: 'Prestatge 4', tags: ['esparrecs', 'conserva'], icon: '🥬' },

    // Cereals i esmorzar
    { id: 'm-arr', name: 'Arròs rodó extra', brand: 'Hacendado', format: 'Paquet 1 kg', price: 1.35, category: 'Cereals i esmorzar', availability: 'En estoc', zoneId: 'CE1', aisle: 'Passadís 2', section: 'Cereals i pasta', shelf: 'Prestatgeria CE1', level: 'Prestatge 1', tags: ['arros', 'cereals'], icon: '🍚' },
    { id: 'm-pas', name: 'Pasta macarrons i espaguetis', brand: 'Hacendado', format: 'Paquet 500 g', price: 0.90, category: 'Cereals i esmorzar', availability: 'En estoc', zoneId: 'CE1', aisle: 'Passadís 2', section: 'Cereals i pasta', shelf: 'Prestatgeria CE1', level: 'Prestatge 2', tags: ['pasta', 'macarrons', 'espaguetis'], icon: '🍝' },
    { id: 'm-civ', name: 'Flocs de civada integral', brand: 'Hacendado', format: 'Bossa 500 g', price: 1.15, category: 'Cereals i esmorzar', availability: 'En estoc', zoneId: 'CE1', aisle: 'Passadís 2', section: 'Esmorzar', shelf: 'Prestatgeria CE1', level: 'Prestatge 3', tags: ['civada', 'esmorzar', 'cereals'], icon: '🌾' },
    { id: 'm-choco', name: 'Cereals de xocolata farcits', brand: 'Hacendado', format: 'Caixa 500 g', price: 2.15, category: 'Cereals i esmorzar', availability: 'En estoc', zoneId: 'CE2', aisle: 'Passadís 2', section: 'Esmorzar', shelf: 'Prestatgeria CE2', level: 'Prestatge 2', tags: ['cereals', 'xocolata', 'esmorzar'], icon: '🥣' },
    { id: 'm-corn', name: 'Flocs de blat de moro (Corn Flakes)', brand: 'Hacendado', format: 'Caixa 500 g', price: 1.70, category: 'Cereals i esmorzar', availability: 'En estoc', zoneId: 'CE2', aisle: 'Passadís 2', section: 'Esmorzar', shelf: 'Prestatgeria CE2', level: 'Prestatge 3', tags: ['flocs', 'cereals', 'esmorzar'], icon: '🥣' },
    { id: 'm-mues', name: 'Muesli i granola cruixent', brand: 'Hacendado', format: 'Bossa 400 g', price: 2.35, category: 'Cereals i esmorzar', availability: 'En estoc', zoneId: 'CE2', aisle: 'Passadís 2', section: 'Esmorzar', shelf: 'Prestatgeria CE2', level: 'Prestatge 3', tags: ['muesli', 'granola', 'cereals', 'esmorzar'], icon: '🥣' },
    { id: 'm-gal', name: 'Galetes Maria daurades', brand: 'Hacendado', format: 'Paquet 800 g', price: 1.40, category: 'Cereals i esmorzar', availability: 'En estoc', zoneId: 'CE2', aisle: 'Passadís 2', section: 'Esmorzar', shelf: 'Prestatgeria CE2', level: 'Prestatge 1', tags: ['galetes', 'esmorzar'], icon: '🍪' },
    { id: 'm-tor', name: 'Torrades integrals i melmelada de maduixa', brand: 'Hacendado', format: 'Pack 270 g', price: 1.60, category: 'Cereals i esmorzar', availability: 'En estoc', zoneId: 'CE2', aisle: 'Passadís 2', section: 'Esmorzar', shelf: 'Prestatgeria CE2', level: 'Prestatge 4', tags: ['torrades', 'melmelada', 'esmorzar'], icon: '🍞' },

    // Fruita
    { id: 'm-pom', name: 'Pomes Golden i plàtans de Canàries', brand: 'Mercadona Fresc', format: 'Malla 1,5 kg', price: 2.65, category: 'Fruita', availability: 'En estoc', zoneId: 'FV', aisle: 'Zona Fruita i Verdura', section: 'Fruita fresca', shelf: 'Expositor FV-1', level: 'Nivell superior', tags: ['pomes', 'platans', 'taronges', 'mandarines', 'fruita'], icon: '🍎' },
    { id: 'm-mad', name: 'Peres, maduixes, raïm i kiwis', brand: 'Mercadona Fresc', format: 'Safata 500 g', price: 2.95, category: 'Fruita', availability: 'En estoc', zoneId: 'FV', aisle: 'Zona Fruita i Verdura', section: 'Fruita fresca', shelf: 'Expositor FV-2', level: 'Nivell central', tags: ['peres', 'maduixes', 'raim', 'kiwis', 'fruita'], icon: '🍓' },
    { id: 'm-sin', name: 'Préssecs, síndria i meló', brand: 'Mercadona Fresc', format: 'Peça ~2,5 kg', price: 3.40, category: 'Fruita', availability: 'Estoc limitat', zoneId: 'FV', aisle: 'Zona Fruita i Verdura', section: 'Fruita de temporada', shelf: 'Expositor FV-3', level: 'Nivell inferior', tags: ['pressecs', 'sindria', 'melo', 'fruita'], icon: '🍉' },

    // Verdura i hortalisses
    { id: 'm-tom', name: 'Tomàquets de branca, enciams i pastanagues', brand: 'Horta Fresca', format: 'Malla 1 kg', price: 2.15, category: 'Verdura i hortalisses', availability: 'En estoc', zoneId: 'FV', aisle: 'Zona Fruita i Verdura', section: 'Hortalisses', shelf: 'Expositor FV-4', level: 'Nivell superior', tags: ['tomaquets', 'enciams', 'pastanagues', 'verdura'], icon: '🍅' },
    { id: 'm-pat', name: 'Patates de muntanya i cebes dolces', brand: 'Horta Fresca', format: 'Sac 3 kg', price: 3.20, category: 'Verdura i hortalisses', availability: 'En estoc', zoneId: 'FV', aisle: 'Zona Fruita i Verdura', section: 'Hortalisses', shelf: 'Expositor FV-5', level: 'Nivell inferior', tags: ['patates', 'cebes', 'verdura'], icon: '🥔' },
    { id: 'm-peb', name: 'Pebrots, carbassons i cogombres', brand: 'Horta Fresca', format: 'Pack 750 g', price: 1.95, category: 'Verdura i hortalisses', availability: 'En estoc', zoneId: 'FV', aisle: 'Zona Fruita i Verdura', section: 'Verdures', shelf: 'Expositor FV-6', level: 'Nivell central', tags: ['pebrots', 'carbassons', 'cogombres', 'verdura'], icon: '🫑' },
    { id: 'm-bro', name: 'Bròquil fresc i verdures variades', brand: 'Horta Fresca', format: 'Peça 500 g', price: 1.45, category: 'Verdura i hortalisses', availability: 'En estoc', zoneId: 'FV', aisle: 'Zona Fruita i Verdura', section: 'Verdures', shelf: 'Expositor FV-6', level: 'Nivell superior', tags: ['broquil', 'verdura', 'hortalisses'], icon: '🥦' },

    // Begudes
    { id: 'm-aig', name: 'Aigua mineral natural i amb gas', brand: 'Font Natura', format: 'Pack 6x1,5 L', price: 2.10, category: 'Begudes', availability: 'En estoc', zoneId: 'B1', aisle: 'Passadís 4', section: 'Begudes', shelf: 'Prestatgeria B1', level: 'Prestatge 1', tags: ['aigua', 'gas', 'begudes'], icon: '💧' },
    { id: 'm-suc', name: 'Suc de taronja 100% espremut', brand: 'Hacendado', format: 'Ampolla 1 L', price: 1.95, category: 'Begudes', availability: 'En estoc', zoneId: 'B1', aisle: 'Passadís 4', section: 'Begudes', shelf: 'Prestatgeria B1', level: 'Prestatge 2', tags: ['suc', 'taronja', 'begudes', 'esmorzar'], icon: '🧃' },
    { id: 'm-ref', name: 'Refrescos de cola i llimona', brand: 'Hacendado', format: 'Pack 6x330 ml', price: 2.75, category: 'Begudes', availability: 'En estoc', zoneId: 'B1', aisle: 'Passadís 4', section: 'Begudes', shelf: 'Prestatgeria B1', level: 'Prestatge 3', tags: ['refrescos', 'cola', 'begudes'], icon: '🥤' },
    { id: 'm-iso', name: 'Beguda isotònica sabor cítric', brand: 'IsoSport', format: 'Ampolla 1,5 L', price: 1.30, category: 'Begudes', availability: 'En estoc', zoneId: 'B1', aisle: 'Passadís 4', section: 'Begudes', shelf: 'Prestatgeria B1', level: 'Prestatge 4', tags: ['isotonica', 'esport', 'begudes'], icon: '⚡' },

    // Carn i peix
    { id: 'm-pol', name: 'Pit de pollastre filetejat', brand: 'Mercadona Carn', format: 'Safata 550 g', price: 4.15, category: 'Carn i peix', availability: 'En estoc', zoneId: 'CP', aisle: 'Taulell Carn i Peix', section: 'Aviram', shelf: 'Mural CP-1', level: 'Prestatge 2', tags: ['pollastre', 'carn'], icon: '🍗' },
    { id: 'm-pic', name: 'Carn picada mixta i hamburgueses', brand: 'Mercadona Carn', format: 'Safata 500 g', price: 3.85, category: 'Carn i peix', availability: 'En estoc', zoneId: 'CP', aisle: 'Taulell Carn i Peix', section: 'Carnisseria', shelf: 'Mural CP-2', level: 'Prestatge 2', tags: ['carn', 'picada', 'hamburgueses'], icon: '🥩' },
    { id: 'm-per', name: 'Pernil dolç i pit de gall dindi', brand: 'Hacendado', format: 'Pack 250 g', price: 2.45, category: 'Carn i peix', availability: 'En estoc', zoneId: 'CP', aisle: 'Taulell Carn i Peix', section: 'Xarcuteria', shelf: 'Mural CP-3', level: 'Prestatge 3', tags: ['pernil', 'gall dindi', 'embotit'], icon: '🥓' },
    { id: 'm-sal', name: 'Salmó fresc, lluç i lloms de tonyina', brand: 'Peixateria Mercadona', format: 'Safata 400 g', price: 5.90, category: 'Carn i peix', availability: 'En estoc', zoneId: 'CP', aisle: 'Taulell Carn i Peix', section: 'Peixateria', shelf: 'Mural CP-4', level: 'Taulell gel', tags: ['salmo', 'lluc', 'tonyina', 'peix'], icon: '🐟' },

    // Congelats
    { id: 'm-vcon', name: 'Verdures i patates congelades', brand: 'Hacendado', format: 'Bossa 1 kg', price: 1.85, category: 'Congelats', availability: 'En estoc', zoneId: 'CG', aisle: 'Zona Congelats', section: 'Congelats', shelf: 'Arcon CG-1', level: 'Compartiment 1', tags: ['verdures', 'patates', 'congelats'], icon: '❄️' },
    { id: 'm-piz', name: 'Pizzes congelades i gelats variats', brand: 'Hacendado', format: 'Caixa 420 g', price: 2.95, category: 'Congelats', availability: 'En estoc', zoneId: 'CG', aisle: 'Zona Congelats', section: 'Congelats', shelf: 'Arcon CG-2', level: 'Compartiment 2', tags: ['pizzes', 'gelats', 'congelats'], icon: '🍕' },
    { id: 'm-pcon', name: 'Filets de peix congelat sense espines', brand: 'Hacendado', format: 'Bossa 600 g', price: 4.40, category: 'Congelats', availability: 'En estoc', zoneId: 'CG', aisle: 'Zona Congelats', section: 'Congelats', shelf: 'Arcon CG-3', level: 'Compartiment 3', tags: ['peix', 'congelat'], icon: '🐟' },

    // Neteja i llar
    { id: 'm-det', name: 'Detergent líquid roba i suavitzant', brand: 'Bosque Verde', format: 'Ampolla 3 L', price: 4.95, category: 'Neteja i llar', availability: 'En estoc', zoneId: 'N1', aisle: 'Passadís 4', section: 'Neteja', shelf: 'Prestatgeria N1', level: 'Prestatge 1', tags: ['detergent', 'suavitzant', 'neteja', 'roba'], icon: '🧴' },
    { id: 'm-ren', name: 'Rentaplats concentrat i netejador multiús', brand: 'Bosque Verde', format: 'Ampolla 750 ml', price: 1.75, category: 'Neteja i llar', availability: 'En estoc', zoneId: 'N1', aisle: 'Passadís 4', section: 'Neteja', shelf: 'Prestatgeria N1', level: 'Prestatge 3', tags: ['rentaplats', 'netejador', 'multius', 'neteja'], icon: '🧽' },
    { id: 'm-pap', name: 'Paper de cuina i paper higiènic', brand: 'Bosque Verde', format: 'Pack 12 rotllos', price: 3.95, category: 'Neteja i llar', availability: 'En estoc', zoneId: 'N2', aisle: 'Passadís 5', section: 'Llar', shelf: 'Prestatgeria N2', level: 'Prestatge 1', tags: ['paper', 'cuina', 'higienic', 'llar', 'neteja'], icon: '🧻' },
  ],

  zara: [
    { id: 'z-cam1', name: 'Camisa de lli relaxada', brand: 'Zara Woman', format: 'Ref. 2143/045', price: 29.95, category: 'Camises', availability: 'En estoc', zoneId: 'Z-CAM', aisle: 'Zona Nord-Oest', section: 'Camises i Tops', shelf: 'Penjador C-01', level: 'Barra superior', variants: { sizes: ['XS', 'S', 'M', 'L'], colors: ['Blanc', 'Blau cel', 'Sorra'] }, tags: ['camisa', 'lli', 'roba'], icon: '👔' },
    { id: 'z-cam2', name: 'Camisa popelín ratlles', brand: 'Zara Basic', format: 'Ref. 4381/210', price: 25.95, category: 'Camises', availability: 'En estoc', zoneId: 'Z-CAM', aisle: 'Zona Nord-Oest', section: 'Camises', shelf: 'Penjador C-02', level: 'Barra mitjana', variants: { sizes: ['S', 'M', 'L', 'XL'], colors: ['Blau/Blanc', 'Negre'] }, tags: ['camisa', 'ratlles'], icon: '👔' },
    { id: 'z-pol1', name: 'Polo punt canalé i top bàsic', brand: 'Zara Studio', format: 'Ref. 5582/112', price: 19.95, category: 'Polos i tops', availability: 'En estoc', zoneId: 'Z-CAM', aisle: 'Zona Nord-Oest', section: 'Polos i tops', shelf: 'Penjador C-04', level: 'Barra inferior', variants: { sizes: ['XS', 'S', 'M', 'L'], colors: ['Cru', 'Negre', 'Verd oliva'] }, tags: ['polo', 'top'], icon: '👚' },
    { id: 'z-sam1', name: 'Samarreta cotó oversize', brand: 'Zara Man', format: 'Ref. 1887/301', price: 15.95, category: 'Samarretes', availability: 'En estoc', zoneId: 'Z-SAM', aisle: 'Zona Central Nord', section: 'Samarretes', shelf: 'Taula T-01', level: 'Pila central', variants: { sizes: ['S', 'M', 'L', 'XL'], colors: ['Blanc', 'Negre', 'Gris'] }, tags: ['samarreta', 'coto'], icon: '👕' },
    { id: 'z-des1', name: 'Dessuadora caputxa heavy weight', brand: 'Zara Athletic', format: 'Ref. 0761/408', price: 35.95, category: 'Dessuadores', availability: 'En estoc', zoneId: 'Z-SAM', aisle: 'Zona Central Nord', section: 'Dessuadores', shelf: 'Taula T-02', level: 'Expositor frontal', variants: { sizes: ['S', 'M', 'L', 'XL'], colors: ['Gris vigoré', 'Blau marí', 'Negre'] }, tags: ['dessuadora', 'caputxa'], icon: '🧥' },
    { id: 'z-tex1', name: 'Texans straight fit vintage', brand: 'Zara Denim', format: 'Ref. 6688/020', price: 39.95, category: 'Texans', availability: 'En estoc', zoneId: 'Z-PAN', aisle: 'Zona Denim', section: 'Texans', shelf: 'Expositor D-01', level: 'Prestatge 2', variants: { sizes: ['36', '38', '40', '42', '44'], colors: ['Blau rentat', 'Negre', 'Gris'] }, tags: ['texans', 'jeans', 'pantalons'], icon: '👖' },
    { id: 'z-pan1', name: 'Pantalons pinces vestir', brand: 'Zara Tailored', format: 'Ref. 1608/702', price: 35.95, category: 'Pantalons', availability: 'En estoc', zoneId: 'Z-PAN', aisle: 'Zona Denim', section: 'Pantalons', shelf: 'Expositor P-02', level: 'Penjador lateral', variants: { sizes: ['36', '38', '40', '42'], colors: ['Beix', 'Negre', 'Blau marí'] }, tags: ['pantalons', 'vestir'], icon: '👖' },
    { id: 'z-jer1', name: 'Jersei punt suau coll rodó', brand: 'Zara Knit', format: 'Ref. 3920/119', price: 29.95, category: 'Jerseis', availability: 'En estoc', zoneId: 'Z-ABR', aisle: 'Zona Oest', section: 'Punt i abrics', shelf: 'Penjador A-01', level: 'Prestatge 1', variants: { sizes: ['S', 'M', 'L'], colors: ['Camel', 'Gris', 'Verd'] }, tags: ['jersei', 'punt'], icon: '🧶' },
    { id: 'z-jaq1', name: 'Jaqueta efecte pell biker', brand: 'Zara Woman', format: 'Ref. 3046/222', price: 59.95, category: 'Jaquetes', availability: 'Estoc limitat', zoneId: 'Z-ABR', aisle: 'Zona Oest', section: 'Exterior', shelf: 'Penjador A-03', level: 'Barra principal', variants: { sizes: ['XS', 'S', 'M', 'L'], colors: ['Negre', 'Marró'] }, tags: ['jaqueta', 'pell'], icon: '🧥' },
    { id: 'z-abr1', name: 'Abric llana creuat', brand: 'Zara Premium', format: 'Ref. 8490/650', price: 89.95, category: 'Abrics', availability: 'En estoc', zoneId: 'Z-ABR', aisle: 'Zona Oest', section: 'Exterior', shelf: 'Penjador A-05', level: 'Barra alta', variants: { sizes: ['S', 'M', 'L'], colors: ['Camel', 'Negre'] }, tags: ['abric', 'llana'], icon: '🧥' },
    { id: 'z-ves1', name: 'Vestit midi setinat', brand: 'Zara Woman', format: 'Ref. 7521/033', price: 45.95, category: 'Vestits', availability: 'En estoc', zoneId: 'Z-VES', aisle: 'Zona Central Sud', section: 'Vestits i Faldilles', shelf: 'Expositor V-01', level: 'Barra frontal', variants: { sizes: ['XS', 'S', 'M', 'L'], colors: ['Bordeus', 'Negre', 'Xampany'] }, tags: ['vestit', 'midi'], icon: '👗' },
    { id: 'z-fal1', name: 'Faldilla prisada midi', brand: 'Zara Woman', format: 'Ref. 4432/188', price: 29.95, category: 'Faldilles', availability: 'En estoc', zoneId: 'Z-VES', aisle: 'Zona Central Sud', section: 'Vestits i Faldilles', shelf: 'Expositor V-03', level: 'Barra dreta', variants: { sizes: ['XS', 'S', 'M', 'L'], colors: ['Negre', 'Caqui'] }, tags: ['faldilla', 'midi'], icon: '👗' },
    { id: 'z-cal1', name: 'Sabatilles urbanes pell sintètica', brand: 'Zara Footwear', format: 'Ref. 2210/910', price: 39.95, category: 'Calçat', availability: 'En estoc', zoneId: 'Z-CAL', aisle: 'Zona Calçat', section: 'Calçat', shelf: 'Expositor S-01', level: 'Prestatge 2', variants: { sizes: ['37', '38', '39', '40', '41', '42'], colors: ['Blanc', 'Negre'] }, tags: ['calcat', 'sabatilles', 'sabates'], icon: '👟' },
    { id: 'z-bos1', name: 'Bossa shopper i motxilla urbana', brand: 'Zara Accs', format: 'Ref. 6109/010', price: 27.95, category: 'Bosses i motxilles', availability: 'En estoc', zoneId: 'Z-COM', aisle: 'Zona Complements', section: 'Bosses', shelf: 'Expositor K-01', level: 'Prestatge 2', variants: { sizes: ['Única'], colors: ['Negre', 'Torrat'] }, tags: ['bossa', 'motxilla', 'complements'], icon: '👜' },
    { id: 'z-com1', name: 'Ulleres de sol acetat i cinturó pell', brand: 'Zara Accs', format: 'Ref. 9012/004', price: 17.95, category: 'Complements', availability: 'En estoc', zoneId: 'Z-COM', aisle: 'Zona Complements', section: 'Complements', shelf: 'Expositor K-02', level: 'Vitrina 1', variants: { sizes: ['Única'], colors: ['Carei', 'Negre'] }, tags: ['complements', 'ulleres', 'cinturo'], icon: '🕶️' },
  ],

  biblioteca: [
    { id: 'b-hp', name: 'Harry Potter i la pedra filosofal', brand: 'J. K. Rowling', format: 'Tapa dura · 256 pàg.', price: 'Préstec gratuït', category: 'Fantasia', availability: 'Disponible', zoneId: 'BIB-FAN', aisle: 'Passadís B', section: 'Fantasia', shelf: 'Prestatgeria F-01', level: 'Prestatge 2', tags: ['harry potter', 'fantasia', 'llibre', 'magia'], icon: '⚡' },
    { id: 'b-pp', name: 'El petit príncep', brand: 'Antoine de Saint-Exupéry', format: 'Edició il·lustrada · 96 pàg.', price: 'Préstec gratuït', category: 'Infantil', availability: 'Disponible', zoneId: 'BIB-INF', aisle: 'Zona Infantil', section: 'Infantil i clàssics', shelf: 'Prestatgeria I-03', level: 'Prestatge 1', tags: ['petit princep', 'infantil', 'classic', 'llibre'], icon: '🌹' },
    { id: 'b-jf', name: 'Els jocs de la fam', brand: 'Suzanne Collins', format: 'Rústica · 416 pàg.', price: 'Préstec gratuït', category: 'Ciència-ficció', availability: 'Disponible', zoneId: 'BIB-FAN', aisle: 'Passadís B', section: 'Ciència-ficció', shelf: 'Prestatgeria CF-02', level: 'Prestatge 3', tags: ['jocs de la fam', 'ciencia-ficcio', 'aventura'], icon: '🏹' },
    { id: 'b-sa', name: "El senyor dels anells: La germandat de l'anell", brand: 'J. R. R. Tolkien', format: 'Edició integral · 560 pàg.', price: 'Préstec gratuït', category: 'Fantasia', availability: 'Disponible', zoneId: 'BIB-FAN', aisle: 'Passadís B', section: 'Fantasia èpica', shelf: 'Prestatgeria F-02', level: 'Prestatge 2', tags: ['senyor dels anells', 'tolkien', 'fantasia'], icon: '💍' },
    { id: 'b-nov1', name: 'La plaça del Diamant', brand: 'Mercè Rodoreda', format: 'Butxaca · 240 pàg.', price: 'Préstec gratuït', category: 'Novel·la', availability: 'Disponible', zoneId: 'BIB-NOV', aisle: 'Passadís A', section: 'Novel·la catalana', shelf: 'Prestatgeria N-01', level: 'Prestatge 2', tags: ['novella', 'rodoreda', 'classic'], icon: '📖' },
    { id: 'b-neg1', name: "L'ombra del vent", brand: 'Carlos Ruiz Zafón', format: 'Rústica · 576 pàg.', price: 'Préstec gratuït', category: 'Novel·la negra i policíaca', availability: 'Disponible', zoneId: 'BIB-NEG', aisle: 'Passadís A', section: 'Novel·la negra', shelf: 'Prestatgeria NG-01', level: 'Prestatge 3', tags: ['novella negra', 'policiaca', 'misteri'], icon: '🕵️' },
    { id: 'b-ave1', name: "L'illa del tresor", brand: 'Robert Louis Stevenson', format: 'Edició juvenil · 288 pàg.', price: 'Préstec gratuït', category: 'Aventura', availability: 'Disponible', zoneId: 'BIB-AVE', aisle: 'Passadís B', section: 'Aventura', shelf: 'Prestatgeria AV-01', level: 'Prestatge 2', tags: ['aventura', 'pirates'], icon: '🧭' },
    { id: 'b-rom1', name: 'Orgull i prejudici', brand: 'Jane Austen', format: 'Tapa dura · 432 pàg.', price: 'Préstec gratuït', category: 'Romàntica', availability: 'Disponible', zoneId: 'BIB-AVE', aisle: 'Passadís B', section: 'Romàntica', shelf: 'Prestatgeria RM-02', level: 'Prestatge 3', tags: ['romantica', 'austen'], icon: '💐' },
    { id: 'b-his1', name: 'Sàpiens: Una breu història de la humanitat', brand: 'Yuval Noah Harari', format: 'Assaig històric · 512 pàg.', price: 'Préstec gratuït', category: 'Història', availability: 'Disponible', zoneId: 'BIB-HIS', aisle: 'Passadís C', section: 'Història', shelf: 'Prestatgeria H-01', level: 'Prestatge 1', tags: ['historia', 'sapiens', 'assaig'], icon: '🏛️' },
    { id: 'b-bio1', name: 'Steve Jobs: La biografia', brand: 'Walter Isaacson', format: 'Rústica · 736 pàg.', price: 'Préstec gratuït', category: 'Biografies', availability: 'Disponible', zoneId: 'BIB-HIS', aisle: 'Passadís C', section: 'Biografies', shelf: 'Prestatgeria B-02', level: 'Prestatge 2', tags: ['biografies', 'tecnologia'], icon: '✍️' },
    { id: 'b-ass1', name: 'Pensar ràpid, pensar a poc a poc', brand: 'Daniel Kahneman', format: 'Assaig · 640 pàg.', price: 'Préstec gratuït', category: 'Assaig', availability: 'Disponible', zoneId: 'BIB-HIS', aisle: 'Passadís C', section: 'Assaig', shelf: 'Prestatgeria AS-03', level: 'Prestatge 3', tags: ['assaig', 'psicologia'], icon: '🧠' },
    { id: 'b-com1', name: 'One Piece · Volum 1', brand: 'Eiichiro Oda', format: 'Manga · 208 pàg.', price: 'Préstec gratuït', category: 'Còmics i manga', availability: 'Disponible', zoneId: 'BIB-COM', aisle: 'Passadís C', section: 'Còmics i manga', shelf: 'Prestatgeria CM-01', level: 'Prestatge 2', tags: ['comics', 'manga', 'one piece'], icon: '💥' },
  ],

  decathlon: [
    // Running (Zona A)
    { id: 'd-run1', name: 'Sabatilles de running Kiprun KS900', brand: 'Kiprun', format: 'Model KS900 Light', price: 79.99, category: 'Running', availability: 'En estoc', zoneId: 'A1', aisle: 'Zona A · Running', section: 'Calçat running', shelf: 'Prestatgeria A1', level: 'Expositor 2', variants: { sizes: ['39', '40', '41', '42', '43', '44'], colors: ['Blau elèctric', 'Negre/Taronja'] }, tags: ['sabatilles', 'running', 'atletisme'], icon: '👟' },
    { id: 'd-run2', name: 'Mitjons esportius tècnics Run500', brand: 'Kiprun', format: 'Pack 2 parells', price: 8.99, category: 'Running', availability: 'En estoc', zoneId: 'A1', aisle: 'Zona A · Running', section: 'Accessoris running', shelf: 'Prestatgeria A1', level: 'Prestatge 4', variants: { sizes: ['39-42', '43-46'], colors: ['Blanc', 'Negre'] }, tags: ['mitjons', 'running'], icon: '🧦' },
    { id: 'd-run3', name: 'Samarreta tècnica transpirable i pantalons curts', brand: 'Kalenji', format: 'Set Run Dry', price: 14.99, category: 'Running', availability: 'En estoc', zoneId: 'A1', aisle: 'Zona A · Running', section: 'Tèxtil running', shelf: 'Prestatgeria A2', level: 'Penjador 1', variants: { sizes: ['S', 'M', 'L', 'XL'], colors: ['Blau', 'Negre', 'Coral'] }, tags: ['samarretes', 'pantalons curts', 'running'], icon: '👕' },
    { id: 'd-run4', name: 'Rellotge esportiu GPS Kiprun 500', brand: 'Kiprun', format: 'Coros GPS', price: 119.99, category: 'Running', availability: 'Estoc limitat', zoneId: 'A1', aisle: 'Zona A · Running', section: 'Electrònica', shelf: 'Vitrina A2', level: 'Prestatge 2', variants: { sizes: ['Única'], colors: ['Negre', 'Blanc'] }, tags: ['rellotges', 'gps', 'running'], icon: '⌚' },

    // Fitness i musculació (Zona B)
    { id: 'd-fit1', name: 'Manuelles hexagonals 5 kg (parell)', brand: 'Corength', format: '2 x 5 kg cautxú', price: 29.99, category: 'Fitness i musculació', availability: 'En estoc', zoneId: 'B1', aisle: 'Zona B · Fitness', section: 'Musculació', shelf: 'Prestatgeria B1', level: 'Prestatge 1', tags: ['manuelles', 'peses', 'fitness', 'gimnas'], icon: '🏋️' },
    { id: 'd-fit2', name: "Esterilla d'entrenament i bandes elàstiques", brand: 'Domyos', format: '180x60 cm · 10 mm', price: 18.99, category: 'Fitness i musculació', availability: 'En estoc', zoneId: 'B1', aisle: 'Zona B · Fitness', section: 'Fitness', shelf: 'Prestatgeria B1', level: 'Prestatge 3', variants: { sizes: ['Única'], colors: ['Blau', 'Negre', 'Lila'] }, tags: ['esterilles', 'bandes elastiques', 'ioga', 'fitness'], icon: '🧘' },
    { id: 'd-fit3', name: "Guants de gimnàs i ampolla d'aigua 1 L", brand: 'Domyos', format: 'Pack entrenament', price: 12.99, category: 'Fitness i musculació', availability: 'En estoc', zoneId: 'B1', aisle: 'Zona B · Fitness', section: 'Accessoris fitness', shelf: 'Prestatgeria B2', level: 'Prestatge 2', variants: { sizes: ['S', 'M', 'L'], colors: ['Negre', 'Gris'] }, tags: ['guants', 'ampolles', 'fitness'], icon: '🧤' },

    // Ciclisme (Zona C)
    { id: 'd-cic1', name: 'Casc de bicicleta RoadR 500 MIPS', brand: 'Van Rysel', format: 'Talla ajustable', price: 49.99, category: 'Ciclisme', availability: 'En estoc', zoneId: 'C1', aisle: 'Zona C · Ciclisme', section: 'Protecció ciclisme', shelf: 'Prestatgeria C1', level: 'Prestatge 2', variants: { sizes: ['M', 'L'], colors: ['Blanc', 'Negre mat'] }, tags: ['cascos', 'bicicleta', 'ciclisme'], icon: '🪖' },
    { id: 'd-cic2', name: 'Guants de ciclisme i llums LED recarregables', brand: 'Triban', format: 'Kit seguretat', price: 24.99, category: 'Ciclisme', availability: 'En estoc', zoneId: 'C1', aisle: 'Zona C · Ciclisme', section: 'Accessoris bici', shelf: 'Prestatgeria C2', level: 'Prestatge 3', variants: { sizes: ['M', 'L'], colors: ['Negre', 'Groc fluo'] }, tags: ['guants', 'llums', 'ciclisme'], icon: '💡' },
    { id: 'd-cic3', name: "Cambres d'aire 700x28 i bomba d'inflar peu", brand: 'Btwin', format: 'Vàlvula Presta', price: 21.99, category: 'Ciclisme', availability: 'En estoc', zoneId: 'C1', aisle: 'Zona C · Ciclisme', section: 'Taller ciclisme', shelf: 'Prestatgeria C3', level: 'Prestatge 1', tags: ['cambres aire', 'bombes', 'inflar', 'ciclisme'], icon: '🚲' },

    // Muntanya i senderisme (Zona D)
    { id: 'd-mun1', name: 'Motxilla de muntanya MH500 30 L', brand: 'Quechua', format: '30 Litres', price: 54.99, category: 'Muntanya i senderisme', availability: 'En estoc', zoneId: 'D1', aisle: 'Zona D · Muntanya', section: 'Motxilles', shelf: 'Prestatgeria D1', level: 'Expositor 1', variants: { sizes: ['30 L'], colors: ['Blau oceà', 'Caqui', 'Negre'] }, tags: ['motxilles', 'muntanya', 'senderisme'], icon: '🎒' },
    { id: 'd-mun2', name: 'Botes de senderisme impermeables MH500', brand: 'Quechua', format: 'Canya mitjana', price: 69.99, category: 'Muntanya i senderisme', availability: 'En estoc', zoneId: 'D1', aisle: 'Zona D · Muntanya', section: 'Calçat muntanya', shelf: 'Prestatgeria D1', level: 'Expositor 3', variants: { sizes: ['39', '40', '41', '42', '43', '44'], colors: ['Marró', 'Gris'] }, tags: ['botes', 'sabatilles', 'muntanya', 'senderisme'], icon: '🥾' },
    { id: 'd-mun3', name: 'Bastons de trekking, cantimplora i sac de dormir', brand: 'Forclaz', format: 'Pack bivac', price: 44.99, category: 'Muntanya i senderisme', availability: 'En estoc', zoneId: 'D1', aisle: 'Zona D · Muntanya', section: 'Acampada', shelf: 'Prestatgeria D2', level: 'Prestatge 2', tags: ['bastons', 'cantimplores', 'sacs de dormir', 'muntanya'], icon: '⛺' },

    // Natació (Zona E)
    { id: 'd-nat1', name: 'Ulleres de natació antibaf Bfit i casquet', brand: 'Nabaiji', format: 'Lents clares', price: 14.99, category: 'Natació', availability: 'En estoc', zoneId: 'E1', aisle: 'Zona E · Natació', section: 'Ulleres i casquets', shelf: 'Prestatgeria E1', level: 'Prestatge 2', variants: { sizes: ['Única'], colors: ['Blau', 'Negre'] }, tags: ['ulleres', 'casquets', 'piscina', 'natacio'], icon: '🥽' },
    { id: 'd-nat2', name: 'Banyador esportiu resistent al clor', brand: 'Nabaiji', format: 'Teixit Aquaresist', price: 19.99, category: 'Natació', availability: 'En estoc', zoneId: 'E1', aisle: 'Zona E · Natació', section: 'Banyadors', shelf: 'Prestatgeria E1', level: 'Penjador 2', variants: { sizes: ['S', 'M', 'L', 'XL'], colors: ['Blau marí', 'Negre'] }, tags: ['banyadors', 'natacio', 'piscina'], icon: '🩲' },
    { id: 'd-nat3', name: 'Tovallola de microfibra XL i xancletes piscina', brand: 'Nabaiji', format: '110x175 cm', price: 15.99, category: 'Natació', availability: 'En estoc', zoneId: 'E1', aisle: 'Zona E · Natació', section: 'Tovalloles i calçat', shelf: 'Prestatgeria E1', level: 'Prestatge 4', variants: { sizes: ['39-40', '41-42', '43-44'], colors: ['Turquesa', 'Blau'] }, tags: ['tovalloles', 'microfibra', 'xancletes', 'natacio'], icon: '🩴' },

    // Futbol i esports d'equip (Zona F)
    { id: 'd-fut1', name: 'Pilota de futbol F500 talla 5 FIFA Basic', brand: 'Kipsta', format: 'Talla 5 oficial', price: 22.99, category: "Futbol i esports d'equip", availability: 'En estoc', zoneId: 'F1', aisle: 'Zona F · Futbol', section: 'Pilotes', shelf: 'Prestatgeria F1', level: 'Cistell 1', tags: ['pilotes', 'futbol'], icon: '⚽' },
    { id: 'd-fut2', name: 'Espinilleres, mitjons i samarreta futbol', brand: 'Kipsta', format: 'Kit partit', price: 24.99, category: "Futbol i esports d'equip", availability: 'En estoc', zoneId: 'F1', aisle: 'Zona F · Futbol', section: 'Equipament futbol', shelf: 'Prestatgeria F1', level: 'Prestatge 2', variants: { sizes: ['S', 'M', 'L'], colors: ['Blau', 'Vermell', 'Negre'] }, tags: ['espinilleres', 'mitjons', 'samarretes', 'futbol'], icon: '🧦' },
    { id: 'd-fut3', name: 'Guants de porter F500 adherència làtex', brand: 'Kipsta', format: 'Làtex 3 mm', price: 19.99, category: "Futbol i esports d'equip", availability: 'En estoc', zoneId: 'F1', aisle: 'Zona F · Futbol', section: 'Porters', shelf: 'Prestatgeria F1', level: 'Prestatge 3', variants: { sizes: ['7', '8', '9', '10'], colors: ['Negre/Llima'] }, tags: ['guants', 'porter', 'futbol'], icon: '🧤' },

    // Esports de raqueta (Zona G)
    { id: 'd-raq1', name: 'Raqueta de pàdel Kuikma PR990 Carbon', brand: 'Kuikma', format: 'Forma llàgrima', price: 89.99, category: 'Esports de raqueta', availability: 'En estoc', zoneId: 'G1', aisle: 'Zona G · Raqueta', section: 'Pàdel', shelf: 'Prestatgeria G1', level: 'Expositor 1', tags: ['raquetes', 'padel', 'raqueta'], icon: '🎾' },
    { id: 'd-raq2', name: 'Raqueta de tennis TR500 i pot de pilotes', brand: 'Artengo', format: '280 g + 3 pilotes', price: 54.99, category: 'Esports de raqueta', availability: 'En estoc', zoneId: 'G1', aisle: 'Zona G · Raqueta', section: 'Tennis', shelf: 'Prestatgeria G1', level: 'Expositor 2', variants: { sizes: ['Grip 2', 'Grip 3'], colors: ['Blau/Blanc'] }, tags: ['raquetes', 'tennis', 'pilotes'], icon: '🎾' },
    { id: 'd-raq3', name: 'Volants de bàdminton i funda de raqueta', brand: 'Perfly', format: 'Tub 6 volants', price: 11.99, category: 'Esports de raqueta', availability: 'En estoc', zoneId: 'G1', aisle: 'Zona G · Raqueta', section: 'Bàdminton', shelf: 'Prestatgeria G1', level: 'Prestatge 3', tags: ['volants', 'badminton', 'fundes'], icon: '🏸' },

    // Roba i calçat esportiu (Zona H)
    { id: 'd-rob1', name: 'Dessuadora i pantalons de xandall cotó', brand: 'Domyos', format: 'Conjunt 2 peces', price: 34.99, category: 'Roba i calçat esportiu', availability: 'En estoc', zoneId: 'H1', aisle: 'Zona H · Roba Esportiva', section: 'Xandalls', shelf: 'Prestatgeria H1', level: 'Penjador 1', variants: { sizes: ['S', 'M', 'L', 'XL'], colors: ['Gris', 'Negre', 'Blau marí'] }, tags: ['dessuadores', 'pantalons', 'xandall', 'roba'], icon: '🧥' },
    { id: 'd-rob2', name: 'Jaqueta esportiva paravent i samarreta bàsica', brand: 'Kipsta', format: "Resistent a l'aigua", price: 29.99, category: 'Roba i calçat esportiu', availability: 'En estoc', zoneId: 'H1', aisle: 'Zona H · Roba Esportiva', section: 'Jaquetes', shelf: 'Prestatgeria H1', level: 'Penjador 2', variants: { sizes: ['S', 'M', 'L', 'XL'], colors: ['Negre', 'Blau'] }, tags: ['jaquetes', 'samarretes', 'roba'], icon: '🧥' },
    { id: 'd-rob3', name: 'Sabatilles esportives multiús Soft 140', brand: 'Newfeel', format: 'Sola flexible', price: 24.99, category: 'Roba i calçat esportiu', availability: 'En estoc', zoneId: 'H1', aisle: 'Zona H · Roba Esportiva', section: 'Calçat esportiu', shelf: 'Prestatgeria H1', level: 'Prestatge 2', variants: { sizes: ['38', '39', '40', '41', '42', '43'], colors: ['Negre', 'Gris', 'Blau'] }, tags: ['sabatilles', 'calcat', 'esportiu'], icon: '👟' },
  ],
};
