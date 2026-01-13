import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Play,
  MessageSquare,
  Download,
  Star,
  AlertCircle,
  CheckCircle2,
  Ban,
  Beaker,
  ArrowLeft,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FeedbackModal } from "@/components/calls/FeedbackModal";

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

// This would typically come from a context or API
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

export default function CallDetail() {
  const { callId } = useParams();
  const navigate = useNavigate();
  const [call, setCall] = useState<Call | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    const foundCall = mockCalls.find(c => c.id === callId);
    if (foundCall) {
      setCall(foundCall);
    }
  }, [callId]);

  const handleToggleStar = () => {
    if (call) {
      setCall({ ...call, isStarred: !call.isStarred });
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

  if (!call) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/dashboard/calls")} className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Calls
        </Button>
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          Call not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate("/dashboard/calls")} className="mb-4 gap-2 -ml-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Calls
      </Button>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground">{call.caller}</h1>
              {getStatusBadge(call.status)}
            </div>
            <p className="text-muted-foreground">{call.phone}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{call.date}, 2025 · {call.time}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {call.duration}
              </span>
            </div>
          </div>
          <TooltipProvider>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowFeedbackModal(true)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Leave Feedback</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download call audio</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleToggleStar}
                  >
                    <Star className={`h-5 w-5 ${call.isStarred ? 'text-yellow-600 fill-yellow-600' : 'text-muted-foreground'}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {call.isStarred ? 'Unstar this call' : 'Star this call'}
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        {/* Call Summary */}
        <div className="rounded-lg border border-border bg-card p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-4 w-4 text-primary" />
            <h2 className="font-semibold text-foreground">Call Summary</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {call.summary}
          </p>
        </div>

        {/* Audio Player */}
        <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
          <Button size="icon" className="h-10 w-10 rounded-full flex-shrink-0">
            <Play className="h-4 w-4" />
          </Button>
          <div className="flex-1 flex items-center gap-0.5 h-12 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/70 rounded-sm"
                style={{
                  height: `${Math.random() * 100}%`,
                  minHeight: '10%'
                }}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground flex-shrink-0">{call.duration}</span>
        </div>

        {/* Transcript */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Transcript</h2>
          <div className="space-y-3">
            {call.transcript.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  item.role === "agent"
                    ? "bg-primary/10 ml-4 md:ml-8"
                    : "bg-muted mr-4 md:mr-8"
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

      <FeedbackModal
        open={showFeedbackModal}
        onOpenChange={setShowFeedbackModal}
        callId={call.id}
      />
    </div>
  );
}
