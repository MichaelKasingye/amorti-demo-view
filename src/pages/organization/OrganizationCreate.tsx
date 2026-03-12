
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrganizationData {
  name: string;
  logo?: string;
  website: string;
  industry: string;
  address: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  contactEmail: string;
  contactPhoneNumber: string;
}

const OrganizationCreate = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [orgData, setOrgData] = useState<OrganizationData>({
    name: "",
    website: "",
    industry: "",
    address: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    contactEmail: "",
    contactPhoneNumber: "",
  });

  const industries = [
    "Technology",
    "Education",
    "Healthcare",
    "Finance",
    "Retail",
    "Manufacturing",
    "Real Estate",
    "Consulting",
    "Other"
  ];

  const handleNext = () => {
    if (step === 1 && !orgData.name) {
      toast({
        title: "Error",
        description: "Organization name is required",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && (!orgData.contactEmail || !orgData.contactPhoneNumber)) {
      toast({
        title: "Error",
        description: "Contact information is required",
        variant: "destructive",
      });
      return;
    }
    
    setStep(step + 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API request delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Organization created successfully",
      });
      
      navigate("/dashboard");
    }, 1500);
  };

  const updateField = (field: keyof OrganizationData, value: string) => {
    setOrgData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <div className="h-6 w-6 rounded-full bg-primary"></div>
            CRM System
          </Link>
          <ThemeToggle />
        </div>
      </header>
      
      <div className="flex-1 container max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Set up your organization</h1>
            <p className="text-muted-foreground mt-2">Create your organization profile in a few simple steps</p>
          </div>
          
          <div className="flex items-center">
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
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter your organization's basic details</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name *</Label>
                    <Input 
                      id="orgName" 
                      placeholder="Acme Inc." 
                      value={orgData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      placeholder="https://www.acme.com"
                      value={orgData.website}
                      onChange={(e) => updateField('website', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={orgData.industry} onValueChange={(value) => updateField('industry', value)}>
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
                  
                  <div>
                    <Label className="mb-2 block">Organization Logo (Optional)</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl">{orgData.name ? orgData.name.charAt(0).toUpperCase() : "O"}</AvatarFallback>
                      </Avatar>
                      <Button type="button" variant="outline">Upload logo</Button>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" asChild>
                  <Link to="/login">Back</Link>
                </Button>
                <Button onClick={handleNext}>Continue</Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Provide contact details for your organization</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input 
                      id="contactEmail" 
                      type="email"
                      placeholder="contact@acme.com"
                      value={orgData.contactEmail}
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone Number *</Label>
                    <Input 
                      id="contactPhone" 
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={orgData.contactPhoneNumber}
                      onChange={(e) => updateField('contactPhoneNumber', e.target.value)}
                      required
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={handleNext}>Continue</Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>Enter your organization's address (optional)</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="finalForm" className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input 
                      id="street" 
                      placeholder="123 Main Street"
                      value={orgData.street}
                      onChange={(e) => updateField('street', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        placeholder="New York"
                        value={orgData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input 
                        id="state" 
                        placeholder="NY"
                        value={orgData.state}
                        onChange={(e) => updateField('state', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input 
                        id="postalCode" 
                        placeholder="10001"
                        value={orgData.postalCode}
                        onChange={(e) => updateField('postalCode', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input 
                        id="country" 
                        placeholder="United States"
                        value={orgData.country}
                        onChange={(e) => updateField('country', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullAddress">Full Address</Label>
                    <Textarea 
                      id="fullAddress" 
                      placeholder="Complete address if different from above"
                      value={orgData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                <Button form="finalForm" type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Organization"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationCreate;
