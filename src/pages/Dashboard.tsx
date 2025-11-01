import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Routes, Route, Navigate } from "react-router-dom";

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
import CallsWithTabs from "./calls/CallsWithTabs";

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
          <header className="sticky top-0 flex h-10 items-center gap-4 bg-background px-6 z-10">
          </header>
          <Routes>
            <Route path="/" element={<Navigate to="calls" replace />} />
            <Route path="calls" element={<CallsWithTabs />} />
            
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