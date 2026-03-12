
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactData } from "./types";

interface PersonalInfoSectionProps {
  contactData: ContactData;
  updateField: (field: keyof ContactData, value: string) => void;
}

export function PersonalInfoSection({ contactData, updateField }: PersonalInfoSectionProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={contactData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={contactData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={contactData.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="Auto-generated from first and last name"
        />
      </div>
    </>
  );
}
