import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callId: string;
}

export function FeedbackModal({ open, onOpenChange, callId }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");

  const handleSendFeedback = () => {
    // Handle feedback submission here
    console.log("Feedback for call", callId, ":", feedback);
    setFeedback("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFeedback("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Leave your feedback about the call</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              How did the call go? Should the assistant do anything differently?
            </label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback here..."
              className="min-h-[120px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSendFeedback} className="bg-green-600 hover:bg-green-700">
            Send feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
