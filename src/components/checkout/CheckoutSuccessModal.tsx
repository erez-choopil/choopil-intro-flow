import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, Calendar, BookOpen, Settings, Copy } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CheckoutSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  isAnnual: boolean;
}

export default function CheckoutSuccessModal({ 
  open, 
  onOpenChange, 
  planName,
  isAnnual 
}: CheckoutSuccessModalProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [phoneNumber] = useState("(555) 123-4567");

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    toast({
      title: "Copied!",
      description: "Phone number copied to clipboard",
    });
  };

  const handleGetStarted = () => {
    navigate("/dashboard/quick-start");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px] p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Celebration Icon */}
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">You're all set!</h2>
            <p className="text-muted-foreground">
              {planName} • Billed {isAnnual ? "annually" : "monthly"}
            </p>
          </div>

          {/* Phone Number */}
          <div className="w-full bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">Your new number</p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-2xl font-semibold text-foreground">{phoneNumber}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyPhone}
                className="shrink-0"
              >
                <Copy className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="w-full space-y-3">
            <h3 className="text-sm font-semibold text-foreground text-left">Next Steps</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 text-left">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  Forward your calls to your new number
                </div>
              </div>
              <div className="flex items-start gap-3 text-left">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  Train your AI with your business info
                </div>
              </div>
              <div className="flex items-start gap-3 text-left">
                <Settings className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  Customize your agent's responses
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleGetStarted}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            Let's Go
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
