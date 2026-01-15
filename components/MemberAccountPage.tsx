import React from 'react';
import { ChevronLeft, MoreHorizontal, Disc, Phone, ChevronRight } from 'lucide-react';
import { Member } from '../types';

interface MemberAccountPageProps {
  member: Member;
  onBack: () => void;
  onNavigateToVerification: () => void;
  onNavigateToDetail: () => void;
}

const MenuRow = ({ label, status, onClick }: { label: string; status: string; onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 cursor-pointer active:bg-gray-50 transition-colors"
  >
    <span className="text-[15px] text-gray-800 font-medium">{label}</span>
    <div className="flex items-center gap-1.5">
      <span className="text-[14px] text-[#86909c]">{status}</span>
      <ChevronRight className="w-4 h-4 text-[#c9cdd4]" />
    </div>
  </div>
);

export const MemberAccountPage: React.FC<MemberAccountPageProps> = ({ 
  member, 
  onBack,
  onNavigateToVerification,
  onNavigateToDetail
}) => {
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
        <h1 className="text-[17px] font-medium text-gray-900 flex-1 text-center">会员账户信息</h1>
        
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

      {/* Profile Info */}
      <div className="p-6 flex items-center gap-5 relative">
        <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-50 shadow-sm">
          {member.avatar ? (
            <img src={member.avatar} className="w-full h-full object-cover" alt="" />
          ) : (
            <div className="w-full h-full bg-[#8c96a8] flex items-center justify-center text-white text-2xl font-bold">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-1.5">{member.name}</h2>
          <div className="flex items-center text-gray-800 text-[16px] font-medium">
            <Phone className="w-4 h-4 mr-1.5 text-gray-700" strokeWidth={2.5} />
            {member.phone}
          </div>
        </div>
        
        {/* Status Badge Top Right of Content */}
        <div className="absolute top-8 right-6">
          <div className={`text-[11px] px-2 py-0.5 rounded-sm font-bold ${
            member.isVerified 
              ? 'bg-[#e8fbf3] text-[#42c58e]' 
              : 'bg-[#fff5e9] text-[#f7a24a]'
          }`}>
            {member.isVerified ? '已实名' : '待认证'}
          </div>
        </div>
      </div>

      {/* Action Menu Card */}
      <div className="px-4 mt-2">
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-50">
          <MenuRow label="会员信息" status="查看明细" onClick={onNavigateToDetail} />
          <MenuRow label="会员实名信息" status={member.isVerified ? "已完成" : "待完善"} onClick={onNavigateToVerification} />
          <MenuRow label="会员人脸认证" status="待认证" />
          <MenuRow label="会员收款信息" status="收款信息管理" />
        </div>
      </div>
    </div>
  );
};