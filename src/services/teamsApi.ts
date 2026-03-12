
import { TeamMember, InviteTeamMemberData } from "@/types/teams";

export interface TeamsApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  total?: number;
}

export interface InviteLink {
  id: string;
  link: string;
  expiresAt: string;
  createdBy: string;
  createdAt: string;
  usageCount: number;
  maxUsage?: number;
}

// Simulate API delay
const simulateDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Dummy team members data
const DUMMY_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm1",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah@example.com",
    role: "Admin",
    department: "Sales",
    status: "active",
    joinedAt: "2023-05-15T10:30:00Z",
    avatar: ""
  },
  {
    id: "tm2",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@example.com",
    role: "Manager",
    department: "Marketing",
    status: "active",
    joinedAt: "2023-04-20T14:15:00Z",
    avatar: ""
  },
  {
    id: "tm3",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily@example.com",
    role: "Sales Representative",
    department: "Sales",
    status: "active",
    joinedAt: "2023-03-10T09:45:00Z",
    avatar: ""
  }
];

class TeamsApiService {
  private teamMembers: TeamMember[] = [...DUMMY_TEAM_MEMBERS];
  private inviteLinks: InviteLink[] = [];

  async getTeamMembers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
    status?: string;
  }): Promise<TeamsApiResponse<TeamMember[]>> {
    await simulateDelay();
    
    let filteredMembers = [...this.teamMembers];
    
    // Apply filters
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredMembers = filteredMembers.filter(member =>
        member.firstName.toLowerCase().includes(searchTerm) ||
        member.lastName.toLowerCase().includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm) ||
        member.department.toLowerCase().includes(searchTerm) ||
        member.role.toLowerCase().includes(searchTerm)
      );
    }
    
    if (params?.department) {
      filteredMembers = filteredMembers.filter(member => 
        member.department === params.department
      );
    }
    
    if (params?.status) {
      filteredMembers = filteredMembers.filter(member => 
        member.status === params.status
      );
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMembers = filteredMembers.slice(startIndex, endIndex);
    
    return {
      data: paginatedMembers,
      message: "Team members retrieved successfully",
      success: true,
      total: filteredMembers.length
    };
  }

  async getTeamMemberById(id: string): Promise<TeamsApiResponse<TeamMember>> {
    await simulateDelay();
    
    const member = this.teamMembers.find(m => m.id === id);
    if (!member) {
      throw new Error("Team member not found");
    }
    
    return {
      data: member,
      message: "Team member retrieved successfully",
      success: true
    };
  }

  async inviteTeamMember(memberData: InviteTeamMemberData): Promise<TeamsApiResponse<TeamMember>> {
    await simulateDelay();
    
    // Simulate validation
    if (!memberData.firstName || !memberData.lastName || !memberData.email || !memberData.role) {
      throw new Error("All fields are required");
    }
    
    // Check for duplicate email
    if (this.teamMembers.some(m => m.email === memberData.email)) {
      throw new Error("Team member with this email already exists");
    }
    
    const newMember: TeamMember = {
      id: `tm${Date.now()}`,
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      email: memberData.email,
      role: memberData.role,
      department: "General",
      status: "invited"
    };
    
    this.teamMembers.push(newMember);
    
    return {
      data: newMember,
      message: "Team member invitation sent successfully",
      success: true
    };
  }

  async updateTeamMemberRole(id: string, role: string): Promise<TeamsApiResponse<TeamMember>> {
    await simulateDelay();
    
    const memberIndex = this.teamMembers.findIndex(m => m.id === id);
    if (memberIndex === -1) {
      throw new Error("Team member not found");
    }
    
    this.teamMembers[memberIndex].role = role;
    
    return {
      data: this.teamMembers[memberIndex],
      message: "Team member role updated successfully",
      success: true
    };
  }

  async removeTeamMember(id: string): Promise<TeamsApiResponse<null>> {
    await simulateDelay();
    
    const memberIndex = this.teamMembers.findIndex(m => m.id === id);
    if (memberIndex === -1) {
      throw new Error("Team member not found");
    }
    
    this.teamMembers.splice(memberIndex, 1);
    
    return {
      data: null,
      message: "Team member removed successfully",
      success: true
    };
  }

  async generateInviteLink(maxUsage?: number): Promise<TeamsApiResponse<InviteLink>> {
    await simulateDelay();
    
    const inviteLink: InviteLink = {
      id: `link_${Date.now()}`,
      link: `https://yourapp.com/invite/${Math.random().toString(36).substring(2, 15)}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      createdBy: "Current User",
      createdAt: new Date().toISOString(),
      usageCount: 0,
      maxUsage
    };
    
    this.inviteLinks.push(inviteLink);
    
    return {
      data: inviteLink,
      message: "Invite link generated successfully",
      success: true
    };
  }

  async getInviteLinks(): Promise<TeamsApiResponse<InviteLink[]>> {
    await simulateDelay();
    
    return {
      data: this.inviteLinks,
      message: "Invite links retrieved successfully",
      success: true
    };
  }

  async deleteInviteLink(id: string): Promise<TeamsApiResponse<null>> {
    await simulateDelay();
    
    const linkIndex = this.inviteLinks.findIndex(l => l.id === id);
    if (linkIndex === -1) {
      throw new Error("Invite link not found");
    }
    
    this.inviteLinks.splice(linkIndex, 1);
    
    return {
      data: null,
      message: "Invite link deleted successfully",
      success: true
    };
  }
}

export const teamsApi = new TeamsApiService();
