import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play } from "lucide-react";

const assistantNames = [
  "Emma",
  "James",
  "Sofia",
  "Alex",
  "Maya",
  "Lucas",
  "Olivia",
  "Noah",
  "Isabella",
  "Ethan",
  "Kate",
  "Michael",
  "Sarah",
  "Daniel",
  "Jessica",
];

const getRandomAssistantName = () => {
  return assistantNames[Math.floor(Math.random() * assistantNames.length)];
};

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
  "(415) 321-6543",
  "(415) 789-4321",
  "(415) 654-9870",
  "(415) 876-5432",
];

export default function AgentSettings() {
  const navigate = useNavigate();
  
  // Generate random name once on component mount
  const randomAssistantName = useMemo(() => getRandomAssistantName(), []);
  
  const [assistantName, setAssistantName] = useState(randomAssistantName);
  const [greeting, setGreeting] = useState(
    "You've reached [Business Name]. This call may be recorded for quality assurance. How can I help you today?"
  );
  const [collectInfo, setCollectInfo] = useState({
    fullName: true,
    phoneNumber: true,
    emailAddress: false,
  });
  
  // Phone number fields
  const [country, setCountry] = useState("us");
  const [areaCode, setAreaCode] = useState("415");
  const [selectedNumber, setSelectedNumber] = useState(availableNumbers[0]);

  const handleBack = () => {
    navigate("/onboarding/voice");
  };

  const handleNext = () => {
    navigate("/onboarding/success");
  };

  const handleSkip = () => {
    navigate("/onboarding/success");
  };

  const handleAreaCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setAreaCode(value);
  };

  const charCount = greeting.length;

  return (
    <OnboardingLayout
      currentStep={2}
      onBack={handleBack}
      onNext={handleNext}
      onSkip={handleSkip}
      nextLabel="Finish"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Core Personalization
          </h1>
          <p className="text-muted-foreground">Personalize your Assistant</p>
        </div>

        <div className="space-y-8">
          {/* Phone Number Selection */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">
                Pick a Choopil number
              </h3>
              <p className="text-sm text-muted-foreground">
                You can forward calls to this number later.{" "}
                <a href="#" className="text-primary hover:underline">
                  Learn how
                </a>
              </p>
            </div>

            <div className="space-y-4">
              <Label className="text-foreground">
                Select a country and area code
              </Label>

              <div className="flex gap-3">
                <div className="flex-[3] space-y-2">
                  <Label htmlFor="country" className="text-foreground text-sm">
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
                  <Label htmlFor="areaCode" className="text-foreground text-sm">
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

              <div className="space-y-2">
                <Label htmlFor="phoneNumberSelect" className="text-foreground text-sm">
                  Pick a number
                </Label>
                <Select value={selectedNumber} onValueChange={setSelectedNumber}>
                  <SelectTrigger id="phoneNumberSelect">
                    <SelectValue placeholder="Select a phone number" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {availableNumbers.map((number) => (
                      <SelectItem key={number} value={number}>
                        {number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Assistant Name */}
          <div className="space-y-2">
            <Label htmlFor="assistantName" className="text-foreground">
              Assistant name
            </Label>
            <Input
              id="assistantName"
              value={assistantName}
              onChange={(e) => setAssistantName(e.target.value)}
              placeholder="Assistant name"
            />
          </div>

          {/* Greeting */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="greeting" className="text-foreground">
                Greeting
              </Label>
              <p className="text-xs text-muted-foreground">{charCount}/280</p>
            </div>
            <Textarea
              id="greeting"
              value={greeting}
              onChange={(e) => {
                if (e.target.value.length <= 280) {
                  setGreeting(e.target.value);
                }
              }}
              className="min-h-[80px] resize-none"
              maxLength={280}
            />
            <Button 
              variant="outline" 
              className="w-full"
              type="button"
            >
              <Play className="h-4 w-4 mr-2" />
              Hear Assistant greeting
            </Button>
          </div>

          {/* Information gathering */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">
                Information gathering from caller
              </h3>
              <p className="text-sm text-muted-foreground">
                You can add or remove questions later
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="fullName"
                  checked={collectInfo.fullName}
                  onCheckedChange={(checked) =>
                    setCollectInfo({ ...collectInfo, fullName: checked === true })
                  }
                  className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="fullName"
                  className="text-sm font-normal text-foreground cursor-pointer"
                >
                  Full name
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="phoneNumberCheck"
                  checked={collectInfo.phoneNumber}
                  onCheckedChange={(checked) =>
                    setCollectInfo({ ...collectInfo, phoneNumber: checked === true })
                  }
                  className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="phoneNumberCheck"
                  className="text-sm font-normal text-foreground cursor-pointer"
                >
                  Phone number
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="emailAddress"
                  checked={collectInfo.emailAddress}
                  onCheckedChange={(checked) =>
                    setCollectInfo({ ...collectInfo, emailAddress: checked === true })
                  }
                  className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="emailAddress"
                  className="text-sm font-normal text-foreground cursor-pointer"
                >
                  Email address
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
