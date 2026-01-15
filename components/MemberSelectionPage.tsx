import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, Search, UserPlus, User } from 'lucide-react';
import { Member } from '../types';

interface MemberSelectionPageProps {
  onBack: () => void;
  onSelectMember: (member: Member) => void;
  onAddMember: () => void;
  members: Member[];
}

export const MemberSelectionPage: React.FC<MemberSelectionPageProps> = ({ 
  onBack, 
  onSelectMember, 
  onAddMember,
  members 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(member => 
    member.name.includes(searchQuery) || 
    member.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">选择会员</h1>
        
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

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white sticky top-[60px] z-40 flex items-center gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索会员姓名、手机号"
            className="w-full bg-[#f5f5f5] text-gray-800 text-sm rounded-full block pl-9 p-2.5 focus:outline-none placeholder:text-gray-400"
          />
        </div>
        <button 
          onClick={onAddMember}
          className="p-1 active:opacity-60"
        >
          <UserPlus className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
        </button>
      </div>

      {/* Member List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 pb-10">
        {filteredMembers.map((member) => (
          <div 
            key={member.id}
            onClick={() => onSelectMember(member)}
            className="bg-white rounded-xl p-4 flex items-center shadow-sm active:bg-gray-50 transition-colors"
          >
            {/* Avatar */}
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
               <User className="w-6 h-6 text-gray-300" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900 text-base">{member.name}</span>
                  <div className={`text-[10px] px-1 rounded flex items-center ${member.gender === 'female' ? 'text-pink-500 bg-pink-50' : 'text-blue-500 bg-blue-50'}`}>
                     {member.gender === 'female' ? '♀女' : '♂男'}
                  </div>
               </div>
               <div className="flex items-center text-gray-500 text-sm">
                  <span className="mr-1">📞</span>
                  {member.phone}
               </div>
            </div>

            {/* Status Tag */}
            <div className={`text-xs px-2 py-0.5 rounded ${
              member.isVerified 
                ? 'bg-green-50 text-green-600 border border-green-100' 
                : 'bg-orange-50 text-orange-400 border border-orange-100'
            }`}>
              {member.isVerified ? '已实名' : '待实名'}
            </div>
          </div>
        ))}
        {filteredMembers.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            未找到相关会员
          </div>
        )}
      </div>
    </div>
  );
};
