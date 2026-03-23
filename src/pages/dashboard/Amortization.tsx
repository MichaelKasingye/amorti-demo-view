import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, DollarSign, Percent, Calendar, User, Phone, Mail, Building, Banknote } from "lucide-react";
import AmortizationTable from "@/components/amortization/AmortizationTable";
import AmortizationCharts from "@/components/amortization/AmortizationCharts";
import PDFDownload from "@/components/amortization/PDFDownload";

interface AmortizationResult {
  monthlyPayment: number;
  totalInterest: number;
  salaryPercentage: number;
  netLoanAmount: number;
}

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  // { code: 'EUR', symbol: '€', name: 'Euro' },
  // { code: 'GBP', symbol: '£', name: 'British Pound' },
  // { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  // { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  // { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  // { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  // { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  // { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  // { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  // { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' },
  // { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  // { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' },
];

export default function Amortization() {
  const [formData, setFormData] = useState({
    loanAmount: '',
    interestRate: '',
    loanDuration: '',
    salary: '',
    runningLoan: '',
    clientName: '',
    contactPhone: '',
    email: '',
    clientEmployer: '',
  });

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [result, setResult] = useState<AmortizationResult | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number): string => {
    const isJPY = selectedCurrency.code === 'JPY';
    return `${selectedCurrency.symbol}${amount.toLocaleString('en-US', { 
      minimumFractionDigits: isJPY ? 0 : 2, 
      maximumFractionDigits: isJPY ? 0 : 2 
    })}`;
  };

  const calculateAmortization = () => {
    const loanAmount = parseFloat(formData.loanAmount) || 0;
    const annualRate = parseFloat(formData.interestRate) || 0;
    const months = parseInt(formData.loanDuration) || 0;
    const salary = parseFloat(formData.salary) || 0;
    const runningLoan = parseFloat(formData.runningLoan) || 0;

    if (loanAmount <= 0 || annualRate <= 0 || months <= 0) {
      alert('Please enter valid loan amount, interest rate, and duration');
      return;
    }

    // Calculate monthly interest rate
    const monthlyRate = (annualRate / 100) / 12;
    
    // Calculate monthly payment using amortization formula
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);

    // Calculate total interest
    const totalInterest = (monthlyPayment * months) - loanAmount;

    // Calculate salary percentage
    const salaryPercentage = salary > 0 ? (monthlyPayment / salary) * 100 : 0;

    // Calculate net loan amount (after deducting running loan)
    const netLoanAmount = loanAmount - runningLoan;

    setResult({
      monthlyPayment,
      totalInterest,
      salaryPercentage,
      netLoanAmount
    });
  };

  const resetForm = () => {
    setFormData({
      loanAmount: '',
      interestRate: '',
      loanDuration: '',
      salary: '',
      runningLoan: '',
      clientName: '',
      contactPhone: '',
      email: '',
      clientEmployer: '',
    });
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calculator className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Amortization Calculator</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>
              Enter the loan and client information to calculate amortization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Currency Selection */}
            <div className="space-y-2">
              <Label htmlFor="currency" className="flex items-center gap-2">
                <Banknote className="h-4 w-4" />
                Currency
              </Label>
              <Select 
                value={selectedCurrency.code} 
                onValueChange={(value) => {
                  const currency = currencies.find(c => c.code === value);
                  if (currency) setSelectedCurrency(currency);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{currency.symbol}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground">- {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Loan Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Loan Amount ({selectedCurrency.code})
                </Label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder={`Enter loan amount in ${selectedCurrency.code}`}
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate" className="flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Interest Rate (% per year)
                </Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  placeholder="Enter interest rate"
                  value={formData.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanDuration" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Loan Duration (months)
                </Label>
                <Input
                  id="loanDuration"
                  type="number"
                  placeholder="Enter duration in months"
                  value={formData.loanDuration}
                  onChange={(e) => handleInputChange('loanDuration', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Monthly Salary ({selectedCurrency.code})
                </Label>
                <Input
                  id="salary"
                  type="number"
                  placeholder={`Enter monthly salary in ${selectedCurrency.code}`}
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="runningLoan" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Running Loan Amount ({selectedCurrency.code})
                </Label>
                <Input
                  id="runningLoan"
                  type="number"
                  placeholder={`Enter existing loan amount in ${selectedCurrency.code}`}
                  value={formData.runningLoan}
                  onChange={(e) => handleInputChange('runningLoan', e.target.value)}
                />
              </div>
            </div>

            {/* Client Information */}
            <div className="border-t pt-4 mt-6">
              <h3 className="text-lg font-semibold mb-4">Client Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Client Name
                  </Label>
                  <Input
                    id="clientName"
                    type="text"
                    placeholder="Enter client name"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Phone
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientEmployer" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Client Employer
                  </Label>
                  <Input
                    id="clientEmployer"
                    type="text"
                    placeholder="Enter employer name"
                    value={formData.clientEmployer}
                    onChange={(e) => handleInputChange('clientEmployer', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={calculateAmortization} className="flex-1">
                Calculate Amortization
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Calculation Results</CardTitle>
            <CardDescription>
              Amortization breakdown and loan analysis in {selectedCurrency.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Monthly Payment</div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(result.monthlyPayment)}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Interest Paid</div>
                    <div className="text-2xl font-bold text-orange-600">
                      {formatCurrency(result.totalInterest)}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Loan Payment as % of Salary</div>
                    <div className={`text-2xl font-bold ${result.salaryPercentage > 30 ? 'text-red-600' : result.salaryPercentage > 20 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {result.salaryPercentage.toFixed(2)}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {result.salaryPercentage > 30 ? 'High risk' : result.salaryPercentage > 20 ? 'Moderate risk' : 'Low risk'}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Net Loan Amount (After Running Loan)</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(result.netLoanAmount)}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <PDFDownload 
                    formData={formData}
                    result={result}
                    selectedCurrency={selectedCurrency}
                    formatCurrency={formatCurrency}
                  />
                </div>

                {formData.clientName && (
                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-2">Client Summary</h3>
                    <div className="text-sm space-y-1">
                      <div><strong>Name:</strong> {formData.clientName}</div>
                      {formData.contactPhone && <div><strong>Phone:</strong> {formData.contactPhone}</div>}
                      {formData.email && <div><strong>Email:</strong> {formData.email}</div>}
                      {formData.clientEmployer && <div><strong>Employer:</strong> {formData.clientEmployer}</div>}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter loan details and click calculate to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Section */}
      {/* {result && (
        <div className="space-y-6">
          <Tabs defaultValue="charts" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="charts">Charts & Analysis</TabsTrigger>
              <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="charts" className="space-y-6">
              <AmortizationCharts
                loanAmount={parseFloat(formData.loanAmount) || 0}
                totalInterest={result.totalInterest}
                monthlyPayment={result.monthlyPayment}
                interestRate={parseFloat(formData.interestRate) || 0}
                months={parseInt(formData.loanDuration) || 0}
                formatCurrency={formatCurrency}
              />
            </TabsContent>
            
            <TabsContent value="schedule">
              <AmortizationTable
                loanAmount={parseFloat(formData.loanAmount) || 0}
                interestRate={parseFloat(formData.interestRate) || 0}
                months={parseInt(formData.loanDuration) || 0}
                formatCurrency={formatCurrency}
              />
            </TabsContent>
          </Tabs>
        </div>
      )} */}
    </div>
  );
}
