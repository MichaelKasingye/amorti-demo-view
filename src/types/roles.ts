
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
}

export interface RoleFormData {
  name: string;
  description: string;
  permissions: string[];
}
