import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
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
      <DialogContent className="max-w-4xl relative">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-2">
            Try a Test Call
          </DialogTitle>
          <p className="text-lg text-muted-foreground text-center">Experience your AI receptionist in action!</p>
        </DialogHeader>

        <p className="text-center text-sm text-muted-foreground mb-6">Choose one option:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Web call
              </Button>
              
            </CardContent>
          </Card>

          {/* Or Divider - visible only on desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-border z-10">
            <span className="text-sm font-medium text-muted-foreground">or</span>
          </div>

          {/* Or Divider - visible only on mobile */}
          <div className="md:hidden flex items-center gap-4 -my-3">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm font-medium text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

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
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input 
                    type="tel" 
                    placeholder="(555) 123-4567" 
                    value={phoneNumber} 
                    onChange={e => handlePhoneChange(e.target.value)} 
                    className={cn(
                      "h-11 border-2 border-primary",
                      phoneError && "border-destructive"
                    )} 
                  />
                  <Button 
                    onClick={handleCallMe} 
                    variant="outline" 
                    size="lg" 
                    disabled={!phoneNumber || !!phoneError} 
                    className="whitespace-nowrap px-6 h-11 border-2 border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Call me now
                  </Button>
                </div>
                {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>;
}