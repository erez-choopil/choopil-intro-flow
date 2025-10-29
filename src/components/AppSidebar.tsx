import { Phone, Bot, Settings, Puzzle, Sparkles, LogOut, User } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import choopilLogo from "@/assets/choopil-logo.svg";

const agentSubItems = [
  { title: "Agent settings", url: "/dashboard/agent/settings" },
  { title: "Business knowledge", url: "/dashboard/agent/knowledge" },
  { title: "Ask questions", url: "/dashboard/agent/questions" },
  { title: "Transfer calls", url: "/dashboard/agent/transfer" },
  { title: "Send texts", url: "/dashboard/agent/texts" },
  { title: "Scheduling", url: "/dashboard/agent/scheduling" },
  { title: "Call filtering", url: "/dashboard/agent/filtering" },
];

const settingsSubItems = [
  { title: "Account", url: "/dashboard/settings/account" },
  { title: "Billing", url: "/dashboard/settings/billing" },
  { title: "Call notifications", url: "/dashboard/settings/notifications" },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [agentOpen, setAgentOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const isAgentActive = location.pathname.startsWith("/dashboard/agent");
  const isSettingsActive = location.pathname.startsWith("/dashboard/settings");
  
  const handleAgentToggle = () => {
    setAgentOpen(true);
    setSettingsOpen(false);
    navigate("/dashboard/agent/settings");
  };
  
  const handleSettingsToggle = () => {
    setSettingsOpen(true);
    setAgentOpen(false);
    navigate("/dashboard/settings/account");
  };

  const handleUpgradeClick = () => {
    setSettingsOpen(true);
    setAgentOpen(false);
    navigate("/dashboard/settings/billing");
  };

  const handleCallsClick = () => {
    setAgentOpen(false);
    setSettingsOpen(false);
  };

  const handleIntegrationsClick = () => {
    setAgentOpen(false);
    setSettingsOpen(false);
  };
  
  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <div className="p-6 pb-4">
          <img 
            src={choopilLogo} 
            alt="Choopil" 
            className="h-6 w-auto"
          />
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {/* Calls */}
              <SidebarMenuItem>
                <NavLink
                  to="/dashboard/calls"
                  onClick={handleCallsClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  <Phone className="h-4 w-4" />
                  <span>Calls</span>
                </NavLink>
              </SidebarMenuItem>

              {/* Agent - Collapsible */}
              <Collapsible open={agentOpen} onOpenChange={handleAgentToggle}>
                <SidebarMenuItem>
                  <CollapsibleTrigger className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full ${
                    isAgentActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                    <Bot className="h-4 w-4" />
                    <span className="flex-1 text-left">Agent</span>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent className="ml-4 mt-1 space-y-1">
                  {agentSubItems.map((item) => (
                    <NavLink
                      key={item.url}
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-1.5 rounded-md transition-colors text-sm ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        }`
                      }
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Settings - Collapsible */}
              <Collapsible open={settingsOpen} onOpenChange={handleSettingsToggle}>
                <SidebarMenuItem>
                  <CollapsibleTrigger className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full ${
                    isSettingsActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                    <Settings className="h-4 w-4" />
                    <span className="flex-1 text-left">Settings</span>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent className="ml-4 mt-1 space-y-1">
                  {settingsSubItems.map((item) => (
                    <NavLink
                      key={item.url}
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-1.5 rounded-md transition-colors text-sm ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        }`
                      }
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Integrations */}
              <SidebarMenuItem>
                <NavLink
                  to="/dashboard/integrations"
                  onClick={handleIntegrationsClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  <Puzzle className="h-4 w-4" />
                  <span>Integrations</span>
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 space-y-2">
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
              <Sparkles className="h-3 w-3" />
              <span>Trial</span>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">14 days left</span>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full justify-center text-sm font-medium bg-white dark:bg-background hover:bg-gray-50 dark:hover:bg-accent"
            onClick={handleUpgradeClick}
          >
            Upgrade now
          </Button>
        </div>

        <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>erez@choopil.com</span>
        </div>

        <button className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors w-full">
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
