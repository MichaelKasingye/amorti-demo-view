
export interface DashboardStats {
  totalContacts: number;
  contactsGrowth: number;
  totalDeals: number;
  dealsGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  teamMembers: number;
}

export interface DashboardChartData {
  name: string;
  contacts: number;
  deals: number;
  revenue: number;
}

export interface DashboardActivity {
  id: string;
  type: 'contact' | 'deal' | 'meeting' | 'task';
  title: string;
  user: string;
  time: string;
  createdAt: string;
}

export interface DashboardApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Simulate API delay
const simulateDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock data for dashboard
const MOCK_STATS: DashboardStats = {
  totalContacts: 2547,
  contactsGrowth: 12.5,
  totalDeals: 186,
  dealsGrowth: 8.3,
  totalRevenue: 1250000,
  revenueGrowth: 15.7,
  teamMembers: 24
};

const MOCK_CHART_DATA: DashboardChartData[] = [
  { name: 'Jan', contacts: 40, deals: 24, revenue: 85000 },
  { name: 'Feb', contacts: 55, deals: 28, revenue: 92000 },
  { name: 'Mar', contacts: 62, deals: 32, revenue: 98000 },
  { name: 'Apr', contacts: 78, deals: 36, revenue: 105000 },
  { name: 'May', contacts: 95, deals: 42, revenue: 112000 },
  { name: 'Jun', contacts: 112, deals: 46, revenue: 125000 },
];

const MOCK_ACTIVITIES: DashboardActivity[] = [
  {
    id: 'act_1',
    type: 'contact',
    title: 'New contact created',
    user: 'Jane Smith',
    time: '30 mins ago',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'act_2',
    type: 'deal',
    title: 'Deal moved to Negotiation',
    user: 'John Carter',
    time: '2 hours ago',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'act_3',
    type: 'meeting',
    title: 'Meeting scheduled with Acme Inc',
    user: 'Alex Johnson',
    time: '5 hours ago',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'act_4',
    type: 'task',
    title: 'Follow-up task completed',
    user: 'Sarah Williams',
    time: 'Yesterday',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
];

class DashboardApiService {
  async getDashboardStats(params?: {
    period?: 'week' | 'month' | 'quarter' | 'year';
    dateFrom?: string;
    dateTo?: string;
  }): Promise<DashboardApiResponse<DashboardStats>> {
    await simulateDelay();
    
    // In a real implementation, this would filter based on the period
    // For now, we'll just return mock data with slight variations based on period
    let stats = { ...MOCK_STATS };
    
    if (params?.period === 'week') {
      stats.totalContacts = Math.floor(stats.totalContacts * 0.15);
      stats.totalDeals = Math.floor(stats.totalDeals * 0.15);
      stats.totalRevenue = Math.floor(stats.totalRevenue * 0.15);
    } else if (params?.period === 'quarter') {
      stats.totalContacts = Math.floor(stats.totalContacts * 3);
      stats.totalDeals = Math.floor(stats.totalDeals * 3);
      stats.totalRevenue = Math.floor(stats.totalRevenue * 3);
    } else if (params?.period === 'year') {
      stats.totalContacts = Math.floor(stats.totalContacts * 12);
      stats.totalDeals = Math.floor(stats.totalDeals * 12);
      stats.totalRevenue = Math.floor(stats.totalRevenue * 12);
    }
    
    return {
      data: stats,
      message: "Dashboard statistics retrieved successfully",
      success: true
    };
  }

  async getDashboardChartData(params?: {
    period?: 'week' | 'month' | 'quarter' | 'year';
    dateFrom?: string;
    dateTo?: string;
  }): Promise<DashboardApiResponse<DashboardChartData[]>> {
    await simulateDelay();
    
    // Return different data based on period
    let chartData = [...MOCK_CHART_DATA];
    
    if (params?.period === 'week') {
      // Return last 7 days
      chartData = [
        { name: 'Mon', contacts: 8, deals: 5, revenue: 15000 },
        { name: 'Tue', contacts: 12, deals: 7, revenue: 18000 },
        { name: 'Wed', contacts: 15, deals: 9, revenue: 22000 },
        { name: 'Thu', contacts: 18, deals: 11, revenue: 25000 },
        { name: 'Fri', contacts: 22, deals: 13, revenue: 28000 },
        { name: 'Sat', contacts: 10, deals: 6, revenue: 12000 },
        { name: 'Sun', contacts: 8, deals: 4, revenue: 10000 },
      ];
    } else if (params?.period === 'quarter') {
      // Return quarterly data
      chartData = [
        { name: 'Q1', contacts: 185, deals: 96, revenue: 275000 },
        { name: 'Q2', contacts: 245, deals: 106, revenue: 315000 },
        { name: 'Q3', contacts: 285, deals: 118, revenue: 345000 },
      ];
    } else if (params?.period === 'year') {
      // Return yearly data
      chartData = [
        { name: '2022', contacts: 890, deals: 325, revenue: 980000 },
        { name: '2023', contacts: 1250, deals: 428, revenue: 1350000 },
        { name: '2024', contacts: 1580, deals: 512, revenue: 1720000 },
      ];
    }
    
    return {
      data: chartData,
      message: "Dashboard chart data retrieved successfully",
      success: true
    };
  }

  async getRecentActivity(params?: {
    limit?: number;
    type?: 'contact' | 'deal' | 'meeting' | 'task';
  }): Promise<DashboardApiResponse<DashboardActivity[]>> {
    await simulateDelay();
    
    let activities = [...MOCK_ACTIVITIES];
    
    // Filter by type if specified
    if (params?.type) {
      activities = activities.filter(activity => activity.type === params.type);
    }
    
    // Apply limit
    const limit = params?.limit || 10;
    activities = activities.slice(0, limit);
    
    return {
      data: activities,
      message: "Recent activities retrieved successfully",
      success: true
    };
  }

  async getDealsByStage(): Promise<DashboardApiResponse<{ name: string; value: number }[]>> {
    await simulateDelay();
    
    const dealsByStage = [
      { name: 'Discovery', value: 35 },
      { name: 'Proposal', value: 28 },
      { name: 'Negotiation', value: 12 },
      { name: 'Closed Won', value: 18 },
      { name: 'Closed Lost', value: 7 },
    ];
    
    return {
      data: dealsByStage,
      message: "Deals by stage retrieved successfully",
      success: true
    };
  }
}

export const dashboardApi = new DashboardApiService();
