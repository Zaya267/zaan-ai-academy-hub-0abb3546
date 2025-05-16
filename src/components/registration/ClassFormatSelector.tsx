
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ClassFormatSelectorProps {
  classFormat: string;
  onChange: (value: string) => void;
}

const ClassFormatSelector: React.FC<ClassFormatSelectorProps> = ({ classFormat, onChange }) => {
  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
      <Label>Class Format</Label>
      <RadioGroup 
        defaultValue={classFormat}
        value={classFormat}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
        onValueChange={onChange}
      >
        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="in-person" id="in-person" />
          <Label htmlFor="in-person" className="flex flex-col cursor-pointer">
            <span className="font-medium">In-Person</span>
            <span className="text-sm text-gray-500">Attend classes at our venues</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="online" id="online" />
          <Label htmlFor="online" className="flex flex-col cursor-pointer">
            <span className="font-medium">Online</span>
            <span className="text-sm text-gray-500">Join our virtual classroom</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ClassFormatSelector;
