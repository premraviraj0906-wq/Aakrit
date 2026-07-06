import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, fadeUp, fadeLeft, fadeRight } from '../hooks/useScrollReveal';
import './Services.css';

const services = [
  {
    id: '01',
    title: 'Design Systems',
    desc: 'Full UX layouts, components, wireframes, and digital identity tailored to your brand.',
    tags: ['Figma', 'Prototyping', 'Visual Drafts', 'UX Logic'],
    variant: fadeLeft,
  },
  {
    id: '02',
    title: 'Web Engineering',
    desc: 'High-performance code, micro-animations, interactive forms, and responsive frontends.',
    tags: ['React', 'Three.js', 'Vite', 'CSS Art'],
    variant: fadeUp,
  },
  {
    id: '03',
    title: 'Deploy & Launch',
    desc: 'Domain setup, analytics, CDN, and performance diagnostics for real traffic.',
    tags: ['Vercel', 'Cloudflare', 'Analytics', 'SEO'],
    variant: fadeRight,
  },
  {
    id: '04',
    title: 'Brand Scaling & Media',
    desc: 'Custom logos, identity assets, premium promo videos, and brand photography guidelines designed to multiply your growth.',
    tags: ['Logo suites', 'Promo Videos', 'Photography', 'Scale Strategy'],
    variant: fadeUp,
  },
];

const Services = () => {
  const { ref, isInView } = useScrollReveal(0.15);
  return (
    <section id="services" className="services-section texture-grid">
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} custom={0}>
            <span className="section-label">01 — Capabilities</span>
            <h2 className="section-title-display">Services</h2>
          </motion.div>
          <div className="services-grid">
            {services.map((s, i) => (
              <motion.div key={s.id} className="svc-card bp-panel" variants={s.variant} custom={i * 0.15}>
                <span className="svc-id">{s.id}</span>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
                <div className="svc-tags">{s.tags.map(t => <span key={t} className="svc-tag">{t}</span>)}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
