
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Organization } from "./types";

interface OrganizationDropdownProps {
  organizations: Organization[];
  currentOrg: Organization;
  onOrgChange: (org: Organization) => void;
  onItemClick?: () => void;
}

export function OrganizationDropdown({ 
  organizations, 
  currentOrg, 
  onOrgChange, 
  onItemClick 
}: OrganizationDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarFallback>{currentOrg.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{currentOrg.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.map((org) => (
          <DropdownMenuItem key={org.id} onClick={() => onOrgChange(org)}>
            <Avatar className="h-6 w-6 mr-2">
              <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{org.name}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/organizations/create" className="w-full" onClick={onItemClick}>
            Create organization
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
