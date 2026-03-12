
import { Role, RoleFormData } from "@/types/roles";

export interface RolesApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  total?: number;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

// Simulate API delay
const simulateDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Available permissions
const AVAILABLE_PERMISSIONS: Permission[] = [
  {
    id: "create_user",
    name: "Create User",
    description: "Create new users and send invitations",
    category: "User Management"
  },
  {
    id: "delete_user",
    name: "Delete User",
    description: "Remove users from the system",
    category: "User Management"
  },
  {
    id: "update_account",
    name: "Update Account",
    description: "Modify account settings and configurations",
    category: "Account Management"
  },
  {
    id: "view_reports",
    name: "View Reports",
    description: "Access and view system reports",
    category: "Reporting"
  },
  {
    id: "manage_deals",
    name: "Manage Deals",
    description: "Create, edit, and delete deals",
    category: "Sales"
  },
  {
    id: "view_tickets",
    name: "View Support Tickets",
    description: "Access customer support tickets",
    category: "Support"
  },
  {
    id: "update_tickets",
    name: "Update Support Tickets",
    description: "Modify and respond to support tickets",
    category: "Support"
  },
  {
    id: "manage_products",
    name: "Manage Products",
    description: "Create, edit, and delete products",
    category: "Product Management"
  },
  {
    id: "manage_departments",
    name: "Manage Departments",
    description: "Create and manage departments",
    category: "Organization"
  }
];

// Dummy roles data
const DUMMY_ROLES: Role[] = [
  {
    id: "1",
    name: "Administrator",
    description: "Full system access with administrative privileges",
    permissions: ["create_user", "delete_user", "update_account", "view_reports", "manage_deals", "manage_products", "manage_departments"],
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
];

class RolesApiService {
  private roles: Role[] = [...DUMMY_ROLES];

  async getRoles(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<RolesApiResponse<Role[]>> {
    await simulateDelay();
    
    let filteredRoles = [...this.roles];
    
    // Apply search filter
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredRoles = filteredRoles.filter(role =>
        role.name.toLowerCase().includes(searchTerm) ||
        role.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRoles = filteredRoles.slice(startIndex, endIndex);
    
    return {
      data: paginatedRoles,
      message: "Roles retrieved successfully",
      success: true,
      total: filteredRoles.length
    };
  }

  async getRoleById(id: string): Promise<RolesApiResponse<Role>> {
    await simulateDelay();
    
    const role = this.roles.find(r => r.id === id);
    if (!role) {
      throw new Error("Role not found");
    }
    
    return {
      data: role,
      message: "Role retrieved successfully",
      success: true
    };
  }

  async createRole(roleData: RoleFormData): Promise<RolesApiResponse<Role>> {
    await simulateDelay();
    
    // Simulate validation
    if (!roleData.name || !roleData.description) {
      throw new Error("Name and description are required");
    }
    
    // Check for duplicate name
    if (this.roles.some(r => r.name.toLowerCase() === roleData.name.toLowerCase())) {
      throw new Error("Role with this name already exists");
    }
    
    const newRole: Role = {
      id: Date.now().toString(),
      name: roleData.name,
      description: roleData.description,
      permissions: roleData.permissions,
      createdAt: new Date().toISOString()
    };
    
    this.roles.push(newRole);
    
    return {
      data: newRole,
      message: "Role created successfully",
      success: true
    };
  }

  async updateRole(id: string, roleData: Partial<RoleFormData>): Promise<RolesApiResponse<Role>> {
    await simulateDelay();
    
    const roleIndex = this.roles.findIndex(r => r.id === id);
    if (roleIndex === -1) {
      throw new Error("Role not found");
    }
    
    // Check for duplicate name (excluding current role)
    if (roleData.name && this.roles.some(r => r.id !== id && r.name.toLowerCase() === roleData.name.toLowerCase())) {
      throw new Error("Role with this name already exists");
    }
    
    const updatedRole = {
      ...this.roles[roleIndex],
      ...roleData
    };
    
    this.roles[roleIndex] = updatedRole;
    
    return {
      data: updatedRole,
      message: "Role updated successfully",
      success: true
    };
  }

  async deleteRole(id: string): Promise<RolesApiResponse<null>> {
    await simulateDelay();
    
    const roleIndex = this.roles.findIndex(r => r.id === id);
    if (roleIndex === -1) {
      throw new Error("Role not found");
    }
    
    this.roles.splice(roleIndex, 1);
    
    return {
      data: null,
      message: "Role deleted successfully",
      success: true
    };
  }

  async getAvailablePermissions(): Promise<RolesApiResponse<Permission[]>> {
    await simulateDelay();
    
    return {
      data: AVAILABLE_PERMISSIONS,
      message: "Permissions retrieved successfully",
      success: true
    };
  }

  async getUserRolePermissions(userId: string): Promise<RolesApiResponse<string[]>> {
    await simulateDelay();
    
    // In a real app, you would fetch the user's role and return their permissions
    // For now, return a mock set of permissions
    const mockPermissions = ["view_reports", "manage_deals", "update_account"];
    
    return {
      data: mockPermissions,
      message: "User permissions retrieved successfully",
      success: true
    };
  }
}

export const rolesApi = new RolesApiService();
