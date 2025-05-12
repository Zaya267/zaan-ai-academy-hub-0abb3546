
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check } from 'lucide-react';

const RegistrationForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState(prev => ({ ...prev, program: value }));
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
                      <Select onValueChange={handleSelectChange} required>
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
