export interface Order {
  id: string;
  organizationId: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  subtotal: number;
  tax: number;
  discount?: number;
  items: OrderItem[];
  customer?: Customer;
  organization: Organization;
  currency?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  modifiers?: OrderModifier[];
}

export interface OrderModifier {
  id: string;
  name: string;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  paystackPublicKey: string;
  paystackSubaccountId: string;
  paymentSplitPercentage: number;
}

export interface PaymentLinkResponse {
  orderId: string;
  paymentLink: string;
  qrCodeUrl: string;
  expiresAt: string;
  status: string;
}

export interface PaymentStatusResponse {
  orderId: string;
  paymentStatus: string;
  paymentMethod?: string;
  amount: number;
  paystackReference?: string;
  initializedAt?: string;
  completedAt?: string;
  organizationAmount?: number;
  platformAmount?: number;
  webhookVerified?: boolean;
  webhookVerifiedAt?: string;
}

export interface VerifyOrderRequest {
  orderId: string;
}

export interface VerifyOrderResponse {
  valid: boolean;
  orderId?: string;
  organizationId?: string;
  total?: number;
  status?: string;
  organization?: Organization;
  error?: string;
}

export interface InitializePaymentRequest {
  orderId: string;
  email: string;
}

export interface InitializePaymentResponse {
  checkoutUrl: string;
  sessionId: string;
  amount: number;
  idempotencyKey: string;
  paystackReference?: string;
  paystackAccessCode?: string;
}

export interface PaymentStatusPollingResponse {
  orderId: string;
  status: string;
  amount: number;
  completedAt?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}
