import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Filter, X, Check, AlertCircle, CheckCircle2, Ban, Beaker } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export interface FilterState {
  dateRange: "today" | "last-7-days" | "last-30-days" | "custom" | null;
  callStatus: string[];
  starredOnly: boolean;
  unreadOnly: boolean;
  customDateFrom?: Date;
  customDateTo?: Date;
}

interface FiltersDropdownProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const callStatuses = [
  { id: "all", label: "All calls", icon: null },
  { id: "follow_up_required", label: "Follow-up Required", icon: AlertCircle },
  { id: "no_action_needed", label: "No Action Needed", icon: CheckCircle2 },
  { id: "spam", label: "Spam", icon: Ban },
  { id: "test_call", label: "Test Call", icon: Beaker },
];

export function FiltersDropdown({ filters, onFiltersChange }: FiltersDropdownProps) {
  const [open, setOpen] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const handleDateRangeChange = (range: FilterState["dateRange"]) => {
    // Toggle: if clicking the same range, deselect it
    const newRange = filters.dateRange === range ? null : range;
    onFiltersChange({
      ...filters,
      dateRange: newRange,
      customDateFrom: newRange === "custom" ? filters.customDateFrom : undefined,
      customDateTo: newRange === "custom" ? filters.customDateTo : undefined,
    });
  };

  const handleStatusToggle = (statusId: string) => {
    let newStatus: string[];

    if (statusId === "all") {
      newStatus = ["all"];
    } else {
      const currentWithoutAll = filters.callStatus.filter((s) => s !== "all");
      if (currentWithoutAll.includes(statusId)) {
        newStatus = currentWithoutAll.filter((s) => s !== statusId);
        if (newStatus.length === 0) {
          newStatus = ["all"];
        }
      } else {
        newStatus = [...currentWithoutAll, statusId];
      }
    }

    onFiltersChange({ ...filters, callStatus: newStatus });
  };

  const handleClearAll = () => {
    onFiltersChange({
      dateRange: null,
      callStatus: ["all"],
      starredOnly: false,
      unreadOnly: false,
      customDateFrom: undefined,
      customDateTo: undefined,
    });
  };

  const isDefaultFilters =
    filters.dateRange === null &&
    filters.callStatus.length === 1 &&
    filters.callStatus[0] === "all" &&
    !filters.starredOnly &&
    !filters.unreadOnly;

  const activeFilterCount =
    (filters.dateRange !== null ? 1 : 0) +
    (filters.callStatus.length === 1 && filters.callStatus[0] === "all" ? 0 : 1) +
    (filters.starredOnly ? 1 : 0) +
    (filters.unreadOnly ? 1 : 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 relative",
            activeFilterCount > 0 && "border-primary bg-primary/5"
          )}
        >
          <Filter className="h-4 w-4" />
          Filter
          {activeFilterCount > 0 && (
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0" align="start">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h4 className="font-semibold text-foreground">Filters</h4>
            <div className="flex items-center gap-2">
              {!isDefaultFilters && (
                <button
                  onClick={handleClearAll}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  Clear all
                </button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content - Two Columns */}
          <div className="grid grid-cols-2 gap-6 p-4">
            {/* Left Column - Date Range */}
            <div className="space-y-3">
              <h5 className="font-semibold text-sm text-foreground">Date Range</h5>
              <div className="space-y-2">
                {[
                  { id: "today", label: "Today" },
                  { id: "last-7-days", label: "Last 7 days" },
                  { id: "last-30-days", label: "Last 30 days" },
                  { id: "custom", label: "Custom range" },
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => handleDateRangeChange(range.id as FilterState["dateRange"])}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left",
                      filters.dateRange === range.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    {range.label}
                    {filters.dateRange === range.id && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>

              {/* Custom Date Pickers */}
              {filters.dateRange === "custom" && (
                <div className="space-y-3 mt-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Start Date</label>
                    <Popover open={showStartCalendar} onOpenChange={setShowStartCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {filters.customDateFrom
                            ? format(filters.customDateFrom, "dd/MM/yyyy")
                            : "dd/mm/yyyy"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.customDateFrom}
                          onSelect={(date) => {
                            onFiltersChange({ ...filters, customDateFrom: date });
                            setShowStartCalendar(false);
                          }}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">End Date</label>
                    <Popover open={showEndCalendar} onOpenChange={setShowEndCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {filters.customDateTo
                            ? format(filters.customDateTo, "dd/MM/yyyy")
                            : "dd/mm/yyyy"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.customDateTo}
                          onSelect={(date) => {
                            onFiltersChange({ ...filters, customDateTo: date });
                            setShowEndCalendar(false);
                          }}
                          disabled={(date) =>
                            filters.customDateFrom ? date < filters.customDateFrom : false
                          }
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Call Status */}
            <div className="space-y-3">
              <h5 className="font-semibold text-sm text-foreground">Call Status</h5>
              <div className="space-y-2">
                {callStatuses.map((status) => {
                  const isSelected = filters.callStatus.includes(status.id);
                  const Icon = status.icon;
                  return (
                    <button
                      key={status.id}
                      onClick={() => handleStatusToggle(status.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                        isSelected
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted text-foreground"
                      )}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span className="flex-1">{status.label}</span>
                      {isSelected && <Check className="h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Filters - Full Width Below */}
          <div className="col-span-2 space-y-3 pt-4 border-t">
            <h5 className="font-semibold text-sm text-foreground">Quick Filters</h5>
            <div className="space-y-2">
              <button
                onClick={() => onFiltersChange({ ...filters, starredOnly: !filters.starredOnly })}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                  filters.starredOnly
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-foreground"
                )}
              >
                <div className={cn("h-4 w-4 flex items-center justify-center", filters.starredOnly && "text-yellow-600")}>
                  ⭐
                </div>
                <span className="flex-1">Starred only</span>
                {filters.starredOnly && <Check className="h-4 w-4" />}
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, unreadOnly: !filters.unreadOnly })}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                  filters.unreadOnly
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-foreground"
                )}
              >
                <div className={cn("h-2 w-2 rounded-full", filters.unreadOnly ? "bg-blue-600" : "bg-gray-400")} />
                <span className="flex-1">Unread only</span>
                {filters.unreadOnly && <Check className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
