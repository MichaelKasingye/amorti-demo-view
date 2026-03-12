
// Base API configuration and types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  organizationId: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  description: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
  token: string;
}

// Simulate API delay
const simulateDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Dummy data
const DUMMY_USERS: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    name: "John Doe",
    role: "Admin",
    organizationId: "org-1",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Jane Smith",
    role: "User",
    organizationId: "org-1",
    createdAt: "2024-01-02T00:00:00Z"
  }
];

const DUMMY_ORGANIZATIONS: Organization[] = [
  {
    id: "org-1",
    name: "Acme Financial",
    type: "Mortgage Brokerage",
    description: "Leading mortgage brokerage firm",
    createdAt: "2024-01-01T00:00:00Z"
  }
];

// API service class
class ApiService {
  private baseUrl = "/api"; // This would be your actual API URL
  
  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    await simulateDelay();
    
    // Simulate authentication logic
    if (credentials.email === "demo@example.com" && credentials.password === "password") {
      const user = DUMMY_USERS.find(u => u.email === credentials.email)!;
      return {
        data: {
          user,
          token: "dummy-jwt-token-" + Date.now()
        },
        message: "Login successful",
        success: true
      };
    }
    
    // Simulate random failures (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Network error occurred");
    }
    
    throw new Error("Invalid email or password");
  }

  async signUp(userData: SignUpRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    await simulateDelay();
    
    // Simulate random failures (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Email already exists");
    }
    
    const newUser: User = {
      id: "user-" + Date.now(),
      email: userData.email,
      name: userData.name,
      role: "User",
      organizationId: "org-1",
      createdAt: new Date().toISOString()
    };
    
    return {
      data: {
        user: newUser,
        token: "dummy-jwt-token-" + Date.now()
      },
      message: "Account created successfully",
      success: true
    };
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<null>> {
    await simulateDelay();
    
    return {
      data: null,
      message: "Password reset link sent to your email",
      success: true
    };
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<null>> {
    await simulateDelay();
    
    return {
      data: null,
      message: "Password reset successfully",
      success: true
    };
  }

  async getCurrentUser(token: string): Promise<ApiResponse<User>> {
    await simulateDelay(500);
    
    // Simulate token validation
    if (!token || !token.startsWith("dummy-jwt-token")) {
      throw new Error("Invalid token");
    }
    
    return {
      data: DUMMY_USERS[0],
      message: "User fetched successfully",
      success: true
    };
  }

  async logout(): Promise<ApiResponse<null>> {
    await simulateDelay(300);
    
    return {
      data: null,
      message: "Logged out successfully",
      success: true
    };
  }

  // Organization endpoints
  async getOrganizations(): Promise<ApiResponse<Organization[]>> {
    await simulateDelay();
    
    return {
      data: DUMMY_ORGANIZATIONS,
      message: "Organizations fetched successfully",
      success: true
    };
  }
}

export const apiService = new ApiService();
