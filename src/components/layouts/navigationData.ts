
import {
  Users,
  Settings,
  Database,
  Columns3,
  Contact,
  UsersIcon,
  Layers,
  BarChart3,
  Calculator,
  Package,
  Banknote,
  AArrowDown,
  BotMessageSquare,
  BotIcon,
} from "lucide-react";
import { NavItem, Organization } from "./types";

export const mainNavItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Columns3 },
  { name: "Contacts", href: "/dashboard/contacts", icon: Contact },
  { name: "Deals", href: "/dashboard/deals", icon: BarChart3 },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Amortization", href: "/dashboard/amortization", icon: Calculator },
  // { name: "Assets", href: "/dashboard/assets", icon: Banknote },
  // { name: "Liabilities", href: "/dashboard/liabilities", icon: AArrowDown },
  // { name: "AI", href: "/dashboard/ai", icon: BotMessageSquare },
  // { name: "AI Agent", href: "/dashboard/ai-agent", icon: BotIcon },
  // { name: "Core Banking", href: "/dashboard/core-banking", icon: Database },
];

export const settingsNavItems: NavItem[] = [
  { name: "Users", href: "/dashboard/users", icon: UsersIcon },
  { name: "Departments", href: "/dashboard/departments", icon: Database },
  { name: "Teams", href: "/dashboard/teams", icon: Users },
  { name: "Roles & Permissions", href: "/dashboard/roles", icon: Layers },
  { name: "Subscriptions", href: "/dashboard/subscriptions", icon: Settings },
];

export const organizations: Organization[] = [
  { id: 1, name: "HFB", logo: "" },
  { id: 2, name: "Globex Corp", logo: "" },
];
