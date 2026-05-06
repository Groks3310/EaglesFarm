import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { toast } from 'react-toastify';
import './Cart.css';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => `₦${price.toLocaleString()}`;

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.info(`${name} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.info('Cart cleared');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <section className="page-hero">
          <div className="container">
            <span className="tag" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              My Cart
            </span>
            <h1 style={{ marginTop: '12px' }}>Shopping Cart</h1>
            <p>Review your selected items before checkout</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="empty-cart glass-card">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your Cart is Empty</h2>
              <p>You haven't added any products yet. Browse our shop to find premium pigs and feeds!</p>
              <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>
                🐷 Browse Shop
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <section className="page-hero">
        <div className="container">
          <span className="tag" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
            My Cart
          </span>
          <h1 style={{ marginTop: '12px' }}>Shopping Cart</h1>
          <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cart-layout">

            {/* CART ITEMS */}
            <div className="cart-items">
              <div className="cart-header-row">
                <h2>Cart Items</h2>
                <button className="clear-cart-btn" onClick={handleClearCart}>
                  🗑️ Clear All
                </button>
              </div>

              {cartItems.map(item => (
                <div key={item._id} className="cart-item glass-card">
                  <div className="cart-item-img">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={e => { e.target.src = 'https://via.placeholder.com/100x100?text=No+Image'; }}
                    />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-badge">
                      {item.category === 'pig' ? '🐷 Live Pig' : '🌾 Feed'}
                    </div>
                    <h3>{item.name}</h3>
                    {item.breed && <p className="cart-item-meta">Breed: {item.breed}</p>}
                    {item.weight && <p className="cart-item-meta">Weight: {item.weight}</p>}
                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="cart-item-subtotal">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item._id, item.name)}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-continue">
                <Link to="/shop" className="btn btn-outline">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="cart-summary">
              <div className="summary-card glass-card">
                <h2>Order Summary</h2>

                <div className="summary-lines">
                  {cartItems.map(item => (
                    <div key={item._id} className="summary-line">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="summary-divider" />

                <div className="summary-line subtotal">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="summary-line">
                  <span>Delivery Fee</span>
                  <span className="delivery-note">Calculated at checkout</span>
                </div>

                <div className="summary-divider" />

                <div className="summary-line total">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <button
                  className="btn btn-primary checkout-btn"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout →
                </button>

                <div className="summary-badges">
                  <span>🔒 Secure Checkout</span>
                  <span>🚚 Nigeria-wide Delivery</span>
                  <span>✅ Quality Guaranteed</span>
                </div>

                <div className="summary-whatsapp">
                  <p>Prefer to order via WhatsApp?</p>
                  <a
                    href="https://wa.me/2349028187030"
                    target="_blank"
                    rel="noreferrer"
                    className="wa-order-btn"
                  >
                    💬 Order on WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}