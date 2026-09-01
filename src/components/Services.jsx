import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Design Systems',
    desc: 'Full UX layouts, components, wireframes, and digital identity tailored to your brand.',
    tags: ['Figma', 'Prototyping', 'Visual Drafts', 'UX Logic'],
    themeColor: '#4b1426', 
    textColor: '#dad5ab'
  },
  {
    id: '02',
    title: 'Web Engineering',
    desc: 'High-performance code, micro-animations, interactive forms, and responsive frontends.',
    tags: ['React', 'Three.js', 'Vite', 'CSS Art'],
    themeColor: '#ffb6c1', 
    textColor: '#4b1426'
  },
  {
    id: '03',
    title: 'Deploy & Launch',
    desc: 'Domain setup, analytics, CDN, and performance diagnostics for real traffic.',
    tags: ['Vercel', 'Cloudflare', 'Analytics', 'SEO'],
    themeColor: '#17433f', 
    textColor: '#dad5ab'
  },
  {
    id: '04',
    title: 'Brand Scaling',
    desc: 'Custom logos, identity assets, premium promo videos, and brand photography guidelines designed to multiply your growth.',
    tags: ['Logo suites', 'Promo Videos', 'Photography', 'Scale Strategy'],
    themeColor: '#dad5ab', 
    textColor: '#4b1426'
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const cards = gsap.utils.toArray('.service-deck-card');

      if (!isMobile) {
        // Pin the section and animate cards horizontally on desktop
        gsap.to(cards, {
          xPercent: -100 * (cards.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (cards.length - 1),
            end: () => "+=" + containerRef.current.offsetWidth
          }
        });
      } else {
        // Smooth fade in cards on mobile without pinning body scroll
        gsap.fromTo(cards,
          { opacity: 0.2, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="services-deck-section" ref={sectionRef}>
      
      <div className="services-deck-header">
        <span className="deck-label">01 — Capabilities</span>
      </div>

      <div className="services-deck-container" ref={containerRef}>
        {services.map((s, index) => (
          <div 
            key={s.id} 
            className="service-deck-card"
            style={{ 
              backgroundColor: s.themeColor, 
              color: s.textColor,
              zIndex: index
            }}
          >
            <div className="deck-card-inner">
              
              <div className="deck-card-left">
                <span className="deck-card-num" style={{ WebkitTextStroke: `2px ${s.textColor}` }}>{s.id}</span>
                <h2 className="deck-card-title">{s.title}</h2>
              </div>
              
              <div className="deck-card-right">
                <p className="deck-card-desc">{s.desc}</p>
                <div className="deck-card-tags">
                  {s.tags.map(t => (
                    <span key={t} className="deck-tag" style={{ borderColor: s.textColor }}>{t}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
