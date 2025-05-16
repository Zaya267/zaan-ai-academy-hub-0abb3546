
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import StudentTypeSelector from './StudentTypeSelector';
import ClassFormatSelector from './ClassFormatSelector';
import DateTimeSelector from './DateTimeSelector';
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegistrationFormValues } from './RegistrationFormContainer';

interface RegistrationFormFieldsProps {
  form: UseFormReturn<RegistrationFormValues>;
  onSubmit: (values: RegistrationFormValues) => Promise<void>;
}

const RegistrationFormFields: React.FC<RegistrationFormFieldsProps> = ({ 
  form, 
  onSubmit 
}) => {
  const { control, watch } = form;
  const classFormat = watch("classFormat");
  const startDate = watch("startDate");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Form</CardTitle>
        <CardDescription>
          Fill out this form to register for one of our AI tutoring programs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="Enter your email" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your phone number" 
                        {...field} 
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Interest</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="individual">Individual AI Mastery</SelectItem>
                        <SelectItem value="student">Student AI Foundations</SelectItem>
                        <SelectItem value="educator">Educator AI Integration</SelectItem>
                        <SelectItem value="custom">Custom Group Program</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="studentType"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Student Type</FormLabel>
                  <FormControl>
                    <StudentTypeSelector 
                      studentType={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="classFormat"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Class Format</FormLabel>
                  <FormControl>
                    <ClassFormatSelector 
                      classFormat={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <DateTimeSelector 
                classFormat={classFormat}
                startDate={startDate}
                startTime={form.watch("startTime")}
                onDateSelect={(date) => {
                  form.setValue("startDate", date);
                  form.setValue("startTime", "");
                }}
                onTimeSelect={(time) => form.setValue("startTime", time)}
              />
              {classFormat === 'in-person' && !startDate && (
                <p className="text-sm text-destructive">Please select a date for in-person sessions</p>
              )}
              {classFormat === 'in-person' && startDate && !form.watch("startTime") && (
                <p className="text-sm text-destructive">Please select a time slot</p>
              )}
            </div>
            
            <FormField
              control={control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your learning goals, preferred schedule, or any questions you have"
                      className="min-h-[120px]"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-atzaan-purple hover:bg-atzaan-purple/90" 
              disabled={form.formState.isSubmitting || (classFormat === 'in-person' && (!startDate || !form.watch("startTime")))}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Register Now"}
            </Button>
            
            <p className="text-sm text-center text-gray-500 mt-4">
              By registering, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegistrationFormFields;
