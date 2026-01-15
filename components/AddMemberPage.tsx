import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, ChevronDown, Plus, AlertCircle } from 'lucide-react';
import { Member } from '../types';

interface AddMemberPageProps {
  onBack: () => void;
  onSave: (member: Omit<Member, 'id'>) => void;
  onNext: (member: Omit<Member, 'id'>) => void;
}

const InputGroup = ({ label, required = false, children }: { label: string, required?: boolean, children?: React.ReactNode }) => (
  <div className="mb-4">
      <label className="block text-[13px] font-bold text-gray-800 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
  </div>
);

export const AddMemberPage: React.FC<AddMemberPageProps> = ({ onBack, onSave, onNext }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '' as 'male' | 'female' | '',
    shopName: '吉嘉名品汇嘉定店',
    birthday: '',
    email: '',
    remark: ''
  });

  const [errorToast, setErrorToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setErrorToast(message);
    setTimeout(() => setErrorToast(null), 2000);
  };

  const validate = (): boolean => {
    if (!formData.name.trim()) {
      showToast('请输入会员名称');
      return false;
    }
    if (!formData.phone.trim()) {
      showToast('请输入手机号码');
      return false;
    }
    if (formData.phone.trim().length < 11) {
      showToast('请输入正确的手机号码');
      return false;
    }
    return true;
  };

  const getMemberData = (): Omit<Member, 'id'> => ({
    name: formData.name,
    phone: formData.phone,
    gender: formData.gender === 'female' ? 'female' : 'male',
    isVerified: false,
    shopName: formData.shopName,
  });

  const handleSave = () => {
    if (validate()) {
      onSave(getMemberData());
    }
  };

  const handleNext = () => {
    if (validate()) {
      onNext(getMemberData());
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col pb-24 relative">
       {/* Header */}
       <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-[17px] font-medium text-gray-900 flex-1 text-center">添加会员</h1>
        
        <div className="flex items-center space-x-1 bg-white border border-gray-100 rounded-full px-2 py-1 shadow-sm ml-auto">
          <button className="p-1">
            <MoreHorizontal className="w-[18px] h-[18px] text-gray-800" />
          </button>
          <div className="w-[1px] h-3 bg-gray-200 mx-1"></div>
          <button className="p-1">
            <div className="w-4 h-4 rounded-full border-2 border-gray-800 flex items-center justify-center">
                <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            </div>
          </button>
        </div>
      </header>

      <div className="p-4 flex-1 overflow-y-auto no-scrollbar">
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-50">
            <h2 className="text-[15px] font-bold text-gray-900 mb-6">会员基础信息</h2>
            
            <InputGroup label="所属店铺">
                <div className="relative">
                    <div className="w-full bg-[#cbcbcb] text-gray-800 text-sm rounded-xl p-4 font-medium min-h-[52px] flex items-center">
                        {formData.shopName}
                    </div>
                </div>
            </InputGroup>

            <InputGroup label="会员名称" required>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="请输入会员名称"
                        className="w-full bg-[#f6f7f9] border-transparent text-gray-900 text-sm rounded-xl p-4 focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none placeholder:text-[#a0a8b7]"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                </div>
            </InputGroup>

            <InputGroup label="手机号码" required>
                <div className="relative">
                    <input 
                        type="tel" 
                        placeholder="请输入手机号码"
                        className="w-full bg-[#f6f7f9] border-transparent text-gray-900 text-sm rounded-xl p-4 focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none placeholder:text-[#a0a8b7]"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                </div>
            </InputGroup>

            <InputGroup label="头像">
                <div className="flex items-center gap-4">
                    <div className="w-[72px] h-[72px] border border-dashed border-[#e1e4e8] rounded-lg flex flex-col items-center justify-center bg-white cursor-pointer active:bg-gray-50 transition-colors">
                        <Plus className="w-8 h-8 text-[#ccd1d9]" strokeWidth={1} />
                    </div>
                    <span className="text-[13px] text-[#4e5969]">点击上传头像</span>
                </div>
            </InputGroup>

            <InputGroup label="性别">
                <div className="relative">
                    <select 
                        className={`w-full bg-[#f6f7f9] border-transparent text-sm rounded-xl p-4 appearance-none focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none ${formData.gender ? 'text-gray-900' : 'text-[#a0a8b7]'}`}
                        value={formData.gender}
                        onChange={e => setFormData({...formData, gender: e.target.value as 'male' | 'female'})}
                    >
                        <option value="" disabled>请选择性别</option>
                        <option value="female">女</option>
                        <option value="male">男</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86909c] pointer-events-none" />
                </div>
            </InputGroup>

            <InputGroup label="生日">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="请选择生日"
                        className="w-full bg-[#f6f7f9] border-transparent text-gray-900 text-sm rounded-xl p-4 focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none placeholder:text-[#a0a8b7]"
                        value={formData.birthday}
                        onChange={e => setFormData({...formData, birthday: e.target.value})}
                    />
                </div>
            </InputGroup>

            <InputGroup label="邮箱">
                <div className="relative">
                    <input 
                        type="email" 
                        placeholder="请输入邮箱"
                        className="w-full bg-[#f6f7f9] border-transparent text-gray-900 text-sm rounded-xl p-4 focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none placeholder:text-[#a0a8b7]"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                </div>
            </InputGroup>

            <InputGroup label="备注">
                <div className="relative">
                    <textarea 
                        placeholder="请输入备注，最多不超过200个字"
                        rows={4}
                        className="w-full bg-[#f6f7f9] border-transparent text-gray-900 text-sm rounded-xl p-4 focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none placeholder:text-[#a0a8b7] resize-none"
                        value={formData.remark}
                        onChange={e => setFormData({...formData, remark: e.target.value})}
                    />
                </div>
            </InputGroup>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f7f8fa] p-4 max-w-md mx-auto flex items-center gap-4 z-50">
         <button 
            onClick={handleSave}
            className="flex-1 bg-[#eeeeee] text-[#717171] font-bold py-4 rounded-xl text-[15px] active:opacity-80 transition-opacity"
         >
            保存
         </button>
         <button 
            onClick={handleNext}
            className="flex-1 bg-[#111111] text-white font-bold py-4 rounded-xl text-[15px] active:opacity-90 transition-opacity"
         >
            下一步
         </button>
      </div>

      {/* Error Toast */}
      {errorToast && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-6">
          <div className="bg-black/80 text-white px-5 py-3 rounded-xl text-sm font-medium backdrop-blur-sm shadow-xl animate-in fade-in zoom-in-95 duration-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#ff5e5e]" />
            <span>{errorToast}</span>
          </div>
        </div>
      )}
    </div>
  );
};