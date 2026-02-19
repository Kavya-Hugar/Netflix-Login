// Mock authentication service for demo purposes when backend is not available
export const mockRegister = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate successful registration
  console.log('Mock registration:', userData);
  return {
    success: true,
    message: 'Registration successful! Please login.',
    user: {
      user_id: Math.floor(Math.random() * 1000),
      user_name: userData.user_name,
      email: userData.email
    }
  };
};

export const mockLogin = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate successful login
  console.log('Mock login:', credentials);
  return {
    success: true,
    message: 'Login successful',
    token: 'mock-jwt-token-' + Date.now(),
    user: {
      user_id: 1,
      user_name: credentials.user_name,
      email: 'demo@example.com'
    }
  };
};

export const mockVerifyToken = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    user: {
      user_id: 1,
      user_name: 'demo-user'
    }
  };
};
