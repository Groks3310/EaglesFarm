import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import './Checkout.css';

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
 const [step, setStep] = useState(1);
const [loading, setLoading] = useState(false);
const [orderTotal, setOrderTotal] = useState(0);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.username || '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });

  const nigerianStates = [
    'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
    'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
    'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
    'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
    'Yobe','Zamfara',
  ];

  const formatPrice = (price) => `₦${price.toLocaleString()}`;

  const handleShippingChange = (e) => {
    setShippingInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city || !shippingInfo.state) {
      toast.error('Please fill in all shipping fields');
      return;
    }
    setStep(2);
    window.scrollTo(0, 0);
  };

const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }
    setLoading(true);
    setOrderTotal(total);
    try {
      await axios.post('/api/orders', {
        items: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total,
        shippingInfo,
      });

      // Notify owner via WhatsApp
      const orderMessage = cartItems.map(item =>
        `• ${item.name} x${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}`
      ).join('\n');

      const whatsappMessage = encodeURIComponent(
        `🐷 NEW ORDER ALERT!\n\n` +
        `👤 Customer: ${shippingInfo.fullName}\n` +
        `📱 Phone: ${shippingInfo.phone}\n` +
        `📍 Address: ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}\n\n` +
        `🛒 Items Ordered:\n${orderMessage}\n\n` +
        `💰 Total: ₦${total.toLocaleString()}\n\n` +
        `Please confirm this order!`
      );

      window.open(`https://wa.me/2349028187030?text=${whatsappMessage}`, '_blank');

      clearCart();
      setStep(3);
      window.scrollTo(0, 0);
    } catch {
      // Send WhatsApp even if backend fails
      const orderMessage = cartItems.map(item =>
        `• ${item.name} x${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}`
      ).join('\n');

      const whatsappMessage = encodeURIComponent(
        `🐷 NEW ORDER ALERT!\n\n` +
        `👤 Customer: ${shippingInfo.fullName}\n` +
        `📱 Phone: ${shippingInfo.phone}\n` +
        `📍 Address: ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}\n\n` +
        `🛒 Items Ordered:\n${orderMessage}\n\n` +
        `💰 Total: ₦${total.toLocaleString()}\n\n` +
        `Please confirm this order!`
      );

      window.open(`https://wa.me/2349028187030?text=${whatsappMessage}`, '_blank');

      clearCart();
      setStep(3);
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && step !== 3) {
    navigate('/shop');
    return null;
  }

  return (
    <div className="checkout-page">
      <section className="page-hero">
        <div className="container">
          <span className="tag" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
            Checkout
          </span>
          <h1 style={{ marginTop: '12px' }}>Complete Your Order</h1>
          <p>You're just a few steps away from your premium pigs!</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* STEPS INDICATOR */}
          {step !== 3 && (
            <div className="steps-indicator">
              <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
                <div className="step-circle">{step > 1 ? '✓' : '1'}</div>
                <span>Shipping</span>
              </div>
              <div className="step-line" />
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-circle">2</div>
                <span>Review</span>
              </div>
              <div className="step-line" />
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-circle">3</div>
                <span>Confirm</span>
              </div>
            </div>
          )}

          {/* STEP 1 — SHIPPING */}
          {step === 1 && (
            <div className="checkout-layout">
              <div className="checkout-main glass-card">
                <h2>Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="checkout-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleShippingChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        placeholder="08012345678"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Delivery Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      placeholder="House number, street name"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        placeholder="Your city"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <select
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingChange}
                        required
                      >
                        <option value="">Select State</option>
                        {nigerianStates.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary checkout-next-btn">
                    Continue to Review →
                  </button>
                </form>
              </div>
              <CheckoutSummary cartItems={cartItems} total={total} formatPrice={formatPrice} />
            </div>
          )}

          {/* STEP 2 — REVIEW */}
          {step === 2 && (
            <div className="checkout-layout">
              <div className="checkout-main">

                <div className="review-section glass-card">
                  <div className="review-header">
                    <h2>Shipping Details</h2>
                    <button className="edit-btn" onClick={() => setStep(1)}>✏️ Edit</button>
                  </div>
                  <div className="review-info">
                    <p><strong>Name:</strong> {shippingInfo.fullName}</p>
                    <p><strong>Phone:</strong> {shippingInfo.phone}</p>
                    <p><strong>Address:</strong> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}</p>
                  </div>
                </div>

                <div className="review-section glass-card" style={{ marginTop: '20px' }}>
                  <h2>Order Items</h2>
                  {cartItems.map(item => (
                    <div key={item._id} className="review-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={e => { e.target.src = 'https://via.placeholder.com/60x60'; }}
                      />
                      <div className="review-item-info">
                        <strong>{item.name}</strong>
                        {item.breed && <span>{item.breed}</span>}
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <strong className="review-item-price">
                        {formatPrice(item.price * item.quantity)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="payment-note glass-card">
                  <div className="payment-note-icon">💳</div>
                  <div>
                    <h3>Payment on Delivery</h3>
                    <p>
                      Pay via bank transfer or cash when your order arrives.
                      Our team will contact you with payment details after order confirmation.
                    </p>
                  </div>
                </div>

                <button
                  className="btn btn-primary place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? '⏳ Placing Order...' : '✅ Place Order'}
                </button>
              </div>
              <CheckoutSummary cartItems={cartItems} total={total} formatPrice={formatPrice} />
            </div>
          )}

          {/* STEP 3 — SUCCESS */}
          {step === 3 && (
            <div className="order-success glass-card">
              <div className="success-icon">🎉</div>
              <h2>Order Placed Successfully!</h2>
              <p>
                Thank you for your order! Our team will contact you shortly on
                <strong> {shippingInfo.phone}</strong> to confirm delivery details.
              </p>
              <div className="success-info">
                <div className="success-info-item">
                  <span>📍</span>
                  <div>
                    <strong>Delivery Address</strong>
                    <p>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}</p>
                  </div>
                </div>
                <div className="success-info-item">
                  <span>💰</span>
                  <div>
                    <strong>Order Total</strong>
                    <p>{formatPrice(orderTotal)}</p>
                  </div>
                </div>
                <div className="success-info-item">
                  <span>📦</span>
                  <div>
                    <strong>Status</strong>
                    <p>Pending Confirmation</p>
                  </div>
                </div>
              </div>
              <div className="success-actions">
                <a
                  href="https://wa.me/2349028187030"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  💬 Track via WhatsApp
                </a>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate('/shop')}
                >
                  🛒 Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

function CheckoutSummary({ cartItems, total, formatPrice }) {
  return (
    <div className="checkout-summary glass-card">
      <h2>Order Summary</h2>
      <div className="summary-items">
        {cartItems.map(item => (
          <div key={item._id} className="summary-item">
            <img
              src={item.image}
              alt={item.name}
              onError={e => { e.target.src = 'https://via.placeholder.com/50x50'; }}
            />
            <div className="summary-item-info">
              <span>{item.name}</span>
              <small>× {item.quantity}</small>
            </div>
            <strong>{formatPrice(item.price * item.quantity)}</strong>
          </div>
        ))}
      </div>
      <div className="summary-divider" />
      <div className="summary-total">
        <span>Total</span>
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  );
}