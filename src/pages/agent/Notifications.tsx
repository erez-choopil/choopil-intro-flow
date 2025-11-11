import { Button } from "@/components/ui/button";
import { Plus, User, Trash2, X, Edit, Mail, MessageSquare, Info, ChevronDown, ChevronRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useState } from "react";

interface NotificationPerson {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  frequency: "all" | "follow-up" | "daily";
}

const initialPeople: NotificationPerson[] = [
  {
    id: 1,
    name: "DJ Esaz",
    email: "dj@choopil.com",
    phone: "(919) 555-2171",
    emailEnabled: true,
    smsEnabled: true,
    frequency: "all",
  },
];

export default function Notifications() {
  const [people, setPeople] = useState<NotificationPerson[]>(initialPeople);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<NotificationPerson | null>(null);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [showCannotDeleteAlert, setShowCannotDeleteAlert] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emailEnabled: false,
    smsEnabled: false,
    frequency: "all" as "all" | "follow-up" | "daily",
  });

  // Validation functions
  const isValidEmail = (email: string) => {
    return email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    return phone.trim() !== "";
  };

  const showEmailError = formData.emailEnabled && !isValidEmail(formData.email);
  const showPhoneError = formData.smsEnabled && !isValidPhone(formData.phone);
  const noNotificationMethod = !formData.emailEnabled && !formData.smsEnabled;

  const handleAddPerson = () => {
    // Check if at least one method is selected
    if (noNotificationMethod) {
      setShowValidationAlert(true);
      return;
    }

    // Validate fields
    if (showEmailError || showPhoneError) {
      return;
    }

    if (editingPerson) {
      // Update existing person
      setPeople(people.map(p => p.id === editingPerson.id ? {
        ...editingPerson,
        name: formData.name.trim() || "Unnamed",
        email: formData.email,
        phone: formData.phone,
        emailEnabled: formData.emailEnabled,
        smsEnabled: formData.smsEnabled,
        frequency: formData.frequency,
      } : p));
    } else {
      // Add new person
      const newPerson: NotificationPerson = {
        id: Date.now(),
        name: formData.name.trim() || "Unnamed",
        email: formData.email,
        phone: formData.phone,
        emailEnabled: formData.emailEnabled,
        smsEnabled: formData.smsEnabled,
        frequency: formData.frequency,
      };
      setPeople([...people, newPerson]);
    }
    
    setIsDialogOpen(false);
    setEditingPerson(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      emailEnabled: false,
      smsEnabled: false,
      frequency: "all",
    });
    setIsAdvancedOpen(false);
  };

  const handleEditPerson = (person: NotificationPerson) => {
    setEditingPerson(person);
    setFormData({
      name: person.name,
      email: person.email || "",
      phone: person.phone || "",
      emailEnabled: person.emailEnabled,
      smsEnabled: person.smsEnabled,
      frequency: person.frequency,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    // Prevent deleting the last person
    if (people.length === 1) {
      setShowCannotDeleteAlert(true);
      return;
    }
    setPeople(people.filter(p => p.id !== id));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Set up who gets notified about calls, when they're notified, and how (email or text)
          </p>
        </div>

        <Button className="w-full" size="lg" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add person or department
        </Button>

        <div className="space-y-3">
          {people.map((person) => (
            <div key={person.id} className="border rounded-lg p-4 bg-muted/30">
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
                {person.emailEnabled && (
                  <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
                    EMAIL
                  </Badge>
                )}
                {person.smsEnabled && (
                  <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
                    SMS
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleEditPerson(person)}
                >
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDelete(person.id)}
                  disabled={people.length === 1}
                  className={people.length === 1 ? "cursor-not-allowed opacity-50" : ""}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
            </div>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingPerson(null);
            resetForm();
          }
        }}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPerson ? "Edit Notification Settings" : "Add Call Notifications"}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Context Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>Get notified instantly when callers reach your AI receptionist. You can add multiple people or departments.</p>
                    <div className="space-y-1">
                      <p className="font-medium">Each notification includes:</p>
                      <ul className="space-y-0.5 ml-1">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>Caller name and phone number</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>AI-generated call summary</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>Link to full transcript and recording</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Method Selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium">How do you want to receive notifications? *</Label>
                <div className="space-y-4">
                  {/* Email Checkbox */}
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-input hover:border-primary/50 transition-colors cursor-pointer"
                       onClick={() => setFormData({ ...formData, emailEnabled: !formData.emailEnabled })}>
                    <Checkbox
                      id="email-method"
                      checked={formData.emailEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, emailEnabled: checked as boolean })}
                      className="mt-0.5"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <Label htmlFor="email-method" className="font-medium text-base cursor-pointer">Email notifications</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Get instant email alerts with call details</p>
                    </div>
                  </div>

                  {/* SMS Checkbox */}
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-input hover:border-primary/50 transition-colors cursor-pointer"
                       onClick={() => setFormData({ ...formData, smsEnabled: !formData.smsEnabled })}>
                    <Checkbox
                      id="sms-method"
                      checked={formData.smsEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, smsEnabled: checked as boolean })}
                      className="mt-0.5"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                        <Label htmlFor="sms-method" className="font-medium text-base cursor-pointer">SMS notifications</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Receive text messages on your phone</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Details (Conditional) */}
              {formData.emailEnabled && (
                <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium">Email notification details</h4>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={showEmailError ? "border-red-500" : ""}
                    />
                    {showEmailError && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        Please enter a valid email address
                      </p>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Instant email for every call</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Includes full call summary and transcript link</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SMS Details (Conditional) */}
              {formData.smsEnabled && (
                <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium">SMS notification details</h4>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number *</Label>
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
                        className={showPhoneError ? "border-red-500 flex-1" : "flex-1"}
                      />
                    </div>
                    {showPhoneError && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        Please enter a valid phone number
                      </p>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Text message for every call</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Includes caller name and brief summary</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Recipient Name (Always Visible) */}
              <div className="space-y-2">
                <Label htmlFor="name">Label this recipient (optional)</Label>
                <Input
                  id="name"
                  placeholder="e.g., Support Team, Sales, Thomas"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Helps you identify who receives these notifications</span>
                </div>
              </div>

              {/* Advanced Settings (Collapsible) */}
              <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  {isAdvancedOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  Advanced: When to notify (optional)
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-3 pl-6">
                  <RadioGroup value={formData.frequency} onValueChange={(value: "all" | "follow-up" | "daily") => setFormData({ ...formData, frequency: value })}>
                    <div className="flex items-start gap-2 space-y-0">
                      <RadioGroupItem value="all" id="freq-all" className="mt-0.5" />
                      <div className="space-y-1">
                        <Label htmlFor="freq-all" className="font-medium cursor-pointer">All calls (recommended)</Label>
                        <p className="text-sm text-muted-foreground">Get notified immediately for every call</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 space-y-0">
                      <RadioGroupItem value="follow-up" id="freq-followup" className="mt-0.5" />
                      <div className="space-y-1">
                        <Label htmlFor="freq-followup" className="font-medium cursor-pointer">Follow-up Required only</Label>
                        <p className="text-sm text-muted-foreground">Only calls that need your attention</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 space-y-0 opacity-50 cursor-not-allowed">
                      <RadioGroupItem value="daily" id="freq-daily" className="mt-0.5" disabled />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="freq-daily" className="font-medium">Daily digest</Label>
                          <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full border">Coming soon</span>
                        </div>
                        <p className="text-sm text-muted-foreground">One summary email each morning at 9:00 AM</p>
                      </div>
                    </div>
                  </RadioGroup>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsDialogOpen(false);
                setEditingPerson(null);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddPerson}
                disabled={showEmailError || showPhoneError}
              >
                {editingPerson ? "Save Changes" : "Add notifications"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Validation Alert Dialog */}
        <AlertDialog open={showValidationAlert} onOpenChange={setShowValidationAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Info className="h-5 w-5 text-orange-600" />
                </div>
                Please select a notification method
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-4 pt-2">
                <p>Choose at least one way to receive notifications:</p>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>Email notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span>SMS notifications</span>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Cannot Delete Last Person Alert */}
        <AlertDialog open={showCannotDeleteAlert} onOpenChange={setShowCannotDeleteAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Info className="h-5 w-5 text-orange-600" />
                </div>
                Cannot delete last person
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-4 pt-2">
                <p>You must have at least one person configured for call notifications.</p>
                <p className="text-sm text-muted-foreground">
                  Add another person before removing this one, or edit this person's details instead.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
