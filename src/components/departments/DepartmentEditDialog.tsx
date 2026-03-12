
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Department, DepartmentFormData } from "@/types/departments";

interface DepartmentEditDialogProps {
  department: Department;
  onSave: (department: Department) => void;
  onCancel: () => void;
}

export function DepartmentEditDialog({ department, onSave, onCancel }: DepartmentEditDialogProps) {
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: department.name,
    description: department.description,
    departmentCode: department.departmentCode,
    isBranch: department.isBranch
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.departmentCode.trim()) {
      return;
    }

    const updatedDepartment: Department = {
      ...department,
      ...formData,
    };

    onSave(updatedDepartment);
  };

  const updateField = (field: keyof DepartmentFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
          <DialogDescription>
            Make changes to the department information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Department Name *</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-departmentCode">Department Code *</Label>
            <Input
              id="edit-departmentCode"
              value={formData.departmentCode}
              onChange={(e) => updateField('departmentCode', e.target.value)}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="edit-isBranch"
              checked={formData.isBranch}
              onCheckedChange={(checked) => updateField('isBranch', !!checked)}
            />
            <Label htmlFor="edit-isBranch">Is Branch</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
