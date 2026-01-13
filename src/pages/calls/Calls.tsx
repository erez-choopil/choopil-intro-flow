import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Phone,
  Users,
  PhoneMissed,
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
  ChevronRight,
} from "lucide-react";
import { CustomizeMetricsModal } from "@/components/calls/CustomizeMetricsModal";
import type { Metric } from "@/components/calls/CustomizeMetricsModal";
import { FiltersDropdown, type FilterState } from "@/components/calls/FiltersDropdown";
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
    date: "Nov 10",
    time: "5:52 PM",
    status: "follow_up_required",
    summary: "Customer called regarding a refund for a cancelled appointment.",
    phone: "+18484209420",
    callDate: new Date(2024, 10, 10, 17, 52),
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
    date: "Nov 7",
    time: "3:20 PM",
    status: "follow_up_required",
    summary: "Customer called regarding a refund for a cancelled appointment. Agent confirmed the refund would be processed within 5-7 business days and provided the reference number. Customer satisfied with resolution.",
    phone: "+15552341234",
    callDate: new Date(2024, 10, 7, 15, 20),
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
    date: "Nov 2",
    time: "2:10 PM",
    status: "test_call",
    summary: "Customer inquiry about service availability.",
    phone: "+15559876543",
    callDate: new Date(2024, 10, 2, 14, 10),
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
    date: "Oct 30",
    time: "1:05 PM",
    status: "spam",
    summary: "Blocked spam call - no action required.",
    phone: "+15551234567",
    callDate: new Date(2024, 9, 30, 13, 5),
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
  const navigate = useNavigate();
  const [calls, setCalls] = useState<Call[]>(mockCalls);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
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
    // Mark as read
    if (!call.isRead) {
      setCalls(calls.map(c => c.id === call.id ? { ...c, isRead: true } : c));
    }
    // Navigate to detail page
    navigate(`/dashboard/calls/${call.id}`);
  };

  const handleToggleStar = (e: React.MouseEvent, callId: string) => {
    e.stopPropagation();
    setCalls(calls.map(c => c.id === callId ? { ...c, isStarred: !c.isStarred } : c));
  };

  const getStatusBadge = (status: Call["status"]) => {
    switch (status) {
      case "follow_up_required":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0 gap-1 text-xs">
            <AlertCircle className="h-3 w-3" />
            <span className="hidden sm:inline">Follow-up</span>
          </Badge>
        );
      case "no_action_needed":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-0 gap-1 text-xs">
            <CheckCircle2 className="h-3 w-3" />
            <span className="hidden sm:inline">Resolved</span>
          </Badge>
        );
      case "spam":
        return (
          <Badge className="bg-red-50 text-red-700 hover:bg-red-50 border-0 gap-1 text-xs">
            <Ban className="h-3 w-3" />
            <span className="hidden sm:inline">Spam</span>
          </Badge>
        );
      case "test_call":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 gap-1 text-xs">
            <Beaker className="h-3 w-3" />
            <span className="hidden sm:inline">Test</span>
          </Badge>
        );
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Call History
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Track, review, and follow up on every customer interaction.
          </p>
        </div>

        {/* Assistant Metrics */}
        {selectedMetrics.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Assistant Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {displayedMetrics.map((metric) => (
                <div key={metric.id} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start gap-2">
                    <div className={`p-2 rounded-lg ${metric.color}`}>
                      <metric.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5 truncate">{metric.label}</p>
                      <p className="text-lg font-bold text-foreground">{metric.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex gap-2">
            <FiltersDropdown filters={filters} onFiltersChange={setFilters} />
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowCustomizeModal(true)}
            >
              <Settings2 className="h-4 w-4" />
              <span className="hidden sm:inline">Customize</span>
            </Button>
          </div>
          <Input
            placeholder="Search calls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>

        {/* Active Filter Pills */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Filters:</span>
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

        {/* Calls List - Outlook Style */}
        <div className="rounded-lg border border-border bg-card divide-y divide-border overflow-hidden">
          {filteredCalls.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No calls found
            </div>
          ) : (
            filteredCalls.map((call) => (
              <div
                key={call.id}
                className="flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors active:bg-muted"
                onClick={() => handleCallClick(call)}
              >
                {/* Unread indicator + Star */}
                <div className="flex flex-col items-center gap-1 w-6 flex-shrink-0">
                  {!call.isRead && (
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  )}
                  <button
                    onClick={(e) => handleToggleStar(e, call.id)}
                    className="p-0.5 hover:bg-muted rounded"
                  >
                    <Star 
                      className={`h-4 w-4 ${
                        call.isStarred 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-muted-foreground/40'
                      }`} 
                    />
                  </button>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  {/* Row 1: Caller name + Date/Time */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-sm truncate ${!call.isRead ? 'font-bold text-foreground' : 'font-medium text-foreground'}`}>
                      {call.caller}
                    </span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {call.date}
                    </span>
                  </div>
                  
                  {/* Row 2: Phone + Status */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-xs truncate ${!call.isRead ? 'font-semibold text-muted-foreground' : 'text-muted-foreground'}`}>
                      {call.phone}
                    </span>
                    {getStatusBadge(call.status)}
                  </div>

                  {/* Row 3: Summary preview */}
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {call.summary}
                  </p>
                </div>

                {/* Duration + Chevron */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {call.duration}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <CustomizeMetricsModal
        open={showCustomizeModal}
        onOpenChange={setShowCustomizeModal}
        selectedMetrics={selectedMetrics}
        onSave={setSelectedMetrics}
      />
    </div>
  );
}
