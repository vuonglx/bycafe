import React from 'react';
import '../../styles/CartItems.css';

function CartItems({ items, onQuantityChange, onRemoveItem, onSaveForLater }) {
  return (
    <div className="cart-items">
      <h2>Cart Items ({items.length})</h2>
      
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="items-list">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.imageUrl} alt={item.name} />
              </div>
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <div className="item-price">${item.price.toFixed(2)}</div>
                
                <div className="item-actions">
                  <div className="quantity-control">
                    <button 
                      className="quantity-button"
                      onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      min="1" 
                      max={item.maxQuantity}
                      value={item.quantity}
                      onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value, 10))}
                    />
                    <button 
                      className="quantity-button"
                      onClick={() => onQuantityChange(item.id, Math.min(item.maxQuantity, item.quantity + 1))}
                      disabled={item.quantity >= item.maxQuantity}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-subtotal">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                
                <div className="item-secondary-actions">
                  <button 
                    className="secondary-action"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                  <button 
                    className="secondary-action"
                    onClick={() => onSaveForLater(item.id)}
                  >
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartItems;
