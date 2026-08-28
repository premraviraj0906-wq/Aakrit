import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Pricing.css';

gsap.registerPlugin(ScrollTrigger);

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789₹,./+- ';

const plans = [
  {
    id: 'LAUNCH',
    num: '01',
    tagline: 'PORTFOLIOS & LANDING PAGES',
    price: '₹9,999',
    was: '₹14,999',
    limit: 'UP TO 3 PAGES',
    features: [
      '1–3 PAGE CUSTOM LAYOUT',
      'FULLY RESPONSIVE CODE',
      'TECHNICAL SEO FOUNDATION',
      '1 FEEDBACK ROUND',
      'READY IN 3 BUSINESS DAYS'
    ],
    bg: '#4b1426', text: '#dad5ab', accent: '#ffb6c1'
  },
  {
    id: 'GROWTH',
    num: '02',
    tagline: 'GROWING BUSINESSES & BRANDS',
    price: '₹14,999',
    was: '₹24,999',
    limit: 'UP TO 6 PAGES',
    features: [
      'UP TO 6 BESPOKE PAGES',
      'INTERACTIVE MOTION UI',
      'ADVANCED SEO SUITE',
      'SECURE LEAD CAPTURE FORM',
      '3 DESIGN FEEDBACK ROUNDS',
      'PRODUCTION DEPLOYMENT'
    ],
    bg: '#ffb6c1', text: '#4b1426', accent: '#17433f'
  },
  {
    id: 'SCALE',
    num: '03',
    tagline: 'HIGH-PERFORMANCE PRODUCTS',
    price: '₹29,999',
    was: '₹44,999',
    limit: 'UP TO 12 PAGES',
    features: [
      'UP TO 12 BESPOKE PAGES',
      'CUSTOM HEADLESS CMS',
      'SIGNATURE JS ANIMATIONS',
      'SPEED & ASSET TUNING',
      '5 FEEDBACK ROUNDS',
      'PRIORITY LAUNCH SUPPORT'
    ],
    bg: '#17433f', text: '#dad5ab', accent: '#ffb6c1'
  },
  {
    id: 'ENTERPRISE',
    num: '04',
    tagline: 'BESPOKE PLATFORMS & E-COM',
    price: '₹49,999+',
    was: '₹69,999',
    limit: 'UNLIMITED PAGES',
    features: [
      'UNLIMITED PAGES',
      'E-STORE CHECKOUT FLOW',
      'CUSTOM REST/GRAPHQL APIS',
      'FULL SEO AUDIT & SCHEMA',
      'UNLIMITED DESIGN ROUNDS',
      'COMPREHENSIVE LAUNCH QA'
    ],
    bg: '#dad5ab', text: '#4b1426', accent: '#17433f'
  }
];

// ── Split-Flap Character ──────────────────────────────────────────────
const FlipChar = ({ char, delay = 0 }) => {
  const [display, setDisplay] = useState(char);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    let timeouts = [];
    let iterations = 0;
    const totalFlips = 10 + Math.floor(Math.random() * 6);

    const flip = () => {
      if (iterations >= totalFlips) {
        setDisplay(char === ' ' ? '\u00A0' : char);
        setFlipping(false);
        return;
      }
      setFlipping(true);
      setDisplay(char === ' ' ? '\u00A0' : CHARS[Math.floor(Math.random() * CHARS.length)]);
      iterations++;
      const t = setTimeout(flip, 40 + iterations * 4);
      timeouts.push(t);
    };

    const start = setTimeout(flip, delay);
    timeouts.push(start);

    return () => timeouts.forEach(clearTimeout);
  }, [char, delay]);

  return (
    <span className={`flip-char ${flipping ? 'flipping' : ''}`}>
      {display}
    </span>
  );
};

// ── Animated FlipText line ────────────────────────────────────────────
const FlipText = ({ text, className = '', baseDelay = 0, trigger }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(k => k + 1);
  }, [trigger]);

  return (
    <span className={`flip-text ${className}`}>
      {text.split('').map((ch, i) => (
        <FlipChar key={`${key}-${i}`} char={ch} delay={baseDelay + i * 28} />
      ))}
    </span>
  );
};

