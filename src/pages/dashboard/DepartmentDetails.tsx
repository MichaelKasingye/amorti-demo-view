
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Department } from "@/types/departments";
import { TeamMember } from "@/types/teams";
import { TeamsTable } from "@/components/teams/TeamsTable";

// Mock team members data - in a real app this would come from your backend
const mockTeamMembers: TeamMember[] = [
  {
    id: "tm1",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah@example.com",
    role: "Admin",
    department: "Sales",
    status: "active",
    joinedAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "tm2",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@example.com",
    role: "Manager",
    department: "Marketing",
    status: "active",
    joinedAt: "2023-04-20T14:15:00Z",
  },
  {
    id: "tm3",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily@example.com",
    role: "Sales Representative",
    department: "Sales",
    status: "active",
    joinedAt: "2023-03-10T09:45:00Z",
  },
  {
    id: "tm4",
    firstName: "Daniel",
    lastName: "Wilson",
    email: "daniel@example.com",
    role: "Support Agent",
    department: "Support",
    status: "invited",
  },
  {
    id: "tm5",
    firstName: "Olivia",
    lastName: "Martinez",
    email: "olivia@example.com",
    role: "Marketing Specialist",
    department: "Marketing",
    status: "active",
    joinedAt: "2023-02-28T16:20:00Z",
  },
];

const DepartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [department, setDepartment] = useState<Department | null>(null);
  const [departmentMembers, setDepartmentMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // In a real app, you would fetch the department data from an API
    // For now, we'll create a mock department
    if (id) {
      const mockDepartment: Department = {
        id,
        name: "Sample Department",
        description: "This is a sample department for demonstration purposes.",
        departmentCode: "DEPT001",
        isBranch: true,
        createdAt: new Date().toISOString()
      };
      setDepartment(mockDepartment);

      // Filter team members by department name
      const filteredMembers = mockTeamMembers.filter(
        member => member.department.toLowerCase() === mockDepartment.name.toLowerCase()
      );
      setDepartmentMembers(filteredMembers);
    }
  }, [id]);

  const handleRoleChange = (memberId: string, newRole: string) => {
    setDepartmentMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
    
    const member = departmentMembers.find(m => m.id === memberId);
    if (member) {
      toast({
        title: "Role Updated",
        description: `${member.firstName} ${member.lastName}'s role has been updated to ${newRole}`,
      });
    }
  };

  const handleDelete = () => {
    if (department && window.confirm(`Are you sure you want to delete "${department.name}"?`)) {
      toast({
        title: "Success",
        description: "Department deleted successfully!"
      });
      navigate("/dashboard/departments");
    }
  };

  if (!department) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/departments")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Departments
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Department not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/departments")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Departments
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">{department.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Information</CardTitle>
            <CardDescription>
              Basic information about this department
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Name</h3>
                <p className="text-sm">{department.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Department Code</h3>
                <code className="px-2 py-1 bg-muted rounded text-sm">
                  {department.departmentCode}
                </code>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Type</h3>
                <Badge variant={department.isBranch ? "default" : "secondary"}>
                  {department.isBranch ? "Branch" : "Department"}
                </Badge>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Created</h3>
                <p className="text-sm">{new Date(department.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            {department.description && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Description</h3>
                <p className="text-sm">{department.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Members</CardTitle>
            <CardDescription>
              Team members assigned to this department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TeamsTable 
              members={departmentMembers} 
              onRoleChange={handleRoleChange}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentDetails;
