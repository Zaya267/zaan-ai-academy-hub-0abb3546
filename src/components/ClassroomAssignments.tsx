
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Book, Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const ClassroomAssignments = () => {
  const { toast } = useToast();
  const [activeAssignment, setActiveAssignment] = useState<number | null>(null);
  const [submission, setSubmission] = useState<string>("");
  
  // Example assignments data - in a real app, this would come from a database
  const assignments = [
    {
      id: 1,
      title: 'Create an AI-powered Chatbot',
      description: 'Design a simple chatbot using the techniques learned in our sessions. Include at least three different types of responses.',
      dueDate: '2025-05-20',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Data Analysis Project',
      description: 'Analyze the provided dataset using AI tools and create a report of your findings with visualizations.',
      dueDate: '2025-05-15',
      status: 'Active',
    },
    {
      id: 3,
      title: 'AI Ethics Case Study',
      description: 'Research and write a case study about an ethical dilemma in AI technology and propose potential solutions.',
      dueDate: '2025-05-10',
      status: 'Completed',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!submission.trim()) {
      toast({
        title: "Empty Submission",
        description: "Please enter your answer or upload a file.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been submitted successfully.",
    });
    
    setSubmission("");
    setActiveAssignment(null);
  };

  return (
    <Card className="border-atzaan-soft-purple">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-atzaan-purple mb-6">Assignments</h2>
        
        {activeAssignment ? (
          // Assignment Submission View
          <>
            <Button 
              variant="ghost" 
              onClick={() => setActiveAssignment(null)}
              className="mb-4"
            >
              ← Back to All Assignments
            </Button>
            
            {assignments.filter(a => a.id === activeAssignment).map(assignment => (
              <div key={assignment.id}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium">{assignment.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                  <p className="mt-3 text-gray-700">{assignment.description}</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="submission">Your Solution</Label>
                      <Textarea
                        id="submission"
                        placeholder="Enter your answer here..."
                        className="min-h-[150px]"
                        value={submission}
                        onChange={(e) => setSubmission(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="file">Attachment (Optional)</Label>
                      <Input
                        id="file"
                        type="file"
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="bg-atzaan-purple hover:bg-atzaan-purple/90"
                    >
                      Submit Assignment
                    </Button>
                  </div>
                </form>
              </div>
            ))}
          </>
        ) : (
          // Assignments List View
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div 
                key={assignment.id}
                className="border rounded-lg p-4 hover:border-atzaan-purple transition-colors cursor-pointer"
                onClick={() => assignment.status === 'Completed' ? null : setActiveAssignment(assignment.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Book className="h-6 w-6 text-atzaan-purple flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">{assignment.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge 
                    variant={assignment.status === 'Completed' ? "outline" : "default"}
                    className={
                      assignment.status === 'Completed' 
                        ? "bg-green-100 text-green-800 border-green-300" 
                        : "bg-atzaan-purple"
                    }
                  >
                    {assignment.status}
                  </Badge>
                </div>
                
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {assignment.description}
                </p>
                
                {assignment.status !== 'Completed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 text-atzaan-purple hover:text-atzaan-purple hover:bg-atzaan-soft-purple/20 border-atzaan-soft-purple"
                  >
                    <Upload className="h-4 w-4 mr-1" /> Submit Work
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClassroomAssignments;
