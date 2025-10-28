import { Button } from "@/components/ui/button";
import { Plus, User, Trash2, HelpCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

interface NotificationPerson {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  emailNotification: "off" | "on";
  smsNotification: "off" | "on";
  customCondition: boolean;
  spamEmail: boolean;
  spamSMS: boolean;
  blockedEmail: boolean;
  blockedSMS: boolean;
  hungUpEmail: boolean;
  hungUpSMS: boolean;
}

const initialPeople: NotificationPerson[] = [
  {
    id: 1,
    name: "DJ Esaz",
    emailNotification: "on",
    smsNotification: "on",
    customCondition: false,
    spamEmail: false,
    spamSMS: false,
    blockedEmail: false,
    blockedSMS: false,
    hungUpEmail: false,
    hungUpSMS: false,
  },
];

export default function Notifications() {
  const [people, setPeople] = useState<NotificationPerson[]>(initialPeople);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emailNotification: "off" as "off" | "on",
    smsNotification: "off" as "off" | "on",
    spamEmail: false,
    spamSMS: false,
    blockedEmail: false,
    blockedSMS: false,
    hungUpEmail: false,
    hungUpSMS: false,
  });

  // Validation functions
  const isValidEmail = (email: string) => {
    return email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    return phone.trim() !== "";
  };

  const showEmailError = formData.emailNotification === "on" && !isValidEmail(formData.email);
  const showPhoneError = formData.smsNotification === "on" && !isValidPhone(formData.phone);

  const handleAddPerson = () => {
    if (formData.name.trim()) {
      const newPerson: NotificationPerson = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        emailNotification: formData.emailNotification,
        smsNotification: formData.smsNotification,
        customCondition: false,
        spamEmail: formData.spamEmail,
        spamSMS: formData.spamSMS,
        blockedEmail: formData.blockedEmail,
        blockedSMS: formData.blockedSMS,
        hungUpEmail: formData.hungUpEmail,
        hungUpSMS: formData.hungUpSMS,
      };
      setPeople([...people, newPerson]);
      setIsDialogOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        emailNotification: "off",
        smsNotification: "off",
        spamEmail: false,
        spamSMS: false,
        blockedEmail: false,
        blockedSMS: false,
        hungUpEmail: false,
        hungUpSMS: false,
      });
    }
  };

  const handleDelete = (id: number) => {
    setPeople(people.filter(p => p.id !== id));
  };

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

      <Button className="mb-6" onClick={() => setIsDialogOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add person or department
      </Button>

      <div className="space-y-3">
        {people.map((person) => (
          <div key={person.id} className="border rounded-lg p-4 bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{person.name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {person.emailNotification !== "off" && (
                  <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
                    EMAIL
                  </Badge>
                )}
                {person.smsNotification !== "off" && (
                  <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
                    SMS
                  </Badge>
                )}
                {person.customCondition && (
                  <Button variant="ghost" size="sm">
                    CUSTOM CONDITIONS
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDelete(person.id)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Who should be notified about calls?</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g., Support, Sales, Thomas Anderson"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Name of the person or department receiving the notifications
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={showEmailError ? "border-red-500" : ""}
                />
                {showEmailError && (
                  <div className="flex items-center gap-1 text-red-500" style={{ fontSize: '12px' }}>
                    <X className="h-3 w-3" />
                    <span>Please provide a valid email</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <div className="flex gap-2">
                  <Select defaultValue="+1">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">+1</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    placeholder="(919) 555-2171"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={showPhoneError ? "border-red-500" : ""}
                  />
                </div>
                {showPhoneError && (
                  <div className="flex items-center gap-1 text-red-500" style={{ fontSize: '12px' }}>
                    <X className="h-3 w-3" />
                    <span>Please enter a valid phone number in the international format</span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              You must enter either an email, phone number, or both
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={formData.emailNotification === "off" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, emailNotification: "off" })}
                  >
                    Off
                  </Button>
                  <Button
                    type="button"
                    variant={formData.emailNotification === "on" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, emailNotification: "on" })}
                  >
                    On
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>SMS</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={formData.smsNotification === "off" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, smsNotification: "off" })}
                  >
                    Off
                  </Button>
                  <Button
                    type="button"
                    variant={formData.smsNotification === "on" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, smsNotification: "on" })}
                  >
                    On
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Unwanted calls</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  These calls don't count toward your plan. Check the box if you still want notifications about them.
                </p>
              </div>

              <TooltipProvider>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="font-normal">Spam</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-gray-900 text-white">
                          <p>Detected as spam based on the content of the call</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="spam-email"
                          checked={formData.spamEmail}
                          onCheckedChange={(checked) => 
                            setFormData({ ...formData, spamEmail: checked as boolean })
                          }
                        />
                        <label htmlFor="spam-email" className="text-sm">Email</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="spam-sms"
                          checked={formData.spamSMS}
                          onCheckedChange={(checked) => 
                            setFormData({ ...formData, spamSMS: checked as boolean })
                          }
                        />
                        <label htmlFor="spam-sms" className="text-sm">SMS</label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="font-normal">Blocked</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-gray-900 text-white">
                          <p>Calls from numbers you've put on your block list</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="blocked-email"
                          checked={formData.blockedEmail}
                          onCheckedChange={(checked) => 
                            setFormData({ ...formData, blockedEmail: checked as boolean })
                          }
                        />
                        <label htmlFor="blocked-email" className="text-sm">Email</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="blocked-sms"
                          checked={formData.blockedSMS}
                          onCheckedChange={(checked) => 
                            setFormData({ ...formData, blockedSMS: checked as boolean })
                          }
                        />
                        <label htmlFor="blocked-sms" className="text-sm">SMS</label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="font-normal">Hung up</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-gray-900 text-white">
                          <p>Caller didn't say anything or hung up in under 15 seconds</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="hung-email"
                          checked={formData.hungUpEmail}
                          onCheckedChange={(checked) => 
                            setFormData({ ...formData, hungUpEmail: checked as boolean })
                          }
                        />
                        <label htmlFor="hung-email" className="text-sm">Email</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="hung-sms"
                          checked={formData.hungUpSMS}
                          onCheckedChange={(checked) => 
                            setFormData({ ...formData, hungUpSMS: checked as boolean })
                          }
                        />
                        <label htmlFor="hung-sms" className="text-sm">SMS</label>
                      </div>
                    </div>
                  </div>
                </div>
              </TooltipProvider>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-success hover:bg-success/90" onClick={handleAddPerson}>
              Add notifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
