
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface Contact {
  name: string;
  email: string;
  phone?: string;
  status: "active" | "inactive" | "lead";
}

interface ContactInfoCardProps {
  contact: Contact;
}

export function ContactInfoCard({ contact }: ContactInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Name:</span>
          <span className="font-semibold">{contact.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Email:</span>
          <span className="font-semibold">{contact.email}</span>
        </div>
        {contact.phone && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone:</span>
            <span className="font-semibold">{contact.phone}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status:</span>
          <span>{contact.status === "active" ? "Active" : contact.status === "lead" ? "Lead" : "Inactive"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
