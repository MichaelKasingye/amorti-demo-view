
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Deal } from "@/types/deals";
import { StageBadge } from "./StageBadge";
import { DealActionMenu } from "./DealActionMenu";
import { exportTableData } from "@/utils/csvExport";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DealsTableViewProps {
  deals: Deal[];
  onMoveDeal: (dealId: string, targetStage: Deal['stage']) => void;
  onViewDeal?: (deal: Deal) => void;
  onEditDeal?: (deal: Deal) => void;
  onChangeStage?: (deal: Deal) => void;
  onAddNote?: (deal: Deal) => void;
}

export const DealsTableView = ({ deals, onMoveDeal, onViewDeal, onEditDeal, onChangeStage, onAddNote }: DealsTableViewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(deals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDeals = deals.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDeal = (deal: Deal) => {
    navigate(`/dashboard/deals/${deal.id}`);
  };

  const handleExportCSV = () => {
    const customHeaders = {
      'contact.name': 'Client Name',
      'contact.company': 'Company',
      'stage': 'Stage',
      'loanAmount': 'Loan Amount',
      'currency': 'Currency',
      'loanTerm': 'Loan Duration (Months)',
      'description': 'Description',
      'expectedClosingDate': 'Expected Closing Date'
    };
    
    exportTableData(deals, 'deals-export', customHeaders);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleExportCSV} className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead className="text-right">Loan Amount</TableHead>
              <TableHead>Loan Duration (Months)</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDeals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No deals found.
                </TableCell>
              </TableRow>
            ) : (
              currentDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.contact.name}</TableCell>
                  <TableCell>{deal.contact.company}</TableCell>
                  <TableCell>
                    <StageBadge stage={deal.stage} />
                  </TableCell>
                  <TableCell className="text-right">{deal.loanAmount.toLocaleString()} {deal.currency}</TableCell>
                  <TableCell>{deal.loanTerm} months</TableCell>
                  <TableCell>
                    <DealActionMenu 
                      deal={deal} 
                      onMoveDeal={onMoveDeal} 
                      onViewDeal={handleViewDeal}
                      onEditDeal={onEditDeal}
                      onChangeStage={onChangeStage}
                      onAddNote={onAddNote}
                      showMoveOptions={false} 
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) handlePageChange(currentPage + 1);
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
