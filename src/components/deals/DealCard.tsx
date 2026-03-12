
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Calendar } from "lucide-react";
import { Deal } from "@/types/deals";
import { DealActionMenu } from "./DealActionMenu";

interface DealCardProps {
  deal: Deal;
  onMoveDeal: (dealId: string, targetStage: Deal['stage']) => void;
  onViewDeal?: (deal: Deal) => void;
  onEditDeal?: (deal: Deal) => void;
}

export const DealCard = ({ deal, onMoveDeal, onViewDeal, onEditDeal }: DealCardProps) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="p-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium">{deal.description}</CardTitle>
          <DealActionMenu 
            deal={deal} 
            onMoveDeal={onMoveDeal}
            onViewDeal={onViewDeal}
            onEditDeal={onEditDeal}
          />
        </div>
        <CardDescription className="text-xs">{deal.contact.company}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0 space-y-2">
        <div className="text-base font-medium">{deal.loanAmount.toLocaleString()} {deal.currency}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          <User className="h-3 w-3 mr-1" />
          <span>{deal.contact.name}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span>
            {new Date(deal.expectedClosingDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
