import React, { useState } from 'react';
import '../../styles/StoreDetails.css';

function StoreDetails({ store }) {
  const [activeTab, setActiveTab] = useState('info');
  
  const formatPhoneNumber = (phone) => {
    // Simple formatting, in a real app might use a library
    return phone;
  };
  
  const getDirectionsUrl = (address) => {
    // In a real app, this would create a proper Google Maps URL
    return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  };
  
  const getDayOfWeek = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    return days[today];
  };
  
  const isOpenNow = () => {
    // This is a simplified implementation
    // In a real app, we would parse the hours and check against current time
    return true;
  };
  
  return (
    <div className="store-details">
      <div className="store-details-header">
        <div className="store-info-main">
          <h2>{store.name}</h2>
          <div className={`store-status ${isOpenNow() ? 'open' : 'closed'}`}>
            {isOpenNow() ? 'Open Now' : 'Closed'}
          </div>
        </div>
        <div className="store-actions">
          <a 
            href={getDirectionsUrl(store.address)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="directions-button"
          >
            Get Directions
          </a>
        </div>
      </div>
      
      <div className="store-tabs">
        <button 
          className={`store-tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Store Info
        </button>
        <button 
          className={`store-tab ${activeTab === 'hours' ? 'active' : ''}`}
          onClick={() => setActiveTab('hours')}
        >
          Hours
        </button>
        <button 
          className={`store-tab ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Services
        </button>
      </div>
      
      <div className="store-details-content">
        {activeTab === 'info' && (
          <div className="store-info">
            <div className="store-image">
              <img src={store.image} alt={store.name} />
            </div>
            
            <div className="store-contact">
              <div className="contact-item">
                <div className="contact-label">Address:</div>
                <div className="contact-value">{store.address}</div>
              </div>
              
              <div className="contact-item">
                <div className="contact-label">Phone:</div>
                <div className="contact-value">
                  <a href={`tel:${store.phone}`}>{formatPhoneNumber(store.phone)}</a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-label">Today's Hours:</div>
                <div className="contact-value">{store.hours[getDayOfWeek()]}</div>
              </div>
            </div>
            
            {store.inStorePickup && (
              <div className="pickup-info">
                <h3>In-Store Pickup Available</h3>
                <p>Order online and pick up in store, usually within 2 hours.</p>
                <button className="shop-button">Shop Now</button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'hours' && (
          <div className="store-hours">
            <h3>Store Hours</h3>
            <div className="hours-list">
              {Object.entries(store.hours).map(([day, hours]) => (
                <div 
                  key={day} 
                  className={`hours-item ${day === getDayOfWeek() ? 'today' : ''}`}
                >
                  <div className="day">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                  <div className="hours">{hours}</div>
                </div>
              ))}
            </div>
            
            <div className="hours-note">
              <p>Hours may vary on holidays. Please call the store to confirm holiday hours.</p>
            </div>
          </div>
        )}
        
        {activeTab === 'services' && (
          <div className="store-services">
            <h3>Available Services</h3>
            <ul className="services-list">
              {store.services.map((service, index) => (
                <li key={index} className="service-item">
                  <span className="service-icon">✓</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            
            {store.inStorePickup && (
              <div className="pickup-details">
                <h4>About In-Store Pickup</h4>
                <p>Order online and pick up in store, usually within 2 hours. You'll receive an email when your order is ready for pickup.</p>
                <p>Bring a valid photo ID and your order confirmation email or number when you come to pick up your order.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreDetails;
