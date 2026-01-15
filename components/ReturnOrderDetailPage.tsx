import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, FileText, CheckCircle2, Clock, XCircle, AlertCircle, Wallet, CreditCard, Check, PackageCheck, User, Phone, Copy, Info } from 'lucide-react';
import { ReturnOrder, ReturnOrderStatus } from '../types';

interface ReturnOrderDetailPageProps {
  returnOrder: ReturnOrder;
  onBack: () => void;
  onAuditPass: () => void;
  onAuditReject: () => void;
  onRefund?: (method: 'online' | 'offline', restock: boolean) => void;
  onComplete?: (restock: boolean) => void;
  onResubmit?: () => void;
  onGoToSettlement?: () => void;
}

export const ReturnOrderDetailPage: React.FC<ReturnOrderDetailPageProps> = ({
  returnOrder,
  onBack,
  onAuditPass,
  onAuditReject,
  onRefund,
  onComplete,
  onResubmit,
  onGoToSettlement
}) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  
  // Status Stepper Logic
  const steps: { key: ReturnOrderStatus, label: string }[] = [
    { key: 'pending_audit', label: '退货审核' },
    { key: 'pending_refund', label: '退款处理' },
    { key: 'completed', label: '退货完成' },
  ];

  const getCurrentStepIndex = (status: ReturnOrderStatus) => {
    if (status === 'audit_rejected') return 0; // Stays at step 0 but shows rejected UI
    const idx = steps.findIndex(s => s.key === status);
    return idx === -1 ? 2 : idx;
  };

  const currentStepIndex = getCurrentStepIndex(returnOrder.status);
  const isRejected = returnOrder.status === 'audit_rejected';

  const needsRefund = returnOrder.originalPaidAmount > 0;

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col relative pb-32">
       {/* Standard White Header */}
       <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 border-b border-gray-100 relative">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 absolute left-0 right-0 text-center pointer-events-none">销售退货详情</h1>
        
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

      <div className="px-3 py-3 space-y-3 flex-1 overflow-y-auto">
        
        {/* 1. Progress Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 relative overflow-hidden">
            <div className="relative px-4">
                {/* Background Line */}
                <div className="absolute top-3 left-4 right-4 h-0.5 bg-gray-100 -z-0"></div>
                {/* Active Line */}
                <div 
                    className={`absolute top-3 left-4 h-0.5 -z-0 transition-all duration-500 ${isRejected ? 'bg-red-500' : 'bg-[#00b578]'}`} 
                    style={{ width: `calc(${(currentStepIndex / (steps.length - 1)) * 100}% - 32px)` }}
                ></div>

                <div className="flex items-center justify-between relative">
                    {steps.map((step, idx) => {
                        const isCompleted = idx <= currentStepIndex;
                        const isCurrent = idx === currentStepIndex;
                        
                        return (
                            <div key={idx} className="flex flex-col items-center relative z-10 w-16">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                                    isCompleted 
                                        ? (isRejected && idx === 0 ? 'bg-red-500 border-red-500' : 'bg-[#00b578] border-[#00b578]') 
                                        : 'bg-white border-gray-200'
                                }`}>
                                    {isCompleted ? (
                                        isRejected && idx === 0 ? <XCircle className="w-4 h-4 text-white" /> : <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                                    ) : (
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                                    )}
                                </div>
                                <span className={`text-[11px] mt-2 font-medium ${isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* Status Alert */}
        {isRejected && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-sm font-bold text-red-700 mb-1">审核驳回</h3>
                    <p className="text-xs text-red-500 leading-relaxed">退货申请未通过。您可以修改申请后重新提交。</p>
                </div>
            </div>
        )}

        {/* 2. Customer Info Card (Added) */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border border-gray-100">
                {returnOrder.member.avatar ? (
                    <img src={returnOrder.member.avatar} alt={returnOrder.member.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                    </div>
                )}
             </div>
             <div>
                  <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900 text-base leading-tight">{returnOrder.member.name}</span>
                      <div className={`text-[10px] px-1.5 py-0.5 rounded border ${
                          returnOrder.member.isVerified 
                              ? 'bg-green-50 text-green-600 border-green-100' 
                              : 'bg-orange-50 text-orange-400 border-orange-100'
                      }`}>
                          {returnOrder.member.isVerified ? '已实名' : '待实名'}
                      </div>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                      <Phone className="w-3.5 h-3.5 mr-1.5" />
                      {returnOrder.member.phone}
                  </div>
             </div>
        </div>

        {/* 3. Product List */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-bold text-gray-500">退货商品</span>
            </div>
            {returnOrder.items.map((item, idx) => (
                <div key={idx} className="flex p-3 border-b border-gray-50 last:border-0">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        <img src={item.imageUrl} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="ml-3 flex-1 flex flex-col justify-center">
                        <div className="text-sm text-gray-900 leading-snug line-clamp-2 font-medium">
                            <span className="inline-block bg-black text-white text-[10px] px-1 rounded-[2px] mr-1 align-middle">{item.condition}</span>
                            <span className="align-middle">{item.title}</span>
                        </div>
                        {/* Unique Code Display */}
                        <div className="text-[10px] text-gray-400 mt-0.5 font-mono">
                           唯一码：{item.uniqueCode || item.id}
                        </div>
                        <div className="mt-1 text-[#ff5e5e] font-bold font-mono text-sm">
                            ¥{item.price.toLocaleString()}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* 4. Statistics Card (Summary) */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-medium">商品总数</span>
                <span className="text-sm text-gray-900 font-bold">{returnOrder.items.length}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-medium">订单金额</span>
                <span className="text-sm text-gray-900 font-bold font-mono">¥{returnOrder.originalPaidAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-medium">退款金额</span>
                <span className="text-sm text-gray-900 font-bold font-mono">¥{returnOrder.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
        </div>

        {/* 5. Basic Info (Meta Info) */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
             <div className="flex justify-between items-center text-xs">
                 <span className="text-gray-500">退货单号</span>
                 <span className="text-gray-900 font-mono font-medium">{returnOrder.id}</span>
             </div>
             <div className="flex justify-between items-center text-xs">
                 <span className="text-gray-500">原销售单</span>
                 <span className="text-gray-900 font-mono font-medium">{returnOrder.originalOrderId}</span>
             </div>
             <div className="flex justify-between items-center text-xs">
                 <span className="text-gray-500">申请时间</span>
                 <span className="text-gray-900 font-mono font-medium">{returnOrder.createTime}</span>
             </div>
             <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-50">
                 <span className="text-gray-500">原单支付方式</span>
                 <span className="text-gray-900 font-bold">
                     {returnOrder.originalPaymentMethod === 'online' ? '线上支付' : returnOrder.originalPaymentMethod === 'offline' ? '线下支付' : '未支付'}
                 </span>
             </div>
        </div>

        {/* Refund Info Section - Only Show when in Refund Step */}
        {returnOrder.status === 'pending_refund' && (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">退款处理</h3>
                    {!needsRefund && <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded font-medium">无需退款</span>}
                </div>
                
                <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-gray-500">应退金额</span>
                    <span className="text-2xl font-bold text-[#ff5e5e] font-mono">
                        <span className="text-sm mr-1">¥</span>
                        {needsRefund ? returnOrder.originalPaidAmount.toLocaleString() : '0.00'}
                    </span>
                </div>

                {!needsRefund ? (
                    <div className="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg leading-relaxed">
                        原订单未收款或金额为0，无需进行资金退还操作。点击下方按钮直接完成退货单。
                    </div>
                ) : (
                    <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-2 mb-2">
                        <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-blue-600 leading-relaxed">
                            请前往退款结算界面，选择线上原路退回或线下打款方式完成资金退付。
                        </div>
                    </div>
                )}
            </div>
        )}

      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 max-w-md mx-auto z-50 pb-8">
          {returnOrder.status === 'pending_audit' && (
              <div className="flex gap-3">
                  <button 
                    onClick={() => setShowRejectModal(true)}
                    className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl text-sm active:bg-gray-50"
                  >
                      驳回申请
                  </button>
                  <button 
                    onClick={onAuditPass}
                    className="flex-1 py-3 bg-[#111] text-white font-bold rounded-xl text-sm active:opacity-90 shadow-lg"
                  >
                      审核通过
                  </button>
              </div>
          )}

          {returnOrder.status === 'audit_rejected' && (
               <button 
                  onClick={onResubmit} 
                  className="w-full py-3 bg-[#111] text-white font-bold rounded-xl text-sm active:opacity-90 shadow-lg"
                >
                    重新提交审核
                </button>
          )}

          {returnOrder.status === 'pending_refund' && (
               needsRefund ? (
                   <button 
                      onClick={onGoToSettlement}
                      className="w-full py-3 bg-[#1677ff] text-white font-bold rounded-xl text-sm active:opacity-90 shadow-lg flex items-center justify-center gap-2"
                    >
                        <CreditCard className="w-4 h-4" />
                        去退款结算
                    </button>
               ) : (
                   <button 
                      onClick={() => onComplete && onComplete(true)}
                      className="w-full py-3 bg-[#07c160] text-white font-bold rounded-xl text-sm active:opacity-90 shadow-lg"
                    >
                        确认完成退货
                    </button>
               )
          )}
          
          {returnOrder.status === 'completed' && (
               <button 
                  onClick={onBack}
                  className="w-full py-3 border border-gray-200 text-gray-700 font-bold rounded-xl text-sm active:bg-gray-50"
                >
                    返回列表
                </button>
          )}
      </div>

       {/* Reject Modal */}
       {showRejectModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setShowRejectModal(false)}></div>
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 relative animate-in zoom-in-95 duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">确认驳回?</h3>
                <textarea 
                    className="w-full bg-gray-50 border-transparent rounded-xl p-3 text-sm focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none resize-none mb-6"
                    rows={3}
                    placeholder="请输入驳回理由..."
                ></textarea>
                <div className="flex gap-3 w-full">
                    <button 
                        onClick={() => setShowRejectModal(false)}
                        className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl text-sm active:bg-gray-50"
                    >
                        取消
                    </button>
                    <button 
                        onClick={() => { onAuditReject(); setShowRejectModal(false); }}
                        className="flex-1 py-3 bg-[#ff5e5e] text-white font-bold rounded-xl text-sm active:opacity-90 shadow-lg shadow-red-100"
                    >
                        确认驳回
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};