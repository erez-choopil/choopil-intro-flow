import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

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
        return value.trim() ? "" : "Business name is required";
      case "professional":
        return value ? "" : "Professional type is required";
      case "phoneNumber":
        return value.replace(/\D/g, "").length === 10
          ? ""
          : "Business phone number is required";
      case "description":
        return value.trim()
          ? ""
          : "You must describe what your business does";
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
    // Validate URL format
    try {
      new URL(url);
    } catch {
      return;
    }

    setIsLoadingWebsite(true);
    
    try {
      // TODO: Implement backend API call to fetch business information
      // This would require a backend service that can:
      // 1. Scrape the website or use a business data API (Clearbit, FullContact, etc.)
      // 2. Extract business name, description, contact info
      // 3. Return structured data
      
      // Mock implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example of what the API response might look like:
      // const response = await fetch('/api/fetch-business-info', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ url })
      // });
      // const data = await response.json();
      
      // For now, we'll just show the loading state
      // When you have a backend, populate the fields like this:
      // setFormData(prev => ({
      //   ...prev,
      //   businessName: data.name || prev.businessName,
      //   professional: data.industry || prev.professional,
      //   phoneNumber: data.phone || prev.phoneNumber,
      //   description: data.description || prev.description,
      // }));
      
    } catch (error) {
      console.error('Error fetching business info:', error);
    } finally {
      setIsLoadingWebsite(false);
    }
  };

  const handleWebsiteChange = (value: string) => {
    handleChange("website", value);
    
    // Debounce the fetch to avoid too many requests
    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        fetchBusinessInfo(value);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
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
            Tell us about your business
          </h1>
          <p className="text-muted-foreground">
            We'll use this to train your AI receptionist
          </p>
        </div>

        <div className="space-y-6">
          {/* Website Link */}
          <div className="space-y-2">
            <Label htmlFor="website" className="text-foreground">
              Website link <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="website"
              type="url"
              placeholder="https://yourwebsite.com"
              value={formData.website}
              onChange={(e) => handleWebsiteChange(e.target.value)}
              disabled={isLoadingWebsite}
            />
            {isLoadingWebsite ? (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Fetching your business information...
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                We'll fetch your business info automatically
              </p>
            )}
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
            <p className="text-sm text-muted-foreground">
              Calls from this number are free
            </p>
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
