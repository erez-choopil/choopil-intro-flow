import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingWithDashboard } from "@/components/onboarding/OnboardingWithDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleBack = () => {
    navigate("/onboarding/customize");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // TODO: Implement actual signup logic
    navigate("/onboarding/success");
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
    console.log("Sign up with Google");
  };

  const handleAppleSignup = () => {
    // TODO: Implement Apple OAuth
    console.log("Sign up with Apple");
  };

  return (
    <OnboardingWithDashboard>
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="w-full max-w-[520px] mx-4 bg-background rounded-2xl shadow-2xl p-10">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                🎉 Almost there!
              </h1>
              <p className="text-muted-foreground">
                Create your account to save your<br />AI receptionist settings
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-[#10b981] hover:bg-[#10b981]/90 text-white"
              >
                Create an account
              </Button>
            </form>

            {/* OAuth Options */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.20443C17.64 8.56625 17.5827 7.95262 17.4764 7.36353H9V10.8449H13.8436C13.635 11.9699 13.0009 12.9231 12.0477 13.5613V15.8194H14.9564C16.6582 14.2526 17.64 11.9453 17.64 9.20443Z" fill="#4285F4"/>
                  <path d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z" fill="#34A853"/>
                  <path d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40665 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54756 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z" fill="#FBBC05"/>
                  <path d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleAppleSignup}
                className="w-full flex items-center justify-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.4583 9.65625C14.4479 8.02083 15.2812 6.66667 16.9479 5.60417C16.0521 4.34375 14.6875 3.64583 13.0104 3.52083C11.4167 3.39583 9.70833 4.51042 9.02083 4.51042C8.30208 4.51042 6.80208 3.55208 5.58333 3.55208C3.08333 3.59375 0.416656 5.60417 0.416656 9.70833C0.416656 10.8854 0.635406 12.1042 1.07291 13.3646C1.64583 14.9583 3.77083 19.0625 6.01041 19C7.16666 18.9688 8.02083 18.125 9.47916 18.125C10.8958 18.125 11.6979 19 12.9792 19C15.2396 18.9688 17.1458 15.2812 17.6979 13.6875C14.8333 12.3438 14.4583 9.73958 14.4583 9.65625ZM12.0208 2.14583C13.3229 0.614583 13.2083 -0.75 13.1771 -1.25C12.0312 -1.1875 10.6771 -0.447917 9.875 0.427083C9.00208 1.36458 8.45833 2.54167 8.58333 3.89583C9.8125 3.98958 10.9167 3.41667 12.0208 2.14583Z"/>
                </svg>
                Sign up with Apple
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-primary hover:underline font-medium"
                >
                  Sign In
                </button>
              </p>
            </div>

            {/* Back Button */}
            <div className="flex justify-start pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBack}
                className="text-muted-foreground hover:text-foreground -ml-3"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </OnboardingWithDashboard>
  );
}
