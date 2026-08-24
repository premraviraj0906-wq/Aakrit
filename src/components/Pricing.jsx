import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Pricing.css';
import Tooltip from './Tooltip';

const plans = [
  {
    id: 'Launch',
    idealFor: 'Portfolios & Landing Pages',
    origStandard: '₹14,999',
    priceStandard: '₹9,999',
    origBundled: '₹22,499',
    priceBundled: '₹14,999',
    limit: '3 Pages Included',
    desc: 'Clean creator portfolios, static landing pages, and single-purpose conversion systems.',
    featuresStandard: [
      '1–3 Page Custom Layout',
      'Fully Responsive Code Structure',
      'Technical SEO Foundation',
      '1 Feedback Iteration Round',
      'Ready in 3 Business Days'
    ],
    featuresBundled: [
      '1–3 Page Custom Layout',
      'Fully Responsive Code Structure',
      'Technical SEO Foundation',
      '1 Feedback Iteration Round',
      'Ready in 3 Business Days',
      '+ Professional Vector Logo Kit',
      '+ Typographic Brand Guide'
    ],
    cta: 'Get started',
    glow: 'rgba(244, 63, 94, 0.12)', // Pink glow
  },
  {
    id: 'Growth',
    idealFor: 'Growing Businesses & Brands',
    origStandard: '₹24,999',
    priceStandard: '₹14,999',
    origBundled: '₹32,499',
    priceBundled: '₹19,999',
    limit: '6 Pages Included',
    desc: 'Animated, highly interactive custom brand websites built to capture high-value leads.',
    featuresStandard: [
      'Up to 6 Bespoke Pages',
      'Interactive Motion UI Blocks',
      'Advanced Metadata & SEO Suite',
      'Secure Lead Capture Form',
      '3 Design Feedback Rounds',
      'Production Server Deployment'
    ],
    featuresBundled: [
      'Up to 6 Bespoke Pages',
      'Interactive Motion UI Blocks',
      'Advanced Metadata & SEO Suite',
      'Secure Lead Capture Form',
      '3 Design Feedback Rounds',
      'Production Server Deployment',
      '+ Professional Vector Logo Kit',
      '+ Custom Sticker & Graphic Assets'
    ],
    cta: 'Get started',
    glow: 'rgba(129, 140, 248, 0.25)', // Indigo glow
  },
  {
    id: 'Scale',
    idealFor: 'High-Performance Products',
    origStandard: '₹44,999',
    priceStandard: '₹29,999',
    origBundled: '₹52,499',
    priceBundled: '₹34,999',
    limit: '12 Pages Included',
    desc: 'Advanced business websites featuring headless content management (CMS) or booking engines.',
    featuresStandard: [
      'Up to 12 Bespoke Pages',
      'Custom Headless CMS Integration',
      'Signature WebGL/JS Animations',
      'Full Speed & Asset Tuning',
      '5 Design Feedback Rounds',
      'Priority Launch Support'
    ],
    featuresBundled: [
      'Up to 12 Bespoke Pages',
      'Custom Headless CMS Integration',
      'Signature WebGL/JS Animations',
      'Full Speed & Asset Tuning',
      '5 Design Feedback Rounds',
      'Priority Launch Support',
      '+ Complete Brand Identity Kit',
      '+ Explainer Video Assets'
    ],
    cta: 'Get started',
    glow: 'rgba(16, 185, 129, 0.12)', // Sage glow
  },
  {
    id: 'Enterprise',
    idealFor: 'Bespoke Platforms & E-Com',
    origStandard: '₹69,999',
    priceStandard: '₹49,999+',
    origBundled: '₹77,499',
    priceBundled: '₹54,999+',
    limit: 'Unlimited Pages',
    desc: 'Custom engineered web applications, full e-commerce checkouts, and custom API pipelines.',
    featuresStandard: [
      'Unlimited Pages Configured',
      'Secure E-Store Checkout Flow',
      'Custom REST/GraphQL APIs',
      'Full SEO Audit & Schema Setup',
      'Unlimited Design Rounds',
      'Comprehensive Launch QA'
    ],
    featuresBundled: [
      'Unlimited Pages Configured',
      'Secure E-Store Checkout Flow',
      'Custom REST/GraphQL APIs',
      'Full SEO Audit & Schema Setup',
      'Unlimited Design Rounds',
      'Comprehensive Launch QA',
      '+ Master Media Directive Pack',
      '+ Signature Custom Animations'
    ],
    cta: 'Contact us',
    glow: 'rgba(245, 158, 11, 0.12)', // Amber glow
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
  },
  {
    title: 'WhatsApp Automations & Bots',
    cost: '+₹14,999 optional',
    details: 'Custom chatbot flows, automated messaging campaigns, and direct CRM integrations for seamless WhatsApp business communication and customer support scaling.',
    tags: ['Automations', 'Chatbots', 'CRM']
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

const PricingCard = ({ plan, isBundled, isFeatured, onOpenEstimator }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const currentPrice = isBundled ? plan.priceBundled : plan.priceStandard;
  const originalPrice = isBundled ? plan.origBundled : plan.origStandard;
  const features = isBundled ? plan.featuresBundled : plan.featuresStandard;

  return (
    <motion.div
      className={`plan-card${isFeatured ? ' plan-featured' : ''}`}
      variants={card}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', overflow: 'hidden' }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      {isHovered && (
        <div
          className="spotlight-glow"
          style={{
            position: 'absolute',
            top: coords.y - 150,
            left: coords.x - 150,
            width: 300,
            height: 300,
            background: `radial-gradient(circle, ${plan.glow} 0%, transparent 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 0,
            transition: 'opacity 0.15s ease',
          }}
        />
      )}
      <div className="plan-card-content">
        {isFeatured && <span className="featured-badge">Recommended</span>}
        <div className="plan-header-block">
          <div className="plan-ideal">{plan.idealFor}</div>
          <div className="plan-name">{plan.id}</div>
        </div>

        <div className="plan-badge-row">
          <span className="plan-limit-badge">{plan.limit}</span>
        </div>

        <div className="plan-price-container">
          {originalPrice && (
            <span className="plan-price-original">was {originalPrice}</span>
          )}
          <motion.div 
            key={currentPrice}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="plan-price"
          >
            {currentPrice}
          </motion.div>
        </div>

        <p className="plan-desc">{plan.desc}</p>
        
        <div className="plan-features-divider" />
        
        <div className="plan-deliverables-title">Key Deliverables</div>
        <ul className="plan-features">
          {features.map((f, idx) => {
            const isHighlight = f.startsWith('+');
            return (
              <li key={idx} className={isHighlight ? 'feat-highlight' : ''}>
                <span className="feat-check">✓</span>
                {f}
              </li>
            );
          })}
        </ul>
        
        <Tooltip text={`Start ${plan.id} plan`} position="top">
          <button className={`plan-btn ${isFeatured ? 'btn-chrome' : 'btn-ghost'}`} onClick={onOpenEstimator}>
            {plan.cta}
          </button>
        </Tooltip>
      </div>
    </motion.div>
  );
};

const Pricing = ({ onOpenEstimator }) => {
  const { ref, isInView } = useScrollReveal(0.1);
  const [showAddons, setShowAddons] = useState(false);
  const [isBundled, setIsBundled] = useState(false);
  const [pageCount, setPageCount] = useState(5); // Default page count

  // Determine which plan is recommended based on page count input
  let recommendedPlanId = 'Growth';
  if (pageCount <= 3) {
    recommendedPlanId = 'Launch';
  } else if (pageCount <= 6) {
    recommendedPlanId = 'Growth';
  } else if (pageCount <= 12) {
    recommendedPlanId = 'Scale';
  } else {
    recommendedPlanId = 'Enterprise';
  }

  return (
    <section id="pricing" className="pricing-section texture-dots">
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={container}>
          <motion.div variants={header} className="pricing-header-wrapper">
            <div>
              <span className="section-label">03 — Rates</span>
              <h2 className="section-title-display">Pricing</h2>
            </div>
            
            <div className="pricing-toggle-container">
              <Tooltip text="Switch to website only" position="top">
                <button 
                  className={`pricing-toggle-btn ${!isBundled ? 'active' : ''}`}
                  onClick={() => setIsBundled(false)}
                >
                  Standard Web
                </button>
              </Tooltip>
              <Tooltip text="Include full branding kit" position="top">
                <button 
                  className={`pricing-toggle-btn ${isBundled ? 'active' : ''}`}
                  onClick={() => setIsBundled(true)}
                >
                  + Branding Bundle
                </button>
              </Tooltip>
              <span className="pricing-toggle-badge">Save ₹2,500!</span>
            </div>
          </motion.div>

          {/* New Interactive Planner Slider Component */}
          <div className="pricing-slider-section">
            <div className="slider-header">
              <span className="slider-label">Project Scope Planner</span>
              <div className="slider-value-display">
                <span className="count-num">{pageCount}</span> {pageCount === 1 ? 'Page' : 'Pages'}
              </div>
            </div>
            
            <Tooltip text="Drag to estimate project scope" position="top">
              <div className="slider-wrapper">
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={pageCount} 
                  onChange={(e) => setPageCount(parseInt(e.target.value))}
                  className="brutalist-slider"
                />
              <div className="slider-ticks">
                <span className={pageCount <= 3 ? 'tick-active' : ''} onClick={() => setPageCount(3)}>1-3 pgs (Launch)</span>
                <span className={(pageCount > 3 && pageCount <= 6) ? 'tick-active' : ''} onClick={() => setPageCount(5)}>4-6 pgs (Growth)</span>
                <span className={(pageCount > 6 && pageCount <= 12) ? 'tick-active' : ''} onClick={() => setPageCount(10)}>7-12 pgs (Scale)</span>
                <span className={pageCount > 12 ? 'tick-active' : ''} onClick={() => setPageCount(18)}>13+ pgs (Enterprise)</span>
              </div>
              </div>
            </Tooltip>
            
            <div className="recommendation-message">
              Based on your page scope, we recommend the <span className="recommend-highlight">{recommendedPlanId}</span> Plan.
            </div>
          </div>

          <div className="pricing-grid">
            {plans.map((plan) => {
              const isRecommended = plan.id === recommendedPlanId;
              return (
                <PricingCard 
                  key={plan.id} 
                  plan={plan} 
                  isBundled={isBundled} 
                  isFeatured={isRecommended}
                  onOpenEstimator={onOpenEstimator} 
                />
              );
            })}
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
