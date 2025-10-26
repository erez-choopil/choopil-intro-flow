import { Phone, Bot, Settings, Puzzle, Sparkles, HelpCircle, MessageSquare, FileText, ChevronDown, ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
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
  { title: "Knowledge", url: "/dashboard/agent/knowledge" },
  { title: "Ask questions", url: "/dashboard/agent/questions" },
  { title: "Transfer calls", url: "/dashboard/agent/transfer" },
  { title: "Send texts", url: "/dashboard/agent/texts" },
  { title: "Scheduling", url: "/dashboard/agent/scheduling" },
  { title: "Notifications", url: "/dashboard/agent/notifications" },
];

const accountSubItems = [
  { title: "Billing", url: "/dashboard/account/billing" },
];

export function AppSidebar() {
  const location = useLocation();
  const [agentOpen, setAgentOpen] = useState(true);
  const [accountOpen, setAccountOpen] = useState(false);
  
  const isAgentActive = location.pathname.startsWith("/dashboard/agent");
  const isAccountActive = location.pathname.startsWith("/dashboard/account");
  
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
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`
                  }
                >
                  <Phone className="h-4 w-4" />
                  <span>Calls</span>
                </NavLink>
              </SidebarMenuItem>

              {/* Agent - Collapsible */}
              <Collapsible open={agentOpen} onOpenChange={setAgentOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full ${
                    isAgentActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}>
                    <Bot className="h-4 w-4" />
                    <span className="flex-1 text-left">Agent</span>
                    {agentOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
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
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        }`
                      }
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Account - Collapsible */}
              <Collapsible open={accountOpen} onOpenChange={setAccountOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full ${
                    isAccountActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}>
                    <Settings className="h-4 w-4" />
                    <span className="flex-1 text-left">Account</span>
                    {accountOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent className="ml-4 mt-1 space-y-1">
                  {accountSubItems.map((item) => (
                    <NavLink
                      key={item.url}
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-1.5 rounded-md transition-colors text-sm ${
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
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
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
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
        <div className="flex items-center gap-2 px-2 py-1.5 text-sm">
          <Sparkles className="h-4 w-4 text-secondary" />
          <div className="flex-1">
            <span className="font-medium text-foreground">Trial</span>
            <span className="text-muted-foreground ml-2">14 days left</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full justify-start text-sm font-normal"
        >
          Upgrade now
        </Button>

        <button className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors w-full">
          <HelpCircle className="h-4 w-4" />
          <span>Talk to support</span>
        </button>

        <button className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors w-full">
          <MessageSquare className="h-4 w-4" />
          <span>What's new</span>
        </button>

        <button className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors w-full">
          <FileText className="h-4 w-4" />
          <span>mcclum@post.bgu.ac.il</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
