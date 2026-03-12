
import { Deal, DealNote, Contact } from "@/types/deals";

export interface DealsApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  total?: number;
}

export interface CreateDealRequest {
  description: string;
  loanAmount: number;
  currency: string;
  interestRate?: number;
  stage: Deal['stage'];
  expectedClosingDate: string;
  contact: {
    name: string;
    email: string;
    company: string;
  };
  notes?: string;
}

// Simulate API delay
const simulateDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Dummy deals data
const DUMMY_DEALS: Deal[] = [
  {
    id: "deal_1",
    departmentId: "dept_1",
    productId: "prod_1",
    description: "Home Mortgage - Johnson Family",
    loanAmount: 450000,
    currency: "USD",
    loanTerm: 30,
    salary: 75000,
    PTI: 25,
    totalInterest: 15,
    runningLoan: 0,
    stage: "proposal",
    expectedClosingDate: "2024-07-15",
    closedAt: "",
    source: "referral",
    contact: {
      contactID: "contact_1",
      firstName: "Robert",
      lastName: "Johnson", 
      name: "Robert Johnson",
      email: "robert.johnson@email.com",
      phoneNumber: "+1-555-123-4567",
      jobTitle: "Senior Manager",
      employer: "Johnson Holdings",
      company: "Johnson Holdings",
      industry: "Financial Services",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      status: "active",
      source: "referral",
      lastContactedAt: "2024-06-10T10:00:00Z"
    },
    notes: [
      {
        id: "note_1",
        title: "Initial Consultation",
        description: "Initial consultation completed. Client interested in 30-year fixed rate.",
        createdAt: "2024-06-10T10:00:00Z",
        createdBy: "John Doe"
      }
    ]
  },
  {
    id: "deal_2",
    departmentId: "dept_2",
    productId: "prod_2",
    description: "Commercial Property Loan - TechStart Inc",
    loanAmount: 2500000,
    currency: "USD",
    loanTerm: 15,
    salary: 120000,
    PTI: 30,
    totalInterest: 18,
    runningLoan: 500000,
    stage: "negotiation",
    expectedClosingDate: "2024-08-30",
    closedAt: "",
    source: "website",
    contact: {
      contactID: "contact_2",
      firstName: "Sarah",
      lastName: "Mitchell",
      name: "Sarah Mitchell",
      email: "sarah.mitchell@techstart.com",
      phoneNumber: "+1-555-987-6543",
      jobTitle: "CEO",
      employer: "TechStart Inc",
      company: "TechStart Inc",
      industry: "Technology",
      address: "456 Oak Avenue",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "United States",
      status: "active",
      source: "website",
      lastContactedAt: "2024-06-12T14:30:00Z"
    },
    notes: []
  }
];

class DealsApiService {
  private deals: Deal[] = [...DUMMY_DEALS];

