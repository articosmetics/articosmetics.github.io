import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BackgroundCodeTerminal } from './components/BackgroundCodeTerminal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { MouseHighlighter } from './components/MouseHighlighter';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsAvailability } from './components/StatsAvailability';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Technologies } from './components/Technologies';
import { Contact } from './components/Contact';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Footer } from './components/Footer';
import { CustomizerModal } from './components/CustomizerModal';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll and connect with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#07080c] text-[#f4f4f8]">
      {/* Top scroll progress line tracking reading position */}
      <ScrollProgressBar />

      {/* Mouse circle highlighter & ambient spotlight */}
      <MouseHighlighter />

      {/* Background terminal, ambient glow patches, and vignette */}
      <BackgroundCodeTerminal />

      {/* Ambient background light gradients (theme matching vyzmacros) */}
      <div
        className="fixed top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full pointer-events-none select-none blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.35) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <div
        className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full pointer-events-none select-none blur-[150px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Floating navigation pill */}
      <Navbar onPrivacyOpen={() => setIsPrivacyOpen(true)} />

      {/* Main Content vs Privacy Policy Route */}
      <AnimatePresence mode="wait">
        {isPrivacyOpen ? (
          <PrivacyPolicy key="privacy" onBack={() => setIsPrivacyOpen(false)} />
        ) : (
          <main key="main" className="relative z-10">
            <Hero />
            <StatsAvailability />
            <About />
            <Experience />
            <Projects />
            <Technologies />
            <Contact />
            <Footer onPrivacyOpen={() => setIsPrivacyOpen(true)} />
          </main>
        )}
      </AnimatePresence>

      {/* Starter Kit customization guide pill */}
      <CustomizerModal />
    </div>
  );
}

export default App;
