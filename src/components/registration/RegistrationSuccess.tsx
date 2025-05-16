
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

interface RegistrationSuccessProps {
  onRegisterAnother: () => void;
}

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({ onRegisterAnother }) => {
  return (
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
          onClick={onRegisterAnother} 
          variant="outline" 
          className="border-atzaan-purple text-atzaan-purple hover:bg-atzaan-purple/10"
        >
          Register Another Person
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegistrationSuccess;
