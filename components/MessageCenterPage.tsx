import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, Archive, ChevronRight, Store, ShoppingBag, RotateCcw } from 'lucide-react';

interface MessageCenterPageProps {
  onBack: () => void;
}

export const MessageCenterPage: React.FC<MessageCenterPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'approval' | 'todo'>('approval');
  const [activeFilter, setActiveFilter] = useState('收件审批');

  const filters = [
    { label: '收件审批', count: 1 },
    { label: '收件退货审批', count: 1 },
    { label: '结算审批', count: 1 },
    { label: '开票审批', count: 0 },
    { label: '销售审批', count: 1 },
    { label: '销售退货审批', count: 1 },
  ];

  // Mock data including Sales Return Approval
  const items = [
    {
      id: 'SJ202512040023',
      type: '收件审批',
      icon: <Archive className="w-5 h-5 text-white" />,
      iconBg: 'bg-blue-500',
      title: '收件-SJ202512040023',
      time: '2025-12-04 14:26:57',
      shop: '吉嘉名品汇(嘉定店)',
      details: [
          { label: '收件专员', value: '李明' },
          { label: '出售会员', value: '张张(17388079496)' }
      ],
      images: [
        'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1617317376997-8748e6862c01?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200&auto=format&fit=crop'
      ],
      count: 3,
      amount: 988800.00,
      status: 'pending'
    },
    {
      id: 'SO20260109001',
      type: '销售审批',
      icon: <ShoppingBag className="w-5 h-5 text-white" />,
      iconBg: 'bg-orange-500',
      title: '销售-SO20260109001',
      time: '2026-01-09 10:30:00',
      shop: '吉嘉名品汇(嘉定店)',
      details: [
          { label: '销售人员', value: '尾号0929' },
          { label: '购买会员', value: '王先生(13800138000)' }
      ],
      images: [
         'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=200&auto=format&fit=crop'
      ],
      count: 1,
      amount: 275000.00,
      status: 'pending'
    },
    {
      id: 'SR20260109005',
      type: '销售退货审批',
      icon: <RotateCcw className="w-5 h-5 text-white" />,
      iconBg: 'bg-pink-500',
      title: '退货-SR20260109005',
      time: '2026-01-09 11:15:22',
      shop: '吉嘉名品汇(嘉定店)',
      details: [
          { label: '原销售单', value: 'SO20260108001' },
          { label: '处理人员', value: '李四' },
          { label: '退货原因', value: '尺码不合/不喜欢' }
      ],
      images: [
         'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200&auto=format&fit=crop'
      ],
      count: 1,
      amount: 2138.00,
      status: 'pending'
    }
  ];

  const filteredItems = items.filter(item => item.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#f5f7fa] sticky top-0 z-50">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-black/5 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-[17px] font-medium text-gray-900 flex-1 text-center">消息中心</h1>
        
        <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm ml-auto">
          <button className="p-1">
            <MoreHorizontal className="w-4 h-4 text-gray-800" />
          </button>
          <div className="w-[1px] h-3 bg-gray-300 mx-1"></div>
          <button className="p-1">
            <Disc className="w-4 h-4 text-gray-800" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex px-4 pt-2 mb-4 bg-[#f5f7fa]">
          <button 
            onClick={() => setActiveTab('approval')}
            className={`mr-8 relative pb-2 text-[17px] font-bold ${activeTab === 'approval' ? 'text-blue-600' : 'text-gray-400'}`}
          >
              审批
              <div className="absolute top-0 -right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              {activeTab === 'approval' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('todo')}
            className={`relative pb-2 text-[17px] font-bold ${activeTab === 'todo' ? 'text-blue-600' : 'text-gray-400'}`}
          >
              待办
              <div className="absolute top-0 -right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              {activeTab === 'todo' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full"></div>}
          </button>
      </div>

      {/* Filter Chips */}
      <div className="px-4 mb-4 mt-4 flex flex-wrap items-center gap-3">
          {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.label)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-medium relative transition-colors ${
                    activeFilter === filter.label 
                    ? 'bg-white text-[#ff5e5e] border border-[#ff5e5e] shadow-sm' 
                    : 'bg-[#eef0f4] text-gray-500 border border-transparent'
                }`}
              >
                  {filter.label}
                  {filter.count > 0 && (
                      <div className="absolute -top-1.5 -right-1.5 bg-[#ff5e5e] text-white text-[10px] min-w-[16px] h-4 rounded-full flex items-center justify-center px-1 border border-white">
                          {filter.count}
                      </div>
                  )}
              </button>
          ))}
      </div>

      {/* Content List */}
      <div className="flex-1 px-4 pb-8 overflow-y-auto no-scrollbar space-y-3">
          {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {/* Item Header */}
                  <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center`}>
                              {item.icon}
                          </div>
                          <div>
                              <div className="flex items-center gap-2">
                                  <span className="text-[15px] font-bold text-gray-900">{item.title}</span>
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5 font-mono">{item.time}</div>
                          </div>
                      </div>
                      <button className="flex items-center text-xs text-[#a66a3d]">
                          查看详情 <ChevronRight className="w-3 h-3" />
                      </button>
                  </div>

                  {/* Shop Info */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3 px-1">
                      <Store className="w-3.5 h-3.5" />
                      <span>{item.shop}</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1 mb-4 px-1">
                      {item.details.map((detail, idx) => (
                          <div key={idx} className="flex text-[13px]">
                              <span className="text-gray-500 w-20 flex-shrink-0">{detail.label}：</span>
                              <span className="text-gray-900">{detail.value}</span>
                          </div>
                      ))}
                  </div>

                  {/* Images */}
                  <div className="flex gap-2 mb-4 overflow-hidden">
                      {item.images.map((img, idx) => (
                          <div key={idx} className="w-20 h-20 rounded-lg bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                              <img src={img} className="w-full h-full object-cover" />
                          </div>
                      ))}
                  </div>

                  {/* Summary */}
                  <div className="flex justify-end items-baseline gap-2 mb-4">
                      <span className="text-xs text-gray-500">共{item.count}件</span>
                      <span className="text-xs text-gray-500">
                        {item.type.includes('退货') ? '应退金额' : item.type.includes('销售') ? '销售总金额' : '期望总金额'}
                        (¥)
                      </span>
                      <span className="text-[17px] font-bold text-gray-900 font-mono">
                          {item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                      <button className="flex-1 bg-[#f5f7fa] text-gray-600 font-bold py-2.5 rounded-lg text-sm active:bg-gray-200">
                          驳回
                      </button>
                      <button className="flex-1 bg-[#1a1c29] text-white font-bold py-2.5 rounded-lg text-sm active:opacity-90">
                          同意
                      </button>
                  </div>
              </div>
          ))}

          {filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center pt-20 text-gray-400">
                  <p className="text-sm">暂无待处理审批</p>
              </div>
          )}
      </div>
    </div>
  );
};