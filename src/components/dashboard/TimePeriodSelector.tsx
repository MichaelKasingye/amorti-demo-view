
import { useState } from "react";
import { Calendar, CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export type TimePeriod = 'day' | 'week' | 'month' | 'custom';

export interface DateRange {
  from: Date;
  to: Date;
}

interface TimePeriodSelectorProps {
  value: TimePeriod;
  onChange: (period: TimePeriod, dateRange?: DateRange) => void;
  customDateRange?: DateRange;
}

export function TimePeriodSelector({ value, onChange, customDateRange }: TimePeriodSelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(customDateRange);

  const handlePeriodChange = (newValue: string) => {
    if (newValue && newValue !== 'custom') {
      onChange(newValue as TimePeriod);
    } else if (newValue === 'custom') {
      setIsCalendarOpen(true);
    }
  };

  const handleCustomDateApply = () => {
    if (tempDateRange) {
      onChange('custom', tempDateRange);
      setIsCalendarOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Time Period:</span>
      </div>
      
      <ToggleGroup type="single" value={value} onValueChange={handlePeriodChange}>
        <ToggleGroupItem value="day" aria-label="Day">
          Day
        </ToggleGroupItem>
        <ToggleGroupItem value="week" aria-label="Week">
          Week
        </ToggleGroupItem>
        <ToggleGroupItem value="month" aria-label="Month">
          Month
        </ToggleGroupItem>
        <ToggleGroupItem value="custom" aria-label="Custom Range">
          Custom
        </ToggleGroupItem>
      </ToggleGroup>

      {value === 'custom' && customDateRange && (
        <div className="text-sm text-muted-foreground">
          {format(customDateRange.from, 'MMM dd')} - {format(customDateRange.to, 'MMM dd, yyyy')}
        </div>
      )}

      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8",
              value === 'custom' ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <Calendar className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="end">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Select Date Range</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground">From</label>
                  <CalendarComponent
                    mode="single"
                    selected={tempDateRange?.from}
                    onSelect={(date) => date && setTempDateRange(prev => ({
                      from: date,
                      to: prev?.to || date
                    }))}
                    disabled={(date) => date > new Date()}
                    className="pointer-events-auto"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">To</label>
                  <CalendarComponent
                    mode="single"
                    selected={tempDateRange?.to}
                    onSelect={(date) => date && setTempDateRange(prev => ({
                      from: prev?.from || date,
                      to: date
                    }))}
                    disabled={(date) => 
                      date > new Date() || 
                      (tempDateRange?.from && date < tempDateRange.from)
                    }
                    className="pointer-events-auto"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setIsCalendarOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleCustomDateApply}>
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
