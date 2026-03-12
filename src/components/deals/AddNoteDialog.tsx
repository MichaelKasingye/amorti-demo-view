
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Deal, DealNote } from "@/types/deals";
import { useState } from "react";

interface AddNoteDialogProps {
  deal: Deal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNote: (dealId: string, note: Omit<DealNote, 'id' | 'createdAt'>) => void;
}

export const AddNoteDialog = ({ deal, open, onOpenChange, onAddNote }: AddNoteDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!deal) return null;

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onAddNote(deal.id, {
        title: title.trim(),
        description: description.trim(),
        createdBy: "Current User" // In a real app, this would come from auth
      });
      onOpenChange(false);
      setTitle("");
      setDescription("");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTitle("");
      setDescription("");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Deal: {deal.description}</Label>
            <p className="text-sm text-muted-foreground">{deal.contact.company}</p>
          </div>
          
          <div>
            <Label htmlFor="note-title">Note Title</Label>
            <Input
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
            />
          </div>

          <div>
            <Label htmlFor="note-description">Description</Label>
            <Textarea
              id="note-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter note description"
              rows={4}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim() || !description.trim()}>
            Add Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
