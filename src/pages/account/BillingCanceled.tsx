import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, Download, ChevronRight, Shield, Plus,
  CheckCircle2, XCircle, AlertCircle
} from "lucide-react";
import { PaymentMethodCard } from "@/components/billing/PaymentMethodCard";
import { AddPaymentMethodModal } from "@/components/billing/AddPaymentMethodModal";
import { RemovePaymentMethodDialog } from "@/components/billing/RemovePaymentMethodDialog";
import { UpdateBillingInfoModal } from "@/components/billing/UpdateBillingInfoModal";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$39.20",
    originalPrice: "$49.00",
    annualPrice: "$470.40",
    discount: "20% off",
    description: "Perfect for small businesses just getting started",
    features: [
      "30 calls",
      "$1.5 per additional call",
      "24/7 answering",
      "Instant call summaries",
      "Call transfers",
    ],
  },
  {
    name: "Professional",
    price: "$79.20",
    originalPrice: "$99.00",
    annualPrice: "$950.40",
    discount: "20% off",
    isRecommended: true,
    description: "Ideal for growing businesses with higher call volume",
    features: [
      "90 calls",
      "$1 per additional call",
      "24/7 answering",
      "Instant call summaries",
      "Call transfers",
      "Send text messages",
      "Call recordings & transcription",
      "Spam blocking",
    ],
  },
  {
    name: "Pro",
    price: "$159.20",
    originalPrice: "$199.00",
    annualPrice: "$1910.40",
    discount: "20% off",
    description: "Enterprise-grade solution for high-volume operations",
    features: [
      "300 calls",
      "$0.75 per additional call",
      "24/7 answering",
      "Instant call summaries",
      "Call transfers",
      "Send text messages",
      "Call recordings & transcription",
      "Spam blocking",
      "Zapier integration",
      "Priority support",
    ],
  },
];

