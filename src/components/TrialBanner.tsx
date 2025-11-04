import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingModal } from "@/components/calls/PricingModal";
export function TrialBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  useEffect(() => {
    const dismissed = localStorage.getItem("trial-banner-dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }
  }, []);
  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("trial-banner-dismissed", "true");
  };
  const handleStartTrial = () => {
    setIsPricingModalOpen(true);
  };
  if (!isVisible) return null;
  return (
    <>
      <div className="relative bg-gradient-to-r from-primary to-secondary px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1 min-w-[250px]">
            <Sparkles className="h-6 w-6 text-white shrink-0" />
            <p className="text-white text-base font-medium">
              Kickstart your new AI agent - Start your 7-day free trial
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button onClick={handleStartTrial} size="sm" className="bg-white text-primary hover:bg-white/90 font-semibold">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
      <PricingModal open={isPricingModalOpen} onOpenChange={setIsPricingModalOpen} />
    </>
  );
}