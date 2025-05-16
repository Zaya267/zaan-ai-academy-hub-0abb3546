
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from 'lucide-react';
import { format } from "date-fns";
import { getAvailableTimeSlots } from './dateTimeUtils';

interface TimeSlotSelectorProps {
  startDate: Date;
  startTime: string;
  onTimeSelect: (time: string) => void;
  onPopoverClose: () => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ 
  startDate, 
  startTime, 
  onTimeSelect,
  onPopoverClose
}) => {
  const availableTimeSlots = getAvailableTimeSlots(startDate);

  return (
    <div className="mt-4 border-t pt-4">
      <div className="mb-2 font-medium text-sm flex justify-between items-center">
        <span className="text-gray-700">
          Available Time Slots on {format(startDate, "PP")}:
        </span>
        <Badge variant="outline" className="text-xs">
          {availableTimeSlots.length} slots
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {availableTimeSlots.map(time => (
          <Button 
            key={time} 
            variant={startTime === time ? "default" : "outline"} 
            size="sm"
            onClick={() => {
              onTimeSelect(time);
              onPopoverClose();
            }}
            className="justify-start"
          >
            <Clock className="mr-2 h-3.5 w-3.5" />
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
