import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Clock,
  Users,
  PhoneMissed,
  ShieldOff,
  Timer,
  Calendar,
  PhoneOff,
  TrendingUp,
  CalendarDays,
  CalendarClock,
  GripVertical,
  Check,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface Metric {
  id: string;
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface CustomizeMetricsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMetrics: string[];
  onSave: (metrics: string[]) => void;
}

const allMetrics: Metric[] = [
  { id: "total-calls", label: "Total Calls", value: "4", icon: Phone, color: "bg-blue-500/10 text-blue-500" },
  { id: "spam-blocked", label: "Spam Blocked", value: "12", icon: ShieldOff, color: "bg-red-500/10 text-red-500" },
  { id: "total-time-saved", label: "Total Time Saved", value: "2h 15m", icon: Timer, color: "bg-green-500/10 text-green-500" },
  { id: "after-hours-calls", label: "After-Hours Calls", value: "8", icon: Calendar, color: "bg-purple-500/10 text-purple-500" },
  { id: "avg-duration", label: "Average Call Duration", value: "1m 39s", icon: Clock, color: "bg-blue-500/10 text-blue-500" },
  { id: "missed-calls", label: "Missed Calls", value: "1", icon: PhoneMissed, color: "bg-red-500/10 text-red-500" },
  { id: "unique-callers", label: "Unique Callers", value: "4", icon: Users, color: "bg-blue-500/10 text-blue-500" },
  { id: "hung-up-calls", label: "Hung up Calls", value: "2", icon: PhoneOff, color: "bg-orange-500/10 text-orange-500" },
  { id: "calls-today", label: "Calls Today", value: "4", icon: TrendingUp, color: "bg-green-500/10 text-green-500" },
  { id: "calls-week", label: "Calls this Week", value: "28", icon: CalendarDays, color: "bg-blue-500/10 text-blue-500" },
  { id: "calls-month", label: "Calls this Month", value: "142", icon: CalendarClock, color: "bg-purple-500/10 text-purple-500" },
];

function SortableMetricItem({
  metric,
  onRemove,
  position,
}: {
  metric: Metric;
  onRemove: () => void;
  position: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: metric.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 rounded-lg border border-primary bg-primary/5"
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className={`p-2 rounded-lg ${metric.color}`}>
        <metric.icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-foreground">{metric.label}</div>
        <div className="text-xs text-muted-foreground">Position {position}</div>
      </div>
      <Check className="h-5 w-5 text-primary" />
      <button
        onClick={onRemove}
        className="text-sm text-red-500 hover:text-red-600 font-medium"
      >
        Remove
      </button>
    </div>
  );
}

export function CustomizeMetricsModal({
  open,
  onOpenChange,
  selectedMetrics,
  onSave,
}: CustomizeMetricsModalProps) {
  const [localSelected, setLocalSelected] = useState<string[]>(selectedMetrics);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLocalSelected((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const toggleMetric = (metricId: string) => {
    if (localSelected.includes(metricId)) {
      setLocalSelected(localSelected.filter((id) => id !== metricId));
    } else if (localSelected.length < 4) {
      setLocalSelected([...localSelected, metricId]);
    }
  };

  const handleSave = () => {
    onSave(localSelected);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setLocalSelected(selectedMetrics);
    onOpenChange(false);
  };

  const selectedMetricObjects = localSelected
    .map((id) => allMetrics.find((m) => m.id === id))
    .filter(Boolean) as Metric[];

  const availableMetrics = allMetrics.filter((m) => !localSelected.includes(m.id));

  const isMaxReached = localSelected.length >= 4;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Performance Metrics</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select up to 4 metrics to display. Drag to reorder.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Counter */}
          {localSelected.length > 0 && (
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-foreground">
                <span className="font-semibold">{localSelected.length} of 4</span> metrics selected
                {isMaxReached && (
                  <span className="text-primary ml-2">(Maximum reached)</span>
                )}
              </p>
            </div>
          )}

          {/* Selected Metrics - Draggable */}
          {selectedMetricObjects.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Selected Metrics (Drag to reorder)</h4>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={localSelected} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {selectedMetricObjects.map((metric, index) => (
                      <SortableMetricItem
                        key={metric.id}
                        metric={metric}
                        position={index + 1}
                        onRemove={() => toggleMetric(metric.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          {/* Available Metrics */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Available Metrics</h4>
            <div className="grid grid-cols-2 gap-3">
              {availableMetrics.map((metric) => {
                const isSelected = localSelected.includes(metric.id);
                const isDisabled = !isSelected && isMaxReached;

                return (
                  <button
                    key={metric.id}
                    onClick={() => !isDisabled && toggleMetric(metric.id)}
                    disabled={isDisabled}
                    className={`flex items-center gap-3 p-4 rounded-lg border transition-all text-left ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : isDisabled
                        ? "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                        : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${metric.color}`}>
                      <metric.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm">{metric.label}</div>
                      <div className="text-xs text-muted-foreground">{metric.value}</div>
                    </div>
                    {isSelected && <Check className="h-5 w-5 text-primary flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground border-t pt-4">
          Tip: Drag selected metrics above to change their display order
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
