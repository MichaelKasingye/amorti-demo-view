
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Deal, DealType, productOptionsByDealType } from "@/types/deals";
import { StageBadge } from "./StageBadge";
import { DealTypeBadge } from "./DealTypeBadge";
import { DealActionMenu } from "./DealActionMenu";
import { exportTableData } from "@/utils/csvExport";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type DealTypeTab = "all" | DealType;

interface DealsTableViewProps {
  deals: Deal[];
  onMoveDeal: (dealId: string, targetStage: Deal['stage']) => void;
  onViewDeal?: (deal: Deal) => void;
  onEditDeal?: (deal: Deal) => void;
  onChangeStage?: (deal: Deal) => void;
  onAddNote?: (deal: Deal) => void;
  dealTypeTab: DealTypeTab;
  onDealTypeTabChange: (tab: DealTypeTab) => void;
}

const getProductName = (deal: Deal) =>
  productOptionsByDealType[deal.dealType].find(product => product.id === deal.productId)?.name ?? deal.productId;

export const DealsTableView = ({ deals, onMoveDeal, onViewDeal, onEditDeal, onChangeStage, onAddNote, dealTypeTab, onDealTypeTabChange }: DealsTableViewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const showLoanColumns = dealTypeTab !== "account";
  const columnCount = showLoanColumns ? 8 : 6;

  const visibleDeals = dealTypeTab === "all" ? deals : deals.filter(deal => deal.dealType === dealTypeTab);

  const totalPages = Math.ceil(visibleDeals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDeals = visibleDeals.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDealTypeTabChange = (value: string) => {
    onDealTypeTabChange(value as DealTypeTab);
    setCurrentPage(1);
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
    
    exportTableData(visibleDeals, 'deals-export', customHeaders);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs value={dealTypeTab} onValueChange={handleDealTypeTabChange}>
          <TabsList>
            <TabsTrigger value="all">All Deals</TabsTrigger>
            <TabsTrigger value="account">Accounts</TabsTrigger>
            <TabsTrigger value="loan">Loans</TabsTrigger>
          </TabsList>
        </Tabs>

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
              <TableHead>Type</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Stage</TableHead>
              {showLoanColumns && (
                <>
                  <TableHead className="text-right">Loan Amount</TableHead>
                  <TableHead>Loan Duration (Months)</TableHead>
                </>
              )}
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDeals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} className="h-24 text-center">
                  No deals found.
                </TableCell>
              </TableRow>
            ) : (
              currentDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.contact.name}</TableCell>
                  <TableCell>{deal.contact.company}</TableCell>
                  <TableCell>
                    <DealTypeBadge dealType={deal.dealType} />
                  </TableCell>
                  <TableCell>{getProductName(deal)}</TableCell>
                  <TableCell>
                    <StageBadge stage={deal.stage} />
                  </TableCell>
                  {showLoanColumns && (
                    <>
                      <TableCell className="text-right">
                        {deal.dealType === 'loan' ? `${deal.loanAmount.toLocaleString()} ${deal.currency}` : '—'}
                      </TableCell>
                      <TableCell>{deal.dealType === 'loan' ? `${deal.loanTerm} months` : '—'}</TableCell>
                    </>
                  )}
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
