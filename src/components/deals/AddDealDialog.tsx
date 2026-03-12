
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { Deal, Contact } from "@/types/deals";

interface AddDealDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddDealDialog = ({ isOpen, onOpenChange }: AddDealDialogProps) => {
  const [newDeal, setNewDeal] = useState({
    departmentId: "",
    productId: "",
    description: "",
    currency: "UGX",
    loanAmount: 30000000,
    loanTerm: 5,
    salary: 0,
    PTI: 5,
    totalInterest: 5,
    runningLoan: 5,
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
      lastContactedAt: ""
    }
  });

  const { toast } = useToast();

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

  const contacts = [
    { id: "contact1", name: "Alex Johnson", email: "alex.johnson@acme.com" },
    { id: "contact2", name: "Sarah Williams", email: "sarah.williams@xyz.com" },
    { id: "contact3", name: "Bob Wilson", email: "bob@example.com" },
  ];

  const stages = ["discovery", "proposal", "negotiation", "closed-won", "closed-lost"];
  const sources = ["sales", "marketing", "referral", "website"];
  const currencies = ["UGX", "USD", "EUR", "GBP"];

  const handleAddDeal = () => {
    if (!newDeal.departmentId || !newDeal.productId || !newDeal.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Department, Product, Description).",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Deal added",
      description: `Deal has been added successfully.`
    });
    
    setNewDeal({
      departmentId: "",
      productId: "",
      description: "",
      currency: "UGX",
      loanAmount: 30000000,
      loanTerm: 5,
      salary: 0,
      PTI: 5,
      totalInterest: 5,
      runningLoan: 5,
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
        lastContactedAt: ""
      }
    });
    
    onOpenChange(false);
  };

  const updateDealField = (field: string, value: any) => {
    setNewDeal(prev => ({ ...prev, [field]: value }));
  };

  const updateContactField = (field: string, value: string) => {
    setNewDeal(prev => ({
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Deal</DialogTitle>
          <DialogDescription>
            Enter the deal details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Deal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Deal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={newDeal.departmentId} onValueChange={(value) => updateDealField('departmentId', value)}>
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
                <Select value={newDeal.productId} onValueChange={(value) => updateDealField('productId', value)}>
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
                value={newDeal.description}
                onChange={(e) => updateDealField('description', e.target.value)}
                placeholder="Enter deal description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={newDeal.currency} onValueChange={(value) => updateDealField('currency', value)}>
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
                <Label htmlFor="stage">Stage</Label>
                <Select value={newDeal.stage} onValueChange={(value) => updateDealField('stage', value)}>
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
                <Select value={newDeal.source} onValueChange={(value) => updateDealField('source', value)}>
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
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={newDeal.loanAmount}
                  onChange={(e) => updateDealField('loanAmount', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={newDeal.loanTerm}
                  onChange={(e) => updateDealField('loanTerm', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  type="number"
                  value={newDeal.salary}
                  onChange={(e) => updateDealField('salary', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pti">PTI (%)</Label>
                <Input
                  id="pti"
                  type="number"
                  value={newDeal.PTI}
                  onChange={(e) => updateDealField('PTI', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalInterest">Total Interest (%)</Label>
                <Input
                  id="totalInterest"
                  type="number"
                  value={newDeal.totalInterest}
                  onChange={(e) => updateDealField('totalInterest', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="runningLoan">Running Loan</Label>
                <Input
                  id="runningLoan"
                  type="number"
                  value={newDeal.runningLoan}
                  onChange={(e) => updateDealField('runningLoan', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="space-y-2">
              <Label htmlFor="contactSelect">Select Existing Contact</Label>
              <Select value={newDeal.contact.contactID} onValueChange={(value) => updateContactField('contactID', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a contact" />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name} - {contact.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={newDeal.contact.firstName}
                  onChange={(e) => updateContactField('firstName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={newDeal.contact.lastName}
                  onChange={(e) => updateContactField('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newDeal.contact.email}
                  onChange={(e) => updateContactField('email', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={newDeal.contact.phoneNumber}
                  onChange={(e) => updateContactField('phoneNumber', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newDeal.contact.company}
                  onChange={(e) => updateContactField('company', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={newDeal.contact.jobTitle}
                  onChange={(e) => updateContactField('jobTitle', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Important Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expectedClosingDate">Expected Closing Date</Label>
                <Input
                  id="expectedClosingDate"
                  type="date"
                  value={newDeal.expectedClosingDate}
                  onChange={(e) => updateDealField('expectedClosingDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="closedAt">Closed At</Label>
                <Input
                  id="closedAt"
                  type="date"
                  value={newDeal.closedAt}
                  onChange={(e) => updateDealField('closedAt', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddDeal}>Save Deal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
