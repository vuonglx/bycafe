import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/CheckoutButton.css';

function CheckoutButton({ total }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    // In a real app, this would validate the cart and redirect to checkout
    navigate('/checkout');
  };

  return (
    <div className="checkout-button-container">
      <button 
        className="checkout-button"
        onClick={handleCheckout}
      >
        Proceed to Checkout (${total.toFixed(2)})
      </button>
      <div className="secure-checkout">
        <span className="secure-icon">🔒</span>
        <span>Secure Checkout</span>
      </div>
    </div>
  );
}

export default CheckoutButton;
