import React, { useState } from 'react';
import Auth from '../components/Auth/Auth';
import ProfileManagement from '../components/ProfileManagement/ProfileManagement';
import OrderHistory from '../components/OrderHistory/OrderHistory';
import Wishlist from '../components/Wishlist/Wishlist';
import '../styles/UserAccountPage.css';

function UserAccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const userData = {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    addresses: [
      {
        id: '1',
        type: 'Home',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        country: 'US',
        isDefault: true
      },
      {
        id: '2',
        type: 'Work',
        street: '456 Office Blvd',
        city: 'Workville',
        state: 'CA',
        zipCode: '67890',
        country: 'US',
        isDefault: false
      }
    ],
    paymentMethods: [
      {
        id: '1',
        type: 'Credit Card',
        cardNumber: '**** **** **** 1234',
        expiryDate: '12/26',
        isDefault: true
      }
    ]
  };
  
  // Mock order history data
  const orderHistory = [
    {
      id: 'ORD-12345',
      date: '2025-03-15',
      total: 149.98,
      status: 'Delivered',
      items: [
        {
          id: '1',
          name: 'Premium Product',
          price: 99.99,
          quantity: 1,
          imageUrl: 'https://via.placeholder.com/100'
        },
        {
          id: '2',
          name: 'Budget Option',
          price: 49.99,
          quantity: 1,
          imageUrl: 'https://via.placeholder.com/100'
        }
      ]
    },
    {
      id: 'ORD-67890',
      date: '2025-02-28',
      total: 199.98,
      status: 'Delivered',
      items: [
        {
          id: '1',
          name: 'Premium Product',
          price: 99.99,
          quantity: 2,
          imageUrl: 'https://via.placeholder.com/100'
        }
      ]
    }
  ];
  
  // Mock wishlist data
  const wishlistItems = [
    {
      id: '3',
      name: 'Luxury Item',
      price: 299.99,
      imageUrl: 'https://via.placeholder.com/100',
      inStock: true
    },
    {
      id: '4',
      name: 'Special Edition',
      price: 149.99,
      imageUrl: 'https://via.placeholder.com/100',
      inStock: false
    }
  ];
  
  const handleLogin = (credentials) => {
    // In a real app, this would validate credentials with an API
    console.log('Login with:', credentials);
    setIsLoggedIn(true);
  };
  
  const handleRegister = (userData) => {
    // In a real app, this would register a new user with an API
    console.log('Register with:', userData);
    setIsLoggedIn(true);
  };
  
  const handlePasswordRecovery = (email) => {
    // In a real app, this would trigger a password recovery email
    console.log('Password recovery for:', email);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  const handleProfileUpdate = (updatedData) => {
    // In a real app, this would update user data with an API
    console.log('Update profile:', updatedData);
  };
  
  return (
    <div className="user-account-page">
      <h1>My Account</h1>
      
      {!isLoggedIn ? (
        <Auth 
          onLogin={handleLogin}
          onRegister={handleRegister}
          onPasswordRecovery={handlePasswordRecovery}
        />
      ) : (
        <div className="account-content">
          <div className="account-sidebar">
            <div className="user-greeting">
              <div className="user-avatar">
                {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
              </div>
              <div className="user-name">
                {userData.firstName} {userData.lastName}
              </div>
            </div>
            
            <nav className="account-nav">
              <button 
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button 
                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </button>
              <button 
                className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                Wishlist
              </button>
              <button 
                className="nav-item logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </nav>
          </div>
          
          <div className="account-main">
            {activeTab === 'profile' && (
              <ProfileManagement 
                userData={userData}
                onProfileUpdate={handleProfileUpdate}
              />
            )}
            
            {activeTab === 'orders' && (
              <OrderHistory orders={orderHistory} />
            )}
            
            {activeTab === 'wishlist' && (
              <Wishlist items={wishlistItems} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAccountPage;
