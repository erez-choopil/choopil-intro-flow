import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Filter, 
  Clock, 
  Phone,
  Users,
  PhoneMissed,
  Play,
  Volume2,
  MessageSquare,
  Download
} from "lucide-react";

interface Call {
  id: string;
  caller: string;
  duration: string;
  date: string;
  time: string;
  status: "TEST" | "ENDED";
  summary: string;
  phone: string;
  transcript: Array<{
    role: "agent" | "caller";
    message: string;
  }>;
}

const mockCalls: Call[] = [
  {
    id: "1",
    caller: "Erez Sun",
    duration: "0:59",
    date: "Oct 27",
    time: "5:52 PM",
    status: "ENDED",
    summary: "Customer called regarding a refund for a cancelled appointment.",
    phone: "+18484209420",
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
    status: "ENDED",
    summary: "Customer called regarding a refund for a cancelled appointment. Agent confirmed the refund would be processed within 5-7 business days and provided the reference number. Customer satisfied with resolution.",
    phone: "+15552341234",
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
    status: "TEST",
    summary: "Customer inquiry about service availability.",
    phone: "+15559876543",
    transcript: [
      { role: "agent", message: "Thank you for calling. How may I assist you today?" },
      { role: "caller", message: "I wanted to check if you have availability next week." },
    ],
  },
  {
    id: "4",
    caller: "Unknown",
    duration: "0:00",
    date: "Oct 27",
    time: "1:05 PM",
    status: "TEST",
    summary: "Missed call - no voicemail left.",
    phone: "+15551234567",
    transcript: [],
  },
];

export default function CallsTable() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(mockCalls[1]);
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Total Calls", value: "4", icon: Phone },
    { label: "Average Duration", value: "1m 39s", icon: Clock },
    { label: "Unique Callers", value: "4", icon: Users },
    { label: "Missed Calls", value: "1", icon: PhoneMissed },
  ];

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter and Search */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Input
            placeholder="Search by caller name or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Calls List */}
          <div className="lg:col-span-1 space-y-3">
            {mockCalls.map((call) => (
              <div
                key={call.id}
                className={`cursor-pointer transition-all p-4 rounded-lg border border-border ${
                  selectedCall?.id === call.id 
                    ? "bg-muted border-primary" 
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
                onClick={() => setSelectedCall(call)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{call.caller}</p>
                    <p className="text-sm text-muted-foreground truncate">{call.phone}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant={call.status === "ENDED" ? "default" : "secondary"}
                  >
                    {call.status === "ENDED" ? "Call Ended" : "Test"}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {call.duration}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {call.date}, {call.time}
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
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
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
    </div>
  );
}
