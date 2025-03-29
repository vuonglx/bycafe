import React, { useState } from 'react';
import MultiStepForm from '../components/MultiStepForm/MultiStepForm';
import GuestCheckout from '../components/GuestCheckout/GuestCheckout';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import PaymentIntegration from '../components/PaymentIntegration/PaymentIntegration';
import '../styles/CheckoutPage.css';

function CheckoutPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState({
    shipping: {},
    billing: {},
    payment: {},
    sameAsBilling: true
  });
  
  // Mock cart items data
  const cartItems = [
    {
      id: '1',
      name: 'Premium Product',
      price: 99.99,
      imageUrl: 'https://via.placeholder.com/100',
      quantity: 2
    },
    {
      id: '2',
      name: 'Budget Option',
      price: 49.99,
      imageUrl: 'https://via.placeholder.com/100',
      quantity: 1
    }
  ];
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const shipping = subtotal >= 100 ? 0 : 5.99;
  const total = subtotal + tax + shipping;
  
  const handleStepChange = (step) => {
    setCurrentStep(step);
  };
  
  const handleDataChange = (section, data) => {
    setCheckoutData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };
  
  const handleGuestLogin = (email) => {
    // In a real app, this would create a guest session
    setIsLoggedIn(true);
    setCheckoutData(prev => ({
      ...prev,
      email
    }));
  };
  
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      
      <div className="checkout-content">
        <div className="checkout-main">
          {!isLoggedIn && (
            <GuestCheckout onGuestLogin={handleGuestLogin} />
          )}
          
          <MultiStepForm 
            currentStep={currentStep}
            onStepChange={handleStepChange}
            checkoutData={checkoutData}
            onDataChange={handleDataChange}
          />
          
          {currentStep === 3 && (
            <PaymentIntegration 
              onPaymentDataChange={(data) => handleDataChange('payment', data)}
            />
          )}
        </div>
        
        <div className="checkout-sidebar">
          <OrderSummary 
            items={cartItems}
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
