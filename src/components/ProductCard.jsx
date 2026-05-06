import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const formatPrice = (price) => `₦${price.toLocaleString()}`;

  return (
    <div className="product-card fade-in">
      <Link to={`/shop/${product._id}`} style={{ textDecoration: 'none' }}>
        <div style={{ overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
          <img
            src={product.image}
            alt={product.name}
            onError={e => { e.target.src = 'https://via.placeholder.com/300x220?text=No+Image'; }}
          />
        </div>
        <div className="product-card-body">
          <span className="badge">{product.category === 'pig' ? '🐷 Live Pig' : '🌾 Feed'}</span>
          {product.breed && <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>{product.breed}</div>}
          {product.weight && <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px' }}>⚖️ {product.weight}</div>}
          <h3>{product.name}</h3>
          <div className="price">{formatPrice(product.price)}</div>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '8px 0', lineHeight: 1.5 }}>
            {product.description.slice(0, 80)}...
          </p>
        </div>
      </Link>
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: '8px' }}>
        <button onClick={handleAddToCart} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '10px' }}>
          🛒 Add to Cart
        </button>
        <Link to={`/shop/${product._id}`} className="btn btn-outline" style={{ padding: '10px 14px' }}>
          👁️
        </Link>
      </div>
    </div>
  );
}