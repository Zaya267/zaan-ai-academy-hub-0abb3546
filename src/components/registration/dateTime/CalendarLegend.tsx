
import React from 'react';

/**
 * CalendarLegend Component
 * 
 * Displays a legend explaining the color-coded availability indicators
 * shown on calendar days for in-person classes. Helps users understand
 * what the colored dots beneath date numbers mean.
 * 
 * Color scheme:
 * - Green: Many slots available (encouraging booking)
 * - Amber: Few slots available (moderate urgency)
 * - Red: Limited slots available (high urgency)
 */
const CalendarLegend: React.FC = () => {
  return (
    <div className="mb-3 px-2 pt-1 flex items-center justify-between">
      {/* Legend title */}
      <span className="text-sm font-medium">Available dates:</span>
      
      {/* Color indicators with labels */}
      <div className="flex items-center space-x-4 text-xs">
        {/* Green indicator - Many slots */}
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
          <span>Many slots</span>
        </div>
        
        {/* Amber indicator - Few slots */}
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
          <span>Few slots</span>
        </div>
        
        {/* Red indicator - Limited slots */}
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-red-400 mr-1"></div>
          <span>Limited</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarLegend;
