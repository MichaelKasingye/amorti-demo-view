
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ContactDetailsHeader } from "@/components/contacts/ContactDetailsHeader";
import { ContactInfoCard } from "@/components/contacts/ContactInfoCard";
import { CompanyInfoCard } from "@/components/contacts/CompanyInfoCard";
import { ActivityCard } from "@/components/contacts/ActivityCard";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  status: "active" | "inactive" | "lead";
  lastContact?: string;
}

const contacts: Contact[] = [
  {
    id: "c1",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Inc",
    status: "active",
    lastContact: "2023-05-15",
  },
  {
    id: "c2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    company: "XYZ Corp",
    status: "lead",
    lastContact: "2023-05-10",
  },
  {
    id: "c3",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 (555) 345-6789",
    company: "123 Industries",
    status: "inactive",
    lastContact: "2023-04-28",
  },
  {
    id: "c4",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 456-7890",
    company: "Tech Solutions",
    status: "active",
    lastContact: "2023-05-18",
  },
  {
    id: "c5",
    name: "Daniel Wilson",
    email: "daniel@example.com",
    phone: "+1 (555) 567-8901",
    company: "Global Systems",
    status: "lead",
    lastContact: "2023-05-05",
  },
  {
    id: "c6",
    name: "Olivia Martinez",
    email: "olivia@example.com",
    phone: "+1 (555) 678-9012",
    company: "Innovative Tech",
    status: "active",
    lastContact: "2023-05-17",
  },
  {
    id: "c7",
    name: "James Taylor",
    email: "james@example.com",
    phone: "+1 (555) 789-0123",
    company: "Premier Solutions",
    status: "inactive",
    lastContact: "2023-04-15",
  },
  {
    id: "c8",
    name: "Sophia Anderson",
    email: "sophia@example.com",
    phone: "+1 (555) 890-1234",
    company: "Elite Enterprises",
    status: "lead",
    lastContact: "2023-05-12",
  },
];

const ContactDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, this would fetch from an API
  const contact = contacts.find(c => c.id === id);
  
  const handleBack = () => {
    navigate('/dashboard/contacts');
  };
  
  if (!contact) {
    return (
      <div className="space-y-6">
        <ContactDetailsHeader 
          contact={{ name: "Contact Not Found", company: "", status: "inactive" }} 
          onBack={handleBack} 
        />
        <Card>
          <CardContent className="p-6">
            <p>The contact you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ContactDetailsHeader contact={contact} onBack={handleBack} />

      <div className="grid gap-6 md:grid-cols-2">
        <ContactInfoCard contact={contact} />
        <CompanyInfoCard contact={contact} />
      </div>

      <ActivityCard />
    </div>
  );
};

export default ContactDetails;
