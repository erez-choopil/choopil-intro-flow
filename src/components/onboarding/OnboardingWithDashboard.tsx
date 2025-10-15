import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface OnboardingWithDashboardProps {
  children: ReactNode;
}

export function OnboardingWithDashboard({ children }: OnboardingWithDashboardProps) {
  return (
    <div className="relative min-h-screen">
      {/* Dashboard in background */}
      <div className="fixed inset-0 blur-sm">
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1">
              <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-6 z-10">
              </header>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="h-8 w-64 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-96 bg-muted rounded animate-pulse" />
                  <div className="h-32 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>

      {/* Onboarding overlay */}
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
}
