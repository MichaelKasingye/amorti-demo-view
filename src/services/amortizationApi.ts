
export interface AmortizationCalculationRequest {
  loanAmount: number;
  interestRate: number;
  loanDuration: number; // in months
  salary?: number;
  runningLoan?: number;
  currency: string;
  clientName?: string;
  contactPhone?: string;
  email?: string;
  clientEmployer?: string;
}

export interface AmortizationResult {
  monthlyPayment: number;
  totalInterest: number;
  salaryPercentage: number;
  netLoanAmount: number;
  totalAmount: number;
  paymentSchedule: PaymentScheduleItem[];
}

export interface PaymentScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
}

export interface AmortizationCalculation {
  id: string;
  request: AmortizationCalculationRequest;
  result: AmortizationResult;
  createdAt: string;
}

export interface AmortizationApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  total?: number;
}

// Simulate API delay
const simulateDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

class AmortizationApiService {
  private calculations: AmortizationCalculation[] = [];

  async calculateAmortization(request: AmortizationCalculationRequest): Promise<AmortizationApiResponse<AmortizationResult>> {
    await simulateDelay();
    
    // Validate input
    if (request.loanAmount <= 0 || request.interestRate <= 0 || request.loanDuration <= 0) {
      throw new Error("Loan amount, interest rate, and duration must be positive values");
    }
    
    const { loanAmount, interestRate, loanDuration, salary = 0, runningLoan = 0 } = request;
    
    // Calculate monthly interest rate
    const monthlyRate = (interestRate / 100) / 12;
    
    // Calculate monthly payment using amortization formula
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanDuration)) / 
                          (Math.pow(1 + monthlyRate, loanDuration) - 1);

    // Calculate total interest
    const totalAmount = monthlyPayment * loanDuration;
    const totalInterest = totalAmount - loanAmount;

    // Calculate salary percentage
    const salaryPercentage = salary > 0 ? (monthlyPayment / salary) * 100 : 0;

    // Calculate net loan amount (after deducting running loan)
    const netLoanAmount = loanAmount - runningLoan;

    // Generate payment schedule
    const paymentSchedule: PaymentScheduleItem[] = [];
    let remainingBalance = loanAmount;
    let cumulativeInterest = 0;

    for (let month = 1; month <= loanDuration; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      cumulativeInterest += interestPayment;

      paymentSchedule.push({
        month,
        payment: Math.round(monthlyPayment * 100) / 100,
        principal: Math.round(principalPayment * 100) / 100,
        interest: Math.round(interestPayment * 100) / 100,
        balance: Math.max(0, Math.round(remainingBalance * 100) / 100),
        cumulativeInterest: Math.round(cumulativeInterest * 100) / 100
      });
    }

    const result: AmortizationResult = {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      salaryPercentage: Math.round(salaryPercentage * 100) / 100,
      netLoanAmount: Math.round(netLoanAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      paymentSchedule
    };

    return {
      data: result,
      message: "Amortization calculated successfully",
      success: true
    };
  }

  async saveCalculation(request: AmortizationCalculationRequest, result: AmortizationResult): Promise<AmortizationApiResponse<AmortizationCalculation>> {
    await simulateDelay();
    
    const calculation: AmortizationCalculation = {
      id: `calc_${Date.now()}`,
      request,
      result,
      createdAt: new Date().toISOString()
    };
    
    this.calculations.push(calculation);
    
    return {
      data: calculation,
      message: "Calculation saved successfully",
      success: true
    };
  }

  async getCalculations(params?: {
    page?: number;
    limit?: number;
    clientName?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<AmortizationApiResponse<AmortizationCalculation[]>> {
    await simulateDelay();
    
    let filteredCalculations = [...this.calculations];
    
    // Apply filters
    if (params?.clientName) {
      const searchTerm = params.clientName.toLowerCase();
      filteredCalculations = filteredCalculations.filter(calc =>
        calc.request.clientName?.toLowerCase().includes(searchTerm)
      );
    }
    
    if (params?.dateFrom) {
      filteredCalculations = filteredCalculations.filter(calc => 
        new Date(calc.createdAt) >= new Date(params.dateFrom!)
      );
    }
    
    if (params?.dateTo) {
      filteredCalculations = filteredCalculations.filter(calc => 
        new Date(calc.createdAt) <= new Date(params.dateTo!)
      );
    }
    
    // Sort by creation date (newest first)
    filteredCalculations.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCalculations = filteredCalculations.slice(startIndex, endIndex);
    
    return {
      data: paginatedCalculations,
      message: "Calculations retrieved successfully",
      success: true,
      total: filteredCalculations.length
    };
  }

  async getCalculationById(id: string): Promise<AmortizationApiResponse<AmortizationCalculation>> {
    await simulateDelay();
    
    const calculation = this.calculations.find(c => c.id === id);
    if (!calculation) {
      throw new Error("Calculation not found");
    }
    
    return {
      data: calculation,
      message: "Calculation retrieved successfully",
      success: true
    };
  }

  async deleteCalculation(id: string): Promise<AmortizationApiResponse<null>> {
    await simulateDelay();
    
    const calculationIndex = this.calculations.findIndex(c => c.id === id);
    if (calculationIndex === -1) {
      throw new Error("Calculation not found");
    }
    
    this.calculations.splice(calculationIndex, 1);
    
    return {
      data: null,
      message: "Calculation deleted successfully",
      success: true
    };
  }

  async getCalculationStats(): Promise<AmortizationApiResponse<{
    totalCalculations: number;
    totalLoanAmount: number;
    averageLoanAmount: number;
    averageInterestRate: number;
    averageDuration: number;
  }>> {
    await simulateDelay();
    
    if (this.calculations.length === 0) {
      return {
        data: {
          totalCalculations: 0,
          totalLoanAmount: 0,
          averageLoanAmount: 0,
          averageInterestRate: 0,
          averageDuration: 0
        },
        message: "Calculation statistics retrieved successfully",
        success: true
      };
    }
    
    const totalCalculations = this.calculations.length;
    const totalLoanAmount = this.calculations.reduce((sum, calc) => sum + calc.request.loanAmount, 0);
    const averageLoanAmount = totalLoanAmount / totalCalculations;
    const averageInterestRate = this.calculations.reduce((sum, calc) => sum + calc.request.interestRate, 0) / totalCalculations;
    const averageDuration = this.calculations.reduce((sum, calc) => sum + calc.request.loanDuration, 0) / totalCalculations;
    
    return {
      data: {
        totalCalculations,
        totalLoanAmount: Math.round(totalLoanAmount * 100) / 100,
        averageLoanAmount: Math.round(averageLoanAmount * 100) / 100,
        averageInterestRate: Math.round(averageInterestRate * 100) / 100,
        averageDuration: Math.round(averageDuration * 100) / 100
      },
      message: "Calculation statistics retrieved successfully",
      success: true
    };
  }
}

export const amortizationApi = new AmortizationApiService();
