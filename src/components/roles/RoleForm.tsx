
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RoleFormData, Role } from "@/types/roles";

interface RoleFormProps {
  role?: Role;
  onSave: (data: RoleFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

// Categorized permissions
const PERMISSION_CATEGORIES = {
  "User Management": [
    "create_user",
    "delete_user", 
    "update_account"
  ],
  "Reports & Analytics": [
    "view_reports",
    "view_analytics"
  ],
  "Sales & Deals": [
    "manage_deals"
  ],
  "Support & Tickets": [
    "view_tickets",
    "update_tickets"
  ],
  "Product Management": [
    "manage_products"
  ]
};

export function RoleForm({ role, onSave, onCancel, isEditing = false }: RoleFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<RoleFormData>({
    name: role?.name || "",
    description: role?.description || "",
    permissions: role?.permissions || []
  });

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Role name is required.",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
  };

  const updateField = (field: keyof RoleFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    const updatedPermissions = checked 
      ? [...formData.permissions, permission]
      : formData.permissions.filter(p => p !== permission);
    
    updateField('permissions', updatedPermissions);
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSelectAllCategory = (category: string, checked: boolean) => {
    const categoryPermissions = PERMISSION_CATEGORIES[category as keyof typeof PERMISSION_CATEGORIES];
    let updatedPermissions = [...formData.permissions];

    if (checked) {
      // Add all permissions from this category that aren't already selected
      categoryPermissions.forEach(permission => {
        if (!updatedPermissions.includes(permission)) {
          updatedPermissions.push(permission);
        }
      });
    } else {
      // Remove all permissions from this category
      updatedPermissions = updatedPermissions.filter(permission => 
        !categoryPermissions.includes(permission)
      );
    }

    updateField('permissions', updatedPermissions);
  };

  const handleSelectAllPermissions = (checked: boolean) => {
    if (checked) {
      const allPermissions = Object.values(PERMISSION_CATEGORIES).flat();
      updateField('permissions', allPermissions);
    } else {
      updateField('permissions', []);
    }
  };

  const isCategoryFullySelected = (category: string) => {
    const categoryPermissions = PERMISSION_CATEGORIES[category as keyof typeof PERMISSION_CATEGORIES];
    return categoryPermissions.every(permission => formData.permissions.includes(permission));
  };

  const isCategoryPartiallySelected = (category: string) => {
    const categoryPermissions = PERMISSION_CATEGORIES[category as keyof typeof PERMISSION_CATEGORIES];
    return categoryPermissions.some(permission => formData.permissions.includes(permission)) &&
           !categoryPermissions.every(permission => formData.permissions.includes(permission));
  };

  const allPermissions = Object.values(PERMISSION_CATEGORIES).flat();
  const allPermissionsSelected = allPermissions.every(permission => formData.permissions.includes(permission));
  const somePermissionsSelected = allPermissions.some(permission => formData.permissions.includes(permission));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          {!isEditing && (
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <CardTitle>{isEditing ? "Edit Role" : "Create Role"}</CardTitle>
            <CardDescription>
              {isEditing ? "Update the role information below" : "Fill in the details below to create a new role"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name *</Label>
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

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Permissions</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={allPermissionsSelected}
                  onCheckedChange={(checked) => handleSelectAllPermissions(!!checked)}
                />
                <Label htmlFor="select-all" className="text-sm font-normal">
                  Select All Permissions
                </Label>
              </div>
            </div>
            
            <div className="space-y-2">
              {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => (
                <Collapsible 
                  key={category}
                  open={openCategories[category]}
                  onOpenChange={() => toggleCategory(category)}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 border rounded-md hover:bg-accent/50">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={isCategoryFullySelected(category)}
                        onCheckedChange={(checked) => handleSelectAllCategory(category, !!checked)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="font-medium">{category}</span>
                      {isCategoryPartiallySelected(category) && (
                        <span className="text-xs text-muted-foreground">
                          ({permissions.filter(p => formData.permissions.includes(p)).length}/{permissions.length})
                        </span>
                      )}
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openCategories[category] ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6 pt-2 space-y-2">
                    {permissions.map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission}
                          checked={formData.permissions.includes(permission)}
                          onCheckedChange={(checked) => handlePermissionChange(permission, !!checked)}
                        />
                        <Label htmlFor={permission} className="text-sm font-normal">
                          {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit">
              {isEditing ? "Update Role" : "Create Role"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
