import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingModal } from "@/components/calls/PricingModal";
import { useState } from "react";

export function DashboardTrialBanner() {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  return (
    <>
      <div className="bg-primary text-primary-foreground px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">
              Kickstart your new AI agent - Start your 7-day free trial
            </span>
          </div>
          <Button
            onClick={() => setIsPricingModalOpen(true)}
            variant="secondary"
            className="flex-shrink-0"
          >
            Start Free Trial
          </Button>
        </div>
      </div>
      
      <PricingModal open={isPricingModalOpen} onOpenChange={setIsPricingModalOpen} />
    </>
  );
}
