import React, { useState } from 'react';
import '../../styles/StoreSearch.css';

function StoreSearch({ onSearch }) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    inStorePickup: false,
    service: 'all'
  });
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, filters);
  };
  
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleLocationToggle = () => {
    setUseCurrentLocation(!useCurrentLocation);
    
    if (!useCurrentLocation) {
      // In a real app, this would request the user's location
      // For this prototype, we'll just simulate it
      setTimeout(() => {
        setQuery('Current Location');
        // Typically we would get coordinates and reverse geocode them
      }, 500);
    } else {
      setQuery('');
    }
  };
  
  const handleClear = () => {
    setQuery('');
    setFilters({
      inStorePickup: false,
      service: 'all'
    });
    setUseCurrentLocation(false);
    onSearch('', { inStorePickup: false, service: 'all' });
  };
  
  return (
    <div className="store-search">
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter city, state, or zip code"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={useCurrentLocation}
          />
          <button 
            type="button" 
            className={`location-button ${useCurrentLocation ? 'active' : ''}`}
            onClick={handleLocationToggle}
            title={useCurrentLocation ? 'Stop using current location' : 'Use my current location'}
          >
            <span className="location-icon">📍</span>
          </button>
        </div>
        
        <div className="search-filters">
          <div className="filter-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="inStorePickup"
                checked={filters.inStorePickup}
                onChange={handleFilterChange}
              />
              <span>In-store Pickup Available</span>
            </label>
          </div>
          
          <div className="filter-group">
            <label>Store Services</label>
            <select 
              name="service" 
              value={filters.service}
              onChange={handleFilterChange}
            >
              <option value="all">All Services</option>
              <option value="In-store pickup">In-store Pickup</option>
              <option value="Returns">Returns</option>
              <option value="Personal shopping">Personal Shopping</option>
              <option value="Gift wrapping">Gift Wrapping</option>
            </select>
          </div>
        </div>
        
        <div className="search-actions">
          <button type="submit" className="search-button">
            Search
          </button>
          <button 
            type="button" 
            className="clear-button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default StoreSearch;
