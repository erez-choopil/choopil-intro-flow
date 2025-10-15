import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { OnboardingWithDashboard } from "@/components/onboarding/OnboardingWithDashboard";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
const callerInfoOptions = [{
  id: "fullName",
  label: "Full name (Recommended)"
}, {
  id: "phoneNumber",
  label: "Phone number (Recommended)"
}, {
  id: "emailAddress",
  label: "Email address"
}];
const getBusinessSpecificFAQs = (businessType: string) => {
  const faqMap: Record<string, Array<{ question: string; defaultAnswer: string }>> = {
    "Accountant": [
      { question: "What type of accounting services do you need?", defaultAnswer: "I can help with tax preparation, bookkeeping, financial planning, or general accounting inquiries." },
      { question: "Are you an individual or business client?", defaultAnswer: "This helps me direct you to the right specialist for your needs." }
    ],
    "Dentist": [
      { question: "Is this for a routine checkup or a specific concern?", defaultAnswer: "I can help schedule cleanings, checkups, or address dental emergencies." },
      { question: "Do you have dental insurance?", defaultAnswer: "This helps us prepare your paperwork and verify coverage in advance." }
    ],
    "Doctor": [
      { question: "What is the reason for your visit?", defaultAnswer: "I can help schedule appointments for checkups, specific symptoms, or follow-up care." },
      { question: "Is this urgent or can it wait for a regular appointment?", defaultAnswer: "This helps us prioritize scheduling and ensure you get timely care." }
    ],
    "Lawyer": [
      { question: "What type of legal assistance do you need?", defaultAnswer: "I can help with consultations for family law, business law, estate planning, or other legal matters." },
      { question: "Have you worked with our firm before?", defaultAnswer: "This helps us access your case history and better assist you." }
    ],
    "Real Estate Agent": [
      { question: "Are you looking to buy or sell property?", defaultAnswer: "I can connect you with the right agent and provide relevant market information." },
      { question: "What is your preferred location or neighborhood?", defaultAnswer: "This helps us match you with agents who specialize in your area of interest." }
    ],
    "Restaurant": [
      { question: "How many guests will be dining?", defaultAnswer: "This helps us arrange the perfect table for your party." },
      { question: "Do you have any dietary restrictions or special requests?", defaultAnswer: "We want to ensure we can accommodate all your needs for a great dining experience." }
    ],
    "Salon/Spa": [
      { question: "What service are you interested in?", defaultAnswer: "I can help book haircuts, styling, coloring, spa treatments, or other services." },
      { question: "Do you have a preferred stylist or therapist?", defaultAnswer: "This helps us check their availability and schedule you accordingly." }
    ],
    "Veterinarian": [
      { question: "What type of pet do you have?", defaultAnswer: "This helps us prepare for your visit and ensure we have the right expertise available." },
      { question: "Is this for a routine checkup or an urgent concern?", defaultAnswer: "We prioritize emergencies and can schedule regular appointments accordingly." }
    ],
    "Other": [
      { question: "What is the nature of your inquiry?", defaultAnswer: "I can help with appointments, general questions, or connect you with the right person." },
      { question: "How did you hear about us?", defaultAnswer: "This helps us understand how clients find us and improve our outreach." }
    ]
  };

  return faqMap[businessType] || faqMap["Other"];
};

