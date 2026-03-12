
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal,
  ArrowRight,
  Eye,
  Pencil,
  Trash,
  FileText
} from "lucide-react";
import { Deal, stageLabels } from "@/types/deals";

interface DealActionMenuProps {
  deal: Deal;
  onMoveDeal: (dealId: string, targetStage: Deal['stage']) => void;
  onViewDeal?: (deal: Deal) => void;
  onEditDeal?: (deal: Deal) => void;
  onChangeStage?: (deal: Deal) => void;
  onAddNote?: (deal: Deal) => void;
  showMoveOptions?: boolean;
}

export const DealActionMenu = ({ 
  deal, 
  onMoveDeal, 
  onViewDeal,
  onEditDeal,
  onChangeStage,
  onAddNote,
  showMoveOptions = true 
}: DealActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-7 w-7 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDeal?.(deal)}>
          <Eye className="mr-2 h-4 w-4" />
          View Deal
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEditDeal?.(deal)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Deal
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAddNote?.(deal)}>
          <FileText className="mr-2 h-4 w-4" />
          Add Note
        </DropdownMenuItem>
        {showMoveOptions && (
          <>
            {deal.stage !== 'discovery' && (
              <DropdownMenuItem onClick={() => onMoveDeal(deal.id, 'discovery')}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Move to Discovery
              </DropdownMenuItem>
            )}
            {deal.stage !== 'proposal' && (
              <DropdownMenuItem onClick={() => onMoveDeal(deal.id, 'proposal')}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Move to Proposal
              </DropdownMenuItem>
            )}
            {deal.stage !== 'negotiation' && (
              <DropdownMenuItem onClick={() => onMoveDeal(deal.id, 'negotiation')}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Move to Negotiation
              </DropdownMenuItem>
            )}
            {deal.stage !== 'closed-won' && (
              <DropdownMenuItem onClick={() => onMoveDeal(deal.id, 'closed-won')}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Mark as Won
              </DropdownMenuItem>
            )}
            {deal.stage !== 'closed-lost' && (
              <DropdownMenuItem onClick={() => onMoveDeal(deal.id, 'closed-lost')}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Mark as Lost
              </DropdownMenuItem>
            )}
          </>
        )}
        {!showMoveOptions && (
          <DropdownMenuItem onClick={() => onChangeStage?.(deal)}>
            <ArrowRight className="mr-2 h-4 w-4" />
            Change Stage
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="text-destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete Deal
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
