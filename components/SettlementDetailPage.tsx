import React from 'react';
import { ChevronLeft, MoreHorizontal, Disc, Copy, User, Phone, FileText, Store } from 'lucide-react';
import { Settlement } from '../types';

interface SettlementDetailPageProps {
  settlement: Settlement;
  onBack: () => void;
  onPaymentClick: () => void;
}

export const SettlementDetailPage: React.FC<SettlementDetailPageProps> = ({ settlement, onBack, onPaymentClick }) => {
  const totalQuantity = settlement.items.length;
  const member = settlement.member;
  
  const paidAmount = settlement.paidAmount || 0;
  const remainingAmount = Math.max(0, settlement.totalAmount - paidAmount);
  const isPaidOff = remainingAmount <= 0;

  const formatPhone = (phone: string) => {
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 border-b border-gray-100">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">结算单详情</h1>
        
        <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm">
          <button className="p-1">
            <MoreHorizontal className="w-5 h-5 text-gray-800" />
          </button>
          <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
          <button className="p-1">
            <Disc className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </header>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        
        {/* 1. Member Info */}
        <div className="bg-white rounded-xl shadow-sm p-5 flex items-start relative border border-gray-100">
             {/* Avatar */}
             <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100 mr-4">
                {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-[#8c96a8] flex items-center justify-center">
                        <span className="text-white text-lg font-bold">{member.name.charAt(0)}</span>
                    </div>
                )}
             </div>
             
             {/* Content */}
             <div className="flex-1 pt-1">
                  <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-gray-900 leading-none">{member.name}</span>
                          {member.gender === 'female' ? (
                              <div className="w-4 h-4 rounded-full border border-pink-200 flex items-center justify-center bg-white">
                                  <span className="text-[10px] text-pink-400 font-bold leading-none transform translate-y-[0.5px]">♀</span>
                              </div>
                          ) : (
                              <div className="w-4 h-4 rounded-full border border-blue-200 flex items-center justify-center bg-white">
                                  <span className="text-[10px] text-blue-400 font-bold leading-none transform translate-y-[0.5px]">♂</span>
                              </div>
                          )}
                      </div>
                      
                      {/* Verified Badge */}
                      <div className={`px-2 py-1 rounded text-xs font-bold ${
                          member.isVerified 
                              ? 'bg-[#e8fbf3] text-[#00b578]' 
                              : 'bg-orange-50 text-orange-500'
                      }`}>
                          {member.isVerified ? '已实名' : '待实名'}
                      </div>
                  </div>

                  <div className="flex items-center text-gray-900 font-medium text-sm leading-none tracking-wide">
                      <div className="w-4 h-4 rounded-full border border-gray-900 flex items-center justify-center mr-2 opacity-90">
                          <Phone className="w-2 h-2 text-gray-900" strokeWidth={2.5} />
                      </div>
                      {formatPhone(member.phone)}
                  </div>
             </div>
        </div>

        {/* 2. Product List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4">
            <div className="mb-4">
                <span className="text-sm font-bold text-gray-500">商品清单</span>
            </div>
            <div>
                {settlement.items.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex mb-4 last:mb-0">
                        <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                            <img src={item.imageUrl} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="ml-3 flex-1 flex flex-col justify-between py-0.5">
                            <div className="text-sm text-gray-900 leading-snug line-clamp-2 font-medium">
                                <span className="bg-black text-white text-[10px] px-1 rounded-[2px] mr-1 inline-block align-middle font-medium">{item.condition}</span>
                                <span className="align-middle">{item.title}</span>
                            </div>

                            <div className="text-[10px] text-gray-400 mt-0.5 font-mono">
                                唯一码：{item.uniqueCode || item.id}
                            </div>

                            <div className="flex items-center justify-end mt-1">
                                <div className="text-[#ff5e5e] font-bold font-mono text-base">
                                    <span className="text-xs mr-0.5">¥</span>{formatPrice(item.price)}
                                </div>
                                <div className="text-gray-400 text-xs ml-1 font-medium">x1</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Summary Statistics Integrated in Product List Card */}
            <div className="mt-4 pt-3 border-t border-gray-50 space-y-1.5">
                <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-medium">商品总数</span>
                    <span className="text-gray-900 font-medium">{totalQuantity}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-medium">金额合计</span>
                    <span className="text-gray-900 font-medium font-mono">¥{formatPrice(settlement.totalAmount)}</span>
                </div>
            </div>
        </div>

        {/* 3. Settlement Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-3">
                <span className="text-sm font-bold text-gray-900">结算信息</span>
                <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">销售结算</span>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">结算单号</span>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-900 font-mono">{settlement.id}</span>
                        <Copy className="w-3 h-3 text-gray-400" />
                    </div>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">销售单号</span>
                     <div className="flex items-center gap-1">
                        <span className="text-gray-900 font-mono">{settlement.salesOrderId}</span>
                        <Copy className="w-3 h-3 text-gray-400" />
                    </div>
                </div>
                {/* Merchant Row */}
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">结算商户</span>
                    <div className="flex items-center gap-1">
                        <Store className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-900 font-medium">南京宁伙伴科技有限公司</span>
                    </div>
                </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">创建时间</span>
                    <span className="text-gray-900 font-mono">{settlement.createTime}</span>
                </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">结算商品数量</span>
                    <span className="text-gray-900 font-bold">{totalQuantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">应结算金额</span>
                    <span className="text-gray-900 font-mono font-bold">¥{formatPrice(settlement.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">已结算金额</span>
                    <span className="text-green-600 font-mono font-bold">¥{formatPrice(paidAmount)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-50">
                    <span className="text-gray-900 font-bold">{isPaidOff ? '已结清' : '待结算金额'}</span>
                    <span className={`${isPaidOff ? 'text-gray-400' : 'text-[#ff5e5e]'} font-bold font-mono`}>¥{formatPrice(remainingAmount)}</span>
                </div>
            </div>
        </div>
      </div>
      
      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 max-w-md mx-auto z-50">
        <button 
            onClick={onPaymentClick}
            disabled={isPaidOff}
            className={`w-full font-bold py-3 rounded-xl text-sm transition-transform ${isPaidOff ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-[#ff5e5e] text-white shadow-lg shadow-red-100 active:scale-95'}`}
        >
            {isPaidOff ? '已完成收款' : '收款'}
        </button>
      </div>
    </div>
  );
};