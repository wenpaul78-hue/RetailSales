import React, { useState, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, Disc } from 'lucide-react';
import { InvoiceTitle } from '../types';

interface AddInvoiceTitlePageProps {
  onBack: () => void;
  onSave: (invoice: Omit<InvoiceTitle, 'id'>) => void;
  onUpdate: (id: string, invoice: Partial<InvoiceTitle>) => void;
  editingInvoice: InvoiceTitle | null;
}

const FormRow = ({ label, children, className = "" }: React.PropsWithChildren<{ label: string, className?: string }>) => (
    <div className={`flex items-start py-3 ${className}`}>
        <label className="w-20 text-sm font-bold text-gray-900 pt-2 flex-shrink-0">
            {label}
        </label>
        <div className="flex-1">
            {children}
        </div>
    </div>
);

const SelectionButton = ({ label, isSelected, onClick }: { label: string, isSelected: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-4 py-1.5 text-xs font-medium rounded-[4px] border transition-colors mr-3 ${
            isSelected 
            ? 'border-[#ff5e5e] text-[#ff5e5e] bg-red-50' 
            : 'border-transparent bg-gray-100 text-gray-500'
        }`}
    >
        {label}
    </button>
);

export const AddInvoiceTitlePage: React.FC<AddInvoiceTitlePageProps> = ({ onBack, onSave, onUpdate, editingInvoice }) => {
  const [formData, setFormData] = useState<Omit<InvoiceTitle, 'id'>>({
    invoiceType: 'general',
    invoiceContent: 'details',
    type: 'personal',
    title: '',
    taxId: '',
    email: '',
    isDefault: false,
    registerAddress: '',
    registerPhone: '',
    bankName: '',
    bankAccount: ''
  });

  useEffect(() => {
    if (editingInvoice) {
        setFormData({
            invoiceType: editingInvoice.invoiceType || 'general',
            invoiceContent: editingInvoice.invoiceContent || 'details',
            type: editingInvoice.type,
            title: editingInvoice.title,
            taxId: editingInvoice.taxId || '',
            email: editingInvoice.email || '',
            isDefault: editingInvoice.isDefault,
            registerAddress: editingInvoice.registerAddress || '',
            registerPhone: editingInvoice.registerPhone || '',
            bankName: editingInvoice.bankName || '',
            bankAccount: editingInvoice.bankAccount || ''
        });
    }
  }, [editingInvoice]);

  const handleSave = () => {
    if (!formData.title) {
        alert('请输入发票抬头');
        return;
    }
    if (formData.type === 'company' && !formData.taxId) {
        alert('请输入税号');
        return;
    }
    
    if (editingInvoice) {
        onUpdate(editingInvoice.id, formData);
    } else {
        onSave(formData);
    }
  };

  const autoFillEmail = () => {
      setFormData(prev => ({...prev, email: 'kris@ninghuoban.com'}));
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
        <h1 className="text-lg font-bold text-gray-900 ml-2">{editingInvoice ? '编辑发票抬头' : '添加发票抬头'}</h1>
        
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
        {/* Main Form Card */}
        <div className="bg-white rounded-xl px-5 py-3 shadow-sm mb-4">
            <FormRow label="发票类型">
                <div className="flex items-center pt-0.5">
                    <SelectionButton 
                        label="普通发票" 
                        isSelected={formData.invoiceType === 'general'} 
                        onClick={() => setFormData({...formData, invoiceType: 'general'})}
                    />
                    <SelectionButton 
                        label="专用发票" 
                        isSelected={formData.invoiceType === 'special'} 
                        onClick={() => setFormData({...formData, invoiceType: 'special', type: 'company'})} // Special invoice usually requires company
                    />
                </div>
            </FormRow>
            
            <FormRow label="发票内容">
                <div className="flex items-center pt-0.5">
                    <SelectionButton 
                        label="商品明细" 
                        isSelected={formData.invoiceContent === 'details'} 
                        onClick={() => setFormData({...formData, invoiceContent: 'details'})}
                    />
                    <SelectionButton 
                        label="商品类别" 
                        isSelected={formData.invoiceContent === 'category'} 
                        onClick={() => setFormData({...formData, invoiceContent: 'category'})}
                    />
                </div>
            </FormRow>

            <FormRow label="抬头类型">
                <div className="flex items-center pt-0.5">
                    <SelectionButton 
                        label="企业" 
                        isSelected={formData.type === 'company'} 
                        onClick={() => setFormData({...formData, type: 'company'})}
                    />
                    <SelectionButton 
                        label="个人/非企业" 
                        isSelected={formData.type === 'personal'} 
                        onClick={() => setFormData({...formData, type: 'personal'})}
                    />
                </div>
            </FormRow>

            <FormRow label="发票抬头">
                <input 
                    type="text" 
                    placeholder="请填写发票抬头"
                    className="w-full text-sm py-2 focus:outline-none placeholder:text-gray-400 text-gray-900"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                />
            </FormRow>

            {formData.type === 'company' && (
                <FormRow label="税号">
                    <input 
                        type="text" 
                        placeholder="请输入纳税人识别号"
                        className="w-full text-sm py-2 focus:outline-none placeholder:text-gray-400 text-gray-900 font-mono"
                        value={formData.taxId}
                        onChange={e => setFormData({...formData, taxId: e.target.value})}
                    />
                </FormRow>
            )}

            <FormRow label="收票邮箱">
                <div className="flex flex-col">
                    <input 
                        type="email" 
                        placeholder="请填写接收发票邮箱，可选填"
                        className="w-full text-sm py-2 focus:outline-none placeholder:text-gray-400 text-gray-900"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    {!formData.email && (
                        <div 
                            className="text-xs text-blue-500 cursor-pointer mt-1"
                            onClick={autoFillEmail}
                        >
                            kris@ninghuoban.com, 自动带入
                        </div>
                    )}
                </div>
            </FormRow>

            {/* Optional Fields for Company */}
            {formData.type === 'company' && (
                <>
                    <div className="h-px bg-gray-50 my-2"></div>
                    <div className="text-xs text-gray-400 mb-2 mt-2">更多信息 (选填)</div>
                    <FormRow label="注册地址">
                        <input type="text" placeholder="请输入注册地址" className="w-full text-sm py-2 focus:outline-none placeholder:text-gray-400" value={formData.registerAddress} onChange={e => setFormData({...formData, registerAddress: e.target.value})} />
                    </FormRow>
                    <FormRow label="注册电话">
                        <input type="tel" placeholder="请输入注册电话" className="w-full text-sm py-2 focus:outline-none placeholder:text-gray-400" value={formData.registerPhone} onChange={e => setFormData({...formData, registerPhone: e.target.value})} />
                    </FormRow>
                    <FormRow label="开户银行">
                        <input type="text" placeholder="请输入开户银行" className="w-full text-sm py-2 focus:outline-none placeholder:text-gray-400" value={formData.bankName} onChange={e => setFormData({...formData, bankName: e.target.value})} />
                    </FormRow>
                    <FormRow label="银行账号">
                        <input type="text" placeholder="请输入银行账号" className="w-full text-sm py-2 focus:outline-none placeholder:text-gray-400 font-mono" value={formData.bankAccount} onChange={e => setFormData({...formData, bankAccount: e.target.value})} />
                    </FormRow>
                </>
            )}
        </div>

        {/* Default Toggle Card */}
        <div className="bg-white rounded-xl px-5 py-4 shadow-sm flex items-center justify-between">
            <span className="text-sm font-bold text-gray-900">设为默认抬头</span>
            <button 
                onClick={() => setFormData({...formData, isDefault: !formData.isDefault})}
                className={`w-12 h-7 rounded-full transition-colors relative ${formData.isDefault ? 'bg-[#ff5e5e]' : 'bg-gray-200'}`}
            >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${formData.isDefault ? 'left-6' : 'left-1'}`}></div>
            </button>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 max-w-md mx-auto flex items-center gap-4 z-50">
         <button 
            onClick={onBack}
            className="flex-1 bg-white border border-[#ff5e5e] text-[#ff5e5e] font-medium py-3 rounded-xl text-sm active:bg-red-50 transition-colors"
         >
            取消
         </button>
         <button 
            onClick={handleSave}
            className="flex-1 bg-[#ff5e5e] text-white font-medium py-3 rounded-xl text-sm shadow-lg shadow-red-100 active:opacity-90 transition-opacity"
         >
            保存
         </button>
      </div>
    </div>
  );
};