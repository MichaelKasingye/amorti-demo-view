
import { Link } from "react-router-dom";

export const LandingFooter = () => {
  return (
    <footer className="bg-background py-12">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Features</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Mortgage Brokers</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Loan Officers</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Financial Advisors</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Support</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Training</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Security</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary"></div>
            <span className="text-xl font-bold">Rafiki Fanaka System</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            © {new Date().getFullYear()} Rafiki Fanaka System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
