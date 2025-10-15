import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Label } from "@/components/ui/label";
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

export default function VoiceSelection() {
  const navigate = useNavigate();
  const [voice, setVoice] = useState("cassidy");

  const handleBack = () => {
    navigate("/onboarding/business");
  };

  const handleNext = () => {
    if (voice) {
      navigate("/onboarding/agent-settings");
    }
  };

  const handleSkip = () => {
    navigate("/onboarding/agent-settings");
  };

  const getVoiceLabel = (voiceValue: string) => {
    const selectedVoice = voices.find((v) => v.value === voiceValue);
    if (selectedVoice) {
      return `${selectedVoice.label} (${selectedVoice.gender})`;
    }
    return "";
  };

  return (
    <OnboardingLayout
      currentStep={1}
      onBack={handleBack}
      onNext={handleNext}
      onSkip={handleSkip}
      nextDisabled={!voice}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Select a voice for your agent
          </h1>
          <p className="text-muted-foreground">
            English only • You can always change this later
          </p>
        </div>

        <div className="space-y-6">
          {/* Voice Selection */}
          <div className="space-y-2">
            <Label htmlFor="voice" className="text-foreground">
              Voice
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
        </div>
      </div>
    </OnboardingLayout>
  );
}
