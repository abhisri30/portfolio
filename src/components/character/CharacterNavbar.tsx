import React from 'react';
import { motion } from 'framer-motion';

interface CharacterNavbarProps {
  currentScene: number;
  onNavigate: (index: number) => void;
}

export const CharacterNavbar: React.FC<CharacterNavbarProps> = ({ currentScene, onNavigate }) => {
  const scenes = ['Home', 'About', 'Skills', 'Experience', 'Contact'];

  return (
    <header className="fixed top-5 left-0 right-0 z-40 px-4 sm:px-6 flex justify-center pointer-events-none select-none">
      {/* Outer ambient glow flare behind the floating header */}
      <div className="relative w-full max-w-6xl pointer-events-auto">
        <div className="absolute -inset-x-12 -top-8 -bottom-8 bg-gradient-to-r from-transparent via-purple-600/25 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/20 to-purple-500/10 rounded-full blur-md pointer-events-none -z-10" />

        {/* Master Glass Pill Container */}
        <div className="relative w-full h-[62px] px-5 sm:px-7 rounded-full bg-[#0d091b]/80 backdrop-blur-2xl border border-purple-500/35 shadow-[0_10px_35px_rgba(0,0,0,0.65),0_0_25px_rgba(168,85,247,0.22),inset_0_1px_1px_rgba(255,255,255,0.12)] flex items-center justify-between">
          
          {/* Left: Brand Logo & Divider */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate(0)}
              className="flex items-center gap-2 group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center shadow-[0_0_14px_rgba(168,85,247,0.6)] group-hover:shadow-[0_0_20px_rgba(192,132,252,0.8)] transition-shadow">
                <span className="text-white font-mono font-black text-xs">AS</span>
              </div>
              <span className="text-white font-serif font-bold text-base md:text-lg tracking-tight group-hover:text-purple-100 transition-colors">
                Abhinaya Sri
              </span>
            </button>

            {/* Subtle Vertical Divider */}
            <div className="h-5 w-[1px] bg-white/15 hidden md:block" />
          </div>

          {/* Center: Nav Items */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-10">
            {scenes.map((scene, idx) => {
              const isActive = currentScene === idx;
              return (
                <button
                  key={scene}
                  onClick={() => onNavigate(idx)}
                  className="relative group py-2 flex flex-col items-center justify-center focus:outline-none transition-all duration-300"
                >

                  {/* Nav Item Text */}
                  <span
                    className={`text-xs md:text-sm font-sans tracking-wide transition-colors duration-200 ${
                      isActive
                        ? 'text-white font-semibold drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                        : 'text-zinc-300 hover:text-white font-medium'
                    }`}
                  >
                    {scene}
                  </span>

                  {/* Active Bottom Glowing Rounded Bar */}
                  <div className="h-1.5 w-full flex items-center justify-center mt-0.5">
                    {isActive ? (
                      <motion.div
                        layoutId="active-bottom-bar"
                        className="w-full h-[3px] rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.85)]"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    ) : (
                      <div className="w-full h-[3px] opacity-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Right: Contact CTA Button */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate(4)}
              className="relative group px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs md:text-sm font-semibold tracking-wide flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.45)] hover:shadow-[0_0_32px_rgba(192,132,252,0.7)] active:scale-95"
            >
              <span>Hire Me</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
