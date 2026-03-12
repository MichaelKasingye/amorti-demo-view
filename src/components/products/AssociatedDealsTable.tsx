
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Deal } from "@/types/deals";
import { StageBadge } from "@/components/deals/StageBadge";
import { exportTableData } from "@/utils/csvExport";

interface AssociatedDealsTableProps {
  deals: Deal[];
}

export const AssociatedDealsTable = ({ deals }: AssociatedDealsTableProps) => {
  const navigate = useNavigate();

  const handleExportCSV = () => {
    const customHeaders = {
      'description': 'Description',
      'contact.company': 'Company',
      'stage': 'Stage',
      'loanAmount': 'Amount',
      'currency': 'Currency',
      'expectedClosingDate': 'Expected Closing Date'
    };
    
    exportTableData(deals, 'associated-deals-export', customHeaders);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Associated Deals ({deals.length})
          </CardTitle>
          {deals.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {deals.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Expected Closing</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell className="font-medium">{deal.description}</TableCell>
                    <TableCell>{deal.contact.company}</TableCell>
                    <TableCell>
                      <StageBadge stage={deal.stage} />
                    </TableCell>
                    <TableCell className="text-right">{deal.loanAmount.toLocaleString()} {deal.currency}</TableCell>
                    <TableCell>{new Date(deal.expectedClosingDate).toLocaleDateString('en-US', { 
                      year: 'numeric',
                      month: 'short', 
                      day: 'numeric'
                    })}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/dashboard/deals/${deal.id}`)}
                      >
                        View Deal
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No deals associated with this product yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
