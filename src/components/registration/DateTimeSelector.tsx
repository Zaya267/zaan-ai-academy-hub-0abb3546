
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Import the new components and utilities
import CalendarDayIndicator from './dateTime/CalendarDayIndicator';
import TimeSlotSelector from './dateTime/TimeSlotSelector';
import CalendarLegend from './dateTime/CalendarLegend';
import { AVAILABLE_DATES, isDayDisabled } from './dateTime/dateTimeUtils';

interface DateTimeSelectorProps {
  classFormat: string;
  startDate: Date | undefined;
  startTime: string;
  onDateSelect: (date: Date | undefined) => void;
  onTimeSelect: (time: string) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ 
  classFormat, 
  startDate, 
  startTime, 
  onDateSelect, 
  onTimeSelect 
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonthDates, setCurrentMonthDates] = useState<Date[]>([]);
  
  // Function to update current month's available dates for the mini calendar
  const handleMonthChange = (month: Date) => {
    // Filter available dates for the current month view
    if (classFormat === 'in-person') {
      const filteredDates = AVAILABLE_DATES.filter(date => 
        date.getMonth() === month.getMonth() && 
        date.getFullYear() === month.getFullYear()
      );
      setCurrentMonthDates(filteredDates);
    }
  };

  // Render custom day component with availability indicators
  const renderDay = (props: React.ComponentProps<typeof CalendarDayIndicator['props']>) => {
    return <CalendarDayIndicator props={props} classFormat={classFormat} />;
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="startDate">
        {classFormat === 'in-person' 
          ? 'Select Available Date & Time' 
          : 'Preferred Start Date (Optional)'}
      </Label>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            id="startDate"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate 
              ? `${format(startDate, "PPP")}${startTime ? ` at ${startTime}` : ''}`
              : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            {classFormat === 'in-person' && <CalendarLegend />}
            
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={onDateSelect}
              disabled={classFormat === 'in-person' ? 
                (date: Date) => isDayDisabled(date, classFormat) : 
                undefined
              }
              initialFocus
              className="pointer-events-auto"
              onMonthChange={handleMonthChange}
              components={{
                Day: renderDay
              }}
            />
            
            {startDate && classFormat === 'in-person' && (
              <TimeSlotSelector 
                startDate={startDate}
                startTime={startTime}
                onTimeSelect={onTimeSelect}
                onPopoverClose={() => setIsCalendarOpen(false)}
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
      {classFormat === 'in-person' && (
        <p className="text-xs text-muted-foreground mt-1">
          Only dates with available slots are selectable. Color indicators show slot availability.
        </p>
      )}
    </div>
  );
};

export default DateTimeSelector;
