import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardBrandIcon } from "./CardBrandIcon";

interface PaymentMethodCardProps {
  method: {
    id: string;
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    isDefault: boolean;
  };
  onEdit?: () => void;
  onRemove?: () => void;
  onSetDefault?: () => void;
  canRemove?: boolean;
}

export function PaymentMethodCard({ 
  method, 
  onEdit, 
  onRemove, 
  onSetDefault,
  canRemove = true 
}: PaymentMethodCardProps) {
  const brandName = method.brand.charAt(0).toUpperCase() + method.brand.slice(1);

  return (
    <Card className="border-border hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left: Icon + Card Info */}
          <div className="flex items-start gap-4">
            <CardBrandIcon brand={method.brand} />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-medium text-foreground">
                  {brandName} •••• {method.last4}
                </span>
                {method.isDefault && (
                  <Badge className="bg-blue-100 dark:bg-blue-950 text-primary border-0 text-xs font-medium px-3 py-0.5 rounded-full">
                    Default
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Action Buttons */}
        <div className="flex items-center gap-2 mt-4 justify-end">
          {!method.isDefault && onSetDefault && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onSetDefault}
              className="text-primary hover:text-primary hover:bg-primary/10 border border-border"
            >
              Set as Default
            </Button>
          )}
          {onEdit && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onEdit}
              className="text-primary hover:text-primary hover:bg-primary/10 border border-border"
            >
              Edit
            </Button>
          )}
          {onRemove && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onRemove}
              disabled={!canRemove}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 border border-destructive/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Remove
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
