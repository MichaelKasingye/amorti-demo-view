
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { ContactInfoSection } from "./ContactInfoSection";
import { ProfessionalInfoSection } from "./ProfessionalInfoSection";
import { AddressInfoSection } from "./AddressInfoSection";
import { StatusSourceSection } from "./StatusSourceSection";
import { ContactData } from "./types";

interface ContactFormProps {
  contactData: ContactData;
  updateField: (field: keyof ContactData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function ContactForm({ 
  contactData, 
  updateField, 
  onSubmit, 
  onCancel, 
  isLoading 
}: ContactFormProps) {
  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Enter the contact's details below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <PersonalInfoSection contactData={contactData} updateField={updateField} />
          <ContactInfoSection contactData={contactData} updateField={updateField} />
          <ProfessionalInfoSection contactData={contactData} updateField={updateField} />
          <AddressInfoSection contactData={contactData} updateField={updateField} />
          <StatusSourceSection contactData={contactData} updateField={updateField} />

          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Contact"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
