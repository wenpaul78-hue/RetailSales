import React from 'react';
import { ChevronLeft, MoreHorizontal, Disc, CheckCircle2, ArrowRight, FileText } from 'lucide-react';
import { Settlement } from '../types';

interface PaymentSuccessPageProps {
  settlement: Settlement;
  amount: number;
  onFinish: () => void;
  onContinue: () => void;
  onApplyInvoice?: () => void;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ 
  settlement, 
  amount,
  onFinish,
  onContinue,
  onApplyInvoice
}) => {
  const paidAmount = settlement.paidAmount || 0;
  const remainingAmount = Math.max(0, settlement.totalAmount - paidAmount);
  const isFullyPaid = remainingAmount <= 0;

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
       {/* Header */}
       <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 border-b border-gray-100">
        <button 
            onClick={onFinish}
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
        <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
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
                <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-3 mt-1">
                    <span className="text-gray-500">剩余待收(¥)</span>
                    <span className={`font-bold ${isFullyPaid ? 'text-gray-400' : 'text-[#ff5e5e]'}`}>
                        {remainingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
        </div>

        {/* Success Status */}
        <div className="flex flex-col items-center justify-center pt-8">
            <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#07c160] fill-[#07c160] text-white" />
                <span className="text-[#07c160] text-xl font-bold">
                    {isFullyPaid ? '收款成功' : '部分收款成功'}
                </span>
            </div>
            
            <div className="text-sm text-gray-500 mb-1">本次收款金额</div>
            <div className="text-4xl font-bold text-gray-900 font-mono mb-12">
                <span className="text-2xl mr-1">¥</span>
                {amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            
            <div className="w-full space-y-3">
                {/* Logic for Buttons */}
                {!isFullyPaid ? (
                    <>
                        <button 
                            onClick={onContinue}
                            className="w-full bg-[#1a1a1a] text-white font-bold py-3.5 rounded-xl text-sm active:opacity-90 transition-opacity flex items-center justify-center"
                        >
                            继续收款 <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                        <button 
                            onClick={onFinish}
                            className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl text-sm active:bg-gray-50 transition-colors"
                        >
                            确认返回
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={onApplyInvoice}
                            className="w-full bg-[#1677ff] text-white font-bold py-3.5 rounded-xl text-sm active:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-blue-100 shadow-md"
                        >
                            <FileText className="w-4 h-4" /> 申请开票
                        </button>
                        <button 
                            onClick={onFinish}
                            className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl text-sm active:bg-gray-50 transition-colors"
                        >
                            完成
                        </button>
                    </>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};