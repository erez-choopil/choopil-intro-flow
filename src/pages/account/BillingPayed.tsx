import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, Clock, MessageSquare, Users, CreditCard, 
  Download, ChevronRight, Shield, AlertTriangle, CheckCircle2
} from "lucide-react";
import { ChangePlanModal } from "@/components/billing/ChangePlanModal";
import { CancelSubscriptionModal } from "@/components/billing/CancelSubscriptionModal";
import { PaymentMethodCard } from "@/components/billing/PaymentMethodCard";
import { AddPaymentMethodModal } from "@/components/billing/AddPaymentMethodModal";
import { UpdateBillingInfoModal } from "@/components/billing/UpdateBillingInfoModal";

export default function Billing() {
  const [changePlanOpen, setChangePlanOpen] = useState(false);
  const [cancelSubOpen, setCancelSubOpen] = useState(false);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [updateBillingOpen, setUpdateBillingOpen] = useState(false);

  // Mock data - replace with real data from API
  const subscription = {
    planName: "Scale",
    planId: "scale",
    price: 149,
    billingCycle: "monthly",
    nextBillingDate: "December 15, 2025",
    status: "active",
    features: [
      "Up to 500 calls per month",
      "24/7 AI receptionist",
      "Industry-specific training",
      "Call transcripts & summaries",
      "SMS capabilities",
      "Call forwarding",
      "Priority support"
    ]
  };

  const usage = {
    calls: { used: 127, limit: 500 },
    minutes: { used: 3240, limit: null },
    sms: { used: 89, limit: 1000 },
    seats: { used: 3, total: 5 }
  };

  const paymentMethods = [
    { id: "1", brand: "visa", last4: "4242", expMonth: 12, expYear: 2026, isDefault: true }
  ];

  const billingInfo = {
    businessName: "Acme Corp",
    email: "billing@acme.com",
    address: "123 Main St, San Francisco, CA 94102",
    country: "United States",
    vatId: ""
  };

  const invoices = [
    { id: "1", number: "INV-2024-1125", date: "Nov 25, 2024", description: "Scale Plan - Monthly", amount: 149.00, status: "paid" },
    { id: "2", number: "INV-2024-1025", date: "Oct 25, 2024", description: "Scale Plan - Monthly", amount: 149.00, status: "paid" },
    { id: "3", number: "INV-2024-0925", date: "Sep 25, 2024", description: "Scale Plan - Monthly", amount: 149.00, status: "paid" },
    { id: "4", number: "INV-2024-0825", date: "Aug 25, 2024", description: "Professional Plan - Monthly", amount: 49.00, status: "paid" }
  ];

  const getUsagePercentage = (used: number, limit: number | null) => {
    if (!limit) return 0;
    return (used / limit) * 100;
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 70) return "text-yellow-600";
    return "text-success";
  };

  const callsPercentage = getUsagePercentage(usage.calls.used, usage.calls.limit);
  const smsPercentage = getUsagePercentage(usage.sms.used, usage.sms.limit);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Usage Warning Banner */}
        {callsPercentage >= 90 && (
          <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
            <CardContent className="flex items-center gap-3 py-4">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <p className="text-sm text-yellow-900 dark:text-yellow-100">
                You've used {callsPercentage.toFixed(0)}% of your monthly calls. Consider upgrading your plan.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Current Plan Section */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-3xl">{subscription.planName} Plan</CardTitle>
                  <Badge className="bg-success text-success-foreground">ACTIVE</Badge>
                </div>
                <CardDescription className="text-base">
                  ${subscription.price}/month • Billed {subscription.billingCycle}
                </CardDescription>
              </div>
              <Button onClick={() => setChangePlanOpen(true)}>
                Change Plan
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Next Billing Date</h4>
                <p className="text-lg font-semibold">{subscription.nextBillingDate}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Amount: ${subscription.price}.00 USD</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Features Included</h4>
                <ul className="space-y-1">
                  {subscription.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {feature}
                    </li>
                  ))}
                  <li className="text-sm text-muted-foreground">+ {subscription.features.length - 3} more features</li>
                </ul>
              </div>
            </div>

            {/* Usage Progress */}
            <div className="bg-background/50 rounded-lg p-4 space-y-3">
              <h4 className="text-sm font-medium">This Month's Usage</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Calls</span>
                  <span className={`font-semibold ${getUsageColor(callsPercentage)}`}>
                    {usage.calls.used} / {usage.calls.limit} calls
                  </span>
                </div>
                <Progress value={callsPercentage} className="h-2" />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setCancelSubOpen(true)}
              >
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Usage & Limits Section */}
        <Card>
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
            <CardDescription>November 1 - November 30, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">Calls Used</span>
                </div>
                <div>
                  <div className="text-3xl font-bold">{usage.calls.used}</div>
                  <div className="text-sm text-muted-foreground">of {usage.calls.limit} calls</div>
                </div>
                <Progress value={callsPercentage} className="h-2" />
                <div className="text-xs text-muted-foreground">{callsPercentage.toFixed(0)}% used</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Minutes Used</span>
                </div>
                <div>
                  <div className="text-3xl font-bold">{usage.minutes.used.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Unlimited</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm font-medium">SMS Sent</span>
                </div>
                <div>
                  <div className="text-3xl font-bold">{usage.sms.used}</div>
                  <div className="text-sm text-muted-foreground">of {usage.sms.limit} messages</div>
                </div>
                <Progress value={smsPercentage} className="h-2" />
                <div className="text-xs text-muted-foreground">{smsPercentage.toFixed(0)}% used</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">Seats Used</span>
                </div>
                <div>
                  <div className="text-3xl font-bold">{usage.seats.used}</div>
                  <div className="text-sm text-muted-foreground">of {usage.seats.total} seats</div>
                </div>
                <Button variant="link" className="h-auto p-0 text-sm">Manage Seats</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment & Billing Info Section */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Payment Methods */}
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <PaymentMethodCard key={method.id} method={method} />
                ))}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setAddPaymentOpen(true)}
                >
                  + Add Payment Method
                </Button>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                  <Shield className="h-4 w-4" />
                  <span>Your payment information is encrypted and secure</span>
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
                  <div className="text-sm font-semibold mt-1">{billingInfo.businessName}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Billing Email</div>
                  <div className="text-sm mt-1">{billingInfo.email}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Billing Address</div>
                  <div className="text-sm mt-1">{billingInfo.address}</div>
                  <div className="text-sm text-muted-foreground">{billingInfo.country}</div>
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

        {/* Invoice History */}
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
      <ChangePlanModal open={changePlanOpen} onOpenChange={setChangePlanOpen} currentPlan={subscription.planId} />
      <CancelSubscriptionModal open={cancelSubOpen} onOpenChange={setCancelSubOpen} subscription={subscription} />
      <AddPaymentMethodModal open={addPaymentOpen} onOpenChange={setAddPaymentOpen} />
      <UpdateBillingInfoModal open={updateBillingOpen} onOpenChange={setUpdateBillingOpen} billingInfo={billingInfo} />
    </div>
  );
}
