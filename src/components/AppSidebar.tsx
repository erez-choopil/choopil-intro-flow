import { Phone, Bot, Settings, Puzzle, Sparkles, LogOut, User, CircleHelp } from "lucide-react";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import choopilLogo from "@/assets/choopil-logo.svg";

const agentSubItems = [
  { title: "Agent settings", url: "/dashboard/agent/settings" },
  { title: "Business knowledge", url: "/dashboard/agent/knowledge" },
  // Temporarily hidden - will be restored later
  // { title: "Send texts", url: "/dashboard/agent/texts" },
  { title: "Ask questions", url: "/dashboard/agent/questions", comingSoon: true },
  { title: "Transfer calls", url: "/dashboard/agent/transfer", comingSoon: true },
  // Hidden but kept in structure for future use
  // { title: "Scheduling", url: "/dashboard/agent/scheduling" },
  // { title: "Call filtering", url: "/dashboard/agent/filtering" },
];

const settingsSubItems = [
  { title: "Account", url: "/dashboard/settings/account" },
  { title: "Billing", url: "/dashboard/settings/billing" },
  { title: "Call notifications", url: "/dashboard/settings/notifications" },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [agentOpen, setAgentOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  
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
              {/* Quick Start Guide */}
              <SidebarMenuItem>
                <NavLink
                  to="/dashboard/quick-start?step=test"
                  onClick={handleCallsClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  <CircleHelp className="h-4 w-4" />
                  <span>Quick Start Guide</span>
                </NavLink>
              </SidebarMenuItem>

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
                  <TooltipProvider>
                    {agentSubItems.map((item) => (
                      item.comingSoon ? (
                        <Tooltip key={item.url}>
                          <TooltipTrigger asChild>
                            <div
                              className="flex items-center justify-between px-3 py-1.5 rounded-md text-sm text-muted-foreground/50 cursor-not-allowed"
                            >
                              <span>{item.title}</span>
                              <span className="px-2 py-0.5 text-[11px] font-medium text-white bg-primary rounded-full">
                                Coming soon
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This feature is on its way!</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
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
                      )
                    ))}
                  </TooltipProvider>
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

              {/* Integrations - Temporarily hidden, will be restored later */}
              {/* <SidebarMenuItem>
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
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 space-y-3">
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-primary text-white px-2 py-1 rounded-md text-xs font-medium">
              <Sparkles className="h-3 w-3" />
              <span>Trial</span>
            </div>
            <span className="text-sm font-medium text-primary">14 days left</span>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full justify-center text-sm font-medium bg-white dark:bg-background hover:bg-gray-50 dark:hover:bg-accent"
            onClick={handleUpgradeClick}
          >
            Upgrade now
          </Button>
        </div>

        <div 
          className="relative flex items-center justify-between px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent/50 transition-all duration-200"
          onMouseEnter={() => setShowSignOut(true)}
          onMouseLeave={() => setShowSignOut(false)}
        >
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="text-sm">erez@choopil.com</span>
          </div>
          <button 
            className={`transition-all duration-200 ${
              showSignOut ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
            }`}
            onClick={() => {/* handle sign out */}}
          >
            <LogOut className="h-4 w-4 text-primary hover:text-primary/80" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
