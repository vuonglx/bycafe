import React, { useState } from 'react';
import '../../styles/GuestCheckout.css';

function GuestCheckout({ onGuestLogin }) {
  const [email, setEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  
  const handleGuestContinue = (e) => {
    e.preventDefault();
    if (email) {
      onGuestLogin(email);
    }
  };
  
  return (
    <div className="guest-checkout">
      <div className="checkout-options">
        <div className="option-tabs">
          <button 
            className={`option-tab ${!showLogin ? 'active' : ''}`}
            onClick={() => setShowLogin(false)}
          >
            Guest Checkout
          </button>
          <button 
            className={`option-tab ${showLogin ? 'active' : ''}`}
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </div>
        
        <div className="option-content">
          {showLogin ? (
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="loginEmail">Email</label>
                <input type="email" id="loginEmail" required />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input type="password" id="loginPassword" required />
              </div>
              <button type="submit" className="login-button">Login</button>
              <div className="forgot-password">
                <a href="#">Forgot Password?</a>
              </div>
            </form>
          ) : (
            <form className="guest-form" onSubmit={handleGuestContinue}>
              <p className="guest-message">
                Continue as a guest to checkout without creating an account. You'll have the option to create an account later.
              </p>
              <div className="form-group">
                <label htmlFor="guestEmail">Email Address</label>
                <input 
                  type="email" 
                  id="guestEmail" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required 
                />
              </div>
              <button type="submit" className="guest-button">Continue as Guest</button>
            </form>
          )}
        </div>
      </div>
      
      <div className="create-account-prompt">
        <p>Don't have an account?</p>
        <a href="/account/register">Create an Account</a>
      </div>
    </div>
  );
}

export default GuestCheckout;
