import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

const preFillFAQs = [
  "What are your business hours?",
  "How can I schedule an appointment?",
  "What payment methods do you accept?",
];

export default function FAQ() {
  const navigate = useNavigate();
  const [selectedPreFilled, setSelectedPreFilled] = useState<string[]>([]);
  const [customFAQs, setCustomFAQs] = useState<string[]>([]);
  const [newFAQ, setNewFAQ] = useState("");

  const handleBack = () => {
    navigate("/onboarding/voice");
  };

  const handleNext = () => {
    navigate("/onboarding/success");
  };

  const handleSkip = () => {
    navigate("/onboarding/success");
  };

  const togglePreFilled = (faq: string) => {
    setSelectedPreFilled(prev =>
      prev.includes(faq)
        ? prev.filter(f => f !== faq)
        : [...prev, faq]
    );
  };

  const addCustomFAQ = () => {
    if (newFAQ.trim()) {
      setCustomFAQs(prev => [...prev, newFAQ.trim()]);
      setNewFAQ("");
    }
  };

  const removeCustomFAQ = (index: number) => {
    setCustomFAQs(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomFAQ();
    }
  };

  return (
    <OnboardingLayout
      currentStep={2}
      onBack={handleBack}
      onNext={handleNext}
      onSkip={handleSkip}
      nextLabel="Next"
      showSkip={true}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Common Questions
          </h1>
          <p className="text-muted-foreground">
            Help your AI assistant answer frequently asked questions.
          </p>
        </div>

        <div className="space-y-6">
          {/* Pre-filled FAQs */}
          <div className="space-y-4">
            <Label className="text-foreground text-base font-medium">
              Select common questions
            </Label>
            <div className="space-y-3">
              {preFillFAQs.map((faq) => (
                <div key={faq} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <Checkbox
                    id={faq}
                    checked={selectedPreFilled.includes(faq)}
                    onCheckedChange={() => togglePreFilled(faq)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor={faq}
                    className="text-sm text-foreground cursor-pointer flex-1"
                  >
                    {faq}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Custom FAQs */}
          <div className="space-y-4">
            <Label className="text-foreground text-base font-medium">
              Add your own questions
            </Label>
            
            <div className="flex gap-2">
              <Input
                placeholder="Enter a question..."
                value={newFAQ}
                onChange={(e) => setNewFAQ(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addCustomFAQ}
                size="icon"
                disabled={!newFAQ.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {customFAQs.length > 0 && (
              <div className="space-y-2">
                {customFAQs.map((faq, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-accent/30"
                  >
                    <span className="text-sm text-foreground">{faq}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCustomFAQ(index)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
