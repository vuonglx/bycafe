
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterPanel from '../components/FilterPanel/FilterPanel';

describe('FilterPanel Component', () => {
  const mockFilters = {};
  const mockSetFilters = jest.fn();
  const mockCategories = ['Coffee Beans', 'Brewing Equipment', 'Accessories'];
  const mockOrigins = ['Ethiopia', 'Colombia', 'Brazil'];
  const mockRoastLevels = ['Light', 'Medium', 'Dark'];

  beforeEach(() => {
    mockSetFilters.mockClear();
  });

  test('renders filter options correctly', () => {
    render(
      <FilterPanel 
        filters={mockFilters}
        setFilters={mockSetFilters}
        categories={mockCategories}
        origins={mockOrigins}
        roastLevels={mockRoastLevels}
      />
    );
    
    // Check if filter sections are rendered
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Origin')).toBeInTheDocument();
    expect(screen.getByText('Roast Level')).toBeInTheDocument();
    
    // Check if filter options are rendered
    mockCategories.forEach(category => {
      expect(screen.getByLabelText(category)).toBeInTheDocument();
    });
  });

  test('updates filters when options are selected', () => {
    render(
      <FilterPanel 
        filters={mockFilters}
        setFilters={mockSetFilters}
        categories={mockCategories}
        origins={mockOrigins}
        roastLevels={mockRoastLevels}
      />
    );
    
    // Select a category filter
    fireEvent.click(screen.getByLabelText('Coffee Beans'));
    
    // Check if setFilters was called with the correct arguments
    expect(mockSetFilters).toHaveBeenCalledWith(
      expect.objectContaining({ category: 'Coffee Beans' })
    );
  });

  test('clears all filters', () => {
    render(
      <FilterPanel 
        filters={{ category: 'Coffee Beans' }}
        setFilters={mockSetFilters}
        categories={mockCategories}
        origins={mockOrigins}
        roastLevels={mockRoastLevels}
      />
    );
    
    // Click the clear filters button
    fireEvent.click(screen.getByText('Clear Filters'));
    
    // Check if setFilters was called with an empty object
    expect(mockSetFilters).toHaveBeenCalledWith({});
  });
});
