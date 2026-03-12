
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { MobileSidebar } from "./MobileSidebar";
import { DesktopSidebar } from "./DesktopSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { organizations } from "./navigationData";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentOrg, setCurrentOrg] = useState(organizations[0]);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleOrgChange = (org: typeof organizations[0]) => {
    setCurrentOrg(org);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        organizations={organizations}
        currentOrg={currentOrg}
        onOrgChange={handleOrgChange}
      />
      
      {/* Desktop sidebar */}
      <DesktopSidebar
        organizations={organizations}
        currentOrg={currentOrg}
        onOrgChange={handleOrgChange}
      />
      
      <div className="lg:pl-64">
        {/* Top navbar */}
        <DashboardHeader
          currentOrg={currentOrg}
          onMenuClick={handleMenuClick}
        />
        
        {/* Main content */}
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
