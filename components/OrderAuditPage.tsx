import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, Phone, X, Smartphone, FileEdit, Clock, CheckCircle2, Shield, FileText, ChevronRight } from 'lucide-react';
import { Product, Member, InvoiceTitle, Merchant } from '../types';

interface OrderAuditPageProps {
  onBack: () => void;
  onReject: (reason: string) => void;
  onPass: () => void; // Standard pass
  onGotoOfflineSign: () => void; // New path to offline upload
  onSkipToSettlement: () => void; // New path to skip signing
  onVerifyMember?: () => void; // Trigger verification flow
  items: Product[];
  member: Member;
  invoice: InvoiceTitle | null;
  merchant: Merchant | null; // Added prop
  initialPassed?: boolean;
}

export const OrderAuditPage: React.FC<OrderAuditPageProps> = ({ 
  onBack, 
  onReject,
  onPass,
  onGotoOfflineSign,
  onSkipToSettlement,
  onVerifyMember,
  items,
  member,
  invoice,
  merchant,
  initialPassed = false
}) => {
  const [isApproved, setIsApproved] = useState(initialPassed);
  const [showSignOptions, setShowSignOptions] = useState(false);
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  
  // Reject Modal State
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handlePassClick = () => {
    setIsApproved(true);
    onPass();
  };

  const handleSignClick = () => {
      // Removed member.isVerified check as requested
      setShowSignOptions(true);
  };

  const handleConfirmReject = () => {
      if (!rejectReason.trim()) {
          // In real app, show toast
          alert('请填写驳回原因');
          return;
      }
      onReject(rejectReason);
      setShowRejectModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col pb-32">
       {/* Header - Changes title based on status */}
       <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 border-b border-gray-100">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">
            {isApproved ? '销售订单详情' : '销售订单审批'}
        </h1>
        
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

      <div className="px-3 py-3 space-y-3 flex-1 overflow-y-auto">
        
        {/* Status Badge */}
        {isApproved && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3 mb-2 animate-in fade-in slide-in-from-top-2">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-sm font-bold text-green-800">审批已通过</div>
                    <div className="text-xs text-green-600">请继续完成合同签署流程</div>
                </div>
            </div>
        )}

        {/* Member Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 flex items-start relative">
             <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100 mr-4">
                {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-[#8c96a8] flex items-center justify-center">
                        <span className="text-white text-lg font-bold">{member.name.charAt(0)}</span>
                    </div>
                )}
             </div>
             
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
                      {member.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
                  </div>
             </div>
        </div>

        {/* Product List Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4">
           <div className="mb-4">
               <span className="text-sm font-bold text-gray-500">商品清单</span>
           </div>
           {items.map((item, idx) => (
                <div key={`audit-item-${idx}`} className="flex mb-4 last:mb-0">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        <img src={item.imageUrl} className="w-full h-full object-contain mix-blend-multiply" />
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
                                 <span className="text-xs mr-0.5">¥</span>
                                 {formatPrice(item.price)}
                             </div>
                             <div className="text-gray-400 text-xs ml-1 font-medium">x1</div>
                        </div>
                    </div>
                </div>
            ))}
            
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

        <div className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm border border-gray-100">
            <span className="text-sm font-bold text-gray-900">结算商户</span>
            <span className="text-sm text-gray-900 font-medium">
                {merchant ? merchant.name : '未选择'}
            </span>
        </div>

        <div className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm border border-gray-100">
            <span className="text-sm font-bold text-gray-900">发票</span>
            <span className="text-sm text-gray-500 font-medium">
                {invoice ? invoice.title : '不开发票'}
            </span>
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 max-md mx-auto z-50 safe-area-bottom">
         <div className="flex flex-col gap-3">
             {!isApproved ? (
                 <div className="flex gap-4">
                    <button 
                        onClick={() => setShowRejectModal(true)}
                        className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm bg-white active:bg-gray-50 transition-colors text-center"
                    >
                        审批驳回
                    </button>
                    <button 
                        onClick={handlePassClick}
                        className="flex-1 py-3.5 rounded-xl bg-[#111111] text-white font-bold text-sm shadow-lg active:opacity-90 transition-all text-center"
                    >
                        审批通过
                    </button>
                 </div>
             ) : (
                 <>
                    <button 
                        onClick={handleSignClick}
                        className="w-full py-3.5 rounded-xl bg-[#ff5e5e] text-white font-bold text-sm shadow-lg active:opacity-90 transition-all text-center flex items-center justify-center gap-2"
                    >
                        <FileEdit className="w-4 h-4" />
                        合同签署
                    </button>
                    
                    {/* Skip Button - To settlement directly */}
                    <button 
                        onClick={onSkipToSettlement}
                        className="w-full py-3 rounded-xl border border-gray-100 text-gray-400 font-medium text-xs active:bg-gray-50 transition-colors flex items-center justify-center gap-1"
                    >
                        跳过合同签署，直接进入结算 <ChevronRight className="w-3 h-3" />
                    </button>
                 </>
             )}
         </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setShowRejectModal(false)}></div>
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 relative animate-in zoom-in-95 duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">审批驳回</h3>
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">驳回原因 <span className="text-red-500">*</span></label>
                    <textarea 
                        className="w-full bg-gray-50 border-transparent rounded-xl p-3 text-sm focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none resize-none"
                        rows={4}
                        placeholder="请填写驳回原因..."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex gap-3 w-full">
                    <button 
                        onClick={() => setShowRejectModal(false)}
                        className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl text-sm active:bg-gray-50"
                    >
                        取消
                    </button>
                    <button 
                        onClick={handleConfirmReject}
                        className="flex-1 py-3 bg-[#ff5e5e] text-white font-bold rounded-xl text-sm active:opacity-90 shadow-lg shadow-red-100"
                    >
                        确认驳回
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Sign Options Modal */}
      {showSignOptions && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in" onClick={() => setShowSignOptions(false)}></div>
              <div className="bg-white w-full rounded-t-3xl p-6 relative z-10 animate-in slide-in-from-bottom duration-300 max-w-md">
                  <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-gray-900">选择签署方式</h3>
                      <button onClick={() => setShowSignOptions(false)} className="p-1">
                          <X className="w-6 h-6 text-gray-400" />
                      </button>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                      {/* Online Sign Option */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 opacity-60">
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
                                  <Smartphone className="w-6 h-6" />
                              </div>
                              <div>
                                  <div className="text-sm font-bold text-gray-900">线上合同签署</div>
                                  <div className="text-xs text-orange-500 mt-1 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      开发中，敬请期待
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Offline Sign Option */}
                      <button 
                        onClick={() => {
                            setShowSignOptions(false);
                            onGotoOfflineSign();
                        }}
                        className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl active:bg-gray-50 active:border-red-200 transition-all group"
                      >
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#ff5e5e] shadow-sm">
                                  <FileText className="w-6 h-6" />
                              </div>
                              <div className="text-left">
                                  <div className="text-sm font-bold text-gray-900">线下合同签署</div>
                                  <div className="text-xs text-gray-400 mt-1">手动上传纸质合同照片</div>
                              </div>
                          </div>
                          <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-active:border-[#ff5e5e] group-active:bg-[#ff5e5e]"></div>
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Verification Alert Modal */}
      {showVerificationAlert && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setShowVerificationAlert(false)}></div>
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 relative animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">会员未实名</h3>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                        根据监管要求，签署合同前会员需完成实名认证。
                    </p>
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={() => setShowVerificationAlert(false)}
                            className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl text-sm active:bg-gray-50"
                        >
                            取消
                        </button>
                        {/* 
                          Fix: Replacing missing 'handleConfirmPassThrough' with 'onVerifyMember' 
                          to correctly initiate the verification flow.
                        */}
                        <button 
                            onClick={() => {
                                setShowVerificationAlert(false);
                                onVerifyMember && onVerifyMember();
                            }} 
                            className="flex-1 py-3 bg-[#111] text-white font-bold rounded-xl text-sm active:opacity-90 shadow-lg"
                        >
                            去认证
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};