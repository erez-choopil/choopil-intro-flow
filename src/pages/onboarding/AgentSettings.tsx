import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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

  const handleBack = () => {
    navigate("/onboarding/voice");
  };

  const handleNext = () => {
    navigate("/onboarding/phone-number");
  };

  const handleSkip = () => {
    navigate("/onboarding/phone-number");
  };

  const charCount = greeting.length;

  return (
    <OnboardingLayout
      currentStep={2}
      onBack={handleBack}
      onNext={handleNext}
      onSkip={handleSkip}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Core Personalization
          </h1>
          <p className="text-muted-foreground">Personalize your Assistant</p>
        </div>

        <div className="space-y-8">
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
                  id="phoneNumber"
                  checked={collectInfo.phoneNumber}
                  onCheckedChange={(checked) =>
                    setCollectInfo({ ...collectInfo, phoneNumber: checked === true })
                  }
                  className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="phoneNumber"
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
