
import React from 'react';
import { Book, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-atzaan-dark-purple text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-atzaan-light-purple to-atzaan-purple mr-3"></div>
              <span className="text-xl font-serif font-semibold">AtZaan AI Labs</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Specialized AI tutoring services for individuals, students, and educators. 
              Master artificial intelligence with personalized guidance and practical applications.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-atzaan-purple transition-colors">
                <i className="fab fa-twitter text-white"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-atzaan-purple transition-colors">
                <i className="fab fa-linkedin-in text-white"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-atzaan-purple transition-colors">
                <i className="fab fa-instagram text-white"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#programs" className="text-gray-300 hover:text-white">Programs</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-white">Testimonials</a></li>
              <li><a href="#register" className="text-gray-300 hover:text-white">Register</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-atzaan-light-purple" />
                <span className="text-gray-300">info@atzaanailabs.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-atzaan-light-purple" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Book size={18} className="mr-3 text-atzaan-light-purple" />
                <span className="text-gray-300">Book a free consultation</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8 text-center sm:text-left sm:flex sm:justify-between sm:items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} AtZaan AI Labs. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <ul className="flex justify-center sm:justify-start space-x-6 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
