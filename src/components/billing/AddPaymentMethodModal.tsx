import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CardBrandIcon } from "./CardBrandIcon";
import { CheckCircle2, Lock } from "lucide-react";

interface BillingAddress {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  businessName?: string;
  email?: string;
}

interface AddPaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billingAddress?: BillingAddress;
  onEditBillingInfo?: () => void;
  onSuccess?: (paymentMethod: { brand: string; last4: string; expMonth: number; expYear: number; isDefault: boolean }) => void;
}

export function AddPaymentMethodModal({ 
  open, 
  onOpenChange, 
  billingAddress,
  onEditBillingInfo,
  onSuccess 
}: AddPaymentMethodModalProps) {
  const { toast } = useToast();
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [setAsDefault, setSetAsDefault] = useState(false);
  
  // Inline address fields (when no billing info exists)
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("US");

  const getCardBrand = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    return 'unknown';
  };

  const getPostalCodeLabel = () => {
    const labels: { [key: string]: string } = {
      US: 'ZIP Code',
      GB: 'Postcode',
      CA: 'Postal Code',
    };
    return labels[country] || 'Postal/ZIP Code';
  };

  const getStateLabel = () => {
    const labels: { [key: string]: string } = {
      US: 'State',
      CA: 'Province',
      AU: 'State',
      GB: 'County',
    };
    return labels[country] || 'State/Province/Region';
  };

  const handleSave = () => {
    if (!cardNumber || !expiration || !cvv || !cardholderName) {
      toast({
        title: "Error",
        description: "Please fill in all required card details",
        variant: "destructive"
      });
      return;
    }

    if (!billingAddress && (!addressLine1 || !city || !postalCode)) {
      toast({
        title: "Error",
        description: "Please fill in all required address fields",
        variant: "destructive"
      });
      return;
    }

    // Extract card details
    const [expMonth, expYear] = expiration.split('/');
    const last4 = cardNumber.replace(/\s/g, '').slice(-4);
    const brand = getCardBrand(cardNumber);

    // Call onSuccess callback with new payment method
    if (onSuccess) {
      onSuccess({
        brand,
        last4,
        expMonth: parseInt(expMonth),
        expYear: 2000 + parseInt(expYear),
        isDefault: setAsDefault
      });
    }

    toast({
      title: "Success",
      description: "Payment method added successfully!"
    });
    
    // Reset form
    setCardNumber("");
    setExpiration("");
    setCvv("");
    setCardholderName("");
    setSetAsDefault(false);
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setPostalCode("");
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Card Details Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Card Details</h3>
            <div className="h-px bg-border" />

            <div>
              <Label htmlFor="cardNumber">Card Number *</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, '');
                    if (value.length <= 16 && /^\d*$/.test(value)) {
                      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                      setCardNumber(formatted);
                    }
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="pr-10"
                />
                {cardNumber && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CardBrandIcon brand={getCardBrand(cardNumber)} />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiration">Expiration Date *</Label>
                <Input
                  id="expiration"
                  value={expiration}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) {
                      const formatted = value.length >= 2 
                        ? `${value.slice(0, 2)}/${value.slice(2)}` 
                        : value;
                      setExpiration(formatted);
                    }
                  }}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>

              <div>
                <Label htmlFor="cvv">CVC *</Label>
                <Input
                  id="cvv"
                  type="password"
                  value={cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) {
                      setCvv(value);
                    }
                  }}
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cardholderName">Cardholder Name *</Label>
              <Input
                id="cardholderName"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder="John Smith"
              />
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Billing Address Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Billing Address</h3>

            {billingAddress ? (
              <>
                <div className="flex items-start gap-2 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Uses your saved billing address</span>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
                  {billingAddress.businessName && (
                    <p className="font-medium">{billingAddress.businessName}</p>
                  )}
                  {billingAddress.email && (
                    <p className="text-sm text-muted-foreground">{billingAddress.email}</p>
                  )}
                  <p className="text-sm">{billingAddress.line1}</p>
                  {billingAddress.line2 && (
                    <p className="text-sm">{billingAddress.line2}</p>
                  )}
                  <p className="text-sm">
                    {billingAddress.city}, {billingAddress.state} {billingAddress.postalCode}
                  </p>
                  <p className="text-sm">{billingAddress.country}</p>
                  
                  {onEditBillingInfo && (
                    <div className="pt-2">
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-blue-600"
                        onClick={onEditBillingInfo}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    This will be saved to your billing information for future use
                  </p>
                </div>

                <div>
                  <Label htmlFor="addressLine1">Address Line 1 *</Label>
                  <Input
                    id="addressLine1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder="Apartment, suite, unit, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">{getStateLabel()} *</Label>
                    <Input
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder={getStateLabel()}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode">{getPostalCodeLabel()} *</Label>
                    <Input
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder={getPostalCodeLabel()}
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="ES">Spain</SelectItem>
                        <SelectItem value="IT">Italy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="default"
              checked={setAsDefault}
              onCheckedChange={(checked) => setSetAsDefault(checked as boolean)}
            />
            <Label htmlFor="default" className="cursor-pointer">
              Set as default payment method
            </Label>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <Lock className="h-4 w-4 flex-shrink-0" />
            <span>Your payment information is encrypted and secure. Powered by Stripe.</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Add Payment Method
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
