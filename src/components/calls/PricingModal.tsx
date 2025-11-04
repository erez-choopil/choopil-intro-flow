import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useState } from "react";

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PricingModal({ open, onOpenChange }: PricingModalProps) {
  const [annualBilling, setAnnualBilling] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: 49,
      annualPrice: 39,
      description: "Perfect for small teams",
      features: [
        "100 calls per month",
        "Basic analytics",
        "Email support",
        "24/7 AI receptionist",
      ],
    },
    {
      name: "Professional",
      price: 99,
      annualPrice: 79,
      description: "For growing businesses",
      popular: true,
      features: [
        "500 calls per month",
        "Advanced analytics",
        "Priority support",
        "Custom voice options",
        "CRM integration",
      ],
    },
    {
      name: "Enterprise",
      price: 199,
      annualPrice: 159,
      description: "For large organizations",
      features: [
        "Unlimited calls",
        "Full analytics suite",
        "Dedicated support",
        "White-label options",
        "API access",
        "Custom integrations",
      ],
    },
  ];

  const getDisplayPrice = (plan: typeof plans[0]) => {
    return annualBilling ? plan.annualPrice : plan.price;
  };

  const handleSelectPlan = (planName: string) => {
    console.log("Selected plan:", planName);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-4">
            Choose Your Plan
          </DialogTitle>
          <p className="text-lg text-muted-foreground text-center mb-6">
            Select the perfect plan for your business needs
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Label
              htmlFor="billing-toggle"
              className={!annualBilling ? "font-semibold" : ""}
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={annualBilling}
              onCheckedChange={setAnnualBilling}
            />
            <Label
              htmlFor="billing-toggle"
              className={annualBilling ? "font-semibold" : ""}
            >
              Annual
            </Label>
            {annualBilling && (
              <span className="text-sm text-success font-medium">Save 20%</span>
            )}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.popular ? "border-primary shadow-lg relative" : ""}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${getDisplayPrice(plan)}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {annualBilling && (
                    <p className="text-sm text-muted-foreground">
                      Billed annually (${getDisplayPrice(plan) * 12}/year)
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => handleSelectPlan(plan.name)}
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.popular ? "Get Started Now" : "Select Plan"}
                </Button>

                <div className="space-y-3 pt-4 border-t">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
