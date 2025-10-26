import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Notifications() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Set up who gets notified about calls, when they're notified, and how (email or text)
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground">(415) 413-5501</span>
          <Button variant="outline" size="sm">
            Web call
          </Button>
        </div>
      </div>

      <Button className="mb-6">
        <Plus className="h-4 w-4 mr-2" />
        Add person or department
      </Button>

      <div className="border rounded-lg p-4 bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
              <User className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">DJ Esaz</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
              EMAIL
            </Badge>
            <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
              SMS
            </Badge>
            <Button variant="ghost" size="sm">
              CUSTOM CONDITIONS
            </Button>
            <Button variant="ghost" size="icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
