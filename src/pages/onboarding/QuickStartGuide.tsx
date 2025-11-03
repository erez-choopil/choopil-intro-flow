import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import TrainStep from "@/components/quickstart/TrainStep";
import TestStep from "@/components/quickstart/TestStep";
import LaunchStep from "@/components/quickstart/LaunchStep";
import SuccessModal from "@/components/quickstart/SuccessModal";

type Step = "train" | "test" | "launch";

export default function QuickStartGuide() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = (searchParams.get("step") || "test") as Step;
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const steps = [
    { id: "train" as Step, label: "Train", number: 1 },
    { id: "test" as Step, label: "Test", number: 2 },
    { id: "launch" as Step, label: "Launch", number: 3 },
  ];

  const handleStepChange = (step: Step) => {
    // Prevent jumping from train to launch (step 1 to step 3)
    if (currentStep === "train" && step === "launch") {
      return;
    }
    setSearchParams({ step });
  };

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setShowSuccessModal(true);
  };

  const isStepComplete = (stepId: Step) => {
    if (stepId === "train") return currentStep !== "train";
    if (stepId === "test") return currentStep === "launch";
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Step Navigation */}
      <div className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <div className="flex items-center justify-center gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => handleStepChange(step.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : isStepComplete(step.id)
                      ? "bg-success/10 text-success"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  disabled={currentStep === "train" && step.id === "launch"}
                >
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-semibold ${
                      currentStep === step.id
                        ? "bg-primary-foreground text-primary"
                        : isStepComplete(step.id)
                        ? "bg-success text-success-foreground"
                        : "bg-background text-foreground"
                    }`}
                  >
                    {isStepComplete(step.id) ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="text-sm font-medium">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className="w-8 h-0.5 bg-border mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {currentStep === "train" && (
          <TrainStep onContinue={() => handleStepChange("test")} />
        )}
        {currentStep === "test" && (
          <TestStep onExplorePlans={() => handleStepChange("launch")} />
        )}
        {currentStep === "launch" && (
          <LaunchStep onSelectPlan={handlePlanSelect} />
        )}
      </div>

      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        planName={selectedPlan?.name || ""}
      />
    </div>
  );
}
