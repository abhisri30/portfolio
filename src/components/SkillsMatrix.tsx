import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Globe } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { SkillsGlobe } from './SkillsGlobe';
import { sound } from '../utils/sound';

export const SkillsMatrix: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <section id="skills" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative">
      {/* Background ambient accent */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[300px] bg-orange-100/50 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-start mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-300 bg-orange-50 text-orange-800 font-mono text-xs tracking-wider uppercase mb-3 font-semibold">
          <Globe className="w-3.5 h-3.5 text-orange-600 animate-spin" style={{ animationDuration: '10s' }} />
          <span>03 // 3D Interactive Skills Globe & Matrix</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-zinc-900 font-display tracking-tight uppercase">
          Technical Capabilities & <br />
          <span className="text-outline-dark hover:text-orange-600 transition-colors">Interactive 3D Sphere</span>
          <span className="text-orange-600">.</span>
        </h2>
        <p className="text-zinc-600 text-sm max-w-2xl mt-3">
          Drag and rotate the 3D sphere below to inspect my core competencies in real-time, or browse the categorized domain breakdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: 3D Interactive Rotating Skills Globe (Span 5) */}
        <div className="lg:col-span-5 glass-panel bg-white/90 p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-md flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between pb-4 border-b border-zinc-200/80 mb-4 text-xs font-mono">
            <span className="font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-orange-600" />
              <span>3D Interactive Sphere</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-semibold">
              DRAG TO ROTATE
            </span>
          </div>

          <SkillsGlobe />
        </div>

        {/* Right Column: Dynamic Category Breakdowns (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-100 p-1.5 rounded-2xl border border-zinc-200">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const isSelected = activeCategoryIndex === idx;
              return (
                <button
                  key={cat.title}
                  onClick={() => {
                    sound.playClick();
                    setActiveCategoryIndex(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`p-2.5 rounded-xl text-xs font-mono font-bold text-center transition-all ${
                    isSelected
                      ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {cat.title.split('&')[0].trim()}
                </button>
              );
            })}
          </div>

          {/* Active Category Skills List */}
          <div className="glass-panel bg-white/90 rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80">
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 font-['Syne']">
                      {SKILL_CATEGORIES[activeCategoryIndex].title}
                    </h4>
                    <p className="text-xs font-mono text-zinc-500 mt-0.5">
                      {SKILL_CATEGORIES[activeCategoryIndex].subtitle}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-orange-50 text-orange-700 border border-orange-200 font-semibold">
                    Production Proven
                  </span>
                </div>

                <div className="space-y-4">
                  {SKILL_CATEGORIES[activeCategoryIndex].skills.map((skill) => (
                    <div
                      key={skill.name}
                      onMouseEnter={() => sound.playHover()}
                      className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/70 hover:border-zinc-300 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-orange-600 group-hover:scale-125 transition-transform" />
                          <span className="text-sm font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-orange-600">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Animated Progress bar */}
                      <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-orange-600 to-amber-500 shadow-sm"
                        />
                      </div>

                      <div className="text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                        <span>{skill.highlight}</span>
                        <span className="text-zinc-400 group-hover:text-orange-600 transition-colors font-semibold">Verified</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
