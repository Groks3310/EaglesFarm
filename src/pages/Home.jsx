import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';
import './Home.css';

export default function Home() {
 const staticFeatured = [
  { _id: '1', name: 'Red Duroc Pig (50kg)', price: 400000, description: 'Healthy Red Duroc breed, 50kg live weight. Known for excellent meat quality and fast growth.', image: '/images/pig1.jpg', category: 'pig', weight: '50kg', breed: 'Red Duroc' },
  { _id: '2', name: 'Red Duroc Pig (70kg)', price: 500000, description: 'Premium Red Duroc breed, 70kg live weight. Excellent temperament, fully vaccinated.', image: '/images/pig2.jpg', category: 'pig', weight: '70kg', breed: 'Red Duroc' },
  { _id: '3', name: 'Marbled Berkshire Pig', price: 600000, description: 'Rare Marbled Berkshire breed, 56kg. Famous for its superior marbled meat.', image: '/images/pig3.jpg', category: 'pig', weight: '56kg', breed: 'Marbled Berkshire' },
  { _id: '6', name: 'Premium Pig Feed (50kg)', price: 25000, description: 'High-protein balanced pig feed with essential vitamins and minerals for optimal growth.', image: '/images/frontBag.jpg', category: 'feed', weight: '50kg' },
];

const [featuredProducts, setFeaturedProducts] = useState(staticFeatured);
const [loading, setLoading] = useState(false);

  useEffect(() => {
  axios.get('/api/products')
    .then(res => {
      const data = Array.isArray(res.data) ? res.data : [];
      if (data.length > 0) {
        setFeaturedProducts(data.slice(0, 4));
      }
    })
    .catch(() => {
      // Keep static products
    });
}, []);

  const stats = [
    { number: '500+', label: 'Pigs Sold' },
    { number: '200+', label: 'Happy Customers' },
    { number: '5+', label: 'Years Experience' },
    { number: '100%', label: 'Quality Assured' },
  ];

  const features = [
    { icon: '🐷', title: 'Premium Breeds', desc: 'Red Duroc and Berkshire pigs raised with care and quality feed.' },
    { icon: '🌾', title: 'Quality Feeds', desc: 'High-protein balanced feeds for optimal pig growth and health.' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'Safe and reliable delivery of live pigs across Nigeria.' },
    { icon: '👨‍⚕️', title: 'Vet Support', desc: 'Expert veterinary guidance included with every purchase.' },
    { icon: '✅', title: 'Vaccinated', desc: 'All pigs are fully vaccinated and health-certified.' },
    { icon: '💬', title: '24/7 Support', desc: 'WhatsApp support available anytime for all inquiries.' },
  ];

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <img src="/images/heroBackground.jpeg" alt="Farm" className="hero-img" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content container">
          <div className="hero-badge fade-in">🌟 Nigeria's #1 Pig Farm</div>
          <h1 className="hero-title fade-in">
            Premium Pigs &<br />
            <span>Farm Supplies</span>
          </h1>
          <p className="hero-subtitle fade-in">
            Connecting quality pig breeders with buyers across Nigeria.
            Healthy breeds, quality feeds, and unmatched farm support.
          </p>
          <div className="hero-buttons fade-in">
            <Link to="/shop" className="btn btn-white">🐷 Shop Now</Link>
            <Link to="/about" className="btn btn-outline-white">Learn More →</Link>
          </div>
          <div className="hero-stats fade-in">
            {stats.map((s, i) => (
              <div key={i} className="hero-stat">
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-indicator" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Why Choose Us</span>
            <h2 className="section-title">The Eagles Farm Difference</h2>
            <p className="section-subtitle">
              We raise pigs the right way — with care, quality nutrition, and full transparency.
            </p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card glass-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section products-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Fresh Stock</span>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Hand-picked pigs and feeds available for immediate purchase.
            </p>
          </div>
          {loading ? (
            <div className="loading-grid">
              {[1,2,3,4].map(i => <div key={i} className="skeleton-card" />)}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          ) : (
            <div className="empty-state">
              <p>🐷 Products loading... Make sure the backend is running.</p>
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/shop" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* CEO / ABOUT BANNER */}
      <section className="section ceo-section">
        <div className="container">
          <div className="ceo-banner glass-card">
            <div className="ceo-image">
              <img src="/images/farmer.jpeg" alt="CEO" />
              <div className="ceo-badge">CEO & Founder</div>
            </div>
            <div className="ceo-content">
              <span className="tag">Our Story</span>
              <h2>Built on Passion<br />for Farming</h2>
              <p>
                Eagles Farm was founded with a simple mission: make premium pig farming
                accessible to every Nigerian. From our humble beginnings with just 10 pigs,
                we have grown into one of Nigeria's most trusted pig farms.
              </p>
              <p>
                Every pig we sell is raised with love, proper nutrition, and veterinary care.
                We don't just sell pigs — we build lasting partnerships with our customers.
              </p>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: '16px' }}>
                Read Our Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Pig Farm?</h2>
            <p>Get premium pigs delivered to your doorstep. WhatsApp us now for custom orders.</p>
            <div className="cta-buttons">
              <Link to="/shop" className="btn btn-white">🛒 Shop Now</Link>
                <a
                href="https://wa.me/2349028187030"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-white"
            >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}