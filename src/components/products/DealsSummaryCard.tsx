
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Deal } from "@/types/deals";

interface DealsSummaryCardProps {
  deals: Deal[];
}

export const DealsSummaryCard = ({ deals }: DealsSummaryCardProps) => {
  const totalDealsValue = deals.reduce((sum, deal) => sum + deal.loanAmount, 0);
  const activeDeals = deals.filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage)).length;
  const wonDeals = deals.filter(deal => deal.stage === 'closed-won').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Deals Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Deals:</span>
          <span className="font-semibold">{deals.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Value:</span>
          <span className="font-semibold">{totalDealsValue.toLocaleString()} {deals[0]?.currency || 'UGX'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Active Deals:</span>
          <span className="font-semibold">{activeDeals}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Won Deals:</span>
          <span className="font-semibold text-green-600">{wonDeals}</span>
        </div>
      </CardContent>
    </Card>
  );
};
