
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Deal, stageLabels } from "@/types/deals";
import { useState } from "react";

interface ChangeStageDialogProps {
  deal: Deal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStageChange: (dealId: string, newStage: Deal['stage']) => void;
}

export const ChangeStageDialog = ({ deal, open, onOpenChange, onStageChange }: ChangeStageDialogProps) => {
  const [selectedStage, setSelectedStage] = useState<Deal['stage'] | ''>('');

  if (!deal) return null;

  const handleSave = () => {
    if (selectedStage && selectedStage !== deal.stage) {
      onStageChange(deal.id, selectedStage);
      onOpenChange(false);
      setSelectedStage('');
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSelectedStage('');
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Change Stage</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Deal: {deal.description}</Label>
            <p className="text-sm text-muted-foreground">Current stage: {stageLabels[deal.stage]}</p>
          </div>
          
          <div>
            <Label htmlFor="stage">New Stage</Label>
            <Select value={selectedStage} onValueChange={(value) => setSelectedStage(value as Deal['stage'])}>
              <SelectTrigger>
                <SelectValue placeholder="Select new stage" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(stageLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value} disabled={value === deal.stage}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!selectedStage || selectedStage === deal.stage}>
            Change Stage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
