
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ContactForm } from "@/components/contacts/ContactForm";
import { ContactData } from "@/components/contacts/types";

const ContactCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [contactData, setContactData] = useState<ContactData>({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    company: "",
    industry: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    status: "",
    source: "",
    lastContactedAt: "",
  });

  const updateField = (field: keyof ContactData, value: string) => {
    setContactData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate full name when first or last name changes
      if (field === 'firstName' || field === 'lastName') {
        updated.name = `${field === 'firstName' ? value : prev.firstName} ${field === 'lastName' ? value : prev.lastName}`.trim();
      }
      
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactData.firstName || !contactData.lastName || !contactData.email) {
      toast({
        title: "Error",
        description: "First name, last name, and email are required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Contact created successfully",
      });
      navigate("/dashboard/contacts");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/dashboard/contacts");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create Contact</h1>
          <p className="text-muted-foreground">Add a new contact to your CRM</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>

      <ContactForm
        contactData={contactData}
        updateField={updateField}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ContactCreate;
