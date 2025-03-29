import React, { useState } from 'react';
import '../../styles/PaymentIntegration.css';

function PaymentIntegration({ onPaymentDataChange }) {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    onPaymentDataChange({ method });
  };
  
  const handleCardDataChange = (field, value) => {
    const updatedCardData = {
      ...cardData,
      [field]: value
    };
    
    setCardData(updatedCardData);
    onPaymentDataChange({ 
      method: paymentMethod,
      cardData: updatedCardData
    });
  };
  
  return (
    <div className="payment-integration">
      <h2>Payment Method</h2>
      
      <div className="payment-methods">
        <div 
          className={`payment-method ${paymentMethod === 'credit-card' ? 'active' : ''}`}
          onClick={() => handlePaymentMethodChange('credit-card')}
        >
          <div className="payment-icon credit-card-icon">💳</div>
          <span>Credit Card</span>
        </div>
        
        <div 
          className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}
          onClick={() => handlePaymentMethodChange('paypal')}
        >
          <div className="payment-icon paypal-icon">P</div>
          <span>PayPal</span>
        </div>
        
        <div 
          className={`payment-method ${paymentMethod === 'apple-pay' ? 'active' : ''}`}
          onClick={() => handlePaymentMethodChange('apple-pay')}
        >
          <div className="payment-icon apple-pay-icon">A</div>
          <span>Apple Pay</span>
        </div>
      </div>
      
      {paymentMethod === 'credit-card' && (
        <div className="credit-card-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input 
              type="text" 
              id="cardNumber" 
              placeholder="1234 5678 9012 3456"
              value={cardData.cardNumber}
              onChange={(e) => handleCardDataChange('cardNumber', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cardName">Name on Card</label>
            <input 
              type="text" 
              id="cardName" 
              placeholder="John Doe"
              value={cardData.cardName}
              onChange={(e) => handleCardDataChange('cardName', e.target.value)}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input 
                type="text" 
                id="expiryDate" 
                placeholder="MM/YY"
                value={cardData.expiryDate}
                onChange={(e) => handleCardDataChange('expiryDate', e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input 
                type="text" 
                id="cvv" 
                placeholder="123"
                value={cardData.cvv}
                onChange={(e) => handleCardDataChange('cvv', e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      )}
      
      {paymentMethod === 'paypal' && (
        <div className="paypal-info">
          <p>You will be redirected to PayPal to complete your payment.</p>
          <button className="paypal-button">Continue to PayPal</button>
        </div>
      )}
      
      {paymentMethod === 'apple-pay' && (
        <div className="apple-pay-info">
          <p>You will be prompted to authenticate with Apple Pay.</p>
          <button className="apple-pay-button">Pay with Apple Pay</button>
        </div>
      )}
      
      <div className="payment-security">
        <div className="security-icon">🔒</div>
        <div className="security-info">
          <h4>Secure Payment</h4>
          <p>Your payment information is encrypted and secure.</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentIntegration;
