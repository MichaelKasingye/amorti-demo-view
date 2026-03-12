
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  department?: string;
  status: "active" | "invited" | "disabled";
  lastActive?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "member";
  department?: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: "owner" | "admin" | "member";
  department?: string;
  status?: "active" | "invited" | "disabled";
}

export interface UsersApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  total?: number;
}

// Simulate API delay
const simulateDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Dummy users data
const DUMMY_USERS: User[] = [
  {
    id: "u1",
    firstName: "Alex",
    lastName: "Johnson",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "owner",
    department: "Management",
    status: "active",
    lastActive: "2023-05-22T15:30:45Z",
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-05-22T15:30:45Z"
  },
  {
    id: "u2",
    firstName: "Sarah",
    lastName: "Williams",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "admin",
    department: "Sales",
    status: "active",
    lastActive: "2023-05-22T14:25:10Z",
    createdAt: "2023-02-10T12:00:00Z",
    updatedAt: "2023-05-22T14:25:10Z"
  },
  {
    id: "u3",
    firstName: "Michael",
    lastName: "Brown",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "member",
    department: "Marketing",
    status: "active",
    lastActive: "2023-05-21T09:45:22Z",
    createdAt: "2023-03-05T09:30:00Z",
    updatedAt: "2023-05-21T09:45:22Z"
  }
];

class UsersApiService {
  private users: User[] = [...DUMMY_USERS];

  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
    department?: string;
  }): Promise<UsersApiResponse<User[]>> {
    await simulateDelay();
    
    let filteredUsers = [...this.users];
    
    // Apply filters
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        (user.department && user.department.toLowerCase().includes(searchTerm))
      );
    }
    
    if (params?.role) {
      filteredUsers = filteredUsers.filter(user => user.role === params.role);
    }
    
    if (params?.status) {
      filteredUsers = filteredUsers.filter(user => user.status === params.status);
    }
    
    if (params?.department) {
      filteredUsers = filteredUsers.filter(user => user.department === params.department);
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    return {
      data: paginatedUsers,
      message: "Users retrieved successfully",
      success: true,
      total: filteredUsers.length
    };
  }

  async getUserById(id: string): Promise<UsersApiResponse<User>> {
    await simulateDelay();
    
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    
    return {
      data: user,
      message: "User retrieved successfully",
      success: true
    };
  }

  async createUser(userData: CreateUserRequest): Promise<UsersApiResponse<User>> {
    await simulateDelay();
    
    // Simulate validation
    if (!userData.firstName || !userData.lastName || !userData.email) {
      throw new Error("First name, last name, and email are required");
    }
    
    // Check for duplicate email
    if (this.users.some(u => u.email === userData.email)) {
      throw new Error("User with this email already exists");
    }
    
    const newUser: User = {
      id: `u${Date.now()}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: userData.role,
      department: userData.department,
      status: "invited",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.users.push(newUser);
    
    return {
      data: newUser,
      message: "User invitation sent successfully",
      success: true
    };
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<UsersApiResponse<User>> {
    await simulateDelay();
    
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    
    const updatedUser = {
      ...this.users[userIndex],
      ...userData,
      name: userData.firstName && userData.lastName 
        ? `${userData.firstName} ${userData.lastName}`
        : this.users[userIndex].name,
      updatedAt: new Date().toISOString()
    };
    
    this.users[userIndex] = updatedUser;
    
    return {
      data: updatedUser,
      message: "User updated successfully",
      success: true
    };
  }

  async deleteUser(id: string): Promise<UsersApiResponse<null>> {
    await simulateDelay();
    
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    
    this.users.splice(userIndex, 1);
    
    return {
      data: null,
      message: "User deleted successfully",
      success: true
    };
  }

  async resendInvitation(id: string): Promise<UsersApiResponse<User>> {
    await simulateDelay();
    
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    
    return {
      data: user,
      message: "Invitation resent successfully",
      success: true
    };
  }
}

export const usersApi = new UsersApiService();
