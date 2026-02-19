import React, { useState } from 'react';
import './AuthLanding.css';

const AuthLanding = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    phone_number: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Try to use real API first, fallback to mock for demo
      let response;
      
      if (isLogin) {
        try {
          const { login } = await import('../services/authService');
          response = await login({
            user_name: formData.user_name,
            password: formData.password
          });
        } catch (apiError) {
          console.log('API not available, using mock for demo');
          const { mockLogin } = await import('../services/mockAuth');
          response = await mockLogin({
            user_name: formData.user_name,
            password: formData.password
          });
        }
        
        if (response.success) {
          const { setAuthData } = await import('../services/authService');
          setAuthData(response.token, response.user);
          window.location.href = '/home';
        } else {
          setMessage(response.message || 'Login failed');
        }
      } else {
        try {
          const { register } = await import('../services/authService');
          response = await register(formData);
        } catch (apiError) {
          console.log('API not available, using mock for demo');
          const { mockRegister } = await import('../services/mockAuth');
          response = await mockRegister(formData);
        }
        
        if (response.success) {
          setMessage('Registration successful! Please login.');
          setIsLogin(true);
          setFormData({ user_name: '', email: '', phone_number: '', password: '' });
        } else {
          setMessage(response.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setMessage(error.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-landing">
      <div className="background-container">
        <div className="background-overlay"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="content-container">
        <div className="left-content">
          <div className="brand-section">
            <h1 className="brand-title">NETFLIX</h1>
            <h2 className="tagline">Stream Your Dreams</h2>
            <p className="description">
              Experience the magic of cinema with our vast collection of movies and shows. 
              From blockbuster hits to hidden gems, your next favorite story awaits.
            </p>
            <div className="features">
              <div className="feature">
                <span className="feature-icon">🎬</span>
                <span>Unlimited Movies</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📱</span>
                <span>Watch Anywhere</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🌟</span>
                <span>Exclusive Content</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-content">
          <div className="auth-container">
            <div className="auth-header">
              <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p>
                {isLogin 
                  ? 'Enter your credentials to access your account' 
                  : 'Join us and start your streaming journey'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="glass-input"
                  />
                </div>
              )}

              {!isLogin && (
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone_number"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="glass-input"
                  />
                </div>
              )}

              <div className="form-group">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Username"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  required
                  className="glass-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="glass-input"
                />
              </div>

              <button 
                type="submit" 
                className="auth-button"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>

              {message && (
                <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
            </form>

            <div className="auth-footer">
              <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  type="button"
                  className="toggle-button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setMessage('');
                    setFormData({ user_name: '', email: '', phone_number: '', password: '' });
                  }}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="social-login">
              <button className="social-button google">
                <span className="social-icon">G</span>
                Continue with Google
              </button>
              <button className="social-button facebook">
                <span className="social-icon">f</span>
                Continue with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLanding;
