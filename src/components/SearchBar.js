import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, onVoiceSearch, maxRecentSearches = 5, suggestionsLimit = 10 }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    await onSearch(query);
    
    const updated = [query, ...recentSearches.filter(s => s !== query)]
      .slice(0, maxRecentSearches);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleVoiceSearch = async () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser');
      return;
    }
    setIsVoiceActive(true);
    // Implement voice recognition logic here
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
      {onVoiceSearch && (
        <button 
          onClick={handleVoiceSearch}
          className={`voice-search ${isVoiceActive ? 'active' : ''}`}
        >
          🎤
        </button>
      )}
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h4>Recent Searches</h4>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index} onClick={() => setQuery(search)}>
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
