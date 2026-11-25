import React from 'react';
import { Product, StoreId } from '../types';
import { getCategoryMeta } from '../utils/navigationEngine';

interface ProductArtProps {
  storeId: StoreId;
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductArt: React.FC<ProductArtProps> = ({ storeId, product, size = 'md' }) => {
  const cat = getCategoryMeta(storeId, product.category);

  const sizeClass =
    size === 'sm'
      ? 'w-11 h-11 rounded-[10px] text-[21px]'
      : size === 'lg'
        ? 'w-28 h-28 rounded-[24px] text-[52px]'
        : 'w-14 h-14 rounded-[13px] text-[27px]';

  return (
    <div
      className={`${sizeClass} relative shrink-0 flex items-center justify-center overflow-hidden border`}
      style={{
        background: `linear-gradient(135deg, ${cat.bg}, #FFFFFF)`,
        borderColor: `${cat.color}33`,
      }}
      aria-hidden="true"
    >
      <span className="leading-none select-none">{product.icon || cat.icon}</span>
      <span
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: cat.color }}
      />
    </div>
  );
};
