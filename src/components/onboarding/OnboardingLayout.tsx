import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showSkip?: boolean;
  onSkip?: () => void;
}
const steps = [{
  label: "Business Information",
  path: "/onboarding/business"
}, {
  label: "AI Assistant Settings",
  path: "/onboarding/voice"
}, {
  label: "Sign up & Launch",
  path: "/onboarding/signup"
}];
export function OnboardingLayout({
  children,
  currentStep,
  onBack,
  onNext,
  nextLabel = "Next",
  nextDisabled = false,
  showSkip = false,
  onSkip
}: OnboardingLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      navigate(steps[stepIndex].path);
    }
  };
  const progressPercentage = (currentStep + 1) / steps.length * 100;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Modal Container */}
      <div className="w-full max-w-[680px] mx-4 bg-background rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Progress Bar - Desktop */}
        <div className="sticky top-0 z-10 bg-background border-b border-border rounded-t-2xl">
          <div className="hidden md:block">
            <div className="h-[72px] px-6 flex items-center justify-between">
              {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                const isFuture = index > currentStep;
                return (
                  <button
                    key={step.label}
                    onClick={() => handleStepClick(index)}
                    disabled={isFuture}
                    className={`flex-1 text-center relative pb-4 transition-all ${
                      isActive
                        ? "text-primary font-bold cursor-default"
                        : isCompleted
                        ? "text-[#10b981] hover:text-[#10b981]/80 cursor-pointer"
                        : "text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    <span className="text-sm">{step.label}</span>
                    {/* Progress line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-muted">
                      {isCompleted && <div className="h-full bg-[#10b981]" />}
                      {isActive && <div className="h-full bg-[#10b981]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress Bar - Mobile */}
          <div className="md:hidden px-6 py-4">
            <div className="text-sm text-muted-foreground mb-2">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-[#10b981] transition-all duration-300"
                style={{
                  width: `${progressPercentage}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 md:px-10 py-8 md:py-12">
          {children}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 gap-4">
            <div className="flex gap-3">
              {onBack && (
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-muted-foreground hover:text-foreground justify-start pl-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              {showSkip && onSkip && (
                <Button
                  variant="ghost"
                  onClick={onSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip
                </Button>
              )}
            </div>

            {onNext && (
              <Button
                onClick={onNext}
                disabled={nextDisabled}
                className="min-w-[100px] bg-[#10b981] hover:bg-[#10b981]/90 text-white"
              >
                {nextLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}