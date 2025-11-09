import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Phone,
  Users,
  PhoneMissed,
  Play,
  MessageSquare,
  Download,
  Settings2,
  X,
  ShieldOff,
  Timer,
  Calendar,
  PhoneOff,
  TrendingUp,
  CalendarDays,
  CalendarClock,
  Star,
  AlertCircle,
  CheckCircle2,
  Ban,
  Beaker,
} from "lucide-react";
import { CustomizeMetricsModal } from "@/components/calls/CustomizeMetricsModal";
import type { Metric } from "@/components/calls/CustomizeMetricsModal";
import { FiltersDropdown, type FilterState } from "@/components/calls/FiltersDropdown";
import { FeedbackModal } from "@/components/calls/FeedbackModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, isToday, isWithinInterval, subDays } from "date-fns";

interface Call {
  id: string;
  caller: string;
  duration: string;
  date: string;
  time: string;
  status: "follow_up_required" | "no_action_needed" | "spam" | "test_call";
  summary: string;
  phone: string;
  transcript: Array<{
    role: "agent" | "caller";
    message: string;
  }>;
  callDate: Date;
  isStarred: boolean;
  isRead: boolean;
}

const mockCalls: Call[] = [
  {
    id: "1",
    caller: "Erez Sun",
    duration: "0:59",
    date: "Oct 27",
    time: "5:52 PM",
    status: "follow_up_required",
    summary: "Customer called regarding a refund for a cancelled appointment.",
    phone: "+18484209420",
    callDate: new Date(2024, 9, 27, 17, 52),
    isStarred: false,
    isRead: false,
    transcript: [
      { role: "agent", message: "Thank you for calling. How may I assist you today?" },
      { role: "caller", message: "Hi, I had to cancel my appointment last week and was told I would get a refund." },
    ],
  },
  {
    id: "2",
    caller: "Sarah Martinez",
    duration: "2:15",
    date: "Oct 27",
    time: "3:20 PM",
    status: "follow_up_required",
    summary: "Customer called regarding a refund for a cancelled appointment. Agent confirmed the refund would be processed within 5-7 business days and provided the reference number. Customer satisfied with resolution.",
    phone: "+15552341234",
    callDate: new Date(2024, 9, 27, 15, 20),
    isStarred: true,
    isRead: true,
    transcript: [
      { role: "agent", message: "Thank you for calling. How may I assist you today?" },
      { role: "caller", message: "Hi, I had to cancel my appointment last week and was told I would get a refund." },
      { role: "caller", message: "I haven't received it yet." },
      { role: "agent", message: "I understand your concern. Let me look that up for you. Can you provide me with your appointment reference number?" },
      { role: "caller", message: "Yes, it's APT-12847" },
      { role: "agent", message: "Thank you. I see your cancellation here. The refund was initiated on October 25th and should appear in your account within 5-7 business days. Your refund reference number is REF-9847." },
      { role: "caller", message: "Okay, that's helpful. Thank you." },
      { role: "agent", message: "You're welcome! Is there anything else I can help you with today?" },
      { role: "caller", message: "No, that's all. Thanks!" },
      { role: "agent", message: "Have a wonderful day!" },
    ],
  },
  {
    id: "3",
    caller: "Michael Johnson",
    duration: "1:45",
    date: "Oct 27",
    time: "2:10 PM",
    status: "test_call",
    summary: "Customer inquiry about service availability.",
    phone: "+15559876543",
    callDate: new Date(2024, 9, 27, 14, 10),
    isStarred: false,
    isRead: true,
    transcript: [
      { role: "agent", message: "Thank you for calling. How may I assist you today?" },
      { role: "caller", message: "I wanted to check if you have availability next week." },
    ],
  },
  {
    id: "4",
    caller: "Unknown",
    duration: "0:15",
    date: "Oct 27",
    time: "1:05 PM",
    status: "spam",
    summary: "Blocked spam call - no action required.",
    phone: "+15551234567",
    callDate: new Date(2024, 9, 27, 13, 5),
    isStarred: false,
    isRead: true,
    transcript: [
      { role: "agent", message: "Thank you for calling. How can I help you today?" },
      { role: "caller", message: "Hi, This is an important message about your car's extended warranty—" },
      { role: "agent", message: "I'm sorry, this appears to be an automated call. I'm ending this call now. Goodbye." },
      { role: "caller", message: "[Call ended]" },
    ],
  },
];

