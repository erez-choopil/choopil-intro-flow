import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TrialBanner() {
  const [isVisible, setIsVisible] = useState(true);

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
    // TODO: Implement trial start logic
    console.log("Start trial clicked");
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary to-secondary px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-[250px]">
          <div className="shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <p className="text-white text-base font-medium">
            Kickstart your new AI agent - Start your 7-day free trial
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleStartTrial}
            size="sm"
            className="bg-white text-primary hover:bg-white/90 font-semibold"
          >
            Start Free Trial
          </Button>
          
          <button
            onClick={handleDismiss}
            className="shrink-0 w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
