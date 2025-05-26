
import React from 'react';
import { format } from "date-fns";
import { DayContentProps } from "react-day-picker";
import { cn } from "@/lib/utils";
import { isDayDisabled, getAvailableSlotsCount } from './dateTimeUtils';

/**
 * Props for the CalendarDayIndicator component
 * Extends DayContentProps from react-day-picker to maintain compatibility
 */
interface CalendarDayIndicatorProps extends DayContentProps {
  /** The format of the class - determines if indicators should be shown */
  classFormat: string;
}

/**
 * CalendarDayIndicator Component
 * 
 * A custom day component for the calendar that displays availability indicators
 * for in-person classes. Shows colored dots beneath date numbers to indicate
 * slot availability levels:
 * - Green: Many slots available (4+)
 * - Amber: Few slots available (2-3)
 * - Red: Limited slots available (1)
 * 
 * For online classes, renders as a standard date without indicators.
 */
const CalendarDayIndicator: React.FC<CalendarDayIndicatorProps> = ({ 
  date,
  activeModifiers,
  classFormat,
  ...props
}) => {
  // Only add indicators for in-person format
  if (classFormat === 'in-person') {
    // Check if this date is available for booking
    const isAvailable = !isDayDisabled(date, classFormat);
    
    // Get the number of available slots for this date
    const slotsCount = isAvailable ? getAvailableSlotsCount(date) : 0;
    
    return (
      <div className="relative w-full h-full">
        {/* Standard day number display */}
        <div {...props}>
          {format(date, "d")}
        </div>
        
        {/* Availability indicator dot */}
        {isAvailable && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <div className={cn(
              "h-1 w-1 rounded-full",
              // Color coding based on slot availability
              slotsCount > 3 ? "bg-green-500" :     // Many slots
              slotsCount > 1 ? "bg-amber-500" :     // Few slots  
              "bg-red-400"                          // Limited slots
            )} />
          </div>
        )}
      </div>
    );
  }
  
  // For online classes, render standard day without indicators
  return <div {...props}>{format(date, "d")}</div>;
};

export default CalendarDayIndicator;
