
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TeamsTable } from "@/components/teams/TeamsTable";
import { InviteTeamDialog } from "@/components/teams/InviteTeamDialog";
import { InviteLinkModal } from "@/components/teams/InviteLinkModal";
import { TeamMember, InviteTeamMemberData } from "@/types/teams";

// Mock data - in a real app this would come from your backend
const mockTeamMembers: TeamMember[] = [
  {
    id: "tm1",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah@housingfinancebank.com",
    role: "Admin",
    department: "Distribution and Alternative Channels",
    status: "active",
    joinedAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "tm2",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@housingfinancebank.com",
    role: "sales representative",
    department: "Mortgage and Consumer banking",
    status: "active",
    joinedAt: "2023-04-20T14:15:00Z",
  },
  {
    id: "tm3",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily@housingfinancebank.com",
    role: "Sales Representative",
    department: "Distribution and Alternative Channels",
    status: "active",
    joinedAt: "2023-03-10T09:45:00Z",
  },
  {
    id: "tm4",
    firstName: "Daniel",
    lastName: "Wilson",
    email: "daniel@housingfinancebank.com",
    role: "Support Agent",
    department: "Distribution and Alternative Channels",
    status: "invited",
  },
  {
    id: "tm5",
    firstName: "Olivia",
    lastName: "Martinez",
    email: "olivia@housingfinancebank.com",
    role: "Marketing Specialist",
    department: "Distribution and Alternative Channels",
    status: "active",
    joinedAt: "2023-02-28T16:20:00Z",
  },
];

const Teams = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isInviteLinkModalOpen, setIsInviteLinkModalOpen] = useState(false);
  const [generatedInviteLink, setGeneratedInviteLink] = useState("");
  const { toast } = useToast();

  const filteredMembers = teamMembers.filter((member) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      member.firstName.toLowerCase().includes(searchLower) ||
      member.lastName.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower) ||
      member.department.toLowerCase().includes(searchLower) ||
      member.role.toLowerCase().includes(searchLower)
    );
  });

  const handleRoleChange = (memberId: string, newRole: string) => {
    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
    
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      toast({
        title: "Role Updated",
        description: `${member.firstName} ${member.lastName}'s role has been updated to ${newRole}`,
      });
    }
  };

  const handleInviteTeamMember = (data: InviteTeamMemberData) => {
    const newMember: TeamMember = {
      id: `tm${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      department: "General", // You might want to add department selection to the invite form
      status: "invited",
    };

    setTeamMembers((prev) => [...prev, newMember]);
    
    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${data.firstName} ${data.lastName}`,
    });
  };

  const handleGenerateInviteLink = () => {
    // Generate a dummy invite link - in real app this would come from backend
    const dummyInviteLink = `https://yourapp.com/invite/${Math.random().toString(36).substring(2, 15)}`;
    
    setGeneratedInviteLink(dummyInviteLink);
    setIsInviteLinkModalOpen(true);
    
    // Also copy to clipboard
    navigator.clipboard.writeText(dummyInviteLink).then(() => {
      toast({
        title: "Invite Link Generated",
        description: "The invite link has been copied to your clipboard.",
      });
    }).catch(() => {
      toast({
        title: "Invite Link Generated",
        description: "Please copy the link from the modal.",
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Teams</h1>
          <p className="text-muted-foreground">
            Manage your team members and their roles
          </p>
        </div>
        <div className="flex gap-2">
          {/* <Button onClick={handleGenerateInviteLink} variant="outline" className="shrink-0">
            <Link className="mr-2 h-4 w-4" />
            Generate Invite Link
          </Button> */}
          {/* <Button onClick={() => setIsInviteDialogOpen(true)} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Invite Team
          </Button> */}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            View and manage all team members across departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TeamsTable 
            members={filteredMembers} 
            onRoleChange={handleRoleChange}
          />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{filteredMembers.length}</strong> of{" "}
          <strong>{teamMembers.length}</strong> team members
        </div>
      </div>

      <InviteTeamDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        onInvite={handleInviteTeamMember}
      />

      <InviteLinkModal
        open={isInviteLinkModalOpen}
        onOpenChange={setIsInviteLinkModalOpen}
        inviteLink={generatedInviteLink}
      />
    </div>
  );
};

export default Teams;
