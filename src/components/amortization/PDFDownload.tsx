
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from 'jspdf';

interface PDFDownloadProps {
  formData: any;
  result: any;
  selectedCurrency: { code: string; symbol: string; name: string };
  formatCurrency: (amount: number) => string;
}

export default function PDFDownload({ formData, result, selectedCurrency, formatCurrency }: PDFDownloadProps) {
  
  const generatePaymentSchedule = () => {
    const loanAmount = parseFloat(formData.loanAmount) || 0;
    const annualRate = parseFloat(formData.interestRate) || 0;
    const months = parseInt(formData.loanDuration) || 0;
    const monthlyRate = (annualRate / 100) / 12;
    const monthlyPayment = result.monthlyPayment;
    
    const schedule = [];
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

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.text('Amortization Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // Client Information
    if (formData.clientName) {
      doc.setFontSize(16);
      doc.text('Client Information', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.text(`Name: ${formData.clientName}`, 20, yPosition);
      yPosition += 7;
      
      if (formData.contactPhone) {
        doc.text(`Phone: ${formData.contactPhone}`, 20, yPosition);
        yPosition += 7;
      }
      
      if (formData.email) {
        doc.text(`Email: ${formData.email}`, 20, yPosition);
        yPosition += 7;
      }
      
      if (formData.clientEmployer) {
        doc.text(`Employer: ${formData.clientEmployer}`, 20, yPosition);
        yPosition += 7;
      }
      yPosition += 10;
    }

    // Loan Details
    doc.setFontSize(16);
    doc.text('Loan Details', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.text(`Loan Amount: ${formatCurrency(parseFloat(formData.loanAmount))}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Interest Rate: ${formData.interestRate}% per year`, 20, yPosition);
    yPosition += 7;
    doc.text(`Loan Duration: ${formData.loanDuration} months`, 20, yPosition);
    yPosition += 7;
    doc.text(`Currency: ${selectedCurrency.name} (${selectedCurrency.code})`, 20, yPosition);
    yPosition += 15;

    // Calculation Results
    doc.setFontSize(16);
    doc.text('Calculation Results', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.text(`Monthly Payment: ${formatCurrency(result.monthlyPayment)}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Total Interest: ${formatCurrency(result.totalInterest)}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Salary Percentage: ${result.salaryPercentage.toFixed(2)}%`, 20, yPosition);
    yPosition += 7;
    doc.text(`Net Loan Amount: ${formatCurrency(result.netLoanAmount)}`, 20, yPosition);
    yPosition += 15;

    // Payment Schedule Header
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.text('Payment Schedule', 20, yPosition);
    yPosition += 15;

    // Table headers
    doc.setFontSize(10);
    const colWidths = [25, 35, 35, 35, 35];
    const headers = ['Month', 'Payment', 'Principal', 'Interest', 'Balance'];
    let xPosition = 20;

    headers.forEach((header, index) => {
      doc.text(header, xPosition, yPosition);
      xPosition += colWidths[index];
    });
    yPosition += 7;

    // Draw header line
    doc.line(20, yPosition, 185, yPosition);
    yPosition += 5;

    // Payment schedule data
    const schedule = generatePaymentSchedule();
    schedule.forEach((payment, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      xPosition = 20;
      const values = [
        payment.month.toString(),
        formatCurrency(payment.payment),
        formatCurrency(payment.principal),
        formatCurrency(payment.interest),
        formatCurrency(payment.balance)
      ];

      values.forEach((value, colIndex) => {
        doc.text(value, xPosition, yPosition);
        xPosition += colWidths[colIndex];
      });
      yPosition += 5;
    });

    // Save the PDF
    const fileName = formData.clientName 
      ? `Amortization_${formData.clientName.replace(/\s+/g, '_')}.pdf`
      : 'Amortization_Report.pdf';
    
    doc.save(fileName);
  };

  return (
    <Button onClick={downloadPDF} className="w-full">
      <Download className="h-4 w-4 mr-2" />
      Download PDF Report
    </Button>
  );
}
