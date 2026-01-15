import React from 'react';
import { Tag, Search, ShoppingBag } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onSearchInputClick: () => void;
  onCartClick?: () => void;
  onBrandClick?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value,
  onSearchInputClick, 
  onCartClick, 
  onBrandClick 
}) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-blue-50/20">
      {/* Brand Icon */}
      <button 
        className="flex flex-col items-center justify-center space-y-[2px] active:opacity-70"
        onClick={onBrandClick}
      >
        <Tag className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
        <span className="text-[10px] text-gray-600 font-medium">品牌</span>
      </button>

      {/* Search Input (Read Only / Trigger) */}
      <div 
        className="flex-1 relative cursor-pointer active:opacity-90"
        onClick={onSearchInputClick}
      >
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <div className={`w-full bg-white border border-gray-100 text-sm rounded-lg block pl-10 p-2.5 shadow-sm h-[42px] flex items-center ${value ? 'text-gray-800' : 'text-gray-400'}`}>
           {value || "搜索 品牌/系列/型号"}
        </div>
      </div>

      {/* Shopping Bag */}
      <button 
        className="flex flex-col items-center justify-center space-y-[2px] relative active:opacity-70 transition-opacity"
        onClick={onCartClick}
      >
        <div className="relative">
          <ShoppingBag className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
          <div className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
            99+
          </div>
        </div>
        <span className="text-[10px] text-gray-600 font-medium">购物袋</span>
      </button>
    </div>
  );
};