import { Product, Member, InvoiceTitle, Employee, Settlement, ReturnOrder, RecycleOrder, Merchant } from './types';

// Using a consistent placeholder that looks somewhat premium/golden to match the Rolex vibe
const WATCH_IMAGE_URL = "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop"; 
const BAG_IMAGE_URL = "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop";

export const BRAND_LIST = [
  'GUCCI', 'COACH', 'LOUIS VUITTON',
  'BURBERRY', 'CHANNEL', 'HERMES',
  'DIOR', 'BOTTEGA VENETA', 'MCM',
];

export const CATEGORY_LIST = [
  '腕表', '箱包', '珠宝', '鞋靴', '服饰', '配饰', '其它'
];

export interface Brand {
  name: string;
  cnName?: string;
  logo: string; // url
  initial: string;
}

// Mock Data structure for the Brand Selection Page
export const BRAND_DATA: Record<string, Brand[]> = {
  '腕表': [
    { name: 'AUDEMARS PIGUET', cnName: '爱彼', initial: 'A', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Audemars_Piguet_logo.svg/2560px-Audemars_Piguet_logo.svg.png' },
    { name: 'Maurice Lacroix', cnName: '艾美', initial: 'M', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Maurice_Lacroix_logo.svg/2560px-Maurice_Lacroix_logo.svg.png' },
    { name: 'AIMULE', cnName: '艾姆勒', initial: 'A', logo: 'https://via.placeholder.com/100x50?text=AIMULE' },
    { name: 'Armani', cnName: '阿玛尼', initial: 'A', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Giorgio_Armani_logo.svg/2560px-Giorgio_Armani_logo.svg.png' },
    { name: 'Hermes', cnName: '爱马仕', initial: 'H', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Herm%C3%A8s_logo.svg/2560px-Herm%C3%A8s_logo.svg.png' },
    { name: 'A.Lange & sohne', cnName: '朗格', initial: 'A', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/A._Lange_%26_S%C3%B6hne_logo.svg/2560px-A._Lange_%26_S%C3%B6hne_logo.svg.png' },
    { name: 'Alexander McQueen', cnName: '麦昆', initial: 'A', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Alexander_McQueen_logo_2022.svg/1200px-Alexander_McQueen_logo_2022.svg.png' },
    { name: 'Alexander Wang', cnName: '亚历山大·王', initial: 'A', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Alexander_Wang_logo.svg/2560px-Alexander_Wang_logo.svg.png' },
    { name: 'Blancpain', cnName: '宝珀', initial: 'B', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Blancpain_logo.svg/2560px-Blancpain_logo.svg.png' },
    { name: 'Breguet', cnName: '宝玑', initial: 'B', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Breguet_logo.svg/2560px-Breguet_logo.svg.png' },
    { name: 'Rolex', cnName: '劳力士', initial: 'R', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Rolex_logo.svg/2560px-Rolex_logo.svg.png' },
  ],
  '箱包': [
    { name: 'Bottega Veneta', cnName: '葆蝶家', initial: 'B', logo: '' },
    { name: 'Burberry', cnName: '博柏利', initial: 'B', logo: '' },
    { name: 'Balenciaga', cnName: '巴黎世家', initial: 'B', logo: '' },
    { name: 'Chanel', cnName: '香奈儿', initial: 'C', logo: '' },
    { name: 'Coach', cnName: '蔻驰', initial: 'C', logo: '' },
    { name: 'Gucci', cnName: '古驰', initial: 'G', logo: '' },
    { name: 'Louis Vuitton', cnName: '路易威登', initial: 'L', logo: '' },
    { name: 'MCM', cnName: 'MCM', initial: 'M', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MCM_logo.svg/2560px-MCM_logo.svg.png' },
  ],
  '珠宝': [],
  '鞋靴': [],
  '服饰': [],
  '配饰': [],
  '其它': [],
};

// Helper to generate generic specs for watches
const getWatchSpecs = (brand: string, model: string) => [
  { label: '系列', value: model.split(' ')[0] || '经典系列' },
  { label: '表径', value: '40毫米' },
  { label: '表壳材质', value: '精钢/18K金' },
  { label: '表盘颜色', value: '黑色' },
  { label: '机芯类型', value: '自动机械' },
  { label: '表带材质', value: '金属' },
  { label: '防水深度', value: '100米' },
  { label: '上架时间', value: '2023年10月' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'mcm-1',
    brand: 'MCM',
    category: '箱包',
    title: 'MCM Stark Visetos 中号牛皮字母印花铭牌侧饰铆钉双肩包 MMKAAVE09I8001',
    price: 3542,
    publicPrice: 9400,
    condition: '9.5新',
    imageUrl: BAG_IMAGE_URL, // In a real app, this would be the MCM bag image
    inventoryTime: '2025-09-01',
    listingTime: '2025-09-01',
    uniqueCode: '202509010001',
    specs: [
        { label: '系列', value: 'Stark' },
        { label: '尺寸', value: '16 x 36 x 41 厘米' },
        { label: '尺码', value: '中号' },
        { label: '颜色', value: '米黄色(Beige)' },
        { label: '材质', value: 'Visetos帆布、Nappa皮革' },
        { label: '设计元素', value: '铆钉' },
        { label: '型号', value: 'MMKAAVE09I8001' },
        { label: '商品唯一码', value: '202509010001' },
        { label: '上架时间', value: '2025年9月1日' },
    ],
    detailImages: [BAG_IMAGE_URL, BAG_IMAGE_URL, BAG_IMAGE_URL, BAG_IMAGE_URL],
  },
  {
    id: '1',
    brand: 'Rolex',
    category: '腕表',
    title: 'Rolex/劳力士 宇宙计型迪通拿 116508-0013 自动机械 18K黄金 40毫..',
    price: 302200,
    publicPrice: 325000,
    condition: '90新',
    imageUrl: WATCH_IMAGE_URL,
    inventoryTime: '2023-10-01',
    listingTime: '2023-10-05',
    uniqueCode: 'RLX-116508-0013',
    specs: getWatchSpecs('Rolex', 'Daytona'),
    detailImages: [WATCH_IMAGE_URL, WATCH_IMAGE_URL],
  },
  {
    id: 'negotiable-1',
    brand: 'Patek Philippe',
    category: '腕表',
    title: 'Patek Philippe/百达翡丽 鹦鹉螺 5711/1A 蓝盘 自动机械 钢王',
    price: 0, // 0 indicates Negotiable
    publicPrice: 260000,
    condition: '99新',
    imageUrl: WATCH_IMAGE_URL,
    inventoryTime: '2023-12-01',
    listingTime: '2023-12-05',
    uniqueCode: 'PP-5711-1A',
    specs: getWatchSpecs('Patek Philippe', 'Nautilus'),
    detailImages: [WATCH_IMAGE_URL, WATCH_IMAGE_URL],
  },
  {
    id: '2',
    brand: 'Rolex',
    category: '腕表',
    title: 'Rolex/劳力士 潜航者型 116610LN 自动机械 钢 40毫米',
    price: 95000,
    publicPrice: 85000, // Premium example (price > public)
    condition: '95新',
    imageUrl: WATCH_IMAGE_URL,
    inventoryTime: '2023-09-15',
    listingTime: '2023-09-20',
    uniqueCode: 'RLX-116610LN-02',
    specs: getWatchSpecs('Rolex', 'Submariner'),
    detailImages: [WATCH_IMAGE_URL, WATCH_IMAGE_URL],
  },
  {
    id: '3',
    brand: 'Rolex',
    category: '腕表',
    title: 'Rolex/劳力士 日志型 126333 自动机械 间金 41毫米',
    price: 110000,
    publicPrice: 125000,
    condition: '99新',
    imageUrl: WATCH_IMAGE_URL,
    inventoryTime: '2023-11-01',
    listingTime: '2023-11-02',
    uniqueCode: 'RLX-126333-03',
    specs: getWatchSpecs('Rolex', 'Datejust'),
    detailImages: [WATCH_IMAGE_URL, WATCH_IMAGE_URL],
  },
  {
    id: '4',
    brand: 'Rolex',
    category: '腕表',
    title: 'Rolex/劳力士 格林尼治型II 126710BLRO 可乐圈 自动机械',
    price: 145000,
    publicPrice: 160000,
    condition: '92新',
    imageUrl: WATCH_IMAGE_URL,
    inventoryTime: '2023-08-20',
    listingTime: '2023-08-25',
    uniqueCode: 'RLX-126710BLRO',
    specs: getWatchSpecs('Rolex', 'GMT-Master II'),
    detailImages: [WATCH_IMAGE_URL, WATCH_IMAGE_URL],
  },
  {
    id: '5',
    brand: 'Rolex',
    category: '腕表',
    title: 'Rolex/劳力士 切利尼 50535 自动机械 玫瑰金 月相',
    price: 180000,
    publicPrice: 210000,
    condition: '98新',
    imageUrl: WATCH_IMAGE_URL,
    inventoryTime: '2023-10-20',
    listingTime: '2023-10-21',
    uniqueCode: 'RLX-50535-05',
    specs: getWatchSpecs('Rolex', 'Cellini'),
    detailImages: [WATCH_IMAGE_URL, WATCH_IMAGE_URL],
  },
  {
    id: '6',
    brand: 'Rolex',
    category: '腕表',
    title: 'Rolex/劳力士 星期日历型 228238 自动机械 18K黄金',
    price: 280000,
    publicPrice: 310000,
    condition: '95新',
    imageUrl: WATCH_IMAGE_URL,
    inventoryTime: '2023-09-01',
    listingTime: '2023-09-10',
    uniqueCode: 'RLX-228238-06',
    specs: getWatchSpecs('Rolex', 'Day-Date'),
    detailImages: [WATCH_IMAGE_URL, WATCH_IMAGE_URL],
  },
];

export const MOCK_MEMBERS: Member[] = [
  { 
    id: '0', 
    name: '张张', 
    gender: 'female', 
    phone: '15895740320', 
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop'
  },
  { id: '1', name: '韦', gender: 'female', phone: '18225182863', isVerified: false },
  { id: '2', name: '詹国良', gender: 'male', phone: '18221812766', isVerified: true },
  { id: '3', name: '林道辉', gender: 'male', phone: '13127896809', isVerified: true },
  { id: '4', name: '小张', gender: 'female', phone: '18900000000', isVerified: false },
  { id: '5', name: '四十大盗', gender: 'female', phone: '15500000000', isVerified: false },
  { id: '6', name: '任晴晴', gender: 'female', phone: '18130066741', isVerified: false },
  { id: '7', name: '海绵宝宝', gender: 'female', phone: '18800000000', isVerified: false },
  { id: '8', name: '闻同学', gender: 'male', phone: '13913380929', isVerified: true },
];

export const MOCK_MERCHANTS: Merchant[] = [
  { id: 'm1', name: '南京宁伙伴科技有限公司' },
  { id: 'm2', name: '南京吉嘉名品贸易有限公司' }
];

export const MOCK_INVOICE_TITLES: InvoiceTitle[] = [
    {
        id: 'inv-1',
        type: 'company',
        title: '宁伙伴（南京）科技服务有限有限公司',
        taxId: '91210113MA26R8566F',
        isDefault: true,
        invoiceType: 'special',
        invoiceContent: 'details',
        email: 'finance@ninghuoban.com'
    },
    {
        id: 'inv-2',
        type: 'personal',
        title: '张宇航',
        isDefault: false,
        invoiceType: 'general',
        invoiceContent: 'details',
        email: 'kris@ninghuoban.com'
    }
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: '尾号0929', phone: '13913380929', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop' },
  { id: '2', name: '李四', phone: '13800138000', avatar: '' },
  { id: '3', name: '王五', phone: '13900139000', avatar: '' },
];

export const MOCK_ORDERS: Settlement[] = [
    {
        id: 'SET-2026010901',
        salesOrderId: 'SO20260109001',
        type: 'sales',
        totalAmount: 275000,
        items: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]],
        createTime: '2026-01-09 14:30:00',
        member: MOCK_MEMBERS[0],
        paidAmount: 275000,
        employeeId: '1',
        status: 'completed',
        paymentMethod: 'online'
    },
    {
        id: 'SET-2026011405',
        salesOrderId: 'SO20260114005',
        type: 'sales',
        totalAmount: 95000,
        items: [MOCK_PRODUCTS[3]],
        createTime: '2026-01-14 15:00:00',
        member: MOCK_MEMBERS[2],
        paidAmount: 95000,
        employeeId: '1',
        status: 'completed',
        paymentMethod: 'online'
    },
    {
        id: 'SET-2026011002',
        salesOrderId: 'SO20260110002',
        type: 'sales',
        totalAmount: 95000,
        items: [MOCK_PRODUCTS[2]],
        createTime: '2026-01-10 10:15:00',
        member: MOCK_MEMBERS[2],
        paidAmount: 0,
        employeeId: '1',
        status: 'pending_payment'
    },
    {
        id: 'SET-2026011003',
        salesOrderId: 'SO20260110003',
        type: 'sales',
        totalAmount: 3542,
        items: [MOCK_PRODUCTS[0]],
        createTime: '2026-01-10 16:20:00',
        member: MOCK_MEMBERS[1],
        paidAmount: 0,
        employeeId: '2',
        status: 'pending_sign'
    },
    {
        id: 'SET-2026011004',
        salesOrderId: 'SO20260110004',
        type: 'sales',
        totalAmount: 180000,
        items: [MOCK_PRODUCTS[5]],
        createTime: '2026-01-11 09:00:00',
        member: MOCK_MEMBERS[3],
        paidAmount: 0,
        employeeId: '1',
        status: 'pending_audit'
    }
];

export const MOCK_RETURN_ORDERS: ReturnOrder[] = [
    {
        id: 'RET-2026011201',
        originalOrderId: 'SO20260109001',
        amount: 275000,
        status: 'pending_audit',
        createTime: '2026-01-12 11:30:00',
        items: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]],
        member: MOCK_MEMBERS[0],
        originalPaymentMethod: 'online',
        originalPaidAmount: 275000,
        employeeId: '1'
    },
    {
        id: 'RET-2026011302',
        originalOrderId: 'SO20260108888',
        amount: 50000,
        status: 'pending_refund',
        createTime: '2026-01-13 14:20:00',
        items: [MOCK_PRODUCTS[4]],
        member: MOCK_MEMBERS[2],
        originalPaymentMethod: 'offline',
        originalPaidAmount: 50000,
        employeeId: '2'
    },
    {
        id: 'RET-2026011303',
        originalOrderId: 'SO20260105001',
        amount: 3000,
        status: 'completed',
        createTime: '2026-01-05 09:00:00',
        items: [MOCK_PRODUCTS[0]],
        member: MOCK_MEMBERS[1],
        originalPaymentMethod: 'online',
        originalPaidAmount: 3000,
        employeeId: '1'
    }
];

export const MOCK_RECYCLE_ORDERS: RecycleOrder[] = [
    {
        id: 'SJ20251218null',
        member: MOCK_MEMBERS[8],
        status: 'passed',
        totalExpectedAmount: 69999.00,
        totalSettlementAmount: 0.00,
        createTime: '2025-12-18 10:30:00',
        items: [
            {
                ...MOCK_PRODUCTS[0], // Reuse structure but override for recycle view
                title: '卡地亚',
                category: '腕表',
                imageUrl: 'https://images.unsplash.com/photo-1594576722512-582bcd46fba3?q=80&w=400&auto=format&fit=crop',
                expectedPrice: 69999.00,
                settlementPrice: 0,
            }
        ]
    },
    {
        id: 'SJ202512180080',
        member: MOCK_MEMBERS[8],
        status: 'passed',
        totalExpectedAmount: 99999.00,
        totalSettlementAmount: 0.00,
        createTime: '2025-12-18 11:15:00',
        items: [
            {
                ...MOCK_PRODUCTS[1],
                title: '劳力士测试',
                category: '腕表',
                imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=400&auto=format&fit=crop',
                expectedPrice: 99999.00,
                settlementPrice: 0,
            }
        ]
    }
];