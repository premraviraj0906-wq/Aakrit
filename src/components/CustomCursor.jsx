import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSize = useMotionValue(24);
  
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const sizeSpring = useSpring(cursorSize, { damping: 25, stiffness: 300 });

  useEffect(() => {
    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target;
      if (!target || !target.closest) return;

      const heroSection = target.closest('#home');
      
      if (heroSection) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      let isHover = false;
      const textAndClickableTags = 'p, h1, h2, h3, h4, h5, h6, span, li, a, button, input, textarea, select, label, [role="button"], .stat, strong, em, b, i, th, td, caption';
      
      if (target.closest(textAndClickableTags)) {
        isHover = true;
      } else if (target.children.length === 0 && target.textContent && target.textContent.trim().length > 0) {
        isHover = true;
      } else if (target.childNodes) {
        const hasDirectText = Array.from(target.childNodes).some(
          node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
        );
        if (hasDirectText) isHover = true;
      }

      if (!isHover && window.getComputedStyle) {
        const style = window.getComputedStyle(target);
        if (style.cursor === 'pointer' || style.cursor === 'text') {
          isHover = true;
        }
      }

      // Update size instantly via motion value
      cursorSize.set(isHover ? 100 : 24);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [cursorX, cursorY, cursorSize]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        width: sizeSpring,
        height: sizeSpring,
        borderRadius: '50%',
        backgroundColor: '#ffffff',
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
    />
  );
};

export default CustomCursor;
