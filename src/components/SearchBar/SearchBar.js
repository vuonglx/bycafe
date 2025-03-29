/**
 * SearchBar.js
 * 
 * This component provides a search functionality for the product catalog.
 * It includes features such as:
 * - Real-time search suggestions
 * - Recent search history
 * - Clear search button
 * 
 * The component manages its own state for the search query and suggestions display,
 * while passing search queries to the parent component via the onSearch callback.
 */

import React, { useState } from 'react';
import '../../styles/SearchBar.css';

function SearchBar({ onSearch, maxRecentSearches = 5, suggestionsLimit = 10, placeholder = "Search..." }) {
  // State for managing the search query and suggestions visibility
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Sample suggestions - in a real app, these would be fetched from an API
  const suggestions = [
    'Ethiopian Coffee',
    'Dark Roast',
    'Coffee Grinder',
    'Pour Over Kit',
    'Coffee Beans',
    'Espresso Machine',
    'French Press',
    'Colombian Coffee',
    'Coffee Mug',
    'Gift Set'
  ];
  
  // Sample recent searches - in a real app, these would be stored in localStorage or a database
  const [recentSearches, setRecentSearches] = useState([
    'Coffee Beans',
    'Espresso',
    'Brewing Equipment'
  ]);
  
  /**
   * Handles changes to the search input field
   * Shows suggestions when the input has content
   * 
   * @param {Object} e - The input change event
   */
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };
  
  /**
   * Processes a search query and updates recent searches
   * 
   * @param {string} searchQuery - The search term to process
   */
  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    onSearch(searchQuery);
    setShowSuggestions(false);
    
    // Add to recent searches if not already there
    if (!recentSearches.includes(searchQuery)) {
      const updatedSearches = [searchQuery, ...recentSearches].slice(0, maxRecentSearches);
      setRecentSearches(updatedSearches);
    }
  };
  
  /**
   * Handles form submission for the search
   * 
   * @param {Object} e - The form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };
  
  /**
   * Handles clicks on suggestion items
   * 
   * @param {string} suggestion - The selected suggestion
   */
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };
  
  /**
   * Clears the current search query
   */
  const handleClearSearch = () => {
    setQuery('');
    onSearch('');
    setShowSuggestions(false);
  };
  
  // Filter suggestions based on input
  const filteredSuggestions = suggestions
    .filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, suggestionsLimit);

  return (
    <div className="search-bar">
      {/* Search input form */}
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="search-input"
          onFocus={() => query && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        
        {/* Clear button - only shown when there's a query */}
        {query && (
          <button 
            type="button" 
            className="clear-button"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
        
        {/* Search button */}
        <button 
          type="submit" 
          className="search-button"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
      
      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="suggestions-container">
          {/* Filtered suggestions based on current query */}
          {query && filteredSuggestions.length > 0 && (
            <div className="suggestions-section">
              <h4>Suggestions</h4>
              <ul className="suggestions-list">
                {filteredSuggestions.map((suggestion, index) => (
                  <li key={`suggestion-${index}`}>
                    <button 
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="suggestion-item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Recent searches section */}
          {recentSearches.length > 0 && (
            <div className="suggestions-section">
              <h4>Recent Searches</h4>
              <ul className="suggestions-list">
                {recentSearches.map((search, index) => (
                  <li key={`recent-${index}`}>
                    <button 
                      onClick={() => handleSuggestionClick(search)}
                      className="suggestion-item recent"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 4 1 10 7 10"></polyline>
                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                      </svg>
                      {search}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
