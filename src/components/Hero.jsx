import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = ({ onOpenEstimator }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates from -1 to 1 for parallax
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate stars once with useMemo
  const stars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, // 1px to 3px
      speedX: (Math.random() - 0.5) * 40, // Max 20px movement
      speedY: (Math.random() - 0.5) * 40, // Max 20px movement
      opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6 opacity
    }));
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg-art">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="star"
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              opacity: star.opacity,
            }}
            animate={{
              x: mousePosition.x * star.speedX,
              y: mousePosition.y * star.speedY,
            }}
            transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
          />
        ))}
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
};

export default Hero;
