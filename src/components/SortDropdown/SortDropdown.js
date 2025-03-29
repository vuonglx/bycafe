/**
 * SortDropdown.js
 * 
 * This component provides a dropdown menu for sorting products in the catalog.
 * It allows users to sort products by various criteria such as popularity,
 * rating, price (low to high or high to low), and newest first.
 * 
 * The component receives the current sort option and a setter function as props,
 * and updates the parent component when the user selects a different option.
 */

import React from 'react';
import '../../styles/SortDropdown.css';

function SortDropdown({ sortBy, setSortBy }) {
  /**
   * Handles the change event when a user selects a different sort option
   * 
   * @param {Object} e - The change event object
   */
  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="sort-dropdown">
      <select 
        value={sortBy} 
        onChange={handleChange}
        className="sort-select"
        aria-label="Sort products by"
      >
        <option value="popularity">Popularity</option>
        <option value="rating">Highest Rated</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="newest">Newest First</option>
      </select>
    </div>
  );
}

export default SortDropdown;
