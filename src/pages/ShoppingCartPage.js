import React from 'react';
import CartItems from '../components/CartItems/CartItems';
import PriceBreakdown from '../components/PriceBreakdown/PriceBreakdown';
import CheckoutButton from '../components/CheckoutButton/CheckoutButton';
import ContinueShopping from '../components/ContinueShopping/ContinueShopping';
import '../styles/ShoppingCartPage.css';

function ShoppingCartPage() {
  // Mock cart data
  const cartItems = [
    {
      id: '1',
      name: 'Premium Product',
      price: 99.99,
      imageUrl: 'https://via.placeholder.com/100',
      quantity: 2,
      maxQuantity: 10
    },
    {
      id: '2',
      name: 'Budget Option',
      price: 49.99,
      imageUrl: 'https://via.placeholder.com/100',
      quantity: 1,
      maxQuantity: 5
    }
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: 5.99 },
    { id: 'express', name: 'Express Shipping', price: 12.99 },
    { id: 'free', name: 'Free Shipping (orders over $100)', price: 0 }
  ];
  const selectedShipping = subtotal >= 100 ? 'free' : 'standard';
  const shippingCost = shippingOptions.find(option => option.id === selectedShipping).price;
  const total = subtotal + tax + shippingCost;

  const handleQuantityChange = (itemId, newQuantity) => {
    // In a real app, this would update the cart state or call an API
    console.log(`Updated quantity for item ${itemId} to ${newQuantity}`);
  };

  const handleRemoveItem = (itemId) => {
    // In a real app, this would remove the item from the cart
    console.log(`Removed item ${itemId} from cart`);
  };

  const handleSaveForLater = (itemId) => {
    // In a real app, this would move the item to a saved items list
    console.log(`Saved item ${itemId} for later`);
  };

  return (
    <div className="shopping-cart">
      <h1>Your Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items-container">
          <CartItems 
            items={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
            onSaveForLater={handleSaveForLater}
          />
          <ContinueShopping />
        </div>
        
        <div className="cart-summary">
          <PriceBreakdown 
            subtotal={subtotal}
            tax={tax}
            shippingOptions={shippingOptions}
            selectedShipping={selectedShipping}
            total={total}
          />
          <CheckoutButton total={total} />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartPage;
