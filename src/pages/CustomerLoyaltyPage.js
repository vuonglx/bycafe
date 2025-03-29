import React, { useState } from 'react';
import PointsDashboard from '../components/PointsDashboard/PointsDashboard';
import RewardsSection from '../components/RewardsSection/RewardsSection';
import PointsHistory from '../components/PointsHistory/PointsHistory';
import SpecialOffers from '../components/SpecialOffers/SpecialOffers';
import '../styles/CustomerLoyaltyPage.css';

function CustomerLoyaltyPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock loyalty data
  const loyaltyData = {
    pointsBalance: 2450,
    tierStatus: 'Gold',
    tierProgress: 75,
    nextTier: 'Platinum',
    pointsToNextTier: 550,
    memberSince: '2024-06-15'
  };
  
  // Mock rewards data
  const rewards = [
    {
      id: '1',
      name: '$10 Store Credit',
      pointsCost: 1000,
      description: 'Redeem for $10 off your next purchase.',
      expiryDate: '2025-12-31',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      name: 'Free Shipping',
      pointsCost: 500,
      description: 'Free shipping on your next order, no minimum purchase required.',
      expiryDate: '2025-12-31',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: '3',
      name: 'Exclusive Product',
      pointsCost: 3000,
      description: 'Redeem for an exclusive product only available to loyalty members.',
      expiryDate: '2025-12-31',
      imageUrl: 'https://via.placeholder.com/150'
    }
  ];
  
  // Mock points history data
  const pointsHistory = [
    {
      id: '1',
      date: '2025-03-15',
      description: 'Purchase: Order #ORD-12345',
      points: 150,
      type: 'earned'
    },
    {
      id: '2',
      date: '2025-03-01',
      description: 'Redeemed: $10 Store Credit',
      points: 1000,
      type: 'redeemed'
    },
    {
      id: '3',
      date: '2025-02-20',
      description: 'Purchase: Order #ORD-67890',
      points: 200,
      type: 'earned'
    },
    {
      id: '4',
      date: '2025-02-14',
      description: 'Birthday Bonus',
      points: 500,
      type: 'earned'
    },
    {
      id: '5',
      date: '2025-01-30',
      description: 'Purchase: Order #ORD-54321',
      points: 120,
      type: 'earned'
    }
  ];
  
  // Mock special offers data
  const specialOffers = [
    {
      id: '1',
      title: 'Double Points Weekend',
      description: 'Earn double points on all purchases this weekend.',
      startDate: '2025-04-05',
      endDate: '2025-04-06',
      imageUrl: 'https://via.placeholder.com/300x150'
    },
    {
      id: '2',
      title: 'Member-Only Sale',
      description: 'Exclusive 20% off for loyalty members.',
      startDate: '2025-04-10',
      endDate: '2025-04-15',
      imageUrl: 'https://via.placeholder.com/300x150'
    },
    {
      id: '3',
      title: 'Bonus Points on Selected Items',
      description: 'Earn 3x points on selected items from our new collection.',
      startDate: '2025-04-01',
      endDate: '2025-04-30',
      imageUrl: 'https://via.placeholder.com/300x150'
    }
  ];
  
  return (
    <div className="customer-loyalty-page">
      <div className="loyalty-header">
        <h1>Customer Loyalty Program</h1>
        <p className="loyalty-intro">
          Earn points with every purchase and redeem them for exclusive rewards.
        </p>
      </div>
      
      <div className="loyalty-tabs">
        <button 
          className={`loyalty-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`loyalty-tab ${activeTab === 'rewards' ? 'active' : ''}`}
          onClick={() => setActiveTab('rewards')}
        >
          Rewards
        </button>
        <button 
          className={`loyalty-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Points History
        </button>
        <button 
          className={`loyalty-tab ${activeTab === 'offers' ? 'active' : ''}`}
          onClick={() => setActiveTab('offers')}
        >
          Special Offers
        </button>
      </div>
      
      <div className="loyalty-content">
        {activeTab === 'dashboard' && (
          <PointsDashboard loyaltyData={loyaltyData} />
        )}
        
        {activeTab === 'rewards' && (
          <RewardsSection 
            rewards={rewards} 
            pointsBalance={loyaltyData.pointsBalance} 
          />
        )}
        
        {activeTab === 'history' && (
          <PointsHistory history={pointsHistory} />
        )}
        
        {activeTab === 'offers' && (
          <SpecialOffers offers={specialOffers} />
        )}
      </div>
    </div>
  );
}

export default CustomerLoyaltyPage;
