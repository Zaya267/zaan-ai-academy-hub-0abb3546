
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Book, Download, Upload } from 'lucide-react';

const ClassroomResources = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  
  // Example resource data - in a real app, this would come from a database
  const resources = [
    {
      id: 1,
      name: 'Introduction to AI Prompting',
      type: 'pdf',
      size: '2.4 MB',
      date: '2025-05-01',
    },
    {
      id: 2,
      name: 'AI Tools Comparison Chart',
      type: 'xlsx',
      size: '1.1 MB',
      date: '2025-04-28',
    },
    {
      id: 3,
      name: 'Data Science Fundamentals',
      type: 'pdf',
      size: '4.7 MB',
      date: '2025-04-15',
    },
    {
      id: 4,
      name: 'Getting Started with ChatGPT',
      type: 'docx',
      size: '3.2 MB',
      date: '2025-04-10',
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "File Uploaded",
        description: `${files[0].name} has been uploaded successfully.`,
      });
      
      // Clear the input
      event.target.value = '';
    }, 1500);
  };

  const handleDownload = (resourceName: string) => {
    toast({
      title: "Download Started",
      description: `${resourceName} is being downloaded.`,
    });
  };

  return (
    <Card className="border-atzaan-soft-purple">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-atzaan-purple">Learning Resources</h2>
          
          <div className="flex items-center gap-2">
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Label htmlFor="file-upload">
              <Button 
                variant="outline" 
                className="cursor-pointer flex gap-2"
                disabled={uploading}
              >
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading..." : "Upload Resource"}
              </Button>
            </Label>
          </div>
        </div>
        
        <div className="rounded-md border">
          <div className="grid grid-cols-5 p-3 bg-gray-50 text-sm font-medium text-gray-500 border-b">
            <div className="col-span-2">Name</div>
            <div>Type</div>
            <div>Size</div>
            <div>Actions</div>
          </div>
          
          <div className="divide-y">
            {resources.map((resource) => (
              <div key={resource.id} className="grid grid-cols-5 p-4 items-center text-sm">
                <div className="col-span-2 flex items-center gap-3">
                  <Book className="h-6 w-6 text-atzaan-purple" />
                  <span className="font-medium">{resource.name}</span>
                </div>
                <div className="uppercase">{resource.type}</div>
                <div>{resource.size}</div>
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(resource.name)}
                    className="text-atzaan-purple hover:text-atzaan-purple/90 flex gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          These resources are provided to supplement your online AI tutoring sessions.
          Feel free to download them for your personal learning needs.
        </p>
      </CardContent>
    </Card>
  );
};

export default ClassroomResources;
