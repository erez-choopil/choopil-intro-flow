import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PricingCards } from "@/components/pricing/PricingCards";
import { useNavigate } from "react-router-dom";

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PricingModal({ open, onOpenChange }: PricingModalProps) {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: {
    name: string;
    price: string;
    annualPrice: string;
  }) => {
    navigate("/dashboard/settings/checkout", { state: plan });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Pricing Plans</DialogTitle>
        </DialogHeader>
        <PricingCards onSelectPlan={handleSelectPlan} />
      </DialogContent>
    </Dialog>
  );
}
