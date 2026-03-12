
import { Link } from "react-router-dom";
import { X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./NavMenu";
import { OrganizationDropdown } from "./OrganizationDropdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mainNavItems, settingsNavItems } from "./navigationData";
import { Organization } from "./types";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  organizations: Organization[];
  currentOrg: Organization;
  onOrgChange: (org: Organization) => void;
}

export function MobileSidebar({ 
  isOpen, 
  onClose, 
  organizations, 
  currentOrg, 
  onOrgChange 
}: MobileSidebarProps) {
  const handleNavClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      <div 
        className="fixed inset-0 bg-background/80 z-40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r p-4 transform transition-transform duration-200 ease-in-out translate-x-0 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard" className="text-2xl font-bold text-primary">Rafa</Link>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="mb-6">
          <OrganizationDropdown
            organizations={organizations}
            currentOrg={currentOrg}
            onOrgChange={onOrgChange}
            onItemClick={handleNavClick}
          />
        </div>
        
        <ScrollArea className="flex-1">
          <nav className="space-y-6">
            <NavMenu items={mainNavItems} title="Main" onItemClick={handleNavClick} defaultOpen={true} />
            <NavMenu items={settingsNavItems} title="Settings" onItemClick={handleNavClick} defaultOpen={false} />
          </nav>
        </ScrollArea>
        
        <div className="mt-auto pt-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
