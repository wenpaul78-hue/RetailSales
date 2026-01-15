import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';

interface OrderStatsPageProps {
  onBack: () => void;
}

// Mock Data
const MOCK_STATS = {
  revenue: 275000.00,
  orderCount: 1,
  cost: 268000.00,
  grossProfit: 7000.00,
  grossMargin: '2.55%',
  salesAmount: 275000.00,
  salesCount: 1,
};

const MOCK_RANKING = [
  {
    id: 1,
    name: '尾号0929',
    role: '管理员',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
    orderCount: 1,
    salesAmount: 275000.00,
    profit: 7000.00,
    margin: '2.55%'
  }
];

const MOCK_CATEGORIES = [
  { name: '腕表', percentage: 100.00 },
  { name: '箱包', percentage: 0.00 },
  { name: '首饰', percentage: 0.00 },
  { name: '鞋靴', percentage: 0.00 },
  { name: '配饰', percentage: 0.00 },
  { name: '服装', percentage: 0.00 },
];

export const OrderStatsPage: React.FC<OrderStatsPageProps> = ({ onBack }) => {
  const [isShorthand, setIsShorthand] = useState(false);
  const [activeTab, setActiveTab] = useState('分类占比');
  const [trendFilter1, setTrendFilter1] = useState('全部订单');
  const [trendFilter2, setTrendFilter2] = useState('销售金额');
  const [rankTab, setRankTab] = useState('销售人员');
  const [otherStatsTab, setOtherStatsTab] = useState('商品分类');
  const [otherStatsSubTab, setOtherStatsSubTab] = useState('销售金额');

  // Helper to format price based on mode
  const formatPrice = (price: number) => {
    if (isShorthand) {
      return (price / 10000).toFixed(2) + 'W';
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Simple Donut Chart Component using SVG
  const DonutChart = ({ percentage, color = '#f97316' }: { percentage: number, color?: string }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="butt"
          />
        </svg>
        <div className="absolute text-[10px] font-bold text-gray-800 bottom-6 left-1/2 -translate-x-1/2">
             {percentage}%
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-10">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">订单数据统计</h1>
        <div className="w-8"></div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Month Selector & Toggle */}
        <div className="px-4 flex justify-between items-center mb-6">
            <div className="flex items-center text-sm font-bold text-gray-900">
                01月 <ChevronDown className="w-4 h-4 ml-1" />
            </div>
            <div className="flex bg-gray-100 rounded p-0.5">
                <button 
                  onClick={() => setIsShorthand(true)}
                  className={`px-3 py-1 text-xs rounded transition-all ${isShorthand ? 'bg-white text-gray-900 font-bold shadow-sm' : 'text-gray-500'}`}
                >缩写</button>
                <button 
                  onClick={() => setIsShorthand(false)}
                  className={`px-3 py-1 text-xs rounded transition-all ${!isShorthand ? 'bg-white text-gray-900 font-bold shadow-sm' : 'text-gray-500'}`}
                >详细</button>
            </div>
        </div>

        {/* Big Numbers Summary */}
        <div className="px-4 text-center mb-8">
            <div className="text-xs text-gray-500 mb-2">销售收入({MOCK_STATS.orderCount})</div>
            <div className="text-3xl font-bold text-gray-900 mb-8 font-mono">
                {!isShorthand && <span className="text-xl mr-1">¥</span>}
                {formatPrice(MOCK_STATS.revenue)}
            </div>

            <div className="grid grid-cols-1 gap-2 max-w-[200px] mx-auto">
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                    <div className="text-xs text-gray-400">销售金额</div>
                    <div className="text-sm font-bold text-gray-900 font-mono">
                      {isShorthand ? '' : '¥'}{formatPrice(MOCK_STATS.salesAmount)}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">销售单量</div>
                    <div className="text-sm font-bold text-gray-900 font-mono">{MOCK_STATS.salesCount}</div>
                </div>
            </div>
        </div>

        {/* Charts Section */}
        <div className="px-4 mb-8">
             <div className="flex justify-around mb-6">
                 {/* Chart 1: Revenue */}
                 <div className="flex flex-col items-center">
                     <DonutChart percentage={100} color="#f97316" />
                     <div className="mt-4 space-y-2 w-full min-w-[120px]">
                         <div className="flex items-center justify-between text-[10px]">
                             <div className="flex items-center text-gray-500">
                                 <div className="w-1.5 h-1.5 bg-orange-500 rounded-sm mr-1"></div>
                                 销售金额
                             </div>
                             <span className="text-gray-900 font-mono">
                               {isShorthand ? '' : '¥'}{formatPrice(MOCK_STATS.salesAmount)}
                             </span>
                         </div>
                     </div>
                 </div>

                 {/* Chart 2: Count */}
                 <div className="flex flex-col items-center">
                     <DonutChart percentage={100} color="#f97316" />
                     <div className="mt-4 space-y-2 w-full min-w-[120px]">
                         <div className="flex items-center justify-between text-[10px]">
                             <div className="flex items-center text-gray-500">
                                 <div className="w-1.5 h-1.5 bg-orange-400 rounded-sm mr-1"></div>
                                 销售单量
                             </div>
                             <span className="text-gray-900 font-mono">{MOCK_STATS.salesCount}</span>
                         </div>
                     </div>
                 </div>
             </div>
             
             {/* Sub Tabs */}
             <div className="flex justify-center gap-8 text-xs text-gray-400 border-b border-gray-100 pb-2">
                 <button className="">退货统计</button>
                 <button className="text-[#004e45] font-bold border-b-2 border-[#004e45] pb-2 -mb-2.5">分类占比</button>
                 <button className="">盈亏统计</button>
             </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-gray-50 mb-6"></div>

        {/* Data Trend */}
        <div className="px-4 mb-8">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-3.5 bg-[#004e45]"></div>
                <h3 className="font-bold text-gray-900">数据趋势</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
                 {['全部订单', '成交订单', '退货订单'].map(t => (
                     <button 
                        key={t}
                        onClick={() => setTrendFilter1(t)}
                        className={`text-xs px-3 py-1 rounded-full border ${trendFilter1 === t ? 'bg-[#004e45] text-white border-[#004e45]' : 'bg-white text-gray-500 border-gray-200'}`}
                     >
                         {t}
                     </button>
                 ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
                 {['销售金额', '订单数量', '毛利润'].map(t => (
                     <button 
                        key={t}
                        onClick={() => setTrendFilter2(t)}
                        className={`text-xs px-3 py-1 rounded-full border ${trendFilter2 === t ? 'bg-[#004e45] text-white border-[#004e45]' : 'bg-white text-gray-500 border-gray-200'}`}
                     >
                         {t}
                     </button>
                 ))}
            </div>

            <div className="h-40 flex items-end justify-between gap-1 px-2 relative mb-2">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-0.5 bg-gray-100 h-full rounded-t-sm relative group">
                         {i === 1 && (
                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 bg-[#004e45] h-32 rounded-t-sm"></div>
                         )}
                    </div>
                ))}
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 px-1">
                <span>1日</span>
                <span>6日</span>
                <span>11日</span>
                <span>16日</span>
                <span>21日</span>
                <span>26日</span>
                <span>31日</span>
            </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-gray-50 mb-6"></div>

        {/* Data Ranking */}
        <div className="px-4 mb-8">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-3.5 bg-[#004e45]"></div>
                <h3 className="font-bold text-gray-900">数据排名</h3>
            </div>
            
            <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                {['销售人员', '回收人员', '入库人员', '鉴定人员'].map(t => (
                    <button
                        key={t}
                        onClick={() => setRankTab(t)}
                        className={`flex-shrink-0 text-xs px-4 py-1.5 rounded-full border ${rankTab === t ? 'bg-[#004e45] text-white border-[#004e45]' : 'bg-white text-gray-500 border-gray-200'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Table Row */}
            {MOCK_RANKING.map(item => (
                <div key={item.id} className="grid grid-cols-4 items-center py-3 px-2 border-b border-gray-50 text-xs">
                    <div className="col-span-2 flex items-center gap-2">
                        <div className="relative">
                           <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                               <img src={item.avatar} className="w-full h-full object-cover" />
                           </div>
                           <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-400 text-white rounded-full flex items-center justify-center text-[8px] border border-white">1</div>
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">{item.name}</div>
                            <div className="text-[10px] text-gray-400">{item.role}</div>
                        </div>
                    </div>
                    <div className="text-center text-gray-900">{item.orderCount} 单</div>
                    <div className="text-right font-bold text-gray-900 font-mono">
                      {isShorthand ? '' : '¥'}{formatPrice(item.salesAmount)}
                    </div>
                </div>
            ))}
        </div>

        {/* Divider */}
        <div className="h-2 bg-gray-50 mb-6"></div>

        {/* Other Stats */}
        <div className="px-4 mb-8">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-3.5 bg-[#004e45]"></div>
                <h3 className="font-bold text-gray-900">其它统计</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                 {['商品分类', '商品品牌', '商品成色', '客户类型', '收款方式', '交付方式'].map(t => (
                     <button 
                        key={t}
                        onClick={() => setOtherStatsTab(t)}
                        className={`text-xs px-3 py-1.5 rounded-full border ${otherStatsTab === t ? 'bg-[#004e45] text-white border-[#004e45]' : 'bg-white text-gray-500 border-gray-200'}`}
                     >
                         {t}
                     </button>
                 ))}
            </div>

            <div className="flex gap-2 mb-6">
                 {['销售金额', '订单数量'].map(t => (
                     <button 
                        key={t}
                        onClick={() => setOtherStatsSubTab(t)}
                        className={`text-xs px-3 py-1 rounded-full border ${otherStatsSubTab === t ? 'bg-[#004e45] text-white border-[#004e45]' : 'bg-white text-gray-500 border-gray-200'}`}
                     >
                         {t}
                     </button>
                 ))}
            </div>

            {/* Progress Bars */}
            <div className="space-y-4">
                {MOCK_CATEGORIES.map(cat => (
                    <div key={cat.name}>
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-xs text-gray-900 font-medium">{cat.name}</span>
                            <span className="text-xs font-bold text-gray-900">{cat.percentage.toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div 
                                className="bg-[#004e45] h-full rounded-full transition-all duration-500" 
                                style={{ width: `${cat.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};