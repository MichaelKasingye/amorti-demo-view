
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { useToast } from "@/hooks/use-toast";
import { Deal, stageLabels } from "@/types/deals";

interface EditDealDialogProps {
  deal: Deal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedDeal: Deal) => void;
}

export const EditDealDialog = ({ deal, open, onOpenChange, onSave }: EditDealDialogProps) => {
  const [formData, setFormData] = useState<Deal | null>(null);
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

  const sources = ["sales", "marketing", "referral", "website"];
  const currencies = ["UGX", "USD", "EUR", "GBP"];

  useEffect(() => {
    if (deal) {
      setFormData({ ...deal });
    }
  }, [deal]);

  if (!deal || !formData) return null;

  const handleSave = () => {
    if (!formData.description.trim() || !formData.departmentId || !formData.productId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.loanAmount <= 0) {
      toast({
        title: "Validation Error",
        description: "Loan amount must be greater than 0.",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
    onOpenChange(false);
    
    toast({
      title: "Deal Updated",
      description: "Deal has been successfully updated."
    });
  };

  const handleInputChange = (field: keyof Deal, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleContactChange = (field: keyof Deal['contact'], value: string) => {
    setFormData(prev => prev ? {
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
        // Auto-generate full name when first or last name changes
        ...(field === 'firstName' || field === 'lastName' ? {
          name: `${field === 'firstName' ? value : prev.contact.firstName} ${field === 'lastName' ? value : prev.contact.lastName}`.trim()
        } : {})
      }
    } : null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Deal</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Deal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Deal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.departmentId} onValueChange={(value) => handleInputChange('departmentId', value)}>
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
                <Select value={formData.productId} onValueChange={(value) => handleInputChange('productId', value)}>
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
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter deal description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
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
                <Select value={formData.stage} onValueChange={(value) => handleInputChange('stage', value as Deal['stage'])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(stageLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Select value={formData.source} onValueChange={(value) => handleInputChange('source', value)}>
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
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={formData.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pti">PTI (%)</Label>
                <Input
                  id="pti"
                  type="number"
                  value={formData.PTI}
                  onChange={(e) => handleInputChange('PTI', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalInterest">Total Interest (%)</Label>
                <Input
                  id="totalInterest"
                  type="number"
                  value={formData.totalInterest}
                  onChange={(e) => handleInputChange('totalInterest', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="runningLoan">Running Loan</Label>
                <Input
                  id="runningLoan"
                  type="number"
                  value={formData.runningLoan}
                  onChange={(e) => handleInputChange('runningLoan', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="space-y-2">
              <Label htmlFor="contactSelect">Select Existing Contact</Label>
              <Select value={formData.contact.contactID} onValueChange={(value) => handleContactChange('contactID', value)}>
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
                  value={formData.contact.firstName}
                  onChange={(e) => handleContactChange('firstName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.contact.lastName}
                  onChange={(e) => handleContactChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.contact.phoneNumber}
                  onChange={(e) => handleContactChange('phoneNumber', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.contact.company}
                  onChange={(e) => handleContactChange('company', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={formData.contact.jobTitle}
                  onChange={(e) => handleContactChange('jobTitle', e.target.value)}
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
                  value={formData.expectedClosingDate}
                  onChange={(e) => handleInputChange('expectedClosingDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="closedAt">Closed At</Label>
                <Input
                  id="closedAt"
                  type="date"
                  value={formData.closedAt}
                  onChange={(e) => handleInputChange('closedAt', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
