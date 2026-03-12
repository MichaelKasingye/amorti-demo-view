
export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'invited' | 'disabled';
  joinedAt?: string;
  avatar?: string;
}

export interface InviteTeamMemberData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
