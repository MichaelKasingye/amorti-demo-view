
import { Card, CardContent } from "@/components/ui/card";
import { DealNote } from "@/types/deals";

interface NoteCardProps {
  note: DealNote;
  onClick: () => void;
}

export const NoteCard = ({ note, onClick }: NoteCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-lg">{note.title}</h4>
          <span className="text-sm text-muted-foreground">
            {new Date(note.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
        <p className="text-muted-foreground mb-2 line-clamp-2">{note.description}</p>
        <p className="text-sm text-muted-foreground">By: {note.createdBy}</p>
      </CardContent>
    </Card>
  );
};
