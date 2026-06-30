
import { Badge } from "@/components/ui/badge";
import { Deal, dealTypeLabels, dealTypeBadgeStyles } from "@/types/deals";

interface DealTypeBadgeProps {
  dealType: Deal['dealType'];
}

export const DealTypeBadge = ({ dealType }: DealTypeBadgeProps) => (
  <Badge variant="outline" className={dealTypeBadgeStyles[dealType]}>
    {dealTypeLabels[dealType]}
  </Badge>
);
