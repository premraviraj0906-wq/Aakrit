import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Pricing.css';

const plans = [
  {
    id: 'Starter', price: '₹12,500',
    desc: 'Clean creator portfolios, static landing pages, and micro builders.',
    features: ['1–3 Page Layout', 'Responsive Code', 'Technical SEO', '1 Feedback Round', 'Ready in 3 Days'],
    cta: 'Get started', featured: false,
  },
  {
    id: 'Creator', price: '₹29,000',
    desc: 'Animated, interactive, high-impact custom sites for growing businesses.',
    features: ['Up to 6 Pages', 'Motion UI Blocks', 'Advanced SEO & Meta', 'Contact Form', '3 Feedback Rounds', 'Production Deploy'],
    cta: 'Get started', featured: true,
  },
  {
    id: 'Business', price: '₹62,500+',
    desc: 'Bespoke application setup, custom content models, or e-store integrations.',
    features: ['Unlimited Pages', 'Custom Headless CMS', 'E-Store Checkout', 'Full SEO Suite', 'Unlimited Rounds', 'Launch QA'],
    cta: 'Contact us', featured: false,
  },
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
                <div className="plan-price">{plan.price}</div>
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
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
