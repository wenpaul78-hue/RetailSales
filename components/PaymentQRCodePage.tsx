import React, { useState, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, CheckCircle2, Circle, ChevronRight, AlertCircle } from 'lucide-react';
import { Settlement } from '../types';

interface PaymentQRCodePageProps {
  settlement: Settlement;
  onBack: () => void;
  onChangeChannel: () => void;
  onShowQRCode: (amount: number, qrCodeName: string) => void;
}

export const PaymentQRCodePage: React.FC<PaymentQRCodePageProps> = ({ 
  settlement, 
  onBack, 
  onChangeChannel,
  onShowQRCode
}) => {
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'offline'>('online');
  const [qrCodeOption, setQrCodeOption] = useState('吉嘉名品-万科都荟');
  
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const remainingAmount = Math.max(0, settlement.totalAmount - (settlement.paidAmount || 0));

  const handleAutoFill = () => {
    setAmount(remainingAmount.toString());
  };
  
  const showToastMessage = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };
  
  const handleShowClick = () => {
      if (!amount.trim()) {
          showToastMessage('请填写收款金额');
          return;
      }

      const finalAmount = parseFloat(amount);
      if (isNaN(finalAmount) || finalAmount <= 0) {
          showToastMessage('请输入有效的收款金额');
          return;
      }
      
      if (finalAmount > remainingAmount + 0.01) { // Floating point tolerance
          showToastMessage('输入金额不能大于剩余待收金额');
          return;
      }

      onShowQRCode(finalAmount, qrCodeOption);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col pb-24 relative">
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

      <div className="p-4 flex-1 overflow-y-auto">
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
                    <span className="text-gray-500">剩余待收(¥)</span>
                    <span className="text-[#ff5e5e] font-bold">{remainingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
            </div>
        </div>

        {/* Payment Information Section */}
        <h2 className="text-sm font-bold text-gray-900 mb-3 px-1">收款信息</h2>
        <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="space-y-5">
                {/* Payment Method */}
                <div className="flex items-center">
                    <span className="text-gray-500 text-sm w-24 flex-shrink-0"><span className="text-[#ff5e5e] mr-1">*</span>收款方式</span>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setPaymentMethod('online')}>
                            {paymentMethod === 'online' ? (
                                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                     <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                            ) : (
                                <Circle className="w-5 h-5 text-gray-300" />
                            )}
                            <span className="text-sm text-gray-900">线上</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setPaymentMethod('offline')}>
                             {paymentMethod === 'offline' ? (
                                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                     <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                            ) : (
                                <Circle className="w-5 h-5 text-gray-300" />
                            )}
                            <span className="text-sm text-gray-900">线下</span>
                        </label>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="h-px bg-gray-50"></div>

                {/* Merchant */}
                <div className="flex items-center">
                     <span className="text-gray-500 text-sm w-24 flex-shrink-0 pl-3">收款商户</span>
                     <span className="text-gray-900 text-sm">吉嘉名品有限公司</span>
                </div>

                {/* Divider Line */}
                <div className="h-px bg-gray-50"></div>

                {/* Shop */}
                <div className="flex items-center justify-between">
                     <div className="flex items-center">
                        <span className="text-gray-500 text-sm w-24 flex-shrink-0"><span className="text-[#ff5e5e] mr-1">*</span>收款店铺</span>
                        <span className="text-gray-900 text-sm">吉嘉名品汇店</span>
                     </div>
                </div>

                 {/* Divider Line */}
                <div className="h-px bg-gray-50"></div>

                {/* Channel */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                         <span className="text-gray-500 text-sm w-24 flex-shrink-0"><span className="text-[#ff5e5e] mr-1">*</span>收款渠道</span>
                         <span className="text-gray-900 text-sm">面对面收款码收款</span>
                    </div>
                    <button onClick={onChangeChannel} className="text-blue-500 text-xs font-medium">更换收款渠道</button>
                </div>

                {/* Divider Line */}
                <div className="h-px bg-gray-50"></div>

                {/* QR Code Selection */}
                <div className="flex items-center justify-between relative">
                    <div className="flex items-center w-full">
                         <span className="text-gray-500 text-sm w-24 flex-shrink-0"><span className="text-[#ff5e5e] mr-1">*</span>收款码选择</span>
                         <div className="flex-1 relative">
                             <select 
                                className="w-full appearance-none bg-transparent text-gray-900 text-sm py-2 pr-8 focus:outline-none"
                                value={qrCodeOption}
                                onChange={(e) => setQrCodeOption(e.target.value)}
                             >
                                 <option value="吉嘉名品-万科都荟">吉嘉名品-万科都荟</option>
                                 <option value="吉嘉名品-万科都荟备用">吉嘉名品-万科都荟备用</option>
                             </select>
                             <ChevronRight className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                         </div>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="h-px bg-gray-50"></div>

                {/* Amount */}
                <div className="flex items-start">
                     <span className="text-gray-500 text-sm w-24 flex-shrink-0 pt-2"><span className="text-[#ff5e5e] mr-1">*</span>收款金额</span>
                     <div className="flex-1">
                        <input 
                            type="number" 
                            placeholder="请输入收款金额"
                            className="w-full text-sm py-2 focus:outline-none placeholder:text-gray-300 text-gray-900"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <div className="h-px bg-gray-200 my-1"></div>
                        <div className="flex items-center text-xs mt-1">
                             <span className="text-gray-900 mr-1">待收{remainingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })},</span>
                             <button onClick={handleAutoFill} className="text-blue-500">自动带入</button>
                        </div>
                     </div>
                </div>

                {/* Remark */}
                <div className="flex items-start">
                     <span className="text-gray-500 text-sm w-24 flex-shrink-0 pt-2 pl-3">收款备注</span>
                     <textarea 
                        placeholder="请输入收款备注"
                        rows={4}
                        className="flex-1 border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-gray-300 resize-none placeholder:text-gray-300"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                     />
                </div>

            </div>
        </div>

      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 max-w-md mx-auto z-50">
        <button 
            onClick={handleShowClick}
            className="w-full bg-[#1a1a1a] text-white font-bold py-3 rounded-lg text-sm shadow-lg active:scale-95 transition-transform"
        >
            展示收款码图片
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 text-white px-5 py-3 rounded-xl text-sm font-medium backdrop-blur-sm shadow-xl animate-in fade-in zoom-in-95 duration-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};