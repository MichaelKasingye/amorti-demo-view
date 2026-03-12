import { Link } from "react-router-dom";
import { NavMenu } from "./NavMenu";
import { OrganizationDropdown } from "./OrganizationDropdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mainNavItems, settingsNavItems } from "./navigationData";
import { Organization } from "./types";

interface DesktopSidebarProps {
  organizations: Organization[];
  currentOrg: Organization;
  onOrgChange: (org: Organization) => void;
}

export function DesktopSidebar({ organizations, currentOrg, onOrgChange }: DesktopSidebarProps) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64 lg:block lg:bg-sidebar lg:border-r lg:pb-4 lg:flex lg:flex-col">
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <Link to="/dashboard" className="text-2xl font-bold text-primary">Rafa</Link>
      </div>
      
      <div className="px-4 py-4">
        <OrganizationDropdown
          organizations={organizations}
          currentOrg={currentOrg}
          onOrgChange={onOrgChange}
        />
      </div>
      
      <ScrollArea className="flex-1 px-4">
        <nav className="space-y-6">
          <NavMenu items={mainNavItems} title="Main" defaultOpen={true} />
          <NavMenu items={settingsNavItems} title="Settings" defaultOpen={false} />
        </nav>
      </ScrollArea>
    </div>
  );
}
