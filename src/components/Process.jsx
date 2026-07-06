import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal, fadeUp } from '../hooks/useScrollReveal';
import './Process.css';

const steps = [
  {
    n: '01',
    title: 'Scope & Plan',
    color: '#fdf2f8', // Pastel Rose
    desc: 'We outline the architecture and estimate the budget — no hidden costs, no surprises. A thorough discovery phase ensures every requirement is captured before design begins.',
    tags: ['Discovery', 'Budgeting', 'Architecture'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    )
  },
  {
    n: '02',
    title: 'Design Draft',
    color: '#e6f4ea', // Pastel Sage
    desc: 'Wireframes and high-fidelity visual components built in Figma. You review, adjust, and approve the look and feel before any code is written, guaranteeing perfect alignment with your brand.',
    tags: ['Figma', 'Wireframes', 'Mockups'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )
  },
  {
    n: '03',
    title: 'Engineering',
    color: '#e8f0fe', // Pastel Sky
    desc: 'Pixel-perfect frontend development with interactive components, smooth motion, and robust backend integrations. We build for speed, accessibility, and scale.',
    tags: ['React', 'Motion', 'Frontend'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  {
    n: '04',
    title: 'System Launch',
    color: '#fef3c7', // Pastel Wheat
    desc: 'DNS setup, rigorous cross-device QA testing, build optimization, and live deployment. We ensure a flawless launch and provide priority post-launch support.',
    tags: ['Vercel', 'QA Testing', 'Deploy'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    )
  }
];

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="process" className="process-section texture-dots">
      <div className="container" ref={ref}>
        <motion.div 
          className="process-header"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <span className="section-label">02 — Workflow</span>
          <h2 className="section-title-display process-title-main">The Process</h2>
        </motion.div>

        <motion.div 
          className="process-accordion-container"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div 
                key={step.n} 
                className={`accordion-item ${isActive ? 'is-active' : ''}`}
              >
                <div 
                  className="accordion-header" 
                  onClick={() => setActiveStep(isActive ? -1 : idx)}
                >
                  <div className="accordion-header-left">
                    <span className="accordion-num">{step.n}</span>
                    <h3 className="accordion-title">{step.title}</h3>
                  </div>
                  <div className="accordion-header-right">
                    <div className="accordion-icon">
                      {step.icon}
                    </div>
                    <div className="accordion-toggle-icon">
                      {isActive ? '−' : '+'}
                    </div>
                  </div>
                </div>
                
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      className="accordion-content-wrapper"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ backgroundColor: step.color }}
                    >
                      <div className="accordion-content-inner">
                        <p className="accordion-desc">{step.desc}</p>
                        <div className="accordion-tags">
                          {step.tags.map(t => (
                            <span key={t} className="accordion-tag">{t}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
