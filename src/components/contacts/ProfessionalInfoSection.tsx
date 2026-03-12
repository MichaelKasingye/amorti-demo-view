
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactData } from "./types";
import { industries } from "./constants";

interface ProfessionalInfoSectionProps {
  contactData: ContactData;
  updateField: (field: keyof ContactData, value: string) => void;
}

export function ProfessionalInfoSection({ contactData, updateField }: ProfessionalInfoSectionProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={contactData.jobTitle}
            onChange={(e) => updateField('jobTitle', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={contactData.company}
            onChange={(e) => updateField('company', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select value={contactData.industry} onValueChange={(value) => updateField('industry', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
