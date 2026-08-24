import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, fadeUp } from '../hooks/useScrollReveal';
import './Footer.css';
import logoIconWhite from '../assets/aakrit_icon_white.png';

const Footer = ({ onOpenEstimator }) => {
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <footer className="footer" id="contact">
      <div className="cta-band texture-dots" onClick={onOpenEstimator}>
        <div className="cta-marquee-container">
          <div className="cta-marquee-track">
            <span className="cta-marquee-text">START YOUR PROJECT </span>
            <span className="cta-marquee-star">✦</span>
            <span className="cta-marquee-text">LET'S BUILD </span>
            <span className="cta-marquee-star">✦</span>
            <span className="cta-marquee-text">START YOUR PROJECT </span>
            <span className="cta-marquee-star">✦</span>
            <span className="cta-marquee-text">LET'S BUILD </span>
            <span className="cta-marquee-star">✦</span>
            <span className="cta-marquee-text">START YOUR PROJECT </span>
            <span className="cta-marquee-star">✦</span>
            <span className="cta-marquee-text">LET'S BUILD </span>
            <span className="cta-marquee-star">✦</span>
          </div>
          <div className="cta-hover-overlay">
            <div className="cta-hover-content">
              <span className="cta-hover-main">CLICK TO GET ESTIMATE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <div className="footer-logo-wrap">
                <img src={logoIconWhite} className="footer-logo-img" alt="Aakrit logo icon" loading="lazy" />
                <span className="footer-logo-text">aakrit</span>
              </div>
              <p className="footer-brand-desc">
                High-performance, animated web engineering. Building responsive, interactive web experiences for creators and startups.
              </p>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-label">Navigation</span>
              <ul className="footer-col-links">
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#process">Process</a></li>
                <li><a href="#pricing">Pricing</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-label">Connect</span>
              <div className="footer-connect-info">
                <a href="mailto:aakrit.works@gmail.com" className="footer-email-link">
                  aakrit.works@gmail.com
                </a>
                <span className="footer-region">Base: India / Remote</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="container footer-bar-inner">
          <span className="footer-copy"></span>
          <span className="footer-att">Precision Web, Micro Budget.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
