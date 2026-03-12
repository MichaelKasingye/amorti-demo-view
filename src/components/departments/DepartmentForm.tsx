
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { DepartmentFormData } from "@/types/departments";

export function DepartmentForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: "",
    description: "",
    departmentCode: "",
    isBranch: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Department name is required.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.departmentCode.trim()) {
      toast({
        title: "Error",
        description: "Department code is required.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to a database
    console.log("Creating department:", formData);
    
    toast({
      title: "Success",
      description: "Department created successfully!"
    });
    
    navigate("/dashboard/departments");
  };

  const updateField = (field: keyof DepartmentFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Create Department</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Information</CardTitle>
          <CardDescription>
            Fill in the details below to create a new department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Department Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departmentCode">Department Code *</Label>
              <Input
                id="departmentCode"
                value={formData.departmentCode}
                onChange={(e) => updateField('departmentCode', e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isBranch"
                checked={formData.isBranch}
                onCheckedChange={(checked) => updateField('isBranch', !!checked)}
              />
              <Label htmlFor="isBranch">Is Branch</Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit">Create Department</Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/dashboard/departments")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
