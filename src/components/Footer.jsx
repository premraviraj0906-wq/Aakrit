import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';
import logoWhite from '../assets/aakrit_logo_white.png';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Origins', href: '#about' },
  { label: 'Capabilities', href: '#services' },
  { label: 'Selected Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
];

const contactLinks = [
  { label: 'aakrit.works@gmail.com', href: 'mailto:aakrit.works@gmail.com' },
  { label: '+91 77603 35502', href: 'tel:7760335502' },
  { label: '@aakrit.web', href: 'https://www.instagram.com/aakrit.web?igsi=MTBkbnhheGxnMWw2YQ==' },
];

// ── Interactive Particle Canvas ──────────────────────────────────────
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -9999, y: -9999 };

    const COLS = 48;
    const ROWS = 20;
    let dots = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildDots();
    };

    const buildDots = () => {
      dots = [];
      const colGap = canvas.width  / (COLS + 1);
      const rowGap = canvas.height / (ROWS + 1);
      for (let r = 1; r <= ROWS; r++) {
        for (let c = 1; c <= COLS; c++) {
          dots.push({
            ox: colGap * c,
            oy: rowGap * r,
            x: colGap * c,
            y: rowGap * r,
            r: 1.5,
            // Edge zones: outer 28% of width or outer 28% of height
            isEdge: (c / COLS < 0.28) || (c / COLS > 0.72) ||
                    (r / ROWS < 0.28) || (r / ROWS > 0.72)
          });
        }
      }
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const REPEL = 110;
    const STRENGTH = 60;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach(d => {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Only edge dots react to mouse
        if (d.isEdge && dist < REPEL) {
          const force = (REPEL - dist) / REPEL;
          d.x += (dx / dist) * force * STRENGTH * 0.14;
          d.y += (dy / dist) * force * STRENGTH * 0.14;
        }

        // Spring back to origin
        d.x += (d.ox - d.x) * 0.1;
        d.y += (d.oy - d.y) * 0.1;

        const glow = (d.isEdge && dist < REPEL) ? (1 - dist / REPEL) : 0;
        const alpha = 0.15 + glow * 0.7;
        const radius = d.r + glow * 3;

        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = glow > 0.15
          ? `rgba(255,182,193,${alpha})`
          : `rgba(218,213,171,${alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="footer-particle-canvas" />;
};

// ── Footer Component ──────────────────────────────────────────────────
const Footer = ({ onOpenEstimator }) => {
  const footerRef = useRef(null);

  return (
    <footer className="footer-new" id="contact" ref={footerRef}>

      {/* Marquee CTA band */}
      <div className="footer-marquee-band" onClick={onOpenEstimator}>
        <div className="footer-marquee-inner">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="footer-marquee-item">
              START A PROJECT <span className="fm-star">✦</span>
            </span>
          ))}
        </div>
        <div className="footer-marquee-hover">INITIATE SEQUENCE →</div>
      </div>

      {/* Body — particles + grid */}
      <div className="footer-body-area">
        <ParticleCanvas />

        {/* Background logo image at low opacity */}
        <img src={logoWhite} alt="" className="footer-bg-logo" aria-hidden="true" />

        {/* Foreground grid */}
        <div className="footer-grid-area">

          <div className="footer-logo-col">
            <img src={logoWhite} alt="Aakrit" className="footer-logo-img" />
            <span className="footer-base-tag">BASE: INDIA / REMOTE</span>
          </div>

          <nav className="footer-nav-col">
            <span className="footer-col-head">Navigation</span>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="footer-link">{l.label}</a>
            ))}
          </nav>

          <div className="footer-contact-col">
            <span className="footer-col-head">Contact</span>
            {contactLinks.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                {l.label}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom strip */}
      <div className="footer-strip">
        <span>Precision Web, Micro Budget.</span>
        <span>Aakrit Web Studio</span>
      </div>

    </footer>
  );
};

export default Footer;
