// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-main">
          <div className="footer-section brand">
            <h3>ByCafe</h3>
            <p>Your one-stop shop for premium coffee and accessories.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <span className="social-icon">📘</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <span className="social-icon">📱</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <span className="social-icon">📷</span>
              </a>
            </div>
          </div>
          
          <div className="footer-section links">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/catalog">All Products</Link></li>
              <li><Link to="/catalog?category=coffee">Coffee</Link></li>
              <li><Link to="/catalog?category=equipment">Equipment</Link></li>
              <li><Link to="/catalog?category=accessories">Accessories</Link></li>
            </ul>
          </div>
          
          <div className="footer-section links">
            <h4>Account</h4>
            <ul>
              <li><Link to="/account">My Account</Link></li>
              <li><Link to="/account?tab=orders">Order History</Link></li>
              <li><Link to="/account?tab=wishlist">Wishlist</Link></li>
              <li><Link to="/loyalty">Loyalty Program</Link></li>
            </ul>
          </div>
          
          <div className="footer-section links">
            <h4>Information</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/store-locator">Store Locator</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          
          <div className="footer-section contact">
            <h4>Contact</h4>
            <address>
              <p>123 Coffee Street</p>
              <p>Seattle, WA 98101</p>
              <p>Email: <a href="mailto:support@bycafe.com">support@bycafe.com</a></p>
              <p>Phone: <a href="tel:+1234567890">(123) 456-7890</a></p>
            </address>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {currentYear} ByCafe. All rights reserved.
          </div>
          <div className="legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/shipping">Shipping Policy</Link>
          </div>
          <div className="payment-methods">
            <span className="payment-icon">💳</span>
            <span className="payment-icon">💰</span>
            <span className="payment-icon">🏦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;