export default function BillingCanceled() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [updateBillingOpen, setUpdateBillingOpen] = useState(false);
  const [removePaymentOpen, setRemovePaymentOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<typeof paymentMethods[0] | null>(null);
  const [isAnnual, setIsAnnual] = useState(true);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    annualPrice: string;
  } | null>(null);

  // Mock data - replace with real data from API
  const canceledSubscription = {
    previousPlan: "Professional",
    endDate: "January 15, 2025",
    isExpired: false, // Set to true if subscription has already ended
    canceledAt: "December 15, 2024"
  };

  const [paymentMethods, setPaymentMethods] = useState([
    { id: "1", brand: "visa", last4: "4242", expMonth: 12, expYear: 2026, isDefault: true }
  ]);

  const handleAddPaymentMethod = (newMethod: { brand: string; last4: string; expMonth: number; expYear: number; isDefault: boolean }) => {
    const newPaymentMethod = {
      id: (paymentMethods.length + 1).toString(),
      ...newMethod
    };
    
    if (newMethod.isDefault) {
      setPaymentMethods(paymentMethods.map(pm => ({ ...pm, isDefault: false })).concat(newPaymentMethod));
    } else {
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
    }
  };

  const handleEditPayment = (method: typeof paymentMethods[0]) => {
    setSelectedPaymentMethod(method);
    setAddPaymentOpen(true);
  };

  const handleRemovePayment = (method: typeof paymentMethods[0]) => {
    setSelectedPaymentMethod(method);
    setRemovePaymentOpen(true);
  };

  const handleSetDefault = (method: typeof paymentMethods[0]) => {
    toast({
      title: "Success",
      description: `${method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} ••••${method.last4} set as default payment method`
    });
  };

  const handleSelectPlan = (plan: typeof plans[0]) => {
    setSelectedPlan({
      name: plan.name,
      price: plan.price,
      annualPrice: plan.annualPrice,
    });
    setCheckoutModalOpen(true);
  };

  const getButtonText = (planName: string) => {
    if (planName === canceledSubscription.previousPlan) {
      return "Restart Plan";
    }
    const planIndex = plans.findIndex(p => p.name === planName);
    const previousPlanIndex = plans.findIndex(p => p.name === canceledSubscription.previousPlan);
    
    if (planIndex > previousPlanIndex) {
      return "Upgrade";
    } else {
      return "Downgrade";
    }
  };

  const billingInfo = {
    customerType: 'business' as const,
    legalName: "Acme Corp",
    displayName: "Acme",
    billingEmails: ["billing@acme.com"],
    billingContactName: "John Doe",
    address: {
      line1: "123 Main St",
      line2: "Suite 400",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "US"
    },
    phone: "+15551234567",
    taxIds: []
  };

  const invoices = [
    { id: "1", number: "INV-2024-1125", date: "Nov 25, 2024", description: "Professional Plan - Monthly", amount: 99.00, status: "paid" },
    { id: "2", number: "INV-2024-1025", date: "Oct 25, 2024", description: "Professional Plan - Monthly", amount: 99.00, status: "paid" },
    { id: "3", number: "INV-2024-0925", date: "Sep 25, 2024", description: "Professional Plan - Monthly", amount: 99.00, status: "paid" },
    { id: "4", number: "INV-2024-0825", date: "Aug 25, 2024", description: "Professional Plan - Monthly", amount: 99.00, status: "paid" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 1. Subscription Status Card (Hero Section) */}
        <Card className="border-2 border-muted bg-gradient-to-br from-muted/30 to-background">
          <CardHeader>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-muted text-muted-foreground font-medium">
                    CANCELED
                  </Badge>
                </div>
                <CardTitle className="text-3xl">Subscription Canceled</CardTitle>
                <CardDescription className="text-base">
                  {canceledSubscription.isExpired 
                    ? "Your subscription has ended. No further charges will be made."
                    : `Your plan is active until ${canceledSubscription.endDate}. No further charges will be made.`
                  }
                </CardDescription>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button onClick={() => {
                  const previousPlan = plans.find(p => p.name === canceledSubscription.previousPlan);
                  if (previousPlan) handleSelectPlan(previousPlan);
                }}>
                  Restart Subscription
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    const plansSection = document.getElementById('pricing-plans');
                    plansSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Plans
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* 2. "What happens now" Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              What happens now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm">No further charges will be made</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  {canceledSubscription.isExpired 
                    ? "Your billing period has ended"
                    : `Access remains until ${canceledSubscription.endDate}`
                  }
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm">Call logs and invoices remain accessible</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  {canceledSubscription.isExpired 
                    ? "AI agent has stopped answering calls"
                    : "AI agent will stop answering calls after the plan ends"
                  }
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 3. Pricing Plans – Reactivation Section */}
        <div id="pricing-plans" className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Choose a plan to continue
            </h2>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <Label
                htmlFor="billing-toggle"
                className={`text-base ${!isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="scale-110"
              />
              <Label
                htmlFor="billing-toggle"
                className={`text-base ${isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                Yearly - 20% off
              </Label>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.name === canceledSubscription.previousPlan 
                    ? "border-muted-foreground border-2" 
                    : plan.isRecommended 
                      ? "border-primary border-2" 
                      : ""
                }`}
              >
                {plan.name === canceledSubscription.previousPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-muted-foreground text-background text-xs font-semibold px-3 py-1 rounded-full">
                      Previously used
                    </span>
                  </div>
                )}
                {plan.isRecommended && plan.name !== canceledSubscription.previousPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}
                <CardContent className="p-6 space-y-6">
                  {/* Plan Header */}
                  <div className="space-y-2">
                    {plan.discount && (
                      <div className="inline-block">
                        <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                          {plan.discount}
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-muted-foreground line-through text-lg">
                        {plan.originalPrice}
                      </span>
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually ({plan.annualPrice}/year)
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    className="w-full"
                    variant={plan.name === canceledSubscription.previousPlan ? "default" : plan.isRecommended ? "default" : "outline"}
                  >
                    {getButtonText(plan.name)}
                  </Button>

                  {/* Features */}
                  <div className="space-y-3 pt-4 border-t">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 4. Payment Methods Section */}
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods. No charges will occur unless you restart a plan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <PaymentMethodCard 
                    key={method.id} 
                    method={method}
                    onEdit={() => handleEditPayment(method)}
                    onRemove={() => handleRemovePayment(method)}
                    onSetDefault={() => handleSetDefault(method)}
                    canRemove={!method.isDefault || paymentMethods.length > 1}
                  />
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full h-11 border-2 border-dashed border-border hover:border-primary hover:bg-muted/50 text-primary"
                  onClick={() => {
                    setSelectedPaymentMethod(null);
                    setAddPaymentOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
                
                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg border">
                  <Shield className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <div>Your payment information is encrypted and secure.</div>
                    <div>We never store your full card number.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Billing Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Update your billing details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Business Name</div>
                  <div className="text-sm font-semibold mt-1">{billingInfo.legalName}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Billing Email(s)</div>
                  <div className="text-sm mt-1">{billingInfo.billingEmails.join(', ')}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Billing Address</div>
                  <div className="text-sm mt-1">{billingInfo.address.line1}</div>
                  {billingInfo.address.line2 && <div className="text-sm mt-1">{billingInfo.address.line2}</div>}
                  <div className="text-sm text-muted-foreground">
                    {billingInfo.address.city}, {billingInfo.address.state} {billingInfo.address.postalCode}
                  </div>
                  <div className="text-sm text-muted-foreground">{billingInfo.address.country}</div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setUpdateBillingOpen(true)}
                >
                  Edit Billing Information
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 5. Invoice History Section */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>View and download your past invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Invoice #</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b hover:bg-muted/50">
                        <td className="py-4 px-4">
                          <Button variant="link" className="h-auto p-0 font-mono text-sm">
                            {invoice.number}
                          </Button>
                        </td>
                        <td className="py-4 px-4 text-sm">{invoice.date}</td>
                        <td className="py-4 px-4 text-sm">{invoice.description}</td>
                        <td className="py-4 px-4 text-sm text-right font-semibold">${invoice.amount.toFixed(2)}</td>
                        <td className="py-4 px-4 text-center">
                          <Badge className="bg-success text-success-foreground">
                            {invoice.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {invoices.map((invoice) => (
                  <Card key={invoice.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-semibold">{invoice.number}</span>
                          <Badge className="bg-success text-success-foreground">
                            {invoice.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{invoice.date}</div>
                        <div className="text-sm">{invoice.description}</div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-lg font-bold">${invoice.amount.toFixed(2)}</span>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <Button variant="outline">
                  Load More Invoices
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Modals */}
      <AddPaymentMethodModal 
        open={addPaymentOpen} 
        onOpenChange={(open) => {
          setAddPaymentOpen(open);
          if (!open) setSelectedPaymentMethod(null);
        }}
        billingAddress={{
          line1: billingInfo.address.line1,
          line2: billingInfo.address.line2,
          city: billingInfo.address.city,
          state: billingInfo.address.state,
          postalCode: billingInfo.address.postalCode,
          country: billingInfo.address.country
        }}
        onSuccess={handleAddPaymentMethod}
      />
      <RemovePaymentMethodDialog 
        open={removePaymentOpen} 
        onOpenChange={setRemovePaymentOpen}
        method={selectedPaymentMethod}
        hasActiveSubscription={false}
        isOnlyCard={paymentMethods.length === 1}
      />
      <UpdateBillingInfoModal 
        open={updateBillingOpen} 
        onOpenChange={setUpdateBillingOpen} 
        billingInfo={billingInfo}
        onSave={() => {
          toast({
            title: "Billing information updated",
            description: "Your billing details have been saved"
          });
        }}
      />
      
      {selectedPlan && (
        <CheckoutModal
          open={checkoutModalOpen}
          onOpenChange={setCheckoutModalOpen}
          planDetails={selectedPlan}
          isAnnual={isAnnual}
        />
      )}
    </div>
  );
}
