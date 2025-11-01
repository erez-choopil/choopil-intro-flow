import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Globe, Plus, X, Upload, FileText, Eye, EyeOff, Edit, Trash2, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = [
  "General", "Pricing", "Services", "Hours", "Location", "Appointments",
  "Contact", "Returns", "Shipping", "Payment", "Account", "Technical", "Policies", "Other"
];

type TimeSlot = {
  id: string;
  start: string;
  end: string;
  startPeriod: "AM" | "PM";
  endPeriod: "AM" | "PM";
};

type DaySchedule = {
  enabled: boolean;
  slots: TimeSlot[];
};

type UploadedFile = {
  id: string;
  name: string;
  size: number;
};

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  expanded: boolean;
};

export default function Knowledge() {
  const [hasChanges, setHasChanges] = useState(false);

  // General Business Information
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [googleProfile, setGoogleProfile] = useState("");

  // Business Hours
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>({
    Sunday: { enabled: true, slots: [{ id: "1", start: "07:00", end: "08:00", startPeriod: "AM", endPeriod: "AM" }, { id: "2", start: "11:00", end: "08:00", startPeriod: "AM", endPeriod: "PM" }] },
    Monday: { enabled: true, slots: [{ id: "1", start: "9:00", end: "6:00", startPeriod: "AM", endPeriod: "PM" }] },
    Tuesday: { enabled: true, slots: [{ id: "1", start: "9:00", end: "6:00", startPeriod: "AM", endPeriod: "PM" }] },
    Wednesday: { enabled: true, slots: [{ id: "1", start: "9:00", end: "6:00", startPeriod: "AM", endPeriod: "PM" }] },
    Thursday: { enabled: true, slots: [{ id: "1", start: "9:00", end: "6:00", startPeriod: "AM", endPeriod: "PM" }] },
    Friday: { enabled: true, slots: [{ id: "1", start: "9:00", end: "6:00", startPeriod: "AM", endPeriod: "PM" }] },
    Saturday: { enabled: false, slots: [] }
  });

  // Custom Information
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  // FAQs
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [showAddFaq, setShowAddFaq] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [newFaqCategory, setNewFaqCategory] = useState("General");
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);

  // Warn user before leaving page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  const markAsChanged = () => {
    setHasChanges(true);
  };

  const handleSave = () => {
    if (!businessName.trim()) {
      toast({
        title: "Validation Error",
        description: "Business Name is required",
        variant: "destructive"
      });
      return;
    }

    setHasChanges(false);
    toast({
      title: "Success",
      description: "Business knowledge saved successfully"
    });
  };

  const toggleDay = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
        slots: !prev[day].enabled ? [{ id: Date.now().toString(), start: "9:00", end: "5:00", startPeriod: "AM", endPeriod: "PM" }] : prev[day].slots
      }
    }));
    markAsChanged();
  };

  const addTimeSlot = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { id: Date.now().toString(), start: "9:00", end: "5:00", startPeriod: "AM", endPeriod: "PM" }]
      }
    }));
    markAsChanged();
  };

  const removeTimeSlot = (day: string, slotId: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter(s => s.id !== slotId)
      }
    }));
    markAsChanged();
  };

  const updateTimeSlot = (day: string, slotId: string, field: keyof TimeSlot, value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map(s => s.id === slotId ? { ...s, [field]: value } : s)
      }
    }));
    markAsChanged();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        id: Date.now().toString() + file.name,
        name: file.name,
        size: file.size
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
      markAsChanged();
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    markAsChanged();
  };

  const handleAddFaq = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) {
      toast({
        title: "Validation Error",
        description: "Question and Answer are required",
        variant: "destructive"
      });
      return;
    }

    if (editingFaqId) {
      setFaqs(prev => prev.map(faq => 
        faq.id === editingFaqId 
          ? { ...faq, question: newFaqQuestion, answer: newFaqAnswer, category: newFaqCategory }
          : faq
      ));
      setEditingFaqId(null);
    } else {
      setFaqs(prev => [...prev, {
        id: Date.now().toString(),
        question: newFaqQuestion,
        answer: newFaqAnswer,
        category: newFaqCategory,
        expanded: false
      }]);
    }

    setNewFaqQuestion("");
    setNewFaqAnswer("");
    setNewFaqCategory("General");
    setShowAddFaq(false);
    markAsChanged();
  };

  const toggleFaqExpanded = (faqId: string) => {
    setFaqs(prev => prev.map(faq => 
      faq.id === faqId ? { ...faq, expanded: !faq.expanded } : faq
    ));
  };

  const editFaq = (faq: FAQ) => {
    setNewFaqQuestion(faq.question);
    setNewFaqAnswer(faq.answer);
    setNewFaqCategory(faq.category);
    setEditingFaqId(faq.id);
    setShowAddFaq(true);
  };

  const deleteFaq = (faqId: string) => {
    setFaqs(prev => prev.filter(f => f.id !== faqId));
    markAsChanged();
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "General": "bg-blue-100 text-blue-700",
      "Pricing": "bg-green-100 text-green-700",
      "Services": "bg-purple-100 text-purple-700",
      "Hours": "bg-orange-100 text-orange-700",
      "Location": "bg-pink-100 text-pink-700",
      "Appointments": "bg-indigo-100 text-indigo-700",
      "Contact": "bg-cyan-100 text-cyan-700",
      "Returns": "bg-red-100 text-red-700",
      "Shipping": "bg-yellow-100 text-yellow-700",
      "Payment": "bg-emerald-100 text-emerald-700",
      "Account": "bg-violet-100 text-violet-700",
      "Technical": "bg-slate-100 text-slate-700",
      "Policies": "bg-rose-100 text-rose-700",
      "Other": "bg-gray-100 text-gray-700"
    };
    return colors[category] || colors["Other"];
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Business knowledge
          </h1>
          <p className="text-muted-foreground">
            Add information about your business or custom instructions
          </p>
        </div>

        {/* General Business Information */}
        <div className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-foreground">
              Business Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="businessName"
              placeholder="Enter your business name"
              value={businessName}
              onChange={(e) => { setBusinessName(e.target.value); markAsChanged(); }}
              className="max-w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAddress" className="text-foreground">Business Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="businessAddress"
                placeholder="123 Main Street, City, State, ZIP"
                value={businessAddress}
                onChange={(e) => { setBusinessAddress(e.target.value); markAsChanged(); }}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-foreground">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="website"
                placeholder="https://yourwebsite.com"
                value={website}
                onChange={(e) => { setWebsite(e.target.value); markAsChanged(); }}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="googleProfile" className="text-foreground">Google Business Profile URL</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="googleProfile"
                placeholder="https://g.page/your-business"
                value={googleProfile}
                onChange={(e) => { setGoogleProfile(e.target.value); markAsChanged(); }}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              We'll automatically import your business information from your Google Business Profile
            </p>
          </div>
        </div>

        {/* Business Operation Hours */}
        <div className="space-y-4">
          <Label className="text-foreground text-base font-semibold">Business Operation Hours</Label>
          
          <div className="space-y-3">
            {Object.keys(schedule).map((day) => (
              <div key={day} className="flex items-start gap-4">
                <div className="flex items-center gap-3 w-32">
                  <Switch
                    checked={schedule[day].enabled}
                    onCheckedChange={() => toggleDay(day)}
                  />
                  <span className="text-sm font-medium text-foreground">{day}</span>
                </div>

                {schedule[day].enabled ? (
                  <div className="flex-1 space-y-2">
                    {schedule[day].slots.map((slot, idx) => (
                      <div key={slot.id} className="flex items-center gap-2">
                        <Input
                          value={slot.start}
                          onChange={(e) => updateTimeSlot(day, slot.id, "start", e.target.value)}
                          className="w-20"
                        />
                        <Select value={slot.startPeriod} onValueChange={(v) => updateTimeSlot(day, slot.id, "startPeriod", v)}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>

                        <span className="text-muted-foreground">to</span>

                        <Input
                          value={slot.end}
                          onChange={(e) => updateTimeSlot(day, slot.id, "end", e.target.value)}
                          className="w-20"
                        />
                        <Select value={slot.endPeriod} onValueChange={(v) => updateTimeSlot(day, slot.id, "endPeriod", v)}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>

                        {schedule[day].slots.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTimeSlot(day, slot.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}

                        {idx === schedule[day].slots.length - 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => addTimeSlot(day)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}

                        {idx === 1 && <span className="text-sm text-muted-foreground">and</span>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">Closed</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Custom Business Information */}
        <div className="space-y-4">
          <div>
            <Label className="text-foreground text-base font-semibold">Custom Business Information</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Add any additional information about your business that you want the AI assistant to know.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo" className="text-foreground">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              placeholder="Example: We offer free consultations for first-time clients. Our specialty is family law cases..."
              value={additionalInfo}
              onChange={(e) => { setAdditionalInfo(e.target.value); markAsChanged(); }}
              className="min-h-[120px] resize-none"
              maxLength={5000}
            />
            <p className="text-xs text-muted-foreground">
              {additionalInfo.length}/5000 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Upload Documents</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                multiple
                onChange={handleFileUpload}
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, DOCX, or TXT (max 10MB)
                </p>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <div>
            <Label className="text-foreground text-base font-semibold">Frequently Asked Questions</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Add common questions and answers that your AI assistant should know.
            </p>
          </div>
          <Button onClick={() => setShowAddFaq(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>

          {showAddFaq && (
            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faqQuestion" className="text-foreground">
                  Question <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="faqQuestion"
                  placeholder="Enter the question"
                  value={newFaqQuestion}
                  onChange={(e) => setNewFaqQuestion(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="faqAnswer" className="text-foreground">
                  Answer <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="faqAnswer"
                  placeholder="Enter the answer"
                  value={newFaqAnswer}
                  onChange={(e) => setNewFaqAnswer(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="faqCategory" className="text-foreground">Category</Label>
                <Select value={newFaqCategory} onValueChange={setNewFaqCategory}>
                  <SelectTrigger id="faqCategory" className="max-w-[280px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddFaq(false);
                    setNewFaqQuestion("");
                    setNewFaqAnswer("");
                    setNewFaqCategory("General");
                    setEditingFaqId(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddFaq}
                  disabled={!newFaqQuestion.trim() || !newFaqAnswer.trim()}
                >
                  {editingFaqId ? "Update FAQ" : "Save FAQ"}
                </Button>
              </div>
            </div>
          )}

          {faqs.length === 0 && !showAddFaq && (
            <p className="text-center text-muted-foreground py-8">
              No FAQs added yet. Click "Add FAQ" to get started.
            </p>
          )}

          <div className="space-y-3">
            {faqs.map(faq => (
              <div key={faq.id} className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-foreground">{faq.question}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(faq.category)}`}>
                        {faq.category}
                      </span>
                    </div>
                    {faq.expanded && (
                      <p className="text-sm text-muted-foreground mt-2">{faq.answer}</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFaqExpanded(faq.id)}
                    >
                      {faq.expanded ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => editFaq(faq)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteFaq(faq.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">How this information is used</h4>
              <p className="text-sm text-muted-foreground">
                All information entered here will be added to your AI assistant's knowledge base. The assistant will use this information to answer caller questions accurately and provide relevant information about your business.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges}
            className="w-full"
            size="lg"
          >
            Save knowledge
          </Button>
        </div>
      </div>
    </div>
  );
}