import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken, isAuthenticated } from '../services/authService';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated()) {
          setAuthenticated(false);
          setLoading(false);
          return;
        }

        try {
          const response = await verifyToken();
          setAuthenticated(response.success);
        } catch (error) {
          console.log('Token verification failed, checking mock...');
          
          // Fallback to mock verification for demo
          try {
            const { mockVerifyToken } = await import('../services/mockAuth');
            const mockResponse = await mockVerifyToken();
            setAuthenticated(mockResponse.success);
          } catch (mockError) {
            console.error('Mock verification also failed:', mockError);
            setAuthenticated(false);
          }
        }
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return authenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
