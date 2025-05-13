
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { User, Users } from 'lucide-react';

const ClassroomParticipants = () => {
  const { toast } = useToast();
  
  // Example participants data - in a real app, this would come from a database
  const participants = [
    {
      id: 1,
      name: 'Tutor: Dr. Ahmed Khan',
      email: 'ahmed@atzaan.co.za',
      status: 'online',
      role: 'tutor',
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@example.com',
      status: 'online',
      role: 'student',
    },
    {
      id: 3,
      name: 'Emma Johnson',
      email: 'emma.j@example.com',
      status: 'away',
      role: 'student',
    },
    {
      id: 4,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      status: 'offline',
      role: 'student',
    },
  ];

  return (
    <Card className="border-atzaan-soft-purple">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-atzaan-purple">Session Participants</h2>
          <span className="px-3 py-1 bg-atzaan-soft-purple text-atzaan-purple text-sm rounded-full font-medium">
            {participants.length} People
          </span>
        </div>
        
        <div className="space-y-4">
          {participants.map((participant) => (
            <div 
              key={participant.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full bg-atzaan-soft-purple flex items-center justify-center ${participant.role === 'tutor' ? 'ring-2 ring-atzaan-purple' : ''}`}>
                  <User className="h-5 w-5 text-atzaan-purple" />
                </div>
                
                <div>
                  <p className="font-medium">{participant.name}</p>
                  <p className="text-sm text-gray-500">{participant.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span 
                  className={`w-2 h-2 rounded-full mr-2 ${
                    participant.status === 'online' 
                      ? 'bg-green-500' 
                      : participant.status === 'away' 
                        ? 'bg-yellow-500' 
                        : 'bg-gray-400'
                  }`}
                ></span>
                <span className="text-sm text-gray-600 capitalize">{participant.status}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <h3 className="font-medium text-gray-700 mb-2">About This Session</h3>
          <p className="text-sm text-gray-600">
            This is a live session with your AI tutor and fellow students. 
            The tutor can share course materials, assign work, and provide realtime feedback.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassroomParticipants;
