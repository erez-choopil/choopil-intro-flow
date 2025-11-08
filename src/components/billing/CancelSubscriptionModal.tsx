import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";

interface CancelSubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: {
    planName: string;
    nextBillingDate: string;
  };
}

export function CancelSubscriptionModal({ open, onOpenChange, subscription }: CancelSubscriptionModalProps) {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleCancel = () => {
    // Handle cancellation logic
    console.log("Subscription canceled", { reason, feedback });
    onOpenChange(false);
    setStep(1);
    setReason("");
    setFeedback("");
    setConfirmed(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep(1);
    setReason("");
    setFeedback("");
    setConfirmed(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "We're Sorry to See You Go"}
            {step === 2 && "Before You Go..."}
            {step === 3 && "Confirm Cancellation"}
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Feedback Survey */}
        {step === 1 && (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              We'd love to understand why you're canceling. Your feedback helps us improve.
            </p>
            <RadioGroup value={reason} onValueChange={setReason}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="too_expensive" id="too_expensive" />
                <Label htmlFor="too_expensive">Too expensive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not_using" id="not_using" />
                <Label htmlFor="not_using">Not using it enough</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="switching" id="switching" />
                <Label htmlFor="switching">Switching to a competitor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="missing_features" id="missing_features" />
                <Label htmlFor="missing_features">Missing features I need</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
            <div>
              <Label htmlFor="feedback">Additional feedback (optional)</Label>
              <Textarea
                id="feedback"
                placeholder="Tell us more about your experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Step 2: Retention Offer */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Special Offer: Stay with Choopil</h3>
              <p className="text-muted-foreground">
                We'd love to keep you! How about <strong>20% off your next 3 months</strong>?
              </p>
              <div className="flex gap-3">
                <Button className="flex-1" onClick={handleClose}>
                  Accept Offer & Stay
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleNext}>
                  Continue Canceling
                </Button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Or consider downgrading to a lower plan?</p>
              <Button variant="link" onClick={() => {
                onOpenChange(false);
                // Open change plan modal
              }}>
                View Other Plans
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Final Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 space-y-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <h3 className="text-lg font-semibold">Your subscription will be canceled</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Last day of access:</strong> {subscription.nextBillingDate}</p>
                <p><strong>Refund:</strong> $0.00 (charges are non-refundable)</p>
                <p><strong>Data retention:</strong> Your data will be deleted 90 days after cancellation</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="confirm" 
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
              />
              <Label htmlFor="confirm" className="text-sm font-normal cursor-pointer">
                I understand that I will lose access to Choopil and all my data after {subscription.nextBillingDate}
              </Label>
            </div>
          </div>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 3 ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleNext} disabled={step === 1 && !reason}>
                Continue
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleClose}>
                Keep My Plan
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleCancel}
                disabled={!confirmed}
              >
                Confirm Cancellation
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
