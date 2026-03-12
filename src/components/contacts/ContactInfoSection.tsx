
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactData } from "./types";

interface ContactInfoSectionProps {
  contactData: ContactData;
  updateField: (field: keyof ContactData, value: string) => void;
}

export function ContactInfoSection({ contactData, updateField }: ContactInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={contactData.email}
          onChange={(e) => updateField('email', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={contactData.phoneNumber}
          onChange={(e) => updateField('phoneNumber', e.target.value)}
        />
      </div>
    </div>
  );
}
