
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Department } from "@/types/departments";
import { DepartmentsTable } from "@/components/departments/DepartmentsTable";

const Departments = () => {
  // Mock data for demonstration
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "Human Resources",
      description: "Manages employee relations, recruitment, and company policies",
      departmentCode: "HR001",
      isBranch: false,
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "2", 
      name: "Engineering",
      description: "Software development and technical operations",
      departmentCode: "ENG001",
      isBranch: true,
      createdAt: "2024-01-10T09:00:00Z"
    },
    {
      id: "3",
      name: "Sales",
      description: "Customer acquisition and revenue generation",
      departmentCode: "SALES001", 
      isBranch: true,
      createdAt: "2024-01-12T11:00:00Z"
    }
  ]);

  const handleUpdateDepartment = (updatedDepartment: Department) => {
    setDepartments(prev => 
      prev.map(dept => dept.id === updatedDepartment.id ? updatedDepartment : dept)
    );
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Departments</h1>
        <Button asChild>
          <Link to="/dashboard/departments/create">
            <Plus className="h-4 w-4 mr-2" />
            Add Department
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Departments Management</CardTitle>
          <CardDescription>
            Create and manage departments for your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          {departments.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium mb-2">No Departments Yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first department.
              </p>
              <Button asChild>
                <Link to="/dashboard/departments/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Department
                </Link>
              </Button>
            </div>
          ) : (
            <DepartmentsTable
              departments={departments}
              onUpdate={handleUpdateDepartment}
              onDelete={handleDeleteDepartment}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Departments;
