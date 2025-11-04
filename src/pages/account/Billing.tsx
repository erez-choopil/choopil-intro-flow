import { PricingCards } from "@/components/pricing/PricingCards";
import { useNavigate } from "react-router-dom";
export default function Billing() {
  const navigate = useNavigate();
  const handleSelectPlan = (
    plan: {
      name: string;
      price: string;
      annualPrice: string;
    },
    isAnnual: boolean
  ) => {
    navigate("/dashboard/settings/checkout", {
      state: { ...plan, isAnnual }
    });
  };
  return <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto px-8 space-y-8 py-[24px]">
        <PricingCards onSelectPlan={handleSelectPlan} />
      </div>
    </div>;
}