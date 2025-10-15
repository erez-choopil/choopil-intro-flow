import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const voices = [
  { value: "cassidy", label: "Cassidy", gender: "Female" },
  { value: "matilda", label: "Matilda", gender: "Female" },
  { value: "jessica", label: "Jessica", gender: "Female" },
  { value: "adeline", label: "Adeline", gender: "Female" },
  { value: "jeff", label: "Jeff", gender: "Male" },
  { value: "eric", label: "Eric", gender: "Male" },
  { value: "chris", label: "Chris", gender: "Male" },
  { value: "adam", label: "Adam", gender: "Male" },
];

const femaleNames = ["Emma", "Sofia", "Maya", "Olivia", "Isabella", "Kate", "Sarah", "Jessica"];
const maleNames = ["James", "Alex", "Lucas", "Noah", "Ethan", "Michael", "Daniel"];

const getDefaultAssistantName = (voiceGender: string) => {
  const names = voiceGender === "Female" ? femaleNames : maleNames;
  return names[0];
};

export default function VoiceSelection() {
  const navigate = useNavigate();
  const defaultVoice = voices[0];
  const [voice, setVoice] = useState(defaultVoice.value);
  const [assistantName, setAssistantName] = useState(getDefaultAssistantName(defaultVoice.gender));
  const [greeting, setGreeting] = useState(
    "You've reached [Business Name]. This call may be recorded for quality assurance. How can I help you today?"
  );
  const [collectInfo, setCollectInfo] = useState({
    fullName: true,
    phoneNumber: true,
    emailAddress: false,
  });
  const [includeLegalDisclaimer, setIncludeLegalDisclaimer] = useState(true);

  const handleBack = () => {
    navigate("/onboarding/business");
  };

  const handleNext = () => {
    if (voice && assistantName) {
      navigate("/onboarding/faq");
    }
  };

  const handleSkip = () => {
    navigate("/onboarding/faq");
  };

  const getVoiceLabel = (voiceValue: string) => {
    const selectedVoice = voices.find((v) => v.value === voiceValue);
    if (selectedVoice) {
      return `${selectedVoice.label} (${selectedVoice.gender})`;
    }
    return "";
  };

  const charCount = greeting.length;

  return (
    <OnboardingLayout
      currentStep={1}
      onBack={handleBack}
      onNext={handleNext}
      onSkip={handleSkip}
      nextDisabled={!voice || !assistantName}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Personalize your assistant
          </h1>
          <p className="text-muted-foreground">
            English only for now • Don't worry, you can tweak this anytime
          </p>
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

          {/* Voice Selection */}
          <div className="space-y-2">
            <Label htmlFor="voice" className="text-foreground">
              Assistant voice
            </Label>
            <div className="flex gap-2">
              <Select value={voice} onValueChange={setVoice}>
                <SelectTrigger id="voice" className="flex-1">
                  <SelectValue placeholder="Select a voice">
                    {voice && getVoiceLabel(voice)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-popover max-h-[400px]">
                  {voices.map((v) => (
                    <SelectItem
                      key={v.value}
                      value={v.value}
                    >
                      {v.label} ({v.gender})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                disabled={!voice}
                className="shrink-0"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
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
            <div className="flex items-center space-x-3">
              <Checkbox
                id="legalDisclaimer"
                checked={includeLegalDisclaimer}
                onCheckedChange={(checked) => setIncludeLegalDisclaimer(checked === true)}
                className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="legalDisclaimer"
                className="text-sm font-normal text-foreground cursor-pointer"
              >
                Include a legal disclaimer
              </Label>
            </div>
          </div>

          {/* Preview Button */}
          <div>
            <Button 
              variant="outline" 
              className="w-full"
              type="button"
            >
              <Play className="h-4 w-4 mr-2" />
              Hear Assistant greeting
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
