
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import StudentTypeSelector from './StudentTypeSelector';
import ClassFormatSelector from './ClassFormatSelector';
import DateTimeSelector from './DateTimeSelector';

interface RegistrationFormFieldsProps {
  formState: {
    name: string;
    email: string;
    phone: string;
    program: string;
    studentType: string;
    classFormat: string;
    startDate: Date | undefined;
    startTime: string;
    message: string;
  };
  setFormState: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    phone: string;
    program: string;
    studentType: string;
    classFormat: string;
    startDate: Date | undefined;
    startTime: string;
    message: string;
  }>>;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const RegistrationFormFields: React.FC<RegistrationFormFieldsProps> = ({ formState, setFormState, isSubmitting, handleSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    
    // Reset date and time when switching between in-person and online
    if (field === 'classFormat') {
      setFormState(prev => ({ 
        ...prev, 
        [field]: value,
        startDate: undefined,
        startTime: '', 
      }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Form</CardTitle>
        <CardDescription>
          Fill out this form to register for one of our AI tutoring programs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input 
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formState.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="program">Program Interest</Label>
              <Select onValueChange={(value) => handleSelectChange('program', value)} required>
                <SelectTrigger id="program">
                  <SelectValue placeholder="Select a program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual AI Mastery</SelectItem>
                  <SelectItem value="student">Student AI Foundations</SelectItem>
                  <SelectItem value="educator">Educator AI Integration</SelectItem>
                  <SelectItem value="custom">Custom Group Program</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <StudentTypeSelector 
            studentType={formState.studentType}
            onChange={(value) => handleSelectChange('studentType', value)}
          />
          
          <ClassFormatSelector 
            classFormat={formState.classFormat}
            onChange={(value) => handleSelectChange('classFormat', value)}
          />

          <DateTimeSelector 
            classFormat={formState.classFormat}
            startDate={formState.startDate}
            startTime={formState.startTime}
            onDateSelect={(date) => setFormState(prev => ({ 
              ...prev, 
              startDate: date,
              startTime: '', 
            }))}
            onTimeSelect={(time) => setFormState(prev => ({ ...prev, startTime: time }))}
          />
          
          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea 
              id="message"
              name="message"
              placeholder="Share your learning goals, preferred schedule, or any questions you have"
              value={formState.message}
              onChange={handleChange}
              className="min-h-[120px]"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-atzaan-purple hover:bg-atzaan-purple/90" 
            disabled={isSubmitting || (formState.classFormat === 'in-person' && (!formState.startDate || !formState.startTime))}
          >
            {isSubmitting ? "Submitting..." : "Register Now"}
          </Button>
          
          <p className="text-sm text-center text-gray-500 mt-4">
            By registering, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationFormFields;
