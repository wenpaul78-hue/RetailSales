import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Disc, ShoppingBag, ShieldCheck, Info, Check } from 'lucide-react';
import { Product } from '../types';
import { BRAND_DATA } from '../constants';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onGoToCart: () => void;
}

const FAQItem = ({ title, content }: { title: string; content: string }) => (
  <div className="mb-5 last:mb-0">
    <h4 className="text-sm font-bold text-gray-900 mb-1.5">{title}</h4>
    <p className="text-xs text-gray-500 leading-relaxed text-justify tracking-wide">{content}</p>
  </div>
);

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  product, 
  onBack,
  onAddToCart,
  onBuyNow,
  onGoToCart
}) => {
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [priceInputValue, setPriceInputValue] = useState('');
  const [actionType, setActionType] = useState<'cart' | 'buy' | null>(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Calculate discount logic
  const hasPublicPrice = product.publicPrice && product.publicPrice > 0;
  // Calculate "Zhe" (discount out of 10)
  // Only calculate if price > 0
  const discountRate = (hasPublicPrice && product.price > 0)
    ? (product.price / product.publicPrice!) * 10 
    : 10;
  
  // Show discount only if price exists and discount is significant (< 9.9)
  const showDiscount = hasPublicPrice && product.price > 0 && discountRate < 9.9;
  const discountText = showDiscount ? `${discountRate.toFixed(1)}折` : '';

  // Get Brand Logo
  let brandLogo = '';
  Object.values(BRAND_DATA).flat().forEach(b => {
      if (b.name.toLowerCase() === product.brand.toLowerCase()) {
          brandLogo = b.logo;
      }
  });

  const handleOpenPriceModal = (type: 'cart' | 'buy') => {
      setActionType(type);
      setPriceInputValue('');
      setIsPriceModalOpen(true);
  };

  const handleAutoFill = () => {
      if (product.price > 0) {
        setPriceInputValue(product.price.toString());
      }
  };

  const handleConfirmPrice = () => {
      const price = parseFloat(priceInputValue);
      if (isNaN(price)) return;

      const updatedProduct = { ...product, price };
      
      if (actionType === 'cart') {
          onAddToCart(updatedProduct);
          setIsAddedToCart(true);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
      } else if (actionType === 'buy') {
          onBuyNow(updatedProduct);
      }
      
      setIsPriceModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col pb-20 relative">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 border-b border-gray-100 relative">
        <button 
          onClick={onBack}
          className="p-1 -ml-2 rounded-full hover:bg-black/5 transition-colors z-10"
        >
          <ChevronLeft className="w-7 h-7 text-gray-800" strokeWidth={2} />
        </button>
        
        <h1 className="text-lg font-bold text-gray-900 absolute left-0 right-0 text-center pointer-events-none">商品详情</h1>
        
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

      {/* Content Scroll View */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        
        {/* Product Main Image (Top) */}
        <div className="w-full aspect-square bg-white flex items-center justify-center relative overflow-hidden mb-2">
            <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-contain mix-blend-multiply"
            />
            {/* Simulated Tag Dots */}
            <div className="absolute top-1/4 right-1/4 flex items-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full shadow-md border-2 border-gray-200 animate-pulse"></div>
                <div className="bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded ml-1 backdrop-blur-sm">
                    {product.brand}
                </div>
            </div>
             <div className="absolute px-2 py-0.5 bg-black/40 text-white text-xs rounded-full right-3 bottom-3">
                1/6
            </div>
        </div>

        {/* Price & Title Card */}
        <div className="bg-white px-4 py-4 mb-2">
            {/* Price Row */}
            <div className="flex items-end justify-between mb-2">
                <div className="flex items-baseline flex-wrap gap-2">
                    {product.price > 0 ? (
                        <div className="text-[#ff5e5e] font-bold text-3xl font-mono leading-none">
                            <span className="text-lg mr-1">¥</span>{product.price.toLocaleString()}
                        </div>
                    ) : (
                        <div className="text-[#ff5e5e] font-bold text-3xl leading-none">
                            面议
                        </div>
                    )}
                    
                    {showDiscount && (
                        <div className="flex items-center space-x-2">
                            <div className="bg-[#ff5e5e] text-white text-xs px-1 py-0.5 rounded-[2px] border border-[#ff5e5e]">
                                {discountText}
                            </div>
                            <div className="text-gray-400 text-sm line-through decoration-gray-400">
                                ¥{product.publicPrice?.toLocaleString()}
                            </div>
                            <Info className="w-3.5 h-3.5 text-[#ff5e5e]" />
                        </div>
                    )}
                </div>
                
                <div className="bg-[#333] text-white text-xs px-2 py-1 rounded-[4px] font-medium tracking-wide">
                    {product.condition}
                </div>
            </div>

            {/* Title */}
            <h1 className="text-lg font-bold text-gray-900 leading-snug mb-3">
                {product.title}
            </h1>

            {/* Verification Badge */}
            <div className="flex items-center space-x-1.5 bg-red-50 p-2 rounded-lg">
                <div className="bg-[#ff5e5e] rounded p-0.5">
                    <ShieldCheck className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs text-[#ff5e5e] font-medium">
                    此商品已经鉴定师团队鉴定验证为真品
                </span>
            </div>
        </div>

        {/* Product Parameters */}
        <div className="bg-white px-4 py-5 mb-2">
            <h3 className="text-sm font-bold text-gray-900 mb-5">商品参数</h3>
            
            {/* Brand Header */}
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 border border-gray-100 rounded-lg flex items-center justify-center p-1 bg-white mr-3 shadow-sm">
                    {brandLogo ? (
                        <img src={brandLogo} alt="" className="max-w-full max-h-full object-contain" />
                    ) : (
                        <span className="text-[10px] text-gray-400 font-bold">{product.brand}</span>
                    )}
                </div>
                <div className="flex-1 space-y-0.5">
                    <div className="text-sm font-bold text-gray-900">{product.brand}</div>
                    <div className="text-xs text-gray-500">在售商品: {Math.floor(Math.random() * 2000) + 1000}</div>
                </div>
            </div>

            {/* Specs List */}
            <div className="space-y-4">
                {product.specs ? (
                    product.specs.map((spec, index) => (
                        <div key={index} className="flex text-sm">
                            <span className="text-gray-500 w-24 flex-shrink-0">{spec.label}</span>
                            <span className="text-gray-900 flex-1">{spec.value}</span>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400 py-4 text-sm">暂无详细参数</div>
                )}
            </div>
        </div>

        {/* Product Main Images */}
        <div className="bg-white px-4 py-5 mb-2">
             <h3 className="text-sm font-bold text-gray-900 mb-4">商品主图</h3>
             <div className="space-y-4">
                 {product.detailImages && product.detailImages.length > 0 ? (
                     product.detailImages.map((img, idx) => (
                         <div key={`main-${idx}`} className="w-full bg-gray-50 rounded-lg overflow-hidden">
                             <img src={img} className="w-full h-auto object-cover" loading="lazy" />
                         </div>
                     ))
                 ) : (
                    <div className="w-full bg-gray-50 rounded-lg overflow-hidden">
                        <img src={product.imageUrl} className="w-full h-auto object-cover" />
                    </div>
                 )}
             </div>
        </div>

        {/* Product Details Images */}
        <div className="bg-white px-4 py-5 mb-2">
             <h3 className="text-sm font-bold text-gray-900 mb-4">商品细节图</h3>
             <div className="space-y-4">
                 {product.detailImages && product.detailImages.length > 0 ? (
                     product.detailImages.map((img, idx) => (
                         <div key={`detail-${idx}`} className="w-full bg-gray-50 rounded-lg overflow-hidden">
                             <img src={img} className="w-full h-auto object-cover" loading="lazy" />
                         </div>
                     ))
                 ) : (
                    <div className="text-center text-gray-400 py-4 text-sm">暂无细节图</div>
                 )}
             </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white px-4 py-5 mb-2">
             <h3 className="text-sm font-bold text-gray-900 mb-5">常见问题</h3>
             <div className="space-y-4">
                 <FAQItem 
                    title="正品鉴别" 
                    content="宁伙伴与中检保持长期战略合作，共同规范二手奢侈品交易的鉴别标准。每件商品均经过多重鉴别程序。" 
                 />
                 <FAQItem 
                    title="商品属性" 
                    content="该商品已通过正品鉴别，价格由卖家设置，可能存在价格波动。" 
                 />
                 <FAQItem 
                    title="公价" 
                    content="商品的专柜价、吊牌价、正品零售价或厂商指导价，并非原价，该价格仅供你参考。" 
                 />
                 <FAQItem 
                    title="超公价" 
                    content="因二手商品的特殊性，商品为热销款时，可能会出现售价高于公价的情况，如有疑问你可以在购买前与客服联系。折扣:页面显示的折扣为售价与公价的对比，该对比值仅供你参" 
                 />
                 <FAQItem 
                    title="折扣" 
                    content="页面显示的折扣为售价与公价的对比，该对比值仅供你参" 
                 />
                  <FAQItem 
                    title="价格异常" 
                    content="因可能存在系统缓存，页面更新延迟等不确定性情况，导致价格显示异常，商品具体售价请以订单结算页价格为准。" 
                 />
             </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-10"></div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 flex items-center justify-between z-40 pb-8 max-w-md mx-auto">
         {/* Bag Icon */}
         <div className="relative mr-4 flex flex-col items-center justify-center" onClick={onGoToCart}>
             <ShoppingBag className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
             <div className="absolute -top-1 -right-2 bg-[#ff5e5e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                99+
             </div>
         </div>

         {/* Buttons */}
         <div className="flex-1 flex items-center gap-3">
             {!isAddedToCart ? (
                <>
                 <button 
                    onClick={() => handleOpenPriceModal('cart')}
                    className="flex-1 bg-[#333] text-white font-medium py-2.5 rounded text-sm active:scale-95 transition-transform"
                 >
                    加入购物袋
                 </button>
                 <button 
                    onClick={() => handleOpenPriceModal('buy')}
                    className="flex-1 bg-[#ff5e5e] text-white font-medium py-2.5 rounded text-sm shadow-lg shadow-red-100 active:scale-95 transition-transform"
                 >
                    立即开单
                 </button>
                </>
             ) : (
                <button 
                    onClick={onGoToCart}
                    className="w-full bg-[#ff5e5e] text-white font-medium py-2.5 rounded text-sm shadow-lg shadow-red-100 active:scale-95 transition-transform"
                 >
                    已加购，去结算
                 </button>
             )}
         </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 text-white px-5 py-3 rounded-xl text-sm font-medium backdrop-blur-sm shadow-xl animate-in fade-in zoom-in-95 duration-200 flex items-center gap-2">
            <div className="bg-white rounded-full p-0.5">
                <Check className="w-3 h-3 text-black" strokeWidth={3} />
            </div>
            <span>已成功加入购物袋</span>
          </div>
        </div>
      )}

      {/* Price Confirmation Modal */}
      {isPriceModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsPriceModalOpen(false)}></div>
          <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
             <h3 className="text-lg font-bold text-gray-900 mb-6">确认销售价格</h3>
             
             {/* Input Area */}
             <div className="flex items-baseline border-b border-gray-200 pb-2 mb-3">
                <span className="text-2xl font-bold text-gray-800 mr-2">¥</span>
                <input 
                  type="number" 
                  value={priceInputValue}
                  onChange={(e) => setPriceInputValue(e.target.value)}
                  placeholder="请输入销售金额"
                  className="flex-1 text-lg text-gray-900 placeholder:text-gray-300 focus:outline-none bg-transparent"
                  autoFocus
                />
                <span className="text-lg text-gray-600 ml-2">元</span>
             </div>

             {/* Helper Text */}
             <div className="flex items-center text-sm mb-8 h-5">
                 {product.price > 0 ? (
                    <>
                        <span className="text-gray-500 mr-2">销售价格{product.price.toLocaleString()}.00,</span>
                        <button 
                            onClick={handleAutoFill}
                            className="text-blue-500 active:opacity-70"
                        >
                            自动带入
                        </button>
                    </>
                 ) : (
                    <span className="text-gray-400 text-xs">商品价格面议，请手动输入销售金额</span>
                 )}
             </div>

             {/* Confirm Button */}
             <button 
                onClick={handleConfirmPrice}
                disabled={!priceInputValue}
                className={`w-full font-bold py-3 rounded text-base transition-all ${
                    priceInputValue 
                    ? 'bg-[#ff5e5e] text-white shadow-md shadow-red-100 active:scale-95' 
                    : 'bg-gray-300 text-white cursor-not-allowed'
                }`}
             >
                确 定
             </button>
          </div>
        </div>
      )}
    </div>
  );
};