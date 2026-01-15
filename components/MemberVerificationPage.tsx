import React, { useState, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, Camera, Info, Shield, CheckCircle2 } from 'lucide-react';
import { Member } from '../types';

interface MemberVerificationPageProps {
  onBack: () => void;
  onSuccess: () => void;
  onNavigateToSelfRegistration: () => void;
  memberPhone?: string;
}

const InfoRow = ({ label, value, placeholder }: { label: string; value: string; placeholder: string }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
    <div className="text-[14px] font-medium text-gray-600 w-24 flex-shrink-0">
      <span className="text-[#ff5e5e] mr-1">*</span>{label}
    </div>
    <div className={`flex-1 text-right text-[14px] ${value ? 'text-gray-900 font-medium' : 'text-gray-300'}`}>
      {value || placeholder}
    </div>
  </div>
);

export const MemberVerificationPage: React.FC<MemberVerificationPageProps> = ({ 
  onBack, 
  onSuccess,
  onNavigateToSelfRegistration,
  memberPhone = ''
}) => {
  const [isOcrDone, setIsOcrDone] = useState(false);
  const [formData, setFormData] = useState({
    realName: '',
    idNumber: '',
    phone: '',
    verifyCode: ''
  });
  
  const [countdown, setCountdown] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Helper to format phone number as 344
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 7)} ${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Limit to 11 digits (plus 2 spaces = 13 chars)
    if (val.replace(/\D/g, '').length > 11) return;
    setFormData(prev => ({...prev, phone: formatPhoneNumber(val)}));
  };

  const simulateOcr = () => {
    setFormData(prev => ({
      ...prev,
      realName: '张宇航',
      idNumber: '3205**********1234',
    }));
    setIsOcrDone(true);
  };

  const handleSendCode = () => {
    if (countdown > 0) return;
    if (!formData.phone) {
        // In a real app, show toast
        alert('请输入手机号码');
        return;
    }
    setCountdown(60);
  };

  const handleSubmit = () => {
      // Simple mock validation
      if (!formData.realName && !isOcrDone) {
          // If no OCR done and name is empty, simulate OCR for better demo flow or alert
          // For this demo, let's allow it but warn if completely empty
          // alert('请先上传身份证'); 
          // return;
      }
      
      setShowSuccessModal(true);
      
      // Delay navigation to show success state
      setTimeout(() => {
          setShowSuccessModal(false);
          onSuccess();
      }, 1500);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 relative border-b border-gray-100">
        <button onClick={onBack} className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors z-10">
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-[17px] font-medium text-gray-900 absolute left-0 right-0 text-center pointer-events-none">会员实名信息登记</h1>
        <div className="flex items-center space-x-1 bg-white border border-gray-100 rounded-full px-2 py-1 shadow-sm z-10">
          <button className="p-1"><MoreHorizontal className="w-[18px] h-[18px] text-gray-800" /></button>
          <div className="w-[1px] h-3 bg-gray-200 mx-1"></div>
          <button className="p-1">
            <div className="w-4 h-4 rounded-full border-2 border-gray-800 flex items-center justify-center">
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            </div>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Notice Banner */}
        <div className="bg-[#eef6ff] px-4 py-3 flex items-start gap-3">
             <Info className="w-5 h-5 text-[#2b85ff] flex-shrink-0 mt-0.5" />
             <div className="text-[13px] text-[#2b85ff] font-medium leading-relaxed">
                根据监管要求，将进行【真实姓名+身份证号+手机号】一致性校验。
             </div>
        </div>

        {/* Top Upload Section */}
        <div className="bg-white p-4 mb-3">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-[15px] font-bold text-gray-900">上传身份证</h2>
                    <div className="flex items-center gap-0.5 text-[#9ca3af]">
                        <Shield className="w-3 h-3" strokeWidth={2} />
                        <span className="text-[10px]">法大大提供技术支持</span>
                    </div>
                </div>
                <button 
                    onClick={onNavigateToSelfRegistration}
                    className="flex items-center justify-center bg-white text-[#a66a3d] text-xs px-3 py-1.5 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.1)] border border-gray-100 font-medium active:bg-gray-50 transition-all"
                >
                    会员自助实名 &gt;&gt;
                </button>
            </div>

            <div className="flex gap-3 mb-1">
                {/* ID Front */}
                <div 
                    onClick={simulateOcr}
                    className="flex-1 bg-[#f5f7fa] rounded-lg h-32 relative overflow-hidden flex flex-col items-center justify-center cursor-pointer active:opacity-80 transition-opacity"
                >
                    {/* Background Graphics */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-4 left-3 space-y-2">
                             <div className="w-12 h-1.5 bg-gray-800 rounded-full"></div>
                             <div className="w-8 h-1.5 bg-gray-800 rounded-full"></div>
                             <div className="w-16 h-1.5 bg-gray-800 rounded-full"></div>
                        </div>
                        <div className="absolute bottom-0 right-0">
                             <svg width="80" height="80" viewBox="0 0 100 100" fill="#000">
                                 <path d="M50 50 C20 50 20 100 20 100 L80 100 C80 100 80 50 50 50 Z" />
                                 <circle cx="50" cy="30" r="15" />
                             </svg>
                        </div>
                    </div>

                    <div className="w-10 h-10 bg-[#a66a3d] rounded-full flex items-center justify-center mb-2 z-10 shadow-sm border-2 border-white">
                        <Camera className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium z-10">请上传身份证人像面</span>
                </div>

                {/* ID Back */}
                <div 
                    onClick={simulateOcr}
                    className="flex-1 bg-[#f5f7fa] rounded-lg h-32 relative overflow-hidden flex flex-col items-center justify-center cursor-pointer active:opacity-80 transition-opacity"
                >
                    {/* Background Graphics */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-3 left-3">
                             <div className="w-10 h-10 border-2 border-gray-800 rounded-full flex items-center justify-center">
                                 <div className="w-8 h-8 border border-gray-800 rounded-full"></div>
                             </div>
                        </div>
                         <div className="absolute top-4 right-3 space-y-2">
                             <div className="w-12 h-1.5 bg-gray-800 rounded-full"></div>
                             <div className="w-16 h-1.5 bg-gray-800 rounded-full"></div>
                        </div>
                    </div>

                    <div className="w-10 h-10 bg-[#a66a3d] rounded-full flex items-center justify-center mb-2 z-10 shadow-sm border-2 border-white">
                        <Camera className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium z-10">请上传身份证国徽面</span>
                </div>
            </div>
            
            <div className="mt-3 text-xs text-[#ff5e5e] leading-relaxed">
              请上传证件相片页与本人证件有效期日期页照片，支持 JPG/PNG/BMP 格式，单张图片最大5M
            </div>
        </div>

        {/* Info Fields */}
        <div className="bg-white px-4 mb-3">
             {/* Editable Real Name */}
             <div className="flex items-center justify-between py-4 border-b border-gray-50">
                <div className="text-[14px] font-medium text-gray-600 w-24 flex-shrink-0">
                  <span className="text-[#ff5e5e] mr-1">*</span>真实姓名
                </div>
                <input 
                    type="text" 
                    className="flex-1 text-right text-[14px] text-gray-900 font-medium placeholder:text-gray-300 outline-none"
                    placeholder="根据身份证姓名自动带入"
                    value={formData.realName}
                    onChange={(e) => setFormData({...formData, realName: e.target.value})}
                />
             </div>
             
             <InfoRow label="身份证号码" value={formData.idNumber} placeholder="根据身份证姓名自动带入" />
        </div>

        {/* Phone & SMS */}
        <div className="bg-white px-4">
             <div className="pt-4 pb-2">
                <h2 className="text-[15px] font-bold text-gray-900">短信验证</h2>
             </div>
             
             {/* Phone Input Row */}
             <div className="flex items-center justify-between py-4 border-b border-gray-50">
                <div className="text-[14px] font-medium text-gray-600 w-24 flex-shrink-0">
                  <span className="text-[#ff5e5e] mr-1">*</span>手机号码
                </div>
                <input 
                    type="tel" 
                    className="flex-1 text-right text-[14px] text-gray-900 font-medium placeholder:text-gray-300 outline-none"
                    placeholder="请输入手机号码"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                />
             </div>

             {/* Auto Fill Hint */}
             <div className="flex items-center justify-end gap-1 py-3 border-b border-gray-50">
                <span className="text-[11px] text-[#999]">
                  会员手机号：{(memberPhone || '15895740320').replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')}，
                </span>
                <button 
                    onClick={() => setFormData(prev => ({...prev, phone: formatPhoneNumber(memberPhone || '15895740320')}))} 
                    className="text-blue-500 text-[11px] font-medium"
                >
                    自动带入
                </button>
             </div>

             {/* Verify Code Row */}
             <div className="flex items-center justify-between py-4 border-b border-gray-50">
                <div className="text-[14px] font-medium text-gray-600 w-24 flex-shrink-0">
                  <span className="text-[#ff5e5e] mr-1">*</span>验证码
                </div>
                <div className="flex-1 flex items-center justify-end">
                    <input 
                        type="text" 
                        className="w-full text-right text-[14px] text-gray-900 font-medium placeholder:text-gray-300 outline-none mr-3"
                        placeholder="请输入验证码"
                        value={formData.verifyCode}
                        onChange={(e) => setFormData({...formData, verifyCode: e.target.value})}
                    />
                    <div className="w-px h-4 bg-gray-200 mx-2"></div>
                    <button 
                        onClick={handleSendCode}
                        disabled={countdown > 0}
                        className={`text-[13px] font-medium whitespace-nowrap ${countdown > 0 ? 'text-gray-400' : 'text-[#a66a3d]'}`}
                    >
                        {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
                    </button>
                </div>
             </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f7f8fa] px-4 pt-2 pb-6 max-w-md mx-auto z-50 flex flex-col gap-3">
         <div className="flex items-center gap-4 w-full">
             <button 
                onClick={onBack} 
                className="flex-1 bg-white border border-gray-200 text-[#333] font-bold py-3.5 rounded-lg text-[15px] active:bg-gray-50 transition-colors"
             >
                返回
             </button>
             <button 
                onClick={handleSubmit} 
                className="flex-1 bg-[#111111] text-white font-bold py-3.5 rounded-lg text-[15px] active:opacity-90 transition-opacity"
             >
                立即提交认证
             </button>
         </div>
         
         <div className="flex items-center justify-center gap-1.5 opacity-50">
            <Shield className="w-3 h-3 text-[#333]" strokeWidth={2} />
            <span className="text-[10px] text-[#333] font-medium tracking-wide">认证技术由 法大大 提供安全支持</span>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            <div className="bg-white w-full max-w-xs rounded-2xl p-6 relative animate-in zoom-in-95 duration-200 flex flex-col items-center shadow-2xl">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" strokeWidth={3} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">认证通过</h3>
                <p className="text-sm text-gray-500 text-center leading-relaxed">
                    会员实名信息校验成功<br/>已完成实名认证
                </p>
            </div>
        </div>
      )}
    </div>
  );
};