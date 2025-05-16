
import React, { useState } from 'react';
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock } from 'lucide-react';
import { cn } from "@/lib/utils";

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
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={onDateSelect}
              disabled={classFormat === 'in-person' ? isDayDisabled : undefined}
              initialFocus
              className="pointer-events-auto"
            />
            
            {startDate && classFormat === 'in-person' && (
              <div className="mt-4 border-t pt-4">
                <div className="mb-2 font-medium text-sm text-gray-700">
                  Available Time Slots on {format(startDate, "PP")}:
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
          Only dates with available slots are selectable
        </p>
      )}
    </div>
  );
};

export default DateTimeSelector;
