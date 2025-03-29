import React, { useEffect, useRef } from 'react';
import '../../styles/Map.css';

function Map({ stores, selectedStore, onStoreSelect, center, zoom }) {
  const mapRef = useRef(null);
  
  useEffect(() => {
    // In a real implementation, this would initialize a map library like Google Maps or Mapbox
    // For this prototype, we'll create a simulated map interface
    
    const initMap = () => {
      if (!mapRef.current) return;
      
      // Clear any existing content
      mapRef.current.innerHTML = '';
      
      // Create the simulated map container
      const mapContainer = document.createElement('div');
      mapContainer.className = 'simulated-map';
      
      // Add a note about the map implementation
      const mapNote = document.createElement('div');
      mapNote.className = 'map-note';
      mapNote.textContent = `Map centered at lat: ${center.lat.toFixed(4)}, lng: ${center.lng.toFixed(4)} with zoom level: ${zoom}`;
      mapContainer.appendChild(mapNote);
      
      // Add store markers
      stores.forEach(store => {
        const marker = document.createElement('div');
        marker.className = `map-marker ${selectedStore && selectedStore.id === store.id ? 'selected' : ''}`;
        
        // Position the marker based on coordinates (simplified for prototype)
        // In a real map, we would use the actual lat/lng to position
        const latOffset = (store.coordinates.lat - center.lat) * 10;
        const lngOffset = (store.coordinates.lng - center.lng) * 10;
        
        marker.style.top = `calc(50% - ${latOffset * zoom}px)`;
        marker.style.left = `calc(50% + ${lngOffset * zoom}px)`;
        
        marker.textContent = store.name;
        
        marker.addEventListener('click', () => onStoreSelect(store));
        
        mapContainer.appendChild(marker);
      });
      
      // Add the map container to the ref
      mapRef.current.appendChild(mapContainer);
    };
    
    initMap();
    
    // In a real implementation, we would clean up the map instance on unmount
    return () => {
      // Cleanup would happen here
    };
  }, [stores, selectedStore, center, zoom, onStoreSelect]);
  
  return (
    <div className="map-component">
      <div className="map-container" ref={mapRef}>
        <div className="map-loading">Loading map...</div>
      </div>
      <div className="map-note-implementation">
        <p>Note: This is a simulated map interface. In a production environment, this would be replaced with a real mapping API like Google Maps, Mapbox, or Leaflet.</p>
      </div>
    </div>
  );
}

export default Map;
