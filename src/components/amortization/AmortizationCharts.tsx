
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";

interface AmortizationChartsProps {
  loanAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  interestRate: number;
  months: number;
  formatCurrency: (amount: number) => string;
}

export default function AmortizationCharts({ 
  loanAmount, 
  totalInterest, 
  monthlyPayment, 
  interestRate, 
  months, 
  formatCurrency 
}: AmortizationChartsProps) {
  
  // Pie chart data for principal vs interest
  const pieData = [
    { name: 'Principal', value: loanAmount, fill: '#3b82f6' },
    { name: 'Interest', value: totalInterest, fill: '#f59e0b' }
  ];

  // Generate payment breakdown over time
  const generatePaymentBreakdown = () => {
    const monthlyRate = (interestRate / 100) / 12;
    const breakdown = [];
    let remainingBalance = loanAmount;

    for (let month = 1; month <= Math.min(months, 60); month += Math.max(1, Math.floor(months / 12))) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance = Math.max(0, remainingBalance - principalPayment);

      breakdown.push({
        month,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance
      });

      if (remainingBalance === 0) break;
    }

    return breakdown;
  };

  const paymentBreakdown = generatePaymentBreakdown();

  const chartConfig = {
    principal: {
      label: "Principal",
      color: "#3b82f6",
    },
    interest: {
      label: "Interest",
      color: "#f59e0b",
    },
    balance: {
      label: "Balance",
      color: "#10b981",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Principal vs Interest Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Breakdown</CardTitle>
          <CardDescription>Principal vs Total Interest</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value: number) => [formatCurrency(value), '']}
              />
            </PieChart>
          </ChartContainer>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm">Principal: {formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded"></div>
              <span className="text-sm">Interest: {formatCurrency(totalInterest)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Breakdown Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Breakdown</CardTitle>
          <CardDescription>Principal vs Interest Over Time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <BarChart data={paymentBreakdown}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value: number) => [formatCurrency(value), '']}
              />
              <Bar dataKey="principal" stackId="a" fill="#3b82f6" />
              <Bar dataKey="interest" stackId="a" fill="#f59e0b" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Remaining Balance Over Time */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Remaining Balance</CardTitle>
          <CardDescription>Loan balance reduction over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <LineChart data={paymentBreakdown}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value: number) => [formatCurrency(value), 'Balance']}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981' }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
