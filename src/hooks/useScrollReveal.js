import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Returns { ref, isInView } for scroll-triggered animations.
 * @param {number} threshold – intersection ratio (0-1)
 * @param {boolean} once – only trigger once
 */
export const useScrollReveal = (threshold = 0.05, once = true) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });
  return { ref, isInView };
};

/** Shared variants for reuse */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};
