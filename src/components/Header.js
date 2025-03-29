// src/components/Header.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-logo">
          <Link to="/">ByCafe</Link>
        </div>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="menu-icon">{mobileMenuOpen ? '✕' : '☰'}</span>
        </button>
        
        <nav className={`header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/catalog" className={isActive('/catalog')}>Catalog</Link>
          <Link to="/cart" className={isActive('/cart')}>Cart</Link>
          <Link to="/account" className={isActive('/account')}>Account</Link>
          <Link to="/loyalty" className={isActive('/loyalty')}>Loyalty</Link>
          <Link to="/store-locator" className={isActive('/store-locator')}>Stores</Link>
        </nav>
        
        <div className="header-actions">
          <div className="header-search">
            <input type="text" placeholder="Search..." />
            <button className="search-button" aria-label="Search">
              <span className="search-icon">🔍</span>
            </button>
          </div>
          <Link to="/cart" className="cart-icon" aria-label="Shopping Cart">
            🛒
            <span className="cart-count">3</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;