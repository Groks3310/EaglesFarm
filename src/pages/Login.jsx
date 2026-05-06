import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import './Auth.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', formData);
      login(res.data);
      toast.success(`Welcome back, ${res.data.username}! 🐷`);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <img src="/images/heroBackground.jpeg" alt="Farm" />
        <div className="auth-overlay" />
      </div>

      <div className="auth-container">
        <div className="auth-card glass-card">

          <div className="auth-header">
            <Link to="/" className="auth-logo">🐷 FarmPrideNg</Link>
            <h1>Welcome Back!</h1>
            <p>Login to your account to continue shopping</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-btn"
              disabled={loading}
            >
              {loading ? '⏳ Logging in...' : '🔓 Login'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-footer">
            <p>Don't have an account?</p>
            <Link to="/register" className="btn btn-outline auth-switch-btn">
              Create Account →
            </Link>
          </div>

          <div className="auth-back">
            <Link to="/">← Back to Home</Link>
          </div>

        </div>

        <div className="auth-side">
          <div className="auth-side-content">
            <div className="auth-side-icon">🐷</div>
            <h2>Nigeria's #1 Pig Farm</h2>
            <p>Join thousands of farmers and buyers who trust FarmPrideNg for premium pigs and quality feeds.</p>
            <div className="auth-benefits">
              <div className="auth-benefit">✅ Access to premium pig breeds</div>
              <div className="auth-benefit">✅ Exclusive member discounts</div>
              <div className="auth-benefit">✅ Track your orders easily</div>
              <div className="auth-benefit">✅ Join our farming community</div>
              <div className="auth-benefit">✅ Priority customer support</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}