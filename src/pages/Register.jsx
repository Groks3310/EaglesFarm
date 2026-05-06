import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import './Auth.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (formData.username.length < 3) {
      toast.error('Username must be at least 3 characters');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      login(res.data);
      toast.success(`Welcome to FarmPrideNg, ${res.data.username}! 🎉`);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return null;
    if (p.length < 6) return { label: 'Too Short', color: '#EF4444', width: '25%' };
    if (p.length < 8) return { label: 'Weak', color: '#F97316', width: '50%' };
    if (p.length < 12) return { label: 'Good', color: '#EAB308', width: '75%' };
    return { label: 'Strong', color: '#22C55E', width: '100%' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <img src="/images/heroBackground.jpeg" alt="Farm" />
        <div className="auth-overlay" />
      </div>

      <div className="auth-container">

        <div className="auth-side">
          <div className="auth-side-content">
            <div className="auth-side-icon">🌱</div>
            <h2>Start Your Farming Journey</h2>
            <p>Create a free account and get access to Nigeria's best pig farming marketplace.</p>
            <div className="auth-benefits">
              <div className="auth-benefit">✅ Buy premium pigs online</div>
              <div className="auth-benefit">✅ Order quality pig feeds</div>
              <div className="auth-benefit">✅ Post reviews and comments</div>
              <div className="auth-benefit">✅ Track all your orders</div>
              <div className="auth-benefit">✅ Get farming tips & updates</div>
            </div>
            <div className="auth-testimonial">
              <img src="/images/farmer.jpeg" alt="Farmer" />
              <div>
                <p>"Eagles Farm changed my farming business completely!"</p>
                <strong>— Edwin Ogaga, CEO</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-card glass-card">

          <div className="auth-header">
            <Link to="/" className="auth-logo">🐷 Eagles Farm</Link>
            <h1>Create Account</h1>
            <p>Join thousands of Nigerian farmers today</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Username</label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

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
                  placeholder="Min. 6 characters"
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
              {strength && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className="strength-fill"
                      style={{ width: strength.width, background: strength.color }}
                    />
                  </div>
                  <span style={{ color: strength.color }}>{strength.label}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                />
                {formData.confirmPassword && (
                  <span className="match-icon">
                    {formData.password === formData.confirmPassword ? '✅' : '❌'}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-btn"
              disabled={loading}
            >
              {loading ? '⏳ Creating Account...' : '🚀 Create Account'}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <div className="auth-footer">
            <p>Already have an account?</p>
            <Link to="/login" className="btn btn-outline auth-switch-btn">
              Login Instead →
            </Link>
          </div>

          <div className="auth-back">
            <Link to="/">← Back to Home</Link>
          </div>

        </div>
      </div>
    </div>
  );
}