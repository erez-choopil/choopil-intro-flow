import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Calendar } from "lucide-react";

export default function SendTexts() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Send text messages to callers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your agent can be trained to send texts, appointment links, and more
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground">(206) 687-1315</span>
          <Button variant="outline" size="sm">
            Web call
          </Button>
        </div>
      </div>

      <Button className="mb-8">
        <Plus className="h-4 w-4 mr-2" />
        Add text message
      </Button>

      <div className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
