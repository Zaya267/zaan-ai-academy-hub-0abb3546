
import React, { useState } from 'react';
import { Search, MessageSquare, Users, Heart, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

type ForumPost = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  likes: number;
  comments: number;
  tags: string[];
};

type GroupInfo = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  topics: string[];
};

const samplePosts: ForumPost[] = [
  {
    id: '1',
    title: 'How to integrate AI in primary education?',
    content: 'I\'ve been thinking about introducing AI concepts to my 5th grade class. What are some age-appropriate activities?',
    author: {
      name: 'Sarah Johnson',
      avatar: 'SJ',
      role: 'Teacher'
    },
    date: '2 hours ago',
    likes: 15,
    comments: 8,
    tags: ['primary education', 'AI introduction', 'teaching methods']
  },
  {
    id: '2',
    title: 'Recommended AI tools for mathematics?',
    content: 'I\'m looking for AI tools that can help my students practice and visualize mathematical concepts. Any recommendations?',
    author: {
      name: 'David Smith',
      avatar: 'DS',
      role: 'Educator'
    },
    date: '1 day ago',
    likes: 24,
    comments: 12,
    tags: ['mathematics', 'AI tools', 'visualization']
  },
  {
    id: '3',
    title: 'Ethics of AI in the classroom - discussion',
    content: 'As we integrate more AI tools into our teaching, we need to consider the ethical implications. Let\'s discuss potential concerns and how to address them.',
    author: {
      name: 'Elena Rodriguez',
      avatar: 'ER',
      role: 'Administrator'
    },
    date: '3 days ago',
    likes: 32,
    comments: 17,
    tags: ['ethics', 'AI education', 'classroom policy']
  },
];

const sampleGroups: GroupInfo[] = [
  {
    id: '1',
    name: 'AI in STEM Education',
    description: 'Discussing ways to incorporate AI tools in STEM subjects',
    memberCount: 156,
    topics: ['robotics', 'coding', 'data science']
  },
  {
    id: '2',
    name: 'Language Arts & AI',
    description: 'Creative writing, reading comprehension, and language learning with AI',
    memberCount: 92,
    topics: ['writing', 'comprehension', 'language']
  },
  {
    id: '3',
    name: 'Education Technology Adoption',
    description: 'Strategies for successful implementation of technology in schools',
    memberCount: 203,
    topics: ['implementation', 'training', 'assessment']
  },
];

const ClassroomCommunity = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('forum');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  // Filter posts based on search
  const filteredPosts = samplePosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filter groups based on search
  const filteredGroups = sampleGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle creating a new post
  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    
    console.log('Creating new post:', newPostContent);
    // In a real app, this would send the post to a database
    setNewPostContent('');
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-atzaan-purple">Educator Community</h2>
        <p className="text-gray-600">
          Connect with fellow educators, share ideas, and learn from each other.
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search community posts and groups..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="forum" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="forum" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Forum Discussions
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Community Groups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="mt-0">
          {profile && (
            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-atzaan-soft-purple text-atzaan-purple">
                    {profile ? getInitials(`${profile.first_name} ${profile.last_name}`) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{`${profile.first_name} ${profile.last_name}`}</div>
                  <div className="text-xs text-gray-500">{profile.user_type}</div>
                </div>
              </div>
              <Textarea
                placeholder="Share your thoughts or questions with the community..."
                className="min-h-[120px] mb-3"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleCreatePost}
                  className="bg-atzaan-purple hover:bg-atzaan-purple/90"
                  disabled={!newPostContent.trim()}
                >
                  Post to Community
                </Button>
              </div>
            </div>
          )}

          <ScrollArea className="h-[500px] pr-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No forum posts found matching your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback className="bg-atzaan-soft-purple text-atzaan-purple">
                            {post.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{post.author.name}</div>
                          <div className="text-xs text-gray-500">{post.author.role} • {post.date}</div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-700 mb-3">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs bg-gray-100 text-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="flex items-center text-gray-600">
                        <Heart className="h-4 w-4 mr-1" /> {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center text-gray-600">
                        <MessageCircle className="h-4 w-4 mr-1" /> {post.comments}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="groups" className="mt-0">
          <ScrollArea className="h-[600px] pr-4">
            {filteredGroups.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No community groups found matching your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGroups.map((group) => (
                  <div key={group.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-atzaan-purple/30 transition-colors">
                    <h3 className="font-bold text-lg mb-1">{group.name}</h3>
                    <p className="text-gray-700 mb-3 text-sm">{group.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Users className="h-4 w-4 mr-1" /> 
                      <span>{group.memberCount} members</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {group.topics.map(topic => (
                        <Badge key={topic} variant="outline" className="text-xs bg-atzaan-soft-purple text-atzaan-purple">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-atzaan-purple hover:bg-atzaan-purple/90"
                      size="sm"
                    >
                      <User className="h-4 w-4 mr-1" /> Join Group
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassroomCommunity;
