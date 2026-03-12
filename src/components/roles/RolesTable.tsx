
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Eye, MoreHorizontal, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Role } from "@/types/roles";
import { RoleEditDialog } from "./RoleEditDialog";
import { exportTableData } from "@/utils/csvExport";

interface RolesTableProps {
  roles: Role[];
  onUpdate: (role: Role) => void;
  onDelete: (id: string) => void;
}

export function RolesTable({ roles, onUpdate, onDelete }: RolesTableProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handleDelete = (role: Role) => {
    if (window.confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
      onDelete(role.id);
      toast({
        title: "Success",
        description: "Role deleted successfully!"
      });
    }
  };

  const handleViewRole = (role: Role) => {
    navigate(`/dashboard/roles/${role.id}`);
  };

  const handleExportCSV = () => {
    const customHeaders = {
      'name': 'Name',
      'description': 'Description',
      'permissions': 'Permissions',
      'createdAt': 'Created Date'
    };
    
    const exportData = roles.map(role => ({
      ...role,
      permissions: role.permissions.join(', '),
      createdAt: new Date(role.createdAt).toLocaleDateString()
    }));
    
    exportTableData(exportData, 'roles-export', customHeaders);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={handleExportCSV} className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No roles found. Create your first role to get started.
                </TableCell>
              </TableRow>
            ) : (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {role.description || "No description"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 2).map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                      {role.permissions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(role.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background">
                        <DropdownMenuItem onClick={() => handleViewRole(role)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditingRole(role)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(role)}
                          className="text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingRole && (
        <RoleEditDialog
          role={editingRole}
          onSave={(updatedRole) => {
            onUpdate(updatedRole);
            setEditingRole(null);
            toast({
              title: "Success",
              description: "Role updated successfully!"
            });
          }}
          onCancel={() => setEditingRole(null)}
        />
      )}
    </>
  );
}
