
import React, { useState } from 'react';
import { Search, Filter, Download, Share2, Star, Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type AITool = {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  rating: number;
  imageUrl: string;
  addedBy: string;
  dateAdded: string;
};

// Sample AI tools data
const sampleAITools: AITool[] = [
  {
    id: '1',
    name: 'ChatGPT Classroom Assistant',
    description: 'AI assistant to help with classroom management and student questions.',
    category: 'Teaching Assistant',
    tags: ['assistant', 'chatbot', 'classroom helper'],
    rating: 4.8,
    imageUrl: 'https://placehold.co/600x400?text=ChatGPT',
    addedBy: 'Admin',
    dateAdded: '2025-01-15'
  },
  {
    id: '2',
    name: 'Essay Grader AI',
    description: 'Automatically evaluate and provide feedback on student essays.',
    category: 'Assessment',
    tags: ['grading', 'feedback', 'essays'],
    rating: 4.5,
    imageUrl: 'https://placehold.co/600x400?text=Essay+AI',
    addedBy: 'Teacher',
    dateAdded: '2025-02-10'
  },
  {
    id: '3',
    name: 'Concept Map Generator',
    description: 'Create visual concept maps from lesson content to help students understand relationships.',
    category: 'Content Creation',
    tags: ['visualization', 'concept maps', 'learning aid'],
    rating: 4.3,
    imageUrl: 'https://placehold.co/600x400?text=Map+Generator',
    addedBy: 'Admin',
    dateAdded: '2025-02-22'
  },
  {
    id: '4',
    name: 'Quiz Builder',
    description: 'Generate quizzes from lesson content with customizable difficulty.',
    category: 'Assessment',
    tags: ['quiz', 'assessment', 'generator'],
    rating: 4.7,
    imageUrl: 'https://placehold.co/600x400?text=Quiz+Builder',
    addedBy: 'Teacher',
    dateAdded: '2025-03-01'
  },
];

// Available categories for filtering
const categories = [
  'All Categories',
  'Teaching Assistant',
  'Assessment',
  'Content Creation',
  'Lesson Planning',
  'Student Engagement'
];

const ClassroomAITools = () => {
  const { profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [aiTools, setAiTools] = useState<AITool[]>(sampleAITools);

  // Check if user is admin or teacher
  const isAuthorized = profile?.user_type === 'admin' || profile?.user_type === 'educator';

  // Filter tools based on search and category
  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Add a new AI tool (in a real app, this would connect to a database)
  const addNewTool = () => {
    // This would open a form to add a new tool
    console.log('Add new tool clicked');
  };

  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center h-[500px] bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center p-8">
          <h3 className="text-xl font-bold mb-2">Restricted Access</h3>
          <p className="text-gray-600">
            The AI Tools Repository is only available for educators and administrators.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-atzaan-purple">AI Tools Repository</h2>
        <p className="text-gray-600">
          Browse and utilize AI tools designed to enhance your teaching experience.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for AI tools..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {selectedCategory}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {categories.map(category => (
              <DropdownMenuItem 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-atzaan-soft-purple text-atzaan-purple" : ""}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {isAuthorized && (
          <Button onClick={addNewTool} className="bg-atzaan-purple hover:bg-atzaan-purple/90">
            <Plus className="h-4 w-4 mr-2" /> Add Tool
          </Button>
        )}
      </div>

      {filteredTools.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No AI tools found matching your search criteria.</p>
        </div>
      ) : (
        <ScrollArea className="h-[600px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img 
                    src={tool.imageUrl} 
                    alt={tool.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, index) => (
                      <Star 
                        key={index} 
                        className="h-4 w-4 fill-current" 
                        fill={index < Math.floor(tool.rating) ? "currentColor" : "none"} 
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">{tool.rating}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tool.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs bg-atzaan-soft-purple text-atzaan-purple border-atzaan-purple/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> Use
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" /> Share
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ClassroomAITools;
