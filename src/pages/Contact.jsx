import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);

    // Notify owner via WhatsApp
    const whatsappMessage = encodeURIComponent(
      `📩 NEW CONTACT MESSAGE!\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📧 Email: ${formData.email}\n` +
      `📱 Phone: ${formData.phone || 'Not provided'}\n` +
      `📋 Subject: ${formData.subject || 'Not provided'}\n\n` +
      `💬 Message:\n${formData.message}`
    );

    window.open(`https://wa.me/2349028187030?text=${whatsappMessage}`, '_blank');

    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Message sent! We will get back to you shortly 📩');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setSubmitting(false);
  };

  const contactInfo = [
    {
      icon: '📱',
      title: 'WhatsApp / Call',
      value: '09028187030',
      sub: 'Available 7am – 9pm daily',
      link: 'https://wa.me/2349028187030',
      linkText: 'Chat on WhatsApp',
    },
    {
      icon: '📧',
      title: 'Email Us',
      value: 'info@EaglesFarm.com',
      sub: 'We reply within 24 hours',
      link: 'mailto:info@EaglesFarm.com',
      linkText: 'Send Email',
    },
    {
      icon: '📍',
      title: 'Our Location',
      value: 'Nigeria',
      sub: 'Delivery available nationwide',
      link: null,
    },
    {
      icon: '🕐',
      title: 'Working Hours',
      value: 'Mon – Sat: 7am – 9pm',
      sub: 'Sunday: 10am – 6pm',
      link: null,
    },
  ];

  const faqs = [
    {
      q: 'How do I order a pig?',
      a: 'Simply visit our Shop page, add your chosen pig to cart, and complete checkout. You can also WhatsApp us directly for custom orders.',
    },
    {
      q: 'Do you deliver nationwide?',
      a: 'Yes! We deliver live pigs and pig feeds across all 36 states in Nigeria. Delivery fees vary by location.',
    },
    {
      q: 'Are the pigs vaccinated?',
      a: 'Absolutely. All our pigs are fully vaccinated, dewormed, and certified healthy by our in-house veterinarian before delivery.',
    },
    {
      q: 'Can I visit the farm before buying?',
      a: 'Yes, farm visits are welcome! Contact us on WhatsApp to schedule a visit and see the pigs in person.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept bank transfers, cash on delivery (select locations), and mobile payments. Details provided at checkout.',
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="tag" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
            Get In Touch
          </span>
          <h1 style={{ marginTop: '12px' }}>Contact Us</h1>
          <p>We're always happy to hear from you — reach out anytime</p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">

          {/* CONTACT INFO CARDS */}
          <div className="contact-info-grid">
            {contactInfo.map((info, i) => (
              <div key={i} className="contact-info-card glass-card">
                <div className="contact-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p className="contact-value">{info.value}</p>
                <p className="contact-sub">{info.sub}</p>
                {info.link && (
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-link"
                  >
                    {info.linkText} →
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* FORM + WHATSAPP */}
          <div className="contact-main-grid">

            {/* CONTACT FORM */}
            <div className="contact-form-wrap glass-card">
              <div className="form-header">
                <span className="tag">Send a Message</span>
                <h2 style={{ marginTop: '12px', color: 'var(--primary)' }}>
                  We'd Love to Hear From You
                </h2>
                <p style={{ color: 'var(--text-light)', marginTop: '8px', fontSize: '0.95rem' }}>
                  Fill the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
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
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="08012345678"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={submitting}
                >
                  {submitting ? '⏳ Sending...' : '📩 Send Message'}
                </button>
              </form>
            </div>

            {/* WHATSAPP CTA */}
            <div className="contact-side">
              <div className="whatsapp-card glass-card">
                <div className="wa-icon">💬</div>
                <h3>Prefer WhatsApp?</h3>
                <p>
                  Get instant responses by chatting with us directly on WhatsApp.
                  We're available 7 days a week!
                </p>
                <a
                  href="https://wa.me/2349028187030"
                  target="_blank"
                  rel="noreferrer"
                  className="wa-btn"
                >
                  <span>💬</span>
                  <div>
                    <strong>Chat on WhatsApp</strong>
                    <small>09028187030</small>
                  </div>
                </a>
                <div className="wa-features">
                  <div className="wa-feature">✅ Instant replies</div>
                  <div className="wa-feature">✅ Send photos of your farm</div>
                  <div className="wa-feature">✅ Get custom price quotes</div>
                  <div className="wa-feature">✅ Schedule farm visits</div>
                  <div className="wa-feature">✅ Track your order</div>
                </div>
              </div>

              <div className="ceo-contact-card glass-card">
                <img src="/images/farmer.jpeg" alt="CEO" className="ceo-contact-img" />
                <div className="ceo-contact-info">
                  <strong>Edwin Ogaga</strong>
                  <span>CEO,  Eagles Farm</span>
                  <p>"I personally ensure every customer is satisfied. Reach out anytime!"</p>
                </div>
              </div>
            </div>

          </div>

          {/* FAQ */}
          <div className="faq-section">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="tag">FAQ</span>
              <h2 className="section-title" style={{ marginTop: '12px' }}>
                Frequently Asked Questions
              </h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`faq-item glass-card ${openFaq === i ? 'open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
                  </div>
                  {openFaq === i && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}