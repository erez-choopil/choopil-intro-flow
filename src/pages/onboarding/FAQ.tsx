import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
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

export default function FAQ() {
  const navigate = useNavigate();
  const location = useLocation();
  const businessType = location.state?.businessType || "Other";
  const preFillFAQs = getBusinessSpecificFAQs(businessType);
  const [collectInfo, setCollectInfo] = useState({
    fullName: true,
    phoneNumber: true,
    emailAddress: false
  });
  const [selectedFAQs, setSelectedFAQs] = useState<Record<number, {
    selected: boolean;
    answer: string;
  }>>({
    0: {
      selected: false,
      answer: preFillFAQs[0].defaultAnswer
    },
    1: {
      selected: false,
      answer: preFillFAQs[1].defaultAnswer
    }
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
  return <OnboardingLayout currentStep={2} onBack={handleBack} onNext={handleNext} nextLabel="Complete Setup" showSkip={false}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Additional Settings
          </h1>
          <p className="text-muted-foreground">
            Configure additional options for your AI assistant (optional).
          </p>
        </div>

        <div className="text-center py-12">
          <p className="text-muted-foreground">
            All basic settings are complete. Click next to finish setup.
          </p>
        </div>
      </div>
    </OnboardingLayout>;
}