const allMetrics: Metric[] = [
  { id: "total-calls", label: "Total Calls", value: "4", icon: Phone, color: "bg-blue-500/10 text-blue-500" },
  { id: "spam-blocked", label: "Spam Blocked", value: "12", icon: ShieldOff, color: "bg-red-500/10 text-red-500" },
  { id: "total-time-saved", label: "Total Time Saved", value: "2h 15m", icon: Timer, color: "bg-green-500/10 text-green-500" },
  { id: "after-hours-calls", label: "After-Hours Calls", value: "8", icon: Calendar, color: "bg-purple-500/10 text-purple-500" },
  { id: "avg-duration", label: "Average Call Duration", value: "1m 39s", icon: Clock, color: "bg-blue-500/10 text-blue-500" },
  { id: "missed-calls", label: "Missed Calls", value: "1", icon: PhoneMissed, color: "bg-red-500/10 text-red-500" },
  { id: "unique-callers", label: "Unique Callers", value: "4", icon: Users, color: "bg-blue-500/10 text-blue-500" },
  { id: "hung-up-calls", label: "Hung up Calls", value: "2", icon: PhoneOff, color: "bg-orange-500/10 text-orange-500" },
  { id: "calls-today", label: "Calls Today", value: "4", icon: TrendingUp, color: "bg-green-500/10 text-green-500" },
  { id: "calls-week", label: "Calls this Week", value: "28", icon: CalendarDays, color: "bg-blue-500/10 text-blue-500" },
  { id: "calls-month", label: "Calls this Month", value: "142", icon: CalendarClock, color: "bg-purple-500/10 text-purple-500" },
];

