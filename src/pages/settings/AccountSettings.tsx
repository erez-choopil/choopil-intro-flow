import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AccountSettings() {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("Erez");
  const [lastName, setLastName] = useState("Sun");
  const [businessName, setBusinessName] = useState("בריכת מרדכי");
  const [phoneNumber, setPhoneNumber] = useState("(73) 384-4422");
  const [countryCode, setCountryCode] = useState("+972");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timezone, setTimezone] = useState("eastern");
  const [language, setLanguage] = useState("english");

  const handleSaveAll = () => {
    // Validate full name
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter both first and last name.",
        variant: "destructive",
      });
      return;
    }

    // Validate email change if attempted
    if (newEmail.trim() && !currentPassword.trim()) {
      toast({
        title: "Password required",
        description: "Please enter your current password to verify the email change.",
        variant: "destructive",
      });
      return;
    }

    // Validate password change if attempted
    if (currentPassword.trim() || newPassword.trim() || confirmPassword.trim()) {
      if (!currentPassword.trim()) {
        toast({
          title: "Current password required",
          description: "Please enter your current password.",
          variant: "destructive",
        });
        return;
      }
      if (!newPassword.trim()) {
        toast({
          title: "New password required",
          description: "Please enter a new password.",
          variant: "destructive",
        });
        return;
      }
      if (newPassword !== confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your new passwords match.",
          variant: "destructive",
        });
        return;
      }
    }

    // Success
    toast({
      title: "Settings saved",
      description: "Your account settings have been updated successfully.",
    });

    // Clear password fields
    if (currentPassword.trim()) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    
    // Clear email change field
    if (newEmail.trim()) {
      setNewEmail("");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Account settings</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First name</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Last name</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>New email address</Label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="name@company.com"
              />
              <p className="text-sm text-muted-foreground">
                We'll send a confirmation link to verify your new email address
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current password</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>New password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label>Confirm new password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save button */}
        <div className="pt-2">
          <Button onClick={handleSaveAll} className="w-full" size="lg">
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}
