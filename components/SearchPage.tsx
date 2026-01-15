import React, { useState } from 'react';
import { ChevronLeft, Search, Trash2, MoreHorizontal, Disc } from 'lucide-react';

interface SearchPageProps {
  onBack: () => void;
  onSearch: (query: string) => void;
  initialQuery: string;
  recentSearches: string[];
  onClearHistory: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ 
  onBack, 
  onSearch, 
  initialQuery,
  recentSearches,
  onClearHistory
}) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSearchClick = () => {
    if (query.trim()) {
      onSearch(query);
    } else {
      onSearch(''); // Allow clearing search
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Custom Gradient Header Area */}
      <div className="bg-gradient-to-b from-blue-100 to-white pb-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <ChevronLeft className="w-7 h-7 text-gray-800" strokeWidth={2} />
          </button>
          
          <h1 className="text-lg font-bold text-gray-900 tracking-wide">商品查询</h1>
          
          <div className="flex items-center space-x-1 bg-white/60 rounded-full px-2 py-1 border border-gray-200">
            <button className="p-1">
              <MoreHorizontal className="w-5 h-5 text-gray-800" />
            </button>
            <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
            <button className="p-1">
              <Disc className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Search Input Area */}
        <div className="flex items-center gap-3 px-4 mt-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="搜索 品牌/系列/型号"
              className="w-full bg-[#f0f0f0] text-gray-800 text-sm rounded-lg block pl-10 p-2.5 focus:outline-none focus:ring-1 focus:ring-blue-200"
              autoFocus
            />
          </div>
          <button 
            onClick={handleSearchClick}
            className="text-gray-900 font-medium text-sm px-1 active:opacity-60"
          >
            搜索
          </button>
        </div>
      </div>

      {/* Recent Searches */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-800">最近搜索</h2>
          {recentSearches.length > 0 && (
            <button onClick={onClearHistory} className="p-1 active:opacity-50">
               <Trash2 className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {recentSearches.length > 0 ? (
            recentSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => onSearch(term)}
                className="px-3 py-1.5 bg-[#f0f0f0] text-gray-600 text-xs rounded-md active:bg-gray-200 transition-colors max-w-full truncate"
              >
                {term}
              </button>
            ))
          ) : (
            <span className="text-xs text-gray-400">暂无搜索记录</span>
          )}
        </div>
      </div>
    </div>
  );
};