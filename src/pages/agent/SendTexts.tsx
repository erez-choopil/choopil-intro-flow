import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { MessageSquare, PhoneOff, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LinkOption = "more-info" | "schedule" | "website" | null;

export default function SendTexts() {
  const { toast } = useToast();
  const [textMessagesEnabled, setTextMessagesEnabled] = useState(false);
  const [selectedLinkOption, setSelectedLinkOption] = useState<LinkOption>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [businessName] = useState("Your Business");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [urlError, setUrlError] = useState("");

  // Track changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [textMessagesEnabled, selectedLinkOption, linkUrl]);

  const isValidUrl = (url: string) => {
    if (!url) return false;
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const validateUrl = () => {
    if (selectedLinkOption && !linkUrl) {
      setUrlError("Please enter a URL or deselect the link option");
      return false;
    }
    if (selectedLinkOption && linkUrl && !isValidUrl(linkUrl)) {
      setUrlError("Please enter a valid URL (must start with http:// or https://)");
      return false;
    }
    setUrlError("");
    return true;
  };

  useEffect(() => {
    if (selectedLinkOption && linkUrl) {
      validateUrl();
    } else {
      setUrlError("");
    }
  }, [linkUrl, selectedLinkOption]);

  const getLinkText = () => {
    if (!selectedLinkOption || !linkUrl) return "";
    
    switch (selectedLinkOption) {
      case "more-info":
        return `For more information, visit this link: ${linkUrl}`;
      case "schedule":
        return `To schedule an appointment please visit ${linkUrl}`;
      case "website":
        return `Check out our website at: ${linkUrl}`;
      default:
        return "";
    }
  };

  const getPreviewMessage = () => {
    const baseMessage = `Thanks for calling ${businessName}! If needed, we will follow up with you as soon as we can.`;
    const linkText = getLinkText();
    return linkText ? `${baseMessage}\n\n${linkText}` : baseMessage;
  };

  const getCharacterCount = () => {
    return getPreviewMessage().length;
  };

  const handleSave = () => {
    if (!validateUrl()) return;
    
    // API call would go here
    setHasUnsavedChanges(false);
    toast({
      title: "Text message settings saved successfully!",
      duration: 3000,
    });
  };

  const handleCancel = () => {
    // Reset to last saved state
    setTextMessagesEnabled(false);
    setSelectedLinkOption(null);
    setLinkUrl("");
    setHasUnsavedChanges(false);
  };

  const isSaveDisabled = !hasUnsavedChanges || (selectedLinkOption && !linkUrl) || !!urlError;

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Send Texts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Automatically send SMS messages to callers after their call ends.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleCancel} disabled={!hasUnsavedChanges}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaveDisabled}>
            Save
          </Button>
        </div>
      </div>

      {/* Main Toggle */}
      <div className="mb-8 p-6 border rounded-lg bg-card">
        <div className="flex items-center gap-4">
          <Switch
            checked={textMessagesEnabled}
            onCheckedChange={setTextMessagesEnabled}
            className="data-[state=checked]:bg-primary scale-150"
          />
          <div>
            <Label className="text-base font-medium">Enable automated text messages to callers</Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, Choopil will automatically send a text message to callers after their call ends. 
              This helps maintain engagement and provides easy access to important links.
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {!textMessagesEnabled && (
        <div className="p-12 border-2 border-dashed rounded-lg bg-muted/20 flex flex-col items-center justify-center text-center">
          <PhoneOff className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground max-w-md">
            Text messages are currently disabled. Turn on the toggle above to start sending automated messages to your callers.
          </p>
        </div>
      )}

      {/* Content Section */}
      {textMessagesEnabled && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SMS Preview Box */}
          <div className="space-y-4">
            <div className="border rounded-xl bg-card p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Message Preview</Label>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4 border">
                <div className="bg-background rounded-lg p-4 shadow-sm">
                  <p className="text-sm whitespace-pre-wrap">{getPreviewMessage()}</p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Character count: {getCharacterCount()} / 160
                {getCharacterCount() > 160 && (
                  <span className="text-warning ml-2">⚠️ Message will be split into multiple SMS</span>
                )}
              </div>
            </div>
          </div>

          {/* Link Options */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Add a link to your message (optional)</Label>
              <p className="text-sm text-muted-foreground mt-1">
                The link you add will appear at the end of your message. You can only include one link per message.
              </p>
            </div>

            <RadioGroup value={selectedLinkOption || ""} onValueChange={(value) => {
              setSelectedLinkOption(value as LinkOption || null);
              if (!value) {
                setLinkUrl("");
                setUrlError("");
              }
            }}>
              {/* More Information Option */}
              <div className={`border rounded-lg p-4 transition-all ${
                selectedLinkOption === "more-info" ? "border-primary border-2 bg-primary/5" : "hover:bg-muted/50"
              }`}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="more-info" id="more-info" />
                  <Label htmlFor="more-info" className="cursor-pointer flex-1">
                    <div className="font-medium">More information at link</div>
                    <div className="text-sm text-muted-foreground">For more information, visit this link: [LINK]</div>
                  </Label>
                </div>
                {selectedLinkOption === "more-info" && (
                  <div className="mt-3 pl-6 space-y-2">
                    <Input
                      type="url"
                      placeholder="https://example.com/more-info"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      className={urlError ? "border-destructive" : ""}
                    />
                    {urlError && (
                      <div className="flex items-center gap-1 text-xs text-destructive">
                        <AlertTriangle className="h-3 w-3" />
                        {urlError}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Schedule Appointment Option */}
              <div className={`border rounded-lg p-4 transition-all ${
                selectedLinkOption === "schedule" ? "border-primary border-2 bg-primary/5" : "hover:bg-muted/50"
              }`}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="schedule" id="schedule" />
                  <Label htmlFor="schedule" className="cursor-pointer flex-1">
                    <div className="font-medium">Schedule appointment</div>
                    <div className="text-sm text-muted-foreground">To schedule an appointment please visit [LINK]</div>
                  </Label>
                </div>
                {selectedLinkOption === "schedule" && (
                  <div className="mt-3 pl-6 space-y-2">
                    <Input
                      type="url"
                      placeholder="https://calendly.com/your-business"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      className={urlError ? "border-destructive" : ""}
                    />
                    {urlError && (
                      <div className="flex items-center gap-1 text-xs text-destructive">
                        <AlertTriangle className="h-3 w-3" />
                        {urlError}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Website Option */}
              <div className={`border rounded-lg p-4 transition-all ${
                selectedLinkOption === "website" ? "border-primary border-2 bg-primary/5" : "hover:bg-muted/50"
              }`}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="website" id="website" />
                  <Label htmlFor="website" className="cursor-pointer flex-1">
                    <div className="font-medium">Website</div>
                    <div className="text-sm text-muted-foreground">Check out our website at: [LINK]</div>
                  </Label>
                </div>
                {selectedLinkOption === "website" && (
                  <div className="mt-3 pl-6 space-y-2">
                    <Input
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      className={urlError ? "border-destructive" : ""}
                    />
                    {urlError && (
                      <div className="flex items-center gap-1 text-xs text-destructive">
                        <AlertTriangle className="h-3 w-3" />
                        {urlError}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </RadioGroup>
          </div>
        </div>
      )}

      {/* Need Help Button */}
      <div className="flex justify-center mt-8">
        <Button variant="outline" size="lg">
          Need help?
        </Button>
      </div>
    </div>
  );
}
