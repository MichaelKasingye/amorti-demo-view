
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { LayoutGrid, LayoutList } from "lucide-react";
import { AddDealDialog } from "./AddDealDialog";

interface DealsHeaderProps {
  viewMode: "kanban" | "table";
  onViewModeChange: (mode: "kanban" | "table") => void;
  isAddDialogOpen: boolean;
  onAddDialogOpenChange: (open: boolean) => void;
}

export const DealsHeader = ({ 
  viewMode, 
  onViewModeChange, 
  isAddDialogOpen, 
  onAddDialogOpenChange 
}: DealsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 className="text-2xl sm:text-3xl font-bold">Deals</h1>
      <div className="flex items-center gap-2">
        <div className="flex items-center border rounded-md p-1">
          <Toggle 
            pressed={viewMode === "kanban"} 
            onPressedChange={() => onViewModeChange("kanban")} 
            aria-label="Kanban View"
            className="data-[state=on]:bg-muted"
          >
            <LayoutGrid className="h-4 w-4" />
          </Toggle>
          <Toggle 
            pressed={viewMode === "table"} 
            onPressedChange={() => onViewModeChange("table")} 
            aria-label="Table View"
            className="data-[state=on]:bg-muted"
          >
            <LayoutList className="h-4 w-4" />
          </Toggle>
        </div>
        <AddDealDialog 
          isOpen={isAddDialogOpen} 
          onOpenChange={onAddDialogOpenChange} 
        />
      </div>
    </div>
  );
};
