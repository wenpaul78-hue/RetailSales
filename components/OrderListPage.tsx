import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, Filter, ChevronRight, X, SlidersHorizontal, MoreHorizontal, Disc, Check, ChevronDown, PenTool, CreditCard } from 'lucide-react';
import { Settlement, Employee, OrderStatus } from '../types';

interface OrderListPageProps {
  onBack: () => void;
  orders: Settlement[];
  onPayClick: (order: Settlement) => void;
  onCancelClick: (orderId: string) => void;
  onStatsClick: () => void;
  onSalesPersonFilterClick: () => void;
  selectedSalesPerson: Employee | null;
  onClearSalesPersonFilter?: () => void;
  onOrderClick: (order: Settlement) => void;
}

type OrderSortType = 'recent' | 'oldest' | 'price_high' | 'price_low';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSalesPerson: Employee | null;
  onSalesPersonClick: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ 
  isOpen, 
  onClose, 
  selectedSalesPerson,
  onSalesPersonClick 
}) => {
  const [dateRange, setDateRange] = useState<'today' | 'yesterday' | 'month' | 'lastMonth' | null>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('未退单');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null); // Mock state for customer selection

  const toggleAttribute = (attr: string) => {
    if (selectedAttribute.includes(attr)) {
      setSelectedAttribute(selectedAttribute.filter(a => a !== attr));
    } else {
      setSelectedAttribute([...selectedAttribute, attr]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={onClose}></div>
      
      {/* Drawer Content */}
      <div className="bg-white w-full rounded-t-2xl relative z-10 max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-[17px] font-bold text-gray-900">筛选条件</h3>
          <button onClick={onClose} className="p-1">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-6">
          
          {/* Sales Time */}
          <section>
            <h4 className="text-[15px] font-bold text-gray-900 mb-3">销售时间</h4>
            <div className="grid grid-cols-4 gap-3 mb-3">
               {['今天', '昨天', '本月', '上个月'].map((label, idx) => {
                 const key = ['today', 'yesterday', 'month', 'lastMonth'][idx] as any;
                 return (
                   <button
                    key={label}
                    onClick={() => setDateRange(key)}
                    className={`py-2 text-[13px] rounded-lg transition-colors ${
                      dateRange === key 
                        ? 'bg-[#004e45] text-white font-medium' 
                        : 'bg-[#f5f7fa] text-gray-600'
                    }`}
                   >
                     {label}
                   </button>
                 );
               })}
            </div>
            <div className="flex items-center gap-3">
               <div className="flex-1 bg-[#f5f7fa] rounded-lg h-10 flex items-center px-3">
                  <input type="text" placeholder="开始时间" className="bg-transparent w-full text-xs text-center focus:outline-none placeholder:text-gray-400" />
               </div>
               <span className="text-gray-300">-</span>
               <div className="flex-1 bg-[#f5f7fa] rounded-lg h-10 flex items-center px-3">
                  <input type="text" placeholder="结束时间" className="bg-transparent w-full text-xs text-center focus:outline-none placeholder:text-gray-400" />
               </div>
            </div>
          </section>

          {/* Selectors Group */}
          <section className="space-y-4">
             {/* Sales Customer (Added below Sales Time) */}
             <div className="flex justify-between items-center" onClick={() => {/* Handle customer select */}}>
                <span className="text-[15px] font-bold text-gray-900">销售客户</span>
                <div className="flex items-center gap-1 text-gray-400">
                   <span className={`text-[13px] ${selectedCustomer ? 'text-gray-900' : ''}`}>
                     {selectedCustomer || '请选择销售客户'}
                   </span>
                   <ChevronRight className="w-4 h-4" />
                </div>
             </div>

             <div className="flex justify-between items-center" onClick={onSalesPersonClick}>
                <span className="text-[15px] font-bold text-gray-900">开单人员</span>
                <div className="flex items-center gap-1 text-gray-400">
                   <span className={`text-[13px] ${selectedSalesPerson ? 'text-gray-900' : ''}`}>
                     {selectedSalesPerson ? selectedSalesPerson.name : '请选择开单人员'}
                   </span>
                   <ChevronRight className="w-4 h-4" />
                </div>
             </div>

             <div className="flex justify-between items-center">
                <span className="text-[15px] font-bold text-gray-900">回收人员</span>
                <div className="flex items-center gap-1 text-gray-400">
                   <span className="text-[13px]">请选择回收人员</span>
                   <ChevronRight className="w-4 h-4" />
                </div>
             </div>
             {/* Removed 'Tag Remarks' as requested */}
          </section>

          {/* Attributes */}
          <section>
            <h4 className="text-[15px] font-bold text-gray-900 mb-3">属性</h4>
            <div className="grid grid-cols-3 gap-3">
              {['自有', '寄卖', '质押'].map(attr => (
                <button
                  key={attr}
                  onClick={() => toggleAttribute(attr)}
                  className={`py-2 text-[13px] rounded-lg transition-colors ${
                    selectedAttribute.includes(attr)
                      ? 'bg-[#004e45] text-white font-medium'
                      : 'bg-[#f5f7fa] text-gray-600'
                  }`}
                >
                  {attr}
                </button>
              ))}
            </div>
          </section>

          {/* Order Status */}
          <section>
            <h4 className="text-[15px] font-bold text-gray-900 mb-3">订单状态</h4>
            <div className="grid grid-cols-2 gap-3">
              {['未退单', '已退单'].map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`py-2 text-[13px] rounded-lg transition-colors ${
                    selectedStatus === status
                      ? 'bg-[#004e45] text-white font-medium'
                      : 'bg-[#f5f7fa] text-gray-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </section>

          {/* Removed Bottom 'Customer' Section (Recycle/Sales toggle) as requested */}

        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 flex gap-4 bg-white safe-area-bottom">
           <button 
             onClick={() => {
                setDateRange(null);
                setSelectedAttribute([]);
                setSelectedStatus('未退单');
                setSelectedCustomer(null);
             }}
             className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-3.5 rounded-lg text-[15px] active:bg-gray-50"
           >
             重置
           </button>
           <button 
             onClick={onClose}
             className="flex-1 bg-[#004e45] text-white font-bold py-3.5 rounded-lg text-[15px] active:opacity-90"
           >
             确定(1)
           </button>
        </div>
      </div>
    </div>
  );
};

export const OrderListPage: React.FC<OrderListPageProps> = ({ 
  onBack, 
  orders, 
  onPayClick,
  onCancelClick,
  onStatsClick,
  onSalesPersonFilterClick,
  selectedSalesPerson,
  onClearSalesPersonFilter,
  onOrderClick
}) => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyMe, setOnlyMe] = useState(false);
  const [sortBy, setSortBy] = useState<OrderSortType>('recent');
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  
  const [priceMode, setPriceMode] = useState<'transactionOnly' | 'all'>('transactionOnly');
  const [showPriceModal, setShowPriceModal] = useState(false);

  const categories = ['全部', '腕表', '箱包', '首饰', '配饰', '鞋靴', '服装'];

  const sortOptions: { label: string; value: OrderSortType }[] = [
    { label: '最近销售', value: 'recent' },
    { label: '最久销售', value: 'oldest' },
    { label: '价格最高', value: 'price_high' },
    { label: '价格最低', value: 'price_low' },
  ];

  const filteredOrders = orders
    .filter(order => {
      let match = true;
      if (searchQuery) {
           match = match && (
              order.salesOrderId.includes(searchQuery) ||
              order.items.some(item => item.title.includes(searchQuery))
           );
      }
      if (activeCategory !== '全部') {
          const hasCategory = order.items.some(item => item.category === activeCategory);
          if (!hasCategory) match = false;
      }
      if (selectedSalesPerson) {
          if (order.employeeId && order.employeeId !== selectedSalesPerson.id) {
              match = false;
          }
          if (!order.employeeId) match = false;
      }
      if (onlyMe) {
          if (order.employeeId !== '1') match = false;
      }
      return match;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
      if (sortBy === 'oldest') return new Date(a.createTime).getTime() - new Date(b.createTime).getTime();
      if (sortBy === 'price_high') return b.totalAmount - a.totalAmount;
      if (sortBy === 'price_low') return a.totalAmount - b.totalAmount;
      return 0;
    });

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.paidAmount || 0), 0);
  const orderCount = filteredOrders.length;

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || '最近销售';

  const getStatusBadge = (status: OrderStatus) => {
    switch(status) {
        case 'pending_audit':
            return <span className="text-[10px] bg-orange-50 text-orange-500 border border-orange-200 px-1.5 py-0.5 rounded">待审核</span>;
        case 'audit_rejected':
            return <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded">已驳回</span>;
        case 'pending_sign':
            return <span className="text-[10px] bg-blue-50 text-blue-500 border border-blue-200 px-1.5 py-0.5 rounded">待签约</span>;
        case 'pending_payment':
            return <span className="text-[10px] bg-red-50 text-[#ff5e5e] border border-red-200 px-1.5 py-0.5 rounded">待收款</span>;
        case 'paid':
        case 'completed':
            return <span className="text-[10px] bg-green-50 text-green-500 border border-green-200 px-1.5 py-0.5 rounded">已完成</span>;
        default:
            return null;
    }
  };

  const getActionButton = (order: Settlement) => {
      if (order.status === 'pending_sign') {
          return (
              <button 
                className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform shadow-sm"
                onClick={(e) => { e.stopPropagation(); onPayClick(order); }}
              >
                  <PenTool className="w-3 h-3" /> 去签约
              </button>
          );
      }
      if (order.status === 'pending_payment') {
          return (
              <button 
                className="bg-[#ff5e5e] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform shadow-red-100 shadow-md"
                onClick={(e) => { e.stopPropagation(); onPayClick(order); }}
              >
                  <CreditCard className="w-3 h-3" /> 去收款
              </button>
          );
      }
      return null;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col relative">
       {/* Dashboard Color Header Section */}
       <div className="bg-[#1a1c29] text-white pb-2 sticky top-0 z-40">
           {/* ... Header content ... */}
           <div className="flex items-center justify-between px-4 py-3">
               <button onClick={onBack} className="p-1 -ml-2 rounded-full hover:bg-white/10 transition-colors">
                 <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2} />
               </button>
               <h1 className="text-lg font-medium tracking-wide">销售订单管理</h1>
               <div className="flex items-center space-x-1 bg-black/20 rounded-full px-2 py-1 border border-white/10">
                  <button className="p-0.5"><MoreHorizontal className="w-4 h-4 text-white" /></button>
                  <div className="w-[1px] h-3 bg-white/20 mx-1"></div>
                  <button className="p-0.5">
                    <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </button>
               </div>
           </div>

           <div className="px-4 mt-2 mb-4">
               <div className="flex justify-between items-center text-xs text-white/70 mb-4">
                   <span>2026.1.09</span>
                   <div className="flex items-center gap-4">
                       <div className="flex items-center gap-2">
                           <span className="text-xs opacity-90">仅自己</span>
                           <button onClick={() => setOnlyMe(!onlyMe)} className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 flex items-center ${onlyMe ? 'bg-[#004e45]' : 'bg-gray-500/50'}`}>
                               <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${onlyMe ? 'translate-x-4' : 'translate-x-0'}`}></div>
                           </button>
                       </div>
                       <button className="flex items-center hover:text-white" onClick={onStatsClick}>
                           更多统计 <ChevronRight className="w-3 h-3 ml-0.5" />
                       </button>
                   </div>
               </div>
               <div className="flex items-center justify-around text-center mb-2">
                   <div>
                       <div className="text-xs text-white/70 mb-1">销售收入</div>
                       <div className="text-2xl font-semibold tracking-wider font-mono">¥{totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                   </div>
                   <div>
                       <div className="text-xs text-white/70 mb-1">订单数量</div>
                       <div className="text-2xl font-semibold tracking-wider font-mono">{orderCount}</div>
                   </div>
               </div>
           </div>
       </div>

       {/* Search Bar */}
       <div className="bg-white p-3 flex items-center gap-3">
           <div className="flex-1 relative">
               <input 
                   type="text" placeholder="请输入想要搜索的内容"
                   className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg py-2 px-4 focus:outline-none placeholder:text-gray-300"
                   value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
               />
           </div>
           <button className="text-gray-900 font-bold text-sm px-1">搜索</button>
       </div>

       {/* Category Tabs */}
       <div className="bg-white border-b border-gray-100">
           <div className="flex overflow-x-auto no-scrollbar px-2">
               {categories.map((cat) => (
                   <button
                       key={cat} onClick={() => setActiveCategory(cat)}
                       className={`flex-shrink-0 px-4 py-3 text-sm font-medium relative transition-colors ${activeCategory === cat ? 'text-[#004e45] font-bold' : 'text-gray-600'}`}
                   >
                       {cat}
                       {activeCategory === cat && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#004e45] rounded-full"></div>}
                   </button>
               ))}
           </div>
       </div>

       {/* Filter Bar */}
       <div className="bg-[#f9fafb] px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-gray-100">
           <button 
                onClick={() => setShowSortModal(true)}
                className="px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap bg-white text-[#004e45] border border-[#004e45]/20 shadow-sm flex items-center gap-1 active:bg-gray-50"
           >
               {currentSortLabel}
               <ChevronDown className="w-3 h-3" />
           </button>
           
           <div className="w-px h-4 bg-gray-200 mx-0.5 flex-shrink-0"></div>

           <button 
              className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap flex items-center gap-1 ${selectedSalesPerson ? 'bg-[#004e45]/10 text-[#004e45] border border-[#004e45]/20' : 'bg-[#eaeaea] text-gray-500'}`}
              onClick={selectedSalesPerson ? undefined : onSalesPersonFilterClick}
           >
               <span onClick={onSalesPersonFilterClick}>{selectedSalesPerson ? selectedSalesPerson.name : '销售人员'}</span>
               {selectedSalesPerson && <X className="w-3 h-3 ml-1" onClick={(e) => { e.stopPropagation(); onClearSalesPersonFilter && onClearSalesPersonFilter(); }} />}
           </button>

           <button 
              onClick={() => setShowPriceModal(true)}
              className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap flex items-center ${priceMode === 'all' ? 'bg-[#004e45]/10 text-[#004e45] border border-[#004e45]/20' : 'bg-[#eaeaea] text-gray-500'}`}
           >
              {priceMode === 'all' ? '全部价格' : '仅成交价'}
              <SlidersHorizontal className="w-3 h-3 ml-1" />
           </button>

           <button 
               onClick={() => setShowFilterDrawer(true)}
               className="px-3 py-1.5 bg-[#eaeaea] rounded text-xs text-gray-500 font-medium flex items-center whitespace-nowrap active:bg-gray-200"
           >
               筛选 <Filter className="w-3 h-3 ml-1" />
           </button>
       </div>

       {/* Order List Content */}
       <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-24">
           {filteredOrders.length > 0 ? (
               filteredOrders.map(order => (
                   <div key={order.id} className="bg-white rounded-lg p-3 shadow-sm mb-3 active:scale-[0.99] transition-transform" onClick={() => onOrderClick(order)}>
                       <div className="flex justify-between items-start mb-3">
                           <div className="flex items-center gap-2">
                               <span className="text-[10px] border border-gray-800 text-gray-800 px-1 py-0.5 rounded-sm">客户</span>
                               <span className="text-gray-900 text-xs font-bold">{order.member.name}</span>
                               {getStatusBadge(order.status)}
                           </div>
                           <div className="flex items-center gap-1.5">
                                <span className="text-xs text-gray-400 mr-1">{order.createTime.split(' ')[0]}</span>
                                <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden">
                                    <img src={selectedSalesPerson?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"} alt="" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xs text-gray-900 font-medium">{selectedSalesPerson?.name || "尾号0929"}</span>
                           </div>
                       </div>
                       {order.items.map((item, idx) => (
                           <div key={`${order.id}-item-${idx}`} className="flex p-3 border-b border-gray-50 last:border-0 -mx-3">
                               <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 ml-3">
                                   <img src={item.imageUrl} className="w-full h-full object-contain mix-blend-multiply" />
                               </div>
                               <div className="ml-3 flex-1 flex flex-col justify-between py-1 mr-3">
                                   <div className="text-sm text-gray-900 leading-snug line-clamp-2">
                                        <span className="bg-black text-white text-[10px] px-1 rounded-[2px] mr-1 inline-block align-middle">{item.condition}</span>
                                        <span className="align-middle">{item.title}</span>
                                   </div>
                                   {/* Unique Code Display */}
                                   <div className="text-[10px] text-gray-400 mt-0.5 font-mono">
                                       唯一码：{item.uniqueCode || item.id}
                                   </div>
                                   <div className="flex flex-col items-end mt-2">
                                       {priceMode === 'all' && (
                                           <div className="text-[10px] text-gray-400 mb-0.5 flex gap-2">
                                               <span>采购:¥{(item.procurementPrice || item.price * 0.7).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                               <span>成本:¥{(item.costPrice || item.price * 0.75).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                           </div>
                                       )}
                                       <div className="flex items-center justify-between w-full">
                                            <div></div> 
                                            <div className="flex items-center">
                                                <div className="text-[#ff5e5e] font-bold font-mono text-base">
                                                    <span className="text-xs mr-0.5">¥</span>
                                                    {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </div>
                                                <div className="text-gray-400 text-xs ml-2">x1</div>
                                            </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       ))}
                        <div className="flex justify-between items-center mt-3 pt-2">
                           <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">共{order.items.length}件商品</span>
                                {getActionButton(order)}
                           </div>
                           <div className="flex items-center">
                               <span className="text-xs text-gray-500 mr-2">实付:</span>
                               <span className="text-gray-900 font-bold font-mono">
                                   <span className="text-xs">¥</span>{order.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                               </span>
                           </div>
                       </div>
                   </div>
               ))
           ) : (
               <div className="flex flex-col items-center justify-center pt-20 text-gray-400">
                   <p className="text-xs">暂无相关订单</p>
               </div>
           )}
       </div>

       {/* Sorting Modal ... same as before ... */}
       {showSortModal && (
         <div className="fixed inset-0 z-[60] flex flex-col justify-end">
             <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={() => setShowSortModal(false)}></div>
             <div className="bg-white rounded-t-2xl p-4 w-full relative z-10 animate-in slide-in-from-bottom duration-200">
                 <div className="flex items-center justify-between mb-4 px-2 pt-2">
                     <h3 className="text-lg font-bold text-gray-900">排序方式</h3>
                     <button onClick={() => setShowSortModal(false)} className="p-1 rounded-full bg-gray-100"><X className="w-5 h-5 text-gray-500" /></button>
                 </div>
                 <div className="mb-6">
                    {sortOptions.map((opt) => (
                        <button 
                            key={opt.value}
                            onClick={() => { setSortBy(opt.value); setShowSortModal(false); }}
                            className={`w-full flex items-center justify-between py-4 px-2 border-b border-gray-50 last:border-0 transition-colors ${sortBy === opt.value ? 'text-[#004e45] font-bold' : 'text-gray-700 font-medium'}`}
                        >
                            <span>{opt.label}</span>
                            {sortBy === opt.value && <Check className="w-4 h-4" />}
                        </button>
                    ))}
                 </div>
                 <button onClick={() => setShowSortModal(false)} className="w-full bg-gray-50 text-gray-600 font-bold py-3.5 rounded-xl text-sm active:bg-gray-100">取消</button>
                 <div className="h-6"></div>
             </div>
         </div>
       )}

       {/* Price Mode Modal ... same as before ... */}
       {showPriceModal && (
         <div className="fixed inset-0 z-[60] flex flex-col justify-end">
             <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={() => setShowPriceModal(false)}></div>
             <div className="bg-white rounded-t-2xl p-4 w-full relative z-10 animate-in slide-in-from-bottom duration-200">
                 <div className="flex items-center justify-between mb-6 px-2 pt-2">
                     <div className="flex items-center gap-2">
                         <div className="bg-[#004e45] p-1 rounded"><SlidersHorizontal className="w-4 h-4 text-white" /></div>
                         <h3 className="text-lg font-bold text-gray-900">价格显示</h3>
                     </div>
                     <button onClick={() => setShowPriceModal(false)} className="p-1 rounded-full bg-gray-100"><X className="w-5 h-5 text-gray-500" /></button>
                 </div>
                 <div className="mb-6">
                     <button 
                        onClick={() => { setPriceMode('all'); setShowPriceModal(false); }}
                        className={`w-full flex items-center justify-between py-4 px-2 border-b border-gray-50 ${priceMode === 'all' ? 'text-[#004e45] font-bold' : 'text-gray-700 font-medium'}`}
                     >
                         <span>全部价格</span>
                         {priceMode === 'all' && <Check className="w-4 h-4" />}
                     </button>
                     <button 
                        onClick={() => { setPriceMode('transactionOnly'); setShowPriceModal(false); }}
                        className={`w-full flex items-center justify-between py-4 px-2 ${priceMode === 'transactionOnly' ? 'text-[#004e45] font-bold' : 'text-gray-700 font-medium'}`}
                     >
                         <span>仅成交价</span>
                         {priceMode === 'transactionOnly' && <Check className="w-4 h-4" />}
                     </button>
                 </div>
                 <button onClick={() => setShowPriceModal(false)} className="w-full bg-gray-50 text-gray-600 font-bold py-3.5 rounded-xl text-sm active:bg-gray-100">取消</button>
                 <div className="h-6"></div>
             </div>
         </div>
       )}

       {/* Filter Drawer */}
       <FilterDrawer 
         isOpen={showFilterDrawer}
         onClose={() => setShowFilterDrawer(false)}
         selectedSalesPerson={selectedSalesPerson}
         onSalesPersonClick={onSalesPersonFilterClick}
       />
    </div>
  );
};