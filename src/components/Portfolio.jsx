import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Portfolio.css';

const projects = [
  { id: 'PRJ_01', name: 'Apex Fitness',  type: 'Landing Page',  stack: 'React / Framer',   year: '2026', color: 'rgb(160,224,171)' },
  { id: 'PRJ_02', name: 'Nara Studio',   type: 'Portfolio',     stack: 'Next.js / GSAP',   year: '2026', color: 'rgb(255,172,46)'  },
  { id: 'PRJ_03', name: 'Volta Shop',    type: 'E-Commerce',    stack: 'Shopify / React',  year: '2025', color: 'rgb(165,45,37)'   },
  { id: 'PRJ_04', name: 'Miru Brand',    type: 'Brand Site',    stack: 'Vite / Three.js',  year: '2025', color: 'rgb(160,224,171)' },
  { id: 'PRJ_05', name: 'Helio Blog',    type: 'Content Site',  stack: 'Astro / MDX',      year: '2025', color: 'rgb(255,172,46)'  },
  { id: 'PRJ_06', name: 'Kronos App',    type: 'SaaS Landing',  stack: 'React / Motion',   year: '2025', color: 'rgb(165,45,37)'   },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cell = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const header = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const WorkCard = ({ project }) => (
  <div className="portfolio-card">
    <div className="card-accent" style={{ background: project.color }} />
    <div className="card-body">
      <div className="card-type" style={{ color: project.color }}>{project.type}</div>
      <h3 className="card-name">{project.name}</h3>
      <div className="card-stack">{project.stack}</div>
    </div>
    <div className="card-hover-overlay">View project →</div>
  </div>
);

const Portfolio = () => {
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={container}
        >
          <motion.div variants={header}>
            <span className="section-label">04 — Archive</span>
            <h2 className="section-title-display">Our Work</h2>
          </motion.div>

          <div className="portfolio-grid">
            {projects.map((project) => (
              <motion.div key={project.id} variants={cell}>
                <WorkCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
