
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Deal, stageLabels } from "@/types/deals";

interface DealsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  stageFilter: string | null;
  onStageFilterChange: (value: string | null) => void;
}

export const DealsFilters = ({ 
  searchTerm, 
  onSearchChange, 
  stageFilter, 
  onStageFilterChange 
}: DealsFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search deals..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select
          value={stageFilter || "all"}
          onValueChange={(value) => onStageFilterChange(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>{stageFilter ? `Stage: ${stageLabels[stageFilter as keyof typeof stageLabels]}` : "All Stages"}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="discovery">Discovery</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="negotiation">Negotiation</SelectItem>
            <SelectItem value="closed-won">Closed Won</SelectItem>
            <SelectItem value="closed-lost">Closed Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
