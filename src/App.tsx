import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import { ParticleIntro } from './components/ParticleIntro';
import { CharacterNavbar } from './components/character/CharacterNavbar';
import { CinematicViewport } from './components/CinematicViewport';
import { CustomCursor } from './components/CustomCursor';
import { sound } from './utils/sound';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [currentScene, setCurrentScene] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll and wire up to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  // Lock scroll position at top while ParticleIntro is active
  useEffect(() => {
    if (showIntro) {
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    } else {
      if (lenisRef.current) {
        lenisRef.current.start();
        ScrollTrigger.refresh();
      }
    }
  }, [showIntro]);

  const handleNavigate = (sceneIndex: number) => {
    sound.playClick();
    if (!trackRef.current || !lenisRef.current) return;
    const maxScroll = trackRef.current.offsetHeight - window.innerHeight;
    const targetScroll = (sceneIndex / 4) * maxScroll;
    lenisRef.current.scrollTo(targetScroll, { duration: 1.5 });
  };

  return (
    <div className="relative bg-[#0a0915] text-zinc-100 min-h-screen overflow-x-hidden selection:bg-purple-600 selection:text-white font-sans">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Opening 3D Particle "AS" Monogram Intro */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <ParticleIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Top Step-Progress Navigation Bar (Fixed z-40) */}
      <CharacterNavbar
        currentScene={currentScene}
        onNavigate={handleNavigate}
      />

      {/* Master Viewport Layer (Scene 1: Character Runner Hero -> Scenes 2-5: Portfolio) */}
      <CinematicViewport
        onSceneChange={setCurrentScene}
        trackRef={trackRef}
      />

      {/* Virtual Scroll Track (500vh drives the continuous ribbon pull & scene transitions) */}
      <div
        ref={trackRef}
        className="relative z-0 w-full h-[500vh] pointer-events-none"
      />
    </div>
  );
};

export default App;
