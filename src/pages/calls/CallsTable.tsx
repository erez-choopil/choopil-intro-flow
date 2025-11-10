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
  Volume2,
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
} from "lucide-react";
import { CustomizeMetricsModal, type Metric } from "@/components/calls/CustomizeMetricsModal";
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
  status: "completed" | "missed" | "test-call" | "hung-up" | "spam" | "blocked" | "call-transferred";
  summary: string;
  phone: string;
  transcript: Array<{
    role: "agent" | "caller";
    message: string;
  }>;
  callDate: Date;
}

const mockCalls: Call[] = [
  {
    id: "1",
    caller: "Erez Sun",
    duration: "0:59",
    date: "Nov 10",
    time: "5:52 PM",
    status: "completed",
    summary: "Customer called regarding a refund for a cancelled appointment.",
    phone: "+18484209420",
    callDate: new Date(2025, 10, 10, 17, 52),
    transcript: [
      { role: "agent", message: "Thank you for calling. How may I assist you today?" },
      { role: "caller", message: "Hi, I had to cancel my appointment last week and was told I would get a refund." },
    ],
  },
  {
    id: "2",
    caller: "Sarah Martinez",
    duration: "2:15",
    date: "Nov 7",
    time: "3:20 PM",
    status: "completed",
    summary: "Customer called regarding a refund for a cancelled appointment. Agent confirmed the refund would be processed within 5-7 business days and provided the reference number. Customer satisfied with resolution.",
    phone: "+15552341234",
    callDate: new Date(2025, 10, 7, 15, 20),
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
    date: "Nov 2",
    time: "2:10 PM",
    status: "test-call",
    summary: "Customer inquiry about service availability.",
    phone: "+15559876543",
    callDate: new Date(2025, 10, 2, 14, 10),
    transcript: [
      { role: "agent", message: "Thank you for calling. How may I assist you today?" },
      { role: "caller", message: "I wanted to check if you have availability next week." },
    ],
  },
  {
    id: "4",
    caller: "Unknown",
    duration: "0:00",
    date: "Oct 30",
    time: "1:05 PM",
    status: "missed",
    summary: "Missed call - no voicemail left.",
    phone: "+15551234567",
    callDate: new Date(2025, 9, 30, 13, 5),
    transcript: [],
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

export default function CallsTable() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(mockCalls[1]);
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

  // Filter calls based on filters
  const filteredCalls = useMemo(() => {
    let filtered = mockCalls;

    // Apply date range filter
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

    // Apply call status filter
    if (!(filters.callStatus.length === 1 && filters.callStatus[0] === "all")) {
      filtered = filtered.filter((call) => filters.callStatus.includes(call.status));
    }

    // Apply search query
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
  }, [filters, searchQuery]);

  const getActiveFilterPills = () => {
    const pills: Array<{ label: string; onRemove: () => void }> = [];

    // Date range pill
    if (filters.dateRange !== null) {
      let label = "";
      if (filters.dateRange === "today") label = "Today";
      else if (filters.dateRange === "last-7-days") label = "Last 7 days";
      else if (filters.dateRange === "last-30-days") label = "Last 30 days";
      else if (filters.dateRange === "custom") {
        if (filters.customDateFrom && filters.customDateTo) {
          label = `${format(filters.customDateFrom, "MMM d")} - ${format(
            filters.customDateTo,
            "MMM d"
          )}`;
        } else {
          label = "Custom range";
        }
      }
      pills.push({
        label,
        onRemove: () => setFilters({ ...filters, dateRange: null }),
      });
    }

    // Call status pills
    if (!(filters.callStatus.length === 1 && filters.callStatus[0] === "all")) {
      const statusLabels = filters.callStatus
        .map((id) => {
          switch (id) {
            case "completed": return "Completed";
            case "missed": return "Missed";
            case "test-call": return "Test call";
            case "hung-up": return "Hung up";
            case "spam": return "Spam";
            case "blocked": return "Blocked";
            case "call-transferred": return "Call Transferred";
            default: return null;
          }
        })
        .filter(Boolean)
        .join(", ");

      pills.push({
        label: statusLabels,
        onRemove: () => setFilters({ ...filters, callStatus: ["all"] }),
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

        {/* Assistant Metrics - Only show if metrics are selected */}
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
                onClick={() => setSelectedCall(call)}
              >
                <div className="space-y-3">
                  {/* Label at top */}
                  <Badge
                    variant={call.status === "completed" ? "default" : "secondary"}
                  >
                    {call.status === "completed"
                      ? "Call Ended"
                      : call.status === "missed"
                      ? "Missed"
                      : call.status === "test-call"
                      ? "Test"
                      : call.status === "hung-up"
                      ? "Hung up"
                      : call.status === "spam"
                      ? "Spam"
                      : call.status === "blocked"
                      ? "Blocked"
                      : "Call Transferred"}
                  </Badge>

                  {/* Caller name and phone */}
                  <div>
                    <p className="font-semibold text-foreground truncate">{call.caller}</p>
                    <p className="text-sm text-muted-foreground truncate">{call.phone}</p>
                  </div>

                  {/* Timestamp footer */}
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
                {/* Header */}
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
                    </div>
                  </TooltipProvider>
                </div>

                {/* Summary */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">Call Summary</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedCall.summary}
                  </p>
                </div>

                {/* Audio Player */}
                <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
                  <Button size="icon" className="h-10 w-10 rounded-full">
                    <Play className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 flex items-center gap-0.5 h-12">
                    {Array.from({ length: 80 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full bg-primary/40"
                        style={{
                          height: `${20 + Math.random() * 80}%`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">02:15</span>
                  <Button size="icon" variant="ghost">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <select className="text-sm border border-border rounded px-2 py-1 bg-background text-foreground">
                    <option>1.2x</option>
                    <option>1.0x</option>
                    <option>1.5x</option>
                    <option>2.0x</option>
                  </select>
                </div>

                {/* Transcript */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Transcript</h4>
                  {selectedCall.transcript.length > 0 ? (
                    <div className="space-y-4">
                      {selectedCall.transcript.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${item.role === "agent" ? "bg-primary/10" : "bg-accent"}`}>
                            {item.role === "agent" ? (
                              <MessageSquare className="h-4 w-4 text-primary" />
                            ) : (
                              <Phone className="h-4 w-4 text-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground capitalize mb-1">
                              {item.role}
                            </p>
                            <p className="text-sm text-muted-foreground">{item.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No transcript available</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 rounded-lg border border-border bg-muted/30">
                <Phone className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Select a call to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customize Metrics Modal */}
      <CustomizeMetricsModal
        open={showCustomizeModal}
        onOpenChange={setShowCustomizeModal}
        selectedMetrics={selectedMetrics}
        onSave={setSelectedMetrics}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        open={showFeedbackModal}
        onOpenChange={setShowFeedbackModal}
        callId={feedbackCallId}
      />
    </div>
  );
}