export default function Customize() {
  const navigate = useNavigate();
  const location = useLocation();
  const businessType = location.state?.businessType || "Other";
  const preFillFAQs = getBusinessSpecificFAQs(businessType);
  
  // Load from localStorage on mount
  const [collectInfo, setCollectInfo] = useState(() => {
    const saved = localStorage.getItem("onboarding_customize");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.collectInfo || {
          fullName: true,
          phoneNumber: true,
          emailAddress: false
        };
      } catch (e) {
        console.error("Failed to parse saved customize data", e);
      }
    }
    return {
      fullName: true,
      phoneNumber: true,
      emailAddress: false
    };
  });
  
  const [selectedFAQs, setSelectedFAQs] = useState<Record<number, {
    selected: boolean;
    answer: string;
  }>>(() => {
    const saved = localStorage.getItem("onboarding_customize");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.selectedFAQs || {
          0: {
            selected: false,
            answer: preFillFAQs[0].defaultAnswer
          },
          1: {
            selected: false,
            answer: preFillFAQs[1].defaultAnswer
          }
        };
      } catch (e) {
        console.error("Failed to parse saved customize data", e);
      }
    }
    return {
      0: {
        selected: false,
        answer: preFillFAQs[0].defaultAnswer
      },
      1: {
        selected: false,
        answer: preFillFAQs[1].defaultAnswer
      }
    };
  });
  
  const [customFAQs, setCustomFAQs] = useState<string[]>(() => {
    const saved = localStorage.getItem("onboarding_customize");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.customFAQs || [];
      } catch (e) {
        console.error("Failed to parse saved customize data", e);
      }
    }
    return [];
  });
  
  const [newFAQ, setNewFAQ] = useState("");
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    const customizeData = {
      collectInfo,
      selectedFAQs,
      customFAQs,
    };
    localStorage.setItem("onboarding_customize", JSON.stringify(customizeData));
  }, [collectInfo, selectedFAQs, customFAQs]);
  const handleBack = () => {
    navigate("/onboarding/voice");
  };
  const handleNext = () => {
    navigate("/onboarding/signup");
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
    <OnboardingWithDashboard>
      <OnboardingLayout currentStep={2} onBack={handleBack} onNext={handleNext} nextLabel="Next" showSkip={false}>
        <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Customize Assistant
          </h1>
          <p className="text-muted-foreground">
            Set up what information to collect and common questions to answer.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Configured for: <span className="font-medium">{businessType}</span>
          </p>
        </div>

        <div className="space-y-8">
          {/* Information to collect from callers */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">
                What should your assistant ask callers?
              </h3>
              
            </div>

            <div className="space-y-4">
              {callerInfoOptions.map(option => <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox id={option.id} checked={collectInfo[option.id as keyof typeof collectInfo]} onCheckedChange={checked => setCollectInfo({
                ...collectInfo,
                [option.id]: checked === true
              })} className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                  <Label htmlFor={option.id} className="text-sm font-normal text-foreground cursor-pointer">
                    {option.label}
                  </Label>
                </div>)}
            </div>
          </div>

          {/* Common FAQs with answers */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">
                Questions your assistant will ask <span className="text-muted-foreground">(optional)</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Select questions you'd like your assistant to ask callers
              </p>
            </div>
            <div className="space-y-4">
              {preFillFAQs.map((faq, index) => <div key={index} className="space-y-3 p-4 rounded-lg border border-border">
                  <div className="flex items-start space-x-3">
                    <Checkbox id={`faq-${index}`} checked={selectedFAQs[index]?.selected} onCheckedChange={() => toggleFAQ(index)} className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5" />
                    <label htmlFor={`faq-${index}`} className="text-sm font-medium text-foreground cursor-pointer flex-1">
                      {faq.question}
                    </label>
                  </div>
                  {selectedFAQs[index]?.selected && <div className="ml-7 space-y-2">
                      <Label htmlFor={`answer-${index}`} className="text-xs text-muted-foreground">
                        Answer
                      </Label>
                      <Textarea id={`answer-${index}`} value={selectedFAQs[index]?.answer || ""} onChange={e => updateAnswer(index, e.target.value)} placeholder="Enter your answer..." className="min-h-[80px]" />
                    </div>}
                </div>)}
            </div>
          </div>

          {/* Custom FAQs */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">
                Custom questions <span className="text-muted-foreground">(optional)</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Add any additional questions specific to your business
              </p>
            </div>
            
            <div className="flex gap-2">
              <Input placeholder="Enter a question..." value={newFAQ} onChange={e => setNewFAQ(e.target.value)} onKeyPress={handleKeyPress} className="flex-1" />
              <Button type="button" onClick={addCustomFAQ} size="icon" disabled={!newFAQ.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {customFAQs.length > 0 && <div className="space-y-2">
                {customFAQs.map((faq, index) => <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border bg-accent/30">
                    <span className="text-sm text-foreground">{faq}</span>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeCustomFAQ(index)} className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>)}
              </div>}
          </div>
        </div>
      </div>
      </OnboardingLayout>
    </OnboardingWithDashboard>
  );
}