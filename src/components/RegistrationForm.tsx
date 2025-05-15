
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check, CalendarIcon, Clock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
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

const RegistrationForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    studentType: 'part-time',
    classFormat: 'in-person',
    startDate: undefined as Date | undefined,
    startTime: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // Format date as string key for time slots
  const formatDateKey = (date: Date) => {
    return date ? format(date, "yyyy-MM-dd") : "";
  };

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!formState.startDate) return [];
    const dateKey = formatDateKey(formState.startDate);
    return TIME_SLOTS[dateKey as keyof typeof TIME_SLOTS] || [];
  };

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

  const handleDateSelect = (date: Date | undefined) => {
    setFormState(prev => ({ 
      ...prev, 
      startDate: date,
      startTime: '', // Reset time when date changes
    }));
  };

  const handleTimeSelect = (time: string) => {
    setFormState(prev => ({ ...prev, startTime: time }));
    setIsCalendarOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      toast({
        title: "Registration submitted!",
        description: "We will contact you shortly to discuss your learning journey.",
      });
    }, 1500);
  };

  // Function to determine which days should be disabled
  const isDayDisabled = (date: Date) => {
    if (formState.classFormat === 'online') {
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
    <section id="register" className="py-20 register-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">Register for Tutoring</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take the first step in your AI learning journey with AtZaan AI Labs
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {!submitted ? (
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

                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <Label>Student Type</Label>
                    <RadioGroup 
                      defaultValue="part-time"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
                      onValueChange={(value) => handleSelectChange('studentType', value)}
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
                  
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <Label>Class Format</Label>
                    <RadioGroup 
                      defaultValue="in-person"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
                      onValueChange={(value) => handleSelectChange('classFormat', value)}
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

                  <div className="space-y-2">
                    <Label htmlFor="startDate">
                      {formState.classFormat === 'in-person' 
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
                            !formState.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formState.startDate 
                            ? `${format(formState.startDate, "PPP")}${formState.startTime ? ` at ${formState.startTime}` : ''}`
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-3">
                          <Calendar
                            mode="single"
                            selected={formState.startDate}
                            onSelect={handleDateSelect}
                            disabled={formState.classFormat === 'in-person' ? isDayDisabled : undefined}
                            initialFocus
                            className="pointer-events-auto"
                          />
                          
                          {formState.startDate && formState.classFormat === 'in-person' && (
                            <div className="mt-4 border-t pt-4">
                              <div className="mb-2 font-medium text-sm text-gray-700">
                                Available Time Slots on {format(formState.startDate, "PP")}:
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {getAvailableTimeSlots().map(time => (
                                  <Button 
                                    key={time} 
                                    variant={formState.startTime === time ? "default" : "outline"} 
                                    size="sm"
                                    onClick={() => handleTimeSelect(time)}
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
                    {formState.classFormat === 'in-person' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Only dates with available slots are selectable
                      </p>
                    )}
                  </div>
                  
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
          ) : (
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center p-12">
                <div className="h-16 w-16 rounded-full bg-atzaan-soft-purple flex items-center justify-center mb-6">
                  <Check size={32} className="text-atzaan-purple" />
                </div>
                <h3 className="text-2xl font-semibold text-atzaan-purple mb-2">Registration Complete!</h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  Thank you for registering with AtZaan AI Labs. We've received your information and will contact you shortly to discuss the next steps in your AI learning journey.
                </p>
                <Button 
                  onClick={() => setSubmitted(false)} 
                  variant="outline" 
                  className="border-atzaan-purple text-atzaan-purple hover:bg-atzaan-purple/10"
                >
                  Register Another Person
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
