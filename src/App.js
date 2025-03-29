// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserAccountPage from './pages/UserAccountPage';
import CustomerLoyaltyPage from './pages/CustomerLoyaltyPage';
import StoreLocatorPage from './pages/StoreLocatorPage';
import ProductCatalogPage from './pages/ProductCatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './styles/global.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<ProductCatalogPage />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<UserAccountPage />} />
            <Route path="/loyalty" element={<CustomerLoyaltyPage />} />
            <Route path="/store-locator" element={<StoreLocatorPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;