import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle password reset logic
      console.log("Password reset for:", email);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-[480px] border-border">
          <CardContent className="p-8 md:p-12">
            <h1 className="text-[28px] font-bold text-foreground text-center mb-4">
              Check your email
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <Link to="/login">
              <Button className="w-full h-12 text-base font-medium">
                Back to login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-[480px] border-border">
        <CardContent className="p-8 md:p-12">
          <h1 className="text-[28px] font-bold text-foreground text-center mb-4">
            Reset your password
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Enter your email and we'll send you a reset link
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@choopil.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error ? "border-destructive" : ""}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium mt-4"
            >
              Send reset link
            </Button>
          </form>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm text-primary hover:underline mt-8"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
