import React, { useState, useMemo } from 'react';
import { ChevronLeft, MoreHorizontal, Search, Filter, FileText, ShoppingBag } from 'lucide-react';
import { RecycleOrder, Settlement } from '../types';

interface RecycleOrderListPageProps {
  onBack: () => void;
  recycleOrders: RecycleOrder[];
  salesOrders: Settlement[];
  onSalesOrderClick: (order: Settlement) => void;
}

type TabType = 'recycle' | 'sales';

export const RecycleOrderListPage: React.FC<RecycleOrderListPageProps> = ({ 
  onBack, 
  recycleOrders,
  salesOrders,
  onSalesOrderClick
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('recycle');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Logic
  const filteredRecycleOrders = useMemo(() => {
    return recycleOrders.filter(order => {
        const matchId = order.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchItem = order.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchId || matchItem;
    });
  }, [recycleOrders, searchQuery]);

  const filteredSalesOrders = useMemo(() => {
    return salesOrders.filter(order => {
        const matchId = order.salesOrderId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchItem = order.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchId || matchItem;
    });
  }, [salesOrders, searchQuery]);

  const getStatusBadge = (status: string) => {
      // Simplified status mapping for demo
      if (status === 'passed' || status === 'completed' || status === 'paid') {
          return <div className="bg-[#e8fbf3] text-[#00b578] text-[11px] font-bold px-2 py-0.5 rounded">通过</div>;
      }
      if (status === 'pending' || status === 'pending_audit' || status === 'pending_payment') {
          return <div className="bg-orange-50 text-orange-500 text-[11px] font-bold px-2 py-0.5 rounded">待处理</div>;
      }
      return <div className="bg-gray-100 text-gray-500 text-[11px] font-bold px-2 py-0.5 rounded">未知</div>;
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-[17px] font-medium text-gray-900 flex-1 text-center pr-2">自助开票</h1>
        
        <div className="flex items-center space-x-3">
          <button className="p-1 active:opacity-60">
            <MoreHorizontal className="w-6 h-6 text-gray-800" />
          </button>
          <button className="p-1 active:opacity-60">
            <div className="w-5 h-5 rounded-full border-2 border-gray-800 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
            </div>
          </button>
        </div>
      </header>

      {/* Tabs (Message Center Style) */}
      <div className="bg-white px-4 pt-2 pb-2 flex items-center">
          <button 
            onClick={() => setActiveTab('recycle')}
            className={`mr-8 relative pb-2 text-[17px] font-bold transition-colors ${activeTab === 'recycle' ? 'text-[#004e45]' : 'text-gray-400'}`}
          >
              收件开票
              {activeTab === 'recycle' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#004e45] rounded-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('sales')}
            className={`relative pb-2 text-[17px] font-bold transition-colors ${activeTab === 'sales' ? 'text-[#004e45]' : 'text-gray-400'}`}
          >
              销售开票
              {activeTab === 'sales' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#004e45] rounded-full"></div>}
          </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-t border-gray-50">
          <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索单号、商品标题"
                  className="w-full bg-[#f5f5f5] text-sm rounded-full py-2 pl-9 pr-4 focus:outline-none placeholder:text-gray-400 text-gray-800"
              />
          </div>
          <button className="flex items-center gap-1 text-gray-600 text-[13px] font-medium active:opacity-70">
              <Filter className="w-4 h-4" /> 筛选
          </button>
      </div>

      {/* List Content - Added pt-3 for spacing since summary card is gone */}
      <div className="flex-1 overflow-y-auto px-3 pt-3 space-y-3 pb-8">
          
          {/* Recycle Orders List */}
          {activeTab === 'recycle' && filteredRecycleOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent"></div>
                  <div className="p-4">
                      {/* Order Header */}
                      <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#8c6f5d]" />
                              <span className="text-[15px] font-bold text-gray-800">{order.id}</span>
                          </div>
                          {getStatusBadge(order.status)}
                      </div>

                      {/* User Info */}
                      <div className="text-[13px] text-gray-500 font-medium mb-3 pl-6">
                          {order.member.name}{order.member.phone}
                      </div>

                      {/* Product Info */}
                      {order.items.map((item, idx) => (
                          <div key={idx} className="bg-[#fafafa] rounded-lg p-3 mb-3 flex gap-3">
                              <div className="w-20 h-20 bg-white rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                                  <img src={item.imageUrl} className="w-full h-full object-contain" alt="" />
                              </div>
                              <div className="flex-1 flex flex-col justify-between py-0.5">
                                  <div>
                                      <div className="text-[14px] font-bold text-gray-900 mb-1">{item.title}</div>
                                      <div className="inline-block bg-[#f0f0f0] text-gray-500 text-[10px] px-1.5 py-0.5 rounded-sm">
                                          {item.category}
                                      </div>
                                  </div>
                                  <div className="flex justify-between items-end">
                                      <div className="flex flex-col">
                                          <span className="text-[11px] text-gray-400">期望价(¥)</span>
                                          <span className="text-[14px] font-medium text-gray-900">{item.expectedPrice?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                      </div>
                                      <div className="flex flex-col items-end">
                                          <span className="text-[11px] text-gray-400">结算价(¥)</span>
                                          <span className="text-[14px] font-medium text-gray-900">{item.settlementPrice?.toLocaleString()}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}

                      {/* Order Footer */}
                      <div className="flex justify-between items-center text-[12px] pt-1">
                          <div className="text-gray-500 font-medium">
                              数量：<span className="text-gray-900">{order.items.length}</span>
                          </div>
                          <div className="flex flex-col items-end">
                              <div className="flex items-center gap-1">
                                  <span className="text-gray-500">期望总金额(¥):</span>
                                  <span className="font-bold text-gray-900">{order.totalExpectedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-0.5">
                                  <span className="text-gray-500">结算总金额(¥):</span>
                                  <span className="font-bold text-gray-900">{order.totalSettlementAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          ))}

          {/* Sales Orders List */}
          {activeTab === 'sales' && filteredSalesOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden relative cursor-pointer active:scale-[0.98] transition-transform"
                onClick={() => onSalesOrderClick(order)}
              >
                  <div className="p-4">
                      {/* Order Header */}
                      <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4 text-orange-500" />
                              <span className="text-[15px] font-bold text-gray-800">{order.salesOrderId}</span>
                          </div>
                          {getStatusBadge(order.status)}
                      </div>

                      {/* User Info */}
                      <div className="text-[13px] text-gray-500 font-medium mb-3 pl-6">
                          {order.member.name}{order.member.phone}
                      </div>

                      {/* Product Info */}
                      {order.items.map((item, idx) => (
                          <div key={idx} className="bg-[#fafafa] rounded-lg p-3 mb-3 flex gap-3">
                              <div className="w-20 h-20 bg-white rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                                  <img src={item.imageUrl} className="w-full h-full object-contain" alt="" />
                              </div>
                              <div className="flex-1 flex flex-col justify-between py-0.5">
                                  <div>
                                      <div className="text-[14px] font-bold text-gray-900 mb-1">{item.title}</div>
                                      <div className="inline-block bg-[#f0f0f0] text-gray-500 text-[10px] px-1.5 py-0.5 rounded-sm">
                                          {item.category}
                                      </div>
                                  </div>
                                  <div className="flex justify-between items-end">
                                      <div className="flex flex-col">
                                          <span className="text-[11px] text-gray-400">公价(¥)</span>
                                          <span className="text-[14px] font-medium text-gray-900">{item.publicPrice?.toLocaleString() || '-'}</span>
                                      </div>
                                      <div className="flex flex-col items-end">
                                          <span className="text-[11px] text-gray-400">成交价(¥)</span>
                                          <span className="text-[14px] font-medium text-[#ff5e5e]">{item.price.toLocaleString()}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}

                      {/* Order Footer */}
                      <div className="flex justify-between items-center text-[12px] pt-1">
                          <div className="text-gray-500 font-medium">
                              数量：<span className="text-gray-900">{order.items.length}</span>
                          </div>
                          <div className="flex flex-col items-end">
                              <div className="flex items-center gap-1">
                                  <span className="text-gray-500">订单总金额(¥):</span>
                                  <span className="font-bold text-gray-900">{order.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-0.5">
                                  <span className="text-gray-500">实收总金额(¥):</span>
                                  <span className="font-bold text-gray-900">{(order.paidAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          ))}

          {/* Empty State */}
          {((activeTab === 'recycle' && filteredRecycleOrders.length === 0) || (activeTab === 'sales' && filteredSalesOrders.length === 0)) && (
              <div className="flex flex-col items-center justify-center pt-20 text-gray-400">
                  <FileText className="w-12 h-12 mb-2 opacity-20" />
                  <p className="text-xs">暂无相关订单</p>
              </div>
          )}
      </div>
    </div>
  );
};