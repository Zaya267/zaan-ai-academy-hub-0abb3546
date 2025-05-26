
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from 'lucide-react';
import { format } from "date-fns";
import { getAvailableTimeSlots } from './dateTimeUtils';

/**
 * Props for the TimeSlotSelector component
 */
interface TimeSlotSelectorProps {
  /** The selected date for which to show time slots */
  startDate: Date;
  /** Currently selected time slot */
  startTime: string;
  /** Callback when a time slot is selected */
  onTimeSelect: (time: string) => void;
  /** Callback to close the parent popover when time is selected */
  onPopoverClose: () => void;
}

/**
 * TimeSlotSelector Component
 * 
 * Displays available time slots for a selected date in a grid layout.
 * Used specifically for in-person classes where time slots have limited availability.
 * 
 * Features:
 * - Grid layout of available time slots
 * - Visual indication of selected time
 * - Slot count badge
 * - Clock icons for better UX
 * - Automatic popover closure on selection
 */
const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ 
  startDate, 
  startTime, 
  onTimeSelect,
  onPopoverClose
}) => {
  // Get available time slots for the selected date
  const availableTimeSlots = getAvailableTimeSlots(startDate);

  return (
    <div className="mt-4 border-t pt-4">
      {/* Header with date and slot count */}
      <div className="mb-2 font-medium text-sm flex justify-between items-center">
        <span className="text-gray-700">
          Available Time Slots on {format(startDate, "PP")}:
        </span>
        {/* Badge showing total number of available slots */}
        <Badge variant="outline" className="text-xs">
          {availableTimeSlots.length} slots
        </Badge>
      </div>
      
      {/* Grid of time slot buttons */}
      <div className="grid grid-cols-2 gap-2">
        {availableTimeSlots.map(time => (
          <Button 
            key={time} 
            // Highlight selected time slot
            variant={startTime === time ? "default" : "outline"} 
            size="sm"
            onClick={() => {
              // Select the time and close the popover
              onTimeSelect(time);
              onPopoverClose();
            }}
            className="justify-start"
          >
            {/* Clock icon for visual consistency */}
            <Clock className="mr-2 h-3.5 w-3.5" />
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
