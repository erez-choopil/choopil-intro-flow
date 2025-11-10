import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface CustomInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  additionalInfo: string;
  onSave: (additionalInfo: string) => void;
}

export function CustomInfoModal({
  open,
  onOpenChange,
  additionalInfo: initialInfo,
  onSave,
}: CustomInfoModalProps) {
  const [additionalInfo, setAdditionalInfo] = useState(initialInfo);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(additionalInfo);
      toast({
        title: "Success",
        description: "Custom business information updated successfully"
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update custom business information",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const charCount = additionalInfo.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Custom Business Information</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Add any additional information about your business that you want the AI agent to know. This can include special policies, services, or instructions.
          </p>

          <div className="space-y-2">
            <Textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Example: We offer free consultations for first-time clients. Our specialty is modern home design..."
              className="min-h-[200px] resize-none"
              maxLength={5000}
            />
            <div className="flex justify-end">
              <p className="text-sm text-muted-foreground">{charCount}/5000 characters</p>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
