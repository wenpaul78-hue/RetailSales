import React from 'react';
import { ChevronLeft, MoreHorizontal, Disc, CheckCircle2, Circle, Download } from 'lucide-react';
import { Settlement } from '../types';

interface QRCodeDisplayPageProps {
  settlement: Settlement;
  amount: number;
  qrCodeName: string;
  onBack: () => void;
  onSuccess: () => void;
}

export const QRCodeDisplayPage: React.FC<QRCodeDisplayPageProps> = ({ 
  settlement, 
  amount,
  qrCodeName,
  onBack, 
  onSuccess 
}) => {
  // Use the first item for display or a summary
  const displayItem = settlement.items[0];
  const itemSummary = settlement.items.length > 1 ? ` 等${settlement.items.length}件商品` : '';
  const productName = `${displayItem.brand} ${displayItem.title} ${displayItem.condition}${itemSummary}`;

  // Use the name from props or fallback
  const displayTitle = qrCodeName || "宁伙伴-万科都荟收款";

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col pb-24 relative">
       {/* Header */}
       <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 border-b border-gray-100">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">结算单收款</h1>
        
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

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* 1. Basic Info Section */}
          <div>
              <h2 className="text-sm font-bold text-gray-900 mb-3 px-1">基本信息</h2>
              <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">会员名称</span>
                          <span className="text-gray-900 font-medium text-right">{settlement.member.name}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">联系电话</span>
                          <span className="text-gray-900 font-medium text-right">{settlement.member.phone}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">订单编号</span>
                          <span className="text-gray-900 font-medium text-right font-mono">{settlement.salesOrderId}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">下单时间</span>
                          <span className="text-gray-900 font-medium text-right font-mono">{settlement.createTime}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">待收金额(¥)</span>
                          <span className="text-[#ff5e5e] font-bold text-right font-mono">{amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* 2. Collection Info Section */}
          <div>
              <h2 className="text-sm font-bold text-gray-900 mb-3 px-1">收款信息</h2>
              <div className="bg-white rounded-xl shadow-sm p-5 border border-transparent">
                  <div className="space-y-4">
                      {/* Payment Method */}
                      <div className="flex items-center">
                          <span className="text-gray-500 text-sm w-24 flex-shrink-0"><span className="text-[#ff5e5e] mr-1">*</span>收款方式</span>
                          <div className="flex items-center gap-8">
                              <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-[#1677ff] flex items-center justify-center">
                                       <CheckCircle2 className="w-5 h-5 text-white" />
                                  </div>
                                  <span className="text-sm text-gray-900">线上</span>
                              </div>
                              <div className="flex items-center gap-2">
                                  <Circle className="w-5 h-5 text-gray-300" />
                                  <span className="text-sm text-gray-900">线下</span>
                              </div>
                          </div>
                      </div>

                      <div className="h-px bg-gray-50"></div>

                      <div className="flex items-center">
                          <span className="text-gray-500 text-sm w-24 flex-shrink-0 pl-3">收款商户</span>
                          <span className="text-gray-900 text-sm">吉嘉名品有限公司</span>
                      </div>

                      <div className="h-px bg-gray-50"></div>

                      <div className="flex items-center justify-between">
                          <div className="flex items-center">
                              <span className="text-gray-500 text-sm w-24 flex-shrink-0"><span className="text-[#ff5e5e] mr-1">*</span>收款店铺</span>
                              <span className="text-gray-900 text-sm">吉嘉名品汇店</span>
                          </div>
                          <span className="text-blue-500 text-xs font-medium">更换店铺</span>
                      </div>

                      <div className="h-px bg-gray-50"></div>

                      <div className="flex items-center justify-between">
                          <div className="flex items-center">
                               <span className="text-gray-500 text-sm w-24 flex-shrink-0"><span className="text-[#ff5e5e] mr-1">*</span>收款渠道</span>
                               <span className="text-gray-900 text-sm">面对面收款码收款</span>
                          </div>
                          <span className="text-blue-500 text-xs font-medium">更换收款渠道</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* 3. QR Code Card */}
          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden text-center pb-8 relative mt-6">
               {/* Blue Header */}
               <div 
                  className="bg-[#3b82f6] pt-8 pb-20 relative"
                  style={{ borderBottomLeftRadius: '50% 30px', borderBottomRightRadius: '50% 30px' }}
               >
                   <h3 className="text-white text-2xl font-medium mb-2 tracking-wide">扫码支付</h3>
                   <p className="text-white/90 text-sm">{displayTitle}</p>
               </div>

               {/* QR Image Container */}
               <div className="-mt-12 relative z-10 flex flex-col items-center">
                   <div className="w-48 h-48 bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-3">
                        <img 
                           src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=pay_${settlement.id}_${amount}`} 
                           alt="Payment QR Code" 
                           className="w-full h-full object-contain"
                        />
                   </div>
                   
                   <div className="text-gray-300 text-xs font-mono border-b border-dashed border-gray-200 pb-4 mb-4 w-3/4 mx-auto">
                       PC{settlement.id.replace(/[^0-9]/g, '')}
                   </div>

                   <div className="flex items-baseline justify-center mb-3 text-[#1a1a1a]">
                       <span className="text-lg font-medium mr-1">¥</span>
                       <span className="text-3xl font-medium font-sans">{amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                   </div>

                   <div className="px-10 text-xs text-gray-500 leading-relaxed line-clamp-2 mb-6 h-8">
                       {productName}
                   </div>

                   {/* Payment Icons */}
                   <div className="flex justify-center gap-12 mb-6">
                        {/* WeChat Pay Icon */}
                        <div className="w-12 h-12 bg-[#00c800] rounded-full flex items-center justify-center text-white shadow-sm">
                           <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M8.5,14c-4,0-7.2-2.7-7.2-6s3.2-6,7.2-6c3.8,0,6.9,2.4,7.2,5.5c2,0,3.8,1.3,3.8,3.2c0,1.1-0.6,2-1.5,2.6 c0.1,0.3,0.3,0.8,0.4,1.2c0,0-1.2,0.1-1.7-0.3c-0.6,0.3-1.4,0.5-2.1,0.5c-0.6,2-2.9,3.4-5.2,3.4H8.5z M6.4,6.7c-0.4,0-0.7,0.3-0.7,0.6 s0.3,0.6,0.7,0.6s0.7-0.3,0.7-0.6S6.8,6.7,6.4,6.7z M10.4,6.7c-0.4,0-0.7,0.3-0.7,0.6s0.3,0.6,0.7,0.6s0.7-0.3,0.7-0.6 S10.8,6.7,10.4,6.7z"/></svg>
                        </div>
                        {/* Alipay Icon */}
                        <div className="w-12 h-12 bg-[#1677ff] rounded-xl flex items-center justify-center text-white shadow-sm">
                           <span className="text-2xl font-bold">支</span>
                        </div>
                   </div>

                   <button className="flex items-center text-[#3b82f6] text-[13px] font-medium hover:opacity-80 transition-opacity">
                       <Download className="w-4 h-4 mr-1.5" />
                       <span>长按分享或保存收款码</span>
                   </button>
               </div>
          </div>
      </div>

      {/* Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 max-w-md mx-auto z-50">
        <button 
            onClick={onSuccess}
            className="w-full bg-[#1a1a1a] text-white font-bold py-3.5 rounded-lg text-sm shadow-lg active:scale-95 transition-transform"
        >
            收款结果更新
        </button>
      </div>
    </div>
  );
};
