import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface UpdateBillingInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billingInfo: {
    businessName: string;
    email: string;
    address: string;
    country: string;
    vatId: string;
  };
}

export function UpdateBillingInfoModal({ open, onOpenChange, billingInfo }: UpdateBillingInfoModalProps) {
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState(billingInfo.businessName);
  const [email, setEmail] = useState(billingInfo.email);
  const [address, setAddress] = useState(billingInfo.address);
  const [country, setCountry] = useState(billingInfo.country);
  const [vatId, setVatId] = useState(billingInfo.vatId);

  const handleSave = () => {
    if (!businessName || !email || !address) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Save billing info logic
    toast({
      title: "Success",
      description: "Billing information updated successfully!"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Billing Information</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="email">Billing Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Invoices and payment notifications will be sent to this email
            </p>
          </div>

          <div>
            <Label htmlFor="address">Billing Address *</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, City, State ZIP"
            />
          </div>

          <div>
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="vatId">VAT/Tax ID (Optional)</Label>
            <Input
              id="vatId"
              value={vatId}
              onChange={(e) => setVatId(e.target.value)}
              placeholder="For EU businesses"
            />
          </div>
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
