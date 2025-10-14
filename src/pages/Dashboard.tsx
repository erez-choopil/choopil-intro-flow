import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routes, Route, Navigate } from "react-router-dom";

function CallsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="relative inline-block">
          <div className="absolute inset-0 animate-ping">
            <Phone className="h-16 w-16 text-success opacity-20" />
          </div>
          <div className="relative bg-success/10 p-6 rounded-full">
            <Phone className="h-16 w-16 text-success" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Call your new receptionist at (415) 413-5501
          </h1>
          <p className="text-muted-foreground">
            We've set it up with the basics. Call now to hear it in action. Then click Agent on the left to keep customizing.
          </p>
        </div>

        <Button className="bg-success hover:bg-success/90 text-white">
          Web call
        </Button>

        <p className="text-sm text-muted-foreground">
          No phone nearby? Test with a web call.
        </p>
      </div>
    </div>
  );
}

function AgentPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-4">Agent Settings</h1>
      <p className="text-muted-foreground">Configure your AI receptionist settings here.</p>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-4">Settings</h1>
      <p className="text-muted-foreground">Manage your account settings.</p>
    </div>
  );
}

function IntegrationsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-4">Integrations</h1>
      <p className="text-muted-foreground">Connect with other tools and services.</p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-6 z-10">
            <SidebarTrigger />
          </header>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/calls" replace />} />
            <Route path="/calls" element={<CallsPage />} />
            <Route path="/agent" element={<AgentPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
}
