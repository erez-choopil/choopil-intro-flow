import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type TimeSlot = {
  id: string;
  start: string;
  end: string;
  startPeriod: "AM" | "PM";
  endPeriod: "AM" | "PM";
};

type DaySchedule = {
  enabled: boolean;
  slots: TimeSlot[];
};

interface BusinessHoursModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: Record<string, DaySchedule>;
  timezone: string;
  onSave: (data: { schedule: Record<string, DaySchedule>; timezone: string }) => void;
}

export function BusinessHoursModal({
  open,
  onOpenChange,
  schedule: initialSchedule,
  timezone: initialTimezone,
  onSave,
}: BusinessHoursModalProps) {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [timezone, setTimezone] = useState(initialTimezone);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDay = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
        slots: !prev[day].enabled ? [{ id: Date.now().toString(), start: "9:00", end: "5:00", startPeriod: "AM", endPeriod: "PM" }] : prev[day].slots
      }
    }));
  };

  const addTimeSlot = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { id: Date.now().toString(), start: "9:00", end: "5:00", startPeriod: "AM", endPeriod: "PM" }]
      }
    }));
  };

  const removeTimeSlot = (day: string, slotId: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter(s => s.id !== slotId)
      }
    }));
  };

  const updateTimeSlot = (day: string, slotId: string, field: keyof TimeSlot, value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map(s => s.id === slotId ? { ...s, [field]: value } : s)
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave({ schedule, timezone });
      toast({
        title: "Success",
        description: "Business hours updated successfully"
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update business hours",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Business Hours</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Set your operating hours so your agent can inform callers when you're available.
          </p>

          {/* Schedule */}
          <div className="space-y-3">
            {Object.keys(schedule).map((day) => (
              <div key={day} className="flex items-center gap-4">
                <div className="flex items-center gap-3 w-36 shrink-0">
                  <Switch
                    checked={schedule[day].enabled}
                    onCheckedChange={() => toggleDay(day)}
                  />
                  <span className="text-sm font-medium text-foreground">{day}</span>
                </div>

                {schedule[day].enabled ? (
                  <div className="flex-1 space-y-2 min-w-0">
                    {schedule[day].slots.map((slot, idx) => (
                      <>
                        {idx > 0 && (
                          <div className="text-sm text-muted-foreground py-1">and</div>
                        )}
                        <div key={slot.id} className="flex items-center gap-2">
                          <Input
                            value={slot.start}
                            onChange={(e) => updateTimeSlot(day, slot.id, "start", e.target.value)}
                            className="w-20 shrink-0"
                          />
                          <Select value={slot.startPeriod} onValueChange={(v) => updateTimeSlot(day, slot.id, "startPeriod", v)}>
                            <SelectTrigger className="w-20 shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AM">AM</SelectItem>
                              <SelectItem value="PM">PM</SelectItem>
                            </SelectContent>
                          </Select>

                          <span className="text-muted-foreground shrink-0">to</span>

                          <Input
                            value={slot.end}
                            onChange={(e) => updateTimeSlot(day, slot.id, "end", e.target.value)}
                            className="w-20 shrink-0"
                          />
                          <Select value={slot.endPeriod} onValueChange={(v) => updateTimeSlot(day, slot.id, "endPeriod", v)}>
                            <SelectTrigger className="w-20 shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AM">AM</SelectItem>
                              <SelectItem value="PM">PM</SelectItem>
                            </SelectContent>
                          </Select>

                          <div className="flex items-center gap-1 ml-2 shrink-0">
                            {schedule[day].slots.length > 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeTimeSlot(day, slot.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}

                            {idx === schedule[day].slots.length - 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => addTimeSlot(day)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground flex-1">Closed</div>
                )}
              </div>
            ))}
          </div>

          {/* Timezone */}
          <div className="space-y-2 pt-4 border-t">
            <label className="text-sm font-medium text-foreground">Time zone</label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eastern">Eastern Time — 07:52 PM</SelectItem>
                <SelectItem value="central">Central Time — 06:52 PM</SelectItem>
                <SelectItem value="mountain">Mountain Time — 05:52 PM</SelectItem>
                <SelectItem value="pacific">Pacific Time — 04:52 PM</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Used to display time in the app
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
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
