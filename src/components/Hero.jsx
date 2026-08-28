import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import './Hero.css';
import logoWhite from '../assets/aakrit_logo_white.png';

gsap.registerPlugin(ScrollTrigger);

// ── Three.js Interactive Dots Background ──────────────────────────────
const ThreeDotsBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Grid Setup
    const cols = 55;
    const rows = 32;
    const numPoints = cols * rows;

    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);
    const initialPositions = new Float32Array(numPoints * 3);

    // Color definitions
    const beige = new THREE.Color('#dad5ab');
    const pink = new THREE.Color('#ffb6c1');

    const xSpacing = 16;
    const ySpacing = 16;
    const xOffset = -((cols - 1) * xSpacing) / 2;
    const yOffset = -((rows - 1) * ySpacing) / 2;

    for (let i = 0; i < numPoints; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = xOffset + col * xSpacing;
      const y = yOffset + row * ySpacing;
      const z = 0;

      // Position
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      // Color
      colors[i * 3] = beige.r;
      colors[i * 3 + 1] = beige.g;
      colors[i * 3 + 2] = beige.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circle texture for soft rounded dots
    const canvasTexture = (() => {
      const size = 16;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    })();

    const material = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      map: canvasTexture,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;
      
      mouse.targetX = (clientX / width) * 2 - 1;
      mouse.targetY = -(clientY / height) * 2 + 1;
    };

    container.addEventListener('mousemove', onMouseMove);

    // Animation Loop Variables
    let animationFrameId;
    const tempPos = new THREE.Vector3();
    const tempOrigin = new THREE.Vector3();
    const forceDirection = new THREE.Vector2();

    const tick = () => {
      // Smooth mouse transition
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Project mouse coordinates to the Z=0 plane
      raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
      const intersectionPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectionPoint);

      const positionsAttr = geometry.attributes.position;
      const colorsAttr = geometry.attributes.color;

      const repelRadius = 110;
      const repelStrength = 42;

      for (let i = 0; i < numPoints; i++) {
        const idx = i * 3;

        tempPos.set(positionsAttr.array[idx], positionsAttr.array[idx + 1], positionsAttr.array[idx + 2]);
        tempOrigin.set(initialPositions[idx], initialPositions[idx + 1], initialPositions[idx + 2]);

        const dx = tempPos.x - intersectionPoint.x;
        const dy = tempPos.y - intersectionPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          forceDirection.set(dx, dy).normalize();
          
          // Repel force
          tempPos.x += forceDirection.x * force * repelStrength * 0.15;
          tempPos.y += forceDirection.y * force * repelStrength * 0.15;

          // Interpolate to pink near cursor
          const colorFactor = force; // 0 to 1
          colorsAttr.array[idx] = THREE.MathUtils.lerp(beige.r, pink.r, colorFactor);
          colorsAttr.array[idx + 1] = THREE.MathUtils.lerp(beige.g, pink.g, colorFactor);
          colorsAttr.array[idx + 2] = THREE.MathUtils.lerp(beige.b, pink.b, colorFactor);
        } else {
          // Normal beige color
          colorsAttr.array[idx] = beige.r;
          colorsAttr.array[idx + 1] = beige.g;
          colorsAttr.array[idx + 2] = beige.b;
        }

        // Spring back to home coordinates
        tempPos.x += (tempOrigin.x - tempPos.x) * 0.08;
        tempPos.y += (tempOrigin.y - tempPos.y) * 0.08;

        positionsAttr.array[idx] = tempPos.x;
        positionsAttr.array[idx + 1] = tempPos.y;
      }

      positionsAttr.needsUpdate = true;
      colorsAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Resize Handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="hero-three-bg" />;
};

const Hero = ({ onOpenEstimator }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const stickersRef = useRef([]);
  const glowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!glowRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,182,193,0.12), transparent 60%)`;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", 
          scrub: 1.5, 
          pin: true,
          anticipatePin: 1
        }
      });

      // Logo scales down and rotates slightly
      tl.to(logoRef.current, { 
        scale: 0.35, 
        y: "-15vh", 
        rotation: -4,
        ease: "power2.inOut" 
      }, 0);

      const isMobile = window.innerWidth < 768;
      const scaleFactor = isMobile ? 0.45 : 1;

      // Stickers scatter out from the center
      stickersRef.current.forEach((sticker, i) => {
        const xMatch = sticker.dataset.x.match(/(-?\d+)(vw|vh|px)/);
        const yMatch = sticker.dataset.y.match(/(-?\d+)(vw|vh|px)/);
        
        let targetX = sticker.dataset.x;
        let targetY = sticker.dataset.y;
        
        if (xMatch) {
          targetX = `${parseFloat(xMatch[1]) * scaleFactor}${xMatch[2]}`;
        }
        if (yMatch) {
          targetY = `${parseFloat(yMatch[1]) * scaleFactor}${yMatch[2]}`;
        }
        const targetRot = sticker.dataset.rot;
        
        tl.fromTo(sticker, 
          { x: 0, y: 0, scale: 0, rotation: Math.random() * 90 - 45, opacity: 0 },
          { 
            x: targetX, 
            y: targetY, 
            scale: isMobile ? 0.75 : 1, 
            rotation: targetRot, 
            opacity: 1, 
            duration: 1, 
            ease: "back.out(1.2)" 
          }, 0.1 + (i * 0.08));
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !stickersRef.current.includes(el)) {
      stickersRef.current.push(el);
    }
  };

  return (
    <section className="hero-scatter-wrapper" ref={containerRef} id="home" onMouseMove={handleMouseMove}>
      {/* Three.js Interactive Particle Background */}
      <ThreeDotsBackground />
      
      {/* Mouse-tracking grid glow */}
      <div className="hero-grid-glow" ref={glowRef}></div>
      
      <div className="hero-logo-wrapper">
          <img src={logoWhite} alt="Aakrit Logo" className="hero-huge-logo" ref={logoRef} />
      </div>
      
      <div className="scatter-container">
        {/* Typographic Stickers */}
        <div className="sticker sticker-title-pink" ref={addToRefs} data-x="-25vw" data-y="-25vh" data-rot="-12">
          BRAND SCALING
        </div>
        <div className="sticker sticker-title-beige" ref={addToRefs} data-x="28vw" data-y="-15vh" data-rot="8">
          &amp; DIGITAL SUITE
        </div>
        
        {/* Geometric Stat Stickers */}
        <div className="sticker sticker-shape sticker-green-circle" ref={addToRefs} data-x="-32vw" data-y="18vh" data-rot="15">
          <span className="stat-num">3<span className="stat-plus">+</span></span>
          <span className="stat-desc">DAYS</span>
        </div>
        
        <div className="sticker sticker-shape sticker-pink-pill" ref={addToRefs} data-x="30vw" data-y="25vh" data-rot="-6">
          <span className="stat-num">₹9999</span>
          <span className="stat-desc">STARTING RATE</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
