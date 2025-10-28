import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [currentPasswordForEmail, setCurrentPasswordForEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateName = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter both first and last name.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Name updated",
      description: "Your name has been updated successfully.",
    });
  };

  const handleSaveBusinessDetails = () => {
    if (!businessName.trim()) {
      toast({
        title: "Business name required",
        description: "Please enter your business name.",
        variant: "destructive",
      });
      return;
    }
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter your business phone number.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Business details saved",
      description: "Your business details have been updated successfully.",
    });
  };

  const handleUpdateEmail = () => {
    if (!newEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter a new email address.",
        variant: "destructive",
      });
      return;
    }
    if (!currentPasswordForEmail.trim()) {
      toast({
        title: "Password required",
        description: "Please enter your current password to verify the change.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Verification email sent",
      description: "Please check your inbox to verify your new email address.",
    });
  };

  const handleChangePassword = () => {
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
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully.",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-foreground mb-8">Account settings</h1>

      <div className="space-y-8">
        {/* Full name */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">Full name</Label>
          
          <div className="space-y-2">
            <Label>First name</Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label>Last name</Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="max-w-md"
            />
          </div>

          <Button onClick={handleUpdateName}>Update name</Button>
        </div>

        {/* Business details */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">Business details</Label>

          <div className="space-y-2">
            <Label>
              Business name <span className="text-destructive">*</span>
            </Label>
            <Input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Business phone number <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-2 max-w-md">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+972">🇮🇱 +972</SelectItem>
                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                  <SelectItem value="+44">🇬🇧 +44</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Calling from this number to your agent is free
            </p>
          </div>

          <Button onClick={handleSaveBusinessDetails}>Save details</Button>
        </div>

        {/* Change email */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">Change email</Label>
          <p className="text-sm text-muted-foreground">
            We'll send a confirmation link to verify your new email address
          </p>

          <div className="space-y-2">
            <Label>New email address</Label>
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="name@company.com"
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label>Current password</Label>
            <Input
              type="password"
              value={currentPasswordForEmail}
              onChange={(e) => setCurrentPasswordForEmail(e.target.value)}
              placeholder="••••••••"
              className="max-w-md"
            />
          </div>

          <Button onClick={handleUpdateEmail} disabled={!newEmail || !currentPasswordForEmail}>
            Update email
          </Button>
        </div>

        {/* Change password */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">Change password</Label>

          <div className="space-y-2">
            <Label>Current password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label>New password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label>Confirm new password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="max-w-md"
            />
          </div>

          <Button onClick={handleChangePassword} disabled={!currentPassword || !newPassword || !confirmPassword}>
            Change password
          </Button>
        </div>

        {/* Other */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">Other</Label>

          <div className="space-y-2">
            <Label>Time zone</Label>
            <Select defaultValue="eastern">
              <SelectTrigger className="max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eastern">Eastern Time — 07:52 PM</SelectItem>
                <SelectItem value="central">Central Time — 06:52 PM</SelectItem>
                <SelectItem value="mountain">Mountain Time — 05:52 PM</SelectItem>
                <SelectItem value="pacific">Pacific Time — 04:52 PM</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Used to display time in the app
            </p>
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <Select defaultValue="english">
              <SelectTrigger className="max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="hebrew">Hebrew</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Language used to translate call information
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
