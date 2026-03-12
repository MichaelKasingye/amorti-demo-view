
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "./types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface NavMenuProps {
  items: NavItem[];
  title: string;
  onItemClick?: () => void;
  defaultOpen?: boolean;
}

export function NavMenu({ items, title, onItemClick, defaultOpen = true }: NavMenuProps) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground mb-2 px-3 lg:px-2 hover:text-foreground transition-colors">
        <span>{title}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen ? "rotate-180" : "")} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                onClick={onItemClick}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
