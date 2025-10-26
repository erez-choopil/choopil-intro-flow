import { Button } from "@/components/ui/button";
import { Phone, Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface TransferRule {
  id: number;
  name: string;
  enabled: boolean;
}

export default function TransferCalls() {
  const [rules, setRules] = useState<TransferRule[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    condition: "",
    message: "",
    phoneNumber: "",
    extension: "",
  });

  const handleAddRule = () => {
    if (formData.name.trim()) {
      setRules([...rules, { id: Date.now(), name: formData.name, enabled: true }]);
      setIsDialogOpen(false);
      setFormData({ name: "", condition: "", message: "", phoneNumber: "", extension: "" });
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Transfer calls</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground">(206) 687-1315</span>
          <Button variant="outline" size="sm">Web call</Button>
        </div>
      </div>

      {rules.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <Phone className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Want certain calls to go to a real person?</h2>
            <p className="text-muted-foreground">Set up rules to transfer calls to yourself or your team</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />Add transferring rule
          </Button>
        </div>
      ) : (
        <>
          <Button className="mb-6" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />Add transferring rule
          </Button>
          <div className="space-y-2 max-w-4xl">
            {rules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                <span className="font-medium text-foreground">{rule.name}</span>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" onClick={() => setRules(rules.filter(r => r.id !== rule.id))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Switch checked={rule.enabled} onCheckedChange={() => setRules(rules.map(r => r.id === rule.id ? {...r, enabled: !r.enabled} : r))} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader><DialogTitle>Add new call transferring rule</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name or department *</Label>
              <Input placeholder="e.g. Sales" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>When should we transfer the call?</Label>
              <Textarea placeholder="Transfer the call if it's a lead interested in getting a quote" value={formData.condition} onChange={(e) => setFormData({...formData, condition: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Message before transfer</Label>
              <Textarea placeholder="I'll connect you to our sales team, just a moment" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
            </div>
            <div className="grid grid-cols-[1fr,auto] gap-2">
              <div className="space-y-2">
                <Label>Transfer to this number *</Label>
                <div className="flex gap-2">
                  <Select defaultValue="+1"><SelectTrigger className="w-20"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="+1">+1</SelectItem></SelectContent></Select>
                  <Input placeholder="(XXX) XXX-XXXX" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Extension</Label>
                <Input placeholder="e.g. 1234" value={formData.extension} onChange={(e) => setFormData({...formData, extension: e.target.value})} className="w-24" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button className="bg-success hover:bg-success/90" onClick={handleAddRule}>Create rule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
