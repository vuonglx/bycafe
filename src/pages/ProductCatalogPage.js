/**
 * ProductCatalogPage.js
 * 
 * This component renders the main product catalog page of the ByCafe e-commerce application.
 * It integrates filtering, sorting, and search functionality to allow users to browse products.
 * 
 * The page layout includes:
 * - A header section with title and description
 * - A sidebar with filtering options
 * - A main content area with search, sorting, and product grid
 */

import React from 'react';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import SortDropdown from '../components/SortDropdown/SortDropdown';
import SearchBar from '../components/SearchBar/SearchBar';
import '../styles/ProductCatalogPage.css';

function ProductCatalogPage() {
  // State for managing filters, sorting, and search
  const [filters, setFilters] = React.useState({});
  const [sortBy, setSortBy] = React.useState('popularity');
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="product-catalog-page">
      {/* Page header with title and description */}
      <div className="catalog-header">
        <h1>Our Products</h1>
        <p>Discover our premium selection of coffee and accessories</p>
      </div>
      
      <div className="catalog-container">
        {/* Left sidebar with filters and sorting options */}
        <div className="filters-panel">
          <h2>Filters</h2>
          <FilterPanel filters={filters} setFilters={setFilters} />
          <div className="sort-section">
            <h3>Sort By</h3>
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
        
        {/* Main content area with search and product grid */}
        <div className="products-section">
          <div className="search-and-results">
            <SearchBar 
              onSearch={setSearchQuery}
              maxRecentSearches={5}
              suggestionsLimit={10}
              placeholder="Search for products..."
            />
            <div className="results-info">
              <span className="results-count">24 products found</span>
            </div>
          </div>
          
          {/* Product grid displays filtered and sorted products */}
          <ProductGrid 
            filters={filters}
            sortBy={sortBy}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCatalogPage;
