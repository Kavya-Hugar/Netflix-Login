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

        const response = await verifyToken();
        setAuthenticated(response.success);
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
