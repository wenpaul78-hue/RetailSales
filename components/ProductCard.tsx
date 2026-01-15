import React from 'react';
import { ShoppingBag, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  onAddToCart?: (product: Product) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onClick,
  onAddToCart,
  isInCart = false
}) => {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col active:scale-[0.98] transition-all cursor-pointer group relative"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="bg-[#f9fafb] relative overflow-hidden flex items-center justify-center p-2 min-h-[140px]">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Condition Badge */}
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
          {product.condition}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Title */}
        <div className="text-xs text-gray-800 leading-relaxed line-clamp-2 font-medium mb-2 min-h-[2.5rem]">
          {product.title}
        </div>

        {/* Footer: Price and Cart Button */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            {product.price && product.price > 0 ? (
              <div className="flex items-baseline text-[#ff5e5e] font-bold font-mono">
                <span className="text-[10px] mr-0.5">¥</span>
                <span className="text-base tracking-tighter">
                  {product.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
                <span className="text-[10px] ml-0.5 opacity-80">.00</span>
              </div>
            ) : (
              <div className="text-[#ff5e5e] font-bold text-sm">
                面议
              </div>
            )}
            
            {product.uniqueCode && (
              <div className="mt-1.5 text-[9px] text-gray-300 font-mono truncate border-t border-gray-50 pt-1.5 max-w-[100px]">
                ID: {product.uniqueCode}
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          {!isInCart && onAddToCart && (
            <button 
              className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform mb-1"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};