import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, fadeUp } from '../hooks/useScrollReveal';
import './About.css';

const About = () => {
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="about" className="about-section texture-dots">
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="about-grid">
          <motion.div variants={fadeUp} className="about-content">
            <span className="section-label">01 — About Us</span>
            <h2 className="section-title-display">We build web experiences that matter.</h2>
            <p className="about-desc">
              At Aakrit, we believe that the web is a canvas for creativity and innovation. We are a dedicated studio that focuses on crafting bespoke digital solutions for creators, startups, and growing businesses.
            </p>
            <p className="about-desc">
              We reject boring templates and agency markups. Instead, we engineer custom, high-performance, and visually stunning web applications tailored exactly to your brand's unique identity. From simple landing pages to complex e-commerce platforms, we handle it all with precision and passion.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
