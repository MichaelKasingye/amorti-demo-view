import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Contact, DollarSign, TrendingUp, TrendingDown, Calendar, CheckCircle2, Clock } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimePeriodSelector, TimePeriod, DateRange } from "@/components/dashboard/TimePeriodSelector";
import { useTimePeriodData, useTimePeriodStats } from "@/hooks/useTimePeriodData";

const data = [
  { name: 'Jan', contacts: 40, deals: 24, amt: 2400 },
  { name: 'Feb', contacts: 55, deals: 28, amt: 2210 },
  { name: 'Mar', contacts: 62, deals: 32, amt: 2290 },
  { name: 'Apr', contacts: 78, deals: 36, amt: 2000 },
  { name: 'May', contacts: 95, deals: 42, amt: 2181 },
  { name: 'Jun', contacts: 112, deals: 46, amt: 2500 },
];

const dealData = [
  { name: 'Discovery', value: 35 },
  { name: 'Proposal', value: 28 },
  { name: 'Negotiation', value: 12 },
  { name: 'Closed Won', value: 18 },
  { name: 'Closed Lost', value: 7 },
];

const recentActivity = [
  { type: 'contact', title: 'New contact created', user: 'Jane Smith', time: '30 mins ago' },
  { type: 'deal', title: 'Deal moved to Negotiation', user: 'John Carter', time: '2 hours ago' },
  { type: 'meeting', title: 'Meeting scheduled with HFB', user: 'Alex Johnson', time: '5 hours ago' },
  { type: 'task', title: 'Follow-up task completed', user: 'Sarah Williams', time: 'Yesterday' },
];

const Overview = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>();

  const chartData = useTimePeriodData(timePeriod, customDateRange);
  const stats = useTimePeriodStats(timePeriod, customDateRange);

  const handleTimePeriodChange = (period: TimePeriod, dateRange?: DateRange) => {
    setTimePeriod(period);
    if (period === 'custom' && dateRange) {
      setCustomDateRange(dateRange);
    }
  };

  const formatCurrency = (value: number) => `$${(value / 1000).toFixed(1)}k`;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard Overview</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <TimePeriodSelector
            value={timePeriod}
            onChange={handleTimePeriodChange}
            customDateRange={customDateRange}
          />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Last updated:</span>
            <span className="font-medium">Today, 12:30 PM</span>
          </div>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Contacts</p>
                <p className="text-3xl font-bold">{stats.totalContacts}</p>
                <p className={`text-sm font-medium flex items-center mt-1 ${
                  stats.contactsGrowth >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {stats.contactsGrowth >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stats.contactsGrowth)}% this period
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Contact className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Deals</p>
                <p className="text-3xl font-bold">{stats.totalDeals}</p>
                <p className={`text-sm font-medium flex items-center mt-1 ${
                  stats.dealsGrowth >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {stats.dealsGrowth >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stats.dealsGrowth)}% this period
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Revenue</p>
                <p className="text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                <p className={`text-sm font-medium flex items-center mt-1 ${
                  stats.revenueGrowth >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {stats.revenueGrowth >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stats.revenueGrowth)}% this period
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Team Members</p>
                <p className="text-3xl font-bold">{stats.teamMembers}</p>
                <p className="text-sm font-medium text-primary flex items-center mt-1">
                  <Users className="h-4 w-4 mr-1" />
                  View all members
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Growth Overview</CardTitle>
            <CardDescription>Contacts and deals growth over selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="contacts" stroke="#2563eb" fillOpacity={1} fill="url(#colorContacts)" />
                  <Area type="monotone" dataKey="deals" stroke="#7c3aed" fillOpacity={1} fill="url(#colorDeals)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Deal Status</CardTitle>
            <CardDescription>Current deals by sales stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dealData} layout="vertical" margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="name" type="category" className="text-xs" />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates across your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start">
                <div className="mr-4">
                  {activity.type === 'contact' && (
                    <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Contact className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                  {activity.type === 'deal' && (
                    <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  )}
                  {activity.type === 'meeting' && (
                    <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                  )}
                  {activity.type === 'task' && (
                    <div className="h-9 w-9 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    by {activity.user}
                  </p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
