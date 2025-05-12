
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return 'AT';
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const getUserTypeLabel = (userType?: string) => {
    if (!userType) return '';
    
    const typesMap: Record<string, string> = {
      'tutor': 'Tutor',
      'student': 'Student',
      'educator': 'Educator',
      'admin': 'Admin'
    };
    
    return typesMap[userType] || userType;
  };

  const getTypeBadgeColor = (userType?: string) => {
    if (!userType) return 'bg-gray-100 text-gray-800';
    
    const colorMap: Record<string, string> = {
      'tutor': 'bg-purple-100 text-purple-800 border-purple-300',
      'student': 'bg-blue-100 text-blue-800 border-blue-300',
      'educator': 'bg-green-100 text-green-800 border-green-300',
      'admin': 'bg-amber-100 text-amber-800 border-amber-300'
    };
    
    return colorMap[userType] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-atzaan-light-purple to-atzaan-purple mr-2"></div>
              <span className="text-xl font-serif font-semibold text-atzaan-purple">AtZaan AI Labs</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/#home" className="text-gray-700 hover:text-atzaan-purple px-3 py-2">Home</Link>
            <Link to="/#programs" className="text-gray-700 hover:text-atzaan-purple px-3 py-2">Programs</Link>
            <Link to="/#about" className="text-gray-700 hover:text-atzaan-purple px-3 py-2">About</Link>
            <Link to="/#testimonials" className="text-gray-700 hover:text-atzaan-purple px-3 py-2">Testimonials</Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-2 relative">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-atzaan-soft-purple text-atzaan-purple">
                        {profile ? getInitials(profile.first_name, profile.last_name) : 'AT'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block">
                      {profile ? `${profile.first_name} ${profile.last_name}` : 'Account'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{profile ? `${profile.first_name} ${profile.last_name}` : 'User'}</span>
                      <span className="text-xs text-muted-foreground">{profile?.email}</span>
                      {profile && (
                        <Badge variant="outline" className={`mt-1 self-start ${getTypeBadgeColor(profile.user_type)}`}>
                          {getUserTypeLabel(profile.user_type)}
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-600 focus:text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="bg-atzaan-purple hover:bg-atzaan-purple/90">
                <Link to="/auth">Login / Register</Link>
              </Button>
            )}
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
          <Link
            to="/#home"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-atzaan-purple hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/#programs"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-atzaan-purple hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Programs
          </Link>
          <Link
            to="/#about"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-atzaan-purple hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/#testimonials"
            className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-atzaan-purple hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </Link>
          
          {user ? (
            <div className="px-3 py-4">
              <div className="flex items-center mb-4">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarFallback className="bg-atzaan-soft-purple text-atzaan-purple">
                    {profile ? getInitials(profile.first_name, profile.last_name) : 'AT'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{profile ? `${profile.first_name} ${profile.last_name}` : 'User'}</div>
                  <div className="text-sm text-gray-500">{profile?.email}</div>
                </div>
              </div>
              
              {profile && (
                <Badge variant="outline" className={`mb-4 ${getTypeBadgeColor(profile.user_type)}`}>
                  {getUserTypeLabel(profile.user_type)}
                </Badge>
              )}
              
              <Link
                to="/profile"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-atzaan-purple hover:bg-gray-50 rounded-md mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="inline-block h-5 w-5 mr-2 -mt-1" />
                My Profile
              </Link>
              
              <Button 
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }} 
                variant="outline" 
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          ) : (
            <div className="px-3 py-4">
              <Button 
                asChild 
                className="w-full bg-atzaan-purple hover:bg-atzaan-purple/90"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/auth">Login / Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
