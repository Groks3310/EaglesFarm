import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { count } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/shop', label: 'Shop' },
    { to: '/blog', label: 'Community' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
     <Link to="/" className="logo">
  <div className="logo-eagle">
    <img src="/images/Eagles.png" alt="Eagles Farm Logo" className="logo-img" />
  </div>
  <span className="logo-text">EaglesFarm<span>Ng LTD</span></span>
</Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="nav-actions">
            <Link to="/cart" className="cart-btn">
              🛒
              {count > 0 && <span className="cart-badge">{count}</span>}
            </Link>
            {user ? (
              <div className="user-menu">
                <span className="user-greeting">Hi, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline"
                  style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
        </button>
      </div>
    </nav>
  );
}