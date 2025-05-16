
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import RegistrationFormFields from '@/components/registration/RegistrationFormFields';
import RegistrationSuccess from '@/components/registration/RegistrationSuccess';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const registrationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  program: z.string().min(1, { message: "Please select a program" }),
  studentType: z.string().default("part-time"),
  classFormat: z.string().default("in-person"),
  startDate: z.date().nullable(),
  startTime: z.string().optional(),
  message: z.string().optional(),
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationFormContainer = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      program: '',
      studentType: 'part-time',
      classFormat: 'in-person',
      startDate: null,
      startTime: '',
      message: '',
    },
  });
  
  const isSubmitting = form.formState.isSubmitting;
  
  const onSubmit = async (data: RegistrationFormValues) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    
    toast({
      title: "Registration submitted!",
      description: "We will contact you shortly to discuss your learning journey.",
    });
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
            <RegistrationFormFields 
              form={form}
              onSubmit={onSubmit}
            />
          ) : (
            <RegistrationSuccess onRegisterAnother={() => setSubmitted(false)} />
          )}
        </div>
      </div>
    </section>
  );
};

export default RegistrationFormContainer;
