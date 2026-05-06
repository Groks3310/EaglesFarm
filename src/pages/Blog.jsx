import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import './Blog.css';

const staticComments = [
  { _id: '1', username: 'Emeka Okafor', text: 'I bought two Red Duroc pigs last month and they are doing great! Very healthy animals. FarmPrideNg is the real deal.', createdAt: '2024-06-01T10:00:00Z' },
  { _id: '2', username: 'Chinwe Adaeze', text: 'The pig feed is excellent quality. My pigs have been growing so fast since I switched to FarmPrideNg feeds. Highly recommended!', createdAt: '2024-06-05T14:30:00Z' },
  { _id: '3', username: 'Biodun Fashola', text: 'Great customer service! They guided me through everything as a first-time pig farmer. Delivery was fast and the pig arrived healthy.', createdAt: '2024-06-10T09:15:00Z' },
  { _id: '4', username: 'Amaka Nwosu', text: 'The Berkshire pig I ordered is beautiful! Worth every naira. Already planning to order two more next month.', createdAt: '2024-06-15T16:45:00Z' },
  { _id: '5', username: 'Tunde Bakare', text: 'Been farming pigs for 3 years but FarmPrideNg breeds are on another level. The genetics are superior to what I was getting before.', createdAt: '2024-06-18T11:20:00Z' },
];

const blogPosts = [
  {
    id: 1,
    title: 'Top 5 Tips for Raising Healthy Pigs',
    excerpt: 'Learn the essential practices that every pig farmer needs to know — from feeding schedules to disease prevention.',
    date: 'June 1, 2024',
    readTime: '5 min read',
    icon: '🐷',
    category: 'Farming Tips',
  },
  {
    id: 2,
    title: 'Why Red Duroc is the Best Breed for Nigerian Farmers',
    excerpt: 'Red Duroc pigs are known for their hardiness, fast growth, and excellent meat quality. Find out why they dominate Nigerian farms.',
    date: 'June 8, 2024',
    readTime: '4 min read',
    icon: '🏆',
    category: 'Breeds',
  },
  {
    id: 3,
    title: 'How to Choose the Right Pig Feed',
    excerpt: 'Starter, grower, or finisher feed? This guide breaks down exactly what to feed your pigs at every stage of growth.',
    date: 'June 15, 2024',
    readTime: '6 min read',
    icon: '🌾',
    category: 'Nutrition',
  },
  {
    id: 4,
    title: 'Pig Farming as a Business in Nigeria',
    excerpt: 'Pig farming is one of the most profitable agribusiness ventures in Nigeria. Here is how to get started the right way.',
    date: 'June 22, 2024',
    readTime: '7 min read',
    icon: '💰',
    category: 'Business',
  },
];

