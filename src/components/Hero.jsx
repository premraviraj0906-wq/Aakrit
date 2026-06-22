import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = ({ onOpenEstimator }) => (
  <section className="hero" id="home">
    <div className="hero-bg-art">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>

    <div className="hero-content">
      <motion.p className="hero-label"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}>
        Web Development Studio
      </motion.p>

      <motion.h1 className="hero-title"
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45 }}>
        AAKRIT
      </motion.h1>

      <motion.h2 className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65 }}>
        Sites for less money
      </motion.h2>

      <motion.p className="hero-desc"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.85 }}>
        No boring templates. No agency markups. Custom-engineered web experiences for creators, startups, and micro-brands.
      </motion.p>

      <motion.div className="hero-ctas"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}>
        <button className="btn-chrome" onClick={onOpenEstimator}>Get an estimate</button>
        <a href="#services" className="btn-ghost">See our work</a>
      </motion.div>

      <motion.div className="hero-stats"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}>
        <div className="stat">
          <span className="stat-val">₹12,500+</span>
          <span className="stat-key">Base rate</span>
        </div>
        <div className="stat-sep" />
        <div className="stat">
          <span className="stat-val">100%</span>
          <span className="stat-key">Custom built</span>
        </div>
        <div className="stat-sep" />
        <div className="stat">
          <span className="stat-val">3 days</span>
          <span className="stat-key">Turnaround</span>
        </div>
      </motion.div>
    </div>

    <motion.div className="scroll-hint"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}>
      <motion.span className="scroll-arrow"
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
        ↓
      </motion.span>
      <span>Scroll to explore</span>
    </motion.div>
  </section>
);

export default Hero;
