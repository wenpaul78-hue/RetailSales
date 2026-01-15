import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, Search, UserPlus, Phone } from 'lucide-react';
import { Member } from '../types';

interface MemberManagementPageProps {
  onBack: () => void;
  onAddMember: () => void;
  onSelectMember: (member: Member) => void;
  members: Member[];
}

export const MemberManagementPage: React.FC<MemberManagementPageProps> = ({ 
  onBack, 
  onAddMember,
  onSelectMember,
  members 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(member => 
    member.name.includes(searchQuery) || 
    member.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-[17px] font-medium text-gray-900 flex-1 text-center">会员列表</h1>
        
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

      {/* Search Bar Row */}
      <div className="px-4 py-4 bg-white flex items-center gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
            <Search className="w-[18px] h-[18px] text-gray-900" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索会员姓名、手机号"
            className="w-full bg-[#f6f7f9] text-gray-800 text-sm rounded-lg block pl-10 pr-4 py-3 focus:outline-none placeholder:text-[#a0a8b7]"
          />
        </div>
        <button 
          onClick={onAddMember}
          className="active:opacity-60 transition-opacity"
        >
          <UserPlus className="w-7 h-7 text-gray-800" strokeWidth={1.5} />
        </button>
      </div>

      {/* Member List Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 pb-20 no-scrollbar">
        {filteredMembers.map((member) => (
          <div 
            key={member.id}
            onClick={() => onSelectMember(member)}
            className="bg-white rounded-2xl p-4 flex items-center shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-50 active:scale-[0.98] transition-transform duration-150 cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-100 mr-4 flex-shrink-0">
               {member.avatar ? (
                   <img src={member.avatar} className="w-full h-full object-cover" alt="" />
               ) : (
                   <div className="w-full h-full bg-[#8c96a8] flex items-center justify-center">
                       <span className="text-white text-lg font-bold">{member.name.charAt(0)}</span>
                   </div>
               )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-4">
               <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="font-bold text-gray-900 text-[16px]">{member.name}</span>
                  {member.gender === 'female' && (
                      <span className="text-[#ff98ba] text-lg font-bold">♀</span>
                  )}
               </div>
               <div className="flex items-center text-[#7c8396] text-sm">
                  <Phone className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" />
                  <span className="font-medium tracking-tight">
                    {member.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
                  </span>
               </div>
            </div>

            {/* Status Badge */}
            <div className={`text-[11px] px-2 py-0.5 rounded-sm font-bold flex-shrink-0 ${
              member.isVerified 
                ? 'bg-[#e8fbf3] text-[#42c58e]' 
                : 'bg-[#fff5e9] text-[#f7a24a]'
            }`}>
              {member.isVerified ? '已实名' : '待认证'}
            </div>
          </div>
        ))}

        {filteredMembers.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-20 text-[#a0a8b7]">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm">未找到相关会员</p>
          </div>
        )}
      </div>
    </div>
  );
};