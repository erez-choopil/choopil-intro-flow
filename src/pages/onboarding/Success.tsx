import { MessageSquare, Calendar, HelpCircle, PhoneForwarded, MessageCircle, ShieldOff, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SignupForm } from "@/components/auth/SignupForm";

const capabilities = [
  {
    icon: MessageSquare,
    title: "Take a message",
    description: "Collect caller info and send it to your inbox",
  },
  {
    icon: Calendar,
    title: "Book appointments",
    description: "Share a scheduling link or connect your calendar",
  },
  {
    icon: HelpCircle,
    title: "Answer questions",
    description: "Train your receptionist to respond to FAQs",
  },
  {
    icon: PhoneForwarded,
    title: "Transfer calls",
    description: "Route calls to the right person or department",
  },
  {
    icon: MessageCircle,
    title: "Send texts",
    description: "Text callers with links, directions, or follow-up info",
  },
  {
    icon: ShieldOff,
    title: "Block spam calls",
    description: "Automatically hang up on spam and sales calls",
  },
  {
    icon: Zap,
    title: "Connect your tools",
    description: "Send call data to other apps via Zapier",
  },
];

export default function Success() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Success Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary">
              You're all set!
            </h1>
            <p className="text-xl text-muted-foreground">
              Here's what your assistant can do for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((capability, index) => (
              <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                      <capability.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {capability.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center bg-muted/30 p-8">
        <SignupForm />
      </div>
    </div>
  );
}
