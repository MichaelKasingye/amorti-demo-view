
import { Profile, ProfileFormData } from "@/types/profile";

export interface ProfileApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  loginNotifications: boolean;
  sessionTimeout: number; // in minutes
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  dealUpdates: boolean;
  teamInvitations: boolean;
  systemAnnouncements: boolean;
  marketingEmails: boolean;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

// Simulate API delay
const simulateDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock profile data
const CURRENT_PROFILE: Profile = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@housingfinancebank.com",
  phone: "+1 (555) 123-4567",
  position: "Senior Sales Manager",
  department: "Sales",
  bio: "Experienced sales professional with over 8 years in the industry. Passionate about building relationships and driving growth through strategic partnerships.",
  avatar: "",
  receiveEmails: true,
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-20T14:30:00Z"
};

// Mock security settings
const SECURITY_SETTINGS: SecuritySettings = {
  twoFactorEnabled: false,
  lastPasswordChange: "2024-01-15T10:00:00Z",
  loginNotifications: true,
  sessionTimeout: 480 // 8 hours
};

// Mock notification settings
const NOTIFICATION_SETTINGS: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  dealUpdates: true,
  teamInvitations: true,
  systemAnnouncements: true,
  marketingEmails: false
};

// Mock activity log
const ACTIVITY_LOG: ActivityLog[] = [
  {
    id: "log_1",
    action: "login",
    description: "User logged in successfully",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: "2024-06-14T09:30:00Z"
  },
  {
    id: "log_2",
    action: "profile_update",
    description: "Profile information updated",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: "2024-06-13T15:45:00Z"
  },
  {
    id: "log_3",
    action: "password_change",
    description: "Password changed successfully",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: "2024-06-10T11:20:00Z"
  }
];

class ProfileApiService {
  async getCurrentProfile(): Promise<ProfileApiResponse<Profile>> {
    await simulateDelay();
    
    return {
      data: CURRENT_PROFILE,
      message: "Profile retrieved successfully",
      success: true
    };
  }

  async updateProfile(profileData: ProfileFormData): Promise<ProfileApiResponse<Profile>> {
    await simulateDelay();
    
    // Simulate validation
    if (!profileData.firstName || !profileData.lastName || !profileData.email) {
      throw new Error("First name, last name, and email are required");
    }
    
    const updatedProfile: Profile = {
      ...CURRENT_PROFILE,
      ...profileData,
      updatedAt: new Date().toISOString()
    };
    
    return {
      data: updatedProfile,
      message: "Profile updated successfully",
      success: true
    };
  }

  async uploadAvatar(file: File): Promise<ProfileApiResponse<Profile>> {
    await simulateDelay();
    
    // Simulate file upload
    const avatarUrl = URL.createObjectURL(file);
    
    const updatedProfile: Profile = {
      ...CURRENT_PROFILE,
      avatar: avatarUrl,
      updatedAt: new Date().toISOString()
    };
    
    return {
      data: updatedProfile,
      message: "Avatar uploaded successfully",
      success: true
    };
  }

  async changePassword(request: ChangePasswordRequest): Promise<ProfileApiResponse<null>> {
    await simulateDelay();
    
    // Simulate validation
    if (!request.currentPassword || !request.newPassword || !request.confirmPassword) {
      throw new Error("All password fields are required");
    }
    
    if (request.newPassword !== request.confirmPassword) {
      throw new Error("New password and confirmation do not match");
    }
    
    if (request.newPassword.length < 8) {
      throw new Error("New password must be at least 8 characters long");
    }
    
    // Simulate password validation (in real app, verify current password)
    if (request.currentPassword !== "currentPassword123") {
      throw new Error("Current password is incorrect");
    }
    
    return {
      data: null,
      message: "Password changed successfully",
      success: true
    };
  }

  async getSecuritySettings(): Promise<ProfileApiResponse<SecuritySettings>> {
    await simulateDelay();
    
    return {
      data: SECURITY_SETTINGS,
      message: "Security settings retrieved successfully",
      success: true
    };
  }

  async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<ProfileApiResponse<SecuritySettings>> {
    await simulateDelay();
    
    const updatedSettings: SecuritySettings = {
      ...SECURITY_SETTINGS,
      ...settings
    };
    
    return {
      data: updatedSettings,
      message: "Security settings updated successfully",
      success: true
    };
  }

  async enableTwoFactor(): Promise<ProfileApiResponse<{ qrCode: string; backupCodes: string[] }>> {
    await simulateDelay();
    
    // In a real app, generate actual QR code and backup codes
    const mockData = {
      qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
      backupCodes: [
        "12345678",
        "87654321",
        "11223344",
        "44332211",
        "56789012"
      ]
    };
    
    return {
      data: mockData,
      message: "Two-factor authentication setup initiated",
      success: true
    };
  }

  async disableTwoFactor(): Promise<ProfileApiResponse<null>> {
    await simulateDelay();
    
    return {
      data: null,
      message: "Two-factor authentication disabled successfully",
      success: true
    };
  }

  async getNotificationSettings(): Promise<ProfileApiResponse<NotificationSettings>> {
    await simulateDelay();
    
    return {
      data: NOTIFICATION_SETTINGS,
      message: "Notification settings retrieved successfully",
      success: true
    };
  }

  async updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<ProfileApiResponse<NotificationSettings>> {
    await simulateDelay();
    
    const updatedSettings: NotificationSettings = {
      ...NOTIFICATION_SETTINGS,
      ...settings
    };
    
    return {
      data: updatedSettings,
      message: "Notification settings updated successfully",
      success: true
    };
  }

  async getActivityLog(params?: {
    page?: number;
    limit?: number;
    action?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ProfileApiResponse<ActivityLog[]>> {
    await simulateDelay();
    
    let filteredLogs = [...ACTIVITY_LOG];
    
    // Apply filters
    if (params?.action) {
      filteredLogs = filteredLogs.filter(log => log.action === params.action);
    }
    
    if (params?.dateFrom) {
      filteredLogs = filteredLogs.filter(log => 
        new Date(log.timestamp) >= new Date(params.dateFrom!)
      );
    }
    
    if (params?.dateTo) {
      filteredLogs = filteredLogs.filter(log => 
        new Date(log.timestamp) <= new Date(params.dateTo!)
      );
    }
    
    // Sort by timestamp (newest first)
    filteredLogs.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedLogs = filteredLogs.slice(startIndex, endIndex);
    
    return {
      data: paginatedLogs,
      message: "Activity log retrieved successfully",
      success: true
    };
  }

  async deleteAccount(): Promise<ProfileApiResponse<null>> {
    await simulateDelay();
    
    // In a real app, this would initiate the account deletion process
    return {
      data: null,
      message: "Account deletion request submitted successfully",
      success: true
    };
  }

  async exportData(): Promise<ProfileApiResponse<string>> {
    await simulateDelay();
    
    // In a real app, this would generate and return a download URL for the user's data
    const downloadUrl = "/api/exports/user-data.zip";
    
    return {
      data: downloadUrl,
      message: "Data export prepared successfully",
      success: true
    };
  }
}

export const profileApi = new ProfileApiService();
