import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Calendar, HelpCircle, Phone, MessageSquare, Ban, Link2 } from "lucide-react";

const capabilities = [
  {
    icon: FileText,
    title: "Take a message",
    description: "Collect caller info and send it to your inbox",
    bgColor: "bg-[#fef3c7]",
  },
  {
    icon: Calendar,
    title: "Book appointments",
    description: "Share a scheduling link or connect your calendar",
    bgColor: "bg-[#cffafe]",
  },
  {
    icon: HelpCircle,
    title: "Answer questions",
    description: "Train your receptionist to respond to FAQs",
    bgColor: "bg-[#dbeafe]",
  },
  {
    icon: Phone,
    title: "Transfer calls",
    description: "Route calls to the right person or department",
    bgColor: "bg-[#ccfbf1]",
  },
  {
    icon: MessageSquare,
    title: "Send texts",
    description: "Text callers with links, directions, or follow-up info",
    bgColor: "bg-[#d1fae5]",
  },
  {
    icon: Ban,
    title: "Block spam calls",
    description: "Automatically hang up on spam and sales calls",
    bgColor: "bg-[#fecdd3]",
  },
  {
    icon: Link2,
    title: "Connect your tools",
    description: "Send call data to other apps via Zapier",
    bgColor: "bg-[#e9d5ff]",
  },
];

export default function Success() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[600px]">
        <div className="text-center mb-8">
          <div className="text-[80px] mb-4">🎉</div>
          <h1 className="text-[32px] font-bold text-success mb-3">
            You are all set!
          </h1>
          <p className="text-base text-muted-foreground">
            Ready to see what your receptionist can do?
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-sm transition-shadow"
              >
                <div className={`${capability.bgColor} p-3 rounded-full shrink-0`}>
                  <Icon className="h-6 w-6 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {capability.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {capability.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          variant="success"
          onClick={handleFinish}
          className="w-full h-14 text-lg"
        >
          <Plus className="h-5 w-5" />
          Let's go!
        </Button>
      </div>
    </div>
  );
}
