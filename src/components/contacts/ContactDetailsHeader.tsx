
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface Contact {
  name: string;
  company: string;
  status: "active" | "inactive" | "lead";
}

interface ContactDetailsHeaderProps {
  contact: Contact;
  onBack: () => void;
}

export function ContactDetailsHeader({ contact, onBack }: ContactDetailsHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{contact.name}</h1>
        <p className="text-muted-foreground">{contact.company}</p>
      </div>
      <StatusBadge status={contact.status} />
    </div>
  );
}
