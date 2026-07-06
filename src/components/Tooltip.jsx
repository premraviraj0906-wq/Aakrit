import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Tooltip.css';

const Tooltip = ({ text, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const touchTimeout = useRef(null);

  // Mobile Long-Press Logic
  const handleTouchStart = () => {
    touchTimeout.current = setTimeout(() => {
      setIsVisible(true);
    }, 400); // Show tooltip after 400ms long press
  };

  const handleTouchEnd = () => {
    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current);
    }
    // Auto-hide tooltip after 1.5s on mobile
    if (isVisible) {
      setTimeout(() => setIsVisible(false), 1500);
    }
  };

  useEffect(() => {
    return () => {
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
    };
  }, []);

  return (
    <div 
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`tooltip-box tooltip-${position}`}
            initial={{ opacity: 0, y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {text}
            <div className={`tooltip-arrow tooltip-arrow-${position}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
