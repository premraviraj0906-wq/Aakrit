import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
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

    const templateParams = {
      from_name: name,
      from_email: email,
      tier: tier.toUpperCase(),
      message: message,
      to_email: 'aakrit.works@gmail.com'
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Graceful fallback for local development without active API keys
    if (!serviceId || !templateId || !publicKey || publicKey.includes('placeholder')) {
      console.warn("EmailJS keys are not set or contain placeholders. Simulating successful send.");
      setTimeout(() => {
        setSending(false);
        setSuccess(true);
      }, 1200);
      return;
    }

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((res) => {
        setSending(false);
        setSuccess(true);
      })
      .catch((err) => {
        console.error("EmailJS Error: ", err);
        setSending(false);
        setError("Could not send email automatically. Please mail us directly at aakrit.works@gmail.com.");
      });
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
                  {sending ? 'Sending Message...' : 'Send Message →'}
                </button>
              </form>
            </div>
          ) : (
            <div className="modal-step text-c">
              <div className="success-icon" style={{ fontSize: '32px', marginBottom: '1rem' }}>✓</div>
              <h3 className="modal-title">Sent successfully</h3>
              <p className="modal-sub">
                Your message has been dispatched. We will contact you at <strong>{email}</strong> within 12 hours.
              </p>
              <button className="btn-chrome full-btn" style={{ marginTop: '1.5rem' }} onClick={reset}>
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EstimatorModal;