export default function Calls() {
  const [calls, setCalls] = useState<Call[]>(mockCalls);
  const [selectedCall, setSelectedCall] = useState<Call | null>(calls[1]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackCallId, setFeedbackCallId] = useState<string>("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "total-calls",
    "avg-duration",
    "unique-callers",
    "missed-calls",
  ]);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: null,
    callStatus: [],
    starredOnly: false,
    unreadOnly: false,
    allCalls: true,
  });

  const displayedMetrics = selectedMetrics
    .map((id) => allMetrics.find((m) => m.id === id))
    .filter(Boolean) as Metric[];

  const filteredCalls = useMemo(() => {
    let filtered = calls;

    if (filters.dateRange) {
      const now = new Date();
      filtered = filtered.filter((call) => {
        if (filters.dateRange === "today") {
          return isToday(call.callDate);
        } else if (filters.dateRange === "last-7-days") {
          return isWithinInterval(call.callDate, {
            start: subDays(now, 7),
            end: now,
          });
        } else if (filters.dateRange === "last-30-days") {
          return isWithinInterval(call.callDate, {
            start: subDays(now, 30),
            end: now,
          });
        } else if (filters.dateRange === "custom") {
          if (filters.customDateFrom && filters.customDateTo) {
            return isWithinInterval(call.callDate, {
              start: filters.customDateFrom,
              end: filters.customDateTo,
            });
          }
        }
        return true;
      });
    }

    if (!filters.allCalls) {
      return [];
    }

    if (filters.callStatus.length > 0) {
      filtered = filtered.filter((call) => filters.callStatus.includes(call.status));
    }

    if (filters.starredOnly) {
      filtered = filtered.filter((call) => call.isStarred);
    }

    if (filters.unreadOnly) {
      filtered = filtered.filter((call) => !call.isRead);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (call) =>
          call.caller.toLowerCase().includes(query) ||
          call.phone.includes(query) ||
          call.summary.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [calls, filters, searchQuery]);

  const getActiveFilterPills = () => {
    const pills: Array<{ label: string; onRemove: () => void }> = [];

    if (filters.dateRange !== null) {
      let label = "";
      let shouldAddPill = false;
      
      if (filters.dateRange === "today") {
        label = "Today";
        shouldAddPill = true;
      } else if (filters.dateRange === "last-7-days") {
        label = "Last 7 days";
        shouldAddPill = true;
      } else if (filters.dateRange === "last-30-days") {
        label = "Last 30 days";
        shouldAddPill = true;
      } else if (filters.dateRange === "custom" && filters.customDateFrom && filters.customDateTo) {
        label = `${format(filters.customDateFrom, "MMM d")} - ${format(
          filters.customDateTo,
          "MMM d"
        )}`;
        shouldAddPill = true;
      }
      
      if (shouldAddPill) {
        pills.push({
          label,
          onRemove: () => setFilters({ ...filters, dateRange: null, customDateFrom: undefined, customDateTo: undefined }),
        });
      }
    }

    if (filters.callStatus.length > 0) {
      const statusLabels = filters.callStatus
        .map((id) => {
          switch (id) {
            case "follow_up_required": return "Follow-up Required";
            case "no_action_needed": return "No Action Needed";
            case "spam": return "Spam";
            case "test_call": return "Test Call";
            default: return null;
          }
        })
        .filter(Boolean)
        .join(", ");

      pills.push({
        label: statusLabels,
        onRemove: () => setFilters({ ...filters, callStatus: [] }),
      });
    }

    if (filters.starredOnly) {
      pills.push({
        label: "Starred",
        onRemove: () => setFilters({ ...filters, starredOnly: false }),
      });
    }

    if (filters.unreadOnly) {
      pills.push({
        label: "Unread",
        onRemove: () => setFilters({ ...filters, unreadOnly: false }),
      });
    }

    return pills;
  };

  const activeFilterPills = getActiveFilterPills();
  const hasActiveFilters = activeFilterPills.length > 0;

  const handleClearAllFilters = () => {
    setFilters({
      dateRange: null,
      callStatus: [],
      starredOnly: false,
      unreadOnly: false,
      allCalls: true,
      customDateFrom: undefined,
      customDateTo: undefined,
    });
  };

  const handleCallClick = (call: Call) => {
    if (!call.isRead) {
      setCalls(calls.map(c => c.id === call.id ? { ...c, isRead: true } : c));
    }
    setSelectedCall(call);
  };

  const handleToggleStar = (callId: string) => {
    setCalls(calls.map(c => c.id === callId ? { ...c, isStarred: !c.isStarred } : c));
    if (selectedCall?.id === callId) {
      setSelectedCall({ ...selectedCall, isStarred: !selectedCall.isStarred });
    }
  };

  const getStatusBadge = (status: Call["status"]) => {
    switch (status) {
      case "follow_up_required":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0 gap-1.5">
            <AlertCircle className="h-3 w-3" />
            Follow-up Required
          </Badge>
        );
      case "no_action_needed":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-0 gap-1.5">
            <CheckCircle2 className="h-3 w-3" />
            No Action Needed
          </Badge>
        );
      case "spam":
        return (
          <Badge className="bg-red-50 text-red-700 hover:bg-red-50 border-0 gap-1.5">
            <Ban className="h-3 w-3" />
            Spam
          </Badge>
        );
      case "test_call":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 gap-1.5">
            <Beaker className="h-3 w-3" />
            Test Call
          </Badge>
        );
    }
  };

  const followUpCount = calls.filter(c => c.status === "follow_up_required").length;
  const starredCount = calls.filter(c => c.isStarred).length;
  const unreadCount = calls.filter(c => !c.isRead).length;

  const handleLeaveFeedback = (callId: string) => {
    setFeedbackCallId(callId);
    setShowFeedbackModal(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Call History
          </h1>
          <p className="text-muted-foreground">
            Track, review, and follow up on every customer interaction with precision.
          </p>
        </div>

        {/* Assistant Metrics */}
        {selectedMetrics.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Assistant Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayedMetrics.map((metric) => (
                <div key={metric.id} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${metric.color}`}>
                      <metric.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Filter Pills */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilterPills.map((pill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="gap-1 pr-1"
              >
                {pill.label}
                <button
                  onClick={pill.onRemove}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-sm p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <button
              onClick={handleClearAllFilters}
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Filter and Search */}
        <div className="flex items-center gap-3">
          <FiltersDropdown filters={filters} onFiltersChange={setFilters} />
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowCustomizeModal(true)}
          >
            <Settings2 className="h-4 w-4" />
            Customize Metrics
          </Button>
          <Input
            placeholder="Search calls by name, phone number or phrase"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>

        {/* Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Calls List */}
          <div className="lg:col-span-1 space-y-3">
            {filteredCalls.map((call) => (
              <div
                key={call.id}
                className={`cursor-pointer transition-all p-4 rounded-lg border border-border ${
                  selectedCall?.id === call.id 
                    ? "bg-muted border-primary" 
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
                onClick={() => handleCallClick(call)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {!call.isRead && (
                        <div className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className={`text-foreground truncate ${!call.isRead ? 'font-bold' : 'font-semibold'}`}>
                          {call.caller}
                        </p>
                        <p className={`text-sm text-muted-foreground truncate ${!call.isRead ? 'font-semibold' : ''}`}>
                          {call.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      {getStatusBadge(call.status)}
                      {call.isStarred && (
                        <Star className="h-4 w-4 text-yellow-600 fill-yellow-600" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {call.date}, {call.time}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {call.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Call Details */}
          <div className="lg:col-span-2">
            {selectedCall ? (
              <div className="space-y-6 p-6 rounded-lg border border-border bg-muted/30">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{selectedCall.caller}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCall.phone}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedCall.date}, 2025, {selectedCall.time}
                    </p>
                  </div>
                  <TooltipProvider>
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleLeaveFeedback(selectedCall.id)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Leave Feedback</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Download call audio</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleStar(selectedCall.id)}
                          >
                            <Star className={`h-5 w-5 ${selectedCall.isStarred ? 'text-yellow-600 fill-yellow-600' : 'text-gray-400'}`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {selectedCall.isStarred ? 'Unstar this call' : 'Star this call'}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">Call Summary</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedCall.summary}
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
                  <Button size="icon" className="h-10 w-10 rounded-full">
                    <Play className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{selectedCall.duration}</span>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Transcript</h4>
                  <div className="space-y-3">
                    {selectedCall.transcript.map((item, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          item.role === "agent"
                            ? "bg-primary/10 ml-8"
                            : "bg-muted mr-8"
                        }`}
                      >
                        <p className="text-xs font-semibold text-muted-foreground mb-1">
                          {item.role === "agent" ? "Agent" : "Caller"}
                        </p>
                        <p className="text-sm text-foreground">{item.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a call to view details
              </div>
            )}
          </div>
        </div>
      </div>

      <CustomizeMetricsModal
        open={showCustomizeModal}
        onOpenChange={setShowCustomizeModal}
        selectedMetrics={selectedMetrics}
        onSave={setSelectedMetrics}
      />

      <FeedbackModal
        open={showFeedbackModal}
        onOpenChange={setShowFeedbackModal}
        callId={feedbackCallId}
      />
    </div>
  );
}
