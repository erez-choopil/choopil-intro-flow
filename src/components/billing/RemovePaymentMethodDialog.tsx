import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RemovePaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  method: {
    id: string;
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    isDefault: boolean;
  } | null;
  hasActiveSubscription?: boolean;
  isOnlyCard?: boolean;
}

export function RemovePaymentMethodDialog({ 
  open, 
  onOpenChange, 
  method,
  hasActiveSubscription = true,
  isOnlyCard = false
}: RemovePaymentMethodDialogProps) {
  const { toast } = useToast();

  if (!method) return null;

  const brandName = method.brand.charAt(0).toUpperCase() + method.brand.slice(1);
  const canRemove = !method.isDefault && !(isOnlyCard && hasActiveSubscription);

  const handleRemove = () => {
    if (!canRemove) return;

    toast({
      title: "Success",
      description: "Payment method removed successfully"
    });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Payment Method?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <p>Are you sure you want to remove:</p>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium text-foreground">{brandName} •••• {method.last4}</div>
                  <div className="text-sm text-muted-foreground">
                    Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                  </div>
                </div>
              </div>

              {method.isDefault && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-900 dark:text-yellow-100">
                    This is your default card. Please set another card as default first.
                  </p>
                </div>
              )}

              {isOnlyCard && hasActiveSubscription && !method.isDefault && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-900 dark:text-yellow-100">
                    Cannot remove your only payment method while subscription is active. Please add another card first.
                  </p>
                </div>
              )}

              {canRemove && (
                <p className="text-sm">This action cannot be undone.</p>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button 
            variant="destructive" 
            onClick={handleRemove}
            disabled={!canRemove}
          >
            Remove Card
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
