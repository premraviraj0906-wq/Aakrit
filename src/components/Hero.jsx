import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import Tooltip from './Tooltip';
import logoWhite from '../assets/aakrit_logo_white.png';

const AnimatedNumber = ({ value, duration = 1200, prefix = '', suffix = '' }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) return;
    if (start === end) {
      setCount(end);
      return;
    }
    
    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span>{prefix}{count.toLocaleString()}{suffix}</span>
  );
};

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
          Brand Scaling & Digital Suite
        </motion.p>

        <motion.h1 className="hero-title"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}>
          <img src={logoWhite} className="hero-logo-img" alt="Aakrit" loading="lazy" />
        </motion.h1>

        <motion.p className="hero-tagline"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}>
          Your business called — it wants a glow-up.
        </motion.p>

        <motion.div className="hero-ctas"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}>
          <Tooltip text="Opens project estimator" position="bottom">
            <button className="btn-chrome" onClick={onOpenEstimator}>Get in touch</button>
          </Tooltip>
          <Tooltip text="Learn more about us" position="bottom">
            <a href="#about" className="btn-ghost">About Us</a>
          </Tooltip>
        </motion.div>

        <motion.div className="hero-stats"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}>
          <div className="stat">
            <span className="stat-val"><AnimatedNumber value="9999" prefix="₹" suffix="+" /></span>
            <span className="stat-key">Base rate</span>
          </div>
          <div className="stat-sep" />
          <div className="stat">
            <span className="stat-val"><AnimatedNumber value="100" suffix="%" /></span>
            <span className="stat-key">Custom built</span>
          </div>
          <div className="stat-sep" />
          <div className="stat">
            <span className="stat-val"><AnimatedNumber value="3" suffix=" days" /></span>
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
