import React, { useState } from 'react';
import { DashboardPage } from './components/DashboardPage';
import { ProductListPage } from './components/ProductListPage';
import { CartPage } from './components/CartPage';
import { BrandSelectionPage } from './components/BrandSelectionPage';
import { CheckoutPage } from './components/CheckoutPage';
import { SearchPage } from './components/SearchPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { MemberSelectionPage } from './components/MemberSelectionPage';
import { MemberManagementPage } from './components/MemberManagementPage';
import { MemberAccountPage } from './components/MemberAccountPage';
import { MemberDetailPage } from './components/MemberDetailPage';
import { EditMemberPage } from './components/EditMemberPage';
import { AddMemberPage } from './components/AddMemberPage';
import { MemberVerificationPage } from './components/MemberVerificationPage';
import { MemberSelfRegistrationPage } from './components/MemberSelfRegistrationPage';
import { InvoiceManagementPage } from './components/InvoiceManagementPage';
import { AddInvoiceTitlePage } from './components/AddInvoiceTitlePage';
import { SettlementDetailPage } from './components/SettlementDetailPage';
import { PaymentPage } from './components/PaymentPage';
import { PaymentQRCodePage } from './components/PaymentQRCodePage';
import { QRCodeDisplayPage } from './components/QRCodeDisplayPage';
import { PaymentSuccessPage } from './components/PaymentSuccessPage';
import { OrderListPage } from './components/OrderListPage';
import { OrderDetailPage } from './components/OrderDetailPage';
import { OrderStatsPage } from './components/OrderStatsPage';
import { SalesPersonSelectionPage } from './components/SalesPersonSelectionPage';
import { OrderAuditPage } from './components/OrderAuditPage';
import { ReturnOrderDetailPage } from './components/ReturnOrderDetailPage';
import { ReturnOrderListPage } from './components/ReturnOrderListPage';
import { MessageCenterPage } from './components/MessageCenterPage';
import { ContractUploadPage } from './components/ContractUploadPage';
import { ContractDetailPage } from './components/ContractDetailPage';
import { RecycleOrderListPage } from './components/RecycleOrderListPage';
import { SalesInvoiceApplicationPage } from './components/SalesInvoiceApplicationPage';
import { SalesInvoiceSuccessPage } from './components/SalesInvoiceSuccessPage';
import { ReturnSettlementPage } from './components/ReturnSettlementPage';
import { Product, Member, InvoiceTitle, Settlement, Employee, ReturnOrder, RecycleOrder, Merchant, AuditInfo } from './types';
import { MOCK_PRODUCTS, MOCK_MEMBERS, MOCK_INVOICE_TITLES, MOCK_EMPLOYEES, MOCK_ORDERS, MOCK_RETURN_ORDERS, MOCK_RECYCLE_ORDERS } from './constants';

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'productList' | 'cart' | 'brandSelection' | 'checkout' | 'search' | 'productDetail' | 'memberSelection' | 'memberManagement' | 'memberAccount' | 'memberDetail' | 'editMember' | 'addMember' | 'memberVerification' | 'memberSelfRegistration' | 'invoiceManagement' | 'addInvoiceTitle' | 'settlementDetail' | 'payment' | 'paymentQRCode' | 'qrCodeDisplay' | 'paymentSuccess' | 'orderList' | 'orderDetail' | 'orderStats' | 'salesPersonSelection' | 'orderAudit' | 'contractSigning' | 'returnOrderDetail' | 'returnOrderList' | 'messageCenter' | 'contractUpload' | 'contractDetail' | 'recycleOrderList' | 'salesInvoiceApplication' | 'salesInvoiceSuccess' | 'returnSettlement'>('dashboard');

  // State for workflow data
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null); // New Merchant State
  const [itemsToCheckout, setItemsToCheckout] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([MOCK_PRODUCTS[0]]); // Initialize with one mock item in cart
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceTitle | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Settlement | null>(null);
  const [currentReturnOrder, setCurrentReturnOrder] = useState<ReturnOrder | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Data State
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS); // Allow update
  const [employees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [orders, setOrders] = useState<Settlement[]>(MOCK_ORDERS);
  const [returnOrders, setReturnOrders] = useState<ReturnOrder[]>(MOCK_RETURN_ORDERS);
  const [recycleOrders, setRecycleOrders] = useState<RecycleOrder[]>(MOCK_RECYCLE_ORDERS);
  const [invoiceTitles] = useState<InvoiceTitle[]>(MOCK_INVOICE_TITLES);

  // Filter State for Order Lists
  const [salesPersonFilter, setSalesPersonFilter] = useState<Employee | null>(null);
  // Track where the salesperson selection came from
  const [salesPersonSelectionSource, setSalesPersonSelectionSource] = useState<'orderList' | 'returnOrderList'>('orderList');
  
  // Track where verification flow was initiated from
  const [verificationReturnView, setVerificationReturnView] = useState<'memberAccount' | 'orderAudit' | 'contractUpload'>('memberAccount');

  // Payment QR Code Data State
  const [qrCodeData, setQrCodeData] = useState<{amount: number, name: string} | null>(null);

  // Invoice Application Source Tracking
  const [invoiceSource, setInvoiceSource] = useState<'paymentSuccess' | 'recycleOrderList' | 'orderDetail'>('paymentSuccess');

  // Audit Approval State Persistence
  const [isAuditPassed, setIsAuditPassed] = useState(false);


  // Handlers
  const handleAuditReject = (reason: string) => {
    // Construct audit info
    const auditInfo: AuditInfo = {
        submitter: currentOrder?.member.name || selectedMember?.name || "销售员",
        submitTime: currentOrder?.createTime || new Date().toLocaleString(),
        approver: "管理员", // Current user
        approveTime: new Date().toLocaleString(),
        status: 'rejected',
        note: reason
    };

    if (currentOrder) {
        // If updating an existing order (if flow supported)
        const updatedOrder = { 
            ...currentOrder, 
            status: 'audit_rejected' as const, 
            auditInfo 
        };
        setOrders(orders.map(o => o.id === currentOrder.id ? updatedOrder : o));
    } else if (itemsToCheckout.length > 0 && selectedMember) {
        // If creating a new order from checkout flow
        const newOrder: Settlement = {
             id: 'SET-' + Date.now(),
             salesOrderId: 'SO' + Date.now(),
             type: 'sales',
             totalAmount: itemsToCheckout.reduce((s, i) => s + i.price, 0),
             items: itemsToCheckout,
             createTime: new Date().toLocaleString(),
             member: selectedMember,
             paidAmount: 0,
             employeeId: '1',
             status: 'audit_rejected',
             auditInfo
        };
        setOrders([newOrder, ...orders]);
    }
    
    setCurrentView('orderList');
  };

  const handleAuditPass = () => {
      setIsAuditPassed(true);
      // Optional: record pass audit info in currentOrder if it exists
      if (currentOrder) {
          const auditInfo: AuditInfo = {
            submitter: currentOrder.member.name,
            submitTime: currentOrder.createTime,
            approver: "管理员",
            approveTime: new Date().toLocaleString(),
            status: 'passed'
          };
          setCurrentOrder({...currentOrder, auditInfo});
      }
  };

  const handleSkipToSettlement = () => {
      // Create order in "pending_payment" status directly
      if (selectedMember && itemsToCheckout.length > 0) {
          const newOrder: Settlement = {
              id: 'SET-S' + Date.now(),
              salesOrderId: 'SO-S' + Date.now(),
              type: 'sales',
              totalAmount: itemsToCheckout.reduce((s, i) => s + i.price, 0),
              items: itemsToCheckout,
              createTime: new Date().toLocaleString(),
              member: selectedMember,
              paidAmount: 0,
              status: 'pending_payment',
              auditInfo: {
                  submitter: "管理员",
                  submitTime: new Date().toLocaleString(),
                  approver: "管理员",
                  approveTime: new Date().toLocaleString(),
                  status: 'passed'
              }
          };
          setOrders([newOrder, ...orders]);
          setCurrentOrder(newOrder);
          setCurrentView('settlementDetail');
      }
  };

  const handleProductClick = (product: Product) => {
      setSelectedProduct(product);
      setCurrentView('productDetail');
  };

  const handleAddToCart = (product: Product) => {
      // Check if item exists
      const existingItemIndex = cartItems.findIndex(i => i.id === product.id);
      if (existingItemIndex > -1) {
          // If it exists (especially for negotiable items where price might change), update it
          const newCartItems = [...cartItems];
          newCartItems[existingItemIndex] = product;
          setCartItems(newCartItems);
      } else {
          setCartItems([...cartItems, product]);
      }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative overflow-hidden">
      {currentView === 'dashboard' && (
        <DashboardPage 
          onNavigateToProductList={() => setCurrentView('productList')}
          onNavigateToOrderList={() => setCurrentView('orderList')}
          onNavigateToMemberManagement={() => setCurrentView('memberManagement')}
          onNavigateToReturnOrderList={() => setCurrentView('returnOrderList')}
          onNavigateToMessageCenter={() => setCurrentView('messageCenter')}
          onNavigateToSelfServiceInvoicing={() => setCurrentView('recycleOrderList')}
        />
      )}

      {currentView === 'productList' && (
          <ProductListPage 
             onBack={() => setCurrentView('dashboard')}
             products={products}
             onProductClick={handleProductClick}
             onSearchClick={() => setCurrentView('search')}
             onCartClick={() => setCurrentView('cart')}
             onBrandClick={() => setCurrentView('brandSelection')}
             cartItems={cartItems}
             onAddToCart={handleAddToCart}
          />
      )}

      {currentView === 'recycleOrderList' && (
          <RecycleOrderListPage 
              onBack={() => setCurrentView('dashboard')}
              recycleOrders={recycleOrders}
              salesOrders={orders}
              onSalesOrderClick={(order) => {
                  setCurrentOrder(order);
                  setInvoiceSource('recycleOrderList');
                  setCurrentView('salesInvoiceApplication');
              }}
          />
      )}

      {currentView === 'orderList' && (
          <OrderListPage 
             onBack={() => setCurrentView('dashboard')}
             orders={orders}
             onPayClick={(order) => {
                 setCurrentOrder(order);
                 setCurrentView('settlementDetail');
             }}
             onCancelClick={(id) => {
                 // In real app, show modal
             }}
             onStatsClick={() => setCurrentView('orderStats')}
             onSalesPersonFilterClick={() => {
                 setSalesPersonSelectionSource('orderList');
                 setCurrentView('salesPersonSelection');
             }}
             selectedSalesPerson={salesPersonFilter}
             onClearSalesPersonFilter={() => setSalesPersonFilter(null)}
             onOrderClick={(order) => {
                 setCurrentOrder(order);
                 setCurrentView('orderDetail');
             }}
          />
      )}

      {currentView === 'orderDetail' && currentOrder && (
          <OrderDetailPage 
              order={currentOrder}
              onBack={() => setCurrentView('orderList')}
              onApplyInvoice={(order) => {
                  setCurrentOrder(order);
                  setInvoiceSource('orderDetail');
                  setCurrentView('salesInvoiceApplication');
              }}
              onCancelOrder={(order) => {
                  // Logic to cancel order (Create return order)
                  const newReturnOrder: ReturnOrder = {
                      id: 'RET-' + Date.now(),
                      originalOrderId: order.salesOrderId,
                      amount: order.paidAmount || 0,
                      status: 'pending_audit',
                      createTime: new Date().toLocaleString(),
                      items: order.items,
                      member: order.member,
                      originalPaymentMethod: order.paymentMethod || 'online',
                      originalPaidAmount: order.paidAmount || 0,
                      employeeId: order.employeeId
                  };
                  setReturnOrders([newReturnOrder, ...returnOrders]);
                  
                  // Update original order status
                  const updatedOrders = orders.map(o => o.id === order.id ? {...o, status: (order.paidAmount ? 'returned' : 'cancelled') as any} : o);
                  setOrders(updatedOrders);
                  
                  setCurrentView('orderList');
              }}
              onViewContract={(order) => {
                  setCurrentOrder(order);
                  setCurrentView('contractDetail');
              }}
          />
      )}

      {currentView === 'contractDetail' && currentOrder && (
          <ContractDetailPage 
              order={currentOrder}
              onBack={() => setCurrentView('orderDetail')}
          />
      )}

      {currentView === 'returnOrderList' && (
          <ReturnOrderListPage 
             onBack={() => setCurrentView('dashboard')}
             returnOrders={returnOrders}
             onSalesPersonFilterClick={() => {
                 setSalesPersonSelectionSource('returnOrderList');
                 setCurrentView('salesPersonSelection');
             }}
             selectedSalesPerson={salesPersonFilter}
             onClearSalesPersonFilter={() => setSalesPersonFilter(null)}
             onOrderClick={(order) => {
                 setCurrentReturnOrder(order);
                 setCurrentView('returnOrderDetail');
             }}
          />
      )}

      {currentView === 'returnOrderDetail' && currentReturnOrder && (
          <ReturnOrderDetailPage 
              returnOrder={currentReturnOrder}
              onBack={() => setCurrentView('returnOrderList')}
              onAuditPass={() => {
                  // Update mock status
                  const updated = returnOrders.map(o => o.id === currentReturnOrder.id ? {...o, status: 'pending_refund' as const} : o);
                  setReturnOrders(updated);
                  setCurrentReturnOrder({...currentReturnOrder, status: 'pending_refund'});
              }}
              onAuditReject={() => {
                  const updated = returnOrders.map(o => o.id === currentReturnOrder.id ? {...o, status: 'audit_rejected' as const} : o);
                  setReturnOrders(updated);
                  setCurrentView('returnOrderList');
              }}
              onGoToSettlement={() => {
                  setCurrentView('returnSettlement');
              }}
              onComplete={(restock) => {
                  const updated = returnOrders.map(o => o.id === currentReturnOrder.id ? {...o, status: 'completed' as const} : o);
                  setReturnOrders(updated);
                  setCurrentView('returnOrderList');
              }}
          />
      )}

      {currentView === 'returnSettlement' && currentReturnOrder && (
          <ReturnSettlementPage 
              returnOrder={currentReturnOrder}
              onBack={() => setCurrentView('returnOrderDetail')}
              onConfirmRefund={(method, restock) => {
                  // Complete the refund
                  const updated = returnOrders.map(o => o.id === currentReturnOrder.id ? {...o, status: 'completed' as const} : o);
                  setReturnOrders(updated);
                  setCurrentView('returnOrderList');
              }}
          />
      )}

      {currentView === 'messageCenter' && (
          <MessageCenterPage 
              onBack={() => setCurrentView('dashboard')}
          />
      )}

      {currentView === 'salesPersonSelection' && (
          <SalesPersonSelectionPage 
             onBack={() => setCurrentView(salesPersonSelectionSource === 'orderList' ? 'orderList' : 'returnOrderList')}
             employees={employees}
             selectedId={salesPersonFilter?.id}
             onConfirm={(employee) => {
                 setSalesPersonFilter(employee);
                 setCurrentView(salesPersonSelectionSource === 'orderList' ? 'orderList' : 'returnOrderList');
             }}
          />
      )}
      
      {currentView === 'orderStats' && (
          <OrderStatsPage onBack={() => setCurrentView('orderList')} />
      )}

      {currentView === 'productDetail' && selectedProduct && (
          <ProductDetailPage 
              product={selectedProduct}
              onBack={() => setCurrentView('productList')} 
              onAddToCart={handleAddToCart}
              onBuyNow={(productWithPrice) => {
                  setItemsToCheckout([productWithPrice]);
                  setCurrentView('checkout');
              }}
              onGoToCart={() => setCurrentView('cart')}
          />
      )}

      {currentView === 'cart' && (
          <CartPage 
              onBack={() => setCurrentView('dashboard')} 
              onCheckout={(items) => {
                  setItemsToCheckout(items);
                  setCurrentView('checkout');
              }}
              cartItems={cartItems}
              onUpdateCart={setCartItems}
          />
      )}

      {currentView === 'checkout' && (
          <CheckoutPage 
              onBack={() => setCurrentView('cart')}
              items={itemsToCheckout}
              selectedMember={selectedMember}
              onSelectMemberClick={() => setCurrentView('memberSelection')}
              onClearMember={() => setSelectedMember(null)}
              selectedInvoice={selectedInvoice}
              onInvoiceClick={() => setCurrentView('invoiceManagement')}
              onSubmitOrder={(method, merchant) => {
                  setSelectedMerchant(merchant);
                  setIsAuditPassed(false);
                  setCurrentView('orderAudit');
              }}
          />
      )}

      {currentView === 'memberSelection' && (
          <MemberSelectionPage 
              onBack={() => setCurrentView('checkout')}
              members={members}
              onSelectMember={(m) => {
                  setSelectedMember(m);
                  setCurrentView('checkout');
              }}
              onAddMember={() => setCurrentView('addMember')}
          />
      )}
      
      {currentView === 'orderAudit' && selectedMember && (
          <OrderAuditPage 
             onBack={() => setCurrentView('checkout')}
             initialPassed={isAuditPassed}
             onReject={handleAuditReject}
             onPass={handleAuditPass}
             onSkipToSettlement={handleSkipToSettlement}
             onVerifyMember={() => {
                 const newOrder: Settlement = {
                     id: 'TEMP-ORDER-' + Date.now(),
                     salesOrderId: 'SO-' + Date.now(),
                     type: 'sales',
                     totalAmount: itemsToCheckout.reduce((s, i) => s + i.price, 0),
                     items: itemsToCheckout,
                     createTime: new Date().toLocaleString(),
                     member: selectedMember,
                     paidAmount: 0,
                     status: 'pending_sign',
                     auditInfo: currentOrder?.auditInfo 
                 };
                 setCurrentOrder(newOrder);
                 setVerificationReturnView('orderAudit');
                 setCurrentView('memberVerification');
             }}
             onGotoOfflineSign={() => {
                 const newOrder: Settlement = {
                     id: 'TEMP-ORDER-' + Date.now(),
                     salesOrderId: 'SO-' + Date.now(),
                     type: 'sales',
                     totalAmount: itemsToCheckout.reduce((s, i) => s + i.price, 0),
                     items: itemsToCheckout,
                     createTime: new Date().toLocaleString(),
                     member: selectedMember,
                     paidAmount: 0,
                     status: 'pending_sign',
                     auditInfo: currentOrder?.auditInfo
                 };
                 setCurrentOrder(newOrder);
                 setCurrentView('contractUpload');
             }}
             items={itemsToCheckout}
             member={selectedMember}
             invoice={selectedInvoice}
             merchant={selectedMerchant}
          />
      )}

      {currentView === 'contractUpload' && currentOrder && (
          <ContractUploadPage 
              order={currentOrder}
              onBack={() => setCurrentView('orderAudit')}
              onComplete={() => {
                  setCurrentView('settlementDetail');
              }}
          />
      )}

      {currentView === 'settlementDetail' && currentOrder && (
          <SettlementDetailPage 
              settlement={currentOrder}
              onBack={() => setCurrentView('orderList')}
              onPaymentClick={() => setCurrentView('payment')}
          />
      )}

      {currentView === 'payment' && currentOrder && (
          <PaymentPage 
              settlement={currentOrder}
              onBack={() => setCurrentView('settlementDetail')}
              onChannelSelect={(channel) => {
                   if (channel === 'qrcode') setCurrentView('paymentQRCode');
              }}
              onOfflinePay={(amount) => {
                  const updated = {...currentOrder, paidAmount: (currentOrder.paidAmount || 0) + amount, status: amount >= (currentOrder.totalAmount - (currentOrder.paidAmount||0)) ? 'paid' : 'pending_payment' } as Settlement;
                  setCurrentOrder(updated);
                  setCurrentView('paymentSuccess');
              }}
          />
      )}

      {currentView === 'paymentQRCode' && currentOrder && (
          <PaymentQRCodePage 
              settlement={currentOrder}
              onBack={() => setCurrentView('payment')}
              onChangeChannel={() => setCurrentView('payment')}
              onShowQRCode={(amount, name) => {
                  setQrCodeData({ amount, name });
                  setCurrentView('qrCodeDisplay');
              }}
          />
      )}
      
      {currentView === 'qrCodeDisplay' && currentOrder && (
          <QRCodeDisplayPage 
              settlement={currentOrder}
              amount={qrCodeData?.amount || 0}
              qrCodeName={qrCodeData?.name || ''}
              onBack={() => setCurrentView('paymentQRCode')}
              onSuccess={() => setCurrentView('paymentSuccess')}
          />
      )}

      {currentView === 'paymentSuccess' && currentOrder && (
          <PaymentSuccessPage 
              settlement={currentOrder}
              amount={100} 
              onFinish={() => setCurrentView('orderList')}
              onContinue={() => setCurrentView('settlementDetail')}
              onApplyInvoice={() => {
                  setInvoiceSource('paymentSuccess');
                  setCurrentView('salesInvoiceApplication');
              }}
          />
      )}

      {currentView === 'salesInvoiceApplication' && currentOrder && (
          <SalesInvoiceApplicationPage 
              order={currentOrder}
              onBack={() => {
                  if (invoiceSource === 'orderDetail') setCurrentView('orderDetail');
                  else setCurrentView(invoiceSource);
              }}
              onSubmit={(items) => {
                  setCurrentView('salesInvoiceSuccess');
              }}
          />
      )}

      {currentView === 'salesInvoiceSuccess' && (
          <SalesInvoiceSuccessPage 
              onBackToOrders={() => setCurrentView('orderList')}
          />
      )}
      
      {currentView === 'memberManagement' && (
          <MemberManagementPage 
             onBack={() => setCurrentView('dashboard')}
             onAddMember={() => setCurrentView('addMember')}
             onSelectMember={(m) => {
                 setSelectedMember(m);
                 setCurrentView('memberAccount');
             }}
             members={members}
          />
      )}

      {currentView === 'memberAccount' && selectedMember && (
          <MemberAccountPage 
              member={selectedMember}
              onBack={() => setCurrentView('memberManagement')}
              onNavigateToDetail={() => setCurrentView('memberDetail')}
              onNavigateToVerification={() => {
                  setVerificationReturnView('memberAccount');
                  setCurrentView('memberVerification');
              }}
          />
      )}

      {currentView === 'memberDetail' && selectedMember && (
          <MemberDetailPage 
              member={selectedMember}
              onBack={() => setCurrentView('memberAccount')}
              onEdit={() => setCurrentView('editMember')}
          />
      )}

      {currentView === 'editMember' && selectedMember && (
          <EditMemberPage 
              member={selectedMember}
              onBack={() => setCurrentView('memberDetail')}
              onSave={(data) => {
                  setCurrentView('memberDetail');
              }}
          />
      )}

      {currentView === 'memberVerification' && selectedMember && (
          <MemberVerificationPage 
              onBack={() => {
                  if (verificationReturnView === 'contractUpload') {
                      setCurrentView('orderAudit');
                  } else {
                      setCurrentView(verificationReturnView);
                  }
              }}
              onSuccess={() => {
                  const updatedMember = { ...selectedMember, isVerified: true };
                  setSelectedMember(updatedMember);
                  setMembers(members.map(m => m.id === selectedMember.id ? updatedMember : m));
                  if (currentOrder) {
                      setCurrentOrder({ ...currentOrder, member: updatedMember });
                  }
                  setCurrentView(verificationReturnView);
              }}
              onNavigateToSelfRegistration={() => setCurrentView('memberSelfRegistration')}
              memberPhone={selectedMember.phone}
          />
      )}

      {currentView === 'memberSelfRegistration' && (
          <MemberSelfRegistrationPage onBack={() => setCurrentView('memberVerification')} />
      )}
      
      {currentView === 'addMember' && (
          <AddMemberPage 
              onBack={() => setCurrentView('memberManagement')} 
              onSave={() => setCurrentView('memberManagement')}
              onNext={() => setCurrentView('memberManagement')}
          />
      )}

      {currentView === 'search' && (
          <SearchPage 
              onBack={() => setCurrentView('productList')}
              onSearch={(q) => {}}
              initialQuery=""
              recentSearches={['Rolex', 'Gucci']}
              onClearHistory={() => {}}
          />
      )}

      {currentView === 'brandSelection' && (
          <BrandSelectionPage 
              onBack={() => setCurrentView('productList')}
              onSelectBrand={(b) => setCurrentView('productList')}
          />
      )}

      {currentView === 'invoiceManagement' && (
          <InvoiceManagementPage 
              onBack={() => setCurrentView('checkout')}
              selectedMember={selectedMember}
              invoiceTitles={invoiceTitles}
              onSelectInvoice={(inv) => {
                  setSelectedInvoice(inv);
                  setCurrentView('checkout');
              }}
              onEditInvoice={() => setCurrentView('addInvoiceTitle')}
              onAddInvoice={() => setCurrentView('addInvoiceTitle')}
              currentSelectedId={selectedInvoice?.id || null}
          />
      )}

      {currentView === 'addInvoiceTitle' && (
          <AddInvoiceTitlePage 
              onBack={() => setCurrentView('invoiceManagement')}
              onSave={() => setCurrentView('invoiceManagement')}
              onUpdate={() => setCurrentView('invoiceManagement')}
              editingInvoice={null}
          />
      )}
      
    </div>
  );
};

export default App;