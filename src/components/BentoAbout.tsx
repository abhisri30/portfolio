import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, Trophy, Layers, Cpu, Sparkles, BookOpen, Users } from 'lucide-react';
import { sound } from '../utils/sound';

export const BentoAbout: React.FC = () => {
  const [istTime, setIstTime] = useState<string>('');
  const [utcTime, setUtcTime] = useState<string>('');
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const colY1 = useTransform(scrollYProgress, [0, 1], [60, -70]);
  const colY2 = useTransform(scrollYProgress, [0, 1], [110, -110]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const techMarquee = [
    'React.js', 'Next.js', 'React Native', 'FastAPI', 'Node.js', 'TypeScript',
    'Python', 'PyTorch', 'RAG & RAGAS', 'LangChain', 'LlamaIndex', 'PostgreSQL',
    'MongoDB', 'AWS Cloud', 'Docker', 'Tailwind CSS', 'Redux', 'Vector DB'
  ];

  return (
    <section ref={sectionRef} id="about" className="py-28 px-4 md:px-8 max-w-7xl mx-auto relative">
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-300 bg-orange-50 text-orange-900 font-mono text-xs tracking-wider uppercase mb-3 font-semibold">
          <Layers className="w-3.5 h-3.5 text-orange-600" />
          <span>01 // Academic Rigor & Leadership</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-zinc-900 font-display tracking-tight uppercase">
          Academic Rigor & <br className="hidden sm:inline" />
          <span className="text-outline-dark hover:text-orange-600 transition-colors">Proven Track Record</span>
          <span className="text-orange-600">.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <motion.div
          style={{ y: colY1 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-6 rounded-3xl border border-zinc-200/90 hover:border-orange-400/50 transition-all flex flex-col justify-between bg-white/90 shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono mb-4">
              <span className="flex items-center gap-1.5 font-bold text-zinc-800">
                <Clock className="w-4 h-4 text-orange-600" />
                IST TIME
              </span>
              <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                VISAKHAPATNAM
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-zinc-900 tracking-wider">
              {istTime || '00:00:00'}
            </div>
            <div className="text-xs font-mono text-orange-600 font-bold mt-1">
              {utcTime || '00:00:00 UTC'} (IST +5:30)
            </div>
          </div>
          <div className="pt-6 border-t border-zinc-200/80 text-xs text-zinc-500 leading-relaxed font-sans">
            Based in Visakhapatnam, India. Readily available for remote engineering sprints & distributed teams globally.
          </div>
        </motion.div>

        <motion.div
          style={{ y: colY2 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel p-6 rounded-3xl border border-zinc-200/90 md:col-span-2 hover:border-orange-400/50 transition-all flex flex-col justify-between bg-white/90 shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono pb-3 border-b border-zinc-200/80 mb-4">
              <div className="flex items-center gap-2 font-bold text-zinc-900">
                <BookOpen className="w-4 h-4 text-orange-600" />
                <span>B.Tech in Information Technology</span>
              </div>
              <span className="text-orange-700 font-bold text-[11px] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                2022 – 2026
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 mb-3">
              <div>
                <h4 className="font-['Syne'] text-lg font-bold text-zinc-900">
                  Anil Neerukonda Institute of Science and Technology
                </h4>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">
                  ANITS Autonomous • Affiliated to Andhra University
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white border border-zinc-200 shadow-sm text-center shrink-0">
                <div className="text-2xl font-mono font-bold text-orange-600">
                  9.23
                </div>
                <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">CGPA / 10</div>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              <strong className="text-zinc-800">Core Coursework:</strong> Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Web Technologies, Object-Oriented Programming, and AI Systems.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-orange-700 font-bold mt-4 pt-3 border-t border-zinc-200/80">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Top academic honors across every collegiate semester.</span>
          </div>
        </motion.div>

        <motion.div
          style={{ y: colY1 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-panel p-6 rounded-3xl border border-zinc-200/90 hover:border-orange-400/50 transition-all flex flex-col justify-between bg-white/90 shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono mb-3">
              <span className="flex items-center gap-1.5 font-bold text-zinc-800">
                <Users className="w-4 h-4 text-orange-600" />
                LEADERSHIP
              </span>
              <span className="text-zinc-400 text-[11px]">2024 – 2025</span>
            </div>
            <h4 className="text-base font-bold font-['Syne'] text-zinc-900 mb-1">
              Vice President
            </h4>
            <div className="text-xs font-mono text-orange-600 font-semibold mb-3">
              Coding Club // Dept of IT
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              Elected to lead competitive programming sessions, hackathon prep, and algorithmic workshops for 300+ students.
            </p>
          </div>
          <div className="pt-4 border-t border-zinc-200/80 text-[11px] font-mono text-zinc-500">
            Mentoring junior peers in React, Python & Data Structures.
          </div>
        </motion.div>

        <motion.div
          style={{ y: colY2 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="glass-panel p-6 rounded-3xl border border-zinc-200/90 md:col-span-2 hover:border-orange-400/50 transition-all flex flex-col justify-between bg-white/90 shadow-sm"
        >
          <div>
            <div className="flex items-center gap-2 text-orange-600 text-xs font-mono uppercase mb-3 font-bold">
              <Trophy className="w-4 h-4" />
              <span>Hackathon Honors & Podiums</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 font-['Syne'] mb-3">
              Proven Performance Under Intense 24h & 48h Pressure
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs shrink-0">
                  🥈
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900 font-mono">
                    Runner-up // Smart India Hackathon (SIH 2024)
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    ANITS Internal Selection Winner & advanced to National Level Round.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                  🥉
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900 font-mono">
                    3rd Prize // 24-Hour Augmented Reality Hackathon (2025)
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Braino Vision at ANITS: Engineered interactive AR digital prototypes within 24 hours.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-zinc-200/80 text-xs font-mono text-zinc-400 flex items-center justify-between">
            <span>Engineering under constraints</span>
            <span className="text-orange-600 font-bold">Top 5% Finalist</span>
          </div>
        </motion.div>

        <motion.div
          style={{ y: colY1 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-panel p-6 rounded-3xl border border-zinc-200/90 md:col-span-2 hover:border-orange-400/50 transition-all flex flex-col justify-between bg-white/90 shadow-sm"
        >
          <div>
            <div className="flex items-center gap-2 text-zinc-900 text-xs font-mono uppercase mb-3 font-bold">
              <Cpu className="w-4 h-4 text-orange-600" />
              <span>Coastal Seven Technologies // 6 Products Delivered</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 font-['Syne'] mb-3">
              Full-Stack Delivery from Client Discussion to Cloud Deploy
            </h3>
            <p className="text-zinc-600 text-xs leading-relaxed mb-4 font-sans">
              Contributed to real enterprise software: <strong>McKesson</strong> (RAG & RAGAS evaluation), <strong>Innotribe</strong> (Full-stack architecture), <strong>Interview Bot</strong> (AI workflows), <strong>MediScan</strong> (Healthcare APIs), <strong>Storyy App</strong> (React Native), and <strong>Snappod.ai</strong> (Interactive UI).
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-200/80">
            {['FastAPI', 'React.js', 'React Native', 'RAGAS', 'PostgreSQL', 'AWS'].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 text-zinc-800 border border-zinc-200 font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-14 overflow-hidden relative w-full py-4 border-y border-zinc-200/80 bg-white/50">
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#f4f4f6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#f4f4f6] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-8">
          {[...techMarquee, ...techMarquee].map((tech, idx) => (
            <span
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="text-xs sm:text-sm font-mono text-zinc-600 hover:text-orange-600 tracking-wider flex items-center gap-3 transition-colors cursor-default whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
