import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: '01', title: 'Scope & Plan',
    desc: 'We outline the architecture and estimate the budget — no hidden costs, no surprises.',
    tags: ['Discovery', 'Budgeting', 'Architecture'],
  },
  {
    n: '02', title: 'Design Draft',
    desc: 'Wireframes and visual components built in Figma. You review, adjust, and approve.',
    tags: ['Figma', 'Wireframes', 'Mockups'],
  },
  {
    n: '03', title: 'Engineering',
    desc: 'Pixel-perfect frontend with interactive components and smooth motion.',
    tags: ['React', 'Motion', 'Frontend'],
  },
  {
    n: '04', title: 'System Launch',
    desc: 'DNS setup, device testing, build optimization, and live deployment.',
    tags: ['Vercel', 'QA Testing', 'Deploy'],
  },
];

const Process = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.process-card');

    // Ensure visible by default, then animate in
    gsap.set(cards, { opacity: 1, y: 0 });

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );
    });

    const header = section.querySelector('.process-header');
    if (header) {
      gsap.fromTo(header,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="process" className="process-section texture-dots" ref={sectionRef}>
      <div className="container">
        <div className="process-header">
          <span className="section-label">02 — Workflow</span>
          <h2 className="section-title-display process-title-main">The Process</h2>
        </div>

        <div className="process-grid">
          {steps.map((step) => (
            <div key={step.n} className="process-card">
              <span className="process-num">{step.n}</span>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.desc}</p>
              <div className="process-tags">
                {step.tags.map(t => (
                  <span key={t} className="process-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
