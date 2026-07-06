import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Pricing.css';

const plans = [
  {
    id: 'Launch', originalPrice: '₹14,999', price: '₹9,999', limit: '3 Pages Included',
    desc: 'Clean creator portfolios, static landing pages, and micro builders.',
    features: ['1–3 Page Layout', 'Responsive Code', 'Technical SEO', '1 Feedback Round', 'Ready in 3 Days'],
    cta: 'Get started', featured: false,
  },
  {
    id: 'Growth', originalPrice: '₹24,999', price: '₹14,999', limit: '6 Pages Included',
    desc: 'Animated, interactive, high-impact custom sites for growing businesses.',
    features: ['Up to 6 Pages', 'Motion UI Blocks', 'Advanced SEO & Meta', 'Contact Form', '3 Feedback Rounds', 'Production Deploy'],
    cta: 'Get started', featured: true,
  },
  {
    id: 'Scale', originalPrice: '₹44,999', price: '₹29,999', limit: '12 Pages Included',
    desc: 'Advanced business websites with CMS or custom booking integrations.',
    features: ['Up to 12 Pages', 'Custom Headless CMS', 'Advanced Animations', 'Speed Optimization', '5 Feedback Rounds', 'Priority Support'],
    cta: 'Get started', featured: false,
  },
  {
    id: 'Enterprise', originalPrice: '₹69,999', price: '₹49,999+', limit: 'Unlimited Pages',
    desc: 'Bespoke application setup, full e-commerce stores, custom integrations.',
    features: ['Unlimited Pages', 'E-Store Checkout', 'Custom API Integrations', 'Full SEO Suite', 'Unlimited Rounds', 'Launch QA'],
    cta: 'Contact us', featured: false,
  },
];

const breakdownItems = [
  {
    title: 'Domain & Hosting Setup',
    cost: 'Depends on TLD',
    details: 'Managed high-speed CDN hosting setup is free for the first year. Domain registration cost depends on the specific domain chosen (.com, .in, .ai, etc.).',
    tags: ['Infrastructure', 'Domain', 'Hosting']
  },
  {
    title: 'Technical SEO Suite',
    cost: 'Included in all plans',
    details: 'Semantic HTML markup structures, JSON-LD Schema structures, automatic sitemap.xml & robots.txt creation, image ALT tag compression, and Google Search Console index configuration.',
    tags: ['Marketing', 'SEO', 'Indexation']
  },
  {
    title: 'Brand Media & Growth Suite',
    cost: '+₹7,500 optional',
    details: 'Professional SVG logo vectors, digital branding kit (typography & color tokens), custom vector sticker assets, ready-to-use video explainer layouts, and photography directives.',
    tags: ['Identity', 'Graphics', 'Video']
  },
  {
    title: 'Additional Feedback Loop',
    cost: '+₹1,500 / round',
    details: 'Need additional visual mockups or design iterations beyond your tier\'s default limits? Secure full-frame page revisions in Figma and React code.',
    tags: ['Process', 'Revisions', 'Figma']
  }
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const card = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const header = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Pricing = ({ onOpenEstimator }) => {
  const { ref, isInView } = useScrollReveal(0.1);
  const [showAddons, setShowAddons] = React.useState(false);

  return (
    <section id="pricing" className="pricing-section texture-dots">
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={container}>
          <motion.div variants={header}>
            <span className="section-label">03 — Rates</span>
            <h2 className="section-title-display">Pricing</h2>
          </motion.div>
          <div className="pricing-grid">
            {plans.map((plan) => (
              <motion.div key={plan.id} className={`plan-card${plan.featured ? ' plan-featured' : ''}`} variants={card}>
                {plan.featured && <span className="featured-badge">Recommended</span>}
                <div className="plan-name">{plan.id}</div>
                <div className="plan-badge-row">
                  <span className="plan-limit-badge">{plan.limit}</span>
                </div>
                <div className="plan-price-container">
                  {plan.originalPrice && <span className="plan-price-original">{plan.originalPrice}</span>}
                  <div className="plan-price">{plan.price}</div>
                </div>
                <p className="plan-desc">{plan.desc}</p>
                <ul className="plan-features">
                  {plan.features.map(f => <li key={f}><span className="feat-check">✓</span>{f}</li>)}
                </ul>
                <button className={`plan-btn ${plan.featured ? 'btn-chrome' : 'btn-ghost'}`} onClick={onOpenEstimator}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="pricing-breakdown-section">
            <button 
              className="addons-dropdown-toggle"
              onClick={() => setShowAddons(!showAddons)}
            >
              <span>View Optional Add-ons & Expenses</span>
              <motion.span 
                animate={{ rotate: showAddons ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="toggle-arrow"
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {showAddons && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="addons-dropdown-content"
                  style={{ overflow: 'hidden' }}
                >
                  <div className="breakdown-grid" style={{ paddingTop: '20px' }}>
                    {breakdownItems.map((item) => (
                      <div key={item.title} className="breakdown-card">
                        <div className="breakdown-card-header">
                          <h4 className="breakdown-card-title">{item.title}</h4>
                          <span className="breakdown-card-cost">{item.cost}</span>
                        </div>
                        <p className="breakdown-card-details">{item.details}</p>
                        <div className="breakdown-card-tags">
                          {item.tags.map(t => <span key={t} className="breakdown-card-tag">{t}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
