import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditPaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  method: {
    id: string;
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    holderName?: string;
    billingZip?: string;
    country?: string;
    isDefault: boolean;
  } | null;
}

export function EditPaymentMethodModal({ open, onOpenChange, method }: EditPaymentMethodModalProps) {
  const { toast } = useToast();
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("US");
  const [setAsDefault, setSetAsDefault] = useState(false);

  useEffect(() => {
    if (method) {
      setExpMonth(method.expMonth.toString().padStart(2, '0'));
      setExpYear(method.expYear.toString());
      setCardholderName(method.holderName || "");
      setZipCode(method.billingZip || "");
      setCountry(method.country || "US");
      setSetAsDefault(method.isDefault);
    }
  }, [method]);

  const handleSave = () => {
    if (!expMonth || !expYear || !cardholderName || !zipCode) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Payment method updated successfully!"
    });
    onOpenChange(false);
  };

  if (!method) return null;

  const brandName = method.brand.charAt(0).toUpperCase() + method.brand.slice(1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Payment Method</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Card Display */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">{brandName} •••• {method.last4}</div>
              <div className="text-xs text-muted-foreground">Card number cannot be changed</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

          <div className="flex items-start space-x-2">
            <Checkbox 
              id="setAsDefault"
              checked={setAsDefault}
              onCheckedChange={(checked) => setSetAsDefault(checked as boolean)}
              className="mt-1"
            />
            <div>
              <Label htmlFor="setAsDefault" className="text-sm font-normal cursor-pointer">
                Set as default payment method
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                This card will be charged for future payments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <Shield className="h-4 w-4 flex-shrink-0" />
            <span>Your payment info is encrypted and secure</span>
          </div>

          <p className="text-xs text-muted-foreground">
            To update card number, please add a new payment method
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
