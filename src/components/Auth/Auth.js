import React, { useState } from 'react';
import '../../styles/Auth.css';

function Auth({ onLogin, onRegister, onPasswordRecovery }) {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors = {};
    if (!loginData.email) newErrors.loginEmail = 'Email is required';
    if (!loginData.password) newErrors.loginPassword = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onLogin(loginData);
  };
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors = {};
    if (!registerData.firstName) newErrors.firstName = 'First name is required';
    if (!registerData.lastName) newErrors.lastName = 'Last name is required';
    if (!registerData.email) newErrors.registerEmail = 'Email is required';
    if (!registerData.password) newErrors.registerPassword = 'Password is required';
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onRegister(registerData);
  };
  
  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors = {};
    if (!recoveryEmail) newErrors.recoveryEmail = 'Email is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onPasswordRecovery(recoveryEmail);
    // Show success message
    alert('Password recovery instructions have been sent to your email.');
    setActiveTab('login');
  };
  
  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button 
          className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button 
          className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>
      
      <div className="auth-content">
        {activeTab === 'login' && (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="loginEmail">Email</label>
              <input 
                type="email" 
                id="loginEmail"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              />
              {errors.loginEmail && <div className="error-message">{errors.loginEmail}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input 
                type="password" 
                id="loginPassword"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              />
              {errors.loginPassword && <div className="error-message">{errors.loginPassword}</div>}
            </div>
            
            <div className="form-actions">
              <button type="submit" className="primary-button">Login</button>
              <button 
                type="button" 
                className="text-button"
                onClick={() => setActiveTab('recovery')}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        )}
        
        {activeTab === 'register' && (
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName"
                  value={registerData.firstName}
                  onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName"
                  value={registerData.lastName}
                  onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="registerEmail">Email</label>
              <input 
                type="email" 
                id="registerEmail"
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              />
              {errors.registerEmail && <div className="error-message">{errors.registerEmail}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="registerPassword">Password</label>
              <input 
                type="password" 
                id="registerPassword"
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
              />
              {errors.registerPassword && <div className="error-message">{errors.registerPassword}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
              />
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>
            
            <div className="form-actions">
              <button type="submit" className="primary-button">Register</button>
            </div>
          </form>
        )}
        
        {activeTab === 'recovery' && (
          <form className="auth-form" onSubmit={handleRecoverySubmit}>
            <h2>Password Recovery</h2>
            <p>Enter your email address and we'll send you instructions to reset your password.</p>
            
            <div className="form-group">
              <label htmlFor="recoveryEmail">Email</label>
              <input 
                type="email" 
                id="recoveryEmail"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
              />
              {errors.recoveryEmail && <div className="error-message">{errors.recoveryEmail}</div>}
            </div>
            
            <div className="form-actions">
              <button type="submit" className="primary-button">Send Recovery Email</button>
              <button 
                type="button" 
                className="text-button"
                onClick={() => setActiveTab('login')}
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;
