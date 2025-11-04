import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PricingCards } from "@/components/pricing/PricingCards";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { useState } from "react";

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PricingModal({ open, onOpenChange }: PricingModalProps) {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    annualPrice: string;
  } | null>(null);
  const [isAnnual, setIsAnnual] = useState(true);

  const handleSelectPlan = (
    plan: {
      name: string;
      price: string;
      annualPrice: string;
    },
    annual: boolean
  ) => {
    setSelectedPlan(plan);
    setIsAnnual(annual);
    setCheckoutModalOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Pricing Plans</DialogTitle>
          </DialogHeader>
          <PricingCards onSelectPlan={handleSelectPlan} />
        </DialogContent>
      </Dialog>
      
      {selectedPlan && (
        <CheckoutModal
          open={checkoutModalOpen}
          onOpenChange={setCheckoutModalOpen}
          planDetails={selectedPlan}
          isAnnual={isAnnual}
        />
      )}
    </>
  );
}
