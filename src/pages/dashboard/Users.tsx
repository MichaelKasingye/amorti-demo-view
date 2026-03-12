
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Key,
  Lock,
  Trash
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  department?: string;
  status: "active" | "invited" | "disabled";
  lastActive?: string;
}

const users: User[] = [
  {
    id: "u1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "owner",
    department: "Management",
    status: "active",
    lastActive: "2023-05-22T15:30:45",
  },
  {
    id: "u2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "admin",
    department: "Sales",
    status: "active",
    lastActive: "2023-05-22T14:25:10",
  },
  {
    id: "u3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "member",
    department: "Marketing",
    status: "active",
    lastActive: "2023-05-21T09:45:22",
  },
  {
    id: "u4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "member",
    department: "Support",
    status: "active",
    lastActive: "2023-05-20T16:15:30",
  },
  {
    id: "u5",
    name: "Daniel Wilson",
    email: "daniel@example.com",
    role: "admin",
    department: "Product",
    status: "active",
    lastActive: "2023-05-19T11:05:15",
  },
  {
    id: "u6",
    name: "Olivia Martinez",
    email: "olivia@example.com",
    role: "member",
    department: "Engineering",
    status: "invited",
  },
  {
    id: "u7",
    name: "James Taylor",
    email: "james@example.com",
    role: "member",
    department: "Sales",
    status: "disabled",
    lastActive: "2023-05-15T10:30:45",
  },
];

const roleLabels = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
};

const statusLabels = {
  active: "Active",
  invited: "Invited",
  disabled: "Disabled",
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "member",
    department: "",
  });
  const { toast } = useToast();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.department &&
        user.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${newUser.email}`,
    });

    setNewUser({
      name: "",
      email: "",
      role: "member",
      department: "",
    });

    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Users</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shrink-0">
              <Plus className="mr-2 h-4 w-4" />
              Invite User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
              <DialogDescription>
                Send an invitation to join your organization.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department (Optional)</Label>
                <Input
                  id="department"
                  placeholder="Sales"
                  value={newUser.department}
                  onChange={(e) =>
                    setNewUser({ ...newUser, department: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={roleFilter || "all"}
            onValueChange={(value) => setRoleFilter(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-full sm:w-[130px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>{roleFilter ? `Role: ${roleLabels[roleFilter as keyof typeof roleLabels]}` : "All Roles"}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="owner">Owner</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={statusFilter || "all"}
            onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-full sm:w-[130px]">
              <span>{statusFilter ? `Status: ${statusLabels[statusFilter as keyof typeof statusLabels]}` : "All Status"}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="invited">Invited</SelectItem>
              <SelectItem value="disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden lg:table-cell">Department</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Last Active</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-32 text-muted-foreground"
                >
                  No users found. Try adjusting your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant="outline"
                      className={`${
                        user.role === "owner"
                          ? "border-purple-500 text-purple-600 dark:border-purple-700 dark:text-purple-400"
                          : user.role === "admin"
                          ? "border-blue-500 text-blue-600 dark:border-blue-700 dark:text-blue-400"
                          : "border-gray-500 text-gray-600 dark:border-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {user.department || "-"}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="outline"
                      className={`${
                        user.status === "active"
                          ? "border-green-500 text-green-600 dark:border-green-700 dark:text-green-400"
                          : user.status === "invited"
                          ? "border-amber-500 text-amber-600 dark:border-amber-700 dark:text-amber-400"
                          : "border-red-500 text-red-600 dark:border-red-700 dark:text-red-400"
                      }`}
                    >
                      {statusLabels[user.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {user.lastActive
                      ? new Date(user.lastActive).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })
                      : "Never"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        {user.status !== "active" && (
                          <DropdownMenuItem>
                            <Key className="mr-2 h-4 w-4" />
                            Resend Invitation
                          </DropdownMenuItem>
                        )}
                        {user.status === "active" ? (
                          <DropdownMenuItem>
                            <Lock className="mr-2 h-4 w-4" />
                            Disable Account
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <Key className="mr-2 h-4 w-4" />
                            Enable Account
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{filteredUsers.length}</strong> of{" "}
          <strong>{users.length}</strong> users
        </div>
      </div>
    </div>
  );
};

export default Users;
