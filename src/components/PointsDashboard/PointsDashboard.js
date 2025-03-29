import React from 'react';
import '../../styles/PointsDashboard.css';

function PointsDashboard({ loyaltyData }) {
  const {
    pointsBalance,
    tierStatus,
    tierProgress,
    nextTier,
    pointsToNextTier,
    memberSince
  } = loyaltyData;
  
  // Format the member since date
  const formattedMemberSince = new Date(memberSince).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
  
  // Define tier benefits based on tier status
  const tierBenefits = {
    Bronze: [
      'Earn 1 point per $1 spent',
      'Birthday bonus points',
      'Access to member-only sales'
    ],
    Silver: [
      'Earn 1.5 points per $1 spent',
      'Birthday bonus points',
      'Access to member-only sales',
      'Free shipping on orders over $50'
    ],
    Gold: [
      'Earn 2 points per $1 spent',
      'Birthday bonus points',
      'Access to member-only sales',
      'Free shipping on all orders',
      'Early access to new products'
    ],
    Platinum: [
      'Earn 3 points per $1 spent',
      'Birthday bonus points',
      'Access to member-only sales',
      'Free shipping on all orders',
      'Early access to new products',
      'Dedicated customer service',
      'Exclusive Platinum-only rewards'
    ]
  };
  
  const currentTierBenefits = tierBenefits[tierStatus] || tierBenefits.Bronze;
  
  return (
    <div className="points-dashboard">
      <div className="dashboard-grid">
        <div className="points-summary">
          <h2>Points Balance</h2>
          <div className="points-balance">{pointsBalance}</div>
          <div className="points-info">
            <p>Member Since: {formattedMemberSince}</p>
            <button className="how-to-earn-button">How to Earn More Points</button>
          </div>
        </div>
        
        <div className="tier-status">
          <h2>Membership Tier</h2>
          <div className="tier-badge">{tierStatus}</div>
          
          {nextTier && (
            <div className="tier-progress">
              <div className="progress-label">
                <span>{pointsToNextTier} points to {nextTier}</span>
                <span>{tierProgress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${tierProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="tier-benefits">
        <h2>Your {tierStatus} Benefits</h2>
        <ul className="benefits-list">
          {currentTierBenefits.map((benefit, index) => (
            <li key={index} className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-button">
            View Available Rewards
          </button>
          <button className="action-button">
            Refer a Friend
          </button>
          <button className="action-button">
            Check Special Offers
          </button>
        </div>
      </div>
    </div>
  );
}

export default PointsDashboard;
