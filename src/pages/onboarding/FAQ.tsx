import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

const callerInfoOptions = [
  { id: "fullName", label: "Full name" },
  { id: "phoneNumber", label: "Phone number" },
  { id: "emailAddress", label: "Email address" },
];

const preFillFAQs = [
  { 
    question: "What are your business hours?",
    defaultAnswer: "We're open Monday to Friday, 9 AM to 5 PM."
  },
  { 
    question: "How can clients reach you?",
    defaultAnswer: "You can reach us by phone, email, or through our website contact form."
  },
];

export default function FAQ() {
  const navigate = useNavigate();
  const [collectInfo, setCollectInfo] = useState({
    fullName: true,
    phoneNumber: true,
    emailAddress: false,
  });
  const [selectedFAQs, setSelectedFAQs] = useState<Record<number, { selected: boolean; answer: string }>>({
    0: { selected: false, answer: preFillFAQs[0].defaultAnswer },
    1: { selected: false, answer: preFillFAQs[1].defaultAnswer },
  });
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

  const toggleFAQ = (index: number) => {
    setSelectedFAQs(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        selected: !prev[index].selected
      }
    }));
  };

  const updateAnswer = (index: number, answer: string) => {
    setSelectedFAQs(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        answer
      }
    }));
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
            Configure Your Assistant
          </h1>
          <p className="text-muted-foreground">
            Set up what information to collect and common questions to answer.
          </p>
        </div>

        <div className="space-y-8">
          {/* Information to collect from callers */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">
                What should your assistant ask callers?
              </h3>
              <p className="text-sm text-muted-foreground">
                You can change these anytime
              </p>
            </div>

            <div className="space-y-4">
              {callerInfoOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={collectInfo[option.id as keyof typeof collectInfo]}
                    onCheckedChange={(checked) =>
                      setCollectInfo({ ...collectInfo, [option.id]: checked === true })
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

          {/* Common FAQs with answers */}
          <div className="space-y-4">
            <Label className="text-foreground text-base font-medium">
              Common questions clients ask
            </Label>
            <div className="space-y-4">
              {preFillFAQs.map((faq, index) => (
                <div key={index} className="space-y-3 p-4 rounded-lg border border-border">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={`faq-${index}`}
                      checked={selectedFAQs[index]?.selected}
                      onCheckedChange={() => toggleFAQ(index)}
                      className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
                    />
                    <label
                      htmlFor={`faq-${index}`}
                      className="text-sm font-medium text-foreground cursor-pointer flex-1"
                    >
                      {faq.question}
                    </label>
                  </div>
                  {selectedFAQs[index]?.selected && (
                    <div className="ml-7 space-y-2">
                      <Label htmlFor={`answer-${index}`} className="text-xs text-muted-foreground">
                        Answer
                      </Label>
                      <Textarea
                        id={`answer-${index}`}
                        value={selectedFAQs[index]?.answer || ""}
                        onChange={(e) => updateAnswer(index, e.target.value)}
                        placeholder="Enter your answer..."
                        className="min-h-[80px]"
                      />
                    </div>
                  )}
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
