import React from 'react';
import '../../styles/Wishlist.css';

function Wishlist({ items }) {
  const handleAddToCart = (item) => {
    // In a real app, this would add the item to the cart
    console.log(`Added ${item.name} to cart`);
    alert(`${item.name} added to cart!`);
  };
  
  const handleRemoveFromWishlist = (itemId) => {
    // In a real app, this would remove the item from the wishlist
    console.log(`Removed item ${itemId} from wishlist`);
  };
  
  const handleShareWishlist = () => {
    // In a real app, this would generate a shareable link
    const shareableLink = `https://example.com/wishlist/share/${Math.random().toString(36).substring(2, 15)}`;
    navigator.clipboard.writeText(shareableLink);
    alert(`Shareable link copied to clipboard: ${shareableLink}`);
  };
  
  return (
    <div className="wishlist">
      <div className="wishlist-header">
        <h2>My Wishlist</h2>
        {items.length > 0 && (
          <button 
            className="share-wishlist-button"
            onClick={handleShareWishlist}
          >
            Share Wishlist
          </button>
        )}
      </div>
      
      {items.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty.</p>
          <a href="/" className="browse-products-link">Browse Products</a>
        </div>
      ) : (
        <>
          <div className="wishlist-items">
            {items.map(item => (
              <div key={item.id} className="wishlist-item">
                <div className="item-image">
                  <img src={item.imageUrl} alt={item.name} />
                  {!item.inStock && (
                    <div className="out-of-stock-badge">Out of Stock</div>
                  )}
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="item-price">${item.price.toFixed(2)}</div>
                  
                  <div className="item-actions">
                    <button 
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                    >
                      {item.inStock ? 'Add to Cart' : 'Notify When Available'}
                    </button>
                    
                    <button 
                      className="remove-button"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="wishlist-actions">
            <button 
              className="add-all-to-cart-button"
              onClick={() => {
                const inStockItems = items.filter(item => item.inStock);
                inStockItems.forEach(item => handleAddToCart(item));
              }}
            >
              Add All to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Wishlist;
