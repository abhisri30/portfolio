import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, CheckCircle, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-28 px-4 md:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-300 bg-orange-50 text-orange-900 font-mono text-xs tracking-wider uppercase mb-3 font-semibold">
          <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
          <span>05 // Industry Endorsements</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-zinc-900 font-display tracking-tight uppercase">
          What Leaders Say About <br />
          <span className="text-outline-dark hover:text-orange-600 transition-colors">Engineering Collaboration</span>
          <span className="text-orange-600">.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            onMouseEnter={() => sound.playHover()}
            className="glass-panel bg-white/95 p-8 rounded-3xl border border-zinc-200/90 hover:border-orange-400 transition-all flex flex-col justify-between shadow-sm hover:shadow-xl group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-orange-400/60 group-hover:text-orange-600 transition-colors" />
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-zinc-700 text-sm leading-relaxed italic mb-8 font-sans">
                "{t.content}"
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-200/80 flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border border-zinc-200 shadow-sm"
              />
              <div>
                <div className="text-sm font-bold text-zinc-900 font-display flex items-center gap-1.5">
                  <span>{t.name}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-orange-600" />
                </div>
                <div className="text-xs text-zinc-500">{t.role}</div>
                <div className="text-[11px] font-mono text-orange-600 font-bold">{t.company}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
