import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  const values = [
    { icon: '🌱', title: 'Sustainability', desc: 'We practice eco-friendly farming that protects the environment for future generations.' },
    { icon: '❤️', title: 'Animal Welfare', desc: 'Our pigs are raised in spacious, clean environments with proper nutrition and care.' },
    { icon: '🏆', title: 'Quality First', desc: 'Every pig leaves our farm healthy, vaccinated, and certified by our in-house vet.' },
    { icon: '🤝', title: 'Community', desc: 'We empower local farmers with knowledge, resources, and affordable quality stock.' },
  ];

  const team = [
    { name: 'Edwin Ogaga', role: 'CEO & Head Farmer', img: '/images/farmer.jpeg', desc: 'Over 15 years of pig farming experience. Founded Eagles Farm to bring quality breeds to all Nigerians.' },
   
  ];

  const milestones = [
    { year: '2019', event: 'Eagles Farm founded with 10 pigs and a dream' },
    { year: '2020', event: 'Expanded to 200 pigs, first major customer deliveries' },
    { year: '2021', event: 'Launched online store and WhatsApp ordering system' },
    { year: '2022', event: 'Partnered with 3 major feed suppliers across Nigeria' },
    { year: '2023', event: 'Reached 500+ pigs sold milestone' },
    { year: '2024', event: 'Launched Eagles Farm e-commerce platform' },
  ];

  return (
    <div className="about-page">

      {/* PAGE HERO */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="/images/pigPen2.jpeg" alt="Pig Farm" />
          <div className="about-hero-overlay" />
        </div>
        <div className="container about-hero-content">
          <span className="tag">Our Story</span>
          <h1>About Eagles Farm</h1>
          <p>From a small backyard farm to Nigeria's most trusted pig marketplace</p>
        </div>
      </section>

      {/* MISSION */}
      <section className="section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-image">
              <img src="/images/pigPen2.jpeg" alt="Our Farm" />
              <div className="mission-badge glass-card">
                <span className="badge-number">500+</span>
                <span className="badge-text">Pigs Sold</span>
              </div>
            </div>
            <div className="mission-content">
              <span className="tag">Our Mission</span>
              <h2 className="section-title">Feeding Nigeria,<br />One Farm at a Time</h2>
              <p>
                Eagles Farm was established with a clear mission: to make premium-quality
                pig farming accessible to every Nigerian farmer and buyer — from large
                commercial operators to small household farmers.
              </p>
              <p style={{ marginTop: '16px' }}>
                We believe that food security starts at the grassroots level. By providing
                healthy, vaccinated, and well-bred pigs at fair prices, we're contributing
                to a stronger, more self-sufficient Nigeria.
              </p>
              <div className="mission-stats">
                <div className="m-stat">
                  <strong>200+</strong>
                  <span>Happy Customers</span>
                </div>
                <div className="m-stat">
                  <strong>5+</strong>
                  <span>Years Active</span>
                </div>
                <div className="m-stat">
                  <strong>3</strong>
                  <span>Pig Breeds</span>
                </div>
              </div>
              <Link to="/shop" className="btn btn-primary" style={{ marginTop: '28px' }}>
                Shop Our Pigs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="tag">What We Stand For</span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do at  Eagles Farm</p>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card glass-card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section timeline-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="tag">Our Journey</span>
            <h2 className="section-title">How We Got Here</h2>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content glass-card">
                  <div className="timeline-year">{m.year}</div>
                  <p>{m.event}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section team-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="tag">The CEO</span>
            <h2 className="section-title">The Founded</h2>
            <p className="section-subtitle">Passionate Farmer dedicated to quality farming</p>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card glass-card">
                <div className="team-img-wrap">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p>{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-content glass-card">
            <h2>Ready to Work With Us?</h2>
            <p>Whether you want to buy pigs, order feeds, or partner with us — we're just a WhatsApp away.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
              <Link to="/shop" className="btn btn-primary">🛒 Visit Shop</Link>
              <Link to="/contact" className="btn btn-outline">📞 Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}