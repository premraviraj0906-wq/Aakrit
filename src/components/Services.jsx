import React, { useState } from 'react';
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
    glow: 'rgba(244, 63, 94, 0.2)', // Rose glow
  },
  {
    id: '02',
    title: 'Web Engineering',
    desc: 'High-performance code, micro-animations, interactive forms, and responsive frontends.',
    tags: ['React', 'Three.js', 'Vite', 'CSS Art'],
    variant: fadeUp,
    glow: 'rgba(16, 185, 129, 0.2)', // Sage glow
  },
  {
    id: '03',
    title: 'Deploy & Launch',
    desc: 'Domain setup, analytics, CDN, and performance diagnostics for real traffic.',
    tags: ['Vercel', 'Cloudflare', 'Analytics', 'SEO'],
    variant: fadeRight,
    glow: 'rgba(59, 130, 246, 0.2)', // Sky glow
  },
  {
    id: '04',
    title: 'Brand Scaling & Media',
    desc: 'Custom logos, identity assets, premium promo videos, and brand photography guidelines designed to multiply your growth.',
    tags: ['Logo suites', 'Promo Videos', 'Photography', 'Scale Strategy'],
    variant: fadeUp,
    glow: 'rgba(245, 158, 11, 0.2)', // Amber glow
  },
];

const ServiceCard = ({ s, i }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className="svc-card bp-panel"
      variants={s.variant}
      custom={i * 0.15}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {isHovered && (
        <div
          className="spotlight-glow"
          style={{
            position: 'absolute',
            top: coords.y - 120,
            left: coords.x - 120,
            width: 240,
            height: 240,
            background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 0,
            transition: 'opacity 0.15s ease',
          }}
        />
      )}
      <div className="svc-card-content">
        <span className="svc-id">{s.id}</span>
        <h3 className="svc-title">{s.title}</h3>
        <p className="svc-desc">{s.desc}</p>
        <div className="svc-tags">
          {s.tags.map(t => (
            <span key={t} className="svc-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

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
              <ServiceCard key={s.id} s={s} i={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
