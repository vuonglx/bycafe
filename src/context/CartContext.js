/**
 * CartContext.js
 * 
 * This module provides a context for managing the shopping cart functionality
 * across the ByCafe e-commerce application. It uses React Context API to make
 * cart data and operations available throughout the component tree without
 * prop drilling.
 * 
 * The CartProvider component wraps the application and provides:
 * - Access to the current cart items
 * - Functions to add items to the cart
 * 
 * In a complete implementation, this would include additional functionality like:
 * - Removing items from cart
 * - Updating item quantities
 * - Calculating totals
 * - Persisting cart data (localStorage, database, etc.)
 */

import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  /**
   * Adds a product to the shopping cart
   * In a complete implementation, this would handle quantity updates for existing items
   * 
   * @param {Object} product - The product to add to the cart
   */
  const addToCart = (product) => setCart([...cart, product]);
  
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}