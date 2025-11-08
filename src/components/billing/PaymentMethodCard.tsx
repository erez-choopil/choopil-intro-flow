import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

interface PaymentMethodCardProps {
  method: {
    id: string;
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    isDefault: boolean;
  };
}

export function PaymentMethodCard({ method }: PaymentMethodCardProps) {
  const brandName = method.brand.charAt(0).toUpperCase() + method.brand.slice(1);

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{brandName} ending in {method.last4}</span>
              {method.isDefault && (
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  Default
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Edit</Button>
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" disabled={method.isDefault}>
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
