import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Process from './components/Process';
import Pricing from './components/Pricing';
import About from './components/About';
import Footer from './components/Footer';
import EstimatorModal from './components/EstimatorModal';
import CustomCursor from './components/CustomCursor';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent mobile address bar resize from destroying scroll position
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});

const MARQUEE_ITEMS = [
  'Custom Web Development', 'Motion UI', 'React & Vite',
  'Three.js', 'Responsive Design', 'Vercel Deploy',
  'Technical SEO', 'Framer Motion', 'Headless CMS',
];

const Marquee = () => (
  <div className="marquee-wrap">
    <div className="marquee-track">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span key={i} className="marquee-item">{item}</span>
      ))}
    </div>
  </div>
);

function App() {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  React.useEffect(() => {
    // Prevent browser from auto-scrolling to hash on reload
    if (window.location.hash) {
      window.history.replaceState(null, null, ' ');
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar onOpenEstimator={() => setIsEstimatorOpen(true)} />
      <main>
        <Hero onOpenEstimator={() => setIsEstimatorOpen(true)} />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Process />
        <Pricing onOpenEstimator={() => setIsEstimatorOpen(true)} />
        <Footer onOpenEstimator={() => setIsEstimatorOpen(true)} />
      </main>
      <EstimatorModal isOpen={isEstimatorOpen} onClose={() => setIsEstimatorOpen(false)} />
    </>
  );
}

export default App;
