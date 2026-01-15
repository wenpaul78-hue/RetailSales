import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, FileText, Smartphone, Store, Plus, User, CheckCircle2, Phone, X, MoreHorizontal, Disc } from 'lucide-react';
import { Product, Member, InvoiceTitle, Merchant } from '../types';
import { MOCK_MERCHANTS } from '../constants';

interface CheckoutPageProps {
  onBack: () => void;
  items: Product[];
  selectedMember: Member | null;
  onSelectMemberClick: () => void;
  onClearMember?: () => void;
  selectedInvoice?: InvoiceTitle | null;
  onInvoiceClick?: () => void;
  onSubmitOrder: (method: 'online' | 'offline', merchant: Merchant) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ 
  onBack, 
  items,
  selectedMember,
  onSelectMemberClick,
  onClearMember,
  selectedInvoice,
  onInvoiceClick,
  onSubmitOrder
}) => {
  const [collectionMethod, setCollectionMethod] = useState<'online' | 'offline'>('online');
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [showMerchantDrawer, setShowMerchantDrawer] = useState(false);
  
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  // Auto-select merchant if only one exists
  useEffect(() => {
      if (MOCK_MERCHANTS.length === 1) {
          setSelectedMerchant(MOCK_MERCHANTS[0]);
      }
  }, []);

  const formatPhone = (phone: string) => {
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-24 flex flex-col">
       {/* Header */}
       <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 border-b border-gray-100 relative">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        
        <h1 className="text-lg font-bold text-gray-900 absolute left-0 right-0 text-center pointer-events-none">确认订单</h1>
        
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

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        {/* Member Info Selection (Updated Style) */}
        {selectedMember ? (
             <div 
                className="bg-white rounded-xl shadow-sm p-5 flex items-start relative cursor-pointer active:bg-gray-50 transition-colors border border-gray-100"
                onClick={onSelectMemberClick}
             >
                 {/* Avatar */}
                 <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100 mr-4">
                    {selectedMember.avatar ? (
                        <img src={selectedMember.avatar} alt={selectedMember.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-[#8c96a8] flex items-center justify-center">
                            <span className="text-white text-lg font-bold">{selectedMember.name.charAt(0)}</span>
                        </div>
                    )}
                 </div>
                 
                 {/* Content */}
                 <div className="flex-1 pt-1">
                      <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-bold text-gray-900 leading-none">{selectedMember.name}</span>
                              {selectedMember.gender === 'female' ? (
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
                              selectedMember.isVerified 
                                  ? 'bg-[#e8fbf3] text-[#00b578]' 
                                  : 'bg-orange-50 text-orange-500'
                          }`}>
                              {selectedMember.isVerified ? '已实名' : '待实名'}
                          </div>
                      </div>

                      <div className="flex items-center text-gray-900 font-medium text-sm leading-none tracking-wide">
                          <div className="w-4 h-4 rounded-full border border-gray-900 flex items-center justify-center mr-2 opacity-90">
                              <Phone className="w-2 h-2 text-gray-900" strokeWidth={2.5} />
                          </div>
                          {formatPhone(selectedMember.phone)}
                      </div>
                 </div>
            </div>
        ) : (
            <div 
                onClick={onSelectMemberClick}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 active:bg-gray-50 transition-colors cursor-pointer flex items-center min-h-[88px]"
            >
               <div className="flex items-center space-x-3 w-full justify-center text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-gray-400" strokeWidth={2} />
                  </div>
                  <span className="font-medium text-[15px]">添加会员信息</span>
               </div>
            </div>
        )}

        {/* Product List & Summary Combined */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4">
           <div className="mb-4">
              <span className="text-sm font-bold text-gray-500">商品清单</span>
           </div>
           <div>
              {items.map((item, idx) => (
                 <div key={`${item.id}-${idx}`} className="flex mb-4 last:mb-0">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                       <img src={item.imageUrl} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="ml-3 flex-1 flex flex-col justify-between py-0.5">
                       <div>
                           <div className="text-sm text-gray-900 leading-snug line-clamp-2 font-medium">
                              <span className="bg-black text-white text-[10px] px-1 rounded-[2px] mr-1 inline-block align-middle font-medium">{item.condition}</span>
                              <span className="align-middle">{item.title}</span>
                           </div>
                           <div className="text-[10px] text-gray-400 mt-0.5 font-mono">
                               唯一码：{item.uniqueCode || item.id}
                           </div>
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

           {/* Summary Section */}
           <div className="mt-4 pt-3 border-t border-gray-50 space-y-1.5">
                <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-medium">商品总数</span>
                    <span className="text-gray-900 font-medium">{items.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-medium">金额合计</span>
                    <span className="text-gray-900 font-medium font-mono">¥{formatPrice(totalPrice)}</span>
                </div>
           </div>
        </div>

        {/* Merchant Selection Option (Only shown if multiple merchants or not auto-selected) */}
        {MOCK_MERCHANTS.length > 1 && (
            <div 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setShowMerchantDrawer(true)}
            >
               <span className="text-sm font-medium text-gray-700">结算商户</span>
               <div className="flex items-center space-x-2 text-gray-500 max-w-[60%]">
                  <span className={`text-sm truncate ${selectedMerchant ? 'text-gray-900' : 'text-gray-400'}`}>
                      {selectedMerchant ? selectedMerchant.name : "请选择结算商户"}
                  </span>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
               </div>
            </div>
        )}

        {/* Invoice Option */}
        <div 
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer"
            onClick={onInvoiceClick}
        >
           <span className="text-sm font-medium text-gray-700">发票</span>
           <div className="flex items-center space-x-2 text-gray-500 max-w-[60%]">
              <span className="text-sm truncate">
                  {selectedInvoice ? selectedInvoice.title : "不开发票"}
              </span>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
           </div>
        </div>

      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 max-w-md mx-auto flex items-center justify-between z-50 pb-8">
         <div className="pl-2">
            <span className="text-sm text-gray-500 mr-1">订单总金额:</span>
            <span className="text-[#ff5e5e] font-bold text-xl font-mono">
               <span className="text-sm">¥</span>{formatPrice(totalPrice)}
            </span>
         </div>
         <button 
            onClick={() => selectedMember && selectedMerchant && onSubmitOrder(collectionMethod, selectedMerchant)}
            disabled={!selectedMember || !selectedMerchant}
            className={`font-bold px-8 py-3 rounded-full shadow-lg transition-all ${
                selectedMember && selectedMerchant
                    ? 'bg-[#ff5e5e] text-white shadow-red-100 active:scale-95' 
                    : 'bg-gray-300 text-white cursor-not-allowed shadow-gray-100'
            }`}
         >
            提交订单
         </button>
      </div>

      {/* Merchant Drawer */}
      {showMerchantDrawer && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={() => setShowMerchantDrawer(false)}></div>
            <div className="bg-white rounded-t-2xl p-4 w-full relative z-10 animate-in slide-in-from-bottom duration-200">
                 <div className="flex items-center justify-between mb-4 px-2 pt-2">
                     <h3 className="text-lg font-bold text-gray-900">选择结算商户</h3>
                     <button onClick={() => setShowMerchantDrawer(false)} className="p-1 rounded-full bg-gray-100"><X className="w-5 h-5 text-gray-500" /></button>
                 </div>
                 <div className="space-y-2 mb-6 max-h-[60vh] overflow-y-auto">
                    {MOCK_MERCHANTS.map(m => (
                        <button
                            key={m.id}
                            onClick={() => {
                                setSelectedMerchant(m);
                                setShowMerchantDrawer(false);
                            }}
                            className={`w-full text-left p-4 rounded-xl border transition-colors ${
                                selectedMerchant?.id === m.id 
                                ? 'border-[#ff5e5e] bg-red-50 text-[#ff5e5e]' 
                                : 'border-gray-100 bg-gray-50 text-gray-800'
                            }`}
                        >
                            <div className="font-medium text-sm">{m.name}</div>
                        </button>
                    ))}
                 </div>
            </div>
        </div>
      )}
    </div>
  );
};