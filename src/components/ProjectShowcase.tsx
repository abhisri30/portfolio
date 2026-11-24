import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight, X, Cpu, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import { GithubIcon } from './Icons';
import { sound } from '../utils/sound';

export const ProjectShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scrubbed horizontal watermark and high-impact vertical parallax offsets
  const watermarkX = useTransform(scrollYProgress, [0, 1], ['-20%', '15%']);
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [60, -70]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [120, -110]);

  const categories = ['All', 'AI & Vision', 'Creative 3D', 'Web3 & FinTech', 'Full-Stack'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleOpenModal = (project: Project) => {
    sound.playClick();
    setActiveModalProject(project);
  };

  const handleCloseModal = () => {
    sound.playClick();
    setActiveModalProject(null);
  };

  return (
    <section ref={containerRef} id="works" className="py-28 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Scrubbed Background Parallax Watermark */}
      <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none select-none -z-10 opacity-25">
        <motion.div
          style={{ x: watermarkX }}
          className="whitespace-nowrap font-display text-8xl sm:text-[160px] font-black uppercase text-outline-light"
        >
          SELECTED WORKS • ARCHITECTURE • DEEP LEARNING • RAG •
        </motion.div>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 z-10 relative">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-300 bg-orange-50 text-orange-900 font-mono text-xs tracking-wider uppercase mb-3 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>02 // Masterpiece Portfolio</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-zinc-900 font-display tracking-tight uppercase">
            Flagship Engineering & <br />
            <span className="text-outline-dark hover:text-orange-600 transition-colors">Innovations</span>
            <span className="text-orange-600">.</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-zinc-100 p-1.5 rounded-2xl border border-zinc-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 text-xs font-mono rounded-xl transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-orange-700 border border-zinc-200 shadow-sm font-bold'
                  : 'text-zinc-600 hover:text-zinc-900 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with Alternating Scrubbed Parallax Floating */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10 relative">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              style={{ y: index % 2 === 0 ? parallaxY1 : parallaxY2 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group relative rounded-3xl glass-panel border border-zinc-200/90 hover:border-orange-400 transition-all duration-300 overflow-hidden flex flex-col justify-between bg-white/95 shadow-sm hover:shadow-2xl"
            >
              {/* Project Card Header Visual Preview */}
              <div className="relative h-48 w-full bg-zinc-900 p-6 flex flex-col justify-between border-b border-zinc-200 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,88,12,0.35),transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:1.25rem_1.25rem]" />

                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wide bg-white/90 text-zinc-900 shadow-sm backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-orange-500 text-white font-bold shadow-sm">
                      Flagship
                    </span>
                  )}
                </div>

                <div className="z-10 flex items-center justify-between pt-4">
                  <div className="text-xs font-mono text-zinc-200 font-bold flex items-center gap-1.5 bg-zinc-800/80 px-3 py-1.5 rounded-xl border border-zinc-700 shadow-sm backdrop-blur-md">
                    <Cpu className="w-3.5 h-3.5 text-orange-400" />
                    <span>{project.metrics}</span>
                  </div>
                  <button
                    onClick={() => handleOpenModal(project)}
                    onMouseEnter={() => sound.playHover()}
                    className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white shadow-md group-hover:scale-110 transition-transform"
                    title="Deep Dive Specs"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 font-display group-hover:text-orange-600 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                  </h3>
                  <div className="text-xs font-mono text-orange-600 font-semibold mt-1 mb-3">
                    {project.subtitle}
                  </div>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-100 text-zinc-700 border border-zinc-200/80 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
                    <button
                      onClick={() => handleOpenModal(project)}
                      onMouseEnter={() => sound.playHover()}
                      className="text-xs font-mono text-zinc-900 hover:text-orange-600 font-bold flex items-center gap-1 underline underline-offset-4"
                    >
                      <span>Architectural Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        onMouseEnter={() => sound.playHover()}
                        className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 border border-zinc-200 transition-colors shadow-sm"
                        title="View Source"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        onMouseEnter={() => sound.playHover()}
                        className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 transition-colors shadow-sm"
                        title="Live Deployment"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Deep-Dive Project Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl glass-panel bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-orange-50 text-orange-800 border border-orange-300 font-bold">
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-zinc-900 font-display mt-3">
                  {activeModalProject.title}
                </h3>
                <p className="text-sm font-mono text-zinc-500 mt-1 font-semibold">
                  {activeModalProject.subtitle}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase text-orange-600 tracking-wider mb-2 font-bold">
                    Executive Synopsis
                  </h4>
                  <p className="text-zinc-700 text-sm leading-relaxed">
                    {activeModalProject.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <div className="text-xs font-mono text-zinc-400 mb-1 font-bold">Production Telemetry</div>
                  <div className="text-base font-mono font-bold text-orange-600">
                    {activeModalProject.metrics}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-900 tracking-wider mb-3 flex items-center gap-1.5 font-bold">
                    <Layers className="w-4 h-4 text-orange-600" />
                    <span>Architectural Innovations</span>
                  </h4>
                  <div className="space-y-2.5">
                    {activeModalProject.architecture.map((arch, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <span>{arch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-wider mb-3 font-bold">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-100 text-zinc-800 border border-zinc-200 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-200">
                  <a
                    href={activeModalProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playSuccess()}
                    className="flex-1 py-3 px-5 rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider text-white bg-zinc-900 hover:bg-orange-600 shadow-md transition-all"
                  >
                    Launch Live System
                  </a>
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    className="py-3 px-5 rounded-xl text-xs font-mono text-zinc-700 border border-zinc-200 hover:bg-zinc-100 transition-colors flex items-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source Repository</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
