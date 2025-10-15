import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Calendar, HelpCircle, PhoneForwarded, MessageCircle, ShieldOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OnboardingWithDashboard } from "@/components/onboarding/OnboardingWithDashboard";

const capabilities = [
  {
    icon: MessageSquare,
    title: "Take a message",
    description: "Collect caller info and send it to your inbox",
  },
  {
    icon: Calendar,
    title: "Book appointments",
    description: "Share a scheduling link or connect your calendar",
  },
  {
    icon: HelpCircle,
    title: "Answer questions",
    description: "Train your receptionist to respond to FAQs",
  },
  {
    icon: PhoneForwarded,
    title: "Transfer calls",
    description: "Route calls to the right person or department",
  },
  {
    icon: MessageCircle,
    title: "Send texts",
    description: "Text callers with links, directions, or follow-up info",
  },
  {
    icon: ShieldOff,
    title: "Block spam calls",
    description: "Automatically hang up on spam and sales calls",
  },
  {
    icon: Zap,
    title: "Connect your tools",
    description: "Send call data to other apps via Zapier",
  },
];

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear onboarding data from localStorage
    localStorage.removeItem("onboarding_business");
    localStorage.removeItem("onboarding_voice");
    localStorage.removeItem("onboarding_customize");
  }, []);

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <OnboardingWithDashboard>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-4xl mx-4 bg-background rounded-2xl shadow-2xl p-6 md:p-12 max-h-[90vh] overflow-y-auto">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary">
              You're all set!
            </h1>
            <p className="text-xl text-muted-foreground">
              Here's what your assistant can do for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((capability, index) => (
              <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                      <capability.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {capability.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-[#10b981] hover:bg-[#10b981]/90 text-white py-6 text-lg font-medium"
          >
            ✨ Let's go!
          </Button>
        </div>
      </div>
    </div>
    </OnboardingWithDashboard>
  );
}
