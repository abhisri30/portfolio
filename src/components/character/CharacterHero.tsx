import React from 'react';
import { motion } from 'framer-motion';

interface CharacterHeroProps {
  onStartJourney: () => void;
}

export const CharacterHero: React.FC<CharacterHeroProps> = ({ onStartJourney }) => {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 overflow-hidden">
      {/* LEFT COLUMN: HERO HEADLINE & ACTIONS */}
      <div className="max-w-xl mt-14 sm:mt-16 md:mt-20 z-10">
        
        {/* 1. Status Pill: Available for Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#130f26]/80 border border-purple-500/30 backdrop-blur-md mb-5 shadow-[0_0_15px_rgba(16,185,129,0.15)] pointer-events-auto"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </span>
          <span className="text-xs font-medium text-zinc-200 tracking-wide">
            Available for Opportunities
          </span>
        </motion.div>

        {/* 2. HELLO, I'M with accent line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="text-xs font-semibold tracking-[0.25em] text-zinc-400 uppercase">
            HELLO, I'M
          </span>
          <div className="h-[1px] w-14 bg-gradient-to-r from-zinc-500/70 to-transparent" />
        </motion.div>

        {/* 3. Name Headline with Sparkle Flare */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[56px] sm:text-7xl md:text-8xl lg:text-[88px] font-serif font-bold text-white tracking-tight leading-[1.0] mb-5"
        >
          <span>Abhinaya </span>
          <span className="relative inline-block italic font-serif text-[#d8b4fe] bg-gradient-to-r from-purple-200 via-[#e9d5ff] to-[#c084fc] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(192,132,252,0.5)]">
            Sri
            {/* Luminous orbital sparkle star */}
            <span className="absolute -top-3 -right-6 text-purple-300 text-xl animate-pulse">✦</span>
            <svg
              className="absolute -top-3 -right-8 w-16 h-12 pointer-events-none text-purple-400/50"
              viewBox="0 0 60 40"
              fill="none"
            >
              <ellipse
                cx="30"
                cy="20"
                rx="26"
                ry="9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                transform="rotate(-15 30 20)"
              />
            </svg>
          </span>
        </motion.h1>

        {/* 4. Role with Vertical Accent Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-semibold text-zinc-200 mb-5 tracking-tight"
        >
          <span className="h-6 w-1 bg-gradient-to-b from-purple-400 to-fuchsia-500 rounded-full shadow-[0_0_10px_#c084fc]" />
          <span>Full-Stack Developer</span>
          <span className="text-zinc-500 font-light">·</span>
          <span className="text-purple-300">AI Engineer</span>
        </motion.div>

        {/* 5. Bio Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm md:text-[15px] text-zinc-400 font-normal leading-relaxed max-w-lg mb-8"
        >
          I build scalable and user-centric web applications that solve real-world problems, with a curiosity for cloud, AI and modern technologies.
        </motion.p>

        {/* 6. CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center gap-4 mb-10 pointer-events-auto"
        >
          {/* Start the Journey Button */}
          <button
            onClick={onStartJourney}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-sm font-semibold tracking-wide flex items-center gap-2.5 group transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.55),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_0_45px_rgba(192,132,252,0.75)] active:scale-95"
          >
            <span>Explore My Work</span>
            <span className="group-hover:translate-x-1.5 transition-transform">&rarr;</span>
          </button>

          {/* Download Resume Button */}
          <a
            href="/Abhinayasri_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full border border-white/20 hover:border-purple-400/60 bg-white/[0.05] hover:bg-purple-950/50 backdrop-blur-md text-white text-sm font-medium tracking-wide flex items-center gap-2.5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] active:scale-95"
          >
            <svg
              className="w-4 h-4 text-purple-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download Resume</span>
          </a>
        </motion.div>

        {/* 7. Metric / Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center gap-6 sm:gap-8 pt-6 border-t border-white/10 max-w-lg"
        >
          {/* Stat 1: 5+ Projects */}
          <div className="flex items-center gap-3">
            <span className="text-purple-400 font-mono font-bold text-xl drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
              &lt;/&gt;
            </span>
            <div>
              <div className="text-base font-bold text-white font-mono">5+</div>
              <div className="text-[11px] text-zinc-400 font-sans tracking-wide">Projects</div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-white/10" />

          {/* Stat 2: 5 Months+ Experience */}
          <div className="flex items-center gap-3">
            <div className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div>
              <div className="text-base font-bold text-white font-mono">5 Months+</div>
              <div className="text-[11px] text-zinc-400 font-sans tracking-wide">Experience</div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-white/10" />

          {/* Stat 3: 9.3 CGPA B.Tech (IT) */}
          <div className="flex items-center gap-3">
            <div className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div>
              <div className="text-base font-bold text-white font-mono">9.3 CGPA</div>
              <div className="text-[11px] text-zinc-400 font-sans tracking-wide">B.Tech (IT)</div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* RIGHT AREA: ORBITING TECH BADGES & GLOWING RINGS (Concentrically Framing the 3D Robot) */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
        
        {/* Orbital System Container - Concentrically Centered Over the 3D Robot's Torso */}
        <div className="absolute top-[47%] left-[74%] -translate-x-1/2 -translate-y-1/2 w-[430px] h-[430px] pointer-events-none">
          
          {/* Ambient Glowing Orbit Ellipse Rings concentric around the Robot */}
          <div className="absolute inset-0 pointer-events-none opacity-65">
            <svg className="w-full h-full" viewBox="0 0 430 430" fill="none">
              <ellipse
                cx="215"
                cy="215"
                rx="200"
                ry="88"
                stroke="url(#orbitGrad1)"
                strokeWidth="1.6"
                strokeDasharray="4 8"
                transform="rotate(-25 215 215)"
              />
              <ellipse
                cx="215"
                cy="215"
                rx="175"
                ry="72"
                stroke="url(#orbitGrad2)"
                strokeWidth="1.3"
                transform="rotate(28 215 215)"
              />
              <defs>
                <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#e879f9" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="orbitGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* 1. React Badge (Top Left of Robot) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[8%] left-[10px] pointer-events-auto"
          >
            <div className="px-3.5 py-2 rounded-2xl bg-[#120d28]/90 backdrop-blur-xl border border-cyan-500/40 shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_20px_rgba(56,189,248,0.3)] flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <svg className="w-4 h-4 text-cyan-400 animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24" fill="none">
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
              <span className="text-white text-xs font-semibold tracking-wide font-sans">React</span>
            </div>
          </motion.div>

          {/* 2. Python Badge (Mid Left of Robot) */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[44%] -left-[30px] pointer-events-auto"
          >
            <div className="px-3.5 py-2 rounded-2xl bg-[#120d28]/90 backdrop-blur-xl border border-yellow-500/40 shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_20px_rgba(234,179,8,0.25)] flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.01 1.4h2.9v.4H6.2s-2 .2-2 3c0 2.7 1.8 2.8 1.8 2.8h1.1v-1.5c0-1.7 1.5-1.7 1.5-1.7h2.8c1.7 0 1.7-1.4 1.7-1.4V3.5s.4-1.5-1.2-1.5zm-1.6 1a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1z"
                  fill="#38bdf8"
                />
                <path
                  d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3l-.01-1.4h-2.9v-.4h5.7s2-.2 2-3c0-2.7-1.8-2.8-1.8-2.8h-1.1v1.5c0 1.7-1.5 1.7-1.5 1.7h-2.8c-1.7 0-1.7 1.4-1.7 1.4v2.9s-.4 1.5 1.2 1.5zm1.6-1a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z"
                  fill="#facc15"
                />
              </svg>
              <span className="text-white text-xs font-semibold tracking-wide font-sans">Python</span>
            </div>
          </motion.div>

          {/* 3. AWS Badge (Lower Left of Robot) */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[78%] left-[15px] pointer-events-auto"
          >
            <div className="px-4 py-2 rounded-2xl bg-[#120d28]/90 backdrop-blur-xl border border-amber-500/40 shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.25)] flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <span className="text-white font-black text-xs tracking-wider lowercase leading-none">aws</span>
                <svg className="w-6 h-1.5 text-amber-400 mt-0.5" viewBox="0 0 24 8" fill="none">
                  <path d="M2 2c6 5 14 5 20 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M20 2l-2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* 4. TypeScript Badge (Top Right of Robot) */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[8%] right-[10px] pointer-events-auto"
          >
            <div className="px-3.5 py-2 rounded-2xl bg-[#120d28]/90 backdrop-blur-xl border border-blue-500/40 shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_20px_rgba(59,130,246,0.3)] flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <div className="w-4 h-4 rounded-md bg-[#3178c6] flex items-center justify-center text-[9px] font-bold text-white font-mono shadow-[0_0_8px_rgba(49,120,198,0.6)]">
                TS
              </div>
              <span className="text-white text-xs font-semibold tracking-wide font-sans">TypeScript</span>
            </div>
          </motion.div>

          {/* 5. Node.js Badge (Mid Right of Robot) */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[44%] -right-[30px] pointer-events-auto"
          >
            <div className="px-3.5 py-2 rounded-2xl bg-[#120d28]/90 backdrop-blur-xl border border-emerald-500/40 shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <div className="w-4 h-4 rounded-md bg-[#22c55e] flex items-center justify-center text-[9px] font-bold text-black font-mono shadow-[0_0_8px_rgba(34,197,94,0.6)]">
                JS
              </div>
              <span className="text-white text-xs font-semibold tracking-wide font-sans">Node.js</span>
            </div>
          </motion.div>

          {/* 6. GCP Badge (Lower Right of Robot) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[78%] right-[15px] pointer-events-auto"
          >
            <div className="px-3.5 py-2 rounded-2xl bg-[#120d28]/90 backdrop-blur-xl border border-purple-500/40 shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
                  fill="#4285F4"
                />
                <path
                  d="M19 14h-1.5c0-2.5-2-4.5-4.5-4.5S8.5 11.5 8.5 14H7c0-3.3 2.7-6 6-6s6 2.7 6 6z"
                  fill="#EA4335"
                />
                <circle cx="10" cy="15" r="2" fill="#FBBC05" />
                <circle cx="16" cy="16" r="1.5" fill="#34A853" />
              </svg>
              <span className="text-white text-xs font-semibold tracking-wide font-sans">GCP</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
