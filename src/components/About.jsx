import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

const panels = [
  {
    num: 'CHAPTER 01 // THE CATALYST',
    title: 'The Spark',
    sfx: 'ZIP!',
    body: 'We saw brands struggling to stand out in a sea of generic templates and bloated agency markups. Aakrit was born to bridge this gap: building distinct, high-impact digital products and memorable brand systems that bridge the gap between design and top-tier code.',
    slideDirection: 'left'
  },
  {
    num: 'CHAPTER 02 // BRAND IDENTITY',
    title: 'Brand Scaling',
    sfx: 'BOOM!',
    body: 'We don\'t just build sites; we scale your entire brand presence. We design custom vector logo suites, shape production-ready brand directives, direct creative photography guidelines, and coordinate premium promotional video assets that make your business instantly iconic.',
    slideDirection: 'right'
  },
  {
    num: 'CHAPTER 03 // WEB ENGINEERING',
    title: 'Web Engineering',
    sfx: 'WHOOSH!',
    body: 'We turn designs into pixel-perfect, custom-engineered code. Using React, Vite, and Framer Motion, we build blazing-fast web interfaces, custom interactive components, and smooth micro-animations that engage visitors and load in milliseconds.',
    slideDirection: 'left'
  },
  {
    num: 'CHAPTER 04 // THE PIPELINE',
    title: 'System Launch',
    sfx: 'SHINE!',
    body: 'We handle the full technical launch: from advanced technical SEO (sitemaps, structured data) to DNS configuration, CDN hosting, and analytics setup. You get a production-ready system optimized for real traffic, scaling at a fraction of typical agency costs.',
    slideDirection: 'right'
  }
];

const panelVariants = {
  hiddenLeft: { opacity: 0, x: -60, y: 30, scale: 0.95 },
  hiddenRight: { opacity: 0, x: 60, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15, delay: i * 0.18 }
  })
};

const About = () => {
  const { ref, isInView } = useScrollReveal(0.08);

  return (
    <section id="about" className="about-section texture-dots">
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <span className="section-label">00 — Origins</span>
          <h2 className="section-title-display" style={{ marginBottom: '20px' }}>Story of Aakrit</h2>
          
          <div className="manga-grid">
            {panels.map((p, i) => (
              <motion.div
                key={i}
                className="manga-panel"
                variants={panelVariants}
                initial={p.slideDirection === 'left' ? 'hiddenLeft' : 'hiddenRight'}
                animate={isInView ? 'visible' : 'hidden'}
                custom={i}
                style={{ originX: 0.5, originY: 0.5 }}
              >
                <div className="screentone" />
                <span className="manga-sfx">{p.sfx}</span>
                <span className="manga-num">{p.num}</span>
                <h3 className="manga-title">{p.title}</h3>
                <p className="manga-body">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
