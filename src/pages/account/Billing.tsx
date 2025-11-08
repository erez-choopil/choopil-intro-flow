import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";

const plans = [
  {
    name: "Starter",
    price: "$39.20",
    originalPrice: "$49.00",
    annualPrice: "$470.40",
    discount: "20% off",
    description: "Perfect for small businesses just getting started",
    features: [
      "30 calls",
      "$1.5 per additional call",
      "24/7 answering",
      "Instant call summaries",
      "Call transfers",
    ],
  },
  {
    name: "Professional",
    price: "$79.20",
    originalPrice: "$99.00",
    annualPrice: "$950.40",
    discount: "20% off",
    isRecommended: true,
    description: "Ideal for growing businesses with higher call volume",
    features: [
      "90 calls",
      "$1 per additional call",
      "24/7 answering",
      "Instant call summaries",
      "Call transfers",
      "Send text messages",
      "Call recordings & transcription",
      "Spam blocking",
    ],
  },
  {
    name: "Pro",
    price: "$159.20",
    originalPrice: "$199.00",
    annualPrice: "$1910.40",
    discount: "20% off",
    description: "Enterprise-grade solution for high-volume operations",
    features: [
      "300 calls",
      "$0.75 per additional call",
      "24/7 answering",
      "Instant call summaries",
      "Call transfers",
      "Send text messages",
      "Call recordings & transcription",
      "Spam blocking",
      "Zapier integration",
      "Priority support",
    ],
  },
];

export default function Billing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    annualPrice: string;
  } | null>(null);

  const handleSelectPlan = (plan: typeof plans[0]) => {
    setSelectedPlan({
      name: plan.name,
      price: plan.price,
      annualPrice: plan.annualPrice,
    });
    setCheckoutModalOpen(true);
  };

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Choose Your Perfect Plan
            </h1>
            <p className="text-muted-foreground text-lg">
              Start your 7-day free trial today - start pay only after
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <Label
                htmlFor="billing-toggle"
                className={`text-base ${!isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="scale-110"
              />
              <Label
                htmlFor="billing-toggle"
                className={`text-base ${isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                Yearly - 20% off
              </Label>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.isRecommended ? "border-primary border-2" : ""
                }`}
              >
                {plan.isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}
                <CardContent className="p-6 space-y-6">
                  {/* Plan Header */}
                  <div className="space-y-2">
                    {plan.discount && (
                      <div className="inline-block">
                        <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                          {plan.discount}
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-muted-foreground line-through text-lg">
                        {plan.originalPrice}
                      </span>
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually ({plan.annualPrice}/year)
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full ${
                      plan.isRecommended ? "" : "variant-outline"
                    }`}
                    variant={plan.isRecommended ? "default" : "outline"}
                  >
                    Get Started
                  </Button>

                  {/* Features */}
                  <div className="space-y-3 pt-4 border-t">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="text-center space-y-4 pt-8">
            <p className="text-muted-foreground font-medium">
              Trusted by businesses worldwide to handle their customer communications
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
