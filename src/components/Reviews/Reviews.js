import React, { useState } from 'react';
import '../../styles/Reviews.css';

// Mock data for reviews
const mockReviews = [
  {
    id: '1',
    userName: 'John Doe',
    rating: 5,
    date: '2025-03-15',
    title: 'Excellent product!',
    content: 'This product exceeded my expectations. The quality is outstanding and it works perfectly.',
    helpful: 12
  },
  {
    id: '2',
    userName: 'Jane Smith',
    rating: 4,
    date: '2025-03-10',
    title: 'Great value',
    content: 'Good quality for the price. Would recommend to others looking for a reliable option.',
    helpful: 8
  },
  {
    id: '3',
    userName: 'Mike Johnson',
    rating: 3,
    date: '2025-03-05',
    title: 'Decent product',
    content: 'It works as expected, but nothing extraordinary. Packaging could be improved.',
    helpful: 3
  }
];

function Reviews({ productId }) {
  const [reviews] = useState(mockReviews);
  const [sortBy, setSortBy] = useState('newest');

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'helpful') {
      return b.helpful - a.helpful;
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else if (sortBy === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });

  return (
    <div className="reviews-section">
      <h2>Customer Reviews</h2>
      
      <div className="reviews-summary">
        <div className="average-rating">
          <span className="rating-value">{averageRating.toFixed(1)}</span>
          <div className="stars">
            {[1, 2, 3, 4, 5].map(star => (
              <span 
                key={star} 
                className={`star ${star <= Math.round(averageRating) ? 'filled' : 'empty'}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="review-count">{reviews.length} reviews</span>
        </div>
        
        <div className="sort-options">
          <label htmlFor="sort-select">Sort by:</label>
          <select 
            id="sort-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="helpful">Most Helpful</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </div>
      
      <div className="reviews-list">
        {sortedReviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="user-info">
                <span className="user-name">{review.userName}</span>
                <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <div className="review-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <span 
                    key={star} 
                    className={`star ${star <= review.rating ? 'filled' : 'empty'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            
            <h3 className="review-title">{review.title}</h3>
            <p className="review-content">{review.content}</p>
            
            <div className="review-footer">
              <button className="helpful-button">
                Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="write-review">
        <button className="write-review-button">Write a Review</button>
      </div>
    </div>
  );
}

export default Reviews;
