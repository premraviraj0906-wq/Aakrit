import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EstimatorModal.css';

const EstimatorModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Configurator State
  const [pages, setPages] = useState('1-3'); // '1-3', '4-6', '7-12', 'unlimited'
  const [motionLevel, setMotionLevel] = useState('kinetic'); // 'basic', 'micro', 'kinetic'
  const [cms, setCms] = useState('none'); // 'none', 'markdown', 'headless'
  
  // Add-ons
  const [whatsapp, setWhatsapp] = useState(false);
  const [database, setDatabase] = useState(false);
  const [seoAudit, setSeoAudit] = useState(false);

  // Calculate pricing & timelines in real-time
  const specDetails = useMemo(() => {
    let basePrice = 9999;
    let days = 3;
    const items = [];

    // Pages
    if (pages === '4-6') {
      basePrice += 5000;
      days += 2;
      items.push({ label: 'Up to 6 Bespoke Pages', cost: '₹5,000' });
    } else if (pages === '7-12') {
      basePrice += 20000;
      days += 4;
      items.push({ label: 'Up to 12 Bespoke Pages', cost: '₹20,000' });
    } else if (pages === 'unlimited') {
      basePrice += 40000;
      days += 8;
      items.push({ label: 'Unlimited pages / E-Com', cost: '₹40,000' });
    } else {
      items.push({ label: '1–3 Page Custom Layout', cost: 'Included' });
    }

    // Motion Level
    if (motionLevel === 'micro') {
      basePrice += 2000;
      days += 1;
      items.push({ label: 'Interactive Motion UI', cost: '₹2,000' });
    } else if (motionLevel === 'kinetic') {
      basePrice += 6000;
      days += 2;
      items.push({ label: 'Signature JS Animations', cost: '₹6,000' });
    } else {
      items.push({ label: 'Basic Responsive Code', cost: 'Included' });
    }

    // CMS
    if (cms === 'markdown') {
      basePrice += 4000;
      days += 1;
      items.push({ label: 'Markdown Blog/CMS', cost: '₹4,000' });
    } else if (cms === 'headless') {
      basePrice += 10000;
      days += 3;
      items.push({ label: 'Custom Headless CMS', cost: '₹10,000' });
    }

    // Add-ons
    if (whatsapp) {
      basePrice += 5000;
      days += 1;
      items.push({ label: 'WhatsApp Automations', cost: '₹5,000' });
    }
    if (database) {
      basePrice += 12000;
      days += 3;
      items.push({ label: 'Custom Database & Auth', cost: '₹12,000' });
    }
    if (seoAudit) {
      basePrice += 2500;
      items.push({ label: 'SEO Schema & Full Audit', cost: '₹2,500' });
    }

    return {
      price: basePrice,
      days,
      items
    };
  }, [pages, motionLevel, cms, whatsapp, database, seoAudit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    setTimeout(() => {
      const subject = encodeURIComponent(`Aakrit Project Spec - ${name}`);
      const body = encodeURIComponent(
        `--- CUSTOM AAKRIT BLUEPRINT SPEC ---\n` +
        `Client Name: ${name}\n` +
        `Email: ${email}\n` +
        `Estimated Total: ₹${specDetails.price.toLocaleString()}\n` +
        `Est. Timeline: ${specDetails.days} Business Days\n\n` +
        `CONFIGURED SPECS:\n` +
        `- Pages: ${pages.toUpperCase()}\n` +
        `- Motion Fidelity: ${motionLevel.toUpperCase()}\n` +
        `- CMS/Backend: ${cms.toUpperCase()}\n` +
        `- WhatsApp Integration: ${whatsapp ? 'YES' : 'NO'}\n` +
        `- Custom DB & Auth: ${database ? 'YES' : 'NO'}\n` +
        `- Advanced SEO Schema: ${seoAudit ? 'YES' : 'NO'}\n\n` +
        `CLIENT NOTES:\n` +
        `${message}`
      );

      window.location.href = `mailto:aakrit.works@gmail.com?subject=${subject}&body=${body}`;
      setSending(false);
      setSuccess(true);
    }, 1000);
  };

  const reset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setPages('1-3');
    setMotionLevel('kinetic');
    setCms('none');
    setWhatsapp(false);
    setDatabase(false);
    setSeoAudit(false);
    setSuccess(false);
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
          className="modal-box spec-box"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <button className="modal-close" onClick={reset}>✕</button>

          {!success ? (
            <div className="spec-layout">
              
              {/* Left Column: Real-time cost spec sheet blueprint */}
              <div className="spec-blueprint-col">
                <div className="blueprint-header">
                  <span className="bp-eyebrow">BLUEPRINT SPEC</span>
                  <div className="bp-code">AAK-SPEC-2026</div>
                </div>
                
                <div className="blueprint-items">
                  <div className="bp-row">
                    <span className="bp-label">Base Framework Fee</span>
                    <span className="bp-cost">₹9,999</span>
                  </div>
                  {specDetails.items.map((item, idx) => (
                    <div className="bp-row" key={idx}>
                      <span className="bp-label">{item.label}</span>
                      <span className="bp-cost">{item.cost}</span>
                    </div>
                  ))}
                </div>

                <div className="blueprint-totals">
                  <div className="bp-total-row">
                    <span className="bpt-label">EST. TIMELINE</span>
                    <span className="bpt-value">{specDetails.days} DAYS</span>
                  </div>
                  <div className="bp-total-row total-price-row">
                    <span className="bpt-label">TOTAL ESTIMATE</span>
                    <span className="bpt-value font-headline">₹{specDetails.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Spec Configurator & Form */}
              <div className="spec-config-col">
                <div className="config-header">
                  <span className="config-eyebrow">04 — CUSTOM BLUEPRINT</span>
                  <h3 className="config-title">Aakrit Spec Builder</h3>
                  <p className="config-sub">Configure your custom web specs. The blueprint is calculated dynamically.</p>
                </div>

                <form onSubmit={handleSubmit} className="config-form">
                  
                  {/* Selectors */}
                  <div className="form-block">
                    <label className="form-label">Sitemap scale / Pages</label>
                    <div className="config-toggle-row">
                      {[['1-3', '1-3 Pgs'], ['4-6', '4-6 Pgs'], ['7-12', '7-12 Pgs'], ['unlimited', 'Unlimited']].map(([val, label]) => (
                        <button
                          type="button" key={val}
                          className={`config-toggle-btn ${pages === val ? 'active' : ''}`}
                          onClick={() => setPages(val)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-block">
                    <label className="form-label">Motion UI Fidelity</label>
                    <div className="config-toggle-row">
                      {[['basic', 'Basic'], ['micro', 'Micro'], ['kinetic', 'Kinetic']].map(([val, label]) => (
                        <button
                          type="button" key={val}
                          className={`config-toggle-btn ${motionLevel === val ? 'active' : ''}`}
                          onClick={() => setMotionLevel(val)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-block">
                    <label className="form-label">CMS / Backend Integrations</label>
                    <div className="config-toggle-row">
                      {[['none', 'None'], ['markdown', 'Markdown'], ['headless', 'Headless CMS']].map(([val, label]) => (
                        <button
                          type="button" key={val}
                          className={`config-toggle-btn ${cms === val ? 'active' : ''}`}
                          onClick={() => setCms(val)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Addon Checkboxes */}
                  <div className="form-block">
                    <label className="form-label">Add-ons</label>
                    <div className="addons-grid">
                      <label className={`addon-card ${whatsapp ? 'active' : ''}`}>
                        <input type="checkbox" checked={whatsapp} onChange={(e) => setWhatsapp(e.target.checked)} />
                        <span className="addon-name">WhatsApp Automations</span>
                        <span className="addon-price">+₹5,000</span>
                      </label>
                      <label className={`addon-card ${database ? 'active' : ''}`}>
                        <input type="checkbox" checked={database} onChange={(e) => setDatabase(e.target.checked)} />
                        <span className="addon-name">Custom Database &amp; Auth</span>
                        <span className="addon-price">+₹12,000</span>
                      </label>
                      <label className={`addon-card ${seoAudit ? 'active' : ''}`}>
                        <input type="checkbox" checked={seoAudit} onChange={(e) => setSeoAudit(e.target.checked)} />
                        <span className="addon-name">Advanced SEO &amp; Schema</span>
                        <span className="addon-price">+₹2,500</span>
                      </label>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="form-block row-fields">
                    <div className="field-half">
                      <label className="form-label">Your Name</label>
                      <input className="bp-input" type="text" placeholder="Full name" required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="field-half">
                      <label className="form-label">Email Address</label>
                      <input className="bp-input" type="email" placeholder="you@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-block">
                    <label className="form-label">Brief project summary</label>
                    <textarea className="bp-input" rows="3" placeholder="Tell us about your brand/goals..." required value={message} onChange={(e) => setMessage(e.target.value)} />
                  </div>

                  <button type="submit" className="config-submit-btn" disabled={sending}>
                    {sending ? 'Generating Spec Document...' : 'DEPLOY SPEC VIA EMAIL ↗'}
                  </button>
                </form>
              </div>

            </div>
          ) : (
            <div className="modal-step success-step">
              <div className="success-badge">✦</div>
              <h3 className="success-title">SPEC GENERATED</h3>
              <p className="success-desc">
                We are opening your local email application with the pre-compiled spec spreadsheet. Hit send to submit it to our dev queue.
              </p>
              <div className="success-actions">
                <button className="success-action-btn primary-action" onClick={handleSubmit}>
                  RE-OPEN MAIL CLIENT ↗
                </button>
                <button className="success-action-btn secondary-action" onClick={reset}>
                  CLOSE CONFIGURATOR
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
