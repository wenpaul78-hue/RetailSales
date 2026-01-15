import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, ChevronDown } from 'lucide-react';
import { Member } from '../types';

interface EditMemberPageProps {
  member: Member;
  onBack: () => void;
  onSave: (updatedData: Partial<Member>) => void;
}

const InputGroup = ({ label, required = false, children }: { label: string; required?: boolean; children?: React.ReactNode }) => (
  <div className="mb-4">
    <label className="block text-[13px] font-bold text-gray-800 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

export const EditMemberPage: React.FC<EditMemberPageProps> = ({ member, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    name: member.name,
    phone: member.phone,
    gender: member.gender || 'male',
    shopName: '吉嘉名品汇嘉定店',
    birthday: '2000年1月1日',
    email: '',
    remark: ''
  });

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50">
        <button onClick={onBack} className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-[17px] font-medium text-gray-900 flex-1 text-center">编辑会员</h1>
        <div className="flex items-center space-x-1 bg-white border border-gray-100 rounded-full px-2 py-1 shadow-sm ml-auto">
          <button className="p-1"><MoreHorizontal className="w-[18px] h-[18px] text-gray-800" /></button>
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
          <InputGroup label="所属店铺">
            <div className="w-full bg-[#cbcbcb] text-gray-800 text-sm rounded-xl p-4 font-medium">
              {formData.shopName}
            </div>
          </InputGroup>

          <InputGroup label="头像">
            <div className="flex items-center gap-4">
              <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-gray-100 border border-gray-50 shadow-sm">
                {member.avatar ? (
                  <img src={member.avatar} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full bg-[#8c96a8] flex items-center justify-center text-white text-2xl font-bold">
                    {formData.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-[13px] text-[#4e5969] font-medium cursor-pointer">点击更换头像</span>
            </div>
          </InputGroup>

          <InputGroup label="会员名称" required>
            <input
              type="text"
              className="w-full bg-[#f6f7f9] border-transparent text-gray-900 text-sm rounded-xl p-4 focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </InputGroup>

          <InputGroup label="手机号码" required>
            <input
              type="tel"
              className="w-full bg-[#f6f7f9] border-transparent text-gray-900 text-sm rounded-xl p-4 focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </InputGroup>

          <InputGroup label="性别">
            <div className="relative">
              <select
                className="w-full bg-[#f6f7f9] border-transparent text-gray-900 text-sm rounded-xl p-4 appearance-none focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none"
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
              >
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86909c] pointer-events-none" />
            </div>
          </InputGroup>

          <InputGroup label="生日">
            <input
              type="text"
              className="w-full bg-[#f6f7f9] border-transparent text-gray-900 text-sm rounded-xl p-4 focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none"
              value={formData.birthday}
              onChange={e => setFormData({ ...formData, birthday: e.target.value })}
            />
          </InputGroup>

          <InputGroup label="邮箱">
            <input
              type="email"
              placeholder="请输入邮箱"
              className="w-full bg-[#f6f7f9] border-transparent text-gray-900 text-sm rounded-xl p-4 focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none placeholder:text-[#a0a8b7]"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </InputGroup>

          <InputGroup label="备注">
            <textarea
              rows={4}
              placeholder="请输入备注，最多不超过200个字"
              className="w-full bg-[#f6f7f9] border-transparent text-gray-900 text-sm rounded-xl p-4 focus:bg-white focus:ring-1 focus:ring-gray-200 focus:outline-none resize-none placeholder:text-[#a0a8b7]"
              value={formData.remark}
              onChange={e => setFormData({ ...formData, remark: e.target.value })}
            />
          </InputGroup>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f7f8fa] p-4 max-w-md mx-auto flex items-center gap-4 z-50">
        <button 
          onClick={onBack}
          className="flex-1 bg-[#eeeeee] text-[#717171] font-bold py-4 rounded-xl text-[15px] active:opacity-80 transition-opacity"
        >
          返回
        </button>
        <button 
          onClick={() => onSave(formData)}
          className="flex-1 bg-[#111111] text-white font-bold py-4 rounded-xl text-[15px] active:opacity-90 transition-opacity"
        >
          保存
        </button>
      </div>
    </div>
  );
};