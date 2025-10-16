import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const location = useLocation();
  const businessType = location.state?.businessType;
  const defaultVoice = voices[0];
  const [voice, setVoice] = useState(defaultVoice.value);
  const [assistantName, setAssistantName] = useState(getDefaultAssistantName(defaultVoice.gender));
  const [greeting, setGreeting] = useState(
    `You've reached [Business Name]. This is ${getDefaultAssistantName(defaultVoice.gender)} speaking. This call may be recorded for quality assurance. How can I help you today?`
  );
  const [collectInfo, setCollectInfo] = useState({
    fullName: true,
    phoneNumber: true,
    emailAddress: false,
  });
  const [includeLegalDisclaimer, setIncludeLegalDisclaimer] = useState(true);

  const disclaimerText = "This call may be recorded for quality assurance. ";

  // Update greeting when assistant name changes
  useEffect(() => {
    const baseGreeting = `You've reached [Business Name]. This is ${assistantName} speaking. `;
    const hasDisclaimer = includeLegalDisclaimer;
    const endingText = "How can I help you today?";
    
    setGreeting(
      hasDisclaimer 
        ? baseGreeting + disclaimerText + endingText
        : baseGreeting + endingText
    );
  }, [assistantName]);

  // Update greeting when disclaimer checkbox changes
  useEffect(() => {
    if (includeLegalDisclaimer) {
      // Add disclaimer if not already present
      if (!greeting.includes(disclaimerText.trim())) {
        // Find a good position to insert (after assistant introduction)
        const speakingIndex = greeting.indexOf('speaking. ');
        if (speakingIndex !== -1) {
          const beforeDisclaimer = greeting.slice(0, speakingIndex + 10);
          const afterDisclaimer = greeting.slice(speakingIndex + 10);
          setGreeting(beforeDisclaimer + disclaimerText + afterDisclaimer);
        } else {
          setGreeting(greeting + " " + disclaimerText);
        }
      }
    } else {
      // Remove disclaimer if present
      setGreeting(greeting.replace(disclaimerText, ""));
    }
  }, [includeLegalDisclaimer]);

  const handleBack = () => {
    navigate("/onboarding/business");
  };

  const handleNext = () => {
    if (voice && assistantName) {
      navigate("/onboarding/faq", { state: { businessType } });
    }
  };

  const handleSkip = () => {
    navigate("/onboarding/faq", { state: { businessType } });
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
                className="text-sm font-normal text-foreground cursor-pointer flex items-center gap-1.5"
              >
                Include a legal disclaimer
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Informs callers that the conversation may be recorded for quality assurance and legal compliance purposes.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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

          {/* Information to collect from callers */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">
                What should your assistant ask callers?
              </h3>
            </div>

            <div className="space-y-4">
              {[
                { id: "fullName", label: "Full name (Recommended)" },
                { id: "phoneNumber", label: "Phone number (Recommended)" },
                { id: "emailAddress", label: "Email address" }
              ].map(option => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={collectInfo[option.id as keyof typeof collectInfo]}
                    onCheckedChange={(checked) =>
                      setCollectInfo({
                        ...collectInfo,
                        [option.id]: checked === true
                      })
                    }
                    className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor={option.id}
                    className="text-sm font-normal text-foreground cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