  async getDeals(params?: {
    page?: number;
    limit?: number;
    search?: string;
    stage?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<DealsApiResponse<Deal[]>> {
    await simulateDelay();
    
    let filteredDeals = [...this.deals];
    
    // Apply filters
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredDeals = filteredDeals.filter(deal =>
        deal.description.toLowerCase().includes(searchTerm) ||
        deal.contact.name.toLowerCase().includes(searchTerm) ||
        deal.contact.company.toLowerCase().includes(searchTerm)
      );
    }
    
    if (params?.stage) {
      filteredDeals = filteredDeals.filter(deal => deal.stage === params.stage);
    }
    
    if (params?.dateFrom) {
      filteredDeals = filteredDeals.filter(deal => 
        new Date(deal.expectedClosingDate) >= new Date(params.dateFrom!)
      );
    }
    
    if (params?.dateTo) {
      filteredDeals = filteredDeals.filter(deal => 
        new Date(deal.expectedClosingDate) <= new Date(params.dateTo!)
      );
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedDeals = filteredDeals.slice(startIndex, endIndex);
    
    return {
      data: paginatedDeals,
      message: "Deals retrieved successfully",
      success: true,
      total: filteredDeals.length
    };
  }

  async getDealById(id: string): Promise<DealsApiResponse<Deal>> {
    await simulateDelay();
    
    const deal = this.deals.find(d => d.id === id);
    if (!deal) {
      throw new Error("Deal not found");
    }
    
    return {
      data: deal,
      message: "Deal retrieved successfully",
      success: true
    };
  }

  async createDeal(dealData: CreateDealRequest): Promise<DealsApiResponse<Deal>> {
    await simulateDelay();
    
    // Simulate validation
    if (!dealData.description || !dealData.loanAmount || !dealData.contact.name) {
      throw new Error("Description, loan amount, and contact name are required");
    }
    
    const newDeal: Deal = {
      id: `deal_${Date.now()}`,
      departmentId: "dept_default",
      productId: "prod_default",
      description: dealData.description,
      loanAmount: dealData.loanAmount,
      currency: dealData.currency || "USD",
      loanTerm: 30,
      salary: 50000,
      PTI: 25,
      totalInterest: dealData.interestRate || 0,
      runningLoan: 0,
      stage: dealData.stage || "discovery",
      expectedClosingDate: dealData.expectedClosingDate,
      closedAt: "",
      source: "manual",
      contact: {
        contactID: `contact_${Date.now()}`,
        firstName: dealData.contact.name.split(' ')[0] || '',
        lastName: dealData.contact.name.split(' ').slice(1).join(' ') || '',
        name: dealData.contact.name,
        email: dealData.contact.email,
        phoneNumber: "",
        jobTitle: "",
        employer: dealData.contact.company,
        company: dealData.contact.company,
        industry: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        status: "active",
        source: "manual",
        lastContactedAt: new Date().toISOString()
      },
      notes: dealData.notes ? [{
        id: `note_${Date.now()}`,
        title: "Initial Note",
        description: dealData.notes,
        createdAt: new Date().toISOString(),
        createdBy: "Current User"
      }] : []
    };
    
    this.deals.push(newDeal);
    
    return {
      data: newDeal,
      message: "Deal created successfully",
      success: true
    };
  }

  async updateDeal(id: string, dealData: Partial<Deal>): Promise<DealsApiResponse<Deal>> {
    await simulateDelay();
    
    const dealIndex = this.deals.findIndex(d => d.id === id);
    if (dealIndex === -1) {
      throw new Error("Deal not found");
    }
    
    const updatedDeal = {
      ...this.deals[dealIndex],
      ...dealData
    };
    
    this.deals[dealIndex] = updatedDeal;
    
    return {
      data: updatedDeal,
      message: "Deal updated successfully",
      success: true
    };
  }

  async updateDealStage(id: string, stage: Deal['stage']): Promise<DealsApiResponse<Deal>> {
    await simulateDelay();
    
    const dealIndex = this.deals.findIndex(d => d.id === id);
    if (dealIndex === -1) {
      throw new Error("Deal not found");
    }
    
    this.deals[dealIndex].stage = stage;
    
    return {
      data: this.deals[dealIndex],
      message: `Deal moved to ${stage} successfully`,
      success: true
    };
  }

  async addNoteToDeal(dealId: string, noteData: Omit<DealNote, 'id' | 'createdAt'>): Promise<DealsApiResponse<DealNote>> {
    await simulateDelay();
    
    const dealIndex = this.deals.findIndex(d => d.id === dealId);
    if (dealIndex === -1) {
      throw new Error("Deal not found");
    }
    
    const newNote: DealNote = {
      id: `note_${Date.now()}`,
      ...noteData,
      createdAt: new Date().toISOString()
    };
    
    if (!this.deals[dealIndex].notes) {
      this.deals[dealIndex].notes = [];
    }
    
    this.deals[dealIndex].notes!.push(newNote);
    
    return {
      data: newNote,
      message: "Note added successfully",
      success: true
    };
  }

  async deleteDeal(id: string): Promise<DealsApiResponse<null>> {
    await simulateDelay();
    
    const dealIndex = this.deals.findIndex(d => d.id === id);
    if (dealIndex === -1) {
      throw new Error("Deal not found");
    }
    
    this.deals.splice(dealIndex, 1);
    
    return {
      data: null,
      message: "Deal deleted successfully",
      success: true
    };
  }
}

export const dealsApi = new DealsApiService();
