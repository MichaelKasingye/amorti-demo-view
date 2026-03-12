
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Deal, DealNote } from "@/types/deals";
import { useState, useEffect } from "react";
import { Trash, Edit } from "lucide-react";

interface EditNoteDialogProps {
  deal: Deal | null;
  note: DealNote | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditNote: (dealId: string, noteId: string, note: Partial<DealNote>) => void;
  onDeleteNote: (dealId: string, noteId: string) => void;
}

export const EditNoteDialog = ({ 
  deal, 
  note, 
  open, 
  onOpenChange, 
  onEditNote, 
  onDeleteNote 
}: EditNoteDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
    }
  }, [note]);

  if (!deal || !note) return null;

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onEditNote(deal.id, note.id, {
        title: title.trim(),
        description: description.trim(),
      });
      setIsEditing(false);
      onOpenChange(false);
    }
  };

  const handleDelete = () => {
    onDeleteNote(deal.id, note.id);
    setShowDeleteAlert(false);
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setIsEditing(false);
      setTitle(note.title);
      setDescription(note.description);
    }
    onOpenChange(newOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Note Details
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDeleteAlert(true)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Deal: {deal.description}</Label>
              <p className="text-sm text-muted-foreground">{deal.contact.company}</p>
            </div>
            
            {isEditing ? (
              <>
                <div>
                  <Label htmlFor="edit-note-title">Note Title</Label>
                  <Input
                    id="edit-note-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-note-description">Description</Label>
                  <Textarea
                    id="edit-note-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter note description"
                    rows={6}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>Title</Label>
                  <p className="font-medium">{note.title}</p>
                </div>

                <div>
                  <Label>Description</Label>
                  <p className="text-muted-foreground whitespace-pre-wrap">{note.description}</p>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Created by: {note.createdBy}</span>
                  <span>
                    {new Date(note.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </>
            )}
          </div>
          
          {isEditing && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!title.trim() || !description.trim()}>
                Save Changes
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this note? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
