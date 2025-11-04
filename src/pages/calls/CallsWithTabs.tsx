import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, History } from "lucide-react";
import CallsTable from "./CallsTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

function CallsLandingPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [annualBilling, setAnnualBilling] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetStarted = () => {
    scrollToSection('pricing-section');
  };

  const handleTestCall = () => {
    scrollToSection('test-call-section');
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length === 10;
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    if (value && !validatePhone(value)) {
      setPhoneError("Please enter a valid 10-digit phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleCallMe = () => {
    if (validatePhone(phoneNumber)) {
      console.log("Calling:", phoneNumber);
    } else {
      setPhoneError("Please enter a valid 10-digit phone number");
    }
  };

  const handleWebCall = () => {
    console.log("Starting web call");
  };

  const handleSelectPlan = (planName: string) => {
    console.log("Selected plan:", planName);
  };

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
        "24/7 AI receptionist"
      ]
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
        "CRM integration"
      ]
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
        "Custom integrations"
      ]
    }
  ];

  const getDisplayPrice = (plan: typeof plans[0]) => {
    return annualBilling ? plan.annualPrice : plan.price;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-8 bg-gradient-to-b from-background to-primary/5">
      <div className="w-full max-w-3xl space-y-12 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Meet your new AI receptionist - ready to take your calls
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choopil answers, books, and follows up - so you never miss a lead again.
          </p>
        </div>

        {/* Phone Number Card */}
        <Card className="shadow-lg">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <Phone className="h-5 w-5" />
              <span className="font-medium">Your AI line</span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                (415) 413-5501
              </h2>
              <p className="text-muted-foreground">
                Call now to hear your assistant in action.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleGetStarted} 
                size="lg"
                className="flex-1"
              >
                Get Started Free
              </Button>
              <Button 
                onClick={handleTestCall} 
                variant="outline" 
                size="lg"
                className="flex-1"
              >
                Try a Test Call
              </Button>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Want to personalize it? Head to the{" "}
              <a href="/dashboard/agent/settings" className="text-primary hover:underline font-medium">
                Agent
              </a>
              {" "}tab anytime.
            </p>
          </CardContent>
        </Card>

        {/* Trust Badge */}
        <p className="text-center text-muted-foreground">
          Trusted by 2,000+ small businesses to handle their calls professionally.
        </p>
      </div>

      {/* Pricing Plans Section */}
      <div id="pricing-section" className="w-full max-w-6xl mx-auto py-16 px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground">
            Select the perfect plan for your business needs
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <Label htmlFor="billing-toggle" className={!annualBilling ? "font-semibold" : ""}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={annualBilling}
              onCheckedChange={setAnnualBilling}
            />
            <Label htmlFor="billing-toggle" className={annualBilling ? "font-semibold" : ""}>
              Annual
            </Label>
            {annualBilling && (
              <span className="text-sm text-success font-medium">Save 20%</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
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

        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 14-day money-back guarantee</span>
          </div>
        </div>
      </div>

      {/* Test Call Section */}
      <div id="test-call-section" className="w-full max-w-5xl mx-auto py-16 px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Try a Test Call
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience your AI receptionist in action
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Web Call Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Web call</h3>
                <p className="text-sm text-muted-foreground">
                  Test with a web call using your browser. No phone needed.
                </p>
              </div>
              <Button onClick={handleWebCall} className="w-full" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Web call
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                No phone nearby? Test with a web call.
              </p>
            </CardContent>
          </Card>

          {/* AI Assistant Call Me Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground">AI assistant call me</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your phone number and Choopil will call you.
                </p>
              </div>
              <div className="space-y-3">
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={phoneError ? "border-destructive" : ""}
                />
                {phoneError && (
                  <p className="text-sm text-destructive">{phoneError}</p>
                )}
                <Button 
                  onClick={handleCallMe} 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  disabled={!phoneNumber || !!phoneError}
                >
                  Call me now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CallsWithTabs() {
  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b px-6">
          <TabsList className="bg-transparent h-auto p-0">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 data-[state=active]:bg-transparent"
            >
              <Phone className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 data-[state=active]:bg-transparent"
            >
              <History className="h-4 w-4 mr-2" />
              Call History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="m-0">
          <CallsLandingPage />
        </TabsContent>

        <TabsContent value="history" className="m-0">
          <CallsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
