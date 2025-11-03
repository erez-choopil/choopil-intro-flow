import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$24.95",
    annualPrice: "$19.96",
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
    name: "Premium",
    price: "$59.95",
    annualPrice: "$47.96",
    popular: true,
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
    price: "$159.95",
    annualPrice: "$127.96",
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

interface LaunchStepProps {
  onSelectPlan: (plan: any) => void;
}

export default function LaunchStep({ onSelectPlan }: LaunchStepProps) {
  const [annualBilling, setAnnualBilling] = useState(false);

  const getDisplayPrice = (plan: { price: string; annualPrice: string }) => {
    return annualBilling ? plan.annualPrice : plan.price;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-foreground">Choose Your Perfect Plan</h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Scale your business with AI-powered phone automation. Answer every call, 24/7.
        </p>
        
        <div className="flex items-center justify-center gap-3 py-3">
          <span className={`text-sm font-medium transition-colors ${!annualBilling ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch checked={annualBilling} onCheckedChange={setAnnualBilling} />
          <span className={`text-sm font-medium transition-colors ${annualBilling ? 'text-foreground' : 'text-muted-foreground'}`}>
            Annual
          </span>
          <Badge className="bg-primary text-primary-foreground">
            <Star className="h-3 w-3 mr-1" />
            Save 20%
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={plan.name} 
            className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              plan.popular 
                ? "border-primary border-2 shadow-lg md:scale-105 z-10" 
                : "hover:border-primary/50"
            } animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {plan.popular && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5"></div>
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground shadow-lg">
                  <Star className="h-3 w-3 mr-1" />
                  MOST POPULAR
                </Badge>
              </>
            )}
            
            <CardContent className="relative p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2 mb-2">
                  {annualBilling && (
                    <span className="text-2xl font-semibold text-muted-foreground line-through">{plan.price}</span>
                  )}
                  <span className="text-4xl font-bold text-primary">{getDisplayPrice(plan)}</span>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">per month</span>
                  </div>
                </div>
                {annualBilling && (
                  <p className="text-sm font-medium text-primary">Save ${(parseFloat(plan.price.slice(1)) * 12 - parseFloat(plan.annualPrice.slice(1)) * 12).toFixed(0)}/year</p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="mt-0.5 p-1 rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary flex-shrink-0" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full h-11 text-base font-semibold transition-all duration-300 ${
                  plan.popular 
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl" 
                    : "hover:bg-primary hover:text-primary-foreground"
                }`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => onSelectPlan(plan)}
              >
                {plan.popular ? "Get Started Now" : "Select Plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
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
  );
}
