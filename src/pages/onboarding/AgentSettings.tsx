import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Plus, Trash2, ChevronDown, Phone, MessageSquare, Bell, Shield } from "lucide-react";

export default function AgentSettings() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Page 1 states
  const [assistantName, setAssistantName] = useState("Kate from Australia");
  const [greeting, setGreeting] = useState(
    "You've reached [Business Name]. How can I help you today?"
  );
  const [collectInfo, setCollectInfo] = useState({
    fullName: true,
    phoneNumber: true,
    emailAddress: false,
  });
  
  const [questions, setQuestions] = useState([
    "What type of event are you planning (wedding, party, corporate, private, etc.)?",
    "What date and time is your event scheduled for?"
  ]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  // Page 2 states
  const [spamDetection, setSpamDetection] = useState(true);
  const [block1800, setBlock1800] = useState(false);
  const [callFilterOpen, setCallFilterOpen] = useState(false);
  const [callTransferOpen, setCallTransferOpen] = useState(false);
  const [textMessageOpen, setTextMessageOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  // Call Transfer states
  const [savedTransfers, setSavedTransfers] = useState<Array<{
    id: string;
    scenario: string;
    phone: string;
    countryCode: string;
    response: string;
  }>>([]);
  const [transferScenario, setTransferScenario] = useState("");
  const [transferPhone, setTransferPhone] = useState("");
  const [transferCountryCode, setTransferCountryCode] = useState("+1");
  const [transferResponse, setTransferResponse] = useState("Please hold while I transfer your call.");
  
  // Text Message states
  const [savedTextMessages, setSavedTextMessages] = useState<Array<{
    id: string;
    trigger: string;
    message: string;
  }>>([]);
  const [textTrigger, setTextTrigger] = useState("");
  const [textMessage, setTextMessage] = useState("");

  // Notify Me states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [emailAddress, setEmailAddress] = useState("talavtur111@gmail.com");
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [smsPhone, setSmsPhone] = useState("");
  const [smsCountryCode, setSmsCountryCode] = useState("+1");

  const handleBack = () => {
    if (currentPage === 2) {
      setCurrentPage(1);
    } else {
      navigate("/onboarding/voice");
    }
  };

  const handleNext = () => {
    if (currentPage === 1) {
      setCurrentPage(2);
    } else {
      navigate("/onboarding/phone");
    }
  };

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
      setShowAddQuestion(false);
    }
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const saveTransfer = () => {
    if (transferScenario.trim() && transferPhone.trim()) {
      setSavedTransfers([...savedTransfers, {
        id: Date.now().toString(),
        scenario: transferScenario,
        phone: transferPhone,
        countryCode: transferCountryCode,
        response: transferResponse
      }]);
      // Clear fields
      setTransferScenario("");
      setTransferPhone("");
      setTransferResponse("Please hold while I transfer your call.");
    }
  };

  const deleteTransfer = (id: string) => {
    setSavedTransfers(savedTransfers.filter(t => t.id !== id));
  };

  const saveTextMessage = () => {
    if (textTrigger.trim() && textMessage.trim()) {
      setSavedTextMessages([...savedTextMessages, {
        id: Date.now().toString(),
        trigger: textTrigger,
        message: textMessage
      }]);
      // Clear fields
      setTextTrigger("");
      setTextMessage("");
    }
  };

  const deleteTextMessage = (id: string) => {
    setSavedTextMessages(savedTextMessages.filter(t => t.id !== id));
  };

  const charCount = greeting.length;
  const textMessageCharCount = textMessage.length;

  return (
    <OnboardingLayout
      currentStep={2}
      onBack={handleBack}
      onNext={handleNext}
      nextLabel={currentPage === 1 ? "Next" : "Continue"}
    >
      <div className="space-y-8">
        {/* Page indicator */}
        <div className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            {currentPage}/2
          </div>
        </div>

        {currentPage === 1 ? (
          // Page 1: Core Personalization
          <>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Core Personalization
              </h1>
              <p className="text-muted-foreground">Personalize your Assistant</p>
            </div>

            <div className="space-y-8">
              {/* Assistant Name */}
              <div className="space-y-2">
                <Label htmlFor="assistantName" className="text-foreground">
                  Assistant name
                </Label>
                <Input
                  id="assistantName"
                  value={assistantName}
                  onChange={(e) => setAssistantName(e.target.value)}
                  placeholder="Assistant name"
                />
              </div>

              {/* Greeting */}
              <div className="space-y-2">
                <Label htmlFor="greeting" className="text-foreground">
                  Greeting
                </Label>
                <Textarea
                  id="greeting"
                  value={greeting}
                  onChange={(e) => {
                    if (e.target.value.length <= 280) {
                      setGreeting(e.target.value);
                    }
                  }}
                  className="min-h-[80px] resize-none"
                  maxLength={280}
                />
                <div className="flex justify-end">
                  <p className="text-sm text-muted-foreground">{charCount}/280</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  type="button"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Hear Assistant greeting
                </Button>
              </div>

              {/* Information gathering */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium text-foreground mb-1">
                    Information gathering from caller
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You can add or remove questions later
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="fullName"
                      checked={collectInfo.fullName}
                      onCheckedChange={(checked) =>
                        setCollectInfo({ ...collectInfo, fullName: checked === true })
                      }
                      className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label
                      htmlFor="fullName"
                      className="text-sm font-normal text-foreground cursor-pointer"
                    >
                      Full name
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="phoneNumber"
                      checked={collectInfo.phoneNumber}
                      onCheckedChange={(checked) =>
                        setCollectInfo({ ...collectInfo, phoneNumber: checked === true })
                      }
                      className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label
                      htmlFor="phoneNumber"
                      className="text-sm font-normal text-foreground cursor-pointer"
                    >
                      Phone number
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="emailAddress"
                      checked={collectInfo.emailAddress}
                      onCheckedChange={(checked) =>
                        setCollectInfo({ ...collectInfo, emailAddress: checked === true })
                      }
                      className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label
                      htmlFor="emailAddress"
                      className="text-sm font-normal text-foreground cursor-pointer"
                    >
                      Email address
                    </Label>
                  </div>
                </div>
              </div>

              {/* What questions should be asked */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium text-foreground mb-1">
                    What questions should the AI assistant ask? <span className="text-destructive">*</span>
                  </h3>
                </div>

                <div className="space-y-3">
                  {questions.map((question, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border"
                    >
                      <p className="flex-1 text-sm text-foreground">{question}</p>
                      <button
                        onClick={() => deleteQuestion(index)}
                        className="text-destructive hover:text-destructive/80 transition-colors p-1"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}

                  {showAddQuestion ? (
                    <div className="space-y-2 p-4 border-2 border-dashed border-orange rounded-lg">
                      <Textarea
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Enter your question..."
                        className="min-h-[80px]"
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={addQuestion}
                          className="flex-1"
                          variant="default"
                        >
                          Save
                        </Button>
                        <Button 
                          onClick={() => {
                            setShowAddQuestion(false);
                            setNewQuestion("");
                          }}
                          variant="outline"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddQuestion(true)}
                      className="w-full p-4 border-2 border-dashed border-orange rounded-lg text-orange hover:bg-orange/5 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="h-5 w-5" />
                      <span className="font-medium">Add Question</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          // Page 2: Advanced Features
          <>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Advanced Features
              </h1>
              <p className="text-muted-foreground">Add advanced capabilities to your assistant</p>
            </div>

            <div className="space-y-4">
              {/* Call Filtering */}
              <Collapsible open={callFilterOpen} onOpenChange={setCallFilterOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground">Call Filtering</h3>
                        <p className="text-sm text-muted-foreground">Block spam and unwanted calls</p>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${callFilterOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-6 border-x border-b border-border rounded-b-lg space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Spam detection</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        If a call looks like spam, we hang up. We also block numbers from known spammers.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="spamDetection" className="text-sm">
                        Detect and block spam calls
                      </Label>
                      <Switch
                        id="spamDetection"
                        checked={spamDetection}
                        onCheckedChange={setSpamDetection}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="block1800" className="text-sm">
                        Block 1-800 numbers
                      </Label>
                      <Switch
                        id="block1800"
                        checked={block1800}
                        onCheckedChange={setBlock1800}
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Call Transfer */}
              <Collapsible open={callTransferOpen} onOpenChange={setCallTransferOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-success" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground">Call Transfer</h3>
                        <p className="text-sm text-muted-foreground">Transfer calls to another number</p>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${callTransferOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-6 border-x border-b border-border rounded-b-lg space-y-4">
                    {/* Saved Transfers */}
                    {savedTransfers.map((transfer) => (
                      <Collapsible key={transfer.id}>
                        <div className="border border-success/30 rounded-lg overflow-hidden">
                          <CollapsibleTrigger className="w-full p-4 bg-success/5 hover:bg-success/10 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <ChevronDown className="h-4 w-4 text-success" />
                              <span className="text-sm font-medium text-foreground truncate">{transfer.scenario}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTransfer(transfer.id);
                              }}
                              className="text-destructive hover:text-destructive/80 transition-colors p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="p-4 space-y-3 bg-background">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Phone Number</p>
                                <p className="text-sm text-foreground">{transfer.countryCode} {transfer.phone}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Voice Response</p>
                                <p className="text-sm text-foreground">{transfer.response}</p>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    ))}

                    {/* Add New Transfer Form */}
                    <div className="p-4 bg-success/5 rounded-lg space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="transferScenario" className="text-foreground">
                          Scenario Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="transferScenario"
                          value={transferScenario}
                          onChange={(e) => setTransferScenario(e.target.value)}
                          placeholder="e.g., 'When customer asks for technical support' or 'When customer wants to speak to sales'"
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="transferPhone" className="text-foreground">
                          Phone Number
                        </Label>
                        <div className="flex gap-3">
                          <Select value={transferCountryCode} onValueChange={setTransferCountryCode}>
                            <SelectTrigger className="w-[100px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-popover">
                              <SelectItem value="+1">🇺🇸 +1</SelectItem>
                              <SelectItem value="+44">🇬🇧 +44</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            id="transferPhone"
                            value={transferPhone}
                            onChange={(e) => setTransferPhone(e.target.value)}
                            placeholder="Phone number"
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="transferResponse" className="text-foreground">
                          Voice Response
                        </Label>
                        <Textarea
                          id="transferResponse"
                          value={transferResponse}
                          onChange={(e) => setTransferResponse(e.target.value)}
                          placeholder="Please hold while I transfer your call."
                          className="min-h-[80px]"
                        />
                      </div>

                      <Button 
                        onClick={saveTransfer}
                        className="w-full bg-success hover:bg-success/90"
                        disabled={!transferScenario.trim() || !transferPhone.trim()}
                      >
                        Save
                      </Button>
                    </div>

                    <button
                      onClick={() => {
                        setTransferScenario("");
                        setTransferPhone("");
                        setTransferResponse("Please hold while I transfer your call.");
                      }}
                      className="w-full p-4 border-2 border-dashed border-success rounded-lg text-success hover:bg-success/5 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="h-5 w-5" />
                      <span className="font-medium">Add Another Transfer Workflow</span>
                    </button>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Send Text Messages */}
              <Collapsible open={textMessageOpen} onOpenChange={setTextMessageOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground">Send Text Messages</h3>
                        <p className="text-sm text-muted-foreground">Automatically text callers</p>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${textMessageOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-6 border-x border-b border-border rounded-b-lg space-y-4">
                    {/* Saved Text Messages */}
                    {savedTextMessages.map((msg) => (
                      <Collapsible key={msg.id}>
                        <div className="border border-purple-500/30 rounded-lg overflow-hidden">
                          <CollapsibleTrigger className="w-full p-4 bg-purple-50 dark:bg-purple-950/20 hover:bg-purple-100 dark:hover:bg-purple-950/30 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <ChevronDown className="h-4 w-4 text-purple-500" />
                              <span className="text-sm font-medium text-foreground truncate">{msg.trigger}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTextMessage(msg.id);
                              }}
                              className="text-destructive hover:text-destructive/80 transition-colors p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="p-4 bg-background">
                              <p className="text-xs text-muted-foreground mb-1">Message</p>
                              <p className="text-sm text-foreground whitespace-pre-wrap">{msg.message}</p>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    ))}

                    {/* Add New Text Message Form */}
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="textTrigger" className="text-foreground">
                          When should this text be sent? <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="textTrigger"
                          value={textTrigger}
                          onChange={(e) => setTextTrigger(e.target.value)}
                          placeholder="e.g., 'When customer asks about hours' or 'When customer requests a quote'"
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="textMessage" className="text-foreground">
                          What message should be sent? <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="textMessage"
                          value={textMessage}
                          onChange={(e) => {
                            if (e.target.value.length <= 1000) {
                              setTextMessage(e.target.value);
                            }
                          }}
                          placeholder="Enter the text message to send..."
                          className="min-h-[120px]"
                          maxLength={1000}
                        />
                        <p className="text-sm text-muted-foreground">
                          Max 1000 characters allowed ({textMessageCharCount}/1000)
                        </p>
                      </div>

                      <Button 
                        onClick={saveTextMessage}
                        className="w-full bg-purple-500 hover:bg-purple-600"
                        disabled={!textTrigger.trim() || !textMessage.trim()}
                      >
                        Save
                      </Button>
                    </div>

                    <button
                      onClick={() => {
                        setTextTrigger("");
                        setTextMessage("");
                      }}
                      className="w-full p-4 border-2 border-dashed border-purple-500 rounded-lg text-purple-500 hover:bg-purple-500/5 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="h-5 w-5" />
                      <span className="font-medium">Add Another Text Workflow</span>
                    </button>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Notify Me */}
              <Collapsible open={notifyOpen} onOpenChange={setNotifyOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange/10 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-orange" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground">Notify me</h3>
                        <p className="text-sm text-muted-foreground">Get alerts when calls are received</p>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${notifyOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-6 border-x border-b border-border rounded-b-lg space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        Enable notifications to be alerted when {assistantName.split(' ')[0]} answers a call.
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">Email Notifications</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${emailNotifications ? 'bg-success text-white' : 'bg-destructive text-white'}`}>
                            {emailNotifications ? 'ON' : 'OFF'}
                          </span>
                        </div>
                        <Switch
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      {emailNotifications && (
                        <Input
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          placeholder="email@example.com"
                          type="email"
                        />
                      )}

                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">Text Message Notifications</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${smsNotifications ? 'bg-success text-white' : 'bg-destructive text-white'}`}>
                            {smsNotifications ? 'ON' : 'OFF'}
                          </span>
                        </div>
                        <Switch
                          checked={smsNotifications}
                          onCheckedChange={setSmsNotifications}
                        />
                      </div>
                      {smsNotifications && (
                        <div className="space-y-2">
                          <Label htmlFor="smsPhone" className="text-foreground">
                            Phone Number
                          </Label>
                          <div className="flex gap-3">
                            <Select value={smsCountryCode} onValueChange={setSmsCountryCode}>
                              <SelectTrigger className="w-[100px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-popover">
                                <SelectItem value="+1">🇺🇸 +1</SelectItem>
                                <SelectItem value="+44">🇬🇧 +44</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              id="smsPhone"
                              value={smsPhone}
                              onChange={(e) => setSmsPhone(e.target.value)}
                              placeholder="Phone number"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <Button variant="outline" className="w-full">
                      Make changes
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </>
        )}
      </div>
    </OnboardingLayout>
  );
}
