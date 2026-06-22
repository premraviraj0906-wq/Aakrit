import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, fadeUp } from '../hooks/useScrollReveal';
import './Footer.css';

const Footer = ({ onOpenEstimator }) => {
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <footer className="footer" id="contact">
      <div className="cta-band">
        <div className="container">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="cta-inner"
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="section-label">Ready to build?</span>
              <h2 className="cta-title">Start your project</h2>
              <p className="cta-sub">
                Drop your spec into the estimator. We turn ideas into live products — fast.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.2} className="cta-actions">
              <button className="btn-chrome" onClick={onOpenEstimator}>
                Get an estimate
              </button>
              <a href="mailto:hello@aakrit.studio" className="btn-ghost">
                Send an email
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="container footer-bar-inner">
          <div className="footer-logo">aakrit</div>
          <p className="footer-copy">© 2026 Aakrit Studio — All rights reserved.</p>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#portfolio">Work</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
