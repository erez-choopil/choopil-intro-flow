import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface WebCallActiveModalProps {
  open: boolean;
  onEndCall: () => void;
}

export function WebCallActiveModal({ open, onEndCall }: WebCallActiveModalProps) {
  const { toast } = useToast();
  const [status, setStatus] = useState<"connecting" | "active" | "ending">("connecting");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (open) {
      setStatus("connecting");
      setSeconds(0);
      
      // Simulate connection
      const connectTimer = setTimeout(() => {
        setStatus("active");
      }, 1500);

      return () => clearTimeout(connectTimer);
    }
  }, [open]);

  useEffect(() => {
    if (status === "active") {
      const interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    setStatus("ending");
    setTimeout(() => {
      onEndCall();
      toast({
        title: "Call ended",
        description: "Your test call has been disconnected.",
      });
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-[400px] p-8 gap-6"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Phone Icon with Pulse Animation */}
          <div className="relative">
            <div className={`absolute inset-0 rounded-full bg-success/20 ${status === "active" ? "animate-ping" : ""}`} />
            <div className="relative w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              {status === "connecting" ? (
                <Loader2 className="h-8 w-8 text-success animate-spin" />
              ) : (
                <Phone className="h-8 w-8 text-success" />
              )}
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              {status === "connecting" && "Connecting..."}
              {status === "active" && "Call in Progress"}
              {status === "ending" && "Ending call..."}
            </h2>

            {/* Body Text */}
            {status === "active" && (
              <p className="text-sm text-muted-foreground">
                You're now connected to your AI receptionist. Test how it answers calls.
              </p>
            )}
          </div>

          {/* Call Duration */}
          {status === "active" && (
            <div className="text-3xl font-mono text-muted-foreground">
              {formatTime(seconds)}
            </div>
          )}

          {/* End Call Button */}
          {status === "active" && (
            <Button
              onClick={handleEndCall}
              variant="destructive"
              size="lg"
              className="w-full"
            >
              End Call
            </Button>
          )}

          {status === "ending" && (
            <Button
              disabled
              variant="destructive"
              size="lg"
              className="w-full"
            >
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Ending call...
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
