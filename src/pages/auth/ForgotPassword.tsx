
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";
import { useForgotPassword } from "@/hooks/useAuthQueries";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const forgotPasswordMutation = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
      }
    );
  };

  return (
    <div className="auth-container">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Link to="/" className="mb-8 flex items-center gap-2 text-xl font-bold text-primary">
        <div className="h-8 w-8 rounded-full bg-primary"></div>
        RaFa
      </Link>
      
      <div className="auth-card">
        {!submitted ? (
          <>
            <div className="auth-header">
              <h1 className="text-2xl font-bold">Forgot password</h1>
              <p className="text-muted-foreground mt-2">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>
            
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={forgotPasswordMutation.isPending}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={forgotPasswordMutation.isPending}>
                {forgotPasswordMutation.isPending ? "Sending email..." : "Send reset link"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Check your email</h2>
            <p className="text-muted-foreground mb-6">
              We sent a password reset link to<br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
            <Button variant="outline" asChild>
              <Link to="/login">Back to login</Link>
            </Button>
          </div>
        )}
        
        <div className="mt-4 text-center text-sm">
          <Link to="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
