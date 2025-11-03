import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Globe } from "lucide-react";

interface TrainStepProps {
  onContinue: () => void;
}

export default function TrainStep({ onContinue }: TrainStepProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    businessPhone: "",
    businessAddress: "",
    website: "",
    googleProfile: "",
  });

  const [errors, setErrors] = useState({
    businessName: "",
    businessPhone: "",
  });

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length === 10;
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, businessPhone: value });
    if (value && !validatePhone(value)) {
      setErrors({ ...errors, businessPhone: "Please enter a valid 10-digit phone number" });
    } else {
      setErrors({ ...errors, businessPhone: "" });
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      businessName: !formData.businessName ? "Business name is required" : "",
      businessPhone: formData.businessPhone && !validatePhone(formData.businessPhone) 
        ? "Please enter a valid 10-digit phone number" 
        : "",
    };

    setErrors(newErrors);

    if (!newErrors.businessName && !newErrors.businessPhone) {
      onContinue();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Business Knowledge</h1>
        <p className="text-muted-foreground">
          Train your AI agent with information about your business. All fields are optional, but more information helps your agent provide better responses.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Business Information</CardTitle>
          <CardDescription>
            Provide essential details about your business for accurate caller assistance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName">
              Business Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="businessName"
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className={errors.businessName ? "border-destructive" : ""}
            />
            {errors.businessName && (
              <p className="text-sm text-destructive">{errors.businessName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessPhone">Business Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="businessPhone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.businessPhone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={`pl-10 ${errors.businessPhone ? "border-destructive" : ""}`}
              />
            </div>
            {errors.businessPhone && (
              <p className="text-sm text-destructive">{errors.businessPhone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="businessAddress"
                placeholder="123 Main Street, City, State, ZIP"
                value={formData.businessAddress}
                onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="website"
                type="url"
                placeholder="https://yourwebsite.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="googleProfile">Google Business Profile URL</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="googleProfile"
                type="url"
                placeholder="https://g.page/your-business"
                value={formData.googleProfile}
                onChange={(e) => setFormData({ ...formData, googleProfile: e.target.value })}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              We'll automatically import your business information from your Google Business Profile
            </p>
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Continue to Test
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
