import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { 
  Filter, 
  Globe, 
  Clock, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Play,
  MessageSquare,
  User,
  Phone,
  Download,
  X
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    caller: "erezkim@post.bgu.ac.il",
    duration: "0:01",
    date: "Oct 20",
    time: "5:03 PM",
    status: "TEST",
    summary: "Brief test call to verify system functionality.",
    phone: "+14155552487",
    transcript: [
      { role: "agent", message: "You've reached DJ Erez. How can I help you today?" },
      { role: "caller", message: "Hi, How are you?" },
    ],
  },
  {
    id: "2",
    caller: "erezkim@post.bgu.ac.il",
    duration: "3:10",
    date: "Oct 20",
    time: "4:56 PM",
    status: "TEST",
    summary: "Test call to check greeting and response time.",
    phone: "+14155552487",
    transcript: [
      { role: "agent", message: "You've reached DJ Erez. How can I help you today?" },
      { role: "caller", message: "Hi, How are you?" },
    ],
  },
  {
    id: "3",
    caller: "(510) 717-6080",
    duration: "0:34",
    date: "Oct 12",
    time: "2:16 AM",
    status: "ENDED",
    summary: "Customer inquiry about DJ services availability.",
    phone: "+15107176080",
    transcript: [
      { role: "agent", message: "You've reached DJ Erez. How can I help you today?" },
      { role: "caller", message: "Hi, How are you?" },
    ],
  },
  {
    id: "4",
    caller: "(510) 717-6080",
    duration: "1:37",
    date: "Oct 11",
    time: "1:50 PM",
    status: "ENDED",
    summary: "Orin called to inquire about booking DJ Eris for his wife's birthday party and requested information on pricing and availability. He provided his phone number for follow-up. The agent confirmed that someone will contact him soon with more details, as they do not have the DJ's availability on hand. No further requests were made.",
    phone: "+14155552487",
    transcript: [
      { role: "agent", message: "You've reached DJ Erez. How can I help you today?" },
      { role: "caller", message: "Hi, How are you?" },
      { role: "agent", message: "I'm doing great, thanks for asking! What can I help you with today?" },
      { role: "caller", message: "I would like to schedule an appointment with," },
      { role: "caller", message: "DJ Eris." },
      { role: "agent", message: "Got it! Could you tell me a bit about the event you're planning? For example, the type of event and the date, if you have one in mind." },
    ],
  },
  {
    id: "5",
    caller: "erezkim@post.bgu.ac.il",
    duration: "1:27",
    date: "Oct 11",
    time: "1:34 PM",
    status: "TEST",
    summary: "Final test call before going live.",
    phone: "+14155552487",
    transcript: [
      { role: "agent", message: "You've reached DJ Erez. How can I help you today?" },
      { role: "caller", message: "Hi, How are you?" },
    ],
  },
];

export default function CallsTable() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calls</h1>
          <div className="text-sm text-muted-foreground mt-2">
            Call your agent at{" "}
            <span className="font-semibold text-foreground">(415) 413-5501</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 w-40">
            <Globe className="h-4 w-4" />
            Web call
          </Button>
          <Button variant="outline" className="gap-2 w-40">
            <Phone className="h-4 w-4" />
            Call AI assistant
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Input
          placeholder="Search by phone, email, or phrase"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Calls Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Caller</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCalls.map((call) => (
              <TableRow
                key={call.id}
                className="cursor-pointer"
                onClick={() => setSelectedCall(call)}
              >
                <TableCell className="font-medium">{call.caller}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {call.duration}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {call.date}, {call.time}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={call.status === "ENDED" ? "default" : "secondary"}
                    className={call.status === "ENDED" ? "bg-success text-white" : ""}
                  >
                    {call.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <Button variant="ghost" size="sm" className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        <span className="text-sm text-muted-foreground">1-5 of 5</span>
        <Button variant="ghost" size="sm" className="gap-2">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Call Details Sheet */}
      <Sheet open={!!selectedCall} onOpenChange={() => setSelectedCall(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedCall && (
            <>
              <SheetHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <SheetTitle className="text-xl">{selectedCall.caller}</SheetTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedCall.date}, {selectedCall.time}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedCall(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Summary Card */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-amber-700" />
                        <h3 className="font-semibold text-amber-900">Summary</h3>
                      </div>
                      <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-900">
                        Leave feedback
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-amber-900 min-w-[60px]">Name</span>
                        <span className="text-amber-800">Orin</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-amber-900 min-w-[60px]">Phone</span>
                        <span className="text-amber-800">{selectedCall.phone}</span>
                      </div>
                      <div className="mt-3">
                        <p className="text-amber-900 leading-relaxed">
                          {selectedCall.summary}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Audio Player */}
                <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
                  <Button size="icon" variant="ghost">
                    <Play className="h-5 w-5" />
                  </Button>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 h-8">
                      {Array.from({ length: 80 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full"
                          style={{
                            height: `${Math.random() * 100}%`,
                            backgroundColor: i < 30 ? "hsl(var(--primary))" : "hsl(var(--muted))",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">01:27</span>
                  <Button size="icon" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                {/* Transcript */}
                <div className="space-y-4">
                  {selectedCall.transcript.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${item.role === "agent" ? "bg-primary/10" : "bg-success/10"}`}>
                        {item.role === "agent" ? (
                          <MessageSquare className="h-4 w-4 text-primary" />
                        ) : (
                          <User className="h-4 w-4 text-success" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-foreground capitalize">
                            {item.role}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{item.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
