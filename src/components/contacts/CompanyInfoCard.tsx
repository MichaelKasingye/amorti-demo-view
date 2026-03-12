
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";

interface Contact {
  company: string;
  lastContact?: string;
}

interface CompanyInfoCardProps {
  contact: Contact;
}

export function CompanyInfoCard({ contact }: CompanyInfoCardProps) {
  return (
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
          <span className="font-semibold">{contact.company}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last Contact:</span>
          <span>
            {contact.lastContact
              ? new Date(contact.lastContact).toLocaleDateString('en-US', { 
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })
              : "Never"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
