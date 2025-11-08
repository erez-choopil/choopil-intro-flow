import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddPaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPaymentMethodModal({ open, onOpenChange }: AddPaymentMethodModalProps) {
  const { toast } = useToast();
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("US");
  const [setAsDefault, setSetAsDefault] = useState(false);

  const handleSave = () => {
    // Validation
    if (!cardNumber || !expMonth || !expYear || !cvv || !cardholderName || !zipCode) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Save payment method logic
    toast({
      title: "Success",
      description: "Payment method added successfully!"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number *</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="expMonth">Exp Month *</Label>
              <Select value={expMonth} onValueChange={setExpMonth}>
                <SelectTrigger id="expMonth">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                      {month.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expYear">Exp Year *</Label>
              <Select value={expYear} onValueChange={setExpYear}>
                <SelectTrigger id="expYear">
                  <SelectValue placeholder="YY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                    <SelectItem key={year} value={year.toString().slice(-2)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cvv">CVV *</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={4}
                type="password"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="cardholderName">Cardholder Name *</Label>
            <Input
              id="cardholderName"
              placeholder="John Doe"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode">Billing ZIP *</Label>
              <Input
                id="zipCode"
                placeholder="12345"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="country">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="setAsDefault"
              checked={setAsDefault}
              onCheckedChange={(checked) => setSetAsDefault(checked as boolean)}
            />
            <Label htmlFor="setAsDefault" className="text-sm font-normal cursor-pointer">
              Set as default payment method
            </Label>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded">
            <Shield className="h-4 w-4" />
            <span>Your payment information is encrypted and secure. We never store your full card number.</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Payment Method
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
