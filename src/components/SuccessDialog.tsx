import { MessageSquare, Calendar, HelpCircle, PhoneForwarded, MessageCircle, ShieldOff, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const capabilities = [
  {
    icon: MessageSquare,
    title: "Take a message",
    description: "Collect caller info and send it to your inbox",
    bgColor: "bg-yellow-100 dark:bg-yellow-950",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
  {
    icon: Calendar,
    title: "Book appointments",
    description: "Share a scheduling link or connect your calendar",
    bgColor: "bg-emerald-100 dark:bg-emerald-950",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: HelpCircle,
    title: "Answer questions",
    description: "Train your receptionist to respond to FAQs",
    bgColor: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: PhoneForwarded,
    title: "Transfer calls",
    description: "Route calls to the right person or department",
    bgColor: "bg-cyan-100 dark:bg-cyan-950",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: MessageCircle,
    title: "Send texts",
    description: "Text callers with links, directions, or follow-up info",
    bgColor: "bg-lime-100 dark:bg-lime-950",
    iconColor: "text-lime-600 dark:text-lime-400",
  },
  {
    icon: ShieldOff,
    title: "Block spam calls",
    description: "Automatically hang up on spam and sales calls",
    bgColor: "bg-rose-100 dark:bg-rose-950",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    icon: Zap,
    title: "Connect your tools",
    description: "Send call data to other apps via Zapier",
    bgColor: "bg-purple-100 dark:bg-purple-950",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
];

export function SuccessDialog({ open, onOpenChange }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-success">
            You are all set!
          </DialogTitle>
          <DialogDescription className="text-center text-lg text-muted-foreground">
            Ready to see what your receptionist can do?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className={`${capability.bgColor} p-3 rounded-lg shrink-0`}>
                <capability.icon className={`h-6 w-6 ${capability.iconColor}`} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {capability.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {capability.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => onOpenChange(false)}
          className="w-full bg-success hover:bg-success/90 text-white py-6 text-lg font-medium"
        >
          ✨ Let's go!
        </Button>
      </DialogContent>
    </Dialog>
  );
}
