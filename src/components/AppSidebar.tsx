import { Phone, Bot, Settings, Puzzle, Sparkles, HelpCircle, MessageSquare, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";
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
import choopilLogo from "@/assets/choopil-logo.svg";

const items = [
  { title: "Calls", url: "/dashboard/calls", icon: Phone },
  { title: "Agent", url: "/dashboard/agent", icon: Bot },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Integrations", url: "/dashboard/integrations", icon: Puzzle },
];

export function AppSidebar() {
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
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        }`
                      }
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
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
