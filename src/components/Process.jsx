import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: '01',
    title: 'Scope & Plan',
    desc: 'We outline the architecture and estimate the budget — no hidden costs, no surprises. A thorough discovery phase ensures every requirement is captured before design begins.',
    tags: ['Discovery', 'Budgeting', 'Architecture'],
    bg: '#4b1426',
    text: '#dad5ab',
    accent: '#ffb6c1'
  },
  {
    n: '02',
    title: 'Design Draft',
    desc: 'Wireframes and high-fidelity visual components built in Figma. You review, adjust, and approve the look and feel before any code is written.',
    tags: ['Figma', 'Wireframes', 'Mockups'],
    bg: '#ffb6c1',
    text: '#4b1426',
    accent: '#17433f'
  },
  {
    n: '03',
    title: 'Engineering',
    desc: 'Pixel-perfect frontend development with interactive components, smooth motion, and robust backend integrations. We build for speed, accessibility, and scale.',
    tags: ['React', 'Motion', 'Frontend'],
    bg: '#17433f',
    text: '#dad5ab',
    accent: '#ffb6c1'
  },
  {
    n: '04',
    title: 'System Launch',
    desc: 'DNS setup, rigorous cross-device QA testing, build optimization, and live deployment. We ensure a flawless launch and provide priority post-launch support.',
    tags: ['Vercel', 'QA Testing', 'Deploy'],
    bg: '#dad5ab',
    text: '#4b1426',
    accent: '#17433f'
  }
];

const Process = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each step row: the number grows from 0 to full size via scrub
      const rows = gsap.utils.toArray('.process-step');
      rows.forEach((row) => {
        // Number reveal — scale up from tiny
        gsap.fromTo(row.querySelector('.step-num'),
          { scale: 0.3, opacity: 0 },
          {
            scale: 1, opacity: 1, ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 80%', end: 'top 40%', scrub: 1 }
          }
        );

        // Line width grows from 0 to full on scroll
        gsap.fromTo(row.querySelector('.step-connector'),
          { scaleX: 0 },
          {
            scaleX: 1, ease: 'none',
            scrollTrigger: { trigger: row, start: 'top 75%', end: 'top 30%', scrub: 1 }
          }
        );

        // Content slides in from right
        gsap.fromTo(row.querySelector('.step-content'),
          { x: 60, opacity: 0 },
          {
            x: 0, opacity: 1, ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 80%', end: 'top 45%', scrub: 1 }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="process-section" ref={sectionRef}>
      <div className="container">

        <div className="process-header">
          <span className="process-label">04 — Workflow</span>
          <h2 className="process-title">The Process</h2>
        </div>

        <div className="process-steps">
          {steps.map((step, i) => (
            <div key={step.n} className="process-step">
              
              {/* Left: giant number */}
              <div className="step-num-wrap">
                <span
                  className="step-num"
                  style={{
                    color: step.bg,
                    WebkitTextStroke: `3px ${step.bg}`
                  }}
                >
                  {step.n}
                </span>
              </div>

              {/* Center: animated horizontal line with colored dot */}
              <div className="step-connector-wrap">
                <div className="step-connector" style={{ background: step.bg }}></div>
                <div className="step-dot" style={{ background: step.bg, borderColor: step.accent }}></div>
              </div>

              {/* Right: content block */}
              <div
                className="step-content"
                style={{ background: step.bg, color: step.text }}
              >
                <div className="step-content-inner">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                  <div className="step-tags">
                    {step.tags.map(t => (
                      <span
                        key={t}
                        className="step-tag"
                        style={{ borderColor: step.accent, color: step.accent }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Process;
