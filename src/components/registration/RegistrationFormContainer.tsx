
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import RegistrationFormFields from '@/components/registration/RegistrationFormFields';
import RegistrationSuccess from '@/components/registration/RegistrationSuccess';

const RegistrationFormContainer = () => {
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
            <RegistrationFormFields 
              formState={formState}
              setFormState={setFormState}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
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
