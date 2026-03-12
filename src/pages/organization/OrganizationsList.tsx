
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlusCircle } from "lucide-react";

const organizations = [
  { 
    id: 1, 
    name: "HFB", 
    role: "Admin", 
    members: 8,
    description: "Global technology solutions provider"
  },
  { 
    id: 2, 
    name: "Globex Corp", 
    role: "Member", 
    members: 12,
    description: "International manufacturing company"
  },
];

const OrganizationsList = () => {
  const navigate = useNavigate();
  
  const handleSelectOrganization = (orgId: number) => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <div className="h-6 w-6 rounded-full bg-primary"></div>
            CRM System
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Your Organizations</h1>
            <p className="text-muted-foreground mt-2">Select an organization or create a new one</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {organizations.map((org) => (
              <Card key={org.id} className="border hover:border-primary/50 cursor-pointer transition-all"
                    onClick={() => handleSelectOrganization(org.id)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="rounded-full bg-primary/10 text-primary text-xs px-2 py-1 font-medium">
                      {org.role}
                    </div>
                  </div>
                  <CardTitle className="mt-2">{org.name}</CardTitle>
                  <CardDescription>{org.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {org.members} member{org.members !== 1 && 's'}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Select Organization</Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border border-dashed flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <PlusCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Create Organization</h3>
              <p className="text-sm text-center text-muted-foreground mb-6">
                Start a new organization for your business or team
              </p>
              <Button asChild>
                <Link to="/organizations/create">Create Organization</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsList;
