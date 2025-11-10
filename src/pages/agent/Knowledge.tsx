import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Building2, Clock, FileText, HelpCircle, Plus, X, Edit, Trash2, Upload, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TrainingSourcesModal } from "@/components/agent/TrainingSourcesModal";
import { BusinessDetailsModal } from "@/components/agent/BusinessDetailsModal";
import { BusinessHoursModal } from "@/components/agent/BusinessHoursModal";
import { CustomInfoModal } from "@/components/agent/CustomInfoModal";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Training Sources
  const [googleProfile, setGoogleProfile] = useState("");
  const [website, setWebsite] = useState("");
  const [showTrainingSourcesModal, setShowTrainingSourcesModal] = useState(false);

  // Business Details
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [showBusinessDetailsModal, setShowBusinessDetailsModal] = useState(false);

  // Business Hours
  const [showBusinessHoursModal, setShowBusinessHoursModal] = useState(false);
  const [timezone, setTimezone] = useState("eastern");
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
  const [showCustomInfoModal, setShowCustomInfoModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  // FAQs
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [showAddFaq, setShowAddFaq] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [newFaqCategory, setNewFaqCategory] = useState("General");
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);

  // Fetch business profile data on mount
  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('business_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setGoogleProfile(data.google_profile || "");
          setWebsite(data.website || "");
          setBusinessName(data.business_name || "");
          setBusinessAddress(data.business_address || "");
          setBusinessType(data.business_type || "");
          // Parse business details from additional_info JSON if exists
          try {
            const additionalData = data.additional_info ? JSON.parse(data.additional_info as string) : {};
            setBusinessPhone(additionalData.business_phone || "");
            setBusinessEmail(additionalData.business_email || "");
            setAdditionalInfo(additionalData.custom_info || "");
          } catch {
            setAdditionalInfo(data.additional_info || "");
          }
          
          if (data.business_hours && typeof data.business_hours === 'object') {
            setSchedule(data.business_hours as Record<string, DaySchedule>);
          }
        }
      } catch (error) {
        console.error('Error fetching business profile:', error);
        toast({
          title: "Error",
          description: "Failed to load business information",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessProfile();
  }, []);

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

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save",
          variant: "destructive"
        });
        return;
      }

      // Combine business details with custom info in additional_info JSON
      const additionalData = {
        business_phone: businessPhone,
        business_email: businessEmail,
        custom_info: additionalInfo
      };

      const profileData = {
        user_id: user.id,
        google_profile: googleProfile,
        website: website,
        business_name: businessName,
        business_address: businessAddress,
        business_type: businessType,
        additional_info: JSON.stringify(additionalData),
        business_hours: schedule
      };

      const { error } = await supabase
        .from('business_profiles')
        .upsert(profileData, { onConflict: 'user_id' });

      if (error) throw error;

      setHasChanges(false);
      toast({
        title: "Success",
        description: "Business knowledge saved successfully"
      });
    } catch (error) {
      console.error('Error saving business profile:', error);
      toast({
        title: "Error",
        description: "Failed to save business information",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
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

  const handleTrainingSourcesSave = async (data: { googleBusinessProfile: string; businessWebsite: string }) => {
    setGoogleProfile(data.googleBusinessProfile);
    setWebsite(data.businessWebsite);
    markAsChanged();
  };

  const handleBusinessDetailsSave = async (data: {
    businessName: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
    businessType: string;
  }) => {
    setBusinessName(data.businessName);
    setBusinessAddress(data.businessAddress);
    setBusinessPhone(data.businessPhone);
    setBusinessEmail(data.businessEmail);
    setBusinessType(data.businessType);
    markAsChanged();
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-2xl mx-auto flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading business information...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Business Knowledge
          </h1>
          <p className="text-muted-foreground">
            Train your AI agent with information about your business. All fields are optional, but more information helps your agent provide better responses.
          </p>
        </div>

        {/* Section 1: Training Sources (Read-only with modal) */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Sparkles className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Training Sources
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    These sources help Choopil learn about your business
                  </p>
                  <div className="space-y-2">
                    <div className="flex gap-8">
                      <span className="text-sm font-medium text-foreground min-w-[180px]">
                        Google Business Profile
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {googleProfile || "Not Set"}
                      </span>
                    </div>
                    <div className="flex gap-8">
                      <span className="text-sm font-medium text-foreground min-w-[180px]">
                        Business Website
                      </span>
                      <span className="text-sm text-muted-foreground break-all">
                        {website || "Not Set"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTrainingSourcesModal(true)}
                className="text-primary hover:text-primary hover:bg-primary/10 shrink-0"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Business Details (Read-only with modal) */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Business Details
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Core information gathered from your training sources
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3 pl-8">
              <div className="flex">
                <span className="text-sm font-medium text-muted-foreground min-w-[180px]">
                  Name
                </span>
                <span className="text-sm text-foreground flex-1">
                  {businessName || <span className="text-muted-foreground">Not Set</span>}
                </span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-muted-foreground min-w-[180px]">
                  Business Type
                </span>
                <span className="text-sm text-foreground flex-1">
                  {businessType || <span className="text-muted-foreground">Not Set</span>}
                </span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-muted-foreground min-w-[180px]">
                  Address
                </span>
                <span className="text-sm text-foreground flex-1">
                  {businessAddress || <span className="text-muted-foreground">Not Set</span>}
                </span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-muted-foreground min-w-[180px]">
                  Business Primary Phone Number
                </span>
                <span className="text-sm text-foreground flex-1">
                  {businessPhone || <span className="text-muted-foreground">Not Set</span>}
                </span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-muted-foreground min-w-[180px]">
                  Business Email
                </span>
                <span className="text-sm text-foreground flex-1">
                  {businessEmail || <span className="text-muted-foreground">Not Set</span>}
                </span>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBusinessDetailsModal(true)}
                className="text-primary hover:text-primary hover:bg-primary/10"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Business Hours (Read-only with modal) */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Business Hours
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Set your operating hours so your agent can inform callers when you're available.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2 pl-8">
              {Object.keys(schedule).map((day) => (
              <div key={day} className="flex items-center gap-4">
                <div className="flex items-center gap-3 w-36 shrink-0">
                  <Switch
                    checked={schedule[day].enabled}
                    onCheckedChange={() => toggleDay(day)}
                  />
                  <span className="text-sm font-medium text-foreground">{day}</span>
                </div>

                {schedule[day].enabled ? (
                  <div className="flex-1 space-y-2 min-w-0">
                    {schedule[day].slots.map((slot, idx) => (
                      <>
                        {idx > 0 && (
                          <div className="text-sm text-muted-foreground py-1">and</div>
                        )}
                        <div key={slot.id} className="flex items-center gap-2">
                          <Input
                            value={slot.start}
                            onChange={(e) => updateTimeSlot(day, slot.id, "start", e.target.value)}
                            className="w-20 shrink-0"
                          />
                          <Select value={slot.startPeriod} onValueChange={(v) => updateTimeSlot(day, slot.id, "startPeriod", v)}>
                            <SelectTrigger className="w-20 shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AM">AM</SelectItem>
                              <SelectItem value="PM">PM</SelectItem>
                            </SelectContent>
                          </Select>

                          <span className="text-muted-foreground shrink-0">to</span>

                          <Input
                            value={slot.end}
                            onChange={(e) => updateTimeSlot(day, slot.id, "end", e.target.value)}
                            className="w-20 shrink-0"
                          />
                          <Select value={slot.endPeriod} onValueChange={(v) => updateTimeSlot(day, slot.id, "endPeriod", v)}>
                            <SelectTrigger className="w-20 shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AM">AM</SelectItem>
                              <SelectItem value="PM">PM</SelectItem>
                            </SelectContent>
                          </Select>

                          <div className="flex items-center gap-1 ml-2 shrink-0">
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
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground flex-1">Closed</div>
                )}
              </div>
            ))}
            </div>
            <div className="flex justify-end mt-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBusinessHoursModal(true)}
                className="text-primary hover:text-primary hover:bg-primary/10"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Custom Business Information (Read-only with modal) */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Custom Business Information
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Add any additional information about your business that you want the AI agent to know.
                  </p>
                </div>
              </div>
            </div>
            <div className="pl-8">
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {additionalInfo || <span className="text-muted-foreground italic">No custom information added yet.</span>}
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomInfoModal(true)}
                className="text-primary hover:text-primary hover:bg-primary/10"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>


        {/* Section 4: Documents */}
        <div className="hidden space-y-6 pt-4 pb-6 px-6 bg-muted/20 rounded-lg border border-border/50">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Documents
            </h2>
            <p className="text-sm text-muted-foreground">
              Upload documents that contain information about your business. Your AI agent will use these to answer caller questions.
            </p>
          </div>

          <div className="space-y-4">
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

        {/* Section 5: FAQs */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Add common questions and answers that your AI agent should know. This helps provide quick, accurate responses to frequent caller inquiries.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
          <div>
            <Button onClick={() => setShowAddFaq(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </div>

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
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="pt-6">
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges || isSaving}
            className="w-full"
            size="lg"
          >
            {isSaving ? "Saving..." : "Update Knowledge"}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Your AI agent will use all this information to provide accurate responses to callers
          </p>
        </div>
      </div>

      {/* Modals */}
      <TrainingSourcesModal
        open={showTrainingSourcesModal}
        onOpenChange={setShowTrainingSourcesModal}
        googleBusinessProfile={googleProfile}
        businessWebsite={website}
        onSave={async (data) => {
          setGoogleProfile(data.googleBusinessProfile);
          setWebsite(data.businessWebsite);
          setHasChanges(true);
        }}
      />

      <BusinessDetailsModal
        open={showBusinessDetailsModal}
        onOpenChange={setShowBusinessDetailsModal}
        businessName={businessName}
        businessAddress={businessAddress}
        businessPhone={businessPhone}
        businessEmail={businessEmail}
        businessType={businessType}
        onSave={async (data) => {
          setBusinessName(data.businessName);
          setBusinessAddress(data.businessAddress);
          setBusinessPhone(data.businessPhone);
          setBusinessEmail(data.businessEmail);
          setBusinessType(data.businessType);
          setHasChanges(true);
        }}
      />

      <BusinessHoursModal
        open={showBusinessHoursModal}
        onOpenChange={setShowBusinessHoursModal}
        schedule={schedule}
        timezone={timezone}
        onSave={(data) => {
          setSchedule(data.schedule);
          setTimezone(data.timezone);
          setHasChanges(true);
        }}
      />

      <CustomInfoModal
        open={showCustomInfoModal}
        onOpenChange={setShowCustomInfoModal}
        additionalInfo={additionalInfo}
        onSave={(info) => {
          setAdditionalInfo(info);
          setHasChanges(true);
        }}
      />
    </div>
  );
}