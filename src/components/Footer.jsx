import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';
import logoWhite from '../assets/aakrit_logo_white.png';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Origins', href: '#about' },
  { label: 'Capabilities', href: '#services' },
  { label: 'Selected Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
];

const contactLinks = [
  { label: 'aakrit.works@gmail.com', href: 'mailto:aakrit.works@gmail.com' },
  { label: '+91 77603 35502', href: 'tel:7760335502' },
  { label: '@aakrit.web', href: 'https://www.instagram.com/aakrit.web?igsi=MTBkbnhheGxnMWw2YQ==' },
];

// ── Footer Component ──────────────────────────────────────────────────
const Footer = ({ onOpenEstimator }) => {
  const footerRef = useRef(null);

  return (
    <footer className="footer-new" id="contact" ref={footerRef}>

      {/* Marquee CTA band */}
      <div className="footer-marquee-band" onClick={onOpenEstimator}>
        <div className="footer-marquee-inner">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="footer-marquee-item">
              START A PROJECT <span className="fm-star">✦</span>
            </span>
          ))}
        </div>
        <div className="footer-marquee-hover">INITIATE SEQUENCE →</div>
      </div>

      {/* Body — grid area */}
      <div className="footer-body-area">
        {/* Background logo image at low opacity */}
        <img src={logoWhite} alt="" className="footer-bg-logo" aria-hidden="true" />

        {/* Foreground grid */}
        <div className="footer-grid-area">

          <div className="footer-logo-col">
            <img src={logoWhite} alt="Aakrit" className="footer-logo-img" />
            <span className="footer-base-tag">BASE: INDIA / REMOTE</span>
          </div>

          <nav className="footer-nav-col">
            <span className="footer-col-head">Navigation</span>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="footer-link">{l.label}</a>
            ))}
          </nav>

          <div className="footer-contact-col">
            <span className="footer-col-head">Contact</span>
            {contactLinks.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                {l.label}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom strip */}
      <div className="footer-strip">
        <span>Precision Web, Micro Budget.</span>
        <span>Aakrit Web Studio</span>
      </div>

    </footer>
  );
};

export default Footer;
