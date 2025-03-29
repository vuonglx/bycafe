import React from 'react';

const CategoryNav = ({ categories, maxDepth = 2, showIcons = true }) => {
  const renderCategory = (category, depth = 0) => {
    if (depth >= maxDepth) return null;

    return (
      <div key={category.id} className="category-item">
        <div className="category-header">
          {showIcons && category.icon && <span className="category-icon">{category.icon}</span>}
          <span className="category-name">{category.name}</span>
        </div>
        {category.subCategories && (
          <div className="subcategories">
            {category.subCategories.map(sub => renderCategory(sub, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="category-nav">
      <div className="categories-container">
        {categories.map(category => renderCategory(category))}
      </div>
    </nav>
  );
};

export default CategoryNav;
