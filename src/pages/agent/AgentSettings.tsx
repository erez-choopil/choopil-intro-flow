import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const voices = [
  { value: "aria", label: "Aria", gender: "Female" },
  { value: "roger", label: "Roger", gender: "Male" },
  { value: "sarah", label: "Sarah", gender: "Female" },
  { value: "laura", label: "Laura", gender: "Female" },
  { value: "charlie", label: "Charlie", gender: "Male" },
  { value: "george", label: "George", gender: "Male" },
];

export default function AgentSettings() {
  const { toast } = useToast();
  const [selectedVoice, setSelectedVoice] = useState("aria");
  const [agentName, setAgentName] = useState("Cassidy");
  const [greetingMessage, setGreetingMessage] = useState("You've reached Goody. How can I help you today?");

  const greetingCharCount = greetingMessage.length;

  const handleSaveSettings = () => {
    if (!greetingMessage.trim()) {
      toast({
        title: "Greeting Message is required",
        description: "Please enter a greeting message before saving.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Settings saved",
      description: "Your agent settings have been saved successfully.",
    });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Agent settings
          </h1>
          <p className="text-muted-foreground">
            Customize your agent's voice, personality, and conversation style
          </p>
        </div>

        {/* Phone Number Info Card */}
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-foreground">Agent phone number</p>
              <p className="text-lg font-semibold text-foreground">(415) 413-5501</p>
              <p className="text-xs text-muted-foreground">
                Forward calls to this number or use it directly.{" "}
                <a href="#" className="text-primary hover:underline">View instructions</a>
              </p>
            </div>
            <Button variant="outline" size="sm">
              Web call
            </Button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-8">
          {/* Voice Selection */}
          <div className="space-y-2">
            <Label htmlFor="voice" className="text-foreground">
              Assistant voice <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-2">
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger id="voice" className="flex-1 max-w-[280px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {voices.map((voice) => (
                    <SelectItem key={voice.value} value={voice.value}>
                      {voice.label} ({voice.gender})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="shrink-0">
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Agent Name */}
          <div className="space-y-2">
            <Label htmlFor="agentName" className="text-foreground">
              Assistant name
            </Label>
            <Input 
              id="agentName"
              value={agentName} 
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="Cassidy"
              className="max-w-[280px]"
            />
            <p className="text-xs text-muted-foreground">
              The name your agent uses when greeting callers
            </p>
          </div>

          {/* Greeting Message */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="greeting" className="text-foreground">
                Greeting message <span className="text-destructive">*</span>
              </Label>
              <p className="text-xs text-muted-foreground">{greetingCharCount}/280</p>
            </div>
            <Textarea
              id="greeting"
              value={greetingMessage}
              onChange={(e) => {
                if (e.target.value.length <= 280) {
                  setGreetingMessage(e.target.value);
                }
              }}
              placeholder="You've reached Goody. How can I help you today?"
              className="min-h-[80px] resize-none"
              maxLength={280}
            />
          </div>

          {/* Preview Button */}
          <div>
            <Button variant="outline" className="w-full" type="button">
              <Play className="h-4 w-4 mr-2" />
              Hear assistant greeting
            </Button>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button 
              onClick={handleSaveSettings} 
              className="w-full"
              size="lg"
            >
              Save settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
