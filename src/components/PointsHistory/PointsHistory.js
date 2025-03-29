import React, { useState } from 'react';
import '../../styles/PointsHistory.css';

function PointsHistory({ history }) {
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });
  
  // Filter history based on selected filter and date range
  const filteredHistory = history.filter(item => {
    // Filter by type (earned/redeemed)
    if (filter === 'earned' && item.type !== 'earned') return false;
    if (filter === 'redeemed' && item.type !== 'redeemed') return false;
    
    // Filter by date range if provided
    if (dateRange.from && new Date(item.date) < new Date(dateRange.from)) return false;
    if (dateRange.to && new Date(item.date) > new Date(dateRange.to)) return false;
    
    return true;
  });
  
  // Calculate total points earned and redeemed
  const totalEarned = history
    .filter(item => item.type === 'earned')
    .reduce((sum, item) => sum + item.points, 0);
    
  const totalRedeemed = history
    .filter(item => item.type === 'redeemed')
    .reduce((sum, item) => sum + item.points, 0);
  
  return (
    <div className="points-history">
      <div className="history-header">
        <h2>Points History</h2>
        <div className="points-summary">
          <div className="summary-item earned">
            <span className="summary-label">Total Earned</span>
            <span className="summary-value">+{totalEarned}</span>
          </div>
          <div className="summary-item redeemed">
            <span className="summary-label">Total Redeemed</span>
            <span className="summary-value">-{totalRedeemed}</span>
          </div>
        </div>
      </div>
      
      <div className="history-filters">
        <div className="filter-group">
          <label>Filter by Type</label>
          <div className="filter-buttons">
            <button 
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-button ${filter === 'earned' ? 'active' : ''}`}
              onClick={() => setFilter('earned')}
            >
              Earned
            </button>
            <button 
              className={`filter-button ${filter === 'redeemed' ? 'active' : ''}`}
              onClick={() => setFilter('redeemed')}
            >
              Redeemed
            </button>
          </div>
        </div>
        
        <div className="filter-group">
          <label>Filter by Date</label>
          <div className="date-inputs">
            <div className="date-field">
              <label htmlFor="date-from">From</label>
              <input 
                type="date" 
                id="date-from"
                value={dateRange.from}
                onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
              />
            </div>
            <div className="date-field">
              <label htmlFor="date-to">To</label>
              <input 
                type="date" 
                id="date-to"
                value={dateRange.to}
                onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="history-list">
        {filteredHistory.length === 0 ? (
          <div className="no-history">
            <p>No points activity found for the selected filters.</p>
          </div>
        ) : (
          filteredHistory.map(item => (
            <div 
              key={item.id} 
              className={`history-item ${item.type}`}
            >
              <div className="history-date">
                {new Date(item.date).toLocaleDateString()}
              </div>
              <div className="history-description">
                {item.description}
              </div>
              <div className="history-points">
                {item.type === 'earned' ? '+' : '-'}{item.points}
              </div>
            </div>
          ))
        )}
      </div>
      
      {filteredHistory.length > 0 && (
        <div className="download-history">
          <button className="download-button">
            Download History (CSV)
          </button>
        </div>
      )}
    </div>
  );
}

export default PointsHistory;
