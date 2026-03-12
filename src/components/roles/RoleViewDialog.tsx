
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/types/roles";

interface RoleViewDialogProps {
  role: Role;
  onClose: () => void;
}

export function RoleViewDialog({ role, onClose }: RoleViewDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{role.name}</DialogTitle>
          <DialogDescription>Role details and information</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Name</label>
            <p className="text-sm mt-1">{role.name}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Description</label>
            <p className="text-sm mt-1">{role.description || "No description provided"}</p>
          </div>
          
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
            <p className="text-sm mt-1">{new Date(role.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
