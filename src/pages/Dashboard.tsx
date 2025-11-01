import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Routes, Route, Navigate } from "react-router-dom";
function CallsPage() {
  return <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 bg-gradient-to-b from-background to-primary/5">
      <div className="w-full max-w-3xl space-y-12 animate-fade-in">
        {/* Hero Zone */}
        <div className="text-center space-y-4">
          <div className="relative inline-block mb-4">
            
            
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">Meet your new AI receptionist - ready to take your calls</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Choopil answers, books, and follows up - so you never miss a lead again.</p>
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
    </div>;
}

// Agent pages
import AgentSettings from "./agent/AgentSettings";
import Knowledge from "./agent/Knowledge";
import AskQuestions from "./agent/AskQuestions";
import TransferCalls from "./agent/TransferCalls";
import SendTexts from "./agent/SendTexts";
import Scheduling from "./agent/Scheduling";
import Notifications from "./agent/Notifications";
import CallFiltering from "./agent/CallFiltering";

// Settings pages
import AccountSettings from "./settings/AccountSettings";
import Checkout from "./settings/Checkout";
import Billing from "./account/Billing";

// Calls pages
import CallsTable from "./calls/CallsTable";
function IntegrationsPage() {
  return <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-4">Integrations</h1>
      <p className="text-muted-foreground">Connect with other tools and services.</p>
    </div>;
}
export default function Dashboard() {
  return <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-6 z-10">
          </header>
          <Routes>
            <Route path="/" element={<Navigate to="calls" replace />} />
            <Route path="calls" element={<CallsPage />} />
            <Route path="calls/table" element={<CallsTable />} />
            
            {/* Agent routes */}
            <Route path="agent/settings" element={<AgentSettings />} />
            <Route path="agent/knowledge" element={<Knowledge />} />
            <Route path="agent/questions" element={<AskQuestions />} />
            <Route path="agent/transfer" element={<TransferCalls />} />
            <Route path="agent/texts" element={<SendTexts />} />
            <Route path="agent/scheduling" element={<Scheduling />} />
            <Route path="agent/filtering" element={<CallFiltering />} />
            
            {/* Settings routes */}
            <Route path="settings/account" element={<AccountSettings />} />
            <Route path="settings/notifications" element={<Notifications />} />
            <Route path="settings/billing" element={<Billing />} />
            <Route path="settings/checkout" element={<Checkout />} />
            
            {/* Legacy account route redirect */}
            <Route path="account/billing" element={<Billing />} />
            
            <Route path="integrations" element={<IntegrationsPage />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>;
}