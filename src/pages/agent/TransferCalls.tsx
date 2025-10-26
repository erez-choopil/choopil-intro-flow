import { Button } from "@/components/ui/button";
import { Phone, Plus } from "lucide-react";

export default function TransferCalls() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Transfer calls</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground">(206) 687-1315</span>
          <Button variant="outline" size="sm">
            Web call
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
          <Phone className="h-12 w-12 text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Want certain calls to go to a real person?
          </h2>
          <p className="text-muted-foreground">
            Set up rules to transfer calls to yourself or your team
          </p>
        </div>

        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add transferring rule
        </Button>
      </div>
    </div>
  );
}
