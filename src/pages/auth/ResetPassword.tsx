
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { useResetPassword } from "@/hooks/useAuthQueries";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const resetPasswordMutation = useResetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in both password fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you'd get the token from URL params
    const token = "dummy-reset-token";
    resetPasswordMutation.mutate({ password, token });
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
        <div className="auth-header">
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-muted-foreground mt-2">
            Create a new password for your account
          </p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={resetPasswordMutation.isPending}
              required 
            />
            <p className="text-sm text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={resetPasswordMutation.isPending}
              required 
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={resetPasswordMutation.isPending}>
            {resetPasswordMutation.isPending ? "Resetting password..." : "Reset password"}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          <Link to="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
