import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-md">
      <div className="border border-border rounded-lg p-8 bg-card shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Create Your Account
          </h2>
          <p className="text-muted-foreground text-lg">
            Free for 7 days
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
...
        </form>
      </div>
    </div>
  );
}
