import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Pricing from './components/Pricing';
import About from './components/About';
import Footer from './components/Footer';
import EstimatorModal from './components/EstimatorModal';
import CustomCursor from './components/CustomCursor';

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

  return (
    <>
      <CustomCursor />
      <Navbar onOpenEstimator={() => setIsEstimatorOpen(true)} />
      <main>
        <Hero onOpenEstimator={() => setIsEstimatorOpen(true)} />
        <Marquee />
        <About />
        <Services />
        <Process />
        <Pricing onOpenEstimator={() => setIsEstimatorOpen(true)} />
        <Footer onOpenEstimator={() => setIsEstimatorOpen(true)} />
      </main>
      <EstimatorModal isOpen={isEstimatorOpen} onClose={() => setIsEstimatorOpen(false)} />
    </>
  );
}

export default App;
