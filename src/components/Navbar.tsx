
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-atzaan-light-purple to-atzaan-purple mr-2"></div>
            <span className="text-xl font-serif font-semibold text-atzaan-purple">AtZaan AI Labs</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#home" className="text-gray-700 hover:text-atzaan-purple px-3 py-2">Home</a>
            <a href="#programs" className="text-gray-700 hover:text-atzaan-purple px-3 py-2">Programs</a>
            <a href="#about" className="text-gray-700 hover:text-atzaan-purple px-3 py-2">About</a>
            <a href="#testimonials" className="text-gray-700 hover:text-atzaan-purple px-3 py-2">Testimonials</a>
            <Button asChild className="bg-atzaan-purple hover:bg-atzaan-purple/90">
              <a href="#register">Register</a>
            </Button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:text-atzaan-purple hover:bg-gray-100"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-16 bg-white z-40 transform transition-transform ease-in-out duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#home"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-atzaan-purple hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#programs"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-atzaan-purple hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Programs
          </a>
          <a
            href="#about"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-atzaan-purple hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#testimonials"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-atzaan-purple hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </a>
          <div className="px-3 py-4">
            <Button asChild className="w-full bg-atzaan-purple hover:bg-atzaan-purple/90">
              <a href="#register" onClick={() => setIsMenuOpen(false)}>Register Now</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
