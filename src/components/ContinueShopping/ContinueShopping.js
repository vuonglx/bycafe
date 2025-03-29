import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ContinueShopping.css';

function ContinueShopping() {
  return (
    <div className="continue-shopping">
      <Link to="/" className="continue-link">
        <span className="back-arrow">←</span> Continue Shopping
      </Link>
    </div>
  );
}

export default ContinueShopping;
