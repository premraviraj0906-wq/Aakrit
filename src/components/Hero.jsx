import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import './Hero.css';
import logoWhite from '../assets/aakrit_logo_white.png';

gsap.registerPlugin(ScrollTrigger);

// ── CSS Dot Grid Background (Mobile) ─────────────────────────────────
const CssDotsBackground = () => (
  <div className="hero-css-dots" aria-hidden="true" />
);

// ── Three.js Interactive Dots Background (Desktop only) ───────────────
const ThreeDotsBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const cols = Math.max(50, Math.ceil(width / 22));
    const rows = Math.max(32, Math.ceil(height / 22));
    const numPoints = cols * rows;

    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);
    const initialPositions = new Float32Array(numPoints * 3);

    const beige = new THREE.Color('#dad5ab');
    const pink = new THREE.Color('#ffb6c1');

    const aspect = width / height;
    const visibleHeight = 2 * Math.tan((60 * Math.PI / 180) / 2) * 400;
    const visibleWidth = visibleHeight * aspect;

    const xSpacing = (visibleWidth * 1.25) / cols;
    const ySpacing = (visibleHeight * 1.25) / rows;
    const xOffset = -((cols - 1) * xSpacing) / 2;
    const yOffset = -((rows - 1) * ySpacing) / 2;

    for (let i = 0; i < numPoints; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = xOffset + col * xSpacing;
      const y = yOffset + row * ySpacing;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;
      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = 0;

      const mixRatio = (col / cols + row / rows) / 2;
      const colColor = beige.clone().lerp(pink, mixRatio * 0.45);
      colors[i * 3] = colColor.r;
      colors[i * 3 + 1] = colColor.g;
      colors[i * 3 + 2] = colColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = 64; dotCanvas.height = 64;
    const ctx = dotCanvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(32, 32, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    const material = new THREE.PointsMaterial({
      size: 4.5,
      map: new THREE.CanvasTexture(dotCanvas),
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      opacity: 0.5
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.targetY = -(((e.clientY - rect.top) / height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const posAttr = geometry.attributes.position;
      const posArray = posAttr.array;
      const mouseWorldX = mouse.x * (visibleWidth / 2);
      const mouseWorldY = mouse.y * (visibleHeight / 2);

      for (let i = 0; i < numPoints; i++) {
        const idx = i * 3;
        const ix = initialPositions[idx];
        const iy = initialPositions[idx + 1];
        const waveZ = Math.sin(time * 1.5 + ix * 0.01 + iy * 0.01) * 14;

        const dx = ix - mouseWorldX;
        const dy = iy - mouseWorldY;
        const distSq = dx * dx + dy * dy;
        let pushX = 0, pushY = 0;

        if (distSq < 140 * 140 && mouse.x !== -9999) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / 140) * 40;
          const angle = Math.atan2(dy, dx);
          pushX = Math.cos(angle) * force;
          pushY = Math.sin(angle) * force;
        }

        posArray[idx] = ix + pushX;
        posArray[idx + 1] = iy + pushY;
        posArray[idx + 2] = waveZ;
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="hero-three-bg" />;
};

// ── Device-Aware Dots Picker ──────────────────────────────────────────
const DotsBackground = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return isMobile ? <CssDotsBackground /> : <ThreeDotsBackground />;
};

// ── Ultra-Minimal Sleek Hero Component ─────────────────────────────
const Hero = ({ onOpenEstimator }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const descRef = useRef(null);
  const specsRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!glowRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(650px circle at ${x}px ${y}px, rgba(255,182,193,0.1), transparent 65%)`;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1
        }
      });

      tl.to(logoRef.current, { scale: 0.92, opacity: 0.9, ease: "power1.out" }, 0);
      tl.fromTo(descRef.current, { y: 25, opacity: 0.85 }, { y: 0, opacity: 1, ease: "power1.out" }, 0.1);
      tl.fromTo(specsRef.current, { y: 30, opacity: 0.8 }, { y: 0, opacity: 1, ease: "power1.out" }, 0.2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-minimal-wrapper" ref={containerRef} id="home" onMouseMove={handleMouseMove}>
      {/* Full-Page Three.js Interactive Particles */}
      <DotsBackground />

      {/* Ambient Mouse Glow */}
      <div className="hero-grid-glow" ref={glowRef}></div>

      <div className="hero-minimal-container">
        {/* Prominent Center Logo Branding */}
        <div className="hero-logo-single" ref={logoRef}>
          <img src={logoWhite} alt="Aakrit Logo" className="hero-logo-img" />
        </div>

        {/* Streamlined Action CTAs */}
        <div className="hero-minimal-actions" ref={descRef}>
          <div className="minimal-cta-row">
            <button className="minimal-btn-primary" onClick={onOpenEstimator}>
              <span>Launch Estimator</span>
              <span className="minimal-arrow">→</span>
            </button>

            <a href="#work" className="minimal-link-secondary">
              <span>Explore Work</span>
            </a>
          </div>
        </div>

        {/* Individual Metric Pill Badges */}
        <div className="hero-minimal-specs" ref={specsRef}>
          <div className="spec-item">
            <span className="spec-dot"></span>
            <span className="spec-text">3+ Days Delivery</span>
          </div>
          <div className="spec-item">
            <span className="spec-text">100% Bespoke Code</span>
          </div>
          <div className="spec-item">
            <span className="spec-text">From ₹9,999</span>
          </div>
          <div className="spec-item">
            <span className="spec-text">60 FPS Motion</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
