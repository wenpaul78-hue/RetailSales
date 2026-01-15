import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, CheckCircle2, Circle, Plus, Info } from 'lucide-react';
import { Settlement } from '../types';

interface PaymentPageProps {
  settlement: Settlement;
  onBack: () => void;
  onChannelSelect: (channel: 'qrcode' | 'pos') => void;
  onOfflinePay: (amount: number) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ settlement, onBack, onChannelSelect, onOfflinePay }) => {
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'offline'>('offline');
  const [voucher, setVoucher] = useState<string | null>(null);

  const remainingAmount = Math.max(0, settlement.totalAmount - (settlement.paidAmount || 0));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVoucher(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleConfirmOffline = () => {
     onOfflinePay(remainingAmount);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col relative">
       {/* Header */}
       <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50">
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

      <div className="p-4 flex-1 overflow-y-auto pb-24">
        {/* Basic Information Section */}
        <h2 className="text-sm font-bold text-gray-900 mb-3 px-1">基本信息</h2>
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">会员名称</span>
                    <span className="text-gray-900 font-medium">{settlement.member.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">联系电话</span>
                    <span className="text-gray-900 font-medium">{settlement.member.phone}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">订单编号</span>
                    <span className="text-gray-900 font-medium">{settlement.salesOrderId}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">下单时间</span>
                    <span className="text-gray-900 font-medium">{settlement.createTime}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">待收金额(¥)</span>
                    <span className="text-[#ff5e5e] font-bold">{settlement.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
            </div>
        </div>

        {/* Payment Information Section */}
        <h2 className="text-sm font-bold text-gray-900 mb-3 px-1">收款信息</h2>
        <div className={`bg-white rounded-xl shadow-sm p-5 border border-blue-500 ring-1 ring-blue-500`}>
            <div className="space-y-5">
                {/* Payment Method */}
                <div className="flex items-center">
                    <span className="text-gray-500 text-sm w-24 flex-shrink-0"><span className="text-[#ff5e5e] mr-1">*</span>收款方式</span>
                    <div className="flex items-center gap-8">
                        {/* Hidden Online Option as requested */}
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                             <div className="w-5 h-5 rounded-full bg-[#1677ff] flex items-center justify-center">
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                             </div>
                            <span className="text-sm text-gray-900">线下</span>
                        </label>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="h-px bg-gray-50"></div>

                {/* Offline Flow Content */}
                <div className="flex items-center">
                      <span className="text-gray-500 text-sm w-24 flex-shrink-0 pl-3">收款商户</span>
                      <span className="text-gray-900 text-sm">吉嘉名品有限公司</span>
                </div>

                <div className="h-px bg-gray-50"></div>

                <div className="flex items-start">
                      <div className="w-24 flex-shrink-0 pt-2">
                        <div className="flex items-center">
                            <span className="text-[#ff5e5e] mr-1">*</span>
                            <span className="text-gray-500 text-sm">上传凭证</span>
                            <Info className="w-3.5 h-3.5 text-gray-400 ml-1" />
                        </div>
                      </div>
                      <div className="flex-1">
                          <div className="w-24 h-24 bg-[#f2f4f7] border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 relative overflow-hidden transition-colors">
                              {voucher ? (
                                <img src={voucher} className="w-full h-full object-cover" />
                              ) : (
                                <>
                                    <Plus className="w-6 h-6 mb-1 text-gray-600" strokeWidth={2.5} />
                                    <span className="text-xs font-medium">Upload</span>
                                </>
                              )}
                              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                          </div>
                          <div className="mt-2 text-xs text-gray-400 leading-tight">
                              单张最大5M，最多9张，支持JPEG/PNG/JPG格式
                          </div>
                      </div>
                </div>
            </div>
        </div>

      </div>
      
      {/* Footer Button for Offline */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 max-w-md mx-auto z-50">
        <button 
            onClick={handleConfirmOffline}
            className="w-full bg-[#1a1a1a] text-white font-bold py-3.5 rounded-lg text-sm shadow-lg active:scale-95 transition-transform"
        >
            确认收款
        </button>
      </div>
    </div>
  );
};