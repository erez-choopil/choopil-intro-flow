import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Download, Plus } from "lucide-react";
import { ChangePlanModal } from "@/components/billing/ChangePlanModal";
import { AddPaymentMethodModal } from "@/components/billing/AddPaymentMethodModal";
import { UpdateBillingInfoModal } from "@/components/billing/UpdateBillingInfoModal";
import { CardBrandIcon } from "@/components/billing/CardBrandIcon";
import { useToast } from "@/hooks/use-toast";

export default function Billing() {
  const { toast } = useToast();
  const [changePlanOpen, setChangePlanOpen] = useState(false);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [updateBillingOpen, setUpdateBillingOpen] = useState(false);

  // Mock data
  const subscription = {
    planName: "Scale",
    planId: "scale",
    price: 149,
    nextBillingDate: "December 15, 2025",
    nextBillingAmount: 149
  };

  const usage = {
    calls: { used: 127, limit: 500 }
  };

  const paymentMethod = {
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2026
  };

  const billingInfo = {
    legalName: "Acme Corp",
    billingEmails: ["billing@acme.com"],
    address: {
      line1: "123 Main St",
      line2: "Suite 400",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102"
    }
  };

  const invoices = [
    { id: "1", number: "INV-2024-1125", date: "Nov 25, 2024", description: "Scale Plan - Monthly", amount: 149.00, status: "paid" },
    { id: "2", number: "INV-2024-1025", date: "Oct 25, 2024", description: "Scale Plan - Monthly", amount: 149.00, status: "paid" },
    { id: "3", number: "INV-2024-0925", date: "Sep 25, 2024", description: "Scale Plan - Monthly", amount: 149.00, status: "paid" }
  ];

  const usagePercentage = (usage.calls.used / usage.calls.limit) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section - Current Plan Status */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary to-[hsl(270,100%,60%)] px-8 py-12 mb-8">
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left: Plan Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-primary-foreground">{subscription.planName}</h1>
                  <Badge className="bg-accent text-accent-foreground border-0">ACTIVE</Badge>
                </div>
                <p className="text-2xl font-bold text-primary-foreground">${subscription.price}/month</p>
              </div>

              {/* Center: Next Billing */}
              <div className="text-center space-y-2">
                <p className="text-sm text-primary-foreground/80 uppercase tracking-wider">Next Billing Date</p>
                <p className="text-2xl font-bold text-primary-foreground">{subscription.nextBillingDate}</p>
                <p className="text-lg text-primary-foreground/90">${subscription.nextBillingAmount}.00</p>
              </div>

              {/* Right: CTA */}
              <div className="flex justify-end">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => setChangePlanOpen(true)}
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  Change Plan
                </Button>
              </div>
            </div>

            {/* Usage Progress Bar */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center justify-between text-sm text-primary-foreground/90">
                <span>Monthly Usage</span>
                <span className="font-semibold">{usage.calls.used}/{usage.calls.limit} calls used this month</span>
              </div>
              <Progress value={usagePercentage} className="h-3 bg-primary-foreground/20" />
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            {/* Left Column (60%) - Payment Method */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Payment Method Card */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center gap-4">
                      <CardBrandIcon brand={paymentMethod.brand} className="w-12 h-8" />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold capitalize">{paymentMethod.brand}</span>
                          <span className="text-muted-foreground">•••• {paymentMethod.last4}</span>
                          <Badge variant="secondary" className="text-xs">Default</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Expires {paymentMethod.expMonth}/{paymentMethod.expYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Remove</Button>
                    </div>
                  </div>

                  {/* Add Payment Method Button */}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setAddPaymentOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>

                  {/* Security Notice */}
                  <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <Shield className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <p>Your payment information is encrypted and secure</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column (40%) - Billing Information */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Business Name</p>
                    <p className="font-medium">{billingInfo.legalName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{billingInfo.billingEmails[0]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{billingInfo.address.line1}</p>
                    {billingInfo.address.line2 && <p className="font-medium">{billingInfo.address.line2}</p>}
                    <p className="font-medium">
                      {billingInfo.address.city}, {billingInfo.address.state} {billingInfo.address.postalCode}
                    </p>
                  </div>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary"
                    onClick={() => setUpdateBillingOpen(true)}
                  >
                    Edit Billing Information
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Invoice History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
            </CardHeader>
            <CardContent>
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
                      <tr key={invoice.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4 font-mono text-sm">{invoice.number}</td>
                        <td className="py-4 px-4 text-sm">{invoice.date}</td>
                        <td className="py-4 px-4 text-sm">{invoice.description}</td>
                        <td className="py-4 px-4 text-sm text-right font-semibold">${invoice.amount.toFixed(2)}</td>
                        <td className="py-4 px-4 text-center">
                          <Badge className="bg-success text-success-foreground">PAID</Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button variant="ghost" size="sm" className="hover:bg-primary/10">
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
                  <Card key={invoice.id} className="border">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-semibold">{invoice.number}</span>
                          <Badge className="bg-success text-success-foreground">PAID</Badge>
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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <ChangePlanModal open={changePlanOpen} onOpenChange={setChangePlanOpen} currentPlan={subscription.planId} />
      <AddPaymentMethodModal 
        open={addPaymentOpen} 
        onOpenChange={setAddPaymentOpen}
        billingAddress={{
          line1: billingInfo.address.line1,
          line2: billingInfo.address.line2,
          city: billingInfo.address.city,
          state: billingInfo.address.state,
          postalCode: billingInfo.address.postalCode,
          country: "US"
        }}
        onSuccess={() => {
          toast({
            title: "Success",
            description: "Payment method added successfully"
          });
        }}
      />
      <UpdateBillingInfoModal 
        open={updateBillingOpen} 
        onOpenChange={setUpdateBillingOpen}
        billingInfo={{
          customerType: 'business',
          legalName: billingInfo.legalName,
          displayName: billingInfo.legalName,
          billingEmails: billingInfo.billingEmails,
          billingContactName: "",
          address: { ...billingInfo.address, country: "US" },
          phone: "",
          taxIds: []
        }}
        onSave={() => {
          toast({
            title: "Success",
            description: "Billing information updated successfully"
          });
        }}
      />
    </div>
  );
}
