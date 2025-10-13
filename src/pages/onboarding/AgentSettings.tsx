import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function AgentSettings() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState(
    "You've reached [Business Name]. How can I help you today?"
  );
  const [collectInfo, setCollectInfo] = useState({
    fullName: true,
    phoneNumber: true,
    emailAddress: false,
  });
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const handleBack = () => {
    navigate("/onboarding/voice");
  };

  const handleNext = () => {
    if (disclaimerAccepted) {
      navigate("/onboarding/phone");
    }
  };

  const charCount = greeting.length;

  return (
    <OnboardingLayout
      currentStep={2}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!disclaimerAccepted}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Final touches
          </h1>
          <p className="text-muted-foreground">Personalize your agent</p>
        </div>

        <div className="space-y-8">
          {/* Greeting */}
          <div className="space-y-2">
            <Label htmlFor="greeting" className="text-foreground">
              Greeting
            </Label>
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
            <div className="flex justify-end">
              <p className="text-sm text-muted-foreground">{charCount}/280</p>
            </div>
          </div>

          {/* Info to Collect */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">
                Info your agent will collect from callers
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
                  className="h-5 w-5 data-[state=checked]:bg-success data-[state=checked]:border-success"
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
                  className="h-5 w-5 data-[state=checked]:bg-success data-[state=checked]:border-success"
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
                  className="h-5 w-5 data-[state=checked]:bg-success data-[state=checked]:border-success"
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

          {/* Disclaimer */}
          <div className="flex items-start space-x-3 pt-4">
            <Checkbox
              id="disclaimer"
              checked={disclaimerAccepted}
              onCheckedChange={(checked) => setDisclaimerAccepted(checked === true)}
              className="h-5 w-5 mt-0.5 data-[state=checked]:bg-success data-[state=checked]:border-success"
            />
            <Label
              htmlFor="disclaimer"
              className="text-sm font-normal text-foreground leading-relaxed cursor-pointer"
            >
              I acknowledge and agree that calls are recorded. I am responsible for
              notifying callers, as may be required by law.
            </Label>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
