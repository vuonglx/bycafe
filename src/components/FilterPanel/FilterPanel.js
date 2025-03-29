/**
 * FilterPanel.js
 * 
 * This component provides filtering options for the product catalog.
 * It displays various filter categories (product category, roast level, origin, etc.)
 * and allows users to select multiple options within each category.
 * 
 * The component manages the selected filters and provides a reset option
 * to clear all selected filters at once.
 */

import React from 'react';
import '../../styles/FilterPanel.css';

// Filter options organized by category
// In a real application, these would likely come from an API
const filterOptions = {
  category: ['Coffee Beans', 'Brewing Equipment', 'Accessories', 'Gift Sets'],
  roastLevel: ['Light Roast', 'Medium Roast', 'Dark Roast', 'Espresso Roast'],
  origin: ['Ethiopia', 'Colombia', 'Brazil', 'Guatemala', 'Kenya'],
  price: ['Under $15', '$15 - $30', '$30 - $50', 'Over $50'],
  flavor: ['Fruity', 'Nutty', 'Chocolatey', 'Floral', 'Spicy'],
  availability: ['In Stock', 'Limited Edition']
};

function FilterPanel({ filters, setFilters }) {
  /**
   * Handles the selection/deselection of a filter option
   * 
   * @param {string} filterType - The category of the filter (e.g., 'category', 'price')
   * @param {string} value - The specific filter value being toggled
   */
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType]?.includes(value)
        ? prev[filterType].filter(v => v !== value) // Remove if already selected
        : [...(prev[filterType] || []), value]      // Add if not selected
    }));
  };

  /**
   * Resets all filters to their default state (empty)
   */
  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <div className="filter-panel">
      {/* Render each filter category */}
      {Object.entries(filterOptions).map(([filterType, options]) => (
        <div key={filterType} className="filter-group">
          <h3>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
          <div className="filter-options">
            {options.map(option => (
              <label key={option} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters[filterType]?.includes(option) || false}
                  onChange={() => handleFilterChange(filterType, option)}
                />
                <span className="option-label">{option}</span>
                <span className="option-count">(12)</span> {/* In a real app, this would be dynamic */}
              </label>
            ))}
          </div>
        </div>
      ))}
      
      {/* Reset filters button */}
      <div className="filter-actions">
        <button className="btn-reset" onClick={handleResetFilters}>Reset Filters</button>
      </div>
    </div>
  );
}

export default FilterPanel;
