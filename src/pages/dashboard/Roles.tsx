import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Role, RoleFormData } from "@/types/roles";
import { RoleForm } from "@/components/roles/RoleForm";
import { RolesTable } from "@/components/roles/RolesTable";

const Roles = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [roles, setRoles] = useState<Role[]>([
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
  ]);

  const handleCreateRole = (formData: RoleFormData) => {
    const newRole: Role = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    setRoles(prev => [...prev, newRole]);
    setShowForm(false);
    
    toast({
      title: "Success",
      description: "Role created successfully!"
    });
  };

  const handleUpdateRole = (updatedRole: Role) => {
    setRoles(prev => prev.map(role => 
      role.id === updatedRole.id ? updatedRole : role
    ));
  };

  const handleDeleteRole = (id: string) => {
    setRoles(prev => prev.filter(role => role.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Roles & Permissions</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      {showForm ? (
        <RoleForm
          onSave={handleCreateRole}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>
              Define roles and set permissions for users in your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RolesTable
              roles={roles}
              onUpdate={handleUpdateRole}
              onDelete={handleDeleteRole}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Roles;
