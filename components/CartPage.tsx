import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, SquarePen, Trash2, AlertTriangle } from 'lucide-react';
import { Product } from '../types';

interface CartPageProps {
  onBack: () => void;
  onCheckout: (items: Product[]) => void;
  cartItems: Product[];
  onUpdateCart: (items: Product[]) => void;
}

interface CartItemRowProps {
  item: Product;
  index: number;
  isSelected: boolean;
  onToggle: (index: number) => void;
  onEdit: (index: number) => void;
  onDeleteClick: (id: string) => void;
  isOpen: boolean;
  setOpenId: (id: string | null) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ 
  item, 
  index, 
  isSelected, 
  onToggle, 
  onEdit, 
  onDeleteClick, 
  isOpen, 
  setOpenId 
}) => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const rowRef = useRef<HTMLDivElement>(null);

  const DELETE_BTN_WIDTH = 80;

  useEffect(() => {
    if (isOpen) {
      setCurrentOffset(-DELETE_BTN_WIDTH);
    } else {
      setCurrentOffset(0);
    }
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || touchStartX.current === null || touchStartY.current === null) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    if (Math.abs(deltaY) > Math.abs(deltaX)) return; 

    const startOffset = isOpen ? -DELETE_BTN_WIDTH : 0;
    let newOffset = startOffset + deltaX;

    if (newOffset > 0) newOffset = 0;
    if (newOffset < -DELETE_BTN_WIDTH * 1.2) newOffset = -DELETE_BTN_WIDTH * 1.2;

    setCurrentOffset(newOffset);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    touchStartX.current = null;
    touchStartY.current = null;

    if (currentOffset < -DELETE_BTN_WIDTH / 2) {
      setOpenId(item.id); 
      setCurrentOffset(-DELETE_BTN_WIDTH); 
    } else {
      setOpenId(null);
      setCurrentOffset(0);
    }
  };

  return (
    <div className="relative mb-3 h-28" ref={rowRef}>
        {/* Swipe Delete Button Background */}
        <div 
            className="absolute right-0 top-0 bottom-0 bg-[#ff5e5e] flex items-center justify-center text-white font-medium rounded-r-xl z-0 active:bg-red-600 transition-colors cursor-pointer"
            style={{ width: `${DELETE_BTN_WIDTH}px` }}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(item.id);
            }}
        >
            删除
        </div>

        {/* Swipeable Content Card */}
        <div 
            className="bg-white rounded-xl p-3 flex items-center shadow-sm border border-gray-100 relative z-10 h-full w-full"
            style={{ 
              transform: `translateX(${currentOffset}px)`,
              transition: isDragging.current ? 'none' : 'transform 0.2s ease-out'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Checkbox */}
            <button 
              className="mr-3 p-1 flex-shrink-0"
              onClick={(e) => {
                  e.stopPropagation(); 
                  onToggle(index);
              }}
            >
              <div className={`w-5 h-5 rounded-full border ${isSelected ? 'bg-red-500 border-red-500' : 'border-gray-300'}`}>
                {isSelected && (
                   <svg className="w-full h-full text-white p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                   </svg>
                )}
              </div>
            </button>

            {/* Product Image */}
            <div className="w-20 h-20 bg-amber-50 rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
              <img src={item.imageUrl} alt="" className="w-full h-full object-contain mix-blend-multiply" />
            </div>

            {/* Product Info */}
            <div className="ml-3 flex-1 flex flex-col justify-between h-20 py-1">
              <div>
                <div className="text-xs text-gray-800 leading-4 line-clamp-2 font-medium">
                  <span className="inline-block bg-black text-white text-[10px] px-1 rounded-[2px] mr-1 align-middle leading-4">
                    {item.condition}
                  </span>
                  <span className="align-middle">
                    {item.title}
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 mt-1 font-mono">
                  唯一码：{item.uniqueCode || item.id}
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-1.5">
                    {item.price > 0 ? (
                      <div className="text-red-500 font-bold text-lg leading-none">
                          <span className="text-xs mr-0.5">¥</span>
                          {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    ) : (
                      <div className="text-red-500 font-bold text-sm leading-none">面议</div>
                    )}
                    {/* Repositioned Edit Button */}
                    <button 
                        className="text-gray-400 hover:text-blue-500 active:scale-110 transition-transform p-1"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(index);
                        }}
                    >
                        <SquarePen className="w-3.5 h-3.5" />
                    </button>
                </div>
                
                {/* New Delete Button at original position */}
                <button 
                  className="text-gray-300 hover:text-red-500 p-1 -mr-1 active:scale-110 transition-all"
                  onClick={(e) => {
                      e.stopPropagation();
                      onDeleteClick(item.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
        </div>
    </div>
  );
};

export const CartPage: React.FC<CartPageProps> = ({ onBack, onCheckout, cartItems, onUpdateCart }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]); 
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [inputPrice, setInputPrice] = useState<string>('');

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleItem = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(i => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const toggleAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((_, i) => i));
    }
  };

  const confirmDelete = () => {
    if (!deletingId) return;
    const itemIndex = cartItems.findIndex(i => i.id === deletingId);
    if (itemIndex > -1) {
        const newItems = cartItems.filter(i => i.id !== deletingId);
        onUpdateCart(newItems);
        setSelectedItems(selectedItems.filter(i => i !== itemIndex).map(i => i > itemIndex ? i - 1 : i));
    }
    setDeletingId(null);
    setOpenRowId(null);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setInputPrice(cartItems[index].price.toString()); 
    setOpenRowId(null);
  };

  const handleConfirmEdit = () => {
    if (editingIndex !== null && inputPrice.trim() !== '') {
      const newPrice = parseFloat(inputPrice);
      if (!isNaN(newPrice)) {
        const newItems = [...cartItems];
        newItems[editingIndex] = { ...newItems[editingIndex], price: newPrice };
        onUpdateCart(newItems);
      }
    }
    setEditingIndex(null);
  };
  
  const totalPrice = cartItems
    .filter((_, idx) => selectedItems.includes(idx))
    .reduce((sum, item) => sum + item.price, 0);

  const handleCheckoutClick = () => {
    const itemsToCheckout = cartItems.filter((_, idx) => selectedItems.includes(idx));
    onCheckout(itemsToCheckout);
  };

  const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  return (
    <div className="flex flex-col h-screen bg-[#f5f5f5] relative">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-40 relative">
        <button 
          onClick={onBack}
          className="p-1 -ml-2 rounded-full hover:bg-black/5 transition-colors z-10"
        >
          <ChevronLeft className="w-7 h-7 text-gray-800" strokeWidth={2} />
        </button>
        
        <h1 className="text-lg font-medium text-gray-900 absolute left-0 right-0 text-center pointer-events-none">购物袋</h1>
        
        <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm z-10">
          <button className="p-1">
            <MoreHorizontal className="w-5 h-5 text-gray-800" />
          </button>
          <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
          <button className="p-1">
            <Disc className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </header>

      {/* Cart Items List */}
      <div 
        className="flex-1 overflow-y-auto p-4 pb-24"
        onClick={() => setOpenRowId(null)}
      >
        {cartItems.map((item, index) => (
          <CartItemRow
            key={item.id}
            item={item}
            index={index}
            isSelected={selectedItems.includes(index)}
            onToggle={toggleItem}
            onEdit={handleEditClick}
            onDeleteClick={(id) => setDeletingId(id)}
            isOpen={openRowId === item.id}
            setOpenId={(id) => setOpenRowId(id === openRowId ? null : id)}
          />
        ))}
        {cartItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <p>购物袋是空的</p>
            </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white border-t border-gray-100 p-3 pb-8 fixed bottom-0 left-0 right-0 max-w-md mx-auto flex items-center justify-between z-40">
        <button 
          className="flex items-center space-x-2 pl-2"
          onClick={toggleAll}
        >
          <div className={`w-5 h-5 rounded-full border ${isAllSelected ? 'bg-red-500 border-red-500' : 'border-gray-300'}`}>
             {isAllSelected && (
                 <svg className="w-full h-full text-white p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                 </svg>
             )}
          </div>
          <span className="text-sm text-gray-600">全选</span>
        </button>

        <div className="flex items-center gap-3">
            <div className="text-right">
                <div className="text-xs text-gray-400">共{selectedItems.length}件</div>
                <div className="text-sm font-medium">
                   合计: <span className="text-red-500 font-bold text-lg">¥{totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>
            <button 
                onClick={handleCheckoutClick}
                disabled={selectedItems.length === 0}
                className={`text-white font-medium px-6 py-2 rounded-full transition-colors ${
                    selectedItems.length > 0 ? 'bg-[#ff5e5e] hover:bg-red-600 shadow-md shadow-red-200' : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              结算
            </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={() => setDeletingId(null)}></div>
            <div className="bg-white w-full max-w-xs rounded-2xl p-6 relative animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">确认移除商品?</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        移除后该商品将不在购物袋中显示。
                    </p>
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={() => setDeletingId(null)}
                            className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-xl text-sm active:bg-gray-50"
                        >
                            取消
                        </button>
                        <button 
                            onClick={confirmDelete}
                            className="flex-1 py-2.5 bg-red-500 text-white font-bold rounded-xl text-sm active:opacity-90 shadow-md"
                        >
                            确认移除
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Edit Price Modal Overlay */}
      {editingIndex !== null && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-8 backdrop-blur-[1px]">
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">修改销售价格</h3>
              
              <div className="flex items-baseline border-b border-gray-200 pb-2 mb-8">
                <span className="text-2xl font-bold text-gray-800 mr-2">¥</span>
                <input 
                  type="number"
                  value={inputPrice}
                  onChange={(e) => setInputPrice(e.target.value)}
                  placeholder="请输入销售金额"
                  className="flex-1 text-2xl font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none bg-transparent"
                  autoFocus
                />
                <span className="text-lg text-gray-600 ml-2">元</span>
              </div>
              
              <button 
                onClick={handleConfirmEdit}
                className="w-full bg-[#ff5e5e] text-white text-lg font-medium py-3 rounded-lg hover:bg-red-500 active:bg-red-600 transition-colors shadow-sm shadow-red-200"
              >
                确 定
              </button>
            </div>
            
            <div className="absolute inset-0 -z-10" onClick={() => setEditingIndex(null)}></div>
          </div>
        </>
      )}
    </div>
  );
};