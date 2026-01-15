import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, Camera, Info, FileText, Eye, CheckCircle2, XCircle, Send, Edit3, Check, X, Plus } from 'lucide-react';
import { Settlement } from '../types';

interface ContractUploadPageProps {
  order: Settlement;
  onBack: () => void;
  onComplete: () => void;
}

const StepHeader = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-5 h-5 rounded-full bg-[#00b578] text-white flex items-center justify-center text-xs font-bold shadow-sm">
      {number}
    </div>
    <span className="font-bold text-gray-900 text-[15px]">{title}</span>
  </div>
);

const DemoThumbnail = ({ label, type, isValid }: { label: string; type: 'standard' | 'blur' | 'dark' | 'incomplete'; isValid: boolean }) => {
    let bgClass = 'bg-[#f0f9f6]'; // default light green
    let icon = <div className="absolute bottom-1 right-1 bg-[#00b578] rounded-full p-0.5"><Check className="w-2 h-2 text-white" strokeWidth={4} /></div>;
    
    if (!isValid) {
        bgClass = 'bg-[#f5f7fa]'; // gray
        icon = <div className="absolute bottom-1 right-1 bg-[#ff5e5e] rounded-full p-0.5"><X className="w-2 h-2 text-white" strokeWidth={4} /></div>;
    }

    return (
        <div className="flex flex-col items-center gap-2 flex-1">
            <div className={`w-full aspect-square rounded-lg ${bgClass} border border-gray-100 relative flex items-center justify-center overflow-hidden`}>
                {/* Mock Content inside thumbnail */}
                <div className="w-8 h-10 bg-white shadow-sm border border-gray-200"></div>
                {type === 'blur' && <div className="absolute inset-0 backdrop-blur-[2px]"></div>}
                {type === 'dark' && <div className="absolute inset-0 bg-black/20"></div>}
                {type === 'incomplete' && <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rotate-45 translate-y-3 translate-x-3"></div>}
                
                {icon}
            </div>
            <span className="text-[10px] text-gray-500">{label}</span>
        </div>
    );
};

export const ContractUploadPage: React.FC<ContractUploadPageProps> = ({ order, onBack, onComplete }) => {
  const [images, setImages] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleUpload = () => {
    // Mock image upload
    const mockImg = "https://images.unsplash.com/photo-1586282391129-56a991fdffe3?q=80&w=400&auto=format&fit=crop";
    if (images.length < 9) {
        setImages([...images, mockImg]);
    }
  };

  const handleRemoveImage = (index: number) => {
      setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
      setShowToast(true);
      // Delay to show the success message before navigating
      setTimeout(() => {
          setShowToast(false);
          onComplete();
      }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col pb-24 relative">
       {/* Header */}
       <header className="flex items-center justify-between px-4 py-3 bg-[#eef6ff] sticky top-0 z-50">
        <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-black/5 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">合同详情</h1>
        
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded-full bg-white/60">
            <MoreHorizontal className="w-5 h-5 text-gray-800" />
          </button>
          <button className="p-1 rounded-full bg-white/60">
            <Disc className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 p-3">
          
          {/* Step 1: Download */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
              <StepHeader number="1" title="下载打印模版" />
              
              {/* Hint */}
              <div className="bg-[#eef9fe] rounded-lg p-3 flex items-start gap-2 mb-4">
                  <Info className="w-4 h-4 text-[#2b85ff] mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-[#2b85ff] leading-relaxed">提示：推荐使用 <span className="font-bold">A4纸</span> 打印，保持页面整洁。</span>
              </div>

              {/* Email Input */}
              <div className="bg-[#f7f8fa] p-3 rounded-lg mb-4">
                  <div className="text-xs text-gray-500 mb-2">将模版发送至邮箱，在电脑端下载打印。</div>
                  <div className="flex gap-2">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="请输入邮箱地址"
                        className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#00b578]"
                      />
                      <button className="bg-[#00b578] text-white px-4 py-1.5 rounded text-sm font-medium active:opacity-90 flex items-center gap-1">
                          <Send className="w-3.5 h-3.5" /> 发送
                      </button>
                  </div>
              </div>

              {/* Preview */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>或在手机上预览:</span>
              </div>
              <div className="bg-[#f2f7ff] border border-[#e1eaff] rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700">销售合同.DOCX</span>
                  </div>
                  <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm active:bg-gray-50">
                      <Eye className="w-3.5 h-3.5" /> 预览
                  </button>
              </div>
          </div>

          {/* Step 2: Signing Instructions */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
              <StepHeader number="2" title="线下完成签署" />
              
              <div className="space-y-4 px-1">
                  <div className="flex gap-3">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Edit3 className="w-4 h-4 text-[#ff9f2e]" />
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">
                          请在打印出的合同文件上，完成<span className="text-[#ff9f2e]">手写签名或加盖公章</span>。
                      </p>
                  </div>
                  <div className="h-px bg-gray-50 ml-8"></div>
                  <div className="flex gap-3">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-[#00b578]" />
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">
                          请仔细检查，确保所有<span className="text-[#00b578]">必填项</span>（如日期、金额）都已填写完整。
                      </p>
                  </div>
              </div>
          </div>

          {/* Step 3: Upload */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <StepHeader number="3" title="拍照上传文件" />
              
              {/* Photo Demo */}
              <div className="bg-[#f7f8fa] rounded-lg p-3 mb-4">
                  <div className="text-xs font-bold text-gray-900 mb-3">拍照示范:</div>
                  <div className="flex gap-2 mb-3">
                      <DemoThumbnail label="标准" type="standard" isValid={true} />
                      <DemoThumbnail label="模糊" type="blur" isValid={false} />
                      <DemoThumbnail label="光线暗" type="dark" isValid={false} />
                      <DemoThumbnail label="不完整" type="incomplete" isValid={false} />
                  </div>
                  <div className="text-[10px] text-gray-400">
                      请确保文件边角完整，文字清晰可读，无反光或阴影。
                  </div>
              </div>

              {/* Upload Area */}
              <div>
                  <div className="flex items-center gap-1 mb-2">
                      <span className="text-[#ff5e5e] font-bold">*</span>
                      <span className="text-sm font-bold text-gray-900">销售合同</span>
                  </div>
                  
                  {images.length === 0 ? (
                      <div 
                        onClick={handleUpload}
                        className="w-full aspect-[2/1] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center gap-2 cursor-pointer active:bg-gray-100 transition-colors"
                      >
                          <Camera className="w-8 h-8 text-[#00b578]" />
                          <div className="text-xs font-bold text-gray-600">点击拍摄 / 上传</div>
                          <div className="text-[10px] text-gray-400">请上传签署后的销售合同（支持多页）</div>
                      </div>
                  ) : (
                      <div className="grid grid-cols-3 gap-3">
                          {images.map((img, idx) => (
                              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                  <img src={img} className="w-full h-full object-cover" alt="contract" />
                                  <button 
                                    onClick={() => handleRemoveImage(idx)}
                                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center"
                                  >
                                      <X className="w-3 h-3 text-white" />
                                  </button>
                              </div>
                          ))}
                          {images.length < 9 && (
                              <button 
                                onClick={handleUpload}
                                className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-1 active:bg-gray-50"
                              >
                                  <Plus className="w-6 h-6" />
                                  <span className="text-xs">添加</span>
                              </button>
                          )}
                      </div>
                  )}
              </div>
          </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 max-w-md mx-auto z-50 safe-area-bottom">
         <button 
            onClick={handleSubmit}
            disabled={images.length === 0}
            className={`w-full py-3.5 rounded-full font-bold text-sm shadow-sm transition-all text-center ${
                images.length > 0 
                ? 'bg-[#d1f5ea] text-[#00b578] active:bg-[#bbf0df]' 
                : 'bg-[#e5e7eb] text-white cursor-not-allowed'
            }`}
         >
            {images.length > 0 ? '完成并提交' : '请完成必填项'}
         </button>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none px-6">
          <div className="bg-black/80 text-white px-6 py-5 rounded-2xl backdrop-blur-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center gap-3 min-w-[160px]">
            <div className="w-12 h-12 bg-[#00b578] rounded-full flex items-center justify-center mb-1">
                <Check className="w-7 h-7 text-white" strokeWidth={3} />
            </div>
            <div className="text-center">
                <div className="text-base font-bold mb-1">合同签署环节完成</div>
                <div className="text-xs text-white/70">正在接入结算单详情...</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};