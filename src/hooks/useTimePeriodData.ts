
import { useMemo } from 'react';
import { subDays, subWeeks, subMonths, isAfter, isBefore } from 'date-fns';
import { TimePeriod, DateRange } from '@/components/dashboard/TimePeriodSelector';

interface DataPoint {
  name: string;
  contacts: number;
  deals: number;
  amt: number;
}

const fullData: DataPoint[] = [
  { name: 'Jan', contacts: 40, deals: 24, amt: 2400 },
  { name: 'Feb', contacts: 55, deals: 28, amt: 2210 },
  { name: 'Mar', contacts: 62, deals: 32, amt: 2290 },
  { name: 'Apr', contacts: 78, deals: 36, amt: 2000 },
  { name: 'May', contacts: 95, deals: 42, amt: 2181 },
  { name: 'Jun', contacts: 112, deals: 46, amt: 2500 },
];

// Generate daily data for more granular periods
const generateDailyData = (): DataPoint[] => {
  const dailyData: DataPoint[] = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = subDays(now, i);
    const dayName = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Generate some realistic daily data
    const baseContacts = Math.floor(Math.random() * 20) + 5;
    const baseDeals = Math.floor(baseContacts * 0.6);
    const baseAmt = baseDeals * (Math.floor(Math.random() * 200) + 100);
    
    dailyData.push({
      name: dayName,
      contacts: baseContacts,
      deals: baseDeals,
      amt: baseAmt
    });
  }
  
  return dailyData;
};

const dailyData = generateDailyData();

export function useTimePeriodData(period: TimePeriod, customRange?: DateRange) {
  return useMemo(() => {
    const now = new Date();
    
    switch (period) {
      case 'day': {
        // Return last 24 hours of data (using last day from daily data)
        return dailyData.slice(-1);
      }
      
      case 'week': {
        // Return last 7 days
        return dailyData.slice(-7);
      }
      
      case 'month': {
        // Return last 30 days
        return dailyData.slice(-30);
      }
      
      case 'custom': {
        if (!customRange) return fullData;
        
        // For custom range, we'll use monthly data as a base
        // In a real app, you'd filter based on actual dates
        const monthsInRange = Math.ceil(
          (customRange.to.getTime() - customRange.from.getTime()) / (1000 * 60 * 60 * 24 * 30)
        );
        
        return fullData.slice(0, Math.min(monthsInRange, fullData.length));
      }
      
      default:
        return fullData;
    }
  }, [period, customRange]);
}

export function useTimePeriodStats(period: TimePeriod, customRange?: DateRange) {
  const data = useTimePeriodData(period, customRange);
  
  return useMemo(() => {
    const totalContacts = data.reduce((sum, item) => sum + item.contacts, 0);
    const totalDeals = data.reduce((sum, item) => sum + item.deals, 0);
    const totalRevenue = data.reduce((sum, item) => sum + item.amt, 0);
    
    // Calculate growth percentages (simulated)
    const getGrowthPercentage = (current: number) => {
      const growth = Math.floor(Math.random() * 30) - 10; // -10% to +20%
      return growth;
    };
    
    return {
      totalContacts,
      totalDeals,
      totalRevenue,
      contactsGrowth: getGrowthPercentage(totalContacts),
      dealsGrowth: getGrowthPercentage(totalDeals),
      revenueGrowth: getGrowthPercentage(totalRevenue),
      teamMembers: 8 // Static for now
    };
  }, [data]);
}
