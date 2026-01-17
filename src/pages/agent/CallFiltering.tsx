import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface BlockedNumber {
  id: number;
  phoneNumber: string;
  note?: string;
}

export default function CallFiltering() {
  const [spamDetection, setSpamDetection] = useState(true);
  const [block800, setBlock800] = useState(false);
  const [blockedNumbers, setBlockedNumbers] = useState<BlockedNumber[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    note: "",
  });

  const handleBlockNumber = () => {
    if (formData.phoneNumber.trim()) {
      const newBlock: BlockedNumber = {
        id: Date.now(),
        phoneNumber: formData.phoneNumber,
        note: formData.note,
      };
      setBlockedNumbers([...blockedNumbers, newBlock]);
      setIsDialogOpen(false);
      setFormData({ phoneNumber: "", note: "" });
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Call filtering</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Block spam and unwanted calls
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Spam detection section */}
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-2">Spam detection</h2>
          <p className="text-sm text-muted-foreground mb-4">
            If a call looks like spam, we hang up. We also block numbers from known spammers.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <Label htmlFor="spam-toggle" className="font-normal cursor-pointer">
                Detect and block spam calls
              </Label>
              <Switch
                id="spam-toggle"
                checked={spamDetection}
                onCheckedChange={setSpamDetection}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <Label htmlFor="800-toggle" className="font-normal cursor-pointer">
                Block 1-800 numbers
              </Label>
              <Switch
                id="800-toggle"
                checked={block800}
                onCheckedChange={setBlock800}
              />
            </div>
          </div>
        </div>

        {/* Manually blocked numbers section */}
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Manually blocked numbers</h2>

          {blockedNumbers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">You have no blocked numbers</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  You can manually block numbers you don't want to receive calls from
                </p>
              </div>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Block number
              </Button>
            </div>
          ) : (
            <>
              <Button className="mb-4" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Block number
              </Button>
              <div className="space-y-2">
                {blockedNumbers.map((blocked) => (
                  <div
                    key={blocked.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{blocked.phoneNumber}</p>
                      {blocked.note && (
                        <p className="text-sm text-muted-foreground">{blocked.note}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setBlockedNumbers(blockedNumbers.filter(b => b.id !== blocked.id))}
                    >
                      Unblock
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Block number</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              The number will be added to your blocked list
            </p>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number *</Label>
              <div className="flex gap-2">
                <Select defaultValue="+1">
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">+1</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  placeholder="(919) 555-2171"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                placeholder="Optional note about why this number is blocked"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="min-h-[80px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-success hover:bg-success/90" onClick={handleBlockNumber}>
              Block number
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
