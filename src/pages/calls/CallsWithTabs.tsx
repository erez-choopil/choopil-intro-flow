import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, History } from "lucide-react";
import CallsTable from "./CallsTable";
import { Button } from "@/components/ui/button";

function CallsLandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 bg-gradient-to-b from-background to-primary/5">
      <div className="w-full max-w-3xl space-y-12 animate-fade-in">
        {/* Hero Zone */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Meet your new AI receptionist - ready to take your calls
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choopil answers, books, and follows up - so you never miss a lead again.
          </p>
        </div>

        {/* Number Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-card/80 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              📞 Your AI line
            </div>
            
            <div className="space-y-4">
              <a href="tel:+14154135501" className="block text-4xl md:text-5xl font-bold text-foreground hover:text-primary transition-colors group">
                (415) 413-5501
              </a>
              
              <p className="text-base text-muted-foreground">
                Call now to hear your assistant in action.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold hover-scale">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="hover-scale">
                Preview a Sample Call
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Want to personalize it? Head to the <span className="text-primary font-medium">Agent</span> tab anytime.
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Trusted by 2,000+ small businesses to handle their calls professionally.
          </p>
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
