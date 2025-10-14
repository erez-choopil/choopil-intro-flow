import { Phone, Bot, Settings, Puzzle } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import choopilLogo from "@/assets/choopil-logo.png";

const items = [
  { title: "Calls", url: "/dashboard/calls", icon: Phone },
  { title: "Agent", url: "/dashboard/agent", icon: Bot },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Integrations", url: "/dashboard/integrations", icon: Puzzle },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <div className="p-6">
          <img 
            src={choopilLogo} 
            alt="Choopil" 
            className="h-8 w-auto"
          />
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
