import { useState } from "react";
import { Phone, Copy, ExternalLink, Rocket, AlertCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

type PhoneSystemType = "cell" | "voip" | "landline";
type LaunchOption = "forward" | "use-number";

const CHOOPIL_NUMBER = "(229) 738-7078";
const CHOOPIL_NUMBER_RAW = "2297387078";

const LaunchInstructions = () => {
  const [selectedOption, setSelectedOption] = useState<LaunchOption>("forward");
  const [phoneSystemType, setPhoneSystemType] = useState<PhoneSystemType>("cell");
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const { toast } = useToast();

  const cellProviders = ["AT&T", "Verizon", "T-Mobile", "Boost Mobile", "Sprint", "Other"];
  const voipProviders = ["OpenPhone", "RingCentral", "Google Voice", "Zoom Phone"];
  const landlineProviders = ["General Instructions"];

  const getProviderOptions = () => {
    switch (phoneSystemType) {
      case "cell":
        return cellProviders;
      case "voip":
        return voipProviders;
      case "landline":
        return landlineProviders;
      default:
        return [];
    }
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(CHOOPIL_NUMBER);
    toast({
      title: "Copied!",
      description: "Choopil number copied to clipboard",
    });
  };

  const renderInstructions = () => {
    if (!selectedProvider) {
      return (
        <div className="text-center py-12 text-primary">
          Select your phone system type & provider
        </div>
      );
    }

    const instructions = getInstructionsForProvider(selectedProvider);
    
    return (
      <div className="grid md:grid-cols-[2fr_1fr] gap-6">
        <div>
          <h3 className="font-semibold mb-2">Forwarding Instructions</h3>
          <p className="text-primary font-semibold mb-4">{selectedProvider}</p>
          {instructions.content}
          {instructions.detailedLink && (
            <Button variant="ghost" className="w-full mt-4 text-primary" asChild>
              <a href={instructions.detailedLink} target="_blank" rel="noopener noreferrer">
                Detailed Instructions <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
        {instructions.notes && (
          <div>
            <h3 className="font-semibold mb-2">Notes:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {instructions.notes.map((note, index) => (
                <li key={index} className="flex gap-2">
                  <span className={note.startsWith("⚠️") ? "" : "•"}>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Launch Instructions</h1>
          <p className="text-muted-foreground">
            Forward your existing business number to Choopil or share Choopil's number directly with your customers so it can start answering your calls.
          </p>
        </div>

        {/* Call to Action Card */}
        <Card className="p-4 bg-muted/50 border-l-4 border-l-primary">
          <div className="flex items-start gap-3">
            <Rocket className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Have Choopil start answering your calls</h3>
            </div>
          </div>
        </Card>

        {/* Warning Banner */}
        <Alert className="bg-warning/10 border-warning">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-warning-foreground">
            Choopil is in test mode and can't answer calls from real customers. Add a credit card to launch your agent.
          </AlertDescription>
        </Alert>

        {/* Description */}
        <p className="text-muted-foreground">
          You can forward calls from your existing business number to your agent's number, use your agent's number directly, or a combination of both.
        </p>

        {/* Option Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card
            className={`p-6 cursor-pointer transition-all ${
              selectedOption === "use-number"
                ? "border-primary bg-primary/5"
                : "hover:border-muted-foreground/50"
            }`}
            onClick={() => setSelectedOption("use-number")}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Use Choopil Number</h3>
                <p className="text-sm text-muted-foreground">
                  Share the agent's number as your new business line.
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-6 cursor-pointer transition-all ${
              selectedOption === "forward"
                ? "border-primary bg-primary/5"
                : "hover:border-muted-foreground/50"
            }`}
            onClick={() => setSelectedOption("forward")}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <Phone className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Forward Calls</h3>
                <p className="text-sm text-muted-foreground">
                  Send calls from your existing number to Choopil.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Use Choopil Number Section */}
        {selectedOption === "use-number" && (
          <Card className="p-6 bg-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-primary font-semibold mb-1">Your Choopil Number</h3>
                <p className="text-2xl font-bold">{CHOOPIL_NUMBER}</p>
              </div>
              <Button onClick={copyNumber} variant="outline" className="gap-2">
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
          </Card>
        )}

        {/* Forward Calls Section */}
        {selectedOption === "forward" && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold mb-2 block">Phone System Type</label>
                <Select
                  value={phoneSystemType}
                  onValueChange={(value) => {
                    setPhoneSystemType(value as PhoneSystemType);
                    setSelectedProvider("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cell">Cell Phone Networks</SelectItem>
                    <SelectItem value="voip">VOIP & Web Phone Systems</SelectItem>
                    <SelectItem value="landline">Landline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-semibold mb-2 block">Select Your Provider</label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {getProviderOptions().map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="p-6 bg-muted/30">
              {renderInstructions()}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const getInstructionsForProvider = (provider: string) => {
  const instructions: Record<string, {
    content: JSX.Element;
    notes?: string[];
    detailedLink?: string;
  }> = {
    "AT&T": {
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold mb-2">Unconditional Forwarding (All Calls):</p>
            <p>Dial: <span className="text-primary font-mono">**21*{CHOOPIL_NUMBER_RAW}#</span></p>
            <p>Press <span className="text-primary">Call</span>. You'll hear a confirmation tone.</p>
          </div>

          <div>
            <p className="font-semibold mb-2">Conditional Forwarding:</p>
            <p className="mb-1">Set each one up separately:</p>
            <ul className="ml-4 space-y-1">
              <li>If busy: <span className="text-primary font-mono">**67*{CHOOPIL_NUMBER_RAW}#</span></li>
              <li>If no answer: <span className="text-primary font-mono">**61*{CHOOPIL_NUMBER_RAW}#</span></li>
              <li>If unreachable: <span className="text-primary font-mono">**62*{CHOOPIL_NUMBER_RAW}#</span></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">To Disable Forwarding:</p>
            <ul className="ml-4 space-y-1">
              <li>Disable all forwarding configuration: <span className="text-primary font-mono">##21#</span></li>
              <li>Disable busy forwarding: <span className="text-primary font-mono">##67#</span></li>
              <li>Disable no answer forwarding: <span className="text-primary font-mono">##61#</span></li>
              <li>Disable unreachable forwarding: <span className="text-primary font-mono">##62#</span></li>
            </ul>
          </div>
        </div>
      ),
      notes: [
        "iPhone users can go to Settings > Phone > Call Forwarding",
        "Conditional forwarding requires dial codes",
        "Works on AT&T and most MVNOs",
        "⚠️ iPhone users: Make sure Live Voicemail is turned off"
      ]
    },
    "Verizon": {
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold mb-2">Unconditional Forwarding (All Calls):</p>
            <p>Dial: <span className="text-primary font-mono">*72{CHOOPIL_NUMBER_RAW}</span></p>
            <p>Press <span className="text-primary">Call</span>. You may hear a confirmation tone.</p>
          </div>

          <div>
            <p className="font-semibold mb-2">Conditional Forwarding:</p>
            <p className="mb-1">Set each one up separately:</p>
            <ul className="ml-4 space-y-1">
              <li>If busy: <span className="text-primary font-mono">*90{CHOOPIL_NUMBER_RAW}</span></li>
              <li>If no answer: <span className="text-primary font-mono">*92{CHOOPIL_NUMBER_RAW}</span></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">To Disable Forwarding:</p>
            <ul className="ml-4">
              <li>Disable all forwarding configuration: <span className="text-primary font-mono">*73</span></li>
            </ul>
            <p className="mt-2 text-muted-foreground">➤ Verizon does not support disabling individual conditional rules.</p>
          </div>
        </div>
      ),
      notes: [
        "Verizon does not support the iPhone Call Forwarding toggle—use the dialer",
        "Always test your setup by calling from another phone",
        "⚠️ iPhone users: Make sure Live Voicemail is turned off"
      ]
    },
    "T-Mobile": {
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold mb-2">Unconditional Forwarding (All Calls):</p>
            <p>Dial: <span className="text-primary font-mono">**21*{CHOOPIL_NUMBER_RAW}#</span></p>
            <p>Press <span className="text-primary">Call</span>.</p>
          </div>

          <div>
            <p className="font-semibold mb-2">Conditional Forwarding:</p>
            <p className="mb-1">Set each one up separately:</p>
            <ul className="ml-4 space-y-1">
              <li>If busy: <span className="text-primary font-mono">**67*{CHOOPIL_NUMBER_RAW}#</span></li>
              <li>If no answer: <span className="text-primary font-mono">**61*{CHOOPIL_NUMBER_RAW}#</span></li>
              <li>If unreachable: <span className="text-primary font-mono">**62*{CHOOPIL_NUMBER_RAW}#</span></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">To Disable Forwarding:</p>
            <ul className="ml-4 space-y-1">
              <li>Disable all forwarding configuration: <span className="text-primary font-mono">##21#</span></li>
              <li>Disable busy forwarding: <span className="text-primary font-mono">##67#</span></li>
              <li>Disable no answer forwarding: <span className="text-primary font-mono">##61#</span></li>
              <li>Disable unreachable forwarding: <span className="text-primary font-mono">##62#</span></li>
            </ul>
          </div>
        </div>
      ),
      notes: [
        "iPhone users can use Settings > Phone > Call Forwarding to turn on unconditional forwarding",
        "Conditional setup requires dial codes",
        "Applies to T-Mobile and MVNOs like Metro, Mint, and Ultra",
        "⚠️ iPhone users: Make sure Live Voicemail is turned off"
      ]
    },
    "Boost Mobile": {
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold mb-2">Unconditional Forwarding (All Calls):</p>
            <p>Dial: <span className="text-primary font-mono">*72{CHOOPIL_NUMBER_RAW}</span></p>
            <p>Press <span className="text-primary">Call</span>.</p>
          </div>

          <div>
            <p className="font-semibold mb-2">Conditional Forwarding:</p>
            <p className="text-muted-foreground">Not reliably supported. Most Boost users only have access to unconditional forwarding.</p>
          </div>

          <div>
            <p className="font-semibold mb-2">To Disable Forwarding:</p>
            <ul className="ml-4">
              <li>Disable all forwarding: <span className="text-primary font-mono">*73</span> or <span className="text-primary font-mono">*720</span></li>
            </ul>
          </div>
        </div>
      ),
      notes: [
        "Boost Mobile does not support iPhone's call forwarding settings—use dial codes only",
        "Behavior may vary by device model or region",
        "⚠️ iPhone users: Make sure Live Voicemail is turned off"
      ]
    },
    "Sprint": {
      content: (
        <div className="space-y-4 text-sm">
          <div className="bg-warning/10 p-3 rounded-md mb-4">
            <p className="text-sm">⚠️ Sprint has merged with T-Mobile, but if you're still on an older Sprint plan or device, use the instructions below.</p>
          </div>

          <div>
            <p className="font-semibold mb-2">Unconditional Forwarding (All Calls):</p>
            <p>Dial: <span className="text-primary font-mono">*72{CHOOPIL_NUMBER_RAW}</span></p>
            <p>Press <span className="text-primary">Call</span>. You should hear a confirmation tone.</p>
          </div>

          <div>
            <p className="font-semibold mb-2">Conditional Forwarding:</p>
            <p className="mb-1">Set each one up separately:</p>
            <ul className="ml-4 space-y-1">
              <li>If busy: <span className="text-primary font-mono">*73{CHOOPIL_NUMBER_RAW}</span></li>
              <li>If no answer: <span className="text-primary font-mono">*74{CHOOPIL_NUMBER_RAW}</span></li>
              <li>If unreachable: <span className="text-primary font-mono">*75{CHOOPIL_NUMBER_RAW}</span></li>
            </ul>
            <p className="mt-2 text-muted-foreground text-xs">⚠️ These may not be available on all Sprint plans or devices—test to confirm.</p>
          </div>

          <div>
            <p className="font-semibold mb-2">To Disable Forwarding:</p>
            <ul className="ml-4">
              <li>Disable all forwarding configuration: <span className="text-primary font-mono">*720</span></li>
            </ul>
            <p className="mt-2 text-muted-foreground text-xs">Conditional disable codes are not consistently supported on Sprint legacy plans</p>
          </div>
        </div>
      ),
      notes: [
        "Sprint forwarding setup is done via dialer only—no app or settings-based option",
        "Most users on Sprint have been migrated to T-Mobile and should follow T-Mobile's setup instructions",
        "⚠️ iPhone users: Make sure Live Voicemail is turned off"
      ]
    },
    "Other": {
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold mb-2">Unconditional Forwarding (All Calls):</p>
            <p>Dial: <span className="text-primary font-mono">*72{CHOOPIL_NUMBER_RAW}</span></p>
            <p>Press <span className="text-primary">Call</span> or wait for confirmation (you may hear a tone or voice prompt)</p>
          </div>

          <div>
            <p className="font-semibold mb-2">To Disable Forwarding:</p>
            <ul className="ml-4">
              <li>Disable all forwarding: <span className="text-primary font-mono">*73</span></li>
            </ul>
          </div>
        </div>
      ),
      notes: [
        "Not seeing your phone system's provider? Reach out to them directly for forwarding instructions. If you still need help, reach out to Choopil Support - we'd be happy to assist."
      ]
    },
    "OpenPhone": {
      content: (
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-primary" />
            <a href="https://support.openphone.com/en/articles/6149763-how-to-forward-calls-and-texts" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Full setup instructions from OpenPhone support
            </a>
          </div>

          <div>
            <p className="font-semibold mb-2">Unconditional Forwarding (All Calls):</p>
            <ol className="ml-4 space-y-1 list-decimal">
              <li>Click <span className="text-primary">Settings</span> from the left-hand menu</li>
              <li>Under <span className="text-primary">Workspace</span>, click <span className="text-primary">Phone Numbers</span></li>
              <li>Select the phone number you want to forward</li>
              <li>In the <span className="text-primary">Call flow</span> section, select <span className="text-primary">Forward all calls</span></li>
              <li>Add your Choopil number: <span className="text-primary font-mono">{CHOOPIL_NUMBER_RAW}</span> and click <span className="text-primary">Forward</span></li>
            </ol>
          </div>

          <div>
            <p className="font-semibold mb-2">Conditional Forwarding:</p>
            <p className="mb-2">To forward calls only at specific times or if unanswered:</p>
            
            <p className="font-medium mt-3 mb-1">For forwarding outside business hours:</p>
            <ul className="ml-4 space-y-1">
              <li>Go to <span className="text-primary">Call flow settings</span></li>
              <li>Click <span className="text-primary">Business hours</span></li>
              <li>Under <span className="text-primary">Outside business hours</span>, add the Choopil number you want forward to</li>
            </ul>

            <p className="font-medium mt-3 mb-1">For forwarding during business hours (unanswered calls):</p>
            <ul className="ml-4 space-y-1">
              <li>In <span className="text-primary">Call flow</span>, scroll to the <span className="text-primary">Unanswered calls</span> section</li>
              <li>Under <span className="text-primary">When no one answers</span>, select <span className="text-primary">Forward to another number</span></li>
              <li>Enter your Choopil number: <span className="text-primary font-mono">{CHOOPIL_NUMBER_RAW}</span></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">To Disable Forwarding:</p>
            <ul className="ml-4">
              <li>Return to your call flow settings and remove or turn off the forwarding rule</li>
            </ul>
          </div>
        </div>
      ),
      notes: [
        "OpenPhone supports granular routing based on time of day and availability",
        "Forwarding settings apply per phone number"
      ],
      detailedLink: "https://support.openphone.com/en/articles/6149763-how-to-forward-calls-and-texts"
    },
    "RingCentral": {
      content: (
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-primary" />
            <a href="https://support.ringcentral.com/article-v2/How-to-set-up-Call-Forwarding.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Full setup instructions from RingCentral support
            </a>
          </div>

          <div>
            <p className="font-semibold mb-2">Unconditional Forwarding (All Calls):</p>
            <ol className="ml-4 space-y-1 list-decimal">
              <li>Click your <span className="text-primary">profile picture</span> at the top left</li>
              <li>Click <span className="text-primary">Call rules</span></li>
              <li>Toggle on <span className="text-primary">Forward all calls</span></li>
              <li>Click <span className="text-primary">Save</span></li>
            </ol>
          </div>

          <div>
            <p className="font-semibold mb-2">Conditional Forwarding:</p>
            <p className="mb-2">To forward calls based on a schedule:</p>
            <ol className="ml-4 space-y-1 list-decimal">
              <li>Click your <span className="text-primary">profile picture</span> at the top left</li>
              <li>Click <span className="text-primary">Call rules</span></li>
              <li>Click <span className="text-primary">Add schedule</span></li>
              <li>Use the date and time selectors to set when you want calls forwarded</li>
              <li>Click <span className="text-primary">Save</span></li>
            </ol>
          </div>

          <div>
            <p className="font-semibold mb-2">To Disable Forwarding:</p>
            <ul className="ml-4">
              <li>Go to <span className="text-primary">Call rules</span> and toggle off <span className="text-primary">Forward all calls</span> or remove any active schedule</li>
            </ul>
          </div>
        </div>
      ),
      notes: [
        "RingCentral supports detailed routing and scheduling logic via the app or admin portal",
        "Settings apply per user or extension"
      ],
      detailedLink: "https://support.ringcentral.com/article-v2/How-to-set-up-Call-Forwarding.html"
    },
    "Google Voice": {
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold mb-2">Unconditional Forwarding (All Calls):</p>
            <p className="mb-2">To forward calls from Google Voice to Choopil, you'll need to link your Choopil number and verify it.</p>

            <ol className="ml-4 space-y-1 list-decimal mb-2">
              <li>Log into your <span className="text-primary">Choopil Admin</span> and go to <span className="text-primary">Account &gt; Account Settings</span></li>
              <li>Enable the <span className="text-primary">"Call Forwarding Verification - SMS authentication code"</span> toggle</li>
            </ol>

            <p className="font-medium mt-3 mb-1">For Desktop:</p>
            <ol className="ml-4 space-y-1 list-decimal">
              <li>In a new tab, go to <span className="text-primary">Google Voice</span></li>
              <li>In the top right, click the <span className="text-primary">Settings gear icon</span></li>
              <li>Under <span className="text-primary">Account &gt; Linked numbers</span>, click <span className="text-primary">New linked number</span></li>
              <li>Enter your Choopil number: <span className="text-primary font-mono">{CHOOPIL_NUMBER_RAW}</span> and click <span className="text-primary">Send code</span></li>
              <li>Return to the <span className="text-primary">Choopil Admin &gt; Account Settings</span> tab and click <span className="text-primary">View text messages</span></li>
              <li>This will open a window displaying any verification codes sent to your Choopil number</li>
              <li>Back in Google Voice, enter the code received and click <span className="text-primary">Verify</span></li>
              <li>Once verified, go to <span className="text-primary">Settings &gt; Calls</span></li>
              <li>Under <span className="text-primary">Incoming calls</span>, ensure <span className="text-primary">Call Forwarding</span> is enabled for your linked Choopil phone number</li>
              <li>Return to the <span className="text-primary">Choopil Admin</span> and disable verification code toggle</li>
            </ol>

            <p className="font-medium mt-3 mb-1">For Device App:</p>
            <ol className="ml-4 space-y-1 list-decimal">
              <li>Open <span className="text-primary">Google Voice app</span> on your device and go to settings (three bars hamburger menu in top left corner)</li>
              <li>Tap into <span className="text-primary">'Devices and numbers'</span></li>
              <li>Tap <span className="text-primary">'New linked number'</span></li>
              <li>Input your Choopil phone number: <span className="text-primary font-mono">{CHOOPIL_NUMBER_RAW}</span> and <span className="text-primary">uncheck the 'number belongs to this device' option</span></li>
              <li>click <span className="text-primary">Send code</span></li>
              <li>Return to the <span className="text-primary">Choopil Admin &gt; Account Settings</span> tab and click <span className="text-primary">View text messages</span></li>
              <li>This will open a window displaying any verification codes sent to your Choopil number</li>
              <li>Remember to disable verification code toggle</li>
              <li>Back in Google Voice App, enter the code received and tap <span className="text-primary">Verify</span></li>
              <li>Google voice automatically enables call forwarding when you link a number, however it's best to double check</li>
              <li>In the Google Voice app, tap back out of <span className="text-primary">Devices and numbers</span></li>
              <li>Still within settings, tap into <span className="text-primary">'Incoming Calls'</span></li>
              <li>Ensure call forwarding toggle is enabled for your linked Choopil phone number</li>
            </ol>
          </div>

          <div>
            <p className="font-semibold mb-2">Conditional Forwarding:</p>
            <p className="text-muted-foreground">Not supported. Google Voice only allows full (unconditional) call forwarding.</p>
          </div>

          <div>
            <p className="font-semibold mb-2">To Disable Forwarding:</p>
            <ul className="ml-4 space-y-1">
              <li>Toggle it off under <span className="text-primary">Settings &gt; Calls &gt; Incoming calls</span></li>
              <li>Or go to <span className="text-primary">Settings &gt; Linked numbers</span> and remove the Choopil number</li>
            </ul>
          </div>
        </div>
      ),
      notes: [
        "You must verify your Choopil number before Google Voice will forward to it",
        "Setup must be completed via web browser, not the mobile app",
        "Call forwarding options vary depending on paid/free version"
      ]
    },
    "Zoom Phone": {
      content: (
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-primary" />
            <a href="https://support.zoom.us/hc/en-us/articles/360042127891-Setting-up-call-forwarding" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Full setup instructions from Zoom Phone support
            </a>
          </div>

          <div>
            <p className="font-semibold mb-2">Unconditional Forwarding (All Calls):</p>
            <ol className="ml-4 space-y-1 list-decimal">
              <li>Sign in to Zoom web portal</li>
              <li>Click <span className="text-primary">Phone</span> in the navigation menu</li>
              <li>Go to the <span className="text-primary">Settings</span> tab</li>
              <li>Under <span className="text-primary">Business Hours</span> or <span className="text-primary">Closed Hours</span>, click <span className="text-primary">Edit</span> next to <span className="text-primary">Call Handling</span></li>
              <li>Click <span className="text-primary">Add Phone Number</span> to forward to external number</li>
              <li>Enter country/region, phone number: <span className="text-primary font-mono">{CHOOPIL_NUMBER_RAW}</span>, and description</li>
              <li>Click <span className="text-primary">Save</span></li>
            </ol>
          </div>

          <div>
            <p className="font-semibold mb-2">Conditional Forwarding:</p>
            <p className="mb-2">Zoom Phone supports forwarding based on:</p>
            <ul className="ml-4 space-y-1">
              <li>Business Hours</li>
              <li>Closed Hours</li>
              <li>Break Hours</li>
              <li>Holiday Hours</li>
            </ul>
            <p className="mt-2">Set different call handling rules for each time period by editing individually.</p>
          </div>

          <div>
            <p className="font-semibold mb-2">To Disable Forwarding:</p>
            <ul className="ml-4">
              <li>Return to <span className="text-primary">Call Handling</span> settings for the relevant time period</li>
              <li>Remove external number or toggle off forwarding</li>
            </ul>
          </div>
        </div>
      ),
      notes: [
        "If you're unable to add an external number, your Zoom admin may need to allow it"
      ],
      detailedLink: "https://support.zoom.us/hc/en-us/articles/360042127891-Setting-up-call-forwarding"
    },
    "General Instructions": {
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold mb-2">Unconditional Forwarding (All Calls):</p>
            <p>Dial: <span className="text-primary font-mono">*72{CHOOPIL_NUMBER_RAW}</span></p>
            <p>Press <span className="text-primary">Call</span> or wait for confirmation (you may hear a tone or voice prompt)</p>
          </div>

          <div>
            <p className="font-semibold mb-2">To Disable Forwarding:</p>
            <ul className="ml-4">
              <li>Disable all forwarding configuration: <span className="text-primary font-mono">*73</span></li>
            </ul>
          </div>
        </div>
      ),
      notes: [
        "These dial codes work for most traditional landline providers in the U.S. (e.g., AT&T Landline, CenturyLink, Frontier)",
        "If *72 or *73 doesn't work, contact your landline provider's support or check your phone bill for the carrier name",
        "These codes are entered just like making a phone call—no special settings or app needed"
      ]
    }
  };

  return instructions[provider] || { content: <div>No instructions available</div> };
};

export default LaunchInstructions;
