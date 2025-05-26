
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

/**
 * Props for the DateTimeSelector component
 */
interface DateTimeSelectorProps {
  /** The format of the class - determines available features and validation */
  classFormat: string;
  /** Currently selected start date */
  startDate: Date | undefined;
  /** Currently selected start time */
  startTime: string;
  /** Callback when a date is selected */
  onDateSelect: (date: Date | undefined) => void;
  /** Callback when a time is selected */
  onTimeSelect: (time: string) => void;
}

/**
 * DateTimeSelector Component
 * 
 * A comprehensive date and time selection component that handles both online and in-person
 * class scheduling. For in-person classes, it shows availability indicators and restricts
 * selection to available dates/times. For online classes, it provides flexible scheduling.
 * 
 * Features:
 * - Calendar with visual availability indicators (in-person only)
 * - Time slot selection (in-person only)
 * - Legend showing availability levels (in-person only)
 * - Responsive popover interface
 * - Form validation integration
 */
const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ 
  classFormat, 
  startDate, 
  startTime, 
  onDateSelect, 
  onTimeSelect 
}) => {
  // State for controlling the calendar popover visibility
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // State for tracking available dates in the current month view
  const [currentMonthDates, setCurrentMonthDates] = useState<Date[]>([]);
  
  /**
   * Updates the list of available dates when the calendar month changes
   * This is used to optimize the display of availability indicators
   * 
   * @param month - The new month being displayed
   */
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

  return (
    <div className="space-y-2">
      {/* Dynamic label based on class format */}
      <Label htmlFor="startDate">
        {classFormat === 'in-person' 
          ? 'Select Available Date & Time' 
          : 'Preferred Start Date (Optional)'}
      </Label>
      
      {/* Calendar popover trigger and content */}
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
            {/* Show legend only for in-person classes */}
            {classFormat === 'in-person' && <CalendarLegend />}
            
            {/* Main calendar component with custom day indicators */}
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={onDateSelect}
              // Disable dates based on class format and availability
              disabled={classFormat === 'in-person' ? 
                (date: Date) => isDayDisabled(date, classFormat) : 
                undefined
              }
              initialFocus
              className="pointer-events-auto"
              onMonthChange={handleMonthChange}
              components={{
                // Custom day component with availability indicators
                Day: props => <CalendarDayIndicator {...props} classFormat={classFormat} />
              }}
            />
            
            {/* Time slot selector - only shown for in-person classes with selected date */}
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
      
      {/* Help text for in-person classes */}
      {classFormat === 'in-person' && (
        <p className="text-xs text-muted-foreground mt-1">
          Only dates with available slots are selectable. Color indicators show slot availability.
        </p>
      )}
    </div>
  );
};

export default DateTimeSelector;
