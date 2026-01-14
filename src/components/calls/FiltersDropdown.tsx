import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Filter, X, Check, AlertCircle, CheckCircle2, Ban, Beaker, ChevronLeft, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

export interface FilterState {
  dateRange: "today" | "last-7-days" | "last-30-days" | "custom" | null;
  callStatus: string[];
  starredOnly: boolean;
  unreadOnly: boolean;
  allCalls: boolean;
  customDateFrom?: Date;
  customDateTo?: Date;
}

interface FiltersDropdownProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const callStatuses = [
  { id: "follow_up_required", label: "Follow-up Required", icon: AlertCircle },
  { id: "no_action_needed", label: "No Action Needed", icon: CheckCircle2 },
  { id: "spam", label: "Spam", icon: Ban },
  { id: "test_call", label: "Test Call", icon: Beaker },
];

type FilterTopic = "date" | "status" | "quick" | null;

export function FiltersDropdown({ filters, onFiltersChange }: FiltersDropdownProps) {
  const [open, setOpen] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [activeTopic, setActiveTopic] = useState<FilterTopic>(null);
  const isMobile = useIsMobile();

  const handleDateRangeChange = (range: FilterState["dateRange"]) => {
    const newRange = filters.dateRange === range ? null : range;
    onFiltersChange({
      ...filters,
      dateRange: newRange,
      customDateFrom: newRange === "custom" ? filters.customDateFrom : undefined,
      customDateTo: newRange === "custom" ? filters.customDateTo : undefined,
    });
  };

  const handleStatusToggle = (statusId: string) => {
    const current = filters.callStatus;
    let newStatus: string[];

    if (current.includes(statusId)) {
      newStatus = current.filter((s) => s !== statusId);
    } else {
      newStatus = [...current, statusId];
    }

    onFiltersChange({ ...filters, callStatus: newStatus });
  };

  const handleClearAll = () => {
    onFiltersChange({
      dateRange: null,
      callStatus: [],
      starredOnly: false,
      unreadOnly: false,
      allCalls: true,
      customDateFrom: undefined,
      customDateTo: undefined,
    });
    setActiveTopic(null);
  };

  const isDefaultFilters =
    filters.dateRange === null &&
    filters.callStatus.length === 0 &&
    !filters.starredOnly &&
    !filters.unreadOnly &&
    filters.allCalls;

  const activeFilterCount =
    (filters.dateRange !== null ? 1 : 0) +
    (filters.callStatus.length > 0 ? 1 : 0) +
    (filters.starredOnly ? 1 : 0) +
    (filters.unreadOnly ? 1 : 0);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setActiveTopic(null);
    }
  };

  // Render filter topics menu (mobile first view)
  const renderTopicsMenu = () => (
    <div className="space-y-2 p-4">
      <button
        onClick={() => setActiveTopic("date")}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors",
          filters.dateRange !== null
            ? "bg-primary/10 text-primary font-medium"
            : "hover:bg-muted text-foreground bg-muted/50"
        )}
      >
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5" />
          <span>Date Range</span>
        </div>
        {filters.dateRange !== null && (
          <Badge variant="secondary" className="ml-2">1</Badge>
        )}
      </button>
      
      <button
        onClick={() => setActiveTopic("status")}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors",
          filters.callStatus.length > 0
            ? "bg-primary/10 text-primary font-medium"
            : "hover:bg-muted text-foreground bg-muted/50"
        )}
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          <span>AI Status</span>
        </div>
        {filters.callStatus.length > 0 && (
          <Badge variant="secondary" className="ml-2">{filters.callStatus.length}</Badge>
        )}
      </button>
      
      <button
        onClick={() => setActiveTopic("quick")}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors",
          (filters.starredOnly || filters.unreadOnly)
            ? "bg-primary/10 text-primary font-medium"
            : "hover:bg-muted text-foreground bg-muted/50"
        )}
      >
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5" />
          <span>Quick Filters</span>
        </div>
        {(filters.starredOnly || filters.unreadOnly) && (
          <Badge variant="secondary" className="ml-2">
            {(filters.starredOnly ? 1 : 0) + (filters.unreadOnly ? 1 : 0)}
          </Badge>
        )}
      </button>
    </div>
  );

  // Render date filters
  const renderDateFilters = () => (
    <div className="space-y-2 p-4">
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
            "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors",
            filters.dateRange === range.id
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-muted text-foreground"
          )}
        >
          {range.label}
          {filters.dateRange === range.id && <Check className="h-4 w-4" />}
        </button>
      ))}

      {filters.dateRange === "custom" && (
        <div className="space-y-3 mt-4 pt-4 border-t">
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
              <PopoverContent className="w-auto p-0 z-[100]" align="start">
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
              <PopoverContent className="w-auto p-0 z-[100]" align="start">
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
  );

  // Render status filters
  const renderStatusFilters = () => (
    <div className="space-y-2 p-4">
      {callStatuses.map((status) => {
        const isSelected = filters.callStatus.includes(status.id);
        const Icon = status.icon;
        return (
          <button
            key={status.id}
            onClick={() => handleStatusToggle(status.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
              isSelected
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-muted text-foreground"
            )}
          >
            {Icon && <Icon className="h-5 w-5" />}
            <span className="flex-1 text-left">{status.label}</span>
            {isSelected && <Check className="h-4 w-4" />}
          </button>
        );
      })}
    </div>
  );

  // Render quick filters
  const renderQuickFilters = () => (
    <div className="space-y-2 p-4">
      <button
        onClick={() => onFiltersChange({ 
          ...filters, 
          allCalls: true,
          starredOnly: false,
          unreadOnly: false
        })}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
          filters.allCalls
            ? "bg-primary/10 text-primary font-medium"
            : "hover:bg-muted text-foreground"
        )}
      >
        <span className="flex-1 text-left">All calls</span>
        {filters.allCalls && <Check className="h-4 w-4" />}
      </button>
      <button
        onClick={() => onFiltersChange({ 
          ...filters, 
          starredOnly: !filters.starredOnly,
          allCalls: false
        })}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
          filters.starredOnly
            ? "bg-primary/10 text-primary font-medium"
            : "hover:bg-muted text-foreground"
        )}
      >
        <div className={cn("h-5 w-5 flex items-center justify-center", filters.starredOnly && "text-yellow-600")}>
          ⭐
        </div>
        <span className="flex-1 text-left">Starred calls</span>
        {filters.starredOnly && <Check className="h-4 w-4" />}
      </button>
      <button
        onClick={() => onFiltersChange({ 
          ...filters, 
          unreadOnly: !filters.unreadOnly,
          allCalls: false
        })}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
          filters.unreadOnly
            ? "bg-primary/10 text-primary font-medium"
            : "hover:bg-muted text-foreground"
        )}
      >
        <div className={cn("h-3 w-3 rounded-full ml-1", filters.unreadOnly ? "bg-primary" : "bg-muted-foreground/40")} />
        <span className="flex-1 text-left">Unread calls</span>
        {filters.unreadOnly && <Check className="h-4 w-4" />}
      </button>
    </div>
  );

  const getTopicTitle = () => {
    switch (activeTopic) {
      case "date": return "Date Range";
      case "status": return "AI Status";
      case "quick": return "Quick Filters";
      default: return "Filters";
    }
  };

  // Mobile - use Popover positioned below the button
  if (isMobile) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
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
        <PopoverContent 
          className="w-[280px] p-0 bg-background" 
          align="start"
          sideOffset={8}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              {activeTopic && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setActiveTopic(null)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              <h4 className="font-semibold text-sm text-foreground">{getTopicTitle()}</h4>
            </div>
            <div className="flex items-center gap-2">
              {!isDefaultFilters && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                  Clear
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

          <div className="max-h-[300px] overflow-y-auto">
            {activeTopic === null && renderTopicsMenu()}
            {activeTopic === "date" && renderDateFilters()}
            {activeTopic === "status" && renderStatusFilters()}
            {activeTopic === "quick" && renderQuickFilters()}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Desktop Popover (three columns like before)
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
      <PopoverContent className="w-[750px] p-0 bg-background" align="start">
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

          {/* Content - Three Columns */}
          <div className="grid grid-cols-3 gap-6 p-4">
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
                      <PopoverContent className="w-auto p-0 z-[100]" align="start">
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
                      <PopoverContent className="w-auto p-0 z-[100]" align="start">
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

            {/* Middle Column - AI Status */}
            <div className="space-y-3">
              <h5 className="font-semibold text-sm text-foreground">AI Status</h5>
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

            {/* Right Column - Quick Filters */}
            <div className="space-y-3">
              <h5 className="font-semibold text-sm text-foreground">Quick Filters</h5>
              <div className="space-y-2">
                <button
                  onClick={() => onFiltersChange({ 
                    ...filters, 
                    allCalls: true,
                    starredOnly: false,
                    unreadOnly: false
                  })}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                    filters.allCalls
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <span className="flex-1">All calls</span>
                  {filters.allCalls && <Check className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => onFiltersChange({ 
                    ...filters, 
                    starredOnly: !filters.starredOnly,
                    allCalls: false
                  })}
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
                  <span className="flex-1">Starred calls</span>
                  {filters.starredOnly && <Check className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => onFiltersChange({ 
                    ...filters, 
                    unreadOnly: !filters.unreadOnly,
                    allCalls: false
                  })}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                    filters.unreadOnly
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <div className={cn("h-2 w-2 rounded-full", filters.unreadOnly ? "bg-blue-600" : "bg-gray-400")} />
                  <span className="flex-1">Unread calls</span>
                  {filters.unreadOnly && <Check className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}