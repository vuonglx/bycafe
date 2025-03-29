import React, { useState } from 'react';
import '../../styles/PriceBreakdown.css';

function PriceBreakdown({ subtotal, tax, shippingOptions, selectedShipping, total }) {
  const [shipping, setShipping] = useState(selectedShipping);
  
  const handleShippingChange = (e) => {
    setShipping(e.target.value);
    // In a real app, this would update the cart state or call an API
  };
  
  const currentShippingOption = shippingOptions.find(option => option.id === shipping);
  const shippingCost = currentShippingOption ? currentShippingOption.price : 0;
  const calculatedTotal = subtotal + tax + shippingCost;
  
  return (
    <div className="price-breakdown">
      <h2>Order Summary</h2>
      
      <div className="price-rows">
        <div className="price-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="price-row">
          <span>Tax (Estimated)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="price-row shipping-row">
          <div className="shipping-options">
            <span>Shipping</span>
            <select 
              value={shipping} 
              onChange={handleShippingChange}
            >
              {shippingOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name} {option.price > 0 ? `($${option.price.toFixed(2)})` : ''}
                </option>
              ))}
            </select>
          </div>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        
        <div className="price-row total-row">
          <span>Total</span>
          <span>${calculatedTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="promo-code">
        <input type="text" placeholder="Promo Code" />
        <button>Apply</button>
      </div>
    </div>
  );
}

export default PriceBreakdown;
