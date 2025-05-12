
import React from 'react';
import { Button } from "@/components/ui/button";
import { Code, Brain, Book } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold font-serif text-atzaan-dark-purple mb-6 leading-tight">
              Master AI with <span className="text-atzaan-purple">Expert</span> Guidance
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              AtZaan AI Labs provides specialized tutoring for individuals, students, and educators
              to harness the power of artificial intelligence in today's rapidly evolving digital landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-atzaan-purple hover:bg-atzaan-purple/90">
                <a href="#register">Get Started</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-atzaan-purple text-atzaan-purple hover:bg-atzaan-purple/10">
                <a href="#programs">Explore Programs</a>
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-atzaan-soft-purple flex items-center justify-center mr-2">
                  <Code size={20} className="text-atzaan-purple" />
                </div>
                <span className="text-sm font-medium">Practical Skills</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-atzaan-soft-purple flex items-center justify-center mr-2">
                  <Brain size={20} className="text-atzaan-purple" />
                </div>
                <span className="text-sm font-medium">Expert Knowledge</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-atzaan-soft-purple flex items-center justify-center mr-2">
                  <Book size={20} className="text-atzaan-purple" />
                </div>
                <span className="text-sm font-medium">Custom Curriculum</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-atzaan-light-purple to-atzaan-purple flex items-center justify-center">
                <div className="text-white text-opacity-20 text-9xl font-bold">AI</div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">AI Learning Journey</h3>
                  <p className="text-sm text-white/80">Personalized tutoring for all levels</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-lg bg-atzaan-soft-purple animate-pulse-soft hidden md:block"></div>
            <div className="absolute -top-4 -left-4 h-16 w-16 rounded-lg bg-atzaan-soft-purple animate-pulse-soft hidden md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
