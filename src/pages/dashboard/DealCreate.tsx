
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContactData {
  contactID: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  employer: string;
  company: string;
  industry: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  status: string;
  source: string;
  lastContactedAt: string;
}

interface DealData {
  departmentId: string;
  productId: string;
  description: string;
  currency: string;
  loanAmount: number;
  loanTerm: number;
  salary: number;
  PTI: number;
  totalInterest: number;
  runningLoan: number;
  stage: string;
  expectedClosingDate: string;
  closedAt: string;
  source: string;
  contact: ContactData;
}

const DealCreate = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [contactMode, setContactMode] = useState<"existing" | "new">("existing");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [dealData, setDealData] = useState<DealData>({
    departmentId: "",
    productId: "",
    description: "",
    currency: "UGX",
    loanAmount: 0,
    loanTerm: 5,
    salary: 0,
    PTI: 0,
    totalInterest: 0,
    runningLoan: 0,
    stage: "negotiation",
    expectedClosingDate: "",
    closedAt: "",
    source: "sales",
    contact: {
      contactID: "",
      firstName: "",
      lastName: "",
      name: "",
      email: "",
      phoneNumber: "",
      jobTitle: "",
      employer: "",
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
    }
  });

  // Mock data - in real app, these would come from backend
  const departments = [
    { id: "dept1", name: "Sales Department" },
    { id: "dept2", name: "Marketing Department" },
    { id: "dept3", name: "Operations Department" },
  ];

  const products = [
    { id: "prod1", name: "Personal Loan" },
    { id: "prod2", name: "Business Loan" },
    { id: "prod3", name: "Car Loan" },
    { id: "prod4", name: "Mortgage Loan" },
  ];

  const existingContacts = [
    { id: "contact1", name: "John Doe", email: "john@example.com" },
    { id: "contact2", name: "Jane Smith", email: "jane@example.com" },
    { id: "contact3", name: "Bob Wilson", email: "bob@example.com" },
  ];

  const stages = ["discovery", "proposal", "negotiation", "closed-won", "closed-lost"];
  const sources = ["sales", "marketing", "referral", "website"];
  const currencies = ["UGX", "USD", "EUR", "GBP"];

  const updateDealField = (field: keyof Omit<DealData, 'contact'>, value: string | number) => {
    setDealData(prev => ({ ...prev, [field]: value }));
  };

  const updateContactField = (field: keyof ContactData, value: string) => {
    setDealData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
        // Auto-generate full name when first or last name changes
        ...(field === 'firstName' || field === 'lastName' ? {
          name: `${field === 'firstName' ? value : prev.contact.firstName} ${field === 'lastName' ? value : prev.contact.lastName}`.trim()
        } : {})
      }
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!dealData.departmentId || !dealData.productId || !dealData.description) {
        toast({
          title: "Error",
          description: "Please fill in all required deal information",
          variant: "destructive",
        });
        return;
      }
    }
    
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (contactMode === "existing" && !dealData.contact.contactID) {
      toast({
        title: "Error",
        description: "Please select a contact",
        variant: "destructive",
      });
      return;
    }

    if (contactMode === "new" && (!dealData.contact.firstName || !dealData.contact.lastName || !dealData.contact.email)) {
      toast({
        title: "Error",
        description: "Please fill in required contact information",
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
        description: "Deal created successfully",
      });
      navigate("/dashboard/deals");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create Deal</h1>
          <p className="text-muted-foreground">Add a new deal to your pipeline</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/dashboard/deals")}>
          Cancel
        </Button>
      </div>

      <div className="flex items-center max-w-4xl">
        <div 
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            step >= 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          1
        </div>
        <div className={`h-1 flex-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
        <div 
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            step >= 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          2
        </div>
        <div className={`h-1 flex-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
        <div 
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            step >= 3 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          3
        </div>
      </div>

      {step === 1 && (
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>Deal Information</CardTitle>
            <CardDescription>Enter the basic deal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={dealData.departmentId} onValueChange={(value) => updateDealField('departmentId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">Product *</Label>
                <Select value={dealData.productId} onValueChange={(value) => updateDealField('productId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the deal..."
                value={dealData.description}
                onChange={(e) => updateDealField('description', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stage">Stage</Label>
                <Select value={dealData.stage} onValueChange={(value) => updateDealField('stage', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage.charAt(0).toUpperCase() + stage.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Select value={dealData.source} onValueChange={(value) => updateDealField('source', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source.charAt(0).toUpperCase() + source.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedClosingDate">Expected Closing Date</Label>
              <Input
                id="expectedClosingDate"
                type="date"
                value={dealData.expectedClosingDate}
                onChange={(e) => updateDealField('expectedClosingDate', e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNext}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>Financial Information</CardTitle>
            <CardDescription>Enter the loan and financial details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={dealData.currency} onValueChange={(value) => updateDealField('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={dealData.loanAmount}
                  onChange={(e) => updateDealField('loanAmount', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={dealData.loanTerm}
                  onChange={(e) => updateDealField('loanTerm', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  type="number"
                  value={dealData.salary}
                  onChange={(e) => updateDealField('salary', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pti">PTI (%)</Label>
                <Input
                  id="pti"
                  type="number"
                  value={dealData.PTI}
                  onChange={(e) => updateDealField('PTI', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalInterest">Total Interest (%)</Label>
                <Input
                  id="totalInterest"
                  type="number"
                  value={dealData.totalInterest}
                  onChange={(e) => updateDealField('totalInterest', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="runningLoan">Running Loan</Label>
                <Input
                  id="runningLoan"
                  type="number"
                  value={dealData.runningLoan}
                  onChange={(e) => updateDealField('runningLoan', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handleNext}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Select or create a contact for this deal</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={contactMode} onValueChange={(value) => setContactMode(value as "existing" | "new")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="existing">Existing Contact</TabsTrigger>
                <TabsTrigger value="new">New Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="existing" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="existingContact">Select Contact</Label>
                  <Select value={dealData.contact.contactID} onValueChange={(value) => updateContactField('contactID', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an existing contact" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingContacts.map((contact) => (
                        <SelectItem key={contact.id} value={contact.id}>
                          {contact.name} - {contact.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="new" className="space-y-6">
                {/* Contact form fields - similar to ContactCreate but embedded */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactFirstName">First Name *</Label>
                    <Input
                      id="contactFirstName"
                      value={dealData.contact.firstName}
                      onChange={(e) => updateContactField('firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactLastName">Last Name *</Label>
                    <Input
                      id="contactLastName"
                      value={dealData.contact.lastName}
                      onChange={(e) => updateContactField('lastName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={dealData.contact.email}
                      onChange={(e) => updateContactField('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={dealData.contact.phoneNumber}
                      onChange={(e) => updateContactField('phoneNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactJobTitle">Job Title</Label>
                    <Input
                      id="contactJobTitle"
                      value={dealData.contact.jobTitle}
                      onChange={(e) => updateContactField('jobTitle', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmployer">Employer</Label>
                    <Input
                      id="contactEmployer"
                      value={dealData.contact.employer}
                      onChange={(e) => updateContactField('employer', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactCompany">Company</Label>
                    <Input
                      id="contactCompany"
                      value={dealData.contact.company}
                      onChange={(e) => updateContactField('company', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactIndustry">Industry</Label>
                    <Input
                      id="contactIndustry"
                      value={dealData.contact.industry}
                      onChange={(e) => updateContactField('industry', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Deal"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DealCreate;
