
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactData } from "./types";
import { statuses, sources } from "./constants";

interface StatusSourceSectionProps {
  contactData: ContactData;
  updateField: (field: keyof ContactData, value: string) => void;
}

export function StatusSourceSection({ contactData, updateField }: StatusSourceSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={contactData.status} onValueChange={(value) => updateField('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status.toLowerCase()}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="source">Source</Label>
        <Select value={contactData.source} onValueChange={(value) => updateField('source', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            {sources.map((source) => (
              <SelectItem key={source} value={source.toLowerCase()}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
