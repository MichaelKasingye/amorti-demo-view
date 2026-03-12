import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Deal, DealNote, stageLabels, sampleDeals } from "@/types/deals";
import { DealsHeader } from "@/components/deals/DealsHeader";
import { DealsFilters } from "@/components/deals/DealsFilters";
import { DealsKanbanView } from "@/components/deals/DealsKanbanView";
import { DealsTableView } from "@/components/deals/DealsTableView";
import { EditDealDialog } from "@/components/deals/EditDealDialog";
import { ChangeStageDialog } from "@/components/deals/ChangeStageDialog";
import { AddNoteDialog } from "@/components/deals/AddNoteDialog";
import { TimePeriodSelector, TimePeriod, DateRange } from "@/components/dashboard/TimePeriodSelector";

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isChangeStageDialogOpen, setIsChangeStageDialogOpen] = useState(false);
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false);
  const [deals, setDeals] = useState<Deal[]>(sampleDeals);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>();
  const { toast } = useToast();

  const handleTimePeriodChange = (period: TimePeriod, dateRange?: DateRange) => {
    setTimePeriod(period);
    if (period === 'custom' && dateRange) {
      setCustomDateRange(dateRange);
    }
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = 
      deal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = !stageFilter || deal.stage === stageFilter;
    
    return matchesSearch && matchesStage;
  });

  const stageGroups = {
    'discovery': filteredDeals.filter(deal => deal.stage === 'discovery'),
    'proposal': filteredDeals.filter(deal => deal.stage === 'proposal'),
    'negotiation': filteredDeals.filter(deal => deal.stage === 'negotiation'),
    'closed-won': filteredDeals.filter(deal => deal.stage === 'closed-won'),
    'closed-lost': filteredDeals.filter(deal => deal.stage === 'closed-lost')
  };

  const totalAmount = filteredDeals.reduce((sum, deal) => sum + deal.loanAmount, 0);

  const moveDeal = (dealId: string, targetStage: Deal['stage']) => {
    setDeals(prevDeals => 
      prevDeals.map(deal => 
        deal.id === dealId ? { ...deal, stage: targetStage } : deal
      )
    );
    
    toast({
      title: "Deal moved",
      description: `Deal moved to ${stageLabels[targetStage]}.`
    });
  };

  const handleEditDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsEditDialogOpen(true);
  };

  const handleChangeStage = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsChangeStageDialogOpen(true);
  };

  const handleAddNote = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsAddNoteDialogOpen(true);
  };

  const handleSaveDeal = (updatedDeal: Deal) => {
    setDeals(prevDeals =>
      prevDeals.map(deal =>
        deal.id === updatedDeal.id ? updatedDeal : deal
      )
    );
  };

  const handleSaveNote = (dealId: string, noteData: Omit<DealNote, 'id' | 'createdAt'>) => {
    const newNote: DealNote = {
      id: `note_${Date.now()}`,
      ...noteData,
      createdAt: new Date().toISOString()
    };

    setDeals(prevDeals =>
      prevDeals.map(deal =>
        deal.id === dealId 
          ? { ...deal, notes: [...(deal.notes || []), newNote] }
          : deal
      )
    );

    toast({
      title: "Note added",
      description: "Note has been successfully added to the deal."
    });
  };

  return (
    <div className="space-y-6">
      <DealsHeader 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isAddDialogOpen={isAddDialogOpen}
        onAddDialogOpenChange={setIsAddDialogOpen}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DealsFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          stageFilter={stageFilter}
          onStageFilterChange={setStageFilter}
        />
        
        <TimePeriodSelector
          value={timePeriod}
          onChange={handleTimePeriodChange}
          customDateRange={customDateRange}
        />
      </div>

      <div className="font-medium">
        Total Deal Value: <span className="text-primary">{totalAmount.toLocaleString()} {filteredDeals[0]?.currency || 'UGX'}</span>
      </div>

      {viewMode === "kanban" ? (
        <DealsKanbanView 
          stageGroups={stageGroups} 
          onMoveDeal={moveDeal}
          onEditDeal={handleEditDeal}
        />
      ) : (
        <DealsTableView 
          deals={filteredDeals} 
          onMoveDeal={moveDeal}
          onEditDeal={handleEditDeal}
          onChangeStage={handleChangeStage}
          onAddNote={handleAddNote}
        />
      )}

      <EditDealDialog
        deal={selectedDeal}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveDeal}
      />

      <ChangeStageDialog
        deal={selectedDeal}
        open={isChangeStageDialogOpen}
        onOpenChange={setIsChangeStageDialogOpen}
        onStageChange={moveDeal}
      />

      <AddNoteDialog
        deal={selectedDeal}
        open={isAddNoteDialogOpen}
        onOpenChange={setIsAddNoteDialogOpen}
        onAddNote={handleSaveNote}
      />
    </div>
  );
};

export default Deals;
