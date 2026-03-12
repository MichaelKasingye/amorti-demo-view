
import { ElementType } from "react";

export interface NavItem {
  name: string;
  href: string;
  icon: ElementType;
}

export interface Organization {
  id: number;
  name: string;
  logo: string;
}
