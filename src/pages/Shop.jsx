import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';
import './Shop.css';
const staticProducts = [
  
  { _id: '1', name: 'Large White', price: 400000, description: 'Healthy Large white. Known for excellent meat quality and fast growth.', image: '/images/pig1.jpeg', category: 'pig', breed: 'Large white' },
  { _id: '2', name: 'Duroc Pig ', price: 500000, description: 'Premium Duroc breed. Excellent temperament, fully vaccinated.', image: '/images/pig2.jpeg', category: 'pig', breed: 'Duroc' },
  { _id: '3', name: 'Landrance Pig', price: 600000, description: 'Landrance famous for its superior Landrance meat.', image: '/images/pig3.jpeg', category: 'pig', breed: 'Landrance  Strong immune system, raised on natural feed.' },
  { _id: '4', name: 'Duroc Pig', price: 400000, description: 'Quality Duroc breed.', image: '/images/pig2.jpeg', category: 'pig', breed: 'Duroc' },
  { _id: '5', name: 'Duroc Pig', price: 700000, description: 'Premium mature Duroc. Top-tier genetics with superior growth rate.', image: '/images/pig5.jpg', category: 'pig', breed: 'Duroc' },
  { _id: '6', name: 'Premium Pig Feed (25kg)', price: 18000, description: 'High-protein balanced pig feed with essential vitamins and minerals for optimal growth.', image: '/images/frontBag.jpg', category: 'feed' },
  { _id: '7', name: 'Starter Pig Feed (25kg)', price: 18000, description: 'Specially formulated starter feed for piglets. Promotes healthy early development.', image: '/images/frontBag.jpg', category: 'feed' },
  { _id: '8', name: 'Grower Pig Feed (50kg)', price: 22000, description: 'Optimized grower feed for maximum weight gain at reduced cost.', image: '/images/frontBag.jpg', category: 'feed' },
];

export default function Shop() {
  const [products, setProducts] = useState(staticProducts);
  const [filtered, setFiltered] = useState(staticProducts);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
    setLoading(true);
    axios.get('/api/products')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        if (data.length > 0) {
          setProducts(data);
          setFiltered(data);
        }
      })
      .catch(() => {
        // Keep static products if backend fails
      })
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    let result = [...products];

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchTerm.trim()) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.breed && p.breed.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));

    setFiltered(result);
  }, [activeCategory, sortBy, searchTerm, products]);

  const categories = [
    { key: 'all', label: '🐾 All Products', count: products.length },
    { key: 'pig', label: '🐷 Live Pigs', count: products.filter(p => p.category === 'pig').length },
    { key: 'feed', label: '🌾 Pig Feeds', count: products.filter(p => p.category === 'feed').length },
  ];

  return (
    <div className="shop-page">

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="tag" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
            Our Products
          </span>
          <h1 style={{ marginTop: '12px' }}>Farm Shop</h1>
          <p>Premium pigs and quality feeds — delivered across Nigeria</p>
        </div>
      </section>

      {/* SHOP BODY */}
      <section className="section shop-section">
        <div className="container">

          {/* SEARCH + SORT BAR */}
          <div className="shop-controls glass-card">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search pigs, breeds, feeds..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>

          <div className="shop-layout">

            {/* SIDEBAR */}
            <aside className="shop-sidebar">
              <div className="sidebar-card glass-card">
                <h3>Categories</h3>
                <div className="category-list">
                  {categories.map(cat => (
                    <button
                      key={cat.key}
                      className={`cat-btn ${activeCategory === cat.key ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat.key)}
                    >
                      <span>{cat.label}</span>
                      <span className="cat-count">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="sidebar-card glass-card" style={{ marginTop: '20px' }}>
                <h3>Need Help?</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: '12px 0' }}>
                  Not sure which pig or feed to choose? Chat with us directly!
                </p>
                <a
                  href="https://wa.me/2349028187030"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}
               >
                  💬 WhatsApp Us
                </a>
              </div>
            </aside>

            {/* PRODUCTS AREA */}
            <div className="shop-main">
              <div className="results-bar">
                <span className="results-count">
                  Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
                </span>
                {activeCategory !== 'all' && (
                  <button className="clear-filter" onClick={() => setActiveCategory('all')}>
                    Clear filter ✕
                  </button>
                )}
              </div>

              {loading ? (
                <div className="products-grid">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="skeleton-card" style={{ height: '380px' }} />
                  ))}
                </div>
              ) : filtered.length > 0 ? (
                <div className="products-grid">
                 {filtered.map((p, index) => (
  <ProductCard key={p._id || index} product={p} />
))}
                </div>
              ) : (
                <div className="no-results glass-card">
                  <div className="no-results-icon">🔍</div>
                  <h3>No products found</h3>
                  <p>Try adjusting your search or filter</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                    style={{ marginTop: '16px' }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}