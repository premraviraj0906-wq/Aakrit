import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EstimatorModal.css';

const EstimatorModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [webType, setWebType] = useState('portfolio');
  const [pages, setPages] = useState(3);
  const [hasAnimations, setHasAnimations] = useState(true);
  const [hasSEO, setHasSEO] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', note: '' });

  const calculatePrice = () => {
    const base = { portfolio: 12500, business: 24000, ecommerce: 37500 }[webType];
    return (base + (pages - 1) * 2900 + (hasAnimations ? 6600 : 0) + (hasSEO ? 4100 : 0)).toLocaleString('en-IN');
  };

  const handleSubmit = (e) => { e.preventDefault(); setStep(3); };
  const reset = () => { setStep(1); setFormData({ name: '', email: '', note: '' }); onClose(); };

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

          {step === 1 && (
            <div className="modal-step">
              <p className="modal-eyebrow">Build Configuration</p>
              <h3 className="modal-title">Project Estimator</h3>
              <p className="modal-sub">Configure your spec and see an instant cost estimate.</p>

              <div className="form-block">
                <label className="form-label">Site Type</label>
                <div className="type-grid">
                  {['portfolio', 'business', 'ecommerce'].map((t) => (
                    <button key={t} className={`type-btn ${webType === t ? 'active' : ''}`} onClick={() => setWebType(t)}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-block">
                <label className="form-label">Pages: {pages}</label>
                <input type="range" min="1" max="12" value={pages}
                  onChange={(e) => setPages(+e.target.value)} className="range-input" />
                <div className="range-labels"><span>1</span><span>12</span></div>
              </div>

              <div className="form-block">
                <label className="checkbox-row">
                  <input type="checkbox" checked={hasAnimations} onChange={(e) => setHasAnimations(e.target.checked)} />
                  <span className="cb-box" />
                  Motion Engine (+₹6,600)
                </label>
                <label className="checkbox-row">
                  <input type="checkbox" checked={hasSEO} onChange={(e) => setHasSEO(e.target.checked)} />
                  <span className="cb-box" />
                  SEO Package (+₹4,100)
                </label>
              </div>

              <div className="estimate-row">
                <span>Estimate</span>
                <span className="estimate-val">₹{calculatePrice()}</span>
              </div>

              <button className="btn-chrome full-btn" onClick={() => setStep(2)}>
                Next step →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="modal-step">
              <p className="modal-eyebrow">Contact Details</p>
              <h3 className="modal-title">Secure your build</h3>
              <p className="modal-sub">Submit and our team will reach out within 12 hours.</p>

              <form onSubmit={handleSubmit} className="contact-form">
                <input className="bp-input" type="text" placeholder="Your name" required
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input className="bp-input" type="email" placeholder="Email address" required
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <textarea className="bp-input" rows="3" placeholder="Additional details..."
                  value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} />

                <div className="quote-pill">
                  Project estimate: <strong>₹{calculatePrice()}</strong>
                </div>

                <div className="btn-row">
                  <button type="button" className="btn-ghost half-btn" onClick={() => setStep(1)}>← Back</button>
                  <button type="submit" className="btn-chrome half-btn">Send →</button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="modal-step text-c">
              <div className="success-icon">✓</div>
              <h3 className="modal-title">Sent successfully</h3>
              <p className="modal-sub">
                Project locked at <strong>₹{calculatePrice()}</strong>. We'll contact {formData.email || 'you'} within 12 hours.
              </p>
              <button className="btn-chrome full-btn" style={{ marginTop: '1rem' }} onClick={reset}>
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EstimatorModal;
