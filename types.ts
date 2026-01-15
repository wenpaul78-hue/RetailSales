
export interface Product {
  id: string;
  brand: string;
  category: string;
  title: string;
  price: number;
  publicPrice?: number; // The official/original price for discount calculation
  condition: string; // e.g., "90新"
  imageUrl: string;
  inventoryTime?: string;
  listingTime?: string;
  // New detailed fields
  specs?: { label: string; value: string }[];
  detailImages?: string[];
  
  // Internal pricing fields
  costPrice?: number; // 成本价
  procurementPrice?: number; // 采购价
  uniqueCode?: string; // 商品唯一码
  
  // Recycle flow fields
  expectedPrice?: number; // 期望价
  settlementPrice?: number; // 结算价
}

export type SortType = 'brand' | 'price' | 'inventory' | 'listing';
export type SortDirection = 'asc' | 'desc' | null;

export interface FilterState {
  searchQuery: string;
  sortBy: SortType | null;
  sortDirection: SortDirection;
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  gender: 'male' | 'female';
  isVerified: boolean; // true: 已实名, false: 待实名
  avatar?: string;
  shopName?: string;
}

export interface Employee {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

export interface Merchant {
  id: string;
  name: string;
}

export interface InvoiceTitle {
  id: string;
  type: 'company' | 'personal'; // 抬头类型
  title: string; // 发票抬头
  taxId?: string; // 税号 (企业必填)
  isDefault: boolean;
  bankName?: string;
  bankAccount?: string;
  registerAddress?: string;
  registerPhone?: string;
  
  // New fields matching the UI
  invoiceType?: 'general' | 'special'; // 发票类型: 普通发票 | 专用发票
  invoiceContent?: 'details' | 'category'; // 发票内容: 商品明细 | 商品类别
  email?: string; // 收票邮箱
}

export type OrderStatus = 'pending_audit' | 'audit_rejected' | 'pending_sign' | 'pending_payment' | 'paid' | 'completed' | 'returned' | 'cancelled';
export type ReturnOrderStatus = 'pending_audit' | 'audit_rejected' | 'pending_refund' | 'completed';
export type PaymentMethod = 'online' | 'offline';

export interface AuditInfo {
  submitter: string;
  submitTime: string;
  approver: string;
  approveTime: string;
  status: 'passed' | 'rejected';
  note?: string; // Rejection reason or note
}

export interface Settlement {
  id: string; // 结算单号
  salesOrderId: string; // 销售单号
  type: 'sales'; // 结算类型
  totalAmount: number; // 应结算金额
  items: Product[];
  createTime: string;
  member: Member; // 结算会员信息
  paidAmount?: number; // 已收金额
  employeeId?: string; // 销售员工ID
  status: OrderStatus; // Order workflow status
  
  // Payment tracking
  paymentMethod?: PaymentMethod; 
  
  // Audit History
  auditInfo?: AuditInfo;
}

export interface ReturnOrder {
  id: string;
  originalOrderId: string; // Links back to Settlement.id
  amount: number; // Refund amount
  status: ReturnOrderStatus;
  createTime: string;
  items: Product[];
  member: Member;
  originalPaymentMethod?: PaymentMethod; // To enforce refund rules
  originalPaidAmount: number;
  employeeId?: string; // Employee who processed the return
}

export interface RecycleOrder {
  id: string;
  member: Member;
  items: Product[];
  status: 'passed' | 'pending' | 'rejected';
  totalExpectedAmount: number;
  totalSettlementAmount: number;
  createTime: string;
}