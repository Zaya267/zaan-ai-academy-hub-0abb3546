
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: ('tutor' | 'student' | 'educator' | 'admin')[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { user, profile, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft text-center">
          <div className="mx-auto h-12 w-12 rounded-md bg-gradient-to-br from-atzaan-light-purple to-atzaan-purple mb-4"></div>
          <p className="text-atzaan-purple">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // If role restrictions exist and user doesn't have required role
  if (allowedRoles.length > 0 && profile && !allowedRoles.includes(profile.user_type)) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has required role (if specified)
  return <>{children}</>;
};

export default ProtectedRoute;
