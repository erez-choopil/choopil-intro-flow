import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const plans = [{
  name: "Starter",
  price: "$24.95",
  annualPrice: "$19.96",
  description: "Perfect for small businesses just getting started",
  features: ["30 calls", "$1.5 per additional call", "24/7 answering", "Instant call summaries", "Call transfers"]
}, {
  name: "Professional",
  price: "$59.95",
  annualPrice: "$47.96",
  popular: true,
  description: "Ideal for growing businesses with higher call volume",
  features: ["90 calls", "$1 per additional call", "24/7 answering", "Instant call summaries", "Call transfers", "Send text messages", "Call recordings & transcription", "Spam blocking"]
}, {
  name: "Pro",
  price: "$159.95",
  annualPrice: "$127.96",
  description: "Enterprise-grade solution for high-volume operations",
  features: ["300 calls", "$0.75 per additional call", "24/7 answering", "Instant call summaries", "Call transfers", "Send text messages", "Call recordings & transcription", "Spam blocking", "Zapier integration", "Priority support"]
}];
export default function Billing() {
  const [annualBilling, setAnnualBilling] = useState(true);
  const navigate = useNavigate();
  const handleSelectPlan = (plan: {
    name: string;
    price: string;
    annualPrice: string;
  }) => {
    navigate("/dashboard/settings/checkout", {
      state: plan
    });
  };
  const getDisplayPrice = (plan: {
    price: string;
    annualPrice: string;
  }) => {
    return annualBilling ? plan.annualPrice : plan.price;
  };
  return <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto px-8 space-y-8 py-0">
        {/* Compact Trial Banner */}
        

        {/* Pricing Plans */}
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Choose Your Perfect Plan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start your 7-day free trial today - start pay only after
            </p>
            
            <div className="flex items-center justify-center mb-8 py-[20px]">
              <div className="inline-flex items-center bg-muted p-1 rounded-full">
                <button onClick={() => setAnnualBilling(false)} className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${!annualBilling ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  Monthly
                </button>
                <button onClick={() => setAnnualBilling(true)} className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${annualBilling ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  Yearly - 20% off
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {plans.map(plan => <Card key={plan.name} className={`transition-all duration-300 hover:scale-105 hover:shadow-xl relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                {annualBilling && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    20% off
                  </div>}
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-foreground">
                        {plan.name}
                      </h3>
                      {plan.popular && <Badge variant="secondary" className="text-xs">
                          Recommended
                        </Badge>}
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      {annualBilling && <span className="text-2xl font-medium text-muted-foreground line-through">
                          {plan.price}
                        </span>}
                      <span className="text-4xl font-bold text-foreground">
                        {getDisplayPrice(plan)}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    {annualBilling && <p className="text-sm text-muted-foreground">
                        Billed annually (${(parseFloat(getDisplayPrice(plan).slice(1)) * 12).toFixed(2)}/year)
                      </p>}
                  </div>

                  <Button onClick={() => handleSelectPlan(plan)} className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                    Get Started
                  </Button>

                  <div className="space-y-3 pt-4 border-t">
                    {plan.features.map((feature, index) => <div key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>)}
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {/* Trust Section */}
          <div className="text-center pt-12 pb-8">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by businesses worldwide to handle their customer communications
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}