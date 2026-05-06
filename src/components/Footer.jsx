import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,120 600,0 1200,60 L1200,120 L0,120 Z" fill="rgba(30,58,138,0.05)" />
        </svg>
      </div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">🐷  Eagles Farm</div>
            <p>Nigeria's premium pig farming marketplace. Connecting quality breeders with buyers since 2020.</p>
            <div className="social-links">
              <a href="https://wa.me/2349028187030" target="_blank" rel="noreferrer" className="social-btn whatsapp">📱 WhatsApp</a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/blog">Community</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-links">
            <h4>Products</h4>
            <Link to="/shop?category=pig">Live Pigs</Link>
            <Link to="/shop?category=feed">Pig Feeds</Link>
            <Link to="/cart">My Cart</Link>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>📱 09028187030</p>
            <p>📧 info@EaglesFarm.com</p>
            <p>📍 Nigeria</p>
            <a href="https://wa.me/2349028187030" target="_blank" rel="noreferrer" className="btn btn-primary" style={{marginTop:'16px',display:'inline-flex',fontSize:'0.85rem',padding:'10px 20px'}}>
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Eagles Farm. All rights reserved.</p>
          <p>Built with ❤️ for Nigerian Farmers</p>
        </div>
      </div>
    </footer>
  );
}