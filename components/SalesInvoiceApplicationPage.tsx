import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, CheckCircle2, Circle, Check } from 'lucide-react';
import { Settlement, Product } from '../types';

interface SalesInvoiceApplicationPageProps {
  onBack: () => void;
  order: Settlement;
  onSubmit: (selectedItems: Product[]) => void;
}

export const SalesInvoiceApplicationPage: React.FC<SalesInvoiceApplicationPageProps> = ({
  onBack,
  order,
  onSubmit
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const isSelected = (id: string) => selectedIds.includes(id);

  const selectedItems = order.items.filter(item => selectedIds.includes(item.id));

  const handleSubmit = () => {
      // Direct submit, parent handles navigation to success page
      onSubmit(selectedItems);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col pb-32 relative">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 border-b border-gray-100">
            <button onClick={onBack} className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors z-10">
                <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
            </button>
            <h1 className="text-lg font-bold text-gray-900 absolute left-0 right-0 text-center pointer-events-none">销售开票申请</h1>
            <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm z-10">
                <button className="p-1"><MoreHorizontal className="w-5 h-5 text-gray-800" /></button>
                <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                <button className="p-1"><Disc className="w-5 h-5 text-gray-800" /></button>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
            <div className="text-sm font-bold text-gray-900 mb-3 ml-1">
                销售订单 {order.salesOrderId}
            </div>

            {order.items.map(item => (
                <div
                    key={item.id}
                    className="bg-white rounded-xl p-3 flex items-start shadow-sm mb-3 active:scale-[0.99] transition-transform"
                    onClick={() => toggleItem(item.id)}
                >
                    {/* Checkbox Area - Vertically centered relative to card height */}
                    <div className="mr-3 flex-shrink-0 self-center">
                        {isSelected(item.id) ? (
                            <CheckCircle2 className="w-6 h-6 text-[#00b578] fill-white" />
                        ) : (
                            <Circle className="w-6 h-6 text-gray-400 stroke-1" />
                        )}
                    </div>

                    {/* Image */}
                    <div className="w-24 h-24 bg-[#f9fafb] rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 relative">
                         <img src={item.imageUrl} className="w-full h-full object-contain mix-blend-multiply" alt={item.title} />
                    </div>

                    {/* Info */}
                    <div className="ml-3 flex-1 flex flex-col justify-between min-h-[96px] py-0.5">
                        <div className="text-sm text-gray-900 leading-snug font-medium line-clamp-2">
                            <span className="inline-block bg-[#1a1c29] text-white text-[10px] px-1.5 py-0.5 rounded-[2px] mr-1 align-middle leading-tight">
                                {item.condition}
                            </span>
                            <span className="align-middle">
                                {item.title}
                            </span>
                        </div>
                        <div className="mt-2 space-y-1">
                            <div className="text-[11px] text-gray-500 font-mono">
                                商品唯一码：{item.uniqueCode || item.id}
                            </div>
                            <div className="text-[13px] font-medium text-gray-900 font-mono">
                                销售价(¥): {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 max-w-md mx-auto z-50 pb-8 rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="mb-4 flex items-center gap-2">
                 <div className={`w-5 h-5 rounded-full flex items-center justify-center ${selectedIds.length > 0 ? 'bg-[#00b578]' : 'bg-[#cccccc]'}`}>
                     <Check className="w-3 h-3 text-white" strokeWidth={3} />
                 </div>
                 <span className={`text-sm ${selectedIds.length > 0 ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                     {selectedIds.length > 0 ? `已选择 ${selectedIds.length} 件商品` : '尚未选择'}
                 </span>
            </div>
            
            <button
                disabled={selectedIds.length === 0}
                onClick={handleSubmit}
                className={`w-full py-3.5 rounded-lg text-center font-bold text-sm text-white transition-all shadow-sm ${
                    selectedIds.length > 0 
                    ? 'bg-[#1a1c29] active:scale-[0.98] active:opacity-90 shadow-gray-300' 
                    : 'bg-[#d1d5db] cursor-not-allowed'
                }`}
            >
                确认并发起开票申请
            </button>
        </div>
    </div>
  );
};