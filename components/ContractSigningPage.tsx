import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, PenTool, CheckCircle2, FileText } from 'lucide-react';
import { Settlement } from '../types';

interface ContractSigningPageProps {
  order: Settlement;
  onBack: () => void;
  onSignComplete: () => void;
}

export const ContractSigningPage: React.FC<ContractSigningPageProps> = ({ order, onBack, onSignComplete }) => {
  const [isSigned, setIsSigned] = useState(false);

  const handleSign = () => {
    // Simulate signing interaction
    setIsSigned(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 border-b border-gray-100">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">签署电子合同</h1>
        
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

      <div className="flex-1 p-4 overflow-y-auto">
        {/* Contract Preview Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4 min-h-[400px] flex flex-col relative">
            <div className="text-center border-b border-gray-100 pb-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900">二手名品销售合同</h2>
                <p className="text-xs text-gray-400 mt-1">合同编号：CNT-{order.salesOrderId}</p>
            </div>

            <div className="flex-1 space-y-4 text-xs text-gray-600 leading-relaxed">
                <p><strong>甲方（卖方）：</strong> 吉嘉名品汇上海旗舰店</p>
                <p><strong>乙方（买方）：</strong> {order.member.name} ({order.member.phone})</p>
                
                <div className="my-4 p-3 bg-gray-50 rounded border border-gray-100">
                    <p className="font-bold mb-2">商品明细：</p>
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between mb-1">
                            <span>{item.title.substring(0, 20)}...</span>
                            <span>¥{item.price.toLocaleString()}</span>
                        </div>
                    ))}
                    <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
                        <span>合计金额</span>
                        <span>¥{order.totalAmount.toLocaleString()}</span>
                    </div>
                </div>

                <p>1. 甲方承诺出售的商品均为正品，已经过专业鉴定。</p>
                <p>2. 乙方确认已充分了解商品的成色、瑕疵等情况。</p>
                <p>3. 本合同一式两份，甲乙双方各执一份，具有同等法律效力。</p>
                {/* Visual filler for text */}
                <div className="space-y-2 opacity-30 mt-4">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                </div>
            </div>

            {/* Signature Area */}
            <div className="mt-8 border-t border-gray-100 pt-4">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs text-gray-400 mb-8">甲方盖章</p>
                        <div className="w-20 h-20 border-2 border-red-500 rounded-full flex items-center justify-center opacity-80 rotate-12">
                            <span className="text-red-500 text-xs font-bold text-center">吉嘉名品<br/>专用章</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 mb-2">乙方签字</p>
                        <div 
                            onClick={handleSign}
                            className={`w-32 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${isSigned ? 'border-black bg-white' : 'border-gray-300 bg-gray-50'}`}
                        >
                            {isSigned ? (
                                <span className="font-handwriting text-xl text-black rotate-[-5deg]">{order.member.name}</span>
                            ) : (
                                <span className="text-gray-400 text-xs flex items-center gap-1">
                                    <PenTool className="w-3 h-3" /> 点击签署
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex items-start gap-2 px-2">
            <CheckCircle2 className={`w-4 h-4 mt-0.5 ${isSigned ? 'text-[#004e45]' : 'text-gray-300'}`} />
            <p className="text-xs text-gray-500">
                我已阅读并同意 <span className="text-blue-500">《二手名品交易服务协议》</span> 及相关条款。
            </p>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 max-w-md mx-auto z-50">
         <button 
            onClick={onSignComplete}
            disabled={!isSigned}
            className={`w-full font-bold py-3.5 rounded-full text-sm transition-all shadow-lg ${
                isSigned 
                ? 'bg-[#1a1a1a] text-white shadow-gray-200 active:scale-95' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
         >
            确认签署并结算
         </button>
      </div>
    </div>
  );
};