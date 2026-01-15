import React from 'react';
import { ChevronLeft, MoreHorizontal, Disc, SquarePen, Phone, User, PlusCircle } from 'lucide-react';
import { InvoiceTitle, Member } from '../types';

interface InvoiceManagementPageProps {
  onBack: () => void;
  selectedMember: Member | null;
  invoiceTitles: InvoiceTitle[];
  onSelectInvoice: (invoice: InvoiceTitle) => void;
  onEditInvoice: (invoice: InvoiceTitle) => void;
  onAddInvoice: () => void;
  currentSelectedId: string | null;
}

export const InvoiceManagementPage: React.FC<InvoiceManagementPageProps> = ({
  onBack,
  selectedMember,
  invoiceTitles,
  onSelectInvoice,
  onEditInvoice,
  onAddInvoice,
  currentSelectedId
}) => {
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
        <h1 className="text-lg font-bold text-gray-900 ml-2">发票抬头管理</h1>
        
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

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Current Member Info Card */}
        {selectedMember && (
            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {selectedMember.avatar ? (
                      <img src={selectedMember.avatar} alt={selectedMember.name} className="w-full h-full object-cover" />
                  ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-500" />
                      </div>
                  )}
               </div>
               <div>
                    <div className="font-bold text-gray-900 text-base leading-tight mb-1">{selectedMember.name}</div>
                    <div className="flex items-center text-gray-900 text-sm font-medium">
                        <Phone className="w-3.5 h-3.5 mr-1.5" />
                        {selectedMember.phone}
                    </div>
               </div>
            </div>
        )}

        {/* Invoice List */}
        {invoiceTitles.map((invoice) => (
            <div 
                key={invoice.id} 
                className={`bg-white rounded-xl p-5 shadow-sm border ${currentSelectedId === invoice.id ? 'border-[#ff5e5e]' : 'border-gray-100'}`}
                onClick={() => onSelectInvoice(invoice)}
            >
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="font-bold text-gray-900 text-sm mb-3">
                            发票抬头-{invoice.type === 'company' ? '企业' : '个人/非企业'}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                             <span className="text-gray-800 text-sm font-medium">{invoice.title}</span>
                             {invoice.isDefault && (
                                 <span className="text-[10px] text-blue-500 border border-blue-200 px-1 rounded bg-blue-50">默认</span>
                             )}
                        </div>

                        {invoice.taxId && (
                            <div className="text-gray-400 text-xs font-mono">
                                {invoice.taxId}
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onEditInvoice(invoice);
                        }}
                        className="p-2 -mr-2 text-gray-400 active:text-gray-600"
                    >
                        <SquarePen className="w-5 h-5" />
                    </button>
                </div>
            </div>
        ))}
      </div>

      {/* Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 max-w-md mx-auto z-50">
         <button 
            onClick={onAddInvoice}
            className="w-full bg-[#ff5e5e] text-white font-bold py-3 rounded-lg shadow-lg shadow-red-100 active:opacity-90 transition-opacity flex items-center justify-center gap-2"
         >
            <PlusCircle className="w-5 h-5" />
            添加发票抬头
         </button>
      </div>
    </div>
  );
};
