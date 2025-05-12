
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Code, Search } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">About AtZaan AI Labs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated to demystifying AI technology through expert tutoring and personalized guidance
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-atzaan-purple/80 to-atzaan-dark-purple flex items-center justify-center">
                <div className="w-3/5 h-3/5 rounded-full border-4 border-white/30 flex items-center justify-center">
                  <Brain size={80} className="text-white" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-lg bg-atzaan-soft-purple"></div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-atzaan-purple mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-6">
              At AtZaan AI Labs, we believe that artificial intelligence should be accessible to everyone. 
              Our mission is to empower individuals, students, and educators with the knowledge and skills 
              to harness AI technologies effectively, ethically, and creatively in their work and lives.
            </p>
            
            <h3 className="text-2xl font-semibold text-atzaan-purple mb-4">Our Approach</h3>
            <p className="text-gray-700 mb-6">
              We take a hands-on, personalized approach to teaching AI concepts. Rather than focusing solely 
              on theory, we help our students apply AI tools to real-world problems, developing practical 
              skills that can be immediately applied in their work or studies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-atzaan-soft-purple flex items-center justify-center mr-3 mt-1">
                  <Brain size={20} className="text-atzaan-purple" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Expertise</h4>
                  <p className="text-sm text-gray-600">Deep knowledge of AI systems and applications</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-atzaan-soft-purple flex items-center justify-center mr-3 mt-1">
                  <Code size={20} className="text-atzaan-purple" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Practical</h4>
                  <p className="text-sm text-gray-600">Focus on applicable skills and real use cases</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h3 className="text-2xl font-semibold text-center text-atzaan-purple mb-8">What We Teach</h3>
          
          <Tabs defaultValue="basics" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="basics">AI Basics</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Topics</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="basics" className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-medium mb-4">Foundations of AI</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Understanding machine learning concepts</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Types of AI systems and their capabilities</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Introduction to neural networks</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>History and evolution of AI technology</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-4">AI Tools for Beginners</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Working with ChatGPT effectively</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Using AI for content creation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>AI-powered research tools</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Prompt engineering basics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="applications" className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-medium mb-4">Educational Applications</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>AI in curriculum development</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Student assessment with AI tools</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Personalized learning systems</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>AI research assistance</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-4">Professional Applications</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>AI for productivity and workflow enhancement</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Data analysis with AI tools</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Creative applications (writing, design, coding)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Customer service and communication tools</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-medium mb-4">Advanced AI Skills</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Building custom AI solutions</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Fine-tuning models for specific needs</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Advanced prompt engineering</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>AI system integration</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-4">Ethical Considerations</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>AI ethics and responsible usage</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Bias in AI systems</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Privacy considerations</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-atzaan-purple rounded-full mr-3"></div>
                      <span>Future of AI and societal impact</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
