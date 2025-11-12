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
  const [currentEmail, setCurrentEmail] = useState("user@example.com");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
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
    if (newEmail.trim() || confirmEmail.trim()) {
      if (!newEmail.trim()) {
        toast({
          title: "New email required",
          description: "Please enter a new email address.",
          variant: "destructive",
        });
        return;
      }
      if (newEmail !== confirmEmail) {
        toast({
          title: "Emails don't match",
          description: "Please make sure your new email addresses match.",
          variant: "destructive",
        });
        return;
      }
      if (newEmail === currentEmail) {
        toast({
          title: "Same email",
          description: "New email must be different from current email.",
          variant: "destructive",
        });
        return;
      }
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
    
    // Clear email change fields
    if (newEmail.trim()) {
      setNewEmail("");
      setConfirmEmail("");
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
            <CardTitle className="text-xl">Change Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current email</Label>
              <Input
                type="email"
                value={currentEmail}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>New email address</Label>
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Confirm new email</Label>
                <Input
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder="name@company.com"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              We'll send a confirmation link to verify your new email address
            </p>
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
