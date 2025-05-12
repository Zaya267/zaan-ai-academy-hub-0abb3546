
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "University Student",
      image: null,
      initials: "SJ",
      text: "AtZaan AI Labs helped me understand complex AI concepts that I was struggling with in my computer science courses. The personalized tutoring was exactly what I needed to excel in my studies.",
    },
    {
      name: "Michael Chen",
      role: "High School Teacher",
      image: null,
      initials: "MC",
      text: "As an educator, I needed to bring AI literacy into my classroom. The specialized educator program at AtZaan gave me the confidence and skills to incorporate AI concepts into my curriculum.",
    },
    {
      name: "Emma Williams",
      role: "Marketing Professional",
      image: null,
      initials: "EW",
      text: "I wanted to leverage AI tools for my marketing campaigns but didn't know where to start. The individual program helped me learn practical applications that boosted my productivity tremendously.",
    },
    {
      name: "David Rodriguez",
      role: "Parent",
      image: null,
      initials: "DR",
      text: "I enrolled my teenager in AtZaan's student program to help them prepare for the future. The tutor made complex AI concepts accessible and engaging - my child is now creating their own AI projects!",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">What Our Students Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Success stories from individuals who've enhanced their AI knowledge through our tutoring programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonial-card overflow-hidden border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-atzaan-purple/20">
                      <path d="M13.4 36C9.86667 36 6.9 34.8667 4.5 32.6C1.5 29.8 0 26.2667 0 22C0 18.4 0.966667 14.8667 2.9 11.4C4.83333 7.93333 7.36667 4.86667 10.5 2.2L19.4 8.4C16.3333 11.0667 14.3333 13.8 13.4 16.6C14.0667 16.2 15 16 16.2 16C18.6 16 20.6667 16.8 22.4 18.4C24.1333 20 25 22.2 25 25C25 28.0667 24 30.6 22 32.6C20 34.8667 17.2 36 13.4 36ZM33.4 36C29.8667 36 26.9 34.8667 24.5 32.6C21.5 29.8 20 26.2667 20 22C20 18.4 20.9667 14.8667 22.9 11.4C24.8333 7.93333 27.3667 4.86667 30.5 2.2L39.4 8.4C36.3333 11.0667 34.3333 13.8 33.4 16.6C34.0667 16.2 35 16 36.2 16C38.6 16 40.6667 16.8 42.4 18.4C44.1333 20 45 22.2 45 25C45 28.0667 44 30.6 42 32.6C40 34.8667 37.2 36 33.4 36Z" fill="currentColor"/>
                    </svg>
                  </div>
                  
                  <p className="text-gray-700 flex-grow mb-6">{testimonial.text}</p>
                  
                  <div className="flex items-center mt-auto">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-atzaan-purple text-white">{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center text-atzaan-purple font-medium">
            <div className="flex -space-x-2 mr-3">
              {[...Array(4)].map((_, i) => (
                <Avatar key={i} className="border-2 border-white h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-atzaan-light-purple to-atzaan-purple text-xs text-white">
                    {i + 1}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span>Join over 200+ satisfied learners</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
