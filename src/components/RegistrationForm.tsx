
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

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
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormState(prev => ({ ...prev, startDate: date }));
    setShowDatePicker(false);
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
                          <SelectItem value="online">Online AI Training</SelectItem>
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
                    <Label htmlFor="startDate">Preferred Start Date (Optional)</Label>
                    <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formState.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formState.startDate ? format(formState.startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formState.startDate}
                          onSelect={handleDateSelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                  
                  <Button type="submit" className="w-full bg-atzaan-purple hover:bg-atzaan-purple/90" disabled={isSubmitting}>
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
