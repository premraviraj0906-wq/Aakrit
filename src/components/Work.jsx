import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Work.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    name: 'kalapremi productions',
    type: 'Production Studio Website',
    url: 'https://kalapremiproductions.com',
    year: '2024',
    tags: ['Branding', 'Web', 'CMS'],
    theme: 'pink'
  },
  {
    id: '02',
    name: 'rprem.online',
    type: 'Personal Portfolio',
    url: 'https://rprem.online',
    year: '2024',
    tags: ['React', 'Motion UI', 'Design'],
    theme: 'maroon'
  },
  {
    id: '03',
    name: 'aakrit interactive showcase',
    type: 'Interactive Story & 3D Tunnel',
    url: 'https://aakrit-demo.vercel.app/',
    year: '2026',
    tags: ['3D Depth Tunnel', 'Canvas Motion', 'Storytelling'],
    theme: 'pink'
  },
  {
    id: '04',
    name: 'unity power solutions',
    type: 'UPS Business Platform',
    url: 'https://unitypowersolutions.co.in',
    year: '2024',
    tags: ['Corporate', 'SEO', 'Lead Gen'],
    theme: 'green'
  },
  {
    id: '05',
    name: 'pitwall',
    type: 'F1 Analytics Dashboard',
    url: 'https://pitwall.rprem.online',
    year: '2024',
    tags: ['Dashboard', 'Data Viz', 'API'],
    theme: 'beige'
  }
];

const themeColors = {
  maroon: { bg: '#4b1426', text: '#dad5ab', accent: '#ffb6c1' },
  pink:   { bg: '#ffb6c1', text: '#4b1426', accent: '#17433f' },
  green:  { bg: '#17433f', text: '#dad5ab', accent: '#ffb6c1' },
  beige:  { bg: '#dad5ab', text: '#4b1426', accent: '#17433f' }
};

const Work = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each row slides and fades in from alternating sides
      const rows = gsap.utils.toArray('.work-row');
      rows.forEach((row, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(row,
          { x: fromLeft ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1.5
            }
          }
        );
      });

      // Section label and title fade in from below
      gsap.fromTo('.work-title-block',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="work-section" ref={sectionRef}>
      <div className="container">

        <div className="work-title-block">
          <span className="work-section-label">02 — Case Studies</span>
          <h2 className="work-section-title">Selected Work</h2>
        </div>

        <div className="work-rows">
          {projects.map((p, i) => {
            const t = themeColors[p.theme];
            return (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="work-row"
                style={{ '--accent': t.accent }}
              >
                <div className="work-row-number" style={{ color: t.bg }}>{p.id}</div>

                <div className="work-row-main">
                  <h3 className="work-row-name">{p.name}</h3>
                  <div className="work-row-tags">
                    {p.tags.map(tag => (
                      <span key={tag} className="work-row-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="work-row-meta">
                  <span className="work-row-type">{p.type}</span>
                  <span className="work-row-year">{p.year}</span>
                </div>

                <div className="work-row-cta">
                  <span className="work-row-arrow">↗</span>
                </div>

                {/* Colored fill bar on hover */}
                <div className="work-row-fill" style={{ background: t.bg }}></div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Work;
