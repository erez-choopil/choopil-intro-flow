import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useState } from "react";
import { PricingModal } from "@/components/calls/PricingModal";
import { TestCallModal } from "@/components/calls/TestCallModal";

export default function QuickStart() {
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [testCallModalOpen, setTestCallModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
        <div className="flex flex-col items-center justify-center min-h-[85vh] p-8">
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
                  <span className="font-medium">Your New Number</span>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground select-none">
                    (•••) •••-••••
                  </h2>
                  <p className="text-muted-foreground">
                    Your dedicated number will be activated after signup
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a dedicated phone number for your business once you activate your account
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => setPricingModalOpen(true)} 
                    size="lg" 
                    className="flex-1"
                  >
                    Get Started Free
                  </Button>
                  <Button 
                    onClick={() => setTestCallModalOpen(true)} 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                  >
                    Test Call
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
          </div>
        </div>
      </div>

      <PricingModal open={pricingModalOpen} onOpenChange={setPricingModalOpen} />
      <TestCallModal open={testCallModalOpen} onOpenChange={setTestCallModalOpen} />
    </>
  );
}
