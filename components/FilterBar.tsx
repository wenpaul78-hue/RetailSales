import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronsUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { CATEGORY_LIST } from '../constants';
import { SortType, SortDirection } from '../types';

interface FilterBarProps {
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
  onSortChange: (type: SortType) => void;
  currentSortType: SortType | null;
  currentSortDirection: SortDirection;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  onCategorySelect, 
  selectedCategory,
  onSortChange,
  currentSortType,
  currentSortDirection
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Prevent background scrolling when dropdown is open
  useEffect(() => {
    if (isCategoryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCategoryOpen]);

  const filterItemClass = "flex items-center justify-center space-x-1 py-3 text-sm text-gray-700 bg-white flex-1 active:bg-gray-50 transition-colors cursor-pointer select-none relative";

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const getSortIcon = (type: SortType) => {
    if (currentSortType !== type || currentSortDirection === null) {
      return <ChevronsUpDown className="w-3 h-3 text-gray-400" />;
    }
    if (currentSortDirection === 'asc') {
      return <ArrowUp className="w-3 h-3 text-amber-600" />;
    }
    return <ArrowDown className="w-3 h-3 text-amber-600" />;
  };

  const getSortTextStyle = (type: SortType) => {
    return currentSortType === type && currentSortDirection !== null 
      ? "font-bold text-amber-600" 
      : "font-medium text-gray-700";
  };

  return (
    <div className="relative z-40 bg-white shadow-sm">
      <div className="flex items-center justify-between sticky top-[60px] border-b border-gray-100">
        {/* Category Filter - Stays amber if a category is selected */}
        <div
          className={`${filterItemClass} ${isCategoryOpen || selectedCategory ? 'text-amber-600 font-bold' : ''}`}
          onClick={toggleCategory}
        >
          <span className="truncate max-w-[4em]">{selectedCategory || '类目'}</span>
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180 text-amber-600' : (selectedCategory ? 'text-amber-600' : 'text-gray-400')}`} />
        </div>
        
        {/* Price Sort */}
        <div 
          className={filterItemClass}
          onClick={() => onSortChange('price')}
        >
          <span className={getSortTextStyle('price')}>价格</span>
          {getSortIcon('price')}
        </div>
        
        {/* Inventory Time Sort */}
        <div 
          className={filterItemClass}
          onClick={() => onSortChange('inventory')}
        >
          <span className={getSortTextStyle('inventory')}>库存时间</span>
          {getSortIcon('inventory')}
        </div>
        
        {/* Listing Time Sort */}
        <div 
          className={filterItemClass}
          onClick={() => onSortChange('listing')}
        >
          <span className={getSortTextStyle('listing')}>上架时间</span>
          {getSortIcon('listing')}
        </div>
      </div>

      {/* Category Dropdown - Overlaying content */}
      {isCategoryOpen && (
        <>
          {/* Dropdown Content */}
          <div className="absolute top-full left-0 right-0 bg-white z-50 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl rounded-b-xl border-t border-gray-100">
             <div className="p-4 grid grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto overscroll-contain no-scrollbar pb-6">
                <button
                  className={`py-2.5 px-2 rounded text-xs font-medium truncate transition-colors ${selectedCategory === null ? 'text-amber-600 ring-1 ring-amber-600 bg-amber-50' : 'bg-gray-100 text-gray-600 hover:bg-amber-50'}`}
                  onClick={() => {
                    onCategorySelect(null);
                    setIsCategoryOpen(false);
                  }}
                >
                  全部
                </button>
                {CATEGORY_LIST.map((category, idx) => (
                  <button
                    key={`${category}-${idx}`}
                    className={`py-2.5 px-2 rounded text-xs font-medium truncate transition-colors ${selectedCategory === category ? 'text-amber-600 ring-1 ring-amber-600 bg-amber-50' : 'bg-gray-100 text-gray-600 hover:bg-amber-50'}`}
                    onClick={() => {
                      onCategorySelect(category);
                      setIsCategoryOpen(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
             </div>
          </div>
          
          {/* Backdrop */}
          <div 
              className="fixed inset-0 bg-black/40 z-[-1] backdrop-blur-[1px]"
              style={{ top: 'unset', height: '100vh' }} 
              onClick={() => setIsCategoryOpen(false)}
          />
        </>
      )}
    </div>
  );
};