import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Users, GraduationCap, Code, Brain, Globe, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProgramsSection = () => {
  const programs = [
    {
      title: "Individual AI Mastery",
      description: "One-on-one personalized tutoring sessions tailored to your specific AI learning goals.",
      icon: User,
      audience: "Private Individuals",
      features: ["Personalized learning path", "Flexible scheduling", "Direct feedback", "Real-world projects"],
      pricing: "R120 per session",
      popular: true,
      availability: "Available online and in-person"
    },
    {
      title: "Student AI Foundations",
      description: "Help students understand AI fundamentals and apply them in academic work.",
      icon: GraduationCap,
      audience: "School Learners",
      features: ["Curriculum-aligned content", "Exam preparation", "Project assistance", "Academic applications"],
      pricing: "R120 per session",
      popular: false,
      availability: "Available online and in-person"
    },
    {
      title: "Educator AI Integration",
      description: "Empower educators to integrate AI tools and concepts into their teaching practices.",
      icon: Users,
      audience: "Educators",
      features: ["Classroom integration", "Assessment strategies", "Student engagement", "Ethical considerations"],
      pricing: "Private: R170 per educator OR R550 for groups of 4+\nGroups of 10-29: R1500 per session\nGroups of 30: R4000 per session (maximum capacity)",
      popular: false,
      availability: "Available online and in-person"
    }
  ];

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">Our AI Tutoring Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized programs designed for different learning needs and goals with AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className={`overflow-hidden transition-all ${program.popular ? 'border-atzaan-purple shadow-lg relative' : 'hover:shadow-md'}`}>
              {program.popular && (
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-atzaan-soft-purple text-atzaan-purple font-medium">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="h-12 w-12 rounded-lg bg-atzaan-soft-purple flex items-center justify-center mb-4">
                  <program.icon size={24} className="text-atzaan-purple" />
                </div>
                <CardTitle className="text-2xl font-semibold">{program.title}</CardTitle>
                <CardDescription className="text-base text-atzaan-purple">
                  For {program.audience}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <div className="space-y-3 mb-4">
                  {program.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-atzaan-soft-purple flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-atzaan-purple"></div>
                      </div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Clock size={16} className="text-atzaan-purple mr-2" />
                    <span className="text-sm font-medium">Available as:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="bg-gray-50">Full-time (12 months)</Badge>
                    <Badge variant="outline" className="bg-gray-50">Part-time sessions</Badge>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <Globe size={16} className="text-atzaan-purple mr-2" />
                    <span className="text-sm font-medium">Format:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="bg-gray-50">In-person</Badge>
                    <Badge variant="outline" className="bg-gray-50">Online</Badge>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-md p-3 mb-6">
                  <p className="text-sm font-medium text-atzaan-purple">Pricing</p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{program.pricing}</p>
                </div>
                
                <Button 
                  asChild 
                  className={`w-full ${program.popular ? 'bg-atzaan-purple hover:bg-atzaan-purple/90' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                >
                  <a href="#register">Enroll Now</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-atzaan-soft-purple to-atzaan-soft-purple/30 rounded-2xl overflow-hidden">
          <div className="py-10 px-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl md:text-3xl font-semibold font-serif text-atzaan-purple mb-4">
                Custom Group Programs
              </h3>
              <p className="text-gray-700">
                Need specialized AI education for your team, school, or organization? We create customized tutoring programs to match your specific requirements and goals.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Button asChild className="bg-atzaan-purple hover:bg-atzaan-purple/90 px-8" size="lg">
                <a href="#register">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="flex justify-center gap-4 flex-wrap mb-3">
            <Badge className="bg-atzaan-soft-purple text-atzaan-purple">Full-time Students</Badge>
            <Badge className="bg-atzaan-soft-purple text-atzaan-purple">Part-time Options</Badge>
            <Badge className="bg-atzaan-soft-purple text-atzaan-purple">In-person Classes</Badge>
            <Badge className="bg-atzaan-soft-purple text-atzaan-purple">Online Learning</Badge>
          </div>
          <p className="text-lg text-gray-700">Flexible learning options to suit your schedule and preferences</p>
          <p className="text-sm text-gray-500 mt-2">No prior experience needed. We provide step-by-step, easy-to-follow training.</p>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
