import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
function ShoppingCart() {  const { cart } = useContext(CartContext);
  return (
    <div className="shopping-cart">      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (        <p>Your cart is empty</p>
      ) : (        <div className="cart-items">
          {cart.map(item => (            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />              <h3>{item.name}</h3>
              <p>${item.price}</p>            </div>
          ))}        </div>
      )}    </div>
  );}

export default ShoppingCart;














