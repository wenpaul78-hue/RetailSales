import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface SalesInvoiceSuccessPageProps {
  onBackToOrders: () => void;
}

export const SalesInvoiceSuccessPage: React.FC<SalesInvoiceSuccessPageProps> = ({ onBackToOrders }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300">
      <div className="w-24 h-24 bg-[#e8fbf3] rounded-full flex items-center justify-center mb-8 shadow-sm">
        <CheckCircle2 className="w-12 h-12 text-[#00b578]" strokeWidth={3} />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4">申请已提交</h2>
      <p className="text-[15px] text-gray-500 leading-relaxed max-w-xs mb-16">
        您的开票申请已成功提交。<br/>
        财务审核通过后将为您开具发票，<br/>请耐心等待。
      </p>

      <button 
        onClick={onBackToOrders}
        className="w-full bg-[#1a1a1a] text-white font-bold py-4 rounded-xl text-[15px] active:opacity-90 transition-opacity flex items-center justify-center max-w-xs shadow-xl shadow-gray-200"
      >
        返回销售订单 <ArrowRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};