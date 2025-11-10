import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Info, HelpCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const professionals = ["Lawyer", "Real Estate Agent", "Contractor", "Personal Trainer", "Nutritionist", "Accountant", "Financial Advisor", "Insurance Agent", "Mortgage Broker", "Consultant", "Marketing Specialist", "Architect", "Interior Designer", "Photographer", "Videographer", "Wedding Planner", "Tutor", "Teacher", "Career Coach", "Life Coach", "Business Coach", "Veterinarian", "Groomer", "Plumber", "Electrician", "HVAC Technician", "Landscaper", "Auto Mechanic", "Nail Salon, Spa", "Barber", "Massage Therapist", "Esthetician", "Property Manager", "Roofing Contractor", "Locksmith", "Pest Control", "House Cleaning", "Auto Body Shop", "Car Detailing", "Tax Preparer", "IT Consultant", "Marketing Agency", "Recruiting Agency", "Graphic Designer, Web Designer", "Yoga/Pilates Studio", "Gym/Fitness Center", "Pet Sitter, Dog Trainer", "Event Planner", "Catering", "Music Teacher", "Dance Instructor", "Restaurant", "Cafe", "Retail Store", "Towing Service", "Moving Company", "Funeral Home", "Other"];

interface BusinessDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  businessType: string;
  onSave: (data: {
    businessName: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
    businessType: string;
  }) => void;
}

export function BusinessDetailsModal({
  open,
  onOpenChange,
  businessName: initialName,
  businessAddress: initialAddress,
  businessPhone: initialPhone,
  businessEmail: initialEmail,
  businessType: initialType,
  onSave,
}: BusinessDetailsModalProps) {
  const [businessName, setBusinessName] = useState(initialName);
  const [businessAddress, setBusinessAddress] = useState(initialAddress);
  const [businessPhone, setBusinessPhone] = useState(initialPhone);
  const [businessEmail, setBusinessEmail] = useState(initialEmail);
  const [businessType, setBusinessType] = useState(initialType);
  const [openProfessional, setOpenProfessional] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "");
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setBusinessPhone(formatted);
  };

  const handleSave = async () => {
    // Validation: Business name and phone are required
    if (!businessName.trim()) {
      toast({
        title: "Validation Error",
        description: "Business name is required",
        variant: "destructive"
      });
      return;
    }

    if (!businessPhone.trim()) {
      toast({
        title: "Validation Error",
        description: "Business phone is required",
        variant: "destructive"
      });
      return;
    }

    // Validate email format if provided
    if (businessEmail.trim() && !businessEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        businessName,
        businessAddress,
        businessPhone,
        businessEmail,
        businessType,
      });
      toast({
        title: "Success",
        description: "Business details updated successfully"
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update business details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Business Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Info Box */}
          <div className="bg-muted/50 rounded-lg p-4 flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              This business information gives Choopil context to handle your calls and was gathered 
              from the training sources you provided above. Refine it here as you see fit. Update or 
              add to it at anytime.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="businessName">Business Name <span className="text-destructive">*</span></Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your official business name</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="businessName"
                placeholder="Enter your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Popover open={openProfessional} onOpenChange={setOpenProfessional}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={openProfessional} className="w-full justify-between font-normal hover:bg-background data-[state=open]:bg-background">
                    <span className={!businessType ? "text-muted-foreground" : ""}>
                      {businessType || "Select business type"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search business type..." />
                    <CommandList>
                      <CommandEmpty>No business type found.</CommandEmpty>
                      <CommandGroup>
                        {professionals.map(professional => (
                          <CommandItem key={professional} value={professional} onSelect={() => {
                            setBusinessType(professional);
                            setOpenProfessional(false);
                          }}>
                            {professional}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  placeholder="123 Main Street, City, State, ZIP"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Business Primary Phone Number <span className="text-destructive">*</span></Label>
              <Input
                id="phone"
                placeholder="(000) 000-0000"
                value={businessPhone}
                onChange={handlePhoneChange}
                maxLength={14}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="email">Business Email</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Contact email for your business</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="email@business.com"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
