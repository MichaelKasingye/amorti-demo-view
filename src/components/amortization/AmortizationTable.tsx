
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentSchedule {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface AmortizationTableProps {
  loanAmount: number;
  interestRate: number;
  months: number;
  formatCurrency: (amount: number) => string;
}

export default function AmortizationTable({ loanAmount, interestRate, months, formatCurrency }: AmortizationTableProps) {
  const generateSchedule = (): PaymentSchedule[] => {
    const monthlyRate = (interestRate / 100) / 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    
    const schedule: PaymentSchedule[] = [];
    let remainingBalance = loanAmount;

    for (let month = 1; month <= months; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance = Math.max(0, remainingBalance - principalPayment);

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance
      });

      if (remainingBalance === 0) break;
    }

    return schedule;
  };

  const schedule = generateSchedule();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Schedule</CardTitle>
        <CardDescription>
          Monthly breakdown of principal and interest payments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((payment) => (
                <TableRow key={payment.month}>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>{formatCurrency(payment.payment)}</TableCell>
                  <TableCell>{formatCurrency(payment.principal)}</TableCell>
                  <TableCell>{formatCurrency(payment.interest)}</TableCell>
                  <TableCell>{formatCurrency(payment.balance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
