
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { X, Cookie } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Cookie className="h-5 w-5" />
            Cookie Policy
          </CardTitle>
          <button
            onClick={handleDecline}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-sm">
            We use cookies to enhance your experience and analyze site usage. By continuing to use our site, you agree to our use of cookies.
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleAccept} className="flex-1">
              Accept All
            </Button>
            <Button onClick={handleDecline} variant="outline" className="flex-1">
              Decline
            </Button>
          </div>
          <div className="text-center">
            <Link 
              to="/policy" 
              className="text-sm text-primary hover:underline"
            >
              Read our Privacy Policy
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
