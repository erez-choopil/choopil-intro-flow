import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play } from "lucide-react";
import { useState } from "react";

const voices = [
  { value: "aria", label: "Aria", gender: "Female" },
  { value: "roger", label: "Roger", gender: "Male" },
  { value: "sarah", label: "Sarah", gender: "Female" },
  { value: "laura", label: "Laura", gender: "Female" },
  { value: "charlie", label: "Charlie", gender: "Male" },
  { value: "george", label: "George", gender: "Male" },
];

export default function AgentSettings() {
  const [agentName, setAgentName] = useState("Cassidy");
  const [greetingMessage, setGreetingMessage] = useState("You've reached Goody. How can I help you today?");
  const [goodbyeMessage, setGoodbyeMessage] = useState("Thanks for calling. Have a great day.");
  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Agent settings</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground">(206) 687-1315</span>
          <Button variant="outline" size="sm">
            Web call
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Agent phone number */}
        <div className="space-y-2">
          <Label className="text-base font-semibold text-foreground">Agent phone number</Label>
          <p className="text-sm text-muted-foreground">
            Forward calls to this number or use it directly for your business.{" "}
            <a href="#" className="text-primary hover:underline">View forwarding instructions</a>.
            Calls from (877) 728-0550 to this number are free.
          </p>
          <div className="text-lg font-semibold text-foreground">(206) 687-1315</div>
        </div>

        {/* Personality */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">Personality</Label>
          <p className="text-sm text-muted-foreground">
            Customize your agent's conversation style, voice, and tone
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Agent's name</Label>
              <Input 
                value={agentName} 
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Cassidy" 
              />
              <p className="text-xs text-muted-foreground">
                Choose what name your agent uses when greeting callers.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Voice</Label>
              <div className="flex gap-2">
                <Select defaultValue="aria">
                  <SelectTrigger className="max-w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.value} value={voice.value}>
                        {voice.label} ({voice.gender})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Start & Ending */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-foreground">Start & Ending</Label>

          <div className="space-y-2">
            <Label>Greeting Message</Label>
            <Textarea
              value={greetingMessage}
              onChange={(e) => setGreetingMessage(e.target.value)}
              placeholder="You've reached Goody. How can I help you today?"
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Goodbye Message</Label>
            <Textarea
              value={goodbyeMessage}
              onChange={(e) => setGoodbyeMessage(e.target.value)}
              placeholder="Thanks for calling. Have a great day."
              className="min-h-[80px]"
            />
          </div>
          
          <Button className="bg-success hover:bg-success/90">Save settings</Button>
        </div>
      </div>
    </div>
  );
}
