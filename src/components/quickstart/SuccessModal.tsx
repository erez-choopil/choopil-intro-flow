import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
}

const nextSteps = [
  {
    number: 1,
    title: "View Forwarding Instructions",
    description: "Set up call forwarding from your existing number or start using your new Choopil number.",
    link: "/dashboard/agent-settings",
    linkText: "Go to Agent Settings",
  },
  {
    number: 2,
    title: "Add Business Context",
    description: "Provide additional information about your business to help your AI agent answer questions more accurately.",
    link: "/dashboard/quick-start?step=train",
    linkText: "Go to Business Knowledge",
  },
  {
    number: 3,
    title: "Monitor Your Calls",
    description: "View call history, listen to recordings, and track how your AI agent is performing.",
    link: "/dashboard/calls",
    linkText: "Go to Calls Dashboard",
  },
];

export default function SuccessModal({ open, onOpenChange, planName }: SuccessModalProps) {
  const navigate = useNavigate();

  const handleCompleteSetup = () => {
    navigate("/dashboard/agent-settings");
    onOpenChange(false);
  };

  const handleDoLater = () => {
    navigate("/dashboard/calls");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6 py-4">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Congratulations! 🎉</h2>
            <p className="text-muted-foreground">
              You've selected the {planName} plan. Your AI receptionist is almost ready to start handling calls!
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-foreground mb-4">Next Steps to Complete Your Setup:</h3>
            
            <div className="space-y-4">
              {nextSteps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {step.number}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-primary"
                      onClick={() => {
                        navigate(step.link);
                        onOpenChange(false);
                      }}
                    >
                      {step.linkText}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleCompleteSetup} className="flex-1" size="lg">
              Complete Setup Now
            </Button>
            <Button onClick={handleDoLater} variant="outline" className="flex-1" size="lg">
              I'll Do This Later
            </Button>
          </div>

          <p className="text-sm text-center text-muted-foreground">
            You can access these settings anytime from the left sidebar
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
