import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Info, X, Plus } from "lucide-react";

interface BillingInformation {
  customerType: 'business' | 'individual';
  legalName: string;
  displayName?: string;
  billingEmails: string[];
  billingContactName?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  phone?: string;
  taxIds: Array<{
    type: string;
    value: string;
  }>;
}

interface UpdateBillingInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billingInfo: BillingInformation;
  onSave?: (info: BillingInformation) => void;
}

export function UpdateBillingInfoModal({ open, onOpenChange, billingInfo, onSave }: UpdateBillingInfoModalProps) {
  const { toast } = useToast();
  
  const [customerType, setCustomerType] = useState<'business' | 'individual'>(billingInfo.customerType);
  const [legalName, setLegalName] = useState(billingInfo.legalName);
  const [displayName, setDisplayName] = useState(billingInfo.displayName || '');
  const [billingEmails, setBillingEmails] = useState<string[]>(billingInfo.billingEmails);
  const [newEmail, setNewEmail] = useState('');
  const [billingContactName, setBillingContactName] = useState(billingInfo.billingContactName || '');
  const [addressLine1, setAddressLine1] = useState(billingInfo.address.line1);
  const [addressLine2, setAddressLine2] = useState(billingInfo.address.line2 || '');
  const [city, setCity] = useState(billingInfo.address.city);
  const [state, setState] = useState(billingInfo.address.state || '');
  const [postalCode, setPostalCode] = useState(billingInfo.address.postalCode);
  const [country, setCountry] = useState(billingInfo.address.country);
  const [phone, setPhone] = useState(billingInfo.phone || '');
  const [taxIds, setTaxIds] = useState(billingInfo.taxIds);
  
  const [addressOpen, setAddressOpen] = useState(true);
  const [taxInfoOpen, setTaxInfoOpen] = useState(false);

  useEffect(() => {
    setCustomerType(billingInfo.customerType);
    setLegalName(billingInfo.legalName);
    setDisplayName(billingInfo.displayName || '');
    setBillingEmails(billingInfo.billingEmails);
    setBillingContactName(billingInfo.billingContactName || '');
    setAddressLine1(billingInfo.address.line1);
    setAddressLine2(billingInfo.address.line2 || '');
    setCity(billingInfo.address.city);
    setState(billingInfo.address.state || '');
    setPostalCode(billingInfo.address.postalCode);
    setCountry(billingInfo.address.country);
    setPhone(billingInfo.phone || '');
    setTaxIds(billingInfo.taxIds);
  }, [billingInfo]);

  const addEmail = () => {
    if (newEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      setBillingEmails([...billingEmails, newEmail]);
      setNewEmail('');
    }
  };

  const removeEmail = (index: number) => {
    setBillingEmails(billingEmails.filter((_, i) => i !== index));
  };

  const addTaxId = () => {
    setTaxIds([...taxIds, { type: '', value: '' }]);
  };

  const removeTaxId = (index: number) => {
    setTaxIds(taxIds.filter((_, i) => i !== index));
  };

  const updateTaxId = (index: number, field: 'type' | 'value', value: string) => {
    const updated = [...taxIds];
    updated[index][field] = value;
    setTaxIds(updated);
  };

  const getTaxIdTypes = () => {
    const taxTypes: { [key: string]: string[] } = {
      US: ['us_ein|EIN (Employer Identification Number)', 'us_ssn|SSN (Social Security Number)'],
      GB: ['gb_vat|GB VAT Number'],
      CA: ['ca_bn|BN (Business Number)'],
      AU: ['au_abn|ABN (Australian Business Number)', 'au_acn|ACN (Australian Company Number)'],
      IL: ['il_vat|IL VAT Number'],
    };
    
    const euCountries = ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'];
    
    if (euCountries.includes(country)) {
      return [`eu_vat|VAT Number (${country})`];
    }
    
    return taxTypes[country] || ['tax_id|Tax ID'];
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
    if (!legalName || billingEmails.length === 0 || !addressLine1 || !city || !postalCode || !country) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedInfo: BillingInformation = {
      customerType,
      legalName,
      displayName: displayName || undefined,
      billingEmails,
      billingContactName: billingContactName || undefined,
      address: {
        line1: addressLine1,
        line2: addressLine2 || undefined,
        city,
        state: state || undefined,
        postalCode,
        country,
      },
      phone: phone || undefined,
      taxIds: taxIds.filter(t => t.type && t.value),
    };

    if (onSave) {
      onSave(updatedInfo);
    }

    toast({
      title: "Success",
      description: "Billing information updated successfully!"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Billing Information</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Account Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Account Details
            </h3>
            <div className="h-px bg-border" />

            <div className="space-y-2">
              <Label>Customer Type *</Label>
              <RadioGroup value={customerType} onValueChange={(v) => setCustomerType(v as 'business' | 'individual')}>
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business" className="cursor-pointer">Business</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual" className="cursor-pointer">Individual</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="legalName">{customerType === 'business' ? 'Legal Business Name' : 'Full Name'} *</Label>
              <Input
                id="legalName"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                placeholder={customerType === 'business' ? 'Your Company, Inc.' : 'John Smith'}
              />
              {customerType === 'business' && (
                <p className="text-xs text-muted-foreground mt-1">
                  As it appears on official documents
                </p>
              )}
            </div>

            {customerType === 'business' && (
              <div>
                <Label htmlFor="displayName">Display Name (Optional)</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your Brand"
                />
                <div className="flex items-center gap-1 mt-1">
                  <Info className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    How your business name appears to customers
                  </p>
                </div>
              </div>
            )}

            <div>
              <Label>Billing Email(s) *</Label>
              <div className="space-y-2">
                {billingEmails.map((email, index) => (
                  <div key={index} className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-2">
                    <span className="text-sm flex-1">{email}</span>
                    {billingEmails.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => removeEmail(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="email@company.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addEmail()}
                  />
                  <Button type="button" variant="outline" onClick={addEmail}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {customerType === 'business' && (
              <div>
                <Label htmlFor="contactName">Billing Contact Name (Optional)</Label>
                <Input
                  id="contactName"
                  value={billingContactName}
                  onChange={(e) => setBillingContactName(e.target.value)}
                  placeholder="John Smith"
                />
                <div className="flex items-center gap-1 mt-1">
                  <Info className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    Person responsible for billing inquiries
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Billing Address */}
          <Collapsible open={addressOpen} onOpenChange={setAddressOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">Billing Address</h3>
              <ChevronDown className={`h-5 w-5 transition-transform ${addressOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <div className="h-px bg-border mt-2" />
            
            <CollapsibleContent className="space-y-4 mt-4">
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
                    <SelectItem value="NL">Netherlands</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="line1">Address Line 1 *</Label>
                <Input
                  id="line1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Street address"
                />
              </div>

              <div>
                <Label htmlFor="line2">Address Line 2 (Optional)</Label>
                <Input
                  id="line2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">{getStateLabel()} *</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder={getStateLabel()}
                  />
                </div>

                <div>
                  <Label htmlFor="postalCode">{getPostalCodeLabel()} *</Label>
                  <Input
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder={getPostalCodeLabel()}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Used for billing inquiries and payment reminders
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Tax Information */}
          <Collapsible open={taxInfoOpen} onOpenChange={setTaxInfoOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">
                Tax Information (Optional) {taxIds.length > 0 && `(${taxIds.length})`}
              </h3>
              <ChevronDown className={`h-5 w-5 transition-transform ${taxInfoOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <div className="h-px bg-border mt-2" />
            
            <CollapsibleContent className="space-y-4 mt-4">
              {taxIds.map((taxId, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label>Tax ID {taxIds.length > 1 ? index + 1 : ''}</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeTaxId(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <Label>Tax ID Type</Label>
                    <Select 
                      value={taxId.type} 
                      onValueChange={(v) => updateTaxId(index, 'type', v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {getTaxIdTypes().map((type) => {
                          const [value, label] = type.split('|');
                          return <SelectItem key={value} value={value}>{label}</SelectItem>;
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Tax ID</Label>
                    <Input
                      value={taxId.value}
                      onChange={(e) => updateTaxId(index, 'value', e.target.value)}
                      placeholder={taxId.type === 'us_ein' ? 'XX-XXXXXXX' : 'Tax ID'}
                    />
                    {taxId.type === 'us_ein' && (
                      <p className="text-xs text-muted-foreground mt-1">Format: XX-XXXXXXX</p>
                    )}
                  </div>
                </div>
              ))}
              
              <Button type="button" variant="outline" onClick={addTaxId} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Tax ID
              </Button>
            </CollapsibleContent>
          </Collapsible>
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