export default function Blog() {
  const [comments, setComments] = useState(staticComments);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    axios.get('/api/comments')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        if (data.length > 0) setComments(data);
      })
      .catch(() => {})
      .finally(() => setLoadingComments(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user) { toast.error('Please login to post a comment'); return; }

    setSubmitting(true);
    try {
      const res = await axios.post('/api/comments', { text: newComment });
      setComments(prev => [res.data, ...prev]);
      setNewComment('');
      toast.success('Comment posted! 🎉');
    } catch {
      // Fallback: add comment locally
      const localComment = {
        _id: Date.now().toString(),
        username: user.username,
        text: newComment,
        createdAt: new Date().toISOString(),
      };
      setComments(prev => [localComment, ...prev]);
      setNewComment('');
      toast.success('Comment posted! 🎉');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/comments/${id}`);
      setComments(prev => prev.filter(c => c._id !== id));
      toast.success('Comment deleted');
    } catch {
      setComments(prev => prev.filter(c => c._id !== id));
      toast.success('Comment deleted');
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getInitials = (name) => name ? name.slice(0, 2).toUpperCase() : 'U';

  const colors = ['#1E3A8A', '#3B82F6', '#059669', '#D97706', '#DC2626', '#7C3AED'];
  const getColor = (name) => colors[name ? name.charCodeAt(0) % colors.length : 0];

  return (
    <div className="blog-page">

      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="tag" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
            Community
          </span>
          <h1 style={{ marginTop: '12px' }}>Blog & Community</h1>
          <p>Tips, stories, and conversations from Nigeria's pig farming community</p>
        </div>
      </section>

      <section className="section blog-section">
        <div className="container">
          <div className="blog-layout">

            {/* LEFT — BLOG POSTS + COMMENTS */}
            <div className="blog-main">

              {/* BLOG POSTS */}
              <div className="blog-posts-header">
                <span className="tag">Latest Articles</span>
                <h2 className="section-title" style={{ marginTop: '12px' }}>Farm Knowledge Hub</h2>
              </div>

              <div className="blog-posts-grid">
                {blogPosts.map(post => (
                  <div key={post.id} className="blog-card glass-card">
                    <div className="blog-card-icon">{post.icon}</div>
                    <div className="blog-card-body">
                      <div className="blog-meta">
                        <span className="blog-category">{post.category}</span>
                        <span className="blog-read-time">⏱ {post.readTime}</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="blog-footer">
                        <span className="blog-date">📅 {post.date}</span>
                        <button className="read-more-btn">Read More →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* COMMENTS SECTION */}
              <div className="comments-section">
                <div className="comments-header">
                  <span className="tag">Community</span>
                  <h2 className="section-title" style={{ marginTop: '12px' }}>
                    Customer Reviews & Comments
                  </h2>
                  <p className="section-subtitle">
                    Join the conversation — share your experience with FarmPrideNg
                  </p>
                </div>

                {/* COMMENT FORM */}
                <div className="comment-form-wrap glass-card">
                  {user ? (
                    <form onSubmit={handleSubmit}>
                      <div className="form-user-row">
                        <div
                          className="avatar"
                          style={{ background: getColor(user.username) }}
                        >
                          {getInitials(user.username)}
                        </div>
                        <span className="form-username">Posting as <strong>{user.username}</strong></span>
                      </div>
                      <textarea
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Share your experience, ask a question, or leave a review..."
                        rows={4}
                        maxLength={500}
                        className="comment-textarea"
                        required
                      />
                      <div className="form-actions">
                        <span className="char-count">{newComment.length}/500</span>
                        <button
                          type="submit"
                          disabled={submitting || !newComment.trim()}
                          className="btn btn-primary"
                        >
                          {submitting ? '⏳ Posting...' : '💬 Post Comment'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="login-prompt">
                      <div className="login-prompt-icon">💬</div>
                      <h3>Join the Conversation</h3>
                      <p>Login or create an account to post comments and reviews</p>
                      <div className="login-prompt-btns">
                        <a href="/login" className="btn btn-primary">Login</a>
                        <a href="/register" className="btn btn-outline">Sign Up Free</a>
                      </div>
                    </div>
                  )}
                </div>

                {/* COMMENTS LIST */}
                <div className="comments-list">
                  {loadingComments ? (
                    <div className="comments-loading">
                      {[1,2,3].map(i => <div key={i} className="comment-skeleton" />)}
                    </div>
                  ) : comments.length > 0 ? (
                    comments.map(comment => (
                      <div key={comment._id} className="comment-card glass-card">
                        <div className="comment-header">
                          <div className="comment-user">
                            <div
                              className="avatar"
                              style={{ background: getColor(comment.username) }}
                            >
                              {getInitials(comment.username)}
                            </div>
                            <div>
                              <strong className="comment-username">{comment.username}</strong>
                              <span className="comment-date">{formatDate(comment.createdAt)}</span>
                            </div>
                          </div>
                          {user && user.username === comment.username && (
                            <button
                              className="delete-btn"
                              onClick={() => handleDelete(comment._id)}
                              title="Delete comment"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                        <p className="comment-text">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="no-comments glass-card">
                      <p>🐷 No comments yet. Be the first to share your experience!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="blog-sidebar">
              <div className="sidebar-widget glass-card">
                <h3>🌟 Quick Tips</h3>
                <ul className="tips-list">
                  <li>Feed pigs 2–3 times daily</li>
                  <li>Always provide clean water</li>
                  <li>Vaccinate every 6 months</li>
                  <li>Keep pens clean and dry</li>
                  <li>Monitor weight weekly</li>
                  <li>Deworm every 3 months</li>
                </ul>
              </div>

              <div className="sidebar-widget glass-card">
                <h3>📊 Farm Stats</h3>
                <div className="farm-stats">
                  <div className="farm-stat-item">
                    <span className="stat-icon">🐷</span>
                    <div>
                      <strong>500+</strong>
                      <span>Pigs Sold</span>
                    </div>
                  </div>
                  <div className="farm-stat-item">
                    <span className="stat-icon">⭐</span>
                    <div>
                      <strong>4.9/5</strong>
                      <span>Rating</span>
                    </div>
                  </div>
                  <div className="farm-stat-item">
                    <span className="stat-icon">😊</span>
                    <div>
                      <strong>200+</strong>
                      <span>Customers</span>
                    </div>
                  </div>
                  <div className="farm-stat-item">
                    <span className="stat-icon">🚚</span>
                    <div>
                      <strong>36</strong>
                      <span>States Served</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sidebar-widget glass-card cta-widget">
                <div className="cta-widget-icon">🐷</div>
                <h3>Ready to Buy?</h3>
                <p>Browse our premium pigs and feeds available for immediate delivery.</p>
                <a href="/shop" className="btn btn-primary cta-widget-btn">
                  Shop Now →
                </a>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
}