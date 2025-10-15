import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const countries = [
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "au", label: "Australia", flag: "🇦🇺" },
];

const availableNumbers = [
  "(415) 413-5501",
  "(415) 890-2324",
  "(415) 234-5678",
  "(415) 567-8901",
];

export default function PhoneNumber() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("us");
  const [areaCode, setAreaCode] = useState("415");
  const [selectedNumber, setSelectedNumber] = useState(availableNumbers[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleBack = () => {
    navigate("/onboarding/agent-settings");
  };

  const handleFinish = () => {
    if (selectedNumber) {
      navigate("/onboarding/success");
    }
  };

  const handleSkip = () => {
    navigate("/onboarding/success");
  };

  const handleAreaCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setAreaCode(value);
  };

  return (
    <OnboardingLayout
      currentStep={3}
      onBack={handleBack}
      onNext={handleFinish}
      onSkip={handleSkip}
      nextLabel="Finish"
      nextDisabled={!selectedNumber}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Pick a number
          </h1>
          <p className="text-muted-foreground">
            You can forward calls to this number later.{" "}
            <a href="#" className="text-primary hover:underline">
              Learn how
            </a>
          </p>
        </div>

        <div className="space-y-6">
          {/* Country & Area Code */}
          <div className="space-y-4">
            <Label className="text-foreground text-base font-medium">
              Select a country and area code
            </Label>

            <div className="flex gap-3">
              <div className="flex-[3] space-y-2">
                <Label htmlFor="country" className="text-foreground">
                  Country
                </Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {countries.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.flag} {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-[2] space-y-2">
                <Label htmlFor="areaCode" className="text-foreground">
                  Area code
                </Label>
                <Input
                  id="areaCode"
                  type="text"
                  placeholder="415"
                  value={areaCode}
                  onChange={handleAreaCodeChange}
                  maxLength={3}
                />
              </div>
            </div>
          </div>

          {/* Pick a Number */}
          <div className="space-y-4">
            <Label className="text-foreground text-base font-medium">
              Pick a number
            </Label>

            <RadioGroup value={selectedNumber} onValueChange={setSelectedNumber}>
              {availableNumbers.map((number) => (
                <div key={number} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={number}
                    id={number}
                    className="h-5 w-5 data-[state=checked]:border-primary data-[state=checked]:text-primary"
                  />
                  <Label
                    htmlFor={number}
                    className="text-sm font-normal text-foreground cursor-pointer"
                  >
                    {number}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="text-primary hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              <span className="text-foreground font-medium">{currentPage}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="text-primary hover:underline flex items-center gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
