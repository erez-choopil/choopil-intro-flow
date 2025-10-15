import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Sparkles } from "lucide-react";

const professionals = [
  "Lawyer",
  "Real Estate Agent",
  "Contractor",
  "Doctor",
  "Dentist",
  "Therapist",
  "Psychologist",
  "Chiropractor",
  "Physical Therapist",
  "Personal Trainer",
  "Nutritionist",
  "Accountant",
  "Financial Advisor",
  "Insurance Agent",
  "Mortgage Broker",
  "Consultant",
  "Marketing Specialist",
  "Architect",
  "Interior Designer",
  "Photographer",
  "Videographer",
  "Wedding Planner",
  "Tutor",
  "Teacher",
  "Career Coach",
  "Life Coach",
  "Business Coach",
  "Veterinarian",
  "Groomer",
  "Plumber",
  "Electrician",
  "HVAC Technician",
  "Landscaper",
  "Auto Mechanic",
  "Salon Owner",
  "Barber",
  "Massage Therapist",
  "Esthetician",
  "Other",
];

const countryCodes = [
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
];

export default function BusinessDetails() {
  const navigate = useNavigate();
  const [isLoadingWebsite, setIsLoadingWebsite] = useState(false);
  const [formData, setFormData] = useState({
    website: "",
    businessName: "",
    professional: "",
    otherProfessional: "",
    countryCode: "+1",
    phoneNumber: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    businessName: "",
    professional: "",
    phoneNumber: "",
    description: "",
  });

  const [touched, setTouched] = useState({
    businessName: false,
    professional: false,
    phoneNumber: false,
    description: false,
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "businessName":
        return value.trim() ? "" : "We'll need your business name to get started";
      case "professional":
        return value ? "" : "Professional type is required";
      case "phoneNumber":
        return value.replace(/\D/g, "").length === 10
          ? ""
          : "Your business phone helps us personalize your assistant";
      case "description":
        return value.trim()
          ? ""
          : "Help us understand what you do so your assistant can answer questions";
      default:
        return "";
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    setErrors({
      ...errors,
      [field]: validateField(field, formData[field as keyof typeof formData]),
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field as keyof typeof touched]) {
      setErrors({ ...errors, [field]: validateField(field, value) });
    }
  };

  const fetchBusinessInfo = async (url: string) => {
    // Add protocol if missing
    let validUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      validUrl = 'https://' + url;
    }
    
    // Validate URL format
    try {
      new URL(validUrl);
    } catch {
      return;
    }

    setIsLoadingWebsite(true);
    
    try {
      // Mock implementation - simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data based on the URL domain
      const domain = new URL(validUrl).hostname.replace('www.', '');
      const businessName = domain.split('.')[0]
        .split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      setFormData(prev => ({
        ...prev,
        businessName: businessName || "Example Business",
        professional: "Consultant",
        phoneNumber: "(555) 123-4567",
        description: "We provide professional services to help businesses grow and succeed in their industry.",
      }));
      
    } catch (error) {
      console.error('Error fetching business info:', error);
    } finally {
      setIsLoadingWebsite(false);
    }
  };

  const handleWebsiteChange = (value: string) => {
    handleChange("website", value);
  };

  const handleFetchBusinessInfo = () => {
    if (formData.website.trim()) {
      fetchBusinessInfo(formData.website);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleChange("phoneNumber", formatted);
  };

  const isFormValid = () => {
    return (
      formData.businessName.trim() &&
      formData.phoneNumber.replace(/\D/g, "").length === 10
    );
  };

  const handleNext = () => {
    if (isFormValid()) {
      navigate("/onboarding/voice");
    }
  };

  const handleSkip = () => {
    navigate("/onboarding/voice");
  };

  const charCount = formData.description.length;

  return (
    <OnboardingLayout
      currentStep={0}
      onNext={handleNext}
      onSkip={handleSkip}
      nextDisabled={!isFormValid()}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Let's get to know your business
          </h1>
          <p className="text-muted-foreground">
            This helps your AI assistant sound like part of your team
          </p>
        </div>

        <div className="space-y-6">
          {/* Website Auto-fill Section */}
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-border">
            <Label htmlFor="website" className="text-foreground">
              Have a website? Let us fill this out for you
            </Label>
            <p className="text-sm text-muted-foreground">
              We'll grab your business details to save you time
            </p>
            <div className="flex gap-2">
              <Input
                id="website"
                type="url"
                placeholder="https://yourwebsite.com"
                value={formData.website}
                onChange={(e) => handleWebsiteChange(e.target.value)}
                disabled={isLoadingWebsite}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleFetchBusinessInfo}
                disabled={!formData.website.trim() || isLoadingWebsite}
                className="shrink-0"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Auto-fill
              </Button>
            </div>
            {isLoadingWebsite && (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Grabbing your business details...
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or fill manually
              </span>
            </div>
          </div>

          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-foreground">
              Business name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="businessName"
              placeholder="Your Business Name"
              value={formData.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              onBlur={() => handleBlur("businessName")}
              className={errors.businessName && touched.businessName ? "border-destructive" : ""}
            />
            {errors.businessName && touched.businessName && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.businessName}
              </p>
            )}
          </div>

          {/* Professional */}
          <div className="space-y-2">
            <Label htmlFor="professional" className="text-foreground">
              Professional
            </Label>
            <Select
              value={formData.professional}
              onValueChange={(value) => handleChange("professional", value)}
            >
              <SelectTrigger
                id="professional"
                className={errors.professional && touched.professional ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select your profession" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {professionals.map((professional) => (
                  <SelectItem key={professional} value={professional}>
                    {professional}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.professional === "Other" && (
              <Input
                placeholder="Please specify"
                value={formData.otherProfessional}
                onChange={(e) => handleChange("otherProfessional", e.target.value)}
                className="mt-2"
              />
            )}
            {errors.professional && touched.professional && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.professional}
              </p>
            )}
          </div>

          {/* Business Phone */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-foreground">
              Business phone <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-3">
              <Select
                value={formData.countryCode}
                onValueChange={(value) => handleChange("countryCode", value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {countryCodes.map((item) => (
                    <SelectItem key={item.code} value={item.code}>
                      {item.flag} {item.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="(919) 555-2171"
                value={formData.phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onBlur={() => handleBlur("phoneNumber")}
                className={`flex-1 ${errors.phoneNumber && touched.phoneNumber ? "border-destructive" : ""}`}
              />
            </div>
            {errors.phoneNumber && touched.phoneNumber && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* Business Description */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="description" className="text-foreground">
                What does your business do?
              </Label>
              <p className="text-xs text-muted-foreground">{charCount}/300</p>
            </div>
            <Textarea
              id="description"
              placeholder="We sell premium office furniture..."
              value={formData.description}
              onChange={(e) => {
                if (e.target.value.length <= 300) {
                  handleChange("description", e.target.value);
                }
              }}
              onBlur={() => handleBlur("description")}
              className={`min-h-[100px] resize-none ${
                errors.description && touched.description ? "border-destructive" : ""
              }`}
              maxLength={300}
            />
            {errors.description && touched.description && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
