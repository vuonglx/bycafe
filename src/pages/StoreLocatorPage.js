import React, { useState } from 'react';
import Map from '../components/Map/Map';
import StoreSearch from '../components/StoreSearch/StoreSearch';
import StoreDetails from '../components/StoreDetails/StoreDetails';
import '../styles/StoreLocatorPage.css';

function StoreLocatorPage() {
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  const [mapZoom, setMapZoom] = useState(10);
  
  // Mock store data
  const stores = [
    {
      id: '1',
      name: 'Downtown Store',
      address: '123 Market St, San Francisco, CA 94105',
      phone: '(415) 555-1234',
      coordinates: { lat: 37.7935, lng: -122.3958 },
      hours: {
        monday: '9:00 AM - 8:00 PM',
        tuesday: '9:00 AM - 8:00 PM',
        wednesday: '9:00 AM - 8:00 PM',
        thursday: '9:00 AM - 8:00 PM',
        friday: '9:00 AM - 9:00 PM',
        saturday: '10:00 AM - 9:00 PM',
        sunday: '11:00 AM - 6:00 PM'
      },
      services: ['In-store pickup', 'Returns', 'Personal shopping'],
      inStorePickup: true,
      image: 'https://via.placeholder.com/400x200'
    },
    {
      id: '2',
      name: 'Mission District',
      address: '456 Valencia St, San Francisco, CA 94103',
      phone: '(415) 555-5678',
      coordinates: { lat: 37.7648, lng: -122.4216 },
      hours: {
        monday: '10:00 AM - 7:00 PM',
        tuesday: '10:00 AM - 7:00 PM',
        wednesday: '10:00 AM - 7:00 PM',
        thursday: '10:00 AM - 7:00 PM',
        friday: '10:00 AM - 8:00 PM',
        saturday: '10:00 AM - 8:00 PM',
        sunday: '11:00 AM - 6:00 PM'
      },
      services: ['In-store pickup', 'Returns', 'Gift wrapping'],
      inStorePickup: true,
      image: 'https://via.placeholder.com/400x200'
    },
    {
      id: '3',
      name: 'Marina Store',
      address: '789 Chestnut St, San Francisco, CA 94123',
      phone: '(415) 555-9012',
      coordinates: { lat: 37.8037, lng: -122.4368 },
      hours: {
        monday: '9:00 AM - 7:00 PM',
        tuesday: '9:00 AM - 7:00 PM',
        wednesday: '9:00 AM - 7:00 PM',
        thursday: '9:00 AM - 7:00 PM',
        friday: '9:00 AM - 8:00 PM',
        saturday: '10:00 AM - 8:00 PM',
        sunday: '11:00 AM - 6:00 PM'
      },
      services: ['In-store pickup', 'Returns', 'Personal shopping', 'Gift wrapping'],
      inStorePickup: true,
      image: 'https://via.placeholder.com/400x200'
    }
  ];
  
  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setMapCenter(store.coordinates);
    setMapZoom(14);
  };
  
  const handleSearch = (query, filters) => {
    // In a real app, this would call an API with the search parameters
    // For now, we'll just filter the mock data
    let results = [...stores];
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(store => 
        store.name.toLowerCase().includes(lowerQuery) || 
        store.address.toLowerCase().includes(lowerQuery)
      );
    }
    
    if (filters.inStorePickup) {
      results = results.filter(store => store.inStorePickup);
    }
    
    if (filters.service && filters.service !== 'all') {
      results = results.filter(store => 
        store.services.includes(filters.service)
      );
    }
    
    setSearchResults(results);
    
    // If we have results, center the map on the first result
    if (results.length > 0) {
      setMapCenter(results[0].coordinates);
      setMapZoom(12);
    }
  };
  
  return (
    <div className="store-locator-page">
      <div className="store-locator-header">
        <h1>Find a Store</h1>
        <p className="store-locator-intro">
          Visit one of our locations for in-person shopping, returns, or to pick up your online order.
        </p>
      </div>
      
      <div className="store-locator-container">
        <div className="store-locator-sidebar">
          <StoreSearch onSearch={handleSearch} />
          
          <div className="search-results">
            <h2>
              {searchResults.length > 0 
                ? `${searchResults.length} Store${searchResults.length === 1 ? '' : 's'} Found` 
                : 'All Stores'}
            </h2>
            
            <div className="store-list">
              {(searchResults.length > 0 ? searchResults : stores).map(store => (
                <div 
                  key={store.id} 
                  className={`store-list-item ${selectedStore && selectedStore.id === store.id ? 'selected' : ''}`}
                  onClick={() => handleStoreSelect(store)}
                >
                  <h3>{store.name}</h3>
                  <p>{store.address}</p>
                  <div className="store-features">
                    {store.inStorePickup && (
                      <span className="store-feature">Pickup Available</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="store-locator-main">
          <Map 
            stores={searchResults.length > 0 ? searchResults : stores} 
            selectedStore={selectedStore}
            onStoreSelect={handleStoreSelect}
            center={mapCenter}
            zoom={mapZoom}
          />
          
          {selectedStore && (
            <StoreDetails store={selectedStore} />
          )}
        </div>
      </div>
    </div>
  );
}

export default StoreLocatorPage;
