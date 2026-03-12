
export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  status: "active" | "canceled" | "past_due" | "unpaid" | "trialing";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialEnd?: string;
  amount: number;
  currency: string;
  interval: "monthly" | "yearly";
  createdAt: string;
  updatedAt: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: "monthly" | "yearly";
  features: string[];
  popular?: boolean;
  maxUsers?: number;
  maxDeals?: number;
  storageGB?: number;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "bank_account";
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: string;
}

export interface Invoice {
  id: string;
  number: string;
  status: "paid" | "open" | "void" | "draft";
  amount: number;
  currency: string;
  dueDate: string;
  paidAt?: string;
  downloadUrl?: string;
  createdAt: string;
}

export interface SubscriptionsApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  total?: number;
}

export interface UpdateSubscriptionRequest {
  planId: string;
}

export interface AddPaymentMethodRequest {
  token: string; // Payment token from Stripe or other provider
}

// Simulate API delay
const simulateDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Available plans
const AVAILABLE_PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small teams getting started",
    price: 29,
    currency: "USD",
    interval: "monthly",
    features: [
      "Up to 5 users",
      "100 deals per month",
      "Basic reporting",
      "Email support",
      "5GB storage"
    ],
    maxUsers: 5,
    maxDeals: 100,
    storageGB: 5
  },
  {
    id: "professional",
    name: "Professional",
    description: "Advanced features for growing businesses",
    price: 79,
    currency: "USD",
    interval: "monthly",
    features: [
      "Up to 20 users",
      "Unlimited deals",
      "Advanced reporting",
      "Priority support",
      "50GB storage",
      "Custom integrations"
    ],
    popular: true,
    maxUsers: 20,
    storageGB: 50
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Full-featured solution for large organizations",
    price: 199,
    currency: "USD",
    interval: "monthly",
    features: [
      "Unlimited users",
      "Unlimited deals",
      "Custom reporting",
      "24/7 support",
      "500GB storage",
      "Advanced security",
      "Custom integrations",
      "Dedicated account manager"
    ],
    storageGB: 500
  }
];

// Mock current subscription
const CURRENT_SUBSCRIPTION: Subscription = {
  id: "sub_1",
  planId: "professional",
  planName: "Professional",
  status: "active",
  currentPeriodStart: "2024-06-01T00:00:00Z",
  currentPeriodEnd: "2024-07-01T00:00:00Z",
  cancelAtPeriodEnd: false,
  amount: 79,
  currency: "USD",
  interval: "monthly",
  createdAt: "2024-06-01T00:00:00Z",
  updatedAt: "2024-06-01T00:00:00Z"
};

// Mock payment methods
const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "card",
    last4: "4242",
    brand: "visa",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
    createdAt: "2024-06-01T00:00:00Z"
  }
];

// Mock invoices
const INVOICES: Invoice[] = [
  {
    id: "inv_1",
    number: "INV-2024-001",
    status: "paid",
    amount: 79,
    currency: "USD",
    dueDate: "2024-06-01T00:00:00Z",
    paidAt: "2024-06-01T08:30:00Z",
    downloadUrl: "/invoices/inv_1.pdf",
    createdAt: "2024-06-01T00:00:00Z"
  },
  {
    id: "inv_2",
    number: "INV-2024-002",
    status: "paid",
    amount: 79,
    currency: "USD",
    dueDate: "2024-05-01T00:00:00Z",
    paidAt: "2024-05-01T09:15:00Z",
    downloadUrl: "/invoices/inv_2.pdf",
    createdAt: "2024-05-01T00:00:00Z"
  }
];

class SubscriptionsApiService {
  async getCurrentSubscription(): Promise<SubscriptionsApiResponse<Subscription>> {
    await simulateDelay();
    
    return {
      data: CURRENT_SUBSCRIPTION,
      message: "Current subscription retrieved successfully",
      success: true
    };
  }

  async getAvailablePlans(): Promise<SubscriptionsApiResponse<Plan[]>> {
    await simulateDelay();
    
    return {
      data: AVAILABLE_PLANS,
      message: "Available plans retrieved successfully",
      success: true
    };
  }

  async updateSubscription(request: UpdateSubscriptionRequest): Promise<SubscriptionsApiResponse<Subscription>> {
    await simulateDelay();
    
    const plan = AVAILABLE_PLANS.find(p => p.id === request.planId);
    if (!plan) {
      throw new Error("Plan not found");
    }
    
    const updatedSubscription: Subscription = {
      ...CURRENT_SUBSCRIPTION,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price,
      updatedAt: new Date().toISOString()
    };
    
    return {
      data: updatedSubscription,
      message: "Subscription updated successfully",
      success: true
    };
  }

