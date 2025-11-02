import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Phone, Inbox, Clock, Sparkles, Zap, Star } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-8 py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Limited Time Offer</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
            Scale your business with AI-powered phone automation. Answer every call, 24/7, automatically.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 -mt-8 space-y-12 pb-16">
      
        {/* Trial Plan Banner */}
        <Card className="relative overflow-hidden border-2 border-primary/20 shadow-xl animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5"></div>
          <CardContent className="relative p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">Your Trial Plan</h2>
                </div>
                <p className="text-lg text-muted-foreground">Upgrade now to unlock unlimited potential</p>
              </div>
              <Badge className="bg-destructive text-destructive-foreground text-base px-4 py-2 animate-pulse">
                <Clock className="h-4 w-4 mr-2" />
                14 days left
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="group flex items-start gap-4 p-6 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Connect Any Number</p>
                  <p className="text-sm text-muted-foreground">Use your existing number or get a new one instantly</p>
                </div>
              </div>
              
              <div className="group flex items-start gap-4 p-6 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Inbox className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Instant Summaries</p>
                  <p className="text-sm text-muted-foreground">Get detailed call summaries delivered to your inbox</p>
                </div>
              </div>
              
              <div className="group flex items-start gap-4 p-6 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">24/7 Availability</p>
                  <p className="text-sm text-muted-foreground">Never miss a call with round-the-clock automation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">All Plans</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your business needs. All plans include our core features.
            </p>
            
            <div className="flex items-center justify-center gap-4 py-4">
              <span className={`text-sm font-medium transition-colors ${!annualBilling ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch checked={annualBilling} onCheckedChange={setAnnualBilling} />
              <span className={`text-sm font-medium transition-colors ${annualBilling ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
              </span>
              <Badge className="bg-primary text-primary-foreground animate-pulse">
                <Star className="h-3 w-3 mr-1" />
                Save 20%
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular 
                    ? "border-primary border-2 shadow-xl md:scale-105 z-10" 
                    : "hover:border-primary/50"
                } animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5"></div>
                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground animate-pulse shadow-lg">
                      <Star className="h-3 w-3 mr-1" />
                      MOST POPULAR
                    </Badge>
                  </>
                )}
                
                <CardContent className="relative p-8">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-primary">{plan.price}</span>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">per month</span>
                        {annualBilling && (
                          <span className="text-xs text-primary font-medium">Billed annually</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 p-1 rounded-full bg-primary/10">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                      plan.popular 
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl" 
                        : "hover:bg-primary hover:text-primary-foreground"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan)}
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
      </div>
    </div>
  );
}
