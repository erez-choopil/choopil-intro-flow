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
import { Check, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const languages = [
  { value: "english", label: "English" },
  { value: "portuguese", label: "Portuguese" },
  { value: "spanish", label: "Spanish" },
];

const recommendedVoices = [
  { value: "cassidy", label: "Cassidy", gender: "Female" },
  { value: "matilda", label: "Matilda", gender: "Female" },
  { value: "jessica", label: "Jessica", gender: "Female" },
  { value: "adeline", label: "Adeline", gender: "Female" },
  { value: "ana", label: "Ana", gender: "Female" },
  { value: "jeff", label: "Jeff", gender: "Male" },
  { value: "jamahal", label: "Jamahal", gender: "Male" },
  { value: "eric", label: "Eric", gender: "Male" },
  { value: "chris", label: "Chris", gender: "Male" },
  { value: "adam", label: "Adam", gender: "Male" },
];

const moreVoices = [
  { value: "tiffany", label: "Tiffany", gender: "Female" },
  { value: "lilly-wolf", label: "Lilly Wolf", gender: "Female" },
  { value: "hope", label: "Hope", gender: "Female" },
  { value: "arabella", label: "Arabella", gender: "Female" },
  { value: "alexandra", label: "Alexandra", gender: "Female" },
  { value: "allison", label: "Allison", gender: "Female" },
];

export default function VoiceSelection() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("english");
  const [voice, setVoice] = useState("");

  const handleBack = () => {
    navigate("/onboarding/business");
  };

  const handleNext = () => {
    if (voice) {
      navigate("/onboarding/settings");
    }
  };

  const getVoiceLabel = (voiceValue: string) => {
    const allVoices = [...recommendedVoices, ...moreVoices];
    const selectedVoice = allVoices.find((v) => v.value === voiceValue);
    if (selectedVoice) {
      return `${selectedVoice.label} from Australia (${selectedVoice.gender})`;
    }
    return "";
  };

  return (
    <OnboardingLayout
      currentStep={1}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!voice}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Select a voice for your agent
          </h1>
          <p className="text-muted-foreground">
            You can always change this later
          </p>
        </div>

        <div className="space-y-6">
          {/* Language Selection */}
          <div className="space-y-2">
            <Label htmlFor="language" className="text-foreground">
              Agent's primary language
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {languages.map((lang) => (
                  <SelectItem
                    key={lang.value}
                    value={lang.value}
                    className="data-[state=checked]:bg-[#e0f2fe]"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{lang.label}</span>
                      {language === lang.value && (
                        <Check className="h-4 w-4 text-success ml-2" />
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
                  <SelectGroup>
                    <SelectLabel className="text-xs uppercase text-secondary px-2 py-1.5">
                      Recommended
                    </SelectLabel>
                    {recommendedVoices.map((v) => (
                      <SelectItem
                        key={v.value}
                        value={v.value}
                        className="hover:bg-muted"
                      >
                        {v.label} ({v.gender})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel className="text-xs uppercase text-secondary px-2 py-1.5 mt-2">
                      More voices
                    </SelectLabel>
                    {moreVoices.map((v) => (
                      <SelectItem
                        key={v.value}
                        value={v.value}
                        className="hover:bg-muted"
                      >
                        {v.label} ({v.gender})
                      </SelectItem>
                    ))}
                  </SelectGroup>
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
