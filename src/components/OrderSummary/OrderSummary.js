import React from 'react';
import '../../styles/OrderSummary.css';

function OrderSummary({ items, subtotal, tax, shipping, total }) {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      
      <div className="summary-items">
        {items.map(item => (
          <div key={item.id} className="summary-item">
            <div className="item-image">
              <img src={item.imageUrl} alt={item.name} />
              <span className="item-quantity">{item.quantity}</span>
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <div className="item-price">${item.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="summary-divider"></div>
      
      <div className="price-breakdown">
        <div className="price-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="price-row">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="price-row">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="price-row total-row">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="summary-footer">
        <div className="secure-checkout">
          <span className="secure-icon">🔒</span>
          <span>Secure Checkout</span>
        </div>
        <div className="satisfaction-guarantee">
          <span>100% Satisfaction Guarantee</span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
