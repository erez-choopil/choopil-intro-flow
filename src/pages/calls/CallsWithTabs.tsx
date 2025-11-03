import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, History, Lock } from "lucide-react";
import CallsTable from "./CallsTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

function CallsLandingPage() {
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
    } else {
      setPhoneError("Please enter a valid 10-digit phone number");
    }
  };

  const handleWebCall = () => {
    console.log("Starting web call");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 bg-gradient-to-b from-background to-primary/5">
      <div className="w-full max-w-4xl space-y-8 animate-fade-in">
        {/* Hero Zone */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Meet your new AI receptionist - ready to take your calls
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choopil answers, books, and follows up - so you never miss a lead again.
          </p>
        </div>

        <Alert className="bg-[hsl(220,100%,95%)] border-[hsl(220,100%,85%)]">
          <Lock className="h-4 w-4 text-primary" />
          <AlertDescription className="text-foreground">
            Only you can call Choopil. No external callers will be able to reach this agent until you go-live.
          </AlertDescription>
        </Alert>

        {/* Test Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
}

export default function CallsWithTabs() {
  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b px-6">
          <TabsList className="bg-transparent h-auto p-0">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 data-[state=active]:bg-transparent"
            >
              <Phone className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 data-[state=active]:bg-transparent"
            >
              <History className="h-4 w-4 mr-2" />
              Call History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="m-0">
          <CallsLandingPage />
        </TabsContent>

        <TabsContent value="history" className="m-0">
          <CallsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
