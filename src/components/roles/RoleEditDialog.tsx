
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RoleForm } from "./RoleForm";
import { Role, RoleFormData } from "@/types/roles";

interface RoleEditDialogProps {
  role: Role;
  onSave: (role: Role) => void;
  onCancel: () => void;
}

export function RoleEditDialog({ role, onSave, onCancel }: RoleEditDialogProps) {
  const handleSave = (formData: RoleFormData) => {
    const updatedRole: Role = {
      ...role,
      ...formData,
    };
    onSave(updatedRole);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
          <DialogDescription>Update the role information</DialogDescription>
        </DialogHeader>
        
        <RoleForm
          role={role}
          onSave={handleSave}
          onCancel={onCancel}
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  );
}
