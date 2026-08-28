import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';
import logoWhite from '../assets/aakrit_logo_white.png';

const Navbar = ({ onOpenEstimator }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fn = () => setIsVisible(window.scrollY > window.innerHeight * 0.4);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const handleCTA = () => {
    closeMenu();
    onOpenEstimator();
  };

  // Curtain animation variants
  const curtainVariants = {
    closed: { y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    open: { y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  };

  const linkVariants = {
    closed: { y: 50, opacity: 0 },
    open: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.3 + (i * 0.1), duration: 0.5, ease: 'easeOut' }
    })
  };

  return (
    <>
      {/* Top Left Hamburger Button */}
      <AnimatePresence>
        {(isVisible || isOpen) && (
          <motion.button 
            className={`hamburger-btn ${isOpen ? 'is-open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <span className="hamburger-line top-line"></span>
            <span className="hamburger-line bottom-line"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full Screen Curtain Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="curtain-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={curtainVariants}
          >
            <div className="curtain-inner">
              <div className="curtain-header">
                <img src={logoWhite} alt="Aakrit" className="curtain-logo-img" />
              </div>

              <div className="curtain-body">
                <ul className="curtain-links">
                  {['Origins', 'Capabilities', 'Selected Works', 'Process', 'Pricing'].map((item, i) => {
                    const hrefMap = {
                      'Origins': '#about',
                      'Capabilities': '#services',
                      'Selected Works': '#work',
                      'Process': '#process',
                      'Pricing': '#pricing'
                    };
                    return (
                      <motion.li 
                        key={item}
                        custom={i}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <a href={hrefMap[item]} onClick={closeMenu}>
                          {item}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.div 
                  className="curtain-cta-wrap"
                  custom={4}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <p className="curtain-cta-desc">Ready to scale your brand?</p>
                  <button className="curtain-cta-btn" onClick={handleCTA}>
                    INITIATE SEQUENCE
                  </button>
                </motion.div>
              </div>

              <div className="curtain-footer">
                <div className="curtain-socials">
                  <a href="mailto:aakrit.works@gmail.com">EMAIL</a>
                  <a href="https://www.instagram.com/aakrit.web?igsi=MTBkbnhheGxnMWw2YQ==" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                </div>
                <div className="curtain-region">BASE: INDIA / REMOTE</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
