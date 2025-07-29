import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useAuth();
  
  // If user is not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Otherwise, render the protected route
  return children;
}

export default ProtectedRoute;