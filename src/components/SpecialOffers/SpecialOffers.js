import React from 'react';
import '../../styles/SpecialOffers.css';

function SpecialOffers({ offers }) {
  // Helper function to check if an offer is active
  const isOfferActive = (offer) => {
    const today = new Date();
    const startDate = new Date(offer.startDate);
    const endDate = new Date(offer.endDate);
    
    return today >= startDate && today <= endDate;
  };
  
  // Helper function to format date range
  const formatDateRange = (startDate, endDate) => {
    const options = { month: 'short', day: 'numeric' };
    const start = new Date(startDate).toLocaleDateString('en-US', options);
    const end = new Date(endDate).toLocaleDateString('en-US', options);
    
    return `${start} - ${end}`;
  };
  
  // Sort offers: active first, then by start date
  const sortedOffers = [...offers].sort((a, b) => {
    const aActive = isOfferActive(a);
    const bActive = isOfferActive(b);
    
    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;
    
    return new Date(a.startDate) - new Date(b.startDate);
  });
  
  return (
    <div className="special-offers">
      <div className="offers-header">
        <h2>Special Offers</h2>
        <p className="offers-intro">
          Exclusive promotions for loyalty members. Check back regularly for new offers!
        </p>
      </div>
      
      {sortedOffers.length === 0 ? (
        <div className="no-offers">
          <p>No special offers available at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="offers-grid">
          {sortedOffers.map(offer => (
            <div 
              key={offer.id} 
              className={`offer-card ${isOfferActive(offer) ? 'active' : 'upcoming'}`}
            >
              <div className="offer-image">
                <img src={offer.imageUrl} alt={offer.title} />
                <div className="offer-badge">
                  {isOfferActive(offer) ? 'Active Now' : 'Coming Soon'}
                </div>
              </div>
              
              <div className="offer-content">
                <h3 className="offer-title">{offer.title}</h3>
                <div className="offer-dates">
                  {formatDateRange(offer.startDate, offer.endDate)}
                </div>
                <p className="offer-description">{offer.description}</p>
                
                <div className="offer-actions">
                  {isOfferActive(offer) ? (
                    <a href="/shop" className="shop-now-button">Shop Now</a>
                  ) : (
                    <button className="remind-button">Set Reminder</button>
                  )}
                  <button className="share-button">Share</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="offers-footer">
        <div className="offers-note">
          <h3>How Special Offers Work</h3>
          <ul>
            <li>Special offers are exclusive to loyalty program members</li>
            <li>Offers automatically apply at checkout when eligible</li>
            <li>Some offers may be tier-specific (Silver, Gold, Platinum)</li>
            <li>Offers cannot be combined unless explicitly stated</li>
          </ul>
        </div>
        
        <div className="notification-preferences">
          <h3>Notification Preferences</h3>
          <div className="preferences-options">
            <div className="preference-option">
              <input type="checkbox" id="email-notifications" defaultChecked />
              <label htmlFor="email-notifications">Email notifications for new offers</label>
            </div>
            <div className="preference-option">
              <input type="checkbox" id="sms-notifications" />
              <label htmlFor="sms-notifications">SMS notifications for new offers</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialOffers;
