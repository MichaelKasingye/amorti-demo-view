
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const LandingHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary"></div>
            Rafiki Fanaka System
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">Features</Link>
            <Link to="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground">Benefits</Link>
            <Link to="#solutions" className="text-sm font-medium text-muted-foreground hover:text-foreground">Solutions</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
          <button
            className="md:hidden flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link 
              to="#features" 
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="#benefits" 
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Benefits
            </Link>
            <Link 
              to="#solutions" 
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Solutions
            </Link>
            <div className="pt-4 flex flex-col gap-2">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="w-full">Get Started</Button>
              </Link>
              <div className="flex justify-center pt-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
