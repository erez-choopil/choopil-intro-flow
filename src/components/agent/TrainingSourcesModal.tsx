import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Globe, AlertTriangle, Info, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TrainingSourcesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  googleBusinessProfile: string;
  businessWebsite: string;
  onSave: (data: { googleBusinessProfile: string; businessWebsite: string }) => void;
}

export function TrainingSourcesModal({
  open,
  onOpenChange,
  googleBusinessProfile: initialGBP,
  businessWebsite: initialWebsite,
  onSave,
}: TrainingSourcesModalProps) {
  const [googleBusinessProfile, setGoogleBusinessProfile] = useState(initialGBP);
  const [businessWebsite, setBusinessWebsite] = useState(initialWebsite);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    // Validation: at least one field required
    if (!googleBusinessProfile.trim() && !businessWebsite.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide at least one training source",
        variant: "destructive"
      });
      return;
    }

    // Validate website URL if provided
    if (businessWebsite.trim() && !businessWebsite.match(/^https?:\/\/.+/)) {
      toast({
        title: "Validation Error",
        description: "Website must be a valid URL (starting with http:// or https://)",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await onSave({ googleBusinessProfile, businessWebsite });
      toast({
        title: "Success",
        description: "Choopil has been retrained with your updated sources"
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update training sources",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Training Sources</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Info Box */}
          <div className="bg-muted/50 rounded-lg p-4 flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Choopil uses these sources to learn about your business, which helps answer caller 
              questions effectively. While entering both sources is ideal, just one is enough to get 
              started. Update these sources at anytime to retrain Choopil.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gbp">Google Business Profile</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="gbp"
                  placeholder="Search for your business"
                  value={googleBusinessProfile}
                  onChange={(e) => setGoogleBusinessProfile(e.target.value)}
                  className="pl-10 pr-10"
                />
                {googleBusinessProfile && (
                  <button
                    onClick={() => setGoogleBusinessProfile("")}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Business Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="website"
                  placeholder="https://yourwebsite.com"
                  value={businessWebsite}
                  onChange={(e) => setBusinessWebsite(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Warning Box */}
          <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-500 shrink-0 mt-0.5" />
            <p className="text-sm text-orange-900 dark:text-orange-200">
              Changing a training source here will retrain Choopil on your core business 
              information. All existing business information will be replaced with a retrain.
            </p>
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
              {isLoading ? "Retraining Choopil..." : "Retrain Choopil"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
