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
<span className="hero-title-suffix">A</span><svg className="hero-logo-svg" viewBox="0 0 144.68979 86.450287" aria-hidden="true"><g transform="translate(-38.310212,-75.859841)"><path d="m 63.489984,161.93732 c -19.708773,-2.59797 -31.1862,-22.83538 -21.919083,-38.64852 7.280192,-12.4227 27.564055,-17.96824 45.35545,-12.40002 3.534493,1.1062 6.852877,1.74766 7.374185,1.42548 1.04141,-0.64363 0.265278,-10.57752 -1.452051,-18.585149 C 91.351293,86.747947 86.465466,81.551041 79.924047,79.981779 67.764926,77.064851 50,83.613377 50,91.012414 c 0,0.958483 -0.669675,2.298478 -1.488167,2.977765 -1.205308,1.000317 -1.605951,0.928129 -2.107847,-0.379791 -2.069139,-5.392092 4.493358,-12.571715 14.243875,-15.583343 8.442003,-2.607469 23.780466,-2.783428 31.287512,-0.358922 6.145872,1.984895 13.360017,8.030413 16.180847,13.559683 2.67374,5.240964 4.84478,15.734864 4.86642,23.522194 0.01,3.4375 0.44735,6.25 0.97289,6.25 0.52554,0 6.5736,-7.35473 13.44014,-16.34385 14.0419,-18.382533 17.38065,-21.689032 26.03457,-25.783066 C 160.21631,75.662705 170,74.783095 170,77.383369 c 0,1.579281 -3.00152,2.58309 -7.78324,2.602976 -4.18774,0.01742 -12.11539,4.025021 -17.40516,8.798695 C 140.56437,92.617893 131,104.64232 131,106.14913 c 0,0.46798 1.27848,0.85087 2.84107,0.85087 1.56259,0 4.905,0.62115 7.42758,1.38034 11.14513,3.35419 15.0977,9.93289 17.26739,28.74004 0.7855,6.80879 2.165,14.0348 3.06556,16.05779 3.07619,6.91033 10.71958,7.27112 16.92055,0.79871 3.07807,-3.21282 4.47785,-3.73581 4.47785,-1.67305 0,1.84379 -5.9625,7.37086 -9.3151,8.63484 -3.98516,1.50246 -15.1523,1.3167 -18.96702,-0.31551 -7.16001,-3.06356 -11.99875,-11.43342 -13.71835,-23.72946 -1.54034,-11.01416 -3.69453,-17.47674 -7.12976,-21.38924 -5.22618,-5.9523 -6.16167,-5.36387 -19.46825,12.24554 -15.335477,20.29437 -24.181881,29.28488 -31.459404,31.97187 -6.520144,2.40736 -12.676811,3.10856 -19.452132,2.21545 z m 18.960821,-5.46842 c 2.172942,-1.03805 5.885442,-3.74107 8.25,-6.00671 L 95,146.34283 v -14.14836 c 0,-13.59415 -0.08867,-14.20646 -2.263635,-15.63155 -3.740926,-2.45115 -14.727302,-4.81825 -20.007887,-4.31085 -6.430564,0.61789 -9.595216,3.0802 -13.228478,10.29261 -2.597489,5.15629 -2.998246,7.03567 -2.986925,14.00742 0.0108,6.6494 0.456635,8.91405 2.559283,13 3.554579,6.90741 7.99533,9.74377 14.427642,9.2151 2.75,-0.22602 6.777862,-1.26026 8.950805,-2.2983 z" fill="currentColor" /></g></svg><span className="hero-title-suffix">RIT</span>
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
          <a href="#about" className="btn-ghost">About Us</a>
        </motion.div>

        <motion.div className="hero-stats"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}>
          <div className="stat">
            <span className="stat-val">₹9,999+</span>
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
