import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Lock, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TestStepProps {
  onExplorePlans: () => void;
}

export default function TestStep({ onExplorePlans }: TestStepProps) {
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
      // API call to trigger outbound call (implementation TBD)
      console.log("Calling:", phoneNumber);
    } else {
      setPhoneError("Please enter a valid 10-digit phone number");
    }
  };

  const handleWebCall = () => {
    // Open browser-based calling interface (implementation TBD)
    console.log("Starting web call");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Your agent is ready. Make your first test call.</h1>
        <p className="text-muted-foreground">
          Know what your callers will hear when they call.
        </p>
      </div>

      <Alert className="bg-[hsl(220,100%,95%)] border-[hsl(220,100%,85%)]">
        <Lock className="h-4 w-4 text-primary" />
        <AlertDescription className="text-foreground">
          Only you can call Choopil. No external callers will be able to reach this agent until you go-live.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Web Call Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Web call</h3>
              <p className="text-sm text-muted-foreground">
                Test with a web call using your browser. No phone needed.
              </p>
            </div>
            <Button onClick={handleWebCall} className="w-full" size="lg">
              <Phone className="h-4 w-4 mr-2" />
              Web call
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              No phone nearby? Test with a web call.
            </p>
          </CardContent>
        </Card>

        {/* AI Assistant Call Me Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">AI assistant call me</h3>
              <p className="text-sm text-muted-foreground">
                Enter your phone number and Choopil will call you.
              </p>
            </div>
            <div className="space-y-3">
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={phoneError ? "border-destructive" : ""}
              />
              {phoneError && (
                <p className="text-sm text-destructive">{phoneError}</p>
              )}
              <Button 
                onClick={handleCallMe} 
                variant="outline" 
                className="w-full" 
                size="lg"
                disabled={!phoneNumber || !!phoneError}
              >
                Call me now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4 pt-8">
        <p className="text-lg font-medium text-primary">
          Choose a live plan to accept customer calls
        </p>
        <Button onClick={onExplorePlans} size="lg" className="px-8">
          Explore Live Plans
        </Button>
      </div>
    </div>
  );
}
