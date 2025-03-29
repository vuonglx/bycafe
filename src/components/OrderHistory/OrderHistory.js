import React, { useState } from 'react';
import '../../styles/OrderHistory.css';

function OrderHistory({ orders }) {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [returnReason, setReturnReason] = useState('');
  const [returningItems, setReturningItems] = useState({});
  
  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  const handleReturnChange = (itemId, checked) => {
    setReturningItems({
      ...returningItems,
      [itemId]: checked
    });
  };
  
  const handleReturnSubmit = (orderId) => {
    // In a real app, this would submit the return request to an API
    const itemsToReturn = Object.keys(returningItems).filter(id => returningItems[id]);
    
    if (itemsToReturn.length === 0) {
      alert('Please select at least one item to return.');
      return;
    }
    
    if (!returnReason) {
      alert('Please provide a reason for your return.');
      return;
    }
    
    alert(`Return request submitted for order ${orderId}. Items: ${itemsToReturn.join(', ')}. Reason: ${returnReason}`);
    
    // Reset state
    setReturningItems({});
    setReturnReason('');
    setExpandedOrder(null);
  };
  
  return (
    <div className="order-history">
      <h2>Order History</h2>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <a href="/" className="shop-now-link">Shop Now</a>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <div className="order-id">Order #{order.id}</div>
                  <div className="order-date">{new Date(order.date).toLocaleDateString()}</div>
                </div>
                <div className="order-summary">
                  <div className="order-total">${order.total.toFixed(2)}</div>
                  <div className={`order-status ${order.status.toLowerCase()}`}>{order.status}</div>
                </div>
                <button 
                  className="toggle-details"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>
              
              {expandedOrder === order.id && (
                <div className="order-details">
                  <div className="order-items">
                    {order.items.map(item => (
                      <div key={item.id} className="order-item">
                        <div className="item-image">
                          <img src={item.imageUrl} alt={item.name} />
                        </div>
                        <div className="item-details">
                          <h3>{item.name}</h3>
                          <div className="item-price">${item.price.toFixed(2)}</div>
                          <div className="item-quantity">Quantity: {item.quantity}</div>
                        </div>
                        {order.status === 'Delivered' && (
                          <div className="item-return">
                            <input 
                              type="checkbox" 
                              id={`return-${order.id}-${item.id}`}
                              checked={returningItems[item.id] || false}
                              onChange={(e) => handleReturnChange(item.id, e.target.checked)}
                            />
                            <label htmlFor={`return-${order.id}-${item.id}`}>Return</label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {order.status === 'Delivered' && (
                    <div className="return-section">
                      <h3>Return Items</h3>
                      <div className="form-group">
                        <label htmlFor={`reason-${order.id}`}>Reason for Return</label>
                        <select 
                          id={`reason-${order.id}`}
                          value={returnReason}
                          onChange={(e) => setReturnReason(e.target.value)}
                        >
                          <option value="">Select a reason</option>
                          <option value="wrong-item">Received wrong item</option>
                          <option value="defective">Item is defective</option>
                          <option value="not-needed">No longer needed</option>
                          <option value="not-as-described">Not as described</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <button 
                        className="return-button"
                        onClick={() => handleReturnSubmit(order.id)}
                      >
                        Submit Return
                      </button>
                    </div>
                  )}
                  
                  <div className="order-actions">
                    <button className="reorder-button">Reorder</button>
                    <a href={`/order/${order.id}`} className="view-invoice">View Invoice</a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
