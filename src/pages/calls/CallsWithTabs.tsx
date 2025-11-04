import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, History } from "lucide-react";
import CallsTable from "./CallsTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { PricingModal } from "@/components/calls/PricingModal";
import { TestCallModal } from "@/components/calls/TestCallModal";
function CallsLandingPage() {
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [testCallModalOpen, setTestCallModalOpen] = useState(false);
  return (
    <>
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

          {/* Trust Badge */}
          <p className="text-center text-muted-foreground">
            Trusted by 2,000+ small businesses to handle their calls professionally.
          </p>
        </div>
      </div>

      <PricingModal open={pricingModalOpen} onOpenChange={setPricingModalOpen} />
      <TestCallModal open={testCallModalOpen} onOpenChange={setTestCallModalOpen} />
    </>
  );
}
export default function CallsWithTabs() {
  return <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b px-6">
          <TabsList className="bg-transparent h-auto p-0">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 data-[state=active]:bg-transparent">
              <Phone className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 data-[state=active]:bg-transparent">
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
    </div>;
}