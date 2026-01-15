import React, { useState, useMemo } from 'react';
import { ChevronLeft, MoreHorizontal, Disc } from 'lucide-react';
import { CATEGORY_LIST, BRAND_DATA, Brand } from '../constants';

interface BrandSelectionPageProps {
  onBack: () => void;
  onSelectBrand: (brand: string, category: string) => void;
}

export const BrandSelectionPage: React.FC<BrandSelectionPageProps> = ({ onBack, onSelectBrand }) => {
  const [activeCategory, setActiveCategory] = useState<string>('全部');

  // Group brands by initial
  const groupedBrands = useMemo(() => {
    let brands: Brand[] = [];

    if (activeCategory === '全部') {
        // Flatten and Deduplicate brands from all categories
        const allBrandsMap = new Map<string, Brand>();
        Object.values(BRAND_DATA).forEach(categoryBrands => {
            categoryBrands.forEach(brand => {
                if (!allBrandsMap.has(brand.name)) {
                    allBrandsMap.set(brand.name, brand);
                }
            });
        });
        brands = Array.from(allBrandsMap.values());
    } else {
        brands = BRAND_DATA[activeCategory] || [];
    }
    
    const groups: Record<string, Brand[]> = {};
    
    // Sort brands primarily to ensure A-Z order
    const sortedBrands = [...brands].sort((a, b) => a.initial.localeCompare(b.initial));

    sortedBrands.forEach(brand => {
      const initial = brand.initial.toUpperCase();
      if (!groups[initial]) {
        groups[initial] = [];
      }
      groups[initial].push(brand);
    });

    return groups;
  }, [activeCategory]);

  const initials = Object.keys(groupedBrands).sort();
  const allInitials = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');

  const scrollToSection = (initial: string) => {
    const element = document.getElementById(`section-${initial}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-blue-50 to-blue-50/20 sticky top-0 z-50 relative">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-black/5 transition-colors z-10"
        >
          <ChevronLeft className="w-7 h-7 text-gray-800" strokeWidth={2} />
        </button>
        
        <h1 className="text-lg font-bold text-gray-900 tracking-wide absolute left-0 right-0 text-center pointer-events-none">品牌列表</h1>
        
        <div className="flex items-center space-x-1 bg-white/60 rounded-full px-2 py-1 border border-gray-200 z-10">
          <button className="p-1">
            <MoreHorizontal className="w-5 h-5 text-gray-800" />
          </button>
          <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
          <button className="p-1">
            <Disc className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </header>

      {/* Body Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Categories */}
        <div className="w-[90px] bg-gray-50 overflow-y-auto no-scrollbar flex-shrink-0">
          {/* All Brands Option */}
          <button
            onClick={() => setActiveCategory('全部')}
            className={`w-full py-4 text-sm font-medium relative transition-colors ${
              activeCategory === '全部'
                ? 'bg-white text-gray-900 font-bold' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {/* Active Indicator Line */}
            {activeCategory === '全部' && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-900 rounded-r-full"></div>
            )}
            全部品牌
          </button>

          {CATEGORY_LIST.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`w-full py-4 text-sm font-medium relative transition-colors ${
                activeCategory === category 
                  ? 'bg-white text-gray-900 font-bold' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {/* Active Indicator Line */}
              {activeCategory === category && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-900 rounded-r-full"></div>
              )}
              {category}
            </button>
          ))}
        </div>

        {/* Right Main Content: Brands */}
        <div className="flex-1 relative bg-white">
          <div className="h-full overflow-y-auto p-4 scroll-smooth" id="brand-list-container">
             {/* Dynamic Brand List */}
             {initials.length > 0 ? initials.map(initial => (
               <div key={initial} id={`section-${initial}`} className="mb-4">
                 <div className="bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500 mb-2 rounded-sm sticky top-0">
                   {initial}
                 </div>
                 <div className="space-y-4">
                   {groupedBrands[initial].map((brand, idx) => (
                     <div 
                        key={`${brand.name}-${idx}`} 
                        className="flex items-center space-x-4 py-2 border-b border-gray-50 last:border-0 cursor-pointer active:opacity-60"
                        onClick={() => onSelectBrand(brand.name, activeCategory === '全部' ? '' : activeCategory)}
                     >
                       <div className="w-12 h-8 flex items-center justify-center bg-white border border-gray-100 rounded p-0.5">
                         {brand.logo ? (
                            <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
                         ) : (
                            <span className="text-[10px] text-gray-300">LOGO</span>
                         )}
                       </div>
                       <div className="flex-1">
                         <div className="text-sm font-medium text-gray-900">{brand.name}/{brand.cnName}</div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             )) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    暂无品牌数据
                </div>
             )}
             {/* Extra padding at bottom */}
             <div className="h-12"></div>
          </div>

          {/* Right Alphabet Index */}
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col items-center gap-[2px] z-10 bg-white/80 p-1 rounded-full shadow-sm backdrop-blur-[1px]">
             {allInitials.map(char => (
               <button
                 key={char}
                 onClick={() => scrollToSection(char)}
                 className={`text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                    initials.includes(char) ? 'text-gray-800 hover:bg-gray-200' : 'text-gray-300'
                 }`}
               >
                 {char}
               </button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};