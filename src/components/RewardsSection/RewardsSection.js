import React, { useState } from 'react';
import '../../styles/RewardsSection.css';

function RewardsSection({ rewards, pointsBalance }) {
  const [selectedReward, setSelectedReward] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleRewardSelect = (reward) => {
    setSelectedReward(reward);
    setShowConfirmation(true);
  };
  
  const handleConfirmRedeem = () => {
    // In a real app, this would call an API to redeem the reward
    alert(`You have successfully redeemed: ${selectedReward.name}`);
    setShowConfirmation(false);
    setSelectedReward(null);
  };
  
  const handleCancelRedeem = () => {
    setShowConfirmation(false);
    setSelectedReward(null);
  };
  
  const canRedeem = (reward) => {
    return pointsBalance >= reward.pointsCost;
  };
  
  return (
    <div className="rewards-section">
      <div className="rewards-header">
        <h2>Available Rewards</h2>
        <div className="points-available">
          <span className="points-label">Your Points:</span>
          <span className="points-value">{pointsBalance}</span>
        </div>
      </div>
      
      <div className="rewards-grid">
        {rewards.map(reward => (
          <div key={reward.id} className="reward-card">
            <div className="reward-image">
              <img src={reward.imageUrl} alt={reward.name} />
            </div>
            <div className="reward-content">
              <h3 className="reward-name">{reward.name}</h3>
              <div className="reward-cost">{reward.pointsCost} points</div>
              <p className="reward-description">{reward.description}</p>
              <div className="reward-expiry">
                Valid until: {new Date(reward.expiryDate).toLocaleDateString()}
              </div>
              <button 
                className={`redeem-button ${!canRedeem(reward) ? 'disabled' : ''}`}
                onClick={() => canRedeem(reward) && handleRewardSelect(reward)}
                disabled={!canRedeem(reward)}
              >
                {canRedeem(reward) ? 'Redeem Reward' : 'Not Enough Points'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {rewards.length === 0 && (
        <div className="no-rewards">
          <p>No rewards available at the moment. Check back soon!</p>
        </div>
      )}
      
      {showConfirmation && selectedReward && (
        <div className="redemption-modal">
          <div className="modal-content">
            <h3>Confirm Redemption</h3>
            <p>Are you sure you want to redeem the following reward?</p>
            <div className="reward-summary">
              <div className="reward-name">{selectedReward.name}</div>
              <div className="reward-cost">{selectedReward.pointsCost} points</div>
            </div>
            <p className="points-after">
              Points balance after redemption: {pointsBalance - selectedReward.pointsCost}
            </p>
            <div className="modal-actions">
              <button 
                className="confirm-button"
                onClick={handleConfirmRedeem}
              >
                Confirm
              </button>
              <button 
                className="cancel-button"
                onClick={handleCancelRedeem}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RewardsSection;
