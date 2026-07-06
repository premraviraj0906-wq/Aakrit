import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Process.css';

const steps = [
  {
    n: '01',
    title: 'Scope & Plan',
    desc: 'We outline the architecture and estimate the budget — no hidden costs, no surprises.',
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
    desc: 'Wireframes and visual components built in Figma. You review, adjust, and approve.',
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
    desc: 'Pixel-perfect frontend with interactive components and smooth motion.',
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
    desc: 'DNS setup, device testing, build optimization, and live deployment.',
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

  return (
    <section id="process" className="process-section texture-dots">
      <div className="container">
        <div className="process-header">
          <span className="section-label">02 — Workflow</span>
          <h2 className="section-title-display process-title-main">The Process</h2>
        </div>

        <div className="process-timeline-container">
          {/* Stepper Header */}
          <div className="timeline-stepper">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.n}
                  className={`timeline-step-node ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="step-icon-wrapper">
                    {step.icon}
                  </div>
                  <div className="step-title-node">
                    {step.title}
                  </div>
                  <div className="step-dot-connector" />
                  {isActive && (
                    <motion.div
                      layoutId="activeTimelineLine"
                      className="active-line-marker"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Stepper Content Slide */}
          <div className="timeline-slide-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="timeline-slide-card"
              >
                <div className="slide-left">
                  <span className="slide-num">{steps[activeStep].n}</span>
                  <h3 className="slide-title">{steps[activeStep].title}</h3>
                  <p className="slide-desc">{steps[activeStep].desc}</p>
                </div>
                <div className="slide-right">
                  <span className="slide-tag-label">Workflow Tech</span>
                  <div className="slide-tags">
                    {steps[activeStep].tags.map(t => (
                      <span key={t} className="slide-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
