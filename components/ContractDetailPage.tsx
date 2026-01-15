import React from 'react';
import { ChevronLeft, MoreHorizontal, Disc, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { Settlement } from '../types';

interface ContractDetailPageProps {
  order: Settlement;
  onBack: () => void;
}

export const ContractDetailPage: React.FC<ContractDetailPageProps> = ({ order, onBack }) => {
  // Mock Merchant Data (Party A)
  const partyA = {
    name: 'XXXX供应链企业',
    phone: '137****3456',
    status: '已签署'
  };

  // Party B from Order
  const partyB = {
    name: order.member.name,
    phone: order.member.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    status: '已签署' 
  };

  const contractId = `H-${order.salesOrderId.replace(/[^0-9]/g, '').slice(0, 12)}`;
  const contractName = '二手物品回收服务协议V1.2'; // Matching image mock text

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col relative pb-24">
      {/* Header - Matches the light blue background of the top section */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#dbebff] sticky top-0 z-50">
        <button
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-black/5 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2 opacity-0">合同详情</h1> {/* Hidden title for layout balance */}

        <div className="flex items-center space-x-1 bg-white/60 rounded-full px-2 py-1 shadow-sm border border-white/50">
          <button className="p-1">
            <MoreHorizontal className="w-5 h-5 text-gray-800" />
          </button>
          <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
          <button className="p-1">
            <Disc className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </header>

      {/* Top Blue Background Section */}
      <div className="bg-[#dbebff] px-6 pb-28 pt-2">
          <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <div className="bg-[#8ec8f6] text-white text-xs px-2 py-0.5 rounded font-medium">
                  已生效
              </div>
          </div>
          <div className="text-sm text-gray-600 pl-7">
              剩余签署时间：长期
          </div>
      </div>

      {/* Main Content Card - Overlapping the blue background */}
      <div className="px-4 -mt-20 flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[450px] flex flex-col items-center">
              <div className="text-lg font-bold text-gray-900 mb-2">{contractId}</div>
              <div className="text-sm text-gray-600 mb-10">{contractName}</div>

              {/* Illustration Placeholder */}
              <div className="w-full h-32 mb-10 flex items-center justify-center relative">
                  {/* Decorative background shape */}
                  <div className="absolute inset-0 bg-teal-50 rounded-full scale-y-50 scale-x-110 opacity-50 translate-y-4"></div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/10609/10609539.png" // Placeholder for contract signing illustration
                    alt="Contract Illustration"
                    className="h-full object-contain z-10 opacity-90"
                  />
                  {/* Decorative elements simulating the image provided */}
                  <div className="absolute left-4 top-1/2 w-2 h-2 bg-teal-200 rounded-full"></div>
                  <div className="absolute right-8 top-1/3 w-3 h-3 bg-teal-300 rounded-full opacity-60"></div>
              </div>

              {/* Party A Info */}
              <div className="w-full mb-6 bg-[#f9fafb] p-3 rounded-lg border border-gray-50">
                  <div className="flex justify-between items-center mb-2">
                      <div className="bg-[#eac545] text-white text-[10px] px-2 py-0.5 rounded-sm font-medium">甲方</div>
                      <span className="text-xs text-gray-500">{partyA.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-800 font-medium pl-1">
                      <span className="truncate mr-2">{partyA.name}</span>
                      <span className="text-gray-600 font-normal text-xs whitespace-nowrap">| {partyA.phone}</span>
                  </div>
              </div>

              <div className="w-full h-px bg-gray-100 mb-6"></div>

              {/* Party B Info */}
              <div className="w-full bg-[#f9fafb] p-3 rounded-lg border border-gray-50">
                  <div className="flex justify-between items-center mb-2">
                      <div className="bg-[#2bbbad] text-white text-[10px] px-2 py-0.5 rounded-sm font-medium">乙方</div>
                      <span className="text-xs text-gray-500">{partyB.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-800 font-medium pl-1">
                      <span className="truncate mr-2">{partyB.name}</span>
                      <span className="text-gray-600 font-normal text-xs whitespace-nowrap">| {partyB.phone}</span>
                  </div>
                  {/* If not signed, a button would appear here, but we are in signed state */}
              </div>
          </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-4 max-w-md mx-auto z-50 safe-area-bottom">
          <button className="flex-1 py-3 bg-[#38b4a2] text-white rounded-md text-sm font-medium active:opacity-90 shadow-md shadow-teal-100/50 transition-opacity">
              更多操作
          </button>
          <button className="flex-1 py-3 bg-[#38b4a2] text-white rounded-md text-sm font-medium active:opacity-90 shadow-md shadow-teal-100/50 transition-opacity">
              查看合同
          </button>
      </div>
    </div>
  );
};