  async cancelSubscription(): Promise<SubscriptionsApiResponse<Subscription>> {
    await simulateDelay();
    
    const canceledSubscription: Subscription = {
      ...CURRENT_SUBSCRIPTION,
      cancelAtPeriodEnd: true,
      updatedAt: new Date().toISOString()
    };
    
    return {
      data: canceledSubscription,
      message: "Subscription will be canceled at the end of the current period",
      success: true
    };
  }

  async reactivateSubscription(): Promise<SubscriptionsApiResponse<Subscription>> {
    await simulateDelay();
    
    const reactivatedSubscription: Subscription = {
      ...CURRENT_SUBSCRIPTION,
      cancelAtPeriodEnd: false,
      updatedAt: new Date().toISOString()
    };
    
    return {
      data: reactivatedSubscription,
      message: "Subscription reactivated successfully",
      success: true
    };
  }

  async getPaymentMethods(): Promise<SubscriptionsApiResponse<PaymentMethod[]>> {
    await simulateDelay();
    
    return {
      data: PAYMENT_METHODS,
      message: "Payment methods retrieved successfully",
      success: true
    };
  }

  async addPaymentMethod(request: AddPaymentMethodRequest): Promise<SubscriptionsApiResponse<PaymentMethod>> {
    await simulateDelay();
    
    const newPaymentMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: "card",
      last4: "1234", // Would come from the payment token
      brand: "mastercard",
      expiryMonth: 6,
      expiryYear: 2028,
      isDefault: false,
      createdAt: new Date().toISOString()
    };
    
    return {
      data: newPaymentMethod,
      message: "Payment method added successfully",
      success: true
    };
  }

  async setDefaultPaymentMethod(paymentMethodId: string): Promise<SubscriptionsApiResponse<PaymentMethod>> {
    await simulateDelay();
    
    const paymentMethod = PAYMENT_METHODS.find(pm => pm.id === paymentMethodId);
    if (!paymentMethod) {
      throw new Error("Payment method not found");
    }
    
    const updatedPaymentMethod = {
      ...paymentMethod,
      isDefault: true
    };
    
    return {
      data: updatedPaymentMethod,
      message: "Default payment method updated successfully",
      success: true
    };
  }

  async deletePaymentMethod(paymentMethodId: string): Promise<SubscriptionsApiResponse<null>> {
    await simulateDelay();
    
    const paymentMethod = PAYMENT_METHODS.find(pm => pm.id === paymentMethodId);
    if (!paymentMethod) {
      throw new Error("Payment method not found");
    }
    
    if (paymentMethod.isDefault) {
      throw new Error("Cannot delete the default payment method");
    }
    
    return {
      data: null,
      message: "Payment method deleted successfully",
      success: true
    };
  }

  async getInvoices(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<SubscriptionsApiResponse<Invoice[]>> {
    await simulateDelay();
    
    let filteredInvoices = [...INVOICES];
    
    // Apply status filter
    if (params?.status) {
      filteredInvoices = filteredInvoices.filter(invoice => 
        invoice.status === params.status
      );
    }
    
    // Sort by creation date (newest first)
    filteredInvoices.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);
    
    return {
      data: paginatedInvoices,
      message: "Invoices retrieved successfully",
      success: true,
      total: filteredInvoices.length
    };
  }

  async downloadInvoice(invoiceId: string): Promise<SubscriptionsApiResponse<string>> {
    await simulateDelay();
    
    const invoice = INVOICES.find(inv => inv.id === invoiceId);
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    
    return {
      data: invoice.downloadUrl || `/invoices/${invoiceId}.pdf`,
      message: "Invoice download URL generated successfully",
      success: true
    };
  }

  async getUsageStats(): Promise<SubscriptionsApiResponse<{
    currentUsers: number;
    maxUsers?: number;
    currentDeals: number;
    maxDeals?: number;
    storageUsedGB: number;
    storageMaxGB?: number;
  }>> {
    await simulateDelay();
    
    const currentPlan = AVAILABLE_PLANS.find(p => p.id === CURRENT_SUBSCRIPTION.planId);
    
    return {
      data: {
        currentUsers: 12,
        maxUsers: currentPlan?.maxUsers,
        currentDeals: 145,
        maxDeals: currentPlan?.maxDeals,
        storageUsedGB: 12.5,
        storageMaxGB: currentPlan?.storageGB
      },
      message: "Usage statistics retrieved successfully",
      success: true
    };
  }
}

export const subscriptionsApi = new SubscriptionsApiService();
