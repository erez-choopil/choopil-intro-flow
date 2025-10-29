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
  Download,
  PhoneOff
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    { label: "Total Calls", value: "4", icon: Phone, bgColor: "bg-emerald-100" },
    { label: "Average Duration", value: "1m 39s", icon: Clock, bgColor: "bg-emerald-100" },
    { label: "Unique Callers", value: "4", icon: Users, bgColor: "bg-emerald-100" },
    { label: "Missed Calls", value: "1", icon: PhoneMissed, bgColor: "bg-emerald-100" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background p-6">
        <h1 className="text-2xl font-bold text-foreground">Call History</h1>
        <p className="text-sm text-muted-foreground mt-1">View and manage your call history</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="history" className="w-full">
        <div className="border-b px-6">
          <TabsList className="bg-transparent h-auto p-0">
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 data-[state=active]:bg-transparent"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call History
            </TabsTrigger>
            <TabsTrigger 
              value="contacts" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 data-[state=active]:bg-transparent"
            >
              <Users className="h-4 w-4 mr-2" />
              Contacts
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="history" className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <stat.icon className="h-5 w-5 text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Area */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-foreground">Your Calls, All in One Place</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Track, review, and follow up on every customer interaction with precision.
              </p>
            </div>

            {/* Filter and Search */}
            <div className="flex items-center gap-3 mb-4">
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
              <div className="lg:col-span-1 space-y-2">
                {mockCalls.map((call) => (
                  <Card
                    key={call.id}
                    className={`cursor-pointer transition-colors ${
                      selectedCall?.id === call.id ? "border-primary bg-accent" : "hover:bg-accent/50"
                    }`}
                    onClick={() => setSelectedCall(call)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-foreground">{call.caller}</p>
                          <p className="text-sm text-muted-foreground">{call.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <Badge
                          variant={call.status === "ENDED" ? "default" : "secondary"}
                          className={call.status === "ENDED" ? "bg-emerald-600" : call.status === "TEST" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : ""}
                        >
                          {call.status === "ENDED" ? "Call Ended" : call.status === "TEST" ? "Test" : call.status}
                        </Badge>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {call.duration}
                          </span>
                          <span>{call.date}, {call.time}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Right: Call Details */}
              <div className="lg:col-span-2">
                {selectedCall ? (
                  <Card>
                    <CardContent className="p-6 space-y-6">
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
                      <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <MessageSquare className="h-4 w-4 text-amber-700" />
                            <h4 className="font-semibold text-amber-900 dark:text-amber-100">Call Summary</h4>
                          </div>
                          <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
                            {selectedCall.summary}
                          </p>
                        </CardContent>
                      </Card>

                      {/* Audio Player */}
                      <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white">
                          <Play className="h-4 w-4" />
                        </Button>
                        <div className="flex-1 flex items-center gap-0.5 h-12">
                          {Array.from({ length: 80 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-1 rounded-full bg-emerald-400"
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
                        <select className="text-sm border rounded px-2 py-1">
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
                                <div className={`p-2 rounded-full ${item.role === "agent" ? "bg-blue-100" : "bg-emerald-100"}`}>
                                  {item.role === "agent" ? (
                                    <MessageSquare className="h-4 w-4 text-blue-600" />
                                  ) : (
                                    <Phone className="h-4 w-4 text-emerald-600" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-foreground capitalize mb-1">
                                    {item.role}
                                  </p>
                                  <p className="text-sm text-foreground">{item.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No transcript available</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select a call to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="p-6">
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Contacts feature coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
