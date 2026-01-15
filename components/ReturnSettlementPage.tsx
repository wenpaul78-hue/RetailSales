import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, CheckCircle2, Circle, Wallet, CreditCard, Info, Plus } from 'lucide-react';
import { ReturnOrder } from '../types';

interface ReturnSettlementPageProps {
  returnOrder: ReturnOrder;
  onBack: () => void;
  onConfirmRefund: (method: 'online' | 'offline', restock: boolean) => void;
}

export const ReturnSettlementPage: React.FC<ReturnSettlementPageProps> = ({ 
  returnOrder, 
  onBack, 
  onConfirmRefund 
}) => {
  const [refundMethod, setRefundMethod] = useState<'online' | 'offline'>('online');
  const [voucher, setVoucher] = useState<string | null>(null);
  const [showRestockModal, setShowRestockModal] = useState(false);

  // Only allow online refund if original was online (simplified logic)
  const canRefundOnline = returnOrder.originalPaymentMethod === 'online';

  // If initial method is invalid (e.g. original was offline), force switch to offline
  React.useEffect(() => {
      if (!canRefundOnline && refundMethod === 'online') {
          setRefundMethod('offline');
      }
  }, [canRefundOnline, refundMethod]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVoucher(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePreConfirm = () => {
      // Logic for validation can be added here
      if (refundMethod === 'offline' && !voucher) {
          // alert("请上传凭证"); // In real app use toast
          // return;
      }
      setShowRestockModal(true);
  };

  const handleFinalConfirm = (restock: boolean) => {
      setShowRestockModal(false);
      onConfirmRefund(refundMethod, restock);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col relative pb-24">
       {/* Header */}
       <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 border-b border-gray-100 relative">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 absolute left-0 right-0 text-center pointer-events-none">销售退货结算</h1>
        
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

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Order Info */}
          <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4">基本信息</h2>
              <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">退货单号</span>
                      <span className="text-gray-900 font-mono">{returnOrder.id}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">原销售单</span>
                      <span className="text-gray-900 font-mono">{returnOrder.originalOrderId}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">退货会员</span>
                      <span className="text-gray-900">{returnOrder.member.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">退货商品数</span>
                      <span className="text-gray-900">{returnOrder.items.length}件</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-3 mt-1">
                      <span className="text-gray-500">应退金额</span>
                      <span className="text-[#ff5e5e] font-bold font-mono">¥{returnOrder.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
              </div>
          </div>

          {/* Refund Method Section */}
          <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4">退款方式</h2>
              
              <div className="space-y-4">
                  {/* Online Option */}
                  <div 
                    onClick={() => canRefundOnline && setRefundMethod('online')}
                    className={`flex items-center justify-between p-4 border rounded-xl transition-colors cursor-pointer ${
                        refundMethod === 'online' 
                        ? 'border-blue-500 bg-blue-50/50' 
                        : canRefundOnline ? 'border-gray-200 hover:bg-gray-50' : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                    }`}
                  >
                      <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${refundMethod === 'online' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                              <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                              <div className="text-sm font-bold text-gray-900">线上原路退回</div>
                              <div className="text-xs text-gray-400">资金原路退回至付款账户</div>
                          </div>
                      </div>
                      <div className="flex items-center">
                          {!canRefundOnline && <span className="text-[10px] text-orange-500 mr-2">原单不支持</span>}
                          {refundMethod === 'online' ? (
                              <CheckCircle2 className="w-5 h-5 text-blue-500" />
                          ) : (
                              <Circle className="w-5 h-5 text-gray-300" />
                          )}
                      </div>
                  </div>

                  {/* Offline Option */}
                  <div 
                    onClick={() => setRefundMethod('offline')}
                    className={`flex items-center justify-between p-4 border rounded-xl transition-colors cursor-pointer ${
                        refundMethod === 'offline' 
                        ? 'border-blue-500 bg-blue-50/50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                      <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${refundMethod === 'offline' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                              <Wallet className="w-5 h-5" />
                          </div>
                          <div>
                              <div className="text-sm font-bold text-gray-900">线下打款退回</div>
                              <div className="text-xs text-gray-400">手动转账给客户，需上传凭证</div>
                          </div>
                      </div>
                      <div>
                          {refundMethod === 'offline' ? (
                              <CheckCircle2 className="w-5 h-5 text-blue-500" />
                          ) : (
                              <Circle className="w-5 h-5 text-gray-300" />
                          )}
                      </div>
                  </div>
                  
                  {/* Offline Details (Merchant & Voucher) */}
                  {refundMethod === 'offline' && (
                      <div className="pt-4 border-t border-gray-50 animate-in fade-in slide-in-from-top-2">
                          <div className="space-y-4">
                              {/* Refund Merchant Row */}
                              <div className="flex justify-between items-center px-1">
                                  <span className="text-gray-500 text-sm">退款商户</span>
                                  <span className="text-gray-900 text-sm">宁伙伴供应商</span>
                              </div>

                              <div className="h-px bg-gray-50"></div>

                              {/* Upload Voucher Row */}
                              <div className="flex items-start justify-between px-1">
                                  <div className="flex items-center mt-2">
                                      <span className="text-[#ff5e5e] mr-1">*</span>
                                      <span className="text-gray-500 text-sm">上传凭证</span>
                                      <Info className="w-3.5 h-3.5 text-gray-400 ml-1" />
                                  </div>
                                  
                                  <div className="w-24 h-24 bg-[#f7f8fa] border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 relative overflow-hidden transition-colors group">
                                        {voucher ? (
                                        <img src={voucher} className="w-full h-full object-cover" />
                                        ) : (
                                        <>
                                            <Plus className="w-6 h-6 mb-1 text-gray-700 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                                            <span className="text-xs font-medium text-gray-600">Upload</span>
                                        </>
                                        )}
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 max-w-md mx-auto z-50">
        <button 
            onClick={handlePreConfirm}
            className="w-full bg-[#1a1a1a] text-white font-bold py-3.5 rounded-lg text-sm shadow-lg active:scale-95 transition-transform"
        >
            确认退款
        </button>
      </div>

      {/* Restock Modal */}
      {showRestockModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setShowRestockModal(false)}></div>
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 relative animate-in zoom-in-95 duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">退款成功</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed text-center">
                    资金已退还。<br/>
                    是否将退货商品重新上架到<span className="font-bold text-gray-800">在售列表</span>？
                </p>
                <div className="flex gap-3 w-full">
                    <button 
                        onClick={() => handleFinalConfirm(false)}
                        className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl text-sm active:bg-gray-50"
                    >
                        暂不上架
                    </button>
                    <button 
                        onClick={() => handleFinalConfirm(true)}
                        className="flex-1 py-3 bg-[#111] text-white font-bold rounded-xl text-sm active:opacity-90 shadow-lg"
                    >
                        确认上架
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};