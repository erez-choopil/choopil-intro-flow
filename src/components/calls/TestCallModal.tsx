import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { useState } from "react";
interface TestCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function TestCallModal({
  open,
  onOpenChange
}: TestCallModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length === 10;
  };
  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    if (value && !validatePhone(value)) {
      setPhoneError("Please enter a valid 10-digit phone number");
    } else {
      setPhoneError("");
    }
  };
  const handleCallMe = () => {
    if (validatePhone(phoneNumber)) {
      console.log("Calling:", phoneNumber);
      onOpenChange(false);
    } else {
      setPhoneError("Please enter a valid 10-digit phone number");
    }
  };
  const handleWebCall = () => {
    console.log("Starting web call");
    onOpenChange(false);
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-2">
            Try a Test Call
          </DialogTitle>
          <p className="text-lg text-muted-foreground text-center">Experience your AI receptionist in action!</p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Web Call Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground text-left">
                  Web call
                </h3>
                <p className="text-sm text-muted-foreground text-left">
                  Test with a web call using your browser. No phone needed.
                </p>
              </div>
              <Button onClick={handleWebCall} className="w-full" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Web call
              </Button>
              
            </CardContent>
          </Card>

          {/* AI Assistant Call Me Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground text-left">
                  AI assistant call me
                </h3>
                <p className="text-sm text-muted-foreground text-left">Enter your phone number and Choopil will call you.

              </p>
              </div>
              <div className="space-y-3">
                <Input type="tel" placeholder="(555) 123-4567" value={phoneNumber} onChange={e => handlePhoneChange(e.target.value)} className={phoneError ? "border-destructive" : ""} />
                {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
                <Button onClick={handleCallMe} variant="outline" className="w-full" size="lg" disabled={!phoneNumber || !!phoneError}>
                  Call me now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>;
}