// ── Main Pricing Component ────────────────────────────────────────────
const Pricing = ({ onOpenEstimator }) => {
  const [active, setActive] = useState(0);
  const [flipKey, setFlipKey] = useState(0);
  const sectionRef = useRef(null);

  const switchPlan = useCallback((idx) => {
    setActive(idx);
    setFlipKey(k => k + 1);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-board',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'top 40%', scrub: 1 }
        }
      );
      gsap.fromTo('.pricing-plan-tabs',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'top 50%', scrub: 1 }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const plan = plans[active];

  return (
    <section id="pricing" className="pricing-section" ref={sectionRef}>

      {/* Section header */}
      <div className="pricing-section-header">
        <span className="pricing-section-label">05 — Rates</span>
        <h2 className="pricing-section-title">Pricing</h2>
      </div>

      {/* Plan selector tabs */}
      <div className="pricing-plan-tabs">
        {plans.map((p, i) => (
          <button
            key={p.id}
            className={`plan-tab ${active === i ? 'active' : ''}`}
            style={active === i ? { background: p.bg, color: p.text, borderColor: p.bg } : {}}
            onClick={() => switchPlan(i)}
          >
            <span className="plan-tab-num">{p.num}</span>
            <span className="plan-tab-name">{p.id}</span>
          </button>
        ))}
      </div>

      {/* The Departure Board */}
      <div className="pricing-board" style={{ background: plan.bg, color: plan.text }}>

        {/* Ghost BG number */}
        <div
          className="board-bg-num"
          style={{ WebkitTextStroke: `2px ${plan.accent}`, opacity: 0.06 }}
        >{plan.num}</div>

        {/* Row 1 — Plan name + tagline */}
        <div className="board-row board-row-header" style={{ borderColor: `${plan.text}20` }}>
          <div className="board-cell cell-label" style={{ color: plan.accent }}>PLAN</div>
          <div className="board-cell cell-plan-name">
            <FlipText text={plan.id} className="text-plan-name" baseDelay={0} trigger={flipKey} />
          </div>
          <div className="board-cell cell-tagline">
            <FlipText text={plan.tagline} className="text-tagline" baseDelay={100} trigger={flipKey} />
          </div>
          <div className="board-cell cell-limit" style={{ color: plan.accent }}>
            <FlipText text={plan.limit} className="text-limit" baseDelay={200} trigger={flipKey} />
          </div>
        </div>

        {/* Row 2 — Big price */}
        <div className="board-row board-row-price" style={{ borderColor: `${plan.text}20` }}>
          <div className="board-cell cell-label" style={{ color: plan.accent }}>RATE</div>
          <div className="board-cell cell-was" style={{ opacity: 0.4 }}>
            <span className="was-label">WAS</span>
            <FlipText text={plan.was} className="text-was" baseDelay={0} trigger={flipKey} />
          </div>
          <div className="board-cell cell-price">
            <FlipText text={plan.price} className="text-price" baseDelay={60} trigger={flipKey} />
          </div>
          <div className="board-cell cell-cta">
            <button
              className="board-cta-btn"
              style={{ background: plan.accent, color: plan.bg }}
              onClick={onOpenEstimator}
            >
              START ↗
            </button>
          </div>
        </div>

        {/* Row 3 — Features */}
        <div className="board-row board-row-features">
          <div className="board-cell cell-label" style={{ color: plan.accent }}>INCLUDES</div>
          <div className="board-cell cell-features">
            {plan.features.map((f, i) => (
              <div key={`${flipKey}-${i}`} className="board-feature" style={{ animationDelay: `${i * 80 + 400}ms` }}>
                <span className="bf-check" style={{ color: plan.accent }}>✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <p className="pricing-footnote">
        * All plans include technical SEO, domain setup assistance & CDN hosting.
        Branding bundles available on request.
      </p>

    </section>
  );
};

export default Pricing;
