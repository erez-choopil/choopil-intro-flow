import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardTrialBanner } from "@/components/DashboardTrialBanner";

// Agent pages
import AgentSettings from "./agent/AgentSettings";
import Knowledge from "./agent/Knowledge";
import LaunchInstructions from "./agent/LaunchInstructions";
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
import BillingPayed from "./account/BillingPayed";
import BillingCanceled from "./account/BillingCanceled";

// Calls pages
import QuickStart from "./calls/QuickStart";
import Calls from "./calls/Calls";
import CallDetail from "./calls/CallDetail";

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
          <DashboardTrialBanner />
          <Routes>
            <Route path="/" element={<Navigate to="quick-start" replace />} />
            <Route path="quick-start" element={<QuickStart />} />
            <Route path="calls/:callId" element={<CallDetail />} />
            <Route path="calls" element={<Calls />} />
            
            {/* Agent routes */}
            <Route path="agent/settings" element={<AgentSettings />} />
            <Route path="agent/knowledge" element={<Knowledge />} />
            <Route path="agent/launch" element={<LaunchInstructions />} />
            <Route path="agent/questions" element={<AskQuestions />} />
            <Route path="agent/transfer" element={<TransferCalls />} />
            <Route path="agent/texts" element={<SendTexts />} />
            <Route path="agent/scheduling" element={<Scheduling />} />
            <Route path="agent/filtering" element={<CallFiltering />} />
            
            {/* Settings routes */}
            <Route path="settings/account" element={<AccountSettings />} />
            <Route path="settings/notifications" element={<Notifications />} />
            <Route path="settings/billing" element={<Billing />} />
            <Route path="settings/billing/payed" element={<BillingPayed />} />
            <Route path="settings/billing/canceled" element={<BillingCanceled />} />
            <Route path="settings/checkout" element={<Checkout />} />
            
            <Route path="integrations" element={<IntegrationsPage />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>;
}