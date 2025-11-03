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
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => handleStepChange(step.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : isStepComplete(step.id)
                      ? "bg-success/10 text-success"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold ${
                      currentStep === step.id
                        ? "bg-primary-foreground text-primary"
                        : isStepComplete(step.id)
                        ? "bg-success text-success-foreground"
                        : "bg-background text-foreground"
                    }`}
                  >
                    {isStepComplete(step.id) ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="font-semibold">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className="w-12 h-0.5 bg-border mx-2" />
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
