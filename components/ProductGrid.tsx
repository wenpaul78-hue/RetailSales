import React, { useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  cartItems?: Product[];
  onAddToCart?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onProductClick,
  cartItems = [],
  onAddToCart
}) => {
  // Distribute products into two columns for the waterfall effect
  const columns = useMemo(() => {
    const leftCol: Product[] = [];
    const rightCol: Product[] = [];
    
    products.forEach((product, index) => {
      if (index % 2 === 0) {
        leftCol.push(product);
      } else {
        rightCol.push(product);
      }
    });
    
    return [leftCol, rightCol];
  }, [products]);

  const isProductInCart = (id: string) => {
    return cartItems.some(item => item.id === id);
  };

  return (
    <div className="p-3 flex gap-2.5 pb-24 items-start">
      {columns.map((column, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-2.5">
          {column.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onProductClick && onProductClick(product)}
              onAddToCart={onAddToCart}
              isInCart={isProductInCart(product.id)}
            />
          ))}
        </div>
      ))}
      
      {products.length === 0 && (
        <div className="w-full py-20 text-center text-gray-400 text-sm">
          暂无相关商品
        </div>
      )}
    </div>
  );
};