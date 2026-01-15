import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { ProductGrid } from './ProductGrid';
import { Product, SortType, SortDirection } from '../types';
import { ChevronLeft, MoreHorizontal, Disc } from 'lucide-react';

interface ProductListPageProps {
  onBack: () => void;
  products: Product[];
  onProductClick: (product: Product) => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onBrandClick: () => void;
  cartItems?: Product[];
  onAddToCart?: (product: Product) => void;
}

export const ProductListPage: React.FC<ProductListPageProps> = ({ 
  onBack, 
  products, 
  onProductClick, 
  onSearchClick,
  onCartClick,
  onBrandClick,
  cartItems,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Modal State
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [selectedProductForCart, setSelectedProductForCart] = useState<Product | null>(null);
  const [priceInputValue, setPriceInputValue] = useState('');

  const handleSortChange = (type: SortType) => {
    if (sortType === type) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else if (sortDirection === 'desc') setSortDirection(null);
      else setSortDirection('asc');
    } else {
      setSortType(type);
      setSortDirection('asc');
    }
  };

  const filteredProducts = products.filter(p => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    return true;
  }).sort((a, b) => {
      if (!sortType || !sortDirection) return 0;
      
      let valA: any = a.price;
      let valB: any = b.price;

      if (sortType === 'inventory') {
          valA = a.inventoryTime || '';
          valB = b.inventoryTime || '';
      } else if (sortType === 'listing') {
          valA = a.listingTime || '';
          valB = b.listingTime || '';
      }

      if (sortDirection === 'asc') {
          return valA > valB ? 1 : -1;
      } else {
          return valA < valB ? 1 : -1;
      }
  });

  // Handle click on "Add to Cart" button in grid
  const handleAddToCartClick = (product: Product) => {
      setSelectedProductForCart(product);
      setPriceInputValue('');
      setIsPriceModalOpen(true);
  };

  const handleConfirmPrice = () => {
      if (!selectedProductForCart) return;
      const price = parseFloat(priceInputValue);
      if (isNaN(price)) return; 

      if (onAddToCart) {
          // Pass the updated product with the user-input price
          onAddToCart({ ...selectedProductForCart, price });
      }
      setIsPriceModalOpen(false);
      setSelectedProductForCart(null);
  };

  const handleAutoFill = () => {
      if (selectedProductForCart && selectedProductForCart.price > 0) {
          setPriceInputValue(selectedProductForCart.price.toString());
      }
  };

  const isNegotiable = selectedProductForCart?.price === 0;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
       <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 relative">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 absolute left-0 right-0 text-center pointer-events-none">在售商品</h1>
        
        <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm z-10">
          <button className="p-1">
            <MoreHorizontal className="w-5 h-5 text-gray-800" />
          </button>
          <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
          <button className="p-1">
            <Disc className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </header>
      
      {/* Search & Filter */}
      <div className="sticky top-[56px] z-40 bg-white">
          <SearchBar 
              value=""
              onSearchInputClick={onSearchClick}
              onCartClick={onCartClick}
              onBrandClick={onBrandClick}
          />
          <FilterBar 
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
            onSortChange={handleSortChange}
            currentSortType={sortType}
            currentSortDirection={sortDirection}
          />
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto bg-[#f3f4f6]">
          <ProductGrid 
            products={filteredProducts} 
            onProductClick={onProductClick} 
            cartItems={cartItems}
            onAddToCart={handleAddToCartClick}
          />
      </div>

      {/* Confirm Sales Price Modal */}
      {isPriceModalOpen && selectedProductForCart && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsPriceModalOpen(false)}></div>
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
             <h3 className="text-lg font-bold text-gray-900 mb-6">确认销售价格</h3>
             
             {/* Input Area */}
             <div className="flex items-baseline border-b border-gray-200 pb-2 mb-3">
                <span className="text-2xl font-bold text-gray-900 mr-2">¥</span>
                <input 
                  type="number" 
                  value={priceInputValue}
                  onChange={(e) => setPriceInputValue(e.target.value)}
                  placeholder="请输入销售金额"
                  className="flex-1 text-2xl font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none bg-transparent"
                  autoFocus
                />
                <span className="text-lg text-gray-600 ml-2">元</span>
             </div>

             {/* Helper Text */}
             <div className="flex items-center text-sm mb-8 h-5">
                 {!isNegotiable ? (
                    <>
                        <span className="text-gray-500 mr-2">
                            销售价格{selectedProductForCart.price.toLocaleString('en-US', { minimumFractionDigits: 2 })},
                        </span>
                        <button 
                            onClick={handleAutoFill}
                            className="text-blue-500 active:opacity-70 font-medium"
                        >
                            自动带入
                        </button>
                    </>
                 ) : (
                    <span className="text-gray-400 text-xs">商品价格面议，请手动输入销售金额</span>
                 )}
             </div>

             {/* Confirm Button */}
             <button 
                onClick={handleConfirmPrice}
                disabled={!priceInputValue}
                className={`w-full text-white font-bold py-3.5 rounded-xl text-base shadow-lg transition-all ${
                    priceInputValue 
                    ? 'bg-[#ff5e5e] shadow-red-100 active:scale-95' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
             >
                确 定
             </button>
          </div>
        </div>
      )}
    </div>
  );
};