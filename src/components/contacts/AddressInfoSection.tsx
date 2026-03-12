
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactData } from "./types";

interface AddressInfoSectionProps {
  contactData: ContactData;
  updateField: (field: keyof ContactData, value: string) => void;
}

export function AddressInfoSection({ contactData, updateField }: AddressInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Address Information</h3>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={contactData.address}
          onChange={(e) => updateField('address', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={contactData.city}
            onChange={(e) => updateField('city', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={contactData.state}
            onChange={(e) => updateField('state', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            value={contactData.zipCode}
            onChange={(e) => updateField('zipCode', e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          value={contactData.country}
          onChange={(e) => updateField('country', e.target.value)}
        />
      </div>
    </div>
  );
}
