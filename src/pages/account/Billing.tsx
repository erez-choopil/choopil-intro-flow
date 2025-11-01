import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Phone, Inbox, Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$24.95",
    features: [
      "30 calls",
      "$1.5 per additional call",
      "24/7 answering",
      "Instant call summaries",
      "Call transfers",
      "Send text messages",
      "Call recordings & transcription",
      "Spam blocking",
      "Zapier integration",
    ],
  },
  {
    name: "Premium",
    price: "$59.95",
    popular: true,
    features: [
      "90 calls",
      "$1 per additional call",
      "24/7 answering",
      "Instant call summaries",
      "Call transfers",
      "Send text messages",
      "Call recordings & transcription",
      "Spam blocking",
      "Zapier integration",
    ],
  },
  {
    name: "Pro",
    price: "$159.95",
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
    ],
  },
];

export default function Billing() {
  const [annualBilling, setAnnualBilling] = useState(false);
  const navigate = useNavigate();

  const handleSelectPlan = (plan: { name: string; price: string }) => {
    navigate("/dashboard/settings/checkout", { state: plan });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Subscription</h1>
          <p className="text-muted-foreground">Choose the plan that fits your business</p>
        </div>
      
      {/* Current Plan */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Trial plan</h2>
              <p className="text-sm text-muted-foreground">Upgrade now to</p>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-primary border-primary">
                14 days left
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-success/10">
              <div className="p-2 rounded-full bg-success/20">
                <Phone className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Connect your number or a new one</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-lg bg-pink-500/10">
              <div className="p-2 rounded-full bg-pink-500/20">
                <Inbox className="h-5 w-5 text-pink-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Get detailed call summaries in your inbox</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10">
              <div className="p-2 rounded-full bg-primary/20">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Answer every customer call 24/7 automatically</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Plans */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">All plans</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Annual discount</span>
            <Switch checked={annualBilling} onCheckedChange={setAnnualBilling} />
            <Badge variant="outline" className="text-success border-success">-20%</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.popular ? "border-success border-2" : ""}>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                    {plan.popular && (
                      <Badge className="bg-success text-white">POPULAR</Badge>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">per month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={plan.popular ? "w-full bg-success hover:bg-success/90" : "w-full"} 
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSelectPlan(plan)}
                >
                  Select plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
