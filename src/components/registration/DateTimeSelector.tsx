
import React, { useState } from 'react';
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Mock data for available dates and time slots
const AVAILABLE_DATES = [
  new Date(2025, 5, 16),
  new Date(2025, 5, 17),
  new Date(2025, 5, 20),
  new Date(2025, 5, 21),
  new Date(2025, 5, 22),
  new Date(2025, 5, 25),
  new Date(2025, 5, 30),
];

const TIME_SLOTS = {
  "2025-06-16": ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
  "2025-06-17": ["10:00 AM", "1:00 PM", "3:00 PM"],
  "2025-06-20": ["9:00 AM", "11:00 AM", "2:00 PM"],
  "2025-06-21": ["10:00 AM", "1:00 PM"],
  "2025-06-22": ["9:00 AM", "3:00 PM", "5:00 PM"],
  "2025-06-25": ["11:00 AM", "2:00 PM", "4:00 PM"],
  "2025-06-30": ["9:00 AM", "1:00 PM", "4:00 PM"],
};

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
  
  // Format date as string key for time slots
  const formatDateKey = (date: Date) => {
    return date ? format(date, "yyyy-MM-dd") : "";
  };

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!startDate) return [];
    const dateKey = formatDateKey(startDate);
    return TIME_SLOTS[dateKey as keyof typeof TIME_SLOTS] || [];
  };

  // Function to determine which days should be disabled
  const isDayDisabled = (date: Date) => {
    if (classFormat === 'online') {
      return false; // Online classes don't have date restrictions
    }
    
    // For in-person, only allow specific available dates
    return !AVAILABLE_DATES.some(
      availableDate => 
        availableDate.getDate() === date.getDate() && 
        availableDate.getMonth() === date.getMonth() && 
        availableDate.getFullYear() === date.getFullYear()
    );
  };

  // Get the number of available slots for a specific date
  const getAvailableSlotsCount = (date: Date) => {
    const dateKey = formatDateKey(date);
    const slots = TIME_SLOTS[dateKey as keyof typeof TIME_SLOTS];
    return slots ? slots.length : 0;
  };

  // Custom day rendering to show available slots indicator
  const renderDay = (day: Date, selectedDay: Date | undefined, dayProps: React.ComponentPropsWithRef<"div">) => {
    // Only add indicators for in-person format
    if (classFormat === 'in-person') {
      const isAvailable = !isDayDisabled(day);
      const slotsCount = isAvailable ? getAvailableSlotsCount(day) : 0;
      
      return (
        <div className="relative w-full h-full">
          <div {...dayProps}>
            {format(day, "d")}
          </div>
          {isAvailable && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <div className={cn(
                "h-1 w-1 rounded-full",
                slotsCount > 3 ? "bg-green-500" : 
                slotsCount > 1 ? "bg-amber-500" : "bg-red-400"
              )} />
            </div>
          )}
        </div>
      );
    }
    
    return <div {...dayProps}>{format(day, "d")}</div>;
  };

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
            {classFormat === 'in-person' && (
              <div className="mb-3 px-2 pt-1 flex items-center justify-between">
                <span className="text-sm font-medium">Available dates:</span>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                    <span>Many slots</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
                    <span>Few slots</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-red-400 mr-1"></div>
                    <span>Limited</span>
                  </div>
                </div>
              </div>
            )}
            
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={onDateSelect}
              disabled={classFormat === 'in-person' ? isDayDisabled : undefined}
              initialFocus
              className="pointer-events-auto"
              onMonthChange={handleMonthChange}
              components={{
                Day: ({ day, selected, ...props }) => 
                  renderDay(day, selected, props as React.ComponentPropsWithRef<"div">)
              }}
            />
            
            {startDate && classFormat === 'in-person' && (
              <div className="mt-4 border-t pt-4">
                <div className="mb-2 font-medium text-sm flex justify-between items-center">
                  <span className="text-gray-700">
                    Available Time Slots on {format(startDate, "PP")}:
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {getAvailableTimeSlots().length} slots
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {getAvailableTimeSlots().map(time => (
                    <Button 
                      key={time} 
                      variant={startTime === time ? "default" : "outline"} 
                      size="sm"
                      onClick={() => {
                        onTimeSelect(time);
                        setIsCalendarOpen(false);
                      }}
                      className="justify-start"
                    >
                      <Clock className="mr-2 h-3.5 w-3.5" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
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
