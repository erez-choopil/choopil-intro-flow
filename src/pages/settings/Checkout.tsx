import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import choopilLogo from "@/assets/choopil-logo.svg";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const planDetails = location.state || { name: "Starter", price: "$24.95", annualPrice: "$19.96", isAnnual: true };
  const isAnnual = planDetails.isAnnual ?? true;
  const displayPrice = isAnnual ? planDetails.annualPrice : planDetails.price;
  
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [country, setCountry] = useState("Israel");
  const [promoCode, setPromoCode] = useState("");

  const handleSubscribe = () => {
    if (!cardNumber.trim() || !expiry.trim() || !cvc.trim() || !cardholderName.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all payment details.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Subscription successful",
      description: `You've been subscribed to the ${planDetails.name} plan.`,
    });
    
    navigate("/dashboard/settings/billing");
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] flex">
      {/* Left side - Summary */}
      <div className="w-2/5 bg-white p-8 flex flex-col">
        <Button
          variant="ghost"
          className="w-fit mb-8 -ml-3"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <img src={choopilLogo} alt="Choopil" className="h-5" />
        </Button>

        <div className="flex-1">
          <h1 className="text-xl text-muted-foreground mb-2">
            Subscribe to {planDetails.name} plan
          </h1>
          <div className="mb-8">
            <span className="text-5xl font-bold text-foreground">
              {displayPrice}
            </span>
            <span className="text-muted-foreground ml-2">per<br/>month</span>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center py-2">
              <span className="text-foreground">{planDetails.name} plan</span>
              <span className="font-semibold text-foreground">{displayPrice}</span>
            </div>
            <div className="text-sm text-muted-foreground">Billed {isAnnual ? 'annually' : 'monthly'}</div>
          </div>

          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-foreground">{displayPrice}</span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start text-primary hover:text-primary/80 p-0"
            onClick={() => {
              const expanded = document.getElementById("promo-section");
              if (expanded) {
                expanded.classList.toggle("hidden");
              }
            }}
          >
            Add promotion code
          </Button>

          <div id="promo-section" className="hidden mt-2">
            <Input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
            />
          </div>

          <div className="border-t mt-6 pt-6">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">Total due today</span>
              <span className="text-2xl font-bold text-foreground">{displayPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Payment form */}
      <div className="flex-1 p-8 flex items-start justify-center pt-20">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Contact information</h2>
            <div className="bg-white rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm text-foreground">erez@choopil.com</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Payment method</h2>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-foreground mb-2">Card information</Label>
                <div className="bg-white rounded-lg border overflow-hidden">
                  <div className="relative">
                    <Input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 1234 1234 1234"
                      className="border-0 rounded-none border-b"
                    />
                    <div className="absolute right-3 top-3 flex gap-1">
                      <div className="w-6 h-4 bg-blue-600 rounded"></div>
                      <div className="w-6 h-4 bg-red-600 rounded"></div>
                      <div className="w-6 h-4 bg-blue-400 rounded"></div>
                    </div>
                  </div>
                  <div className="flex">
                    <Input
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="border-0 rounded-none border-r flex-1"
                    />
                    <div className="relative flex-1">
                      <Input
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="CVC"
                        className="border-0 rounded-none"
                      />
                      <CreditCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm text-foreground mb-2">Cardholder name</Label>
                <Input
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Full name on card"
                  className="bg-white"
                />
              </div>

              <div>
                <Label className="text-sm text-foreground mb-2">Country or region</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Israel">Israel</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSubscribe}
                className="w-full bg-success hover:bg-success/90 text-white h-12"
              >
                Subscribe
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By subscribing, you authorize Upfirst Inc. to charge you according to the terms until you cancel.
              </p>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                <span>Powered by</span>
                <span className="font-semibold text-[#635BFF]">stripe</span>
                <span>|</span>
                <a href="#" className="hover:text-foreground">Terms</a>
                <a href="#" className="hover:text-foreground">Privacy</a>
                <a href="#" className="hover:text-foreground">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
