import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { toast } from 'react-toastify';
import './ProductDetail.css';

const staticProducts = [
  { _id: '1', name: 'Large White', price: 400000, description: 'Healthy Large White breed. Known for excellent meat quality and fast growth. Our Red Duroc pigs are raised on premium feed with regular veterinary care and vaccinations. They are well-adapted to Nigerian climate conditions and have excellent feed conversion ratios.', image: '/images/pig1.jpeg', category: 'pig', breed: 'Duroc', stock: 5 },
  { _id: '2', name: 'Duroc Pig', price: 500000, description: 'Premium Red Duroc breed, 70kg live weight. Excellent temperament, fully vaccinated and dewormed. These pigs have been raised under the best conditions to ensure maximum health and productivity for your farm.', image: '/images/pig2.jpeg', category: 'pig', breed: 'Red Duroc', stock: 4 },
  { _id: '3', name: 'Landrance Pig', price: 600000, description: 'Rare Landrance Pig breed. Famous for its superior Landrance Pig meat — the wagyu of pork. Landrance pigs are known worldwide for the exceptional quality of their meat. A premium choice for serious farmers and meat producers.', image: '/images/pig3.jpeg', category: 'pig', weight: '56kg', breed: 'Landrance', stock: 3 },
  { _id: '4', name: 'Duroc', price: 400000, description: 'Quality Duroc breed. Strong immune system, raised on natural feed and open space. These pigs have excellent growth rates and are perfectly suited for both commercial and subsistence farming.', image: '/images/pig2.jpeg', category: 'pig', breed: 'Duroc', stock: 6 },
  { _id: '5', name: 'Duroc Pig', price: 700000, description: 'Premium mature Duroc. Top-tier genetics with superior growth rate and meat quality. This is our finest Red Duroc specimen, perfect for breeding or high-end meat production.', image: '/images/pig5.jpg', category: 'pig', breed: 'Red Duroc', stock: 2 },
  { _id: '6', name: 'Premium Pig Feed (50kg)', price: 25000, description: 'High-protein balanced pig feed. Contains essential vitamins and minerals for optimal growth. Suitable for all pig breeds and growth stages. Formulated by expert nutritionists for maximum feed efficiency and weight gain.', image: '/images/frontBag.jpg', category: 'feed', weight: '50kg', stock: 100 },
  { _id: '7', name: 'Starter Pig Feed (25kg)', price: 14000, description: 'Specially formulated starter feed for piglets. Promotes healthy early development and strong immune system. Contains probiotics and essential amino acids for the best start in life.', image: '/images/frontBag.jpg', category: 'feed', weight: '25kg', stock: 80 },
  { _id: '8', name: 'Grower Pig Feed (50kg)', price: 22000, description: 'Optimized grower feed for maximum weight gain at reduced cost. Perfect balance of protein, energy, and minerals for pigs in the growing stage. Trusted by farmers across Nigeria.', image: '/images/frontBag.jpg', category: 'feed', weight: '50kg', stock: 120 },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [related, setRelated] = useState([]);

  useEffect(() => {
    // Try to find in static products first
    const found = staticProducts.find(p => p._id === id);
    if (found) {
      setProduct(found);
      setRelated(staticProducts.filter(p => p._id !== id && p.category === found.category).slice(0, 3));
      setLoading(false);
      return;
    }

    // Try backend
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data._id) {
          setProduct(data);
          setRelated(staticProducts.filter(p => p.category === data.category && p._id !== id).slice(0, 3));
        } else {
          navigate('/shop');
        }
      })
      .catch(() => navigate('/shop'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    toast.success(`${quantity}x ${product.name} added to cart! 🛒`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const formatPrice = (price) => `₦${price.toLocaleString()}`;

  const specs = product ? [
    { label: 'Category', value: product.category === 'pig' ? '🐷 Live Pig' : '🌾 Pig Feed' },
   ...(product.category === 'feed' ? [{ label: 'Weight', value: product.weight || 'N/A' }] : []),
    { label: 'Breed', value: product.breed || 'N/A' },
    { label: 'Stock', value: product.stock ? `${product.stock} available` : 'In Stock' },
    { label: 'Delivery', value: 'Nationwide' },
    { label: 'Condition', value: 'Healthy & Certified' },
  ] : [];

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="detail-loading container">
          <div className="detail-skeleton-img" />
          <div className="detail-skeleton-content">
            <div className="skeleton-line long" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line short" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="product-detail-page">

      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/shop">Shop</Link>
            <span>›</span>
            <span className="breadcrumb-current">{product.name}</span>
          </div>
        </div>
      </div>

      {/* MAIN DETAIL */}
      <section className="section detail-section">
        <div className="container">
          <div className="detail-grid">

            {/* IMAGE */}
            <div className="detail-image-wrap">
              <div className="detail-image glass-card">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={e => { e.target.src = 'https://via.placeholder.com/500x500?text=No+Image'; }}
                />
                <div className="detail-image-badge">
                  {product.category === 'pig' ? '🐷 Live Animal' : '🌾 Quality Feed'}
                </div>
              </div>
              <div className="trust-badges glass-card">
                <div className="trust-badge">✅ Vaccinated</div>
                <div className="trust-badge">🚚 Fast Delivery</div>
                <div className="trust-badge">👨‍⚕️ Vet Certified</div>
                <div className="trust-badge">💯 Quality Assured</div>
              </div>
            </div>

            {/* INFO */}
            <div className="detail-info">
              <div className="detail-category-tag">
                {product.category === 'pig' ? '🐷 Live Pig' : '🌾 Pig Feed'}
              </div>

              <h1 className="detail-title">{product.name}</h1>

              {product.breed && (
                <div className="detail-breed">
                  <span>🧬 Breed:</span> <strong>{product.breed}</strong>
                </div>
              )}

              <div className="detail-price">{formatPrice(product.price)}</div>

            {product.weight && product.category === 'feed' && (
  <div className="detail-weight">
    ⚖️ Weight: <strong>{product.weight}</strong>
  </div>
)}

              <p className="detail-desc">{product.description}</p>

              {/* QUANTITY */}
              <div className="detail-qty">
                <label>Quantity:</label>
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="detail-actions">
                <button className="btn btn-primary detail-cart-btn" onClick={handleAddToCart}>
                  🛒 Add to Cart
                </button>
                <button className="btn btn-outline detail-buy-btn" onClick={handleBuyNow}>
                  ⚡ Buy Now
                </button>
              </div>

              <a
                href="https://wa.me/2349028187030"
                target="_blank"
                rel="noreferrer"
                className="detail-whatsapp"
              >
                <span>💬</span>
                <div>
                  <strong>Order via WhatsApp</strong>
                  <small>Chat with us for custom orders & bulk pricing</small>
                </div>
              </a>

              {/* SPECS */}
              <div className="detail-specs">
                {specs.map((spec, i) => (
                  <div key={i} className="spec-item">
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* TABS */}
          <div className="detail-tabs glass-card">
            <div className="tabs-header">
              {['description', 'care', 'delivery'].map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'description' && '📋 Description'}
                  {tab === 'care' && '❤️ Care Tips'}
                  {tab === 'delivery' && '🚚 Delivery Info'}
                </button>
              ))}
            </div>
            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="tab-pane">
                  <h3>Product Description</h3>
                  <p>{product.description}</p>
                  {product.category === 'pig' && (
                    <ul className="detail-list">
                      <li>Fully vaccinated against common pig diseases</li>
                      <li>Dewormed and certified healthy by our veterinarian</li>
                      <li>Raised on premium quality balanced feed</li>
                      <li>Well adapted to Nigerian climate conditions</li>
                      <li>Excellent feed-to-weight conversion ratio</li>
                    </ul>
                  )}
                  {product.category === 'feed' && (
                    <ul className="detail-list">
                      <li>High protein content for optimal growth</li>
                      <li>Contains essential vitamins and minerals</li>
                      <li>Formulated by expert animal nutritionists</li>
                      <li>Suitable for all Nigerian pig breeds</li>
                      <li>Improves feed efficiency and reduces cost</li>
                    </ul>
                  )}
                </div>
              )}
              {activeTab === 'care' && (
                <div className="tab-pane">
                  <h3>{product.category === 'pig' ? 'Pig Care Tips' : 'Feed Storage Tips'}</h3>
                  {product.category === 'pig' ? (
                    <ul className="detail-list">
                      <li>Feed 2–3 times daily with clean fresh water always available</li>
                      <li>Keep the pen clean, dry and well ventilated</li>
                      <li>Vaccinate every 6 months as recommended by vet</li>
                      <li>Deworm every 3 months to prevent parasites</li>
                      <li>Monitor weight weekly for healthy growth tracking</li>
                      <li>Isolate new animals for 2 weeks before mixing with herd</li>
                    </ul>
                  ) : (
                    <ul className="detail-list">
                      <li>Store in a cool, dry place away from direct sunlight</li>
                      <li>Keep bags sealed to prevent moisture and pests</li>
                      <li>Use within 3 months of purchase for best results</li>
                      <li>Do not mix with other feeds without vet consultation</li>
                      <li>Ensure clean feeding troughs to prevent contamination</li>
                    </ul>
                  )}
                </div>
              )}
              {activeTab === 'delivery' && (
                <div className="tab-pane">
                  <h3>Delivery Information</h3>
                  <ul className="detail-list">
                    <li>We deliver to all 36 states across Nigeria</li>
                    <li>Live pigs are transported in safe, ventilated vehicles</li>
                    <li>Delivery typically takes 1–3 business days</li>
                    <li>Delivery fee is calculated based on your location</li>
                    <li>You will be contacted before delivery for confirmation</li>
                    <li>Farm pickup is also available — contact us to arrange</li>
                  </ul>
                  <div className="delivery-contact">
                    <p>📱 For delivery enquiries: <strong>09028187030</strong></p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          {related.length > 0 && (
            <div className="related-section">
              <h2 className="section-title">Related Products</h2>
              <div className="related-grid">
                {related.map(p => (
                  <Link key={p._id} to={`/shop/${p._id}`} className="related-card glass-card">
                    <div className="related-img">
                      <img
                        src={p.image}
                        alt={p.name}
                        onError={e => { e.target.src = 'https://via.placeholder.com/200x150'; }}
                      />
                    </div>
                    <div className="related-info">
                      <h4>{p.name}</h4>
                      {p.breed && <span>{p.breed}</span>}
                      <strong>{formatPrice(p.price)}</strong>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}