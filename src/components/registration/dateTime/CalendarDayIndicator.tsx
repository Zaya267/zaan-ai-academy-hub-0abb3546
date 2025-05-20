
import React from 'react';
import { format } from "date-fns";
import { DayContentProps } from "react-day-picker";
import { cn } from "@/lib/utils";
import { isDayDisabled, getAvailableSlotsCount } from './dateTimeUtils';

interface CalendarDayIndicatorProps extends DayContentProps {
  classFormat: string;
}

const CalendarDayIndicator: React.FC<CalendarDayIndicatorProps> = ({ 
  date,
  activeModifiers,
  classFormat,
  ...props
}) => {
  // Only add indicators for in-person format
  if (classFormat === 'in-person') {
    const isAvailable = !isDayDisabled(date, classFormat);
    const slotsCount = isAvailable ? getAvailableSlotsCount(date) : 0;
    
    return (
      <div className="relative w-full h-full">
        <div {...props}>
          {format(date, "d")}
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
  
  return <div {...props}>{format(date, "d")}</div>;
};

export default CalendarDayIndicator;
