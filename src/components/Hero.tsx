import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Activity, Layers, Download, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface HeroProps {
  onReplayIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReplayIntro }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Palpable Multi-Layer Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Horizontal scrubbed background marquee drifting at 2x scroll velocity
  const horizontalMarqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  const horizontalMarqueeReverseX = useTransform(scrollYProgress, [0, 1], ['-35%', '0%']);

  // Deep vertical parallax offsets
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const cardParallaxY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const floatingBadgeY1 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const floatingBadgeY2 = useTransform(scrollYProgress, [0, 1], [0, -170]);
  const bgOrbY = useTransform(scrollYProgress, [0, 1], [0, 220]);

  // 3D Mouse Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleDownloadResume = (e: React.MouseEvent) => {
    sound.playSuccess();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const xPos = (rect.left + rect.width / 2) / window.innerWidth;
    const yPos = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { x: xPos, y: yPos },
      colors: ['#EA580C', '#F97316', '#FBBF24', '#09090B', '#3F3F46'],
    });

    const link = document.createElement('a');
    link.href = '/Abhinayasri_Resume.pdf';
    link.download = 'Abhinayasri_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[96vh] flex items-center justify-center pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* 1. Scrubbed Background Parallax Marquee Row 1 */}
      <div className="absolute top-16 left-0 w-full overflow-hidden pointer-events-none select-none -z-10 opacity-35">
        <motion.div
          style={{ x: horizontalMarqueeX }}
          className="whitespace-nowrap font-display text-7xl sm:text-9xl lg:text-[160px] font-black tracking-tighter uppercase text-outline-light leading-none"
        >
          ABHINAYA SRI • FULL STACK ARCHITECT • AI & RAG • ABHINAYA SRI • FULL STACK ARCHITECT • AI & RAG •
        </motion.div>
      </div>

      {/* 2. Scrubbed Background Parallax Marquee Row 2 (Reverse direction) */}
      <div className="absolute bottom-12 left-0 w-full overflow-hidden pointer-events-none select-none -z-10 opacity-20">
        <motion.div
          style={{ x: horizontalMarqueeReverseX }}
          className="whitespace-nowrap font-display text-6xl sm:text-8xl lg:text-[140px] font-black tracking-tighter uppercase text-outline-light leading-none"
        >
          ENGINEERING INTELLIGENCE • REACT • NEXT.JS • FASTAPI • PYTORCH •
        </motion.div>
      </div>

      {/* Ambient Parallax Glow Orbs */}
      <motion.div
        style={{ y: bgOrbY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-orange-200/50 via-amber-200/40 to-transparent blur-[150px] rounded-full pointer-events-none -z-10"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center w-full z-10">
        {/* Left Column: Kinetic Editorial Typography */}
        <motion.div
          style={{ y: textY }}
          className="lg:col-span-7 flex flex-col items-start text-left max-w-2xl"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-orange-400/50 bg-orange-50/95 backdrop-blur-md mb-6 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-600" />
            </span>
            <span className="font-mono text-xs text-orange-950 font-bold tracking-wider uppercase">
              {PERSONAL_INFO.status}
            </span>
          </motion.div>

          {/* Massive Awwwards Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[92px] font-black tracking-tighter leading-[0.92] text-zinc-900 font-display uppercase">
              ABHINAYA <br />
              <span className="text-outline-dark hover:text-orange-600 transition-colors">SRI</span>
              <span className="text-orange-600 font-extrabold ml-1">.</span>
            </h1>
          </motion.div>

          <div className="text-sm sm:text-base font-mono font-bold text-orange-600 uppercase tracking-widest mb-6 flex flex-wrap items-center gap-2.5">
            <span className="bg-orange-500 text-white px-2.5 py-0.5 rounded text-xs font-mono font-bold">
              {PERSONAL_INFO.role}
            </span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-600 text-xs font-semibold">{PERSONAL_INFO.location}</span>
          </div>

          {/* Subtitle with High-Impact Contrast */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-700 font-normal leading-relaxed mb-8 max-w-xl font-sans"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 w-full sm:w-auto"
          >
            <a
              href="#works"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-zinc-900 hover:bg-orange-600 shadow-[0_10px_25px_rgba(24,24,27,0.3)] hover:shadow-[0_10px_30px_rgba(234,88,12,0.45)] hover:scale-105 active:scale-95 transition-all group"
            >
              <span>Explore Selected Works</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>

            <button
              onClick={handleDownloadResume}
              onMouseEnter={() => sound.playHover()}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-orange-900 border border-orange-300 bg-orange-50/90 hover:bg-orange-100 shadow-sm backdrop-blur-md transition-all group hover:scale-105"
            >
              <Download className="w-4 h-4 text-orange-600 group-hover:-translate-y-0.5 transition-transform" />
              <span>Resume PDF</span>
            </button>

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                onMouseEnter={() => sound.playHover()}
                className="px-4 py-4 rounded-xl text-xs font-mono text-zinc-700 hover:text-zinc-950 border border-zinc-200 bg-white hover:bg-zinc-50 transition-all shadow-sm flex items-center gap-1.5 hover:border-orange-400"
                title="Replay 3D Particle Vortex 'A' Animation"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Replay 3D "A" Intro</span>
              </button>
            )}
          </motion.div>

          {/* Quick Metrics Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-zinc-200/90 w-full"
          >
            {PERSONAL_INFO.stats.map((st, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight flex items-center">
                  {st.value}
                  <span className="text-orange-600 text-base ml-1 font-bold">✦</span>
                </span>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1 font-semibold">
                  {st.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Parallax Architectural Card with Spring Physics */}
        <div className="lg:col-span-5 flex justify-center perspective-[1000px] z-20 relative">
          {/* Floating Parallax Badge 1 */}
          <motion.div
            style={{ y: floatingBadgeY1 }}
            className="absolute -top-7 -left-7 z-30 px-4 py-2 rounded-2xl glass-panel bg-white border border-orange-200 shadow-xl flex items-center gap-2.5 text-xs font-mono text-orange-800 font-bold"
          >
            <Activity className="w-4 h-4 text-orange-600 animate-pulse" />
            <span>ANITS CGPA: 9.23 / 10</span>
          </motion.div>

          {/* Floating Parallax Badge 2 */}
          <motion.div
            style={{ y: floatingBadgeY2 }}
            className="absolute -bottom-7 -right-7 z-30 px-4 py-2 rounded-2xl glass-panel bg-white border border-zinc-200 shadow-xl flex items-center gap-2.5 text-xs font-mono text-zinc-800 font-bold"
          >
            <Cpu className="w-4 h-4 text-orange-600" />
            <span>RAGAS EVALUATION: 0.94</span>
          </motion.div>

          {/* Main 3D Perspective Card */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              y: cardParallaxY,
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full max-w-[440px] rounded-3xl glass-panel p-7 sm:p-8 border border-zinc-200/90 shadow-[0_25px_60px_-15px_rgba(24,24,27,0.12)] group hover:border-orange-400 transition-colors cursor-crosshair bg-white/95"
          >
            {/* Holographic specular glare */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-orange-100/40 via-transparent to-amber-100/25 pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs text-zinc-500 ml-2 font-bold">abhinayasri.profile.ts</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-orange-900 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-300 font-bold">
                <Layers className="w-3 h-3 text-orange-600" />
                FULL-STACK & AI
              </span>
            </div>

            {/* Code / Visualizer Block */}
            <div className="font-mono text-xs leading-relaxed text-zinc-800 space-y-2 bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-inner">
              <div className="flex items-center justify-between text-zinc-400 text-[10px]">
                <span>// ARCHITECTURAL IDENTITY</span>
                <span>THREAD: 0x923</span>
              </div>
              <div>
                <span className="text-purple-600 font-bold">const</span>{' '}
                <span className="text-zinc-900 font-bold">engineer</span> = {'{'}
              </div>
              <div className="pl-4 text-zinc-700">
                <span className="text-zinc-400">candidate:</span>{' '}
                <span className="text-orange-600 font-bold">'Burugupalli Abhinaya Sri'</span>,
              </div>
              <div className="pl-4 text-zinc-700">
                <span className="text-zinc-400">frontend:</span>{' '}
                <span className="text-zinc-800">'React.js, Next.js, React Native'</span>,
              </div>
              <div className="pl-4 text-zinc-700">
                <span className="text-zinc-400">backend:</span>{' '}
                <span className="text-zinc-800">'FastAPI, Node.js, PostgreSQL'</span>,
              </div>
              <div className="pl-4 text-zinc-700">
                <span className="text-zinc-400">aiSpecialization:</span>{' '}
                <span className="text-orange-600 font-bold">'RAG, RAGAS, LangChain, PyTorch'</span>,
              </div>
              <div>{'};'}</div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 my-5 text-center">
              <div className="p-3 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Degree</div>
                <div className="text-xs font-mono font-bold text-zinc-900 mt-1">
                  B.Tech IT
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Accuracy</div>
                <div className="text-xs font-mono font-bold text-orange-600 mt-1">
                  94.2%
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Retrieval</div>
                <div className="text-xs font-mono font-bold text-emerald-600 mt-1">
                  92% Prec.
                </div>
              </div>
            </div>

            <a
              href="#ai-rag"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-orange-600 hover:bg-orange-500 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <Cpu className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
              <span>Launch Live RAG Console</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
