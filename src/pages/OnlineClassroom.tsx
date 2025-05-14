
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClassroomVideoCall from '@/components/ClassroomVideoCall';
import ClassroomResources from '@/components/ClassroomResources';
import ClassroomAssignments from '@/components/ClassroomAssignments';
import ClassroomParticipants from '@/components/ClassroomParticipants';
import ClassroomChat from '@/components/ClassroomChat';
import ClassroomAITools from '@/components/ClassroomAITools';
import ClassroomCommunity from '@/components/ClassroomCommunity';

const OnlineClassroom = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('video');
  
  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft text-center">
          <div className="mx-auto h-12 w-12 rounded-md bg-gradient-to-br from-atzaan-light-purple to-atzaan-purple mb-4"></div>
          <p className="text-atzaan-purple">Loading classroom...</p>
        </div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth?redirect=online-classroom" />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-atzaan-purple">Online Classroom</h1>
          <p className="text-gray-600">Interactive learning environment for AtZaan AI Labs</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-7 mb-8">
            <TabsTrigger value="video">Video Call</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value="video" className="mt-0">
            <ClassroomVideoCall />
          </TabsContent>
          
          <TabsContent value="resources" className="mt-0">
            <ClassroomResources />
          </TabsContent>
          
          <TabsContent value="assignments" className="mt-0">
            <ClassroomAssignments />
          </TabsContent>
          
          <TabsContent value="participants" className="mt-0">
            <ClassroomParticipants />
          </TabsContent>
          
          <TabsContent value="chat" className="mt-0">
            <ClassroomChat />
          </TabsContent>

          <TabsContent value="ai-tools" className="mt-0">
            <ClassroomAITools />
          </TabsContent>
          
          <TabsContent value="community" className="mt-0">
            <ClassroomCommunity />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default OnlineClassroom;
