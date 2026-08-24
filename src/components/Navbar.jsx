import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

import Tooltip from './Tooltip';
import logoIconWhite from '../assets/aakrit_icon_white.png';

const Navbar = ({ onOpenEstimator }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="navbar-container">
        <Tooltip text="Return to top" position="bottom">
          <a href="#home" className="logo" aria-label="Aakrit home">
            <img src={logoIconWhite} className="logo-img" alt="Aakrit logo" loading="lazy" />
          </a>
        </Tooltip>
        <ul className="nav-links">
          <li><Tooltip text="Who we are" position="bottom"><a href="#about">About</a></Tooltip></li>
          <li><Tooltip text="What we build" position="bottom"><a href="#services">Services</a></Tooltip></li>
          <li><Tooltip text="How we work" position="bottom"><a href="#process">Process</a></Tooltip></li>
          <li><Tooltip text="View pricing" position="bottom"><a href="#pricing">Pricing</a></Tooltip></li>
        </ul>
        <Tooltip text="Opens interactive modal" position="bottom">
          <button className="nav-cta" onClick={onOpenEstimator}>Get a quote</button>
        </Tooltip>
      </div>
    </motion.nav>
  );
};

export default Navbar;
