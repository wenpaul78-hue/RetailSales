import React, { useState } from 'react';
import { ChevronLeft, Share2, ChevronDown, Copy, MoreHorizontal, Disc, User, Phone, CheckCircle2, Clock, AlertTriangle, ChevronRight, FileText, ReceiptText } from 'lucide-react';
import { Settlement, OrderStatus } from '../types';

interface OrderDetailPageProps {
  order: Settlement;
  onBack: () => void;
  onCancelOrder?: (order: Settlement) => void;
  onViewContract?: (order: Settlement) => void;
  onApplyInvoice?: (order: Settlement) => void;
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ order, onBack, onCancelOrder, onViewContract, onApplyInvoice }) => {
  const [isPriceExpanded, setIsPriceExpanded] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Mock calculations for demo purposes
  const costPrice = order.items.reduce((sum, item) => sum + (item.costPrice || (item.price * 0.75)), 0);
  const profit = order.totalAmount - costPrice;
  const margin = (profit / order.totalAmount) * 100;

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const isCancelled = order.status === 'returned' || order.status === 'cancelled';
  const isPaid = order.status === 'paid' || order.status === 'completed';

  // Only show cancel for cancellable statuses
  const canCancel = ['pending_sign', 'pending_payment', 'paid', 'completed'].includes(order.status);
  
  // Distinguish between cancelling (before pay/complete) and returning (after pay/complete)
  const isReturn = ['paid', 'completed'].includes(order.status);

  // Determine if contract is signed based on status
  const isSigned = ['pending_payment', 'paid', 'completed', 'returned'].includes(order.status);

  const handleConfirmCancel = () => {
    if (onCancelOrder) {
      onCancelOrder(order);
    }
    setShowCancelModal(false);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending_audit':
        return <div className="bg-orange-50 text-orange-500 px-2 py-0.5 rounded text-[11px] font-medium">待审核</div>;
      case 'audit_rejected':
        return <div className="bg-red-50 text-red-500 px-2 py-0.5 rounded text-[11px] font-medium">已驳回</div>;
      case 'pending_sign':
        return <div className="bg-blue-50 text-blue-500 px-2 py-0.5 rounded text-[11px] font-medium">待签约</div>;
      case 'pending_payment':
        return <div className="bg-red-50 text-[#ff5e5e] px-2 py-0.5 rounded text-[11px] font-medium">待结算</div>;
      case 'paid':
      case 'completed':
        return <div className="bg-[#e8fbf3] text-[#00b578] px-2 py-0.5 rounded text-[11px] font-medium">已完成</div>;
      case 'returned':
        return <div className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[11px] font-medium">已退货</div>;
      case 'cancelled':
        return <div className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[11px] font-medium">已取消</div>;
      default:
        return <div className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[11px] font-medium">未知</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col relative pb-24">
      {/* Standard White Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 border-b border-gray-100 relative">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 absolute left-0 right-0 text-center pointer-events-none">销售订单详情</h1>
        
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

      {/* Main Content */}
      <div className="px-3 py-3 space-y-3 flex-1 overflow-y-auto">
          
          {/* Customer Info Card */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-start relative">
             <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100 mr-4">
                {order.member.avatar ? (
                    <img src={order.member.avatar} alt={order.member.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-[#8c96a8] flex items-center justify-center">
                        <span className="text-white text-lg font-bold">{order.member.name.charAt(0)}</span>
                    </div>
                )}
             </div>
             
             <div className="flex-1 pt-1">
                  <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-gray-900 leading-none">{order.member.name}</span>
                          {order.member.gender === 'female' ? (
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
                          order.member.isVerified 
                              ? 'bg-[#e8fbf3] text-[#00b578]' 
                              : 'bg-orange-50 text-orange-500'
                      }`}>
                          {order.member.isVerified ? '已实名' : '待实名'}
                      </div>
                  </div>

                  <div className="flex items-center text-gray-900 font-medium text-sm leading-none tracking-wide">
                      <div className="w-4 h-4 rounded-full border border-gray-900 flex items-center justify-center mr-2 opacity-90">
                          <Phone className="w-2 h-2 text-gray-900" strokeWidth={2.5} />
                      </div>
                      {order.member.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
                  </div>
             </div>
          </div>

          {/* Product List Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4">
              <div className="mb-4">
                  <span className="text-sm font-bold text-gray-500">商品清单</span>
              </div>
              {order.items.map((item, idx) => (
                   <div key={`${order.id}-item-${idx}`} className="flex mb-4 last:mb-0">
                       <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                           <img src={item.imageUrl} className="w-full h-full object-contain mix-blend-multiply" />
                       </div>
                       <div className="ml-3 flex-1 flex flex-col justify-between py-0.5">
                           <div className="flex justify-between items-start gap-2">
                               <div className="text-sm text-gray-900 leading-snug line-clamp-2 font-medium flex-1">
                                    <span className="bg-black text-white text-[10px] px-1 rounded-[2px] mr-1 inline-block align-middle font-medium">{item.condition}</span>
                                    <span className="align-middle">{item.title}</span>
                               </div>
                               {/* Invoicing Status Button */}
                               {isPaid && (
                                   <button 
                                     onClick={(e) => {
                                        e.stopPropagation();
                                        onApplyInvoice && onApplyInvoice(order);
                                     }}
                                     className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded bg-[#f2f7ff] text-[#2b85ff] border border-blue-100 active:bg-blue-100 transition-colors"
                                   >
                                       <ReceiptText className="w-3 h-3" />
                                       <span className="text-[10px] font-bold">待开票</span>
                                   </button>
                               )}
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
               
               <div className="mt-4 pt-3 border-t border-gray-50 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">商品总数</span>
                        <span className="text-gray-900 font-medium">{order.items.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">金额合计</span>
                        <span className="text-gray-900 font-medium font-mono">¥{formatPrice(order.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">实收金额</span>
                        <span className="text-gray-900 font-medium font-mono">¥{formatPrice(order.paidAmount || 0)}</span>
                    </div>
               </div>
          </div>

          {/* Audit Information Card */}
          {order.auditInfo && (
            <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    审批信息
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">提交人</span>
                        <span className="text-gray-900 font-medium">{order.auditInfo.submitter}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">提交时间</span>
                        <span className="text-gray-900 font-mono text-xs">{order.auditInfo.submitTime}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">审批人</span>
                        <span className="text-gray-900 font-medium">{order.auditInfo.approver}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">审批时间</span>
                        <span className="text-gray-900 font-mono text-xs">{order.auditInfo.approveTime}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">审批结果</span>
                        {order.auditInfo.status === 'passed' ? (
                            <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-xs border border-green-100">通过</span>
                        ) : (
                            <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded text-xs border border-red-100">驳回</span>
                        )}
                    </div>
                    {order.auditInfo.note && (
                        <div className="flex flex-col text-sm gap-1 pt-1">
                            <span className="text-gray-500">审批说明</span>
                            <div className="bg-gray-50 p-2.5 rounded text-gray-700 text-xs leading-relaxed border border-gray-100">
                                {order.auditInfo.note}
                            </div>
                        </div>
                    )}
                </div>
            </div>
          )}

          {/* Contract Info Card */}
          {isSigned && (
            <div 
                onClick={() => onViewContract && onViewContract(order)}
                className="bg-white rounded-xl shadow-sm p-4 space-y-3 border border-gray-200 cursor-pointer active:bg-gray-50 transition-colors relative"
            >
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
                    <ChevronRight className="w-5 h-5" />
                </div>

                <div className="flex justify-between items-center text-sm pr-6">
                    <span className="text-gray-500">合同编号</span>
                    <span className="text-gray-900 font-medium font-mono">H-uat-{order.salesOrderId.replace(/[^0-9]/g, '').slice(0, 12)}</span>
                </div>
                <div className="flex justify-between items-center text-sm pr-6">
                    <span className="text-gray-500">合同名称</span>
                    <span className="text-gray-900 font-medium">二手物品销售服务协议V1.2</span>
                </div>
                <div className="flex justify-between items-center text-sm pr-6">
                    <span className="text-gray-500">业务类型</span>
                    <span className="text-gray-900 font-medium">销售合同</span>
                </div>
                <div className="flex justify-between items-center text-sm pr-6">
                    <span className="text-gray-500">合同状态</span>
                    <div className="bg-[#e8fbf3] text-[#00b578] px-2 py-0.5 rounded text-[11px] font-medium">
                        已签署
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm pr-6">
                    <span className="text-gray-500">发起方</span>
                    <span className="text-gray-900 font-medium">铭奢汇</span>
                </div>
                <div className="flex justify-between items-center text-sm pr-6">
                    <span className="text-gray-500">签署方</span>
                    <span className="text-gray-900 font-medium">{order.member.name}</span>
                </div>
            </div>
          )}

          {/* Meta Info List */}
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
               <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-500">订单状态</span>
                   {getStatusBadge(order.status)}
               </div>
               <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-500">销售人员</span>
                   <div className="flex items-center gap-1.5">
                       <div className="w-4 h-4 rounded-full bg-gray-200 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
                       </div>
                       <span className="text-gray-900 font-medium">尾号0929</span>
                   </div>
               </div>
               <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-500">创建时间</span>
                   <span className="text-gray-900 font-mono font-medium">{order.createTime}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-500">订单编号</span>
                   <div className="flex items-center gap-1.5">
                       <span className="text-gray-900 font-mono font-medium tracking-tight">{order.salesOrderId}</span>
                       <Copy className="w-3 h-3 text-gray-300 active:text-gray-500" />
                   </div>
               </div>
          </div>
      </div>

      {/* Bottom Action Bar */}
      {!isCancelled && canCancel && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 max-w-md mx-auto z-50 pb-8">
            <button 
                onClick={() => setShowCancelModal(true)}
                className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl text-sm active:bg-gray-50 transition-colors shadow-sm active:scale-[0.98] transform transition-transform"
            >
                {isReturn ? '申请退货' : '取消订单'}
            </button>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setShowCancelModal(false)}></div>
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 relative animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {isReturn ? '确认申请退货?' : '确认取消订单?'}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                        {isReturn 
                            ? <span>申请后将生成<span className="font-bold text-gray-800">销售退货单</span>。<br/>审核通过后需进行退款操作。</span>
                            : <span>取消后将生成<span className="font-bold text-gray-800">销售退货单</span>。<br/>退货完成后合同将自动失效。</span>
                        }
                    </p>
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={() => setShowCancelModal(false)}
                            className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl text-sm active:bg-gray-50"
                        >
                            我再想想
                        </button>
                        <button 
                            onClick={handleConfirmCancel}
                            className="flex-1 py-3 bg-[#111] text-white font-bold rounded-xl text-sm active:opacity-90 shadow-lg"
                        >
                            {isReturn ? '确认申请' : '确认取消'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};