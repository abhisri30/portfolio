import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, MapPin, Sparkles, Award } from 'lucide-react';
import { TIMELINE } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathProgressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} id="timeline" className="py-28 px-4 md:px-8 max-w-5xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-300 bg-orange-50 text-orange-900 font-mono text-xs tracking-wider uppercase mb-3 font-semibold">
          <Award className="w-3.5 h-3.5 text-orange-600" />
          <span>04 // Career Trajectory</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-zinc-900 font-display tracking-tight uppercase">
          Pivotal Milestones & <br />
          <span className="text-outline-dark hover:text-orange-600 transition-colors">Career Trajectory</span>
          <span className="text-orange-600">.</span>
        </h2>
      </div>

      {/* Vertical glowing path */}
      <div className="relative border-l-2 border-zinc-200 ml-4 md:ml-32 space-y-12">
        {/* Animated Parallax laser beam line in Mild Orange */}
        <motion.div
          style={{ height: pathProgressHeight }}
          className="absolute left-[-2px] top-0 w-[2px] bg-gradient-to-b from-orange-600 via-amber-500 to-orange-400 shadow-[0_0_12px_rgba(234,88,12,0.6)]"
        />

        {TIMELINE.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => sound.playHover()}
            className="relative pl-8 md:pl-12 group"
          >
            {/* Glowing marker node */}
            <div
              className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white bg-zinc-400 group-hover:bg-orange-600 group-hover:shadow-[0_0_16px_rgba(234,88,12,0.8)] transition-all shadow-sm"
            />

            {/* Left Desktop Year Badge */}
            <div className="hidden md:block absolute -left-36 top-1 text-right w-28 font-mono text-xs font-bold text-orange-600">
              {item.year}
            </div>

            {/* Card Content */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-200/90 group-hover:border-orange-400 transition-all shadow-sm hover:shadow-xl bg-white/95">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="md:hidden font-mono text-xs font-bold text-orange-600">
                    {item.year} •
                  </span>
                  <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 font-bold">
                    {item.badge}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  <span>{item.location}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 font-display">
                {item.role}
              </h3>
              <div className="text-sm font-mono text-zinc-700 font-bold mb-4 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-orange-600" />
                <span>{item.company}</span>
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed mb-5 font-sans">
                {item.description}
              </p>

              {/* Achievements */}
              <div className="space-y-2 border-t border-zinc-200/80 pt-4">
                {item.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
