
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { User, Send } from 'lucide-react';

const ClassroomChat = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Dr. Ahmed Khan', role: 'tutor', content: 'Welcome to today\'s session on AI applications! Feel free to ask questions as we go.', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: 2, sender: 'John Smith', role: 'student', content: 'I\'m excited to learn more about neural networks today!', timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString() },
    { id: 3, sender: 'Dr. Ahmed Khan', role: 'tutor', content: 'Great! We\'ll be covering that in the second half of our session. I\'ll share some diagrams shortly.', timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString() },
    { id: 4, sender: 'Emma Johnson', role: 'student', content: 'Is there recommended reading for next week\'s topic?', timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
    { id: 5, sender: 'Dr. Ahmed Khan', role: 'tutor', content: 'Yes, I\'ve just uploaded the reading materials to the Resources tab. Please check them out before our next session.', timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString() },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: user?.email?.split('@')[0] || 'You',
      role: 'student',
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate tutor response after a brief delay
    if (messages.length % 3 === 0) {
      setTimeout(() => {
        const tutorResponse = {
          id: messages.length + 2,
          sender: 'Dr. Ahmed Khan',
          role: 'tutor',
          content: 'Great question! Let me clarify that for everyone.',
          timestamp: new Date().toISOString(),
        };
        setMessages(prevMessages => [...prevMessages, tutorResponse]);
      }, 3000);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="border-atzaan-soft-purple">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-atzaan-purple mb-4">Class Chat</h2>
        
        <div className="border rounded-lg bg-gray-50 h-[400px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'tutor' ? 'bg-atzaan-soft-purple/20 p-3 rounded-lg' : ''}`}
              >
                <div className={`h-8 w-8 rounded-full flex-shrink-0 ${msg.role === 'tutor' ? 'bg-atzaan-purple' : 'bg-atzaan-soft-purple'} flex items-center justify-center`}>
                  <User className={`h-4 w-4 ${msg.role === 'tutor' ? 'text-white' : 'text-atzaan-purple'}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${msg.role === 'tutor' ? 'text-atzaan-purple' : 'text-gray-800'}`}>
                      {msg.sender}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form 
            onSubmit={handleSendMessage}
            className="border-t p-3 flex gap-2"
          >
            <Textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[44px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
            <Button 
              type="submit"
              size="icon"
              className="h-[44px] w-[44px] bg-atzaan-purple hover:bg-atzaan-purple/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          This chat is visible to all participants in the session. For private questions, please message your tutor directly.
        </p>
      </CardContent>
    </Card>
  );
};

export default ClassroomChat;
