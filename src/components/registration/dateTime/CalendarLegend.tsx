
import React from 'react';

const CalendarLegend: React.FC = () => {
  return (
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
  );
};

export default CalendarLegend;
