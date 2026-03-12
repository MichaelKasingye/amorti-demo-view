
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Download } from "lucide-react";
import { TeamMember } from "@/types/teams";
import { exportTableData } from "@/utils/csvExport";

interface TeamsTableProps {
  members: TeamMember[];
  onRoleChange: (memberId: string, newRole: string) => void;
}

const availableRoles = [
  "Admin",
  "Manager", 
  "Member",
  "Viewer",
  "Sales Representative",
  "Marketing Specialist",
  "Support Agent",
];

const statusColors = {
  active: "border-green-500 text-green-600 dark:border-green-700 dark:text-green-400",
  invited: "border-amber-500 text-amber-600 dark:border-amber-700 dark:text-amber-400",
  disabled: "border-red-500 text-red-600 dark:border-red-700 dark:text-red-400",
};

export function TeamsTable({ members, onRoleChange }: TeamsTableProps) {
  const handleExportCSV = () => {
    const customHeaders = {
      'firstName': 'First Name',
      'lastName': 'Last Name',
      'email': 'Email',
      'department': 'Department',
      'role': 'Role',
      'status': 'Status',
      'joinedAt': 'Joined Date'
    };
    
    const exportData = members.map(member => ({
      ...member,
      joinedAt: member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : 'Pending'
    }));
    
    exportTableData(exportData, 'team-members-export', customHeaders);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleExportCSV} className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team Member</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                  No team members found. Start by inviting your first team member.
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {member.firstName} {member.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>
                    <Select
                      value={member.role}
                      onValueChange={(newRole) => onRoleChange(member.id, newRole)}
                    >
                      <SelectTrigger className="w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusColors[member.status]}
                    >
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {member.joinedAt
                      ? new Date(member.joinedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Pending'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
