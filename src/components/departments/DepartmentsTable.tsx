
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
import { Department } from "@/types/departments";
import { DepartmentEditDialog } from "./DepartmentEditDialog";
import { exportTableData } from "@/utils/csvExport";

interface DepartmentsTableProps {
  departments: Department[];
  onUpdate: (department: Department) => void;
  onDelete: (id: string) => void;
}

export function DepartmentsTable({ departments, onUpdate, onDelete }: DepartmentsTableProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const handleDelete = (department: Department) => {
    if (window.confirm(`Are you sure you want to delete the department "${department.name}"?`)) {
      onDelete(department.id);
      toast({
        title: "Success",
        description: "Department deleted successfully!"
      });
    }
  };

  const handleViewDepartment = (department: Department) => {
    navigate(`/dashboard/departments/${department.id}`);
  };

  const handleExportCSV = () => {
    const customHeaders = {
      'name': 'Name',
      'description': 'Description',
      'departmentCode': 'Department Code',
      'isBranch': 'Type',
      'createdAt': 'Created Date'
    };
    
    const exportData = departments.map(dept => ({
      ...dept,
      isBranch: dept.isBranch ? 'Branch' : 'Department',
      createdAt: new Date(dept.createdAt).toLocaleDateString()
    }));
    
    exportTableData(exportData, 'departments-export', customHeaders);
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
              <TableHead>Department Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No departments found. Create your first department to get started.
                </TableCell>
              </TableRow>
            ) : (
              departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className="font-medium">{department.name}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {department.description || "No description"}
                  </TableCell>
                  <TableCell>
                    <code className="px-2 py-1 bg-muted rounded text-sm">
                      {department.departmentCode}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant={department.isBranch ? "default" : "secondary"}>
                      {department.isBranch ? "Branch" : "Department"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(department.createdAt).toLocaleDateString()}
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
                        <DropdownMenuItem onClick={() => handleViewDepartment(department)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditingDepartment(department)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(department)}
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

      {editingDepartment && (
        <DepartmentEditDialog
          department={editingDepartment}
          onSave={(updatedDepartment) => {
            onUpdate(updatedDepartment);
            setEditingDepartment(null);
            toast({
              title: "Success",
              description: "Department updated successfully!"
            });
          }}
          onCancel={() => setEditingDepartment(null)}
        />
      )}
    </>
  );
}
