
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building, Calendar, DollarSign, User, FileText, Plus } from "lucide-react";
import { Deal, sampleDeals, stageLabels, stageBadgeStyles, DealNote } from "@/types/deals";
import { StageBadge } from "@/components/deals/StageBadge";
import { AddNoteDialog } from "@/components/deals/AddNoteDialog";
import { NoteCard } from "@/components/deals/NoteCard";
import { EditNoteDialog } from "@/components/deals/EditNoteDialog";
import { useToast } from "@/hooks/use-toast";

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, this would fetch from an API
  const [deals, setDeals] = useState(sampleDeals);
  const deal = deals.find(d => d.id === id);
  
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [editNoteOpen, setEditNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<DealNote | null>(null);
  
  if (!deal) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/deals')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Deal Not Found</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>The deal you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddNote = (dealId: string, note: Omit<DealNote, 'id' | 'createdAt'>) => {
    const newNote: DealNote = {
      id: `note-${Date.now()}`,
      ...note,
      createdAt: new Date().toISOString()
    };

    setDeals(prevDeals => 
      prevDeals.map(d => 
        d.id === dealId 
          ? { ...d, notes: [...(d.notes || []), newNote] }
          : d
      )
    );

    toast({
      title: "Success",
      description: "Note added successfully!"
    });
  };

  const handleEditNote = (dealId: string, noteId: string, updatedNote: Partial<DealNote>) => {
    setDeals(prevDeals => 
      prevDeals.map(d => 
        d.id === dealId 
          ? { 
              ...d, 
              notes: d.notes?.map(note => 
                note.id === noteId 
                  ? { ...note, ...updatedNote }
                  : note
              ) || []
            }
          : d
      )
    );

    toast({
      title: "Success",
      description: "Note updated successfully!"
    });
  };

  const handleDeleteNote = (dealId: string, noteId: string) => {
    setDeals(prevDeals => 
      prevDeals.map(d => 
        d.id === dealId 
          ? { ...d, notes: d.notes?.filter(note => note.id !== noteId) || [] }
          : d
      )
    );

    toast({
      title: "Success",
      description: "Note deleted successfully!"
    });
  };

  const handleNoteClick = (note: DealNote) => {
    setSelectedNote(note);
    setEditNoteOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/deals')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{deal.description}</h1>
          <p className="text-muted-foreground">{deal.contact.company}</p>
        </div>
        <StageBadge stage={deal.stage} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Deal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-semibold">{deal.loanAmount.toLocaleString()} {deal.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stage:</span>
              <span>{stageLabels[deal.stage]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contact:</span>
              <span>{deal.contact.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expected Closing:</span>
              <span>{new Date(deal.expectedClosingDate).toLocaleDateString('en-US', { 
                year: 'numeric',
                month: 'long', 
                day: 'numeric'
              })}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company:</span>
              <span className="font-semibold">{deal.contact.company}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Description:</span>
              <span>{deal.description}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Notes
            </CardTitle>
            <Button onClick={() => setAddNoteOpen(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {deal.notes && deal.notes.length > 0 ? (
            <div className="space-y-4">
              {deal.notes.map((note) => (
                <NoteCard 
                  key={note.id} 
                  note={note} 
                  onClick={() => handleNoteClick(note)}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No notes available for this deal.</p>
          )}
        </CardContent>
      </Card>

      <AddNoteDialog
        deal={deal}
        open={addNoteOpen}
        onOpenChange={setAddNoteOpen}
        onAddNote={handleAddNote}
      />

      <EditNoteDialog
        deal={deal}
        note={selectedNote}
        open={editNoteOpen}
        onOpenChange={setEditNoteOpen}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

export default DealDetails;
