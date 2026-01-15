import React from 'react';
import { 
  User, MoreHorizontal, ChevronDown, 
  Smartphone, Tag, 
  ClipboardList, FileSearch, PackagePlus, RotateCcw, 
  ShoppingBag, Wrench, Undo2, 
  Crown, Warehouse, Calculator, Receipt,
  Home, MessageSquare, Wallet, FileText
} from 'lucide-react';

interface DashboardPageProps {
  onNavigateToProductList: () => void;
  onNavigateToOrderList: () => void;
  onNavigateToMemberManagement: () => void;
  onNavigateToReturnOrderList: () => void;
  onNavigateToMessageCenter: () => void;
  onNavigateToSelfServiceInvoicing: () => void; // New Prop
}

const MenuItem = ({ icon: Icon, label, colorClass, onClick }: { icon: any, label: string, colorClass: string, onClick?: () => void }) => (
  <div className="flex flex-col items-center gap-2 cursor-pointer active:opacity-70 transition-opacity" onClick={onClick}>
    <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center text-white shadow-sm`}>
      <Icon className="w-6 h-6" strokeWidth={2} />
    </div>
    <span className="text-xs font-medium text-gray-600">{label}</span>
  </div>
);

export const DashboardPage: React.FC<DashboardPageProps> = ({ 
  onNavigateToProductList, 
  onNavigateToOrderList, 
  onNavigateToMemberManagement,
  onNavigateToReturnOrderList,
  onNavigateToMessageCenter,
  onNavigateToSelfServiceInvoicing
}) => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col relative pb-20">
      {/* Top Dark Section */}
      <div className="bg-[#1a1c29] text-white pt-12 pb-24 px-4 rounded-b-[2.5rem] relative z-0">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-gray-300">二手合规通</span>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20">
                <MoreHorizontal className="w-5 h-5" />
             </button>
             <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20">
                <User className="w-5 h-5" />
             </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
           <h1 className="text-2xl font-bold tracking-wide">上海旗舰店</h1>
           <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Hero Action Cards - Floating */}
      <div className="px-4 -mt-16 relative z-10 flex gap-4 mb-6">
          <div className="flex-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-4 shadow-lg shadow-blue-200 text-white relative overflow-hidden cursor-pointer active:scale-95 transition-transform">
             <div className="relative z-10">
                 <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3 backdrop-blur-sm">
                    <Smartphone className="w-6 h-6 text-white" />
                 </div>
                 <div className="text-[10px] opacity-80 font-bold tracking-wider mb-0.5">DEVICE ENTRY</div>
                 <div className="text-lg font-bold">去回收</div>
             </div>
             <div className="absolute right-3 top-4 opacity-50">
                 <div className="w-12 h-12 rounded-full border-4 border-white/20"></div>
             </div>
             <div className="absolute right-4 bottom-4">
                 <ChevronDown className="w-5 h-5 -rotate-90" />
             </div>
          </div>

          <div className="flex-1 bg-gradient-to-br from-[#ff7e7e] to-[#ff5e5e] rounded-2xl p-4 shadow-lg shadow-red-200 text-white relative overflow-hidden cursor-pointer active:scale-95 transition-transform" onClick={onNavigateToProductList}>
             <div className="relative z-10">
                 <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3 backdrop-blur-sm">
                    <Tag className="w-6 h-6 text-white" />
                 </div>
                 <div className="text-[10px] opacity-80 font-bold tracking-wider mb-0.5">SALES OUT</div>
                 <div className="text-lg font-bold">去销售</div>
             </div>
             <div className="absolute right-3 top-4 opacity-50">
                 <div className="w-12 h-12 rounded-full border-4 border-white/20"></div>
             </div>
             <div className="absolute right-4 bottom-4">
                 <ChevronDown className="w-5 h-5 -rotate-90" />
             </div>
          </div>
      </div>

      <div className="flex-1 px-4 space-y-6 overflow-y-auto no-scrollbar">
          <div>
              <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-[#1a1c29] rounded-full"></div>
                  <h3 className="font-bold text-gray-800">采购回收</h3>
              </div>
              <div className="bg-white rounded-2xl p-5 grid grid-cols-4 gap-4 shadow-sm">
                  <MenuItem icon={ClipboardList} label="收件订单" colorClass="bg-blue-400" />
                  <MenuItem icon={FileSearch} label="回收鉴定" colorClass="bg-emerald-400" />
                  <MenuItem icon={PackagePlus} label="商品入库" colorClass="bg-violet-400" />
                  <MenuItem icon={RotateCcw} label="收件退货" colorClass="bg-rose-400" />
              </div>
          </div>

          <div>
              <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-[#1a1c29] rounded-full"></div>
                  <h3 className="font-bold text-gray-800">销售模块</h3>
              </div>
              <div className="bg-white rounded-2xl p-5 grid grid-cols-4 gap-4 shadow-sm">
                  <MenuItem 
                      icon={ShoppingBag} 
                      label="在售商品" 
                      colorClass="bg-amber-400" 
                      onClick={onNavigateToProductList}
                  />
                  <MenuItem 
                      icon={ClipboardList} 
                      label="销售订单" 
                      colorClass="bg-red-400" 
                      onClick={onNavigateToOrderList}
                  />
                  <MenuItem icon={Wrench} label="维修保养" colorClass="bg-slate-500" />
                  <MenuItem 
                      icon={Undo2} 
                      label="销售退货" 
                      colorClass="bg-pink-400" 
                      onClick={onNavigateToReturnOrderList}
                  />
              </div>
          </div>

          <div>
              <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-[#1a1c29] rounded-full"></div>
                  <h3 className="font-bold text-gray-800">店铺管理</h3>
              </div>
              <div className="bg-white rounded-2xl p-5 grid grid-cols-4 gap-y-6 gap-x-4 shadow-sm mb-4">
                  <MenuItem 
                    icon={Crown} 
                    label="会员管理" 
                    colorClass="bg-purple-400" 
                    onClick={onNavigateToMemberManagement}
                  />
                  <MenuItem icon={Warehouse} label="仓库管理" colorClass="bg-pink-400" />
                  <MenuItem icon={Calculator} label="结算中心" colorClass="bg-cyan-400" />
                  <MenuItem 
                    icon={Receipt} 
                    label="自助开票" 
                    colorClass="bg-fuchsia-400" 
                    onClick={onNavigateToSelfServiceInvoicing}
                  />
                  <MenuItem icon={FileText} label="开票管理" colorClass="bg-indigo-400" />
                  <MenuItem icon={Wallet} label="商户钱包" colorClass="bg-orange-400" />
              </div>
          </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 max-w-md mx-auto">
          <div className="flex flex-col items-center gap-1 cursor-pointer">
              <Home className="w-6 h-6 text-blue-500" strokeWidth={2.5} />
              <span className="text-[10px] font-bold text-blue-500">首页</span>
          </div>
          <div 
            className="flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={onNavigateToMessageCenter}
          >
              <div className="relative">
                  <MessageSquare className="w-6 h-6" />
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
              </div>
              <span className="text-[10px] font-medium">消息</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-gray-600">
              <User className="w-6 h-6" />
              <span className="text-[10px] font-medium">我的</span>
          </div>
      </div>
    </div>
  );
};