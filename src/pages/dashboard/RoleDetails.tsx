
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Edit, Users, Calendar, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Role } from "@/types/roles";

// Mock data for people under roles
const mockPeople = [
  { id: "1", name: "John Doe", email: "john.doe@company.com", avatar: "JD", joinDate: "2024-01-15" },
  { id: "2", name: "Jane Smith", email: "jane.smith@company.com", avatar: "JS", joinDate: "2024-02-20" },
  { id: "3", name: "Mike Johnson", email: "mike.johnson@company.com", avatar: "MJ", joinDate: "2024-03-10" },
];

const RoleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<Role | null>(null);
  const [people, setPeople] = useState(mockPeople);

  // Mock roles data - in a real app, this would come from an API
  const mockRoles: Role[] = [
    {
      id: "1",
      name: "Administrator",
      description: "Full system access with administrative privileges",
      permissions: ["create_user", "delete_user", "update_account", "view_reports"],
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "2", 
      name: "Sales Manager",
      description: "Manages sales team and processes",
      permissions: ["update_account", "view_reports", "manage_deals"],
      createdAt: "2024-01-16T14:30:00Z"
    },
    {
      id: "3",
      name: "Customer Support",
      description: "Handles customer inquiries and support tickets",
      permissions: ["view_tickets", "update_tickets"],
      createdAt: "2024-01-17T09:15:00Z"
    }
  ];

  useEffect(() => {
    const foundRole = mockRoles.find(r => r.id === id);
    if (foundRole) {
      setRole(foundRole);
    } else {
      toast({
        title: "Error",
        description: "Role not found",
        variant: "destructive"
      });
      navigate("/dashboard/roles");
    }
  }, [id, navigate, toast]);

  if (!role) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard/roles")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold">{role.name}</h1>
          <p className="text-muted-foreground">{role.description}</p>
        </div>
        <Button onClick={() => navigate(`/dashboard/roles/${role.id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Role Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Permissions</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {role.permissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No permissions assigned</p>
                ) : (
                  role.permissions.map((permission) => (
                    <Badge key={permission} variant="secondary">
                      {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))
                )}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Created</label>
              <p className="text-sm mt-1 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(role.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">People Count</label>
              <p className="text-sm mt-1 flex items-center gap-2">
                <Users className="h-4 w-4" />
                {people.length} people
              </p>
            </div>
          </CardContent>
        </Card>

        {/* People Under This Role */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              People in this Role
            </CardTitle>
            <CardDescription>
              Users who are assigned to the {role.name} role
            </CardDescription>
          </CardHeader>
          <CardContent>
            {people.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No people assigned to this role yet.
              </div>
            ) : (
              <div className="space-y-4">
                {people.map((person) => (
                  <div key={person.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{person.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{person.name}</p>
                        <p className="text-sm text-muted-foreground">{person.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Joined</p>
                      <p className="text-sm font-medium">
                        {new Date(person.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleDetails;
