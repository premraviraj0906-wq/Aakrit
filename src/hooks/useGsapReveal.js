import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal() {
  useEffect(() => {
    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray('.process-card').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, y: 24 },
            {
              opacity: 1, y: 0,
              duration: 0.65,
              delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        });
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);
}
