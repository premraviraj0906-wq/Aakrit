import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // Mobile-friendly reveal animation without pin lock
        gsap.to('.about-mask-overlay', {
          opacity: 0,
          scale: 10,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 0.5
          }
        });
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 20%",
              scrub: 0.5
            }
          }
        );
      } else {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        });

        tl.to('.about-mask-overlay', {
          scale: 180,
          opacity: 0,
          transformOrigin: "41% 50%",
          ease: "power2.inOut",
          duration: 1
        }, 0);

        tl.fromTo(contentRef.current, 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
          0.5
        );
      }
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about-zoom-section" ref={sectionRef}>
      
      {/* Background Content (revealed through the mask) */}
      <div className="about-revealed-content" ref={contentRef}>
        <div className="about-grid">
          
          <div className="about-left">
            <span className="about-section-label">00 — The Spark</span>
            <h2 className="about-section-title">We build systems, not just pages.</h2>
          </div>

          <div className="about-right-editorial">
            <h3 className="editorial-statement">
              We saw brands struggling to stand out in a sea of generic templates and bloated agency markups. 
            </h3>
            <div className="editorial-divider"></div>
            <p className="editorial-body">
              Aakrit was born to bridge this gap. We turn designs into pixel-perfect, custom-engineered code. Using React, Vite, and Framer Motion, we build blazing-fast web interfaces and smooth micro-animations that load in milliseconds. We handle the full technical pipeline: from advanced technical SEO to CDN hosting and analytics setup.
            </p>
            <div className="editorial-highlight">
              <span>Zero Templates</span>
              <span>Pure Code</span>
              <span>React &amp; Vite</span>
              <span>GSAP Motion</span>
              <span>Technical SEO</span>
              <span>Fast Delivery</span>
            </div>
          </div>

        </div>
      </div>

      {/* The SVG Mask Overlay */}
      <div className="about-mask-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="text-mask">
              {/* White is visible (shows Maroon), Black is transparent (shows content underneath) */}
              <rect width="100%" height="100%" fill="white" />
              <text 
                x="50%" 
                y="50%" 
                dominantBaseline="middle" 
                textAnchor="middle" 
                fontSize="14vw" 
                fontWeight="900" 
                fontFamily="var(--font-roobert, sans-serif)"
                letterSpacing="-0.04em"
                fill="black"
              >
                ORIGINS
              </text>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="#4b1426" mask="url(#text-mask)" />
        </svg>
      </div>

    </section>
  );
};

export default About;
