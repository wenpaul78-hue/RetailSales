import React from 'react';
import { ChevronLeft, MoreHorizontal, Disc, Share2, Download } from 'lucide-react';

interface MemberSelfRegistrationPageProps {
  onBack: () => void;
  shopName?: string;
}

export const MemberSelfRegistrationPage: React.FC<MemberSelfRegistrationPageProps> = ({ 
  onBack, 
  shopName = '吉嘉名品汇嘉定店' 
}) => {
  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 relative">
        <button onClick={onBack} className="p-1 -ml-2 rounded-full hover:bg-gray-100 transition-colors z-10">
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-[17px] font-medium text-gray-900 absolute left-0 right-0 text-center pointer-events-none">会员自助实名认证</h1>
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

      <div className="p-6 flex-1 flex flex-col items-center justify-center">
        {/* Main Card */}
        <div className="w-full bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col items-center">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">扫码自助认证</h2>
            <p className="text-sm text-gray-500">{shopName}</p>
          </div>

          {/* QR Code Container */}
          <div className="w-64 h-64 bg-white p-4 border border-gray-100 rounded-2xl shadow-inner mb-8 flex items-center justify-center relative">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://reg.jjmp.com/self-register?shop=jiading`} 
              alt="Registration QR Code" 
              className="w-full h-full object-contain"
            />
            {/* Corner decorations for scanner look */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-blue-500 rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-blue-500 rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-blue-500 rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-blue-500 rounded-br-lg"></div>
          </div>

          <div className="space-y-4 w-full">
            <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <p className="text-xs text-blue-700 leading-relaxed">
                请提示会员使用微信或系统自带相机扫描上方二维码，按提示完成实名信息填写。
              </p>
            </div>
          </div>
        </div>

        {/* Share Hint */}
        <div className="mt-8 flex items-center text-gray-400 text-sm gap-2">
            <Share2 className="w-4 h-4" />
            <span>支持长按图片保存或直接发送给会员</span>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f7f8fa] p-4 max-w-md mx-auto flex items-center gap-4 z-50">
        <button 
          className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-xl text-[15px] active:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          保存图片
        </button>
        <button 
          className="flex-1 bg-[#111111] text-white font-bold py-4 rounded-xl text-[15px] active:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          分享二维码
        </button>
      </div>
    </div>
  );
};