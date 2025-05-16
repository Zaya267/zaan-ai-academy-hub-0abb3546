
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface StudentTypeSelectorProps {
  studentType: string;
  onChange: (value: string) => void;
}

const StudentTypeSelector: React.FC<StudentTypeSelectorProps> = ({ studentType, onChange }) => {
  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
      <Label>Student Type</Label>
      <RadioGroup 
        defaultValue={studentType}
        value={studentType}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
        onValueChange={onChange}
      >
        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="full-time" id="full-time" />
          <Label htmlFor="full-time" className="flex flex-col cursor-pointer">
            <span className="font-medium">Full-Time Student</span>
            <span className="text-sm text-gray-500">12-month program</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="part-time" id="part-time" />
          <Label htmlFor="part-time" className="flex flex-col cursor-pointer">
            <span className="font-medium">Part-Time Student</span>
            <span className="text-sm text-gray-500">Book available sessions</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default StudentTypeSelector;
