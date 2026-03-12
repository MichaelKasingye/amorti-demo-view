
import { Badge } from "@/components/ui/badge";
import { Deal, stageLabels } from "@/types/deals";
import { DealCard } from "./DealCard";

interface DealsKanbanViewProps {
  stageGroups: Record<string, Deal[]>;
  onMoveDeal: (dealId: string, targetStage: Deal['stage']) => void;
  onViewDeal?: (deal: Deal) => void;
  onEditDeal?: (deal: Deal) => void;
}

export const DealsKanbanView = ({ stageGroups, onMoveDeal, onViewDeal, onEditDeal }: DealsKanbanViewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {['discovery', 'proposal', 'negotiation', 'closed-won', 'closed-lost'].map((stage) => (
        <div key={stage} className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{stageLabels[stage as keyof typeof stageLabels]}</h3>
            <Badge variant="outline">
              {stageGroups[stage].length}
            </Badge>
          </div>
          <div className="flex-1 space-y-3">
            {stageGroups[stage].map((deal) => (
              <DealCard 
                key={deal.id} 
                deal={deal} 
                onMoveDeal={onMoveDeal}
                onViewDeal={onViewDeal}
                onEditDeal={onEditDeal}
              />
            ))}
            {stageGroups[stage].length === 0 && (
              <div className="text-center p-4 border border-dashed rounded-md text-sm text-muted-foreground">
                No deals in this stage
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
