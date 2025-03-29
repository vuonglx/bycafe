// src/components/CategoryCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoryCard.css';

function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category.slug}`} className="category-card">
      <div 
        className="category-image" 
        style={{ backgroundImage: `url(${category.image})` }}
      ></div>
      
      {category.icon && (
        <span className="category-icon">{category.icon}</span>
      )}
      
      <div className="category-info">
        <h3>{category.name}</h3>
        {category.productCount && (
          <p>{category.productCount} products</p>
        )}
      </div>
    </Link>
  );
}

export default CategoryCard;