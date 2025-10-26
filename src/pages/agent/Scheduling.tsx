import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";

export default function Scheduling() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Scheduling</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Give your receptionist the ability to book appointments directly on your calendar
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground">(415) 413-5501</span>
          <Button variant="outline" size="sm">
            Web call
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-6">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Phone className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Let your receptionist handle scheduling for you
          </h2>
          
          <ol className="text-left space-y-2 text-sm text-muted-foreground">
            <li>1. Go to Integrations to connect your calendar</li>
            <li>2. Add an appointment type to get started</li>
          </ol>

          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Connect calendar
          </Button>
        </div>
      </div>
    </div>
  );
}
