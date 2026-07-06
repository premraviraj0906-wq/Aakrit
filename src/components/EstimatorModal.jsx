import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EstimatorModal.css';

const EstimatorModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tier, setTier] = useState('growth');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    setTimeout(() => {
      const subject = encodeURIComponent(`Project Inquiry - ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Project Tier: ${tier.toUpperCase()}\n\n` +
        `Message:\n${message}`
      );

      // Redirect to native mail client
      window.location.href = `mailto:aakrit.works@gmail.com?subject=${subject}&body=${body}`;

      setSending(false);
      setSuccess(true);
    }, 1200);
  };

  const reset = () => {
    setName('');
    setEmail('');
    setTier('growth');
    setMessage('');
    setSending(false);
    setSuccess(false);
    setError(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={reset}>
        <motion.div
          className="modal-box"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <button className="modal-close" onClick={reset}>✕</button>

          {!success ? (
            <div className="modal-step">
              <p className="modal-eyebrow">04 — Contact Intake</p>
              <h3 className="modal-title">Get in Touch</h3>
              <p className="modal-sub">Submit your project details and we will reach out within 12 hours.</p>

              <form onSubmit={handleSubmit} className="contact-form" style={{ marginTop: '1rem' }}>
                <div className="form-block">
                  <label className="form-label">Full Name</label>
                  <input className="bp-input" type="text" placeholder="Your name" required
                    value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-block">
                  <label className="form-label">Email Address</label>
                  <input className="bp-input" type="email" placeholder="you@example.com" required
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-block">
                  <label className="form-label">Project Tier / Budget</label>
                  <div className="type-grid">
                    {['launch', 'growth', 'scale', 'enterprise', 'custom'].map((t) => (
                      <button type="button" key={t} className={`type-btn ${tier === t ? 'active' : ''}`} onClick={() => setTier(t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-block">
                  <label className="form-label">Project Details / Message</label>
                  <textarea className="bp-input" rows="4" placeholder="What are you looking to build?" required
                    value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>

                {error && (
                  <div className="error-banner" style={{ color: 'red', fontSize: 'var(--text-caption)', fontFamily: 'var(--font-roobert)', marginTop: '0.5rem', fontWeight: '600' }}>
                    {error}
                  </div>
                )}

                <button type="submit" className="btn-chrome full-btn" disabled={sending} style={{ marginTop: '1rem' }}>
                  {sending ? 'Redirecting to your email service...' : 'Send Message →'}
                </button>
              </form>
            </div>
          ) : (
            <div className="modal-step text-c">
              <div className="success-icon" style={{ fontSize: '32px', marginBottom: '1rem' }}>✉</div>
              <h3 className="modal-title">Redirecting to your email service...</h3>
              <p className="modal-sub">
                We are opening your default email application with your message pre-filled. If it doesn't open automatically, click the button below.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                <button className="btn-ghost full-btn" onClick={() => {
                  const subject = encodeURIComponent(`Project Inquiry - ${name}`);
                  const body = encodeURIComponent(
                    `Name: ${name}\n` +
                    `Email: ${email}\n` +
                    `Project Tier: ${tier.toUpperCase()}\n\n` +
                    `Message:\n${message}`
                  );
                  window.location.href = `mailto:aakrit.works@gmail.com?subject=${subject}&body=${body}`;
                }}>
                  Open Mail
                </button>
                <button className="btn-chrome full-btn" onClick={reset}>
                  Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EstimatorModal;
