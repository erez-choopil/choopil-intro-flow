import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ChangePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: string;
}

const plans = [
  {
    id: "professional",
    name: "Professional",
    price: 49,
    features: ["Up to 200 calls/month", "24/7 AI receptionist", "Basic training", "Call transcripts", "Email support"]
  },
  {
    id: "scale",
    name: "Scale",
    price: 149,
    badge: "MOST POPULAR",
    features: ["Up to 500 calls/month", "24/7 AI receptionist", "Industry-specific training", "Call transcripts & summaries", "SMS capabilities", "Call forwarding", "Priority support"]
  },
  {
    id: "growth",
    name: "Growth",
    price: 299,
    features: ["Up to 1,500 calls/month", "24/7 AI receptionist", "Advanced AI training", "Full transcripts & analytics", "SMS & MMS", "Advanced call routing", "Dedicated support", "API access"]
  },
  {
    id: "custom",
    name: "Custom",
    price: null,
    features: ["Unlimited calls", "Everything in Growth", "Custom integrations", "White-label options", "SLA guarantees", "24/7 phone support"]
  }
];

export function ChangePlanModal({ open, onOpenChange, currentPlan }: ChangePlanModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Plan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={currentPlan === plan.id ? "border-2 border-primary" : ""}
            >
              <CardHeader>
                <div className="space-y-2">
                  {plan.badge && (
                    <Badge className="w-fit">{plan.badge}</Badge>
                  )}
                  {currentPlan === plan.id && (
                    <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20">
                      Current Plan
                    </Badge>
                  )}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>
                    {plan.price ? (
                      <span className="text-2xl font-bold text-foreground">${plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></span>
                    ) : (
                      <span className="text-xl font-bold text-foreground">Contact Sales</span>
                    )}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={currentPlan === plan.id ? "secondary" : "default"}
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id 
                    ? "Current Plan" 
                    : plan.price 
                    ? (plan.id === "professional" ? "Downgrade" : "Upgrade")
                    : "Contact Sales"
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {currentPlan !== "professional" && (
          <div className="bg-muted/50 rounded-lg p-4 text-sm">
            <p className="text-muted-foreground">
              <strong>Note:</strong> Plan changes take effect immediately. You'll be charged a prorated amount for the difference. Your next full charge will be on your regular billing date.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
