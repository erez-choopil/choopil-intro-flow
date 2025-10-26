import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Calendar, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface TextMessage {
  id: number;
  type: "sms" | "scheduling";
  name: string;
  message?: string;
  enabled: boolean;
}

export default function SendTexts() {
  const [messages, setMessages] = useState<TextMessage[]>([
    { id: 1, type: "scheduling", name: "Scheduling link", message: "send here", enabled: true },
    { id: 2, type: "sms", name: "Pricing of event", message: "This is my procong: 100$ for 10 songs", enabled: true },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [messageType, setMessageType] = useState<"sms" | "scheduling" | null>(null);
  const [formData, setFormData] = useState({ name: "", message: "", instructions: "" });

  const openDialog = (type: "sms" | "scheduling") => {
    setMessageType(type);
    setIsDialogOpen(true);
  };

  const handleAddMessage = () => {
    if (formData.name.trim() && messageType) {
      setMessages([...messages, { id: Date.now(), type: messageType, name: formData.name, message: formData.message, enabled: true }]);
      setIsDialogOpen(false);
      setFormData({ name: "", message: "", instructions: "" });
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Send text messages</h1>
          <p className="text-sm text-muted-foreground mt-1">Your receptionist can text callers messages with scheduling links, website info, and more.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground">(415) 413-5501</span>
          <Button variant="outline" size="sm">Web call</Button>
        </div>
      </div>

      <Button className="mb-6" onClick={() => openDialog("sms")}>
        <Plus className="h-4 w-4 mr-2" />Add text message
      </Button>

      <div className="space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded bg-warning/20 flex items-center justify-center">
                {message.type === "scheduling" ? <Calendar className="h-5 w-5 text-warning" /> : <MessageSquare className="h-5 w-5 text-warning" />}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground underline">{message.name}</h3>
                {message.message && <p className="text-sm text-muted-foreground">{message.message}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={message.enabled} onCheckedChange={() => setMessages(messages.map(m => m.id === message.id ? {...m, enabled: !m.enabled} : m))} />
              <Button variant="ghost" size="icon" onClick={() => setMessages(messages.filter(m => m.id !== message.id))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{messageType === "scheduling" ? "Add a scheduling link to send to callers" : "Add an SMS message"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Message *</Label>
              <Textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button className="bg-success hover:bg-success/90" onClick={handleAddMessage}>Add message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
