import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Cpu,
  Layers,
  Mail,
  MapPin,
  Phone,
  Check,
  Copy,
  Clock,
  Briefcase,
  Send,
  AlertCircle,
  User,
  GraduationCap,
  BarChart3,
  Users,
  Calendar,
  Brain,
  Cloud,
  Target,
  ShieldCheck,
  Smartphone,
  Search
} from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import confetti from 'canvas-confetti';
import { InteractiveSkillsSphere } from './InteractiveSkillsSphere';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { CharacterRunnerCanvas } from './character/CharacterRunnerCanvas';
import { CharacterHero } from './character/CharacterHero';

gsap.registerPlugin(ScrollTrigger);

interface CinematicViewportProps {
  onSceneChange: (sceneIndex: number) => void;
  trackRef: React.RefObject<HTMLDivElement | null>;
}

export const CinematicViewport: React.FC<CinematicViewportProps> = ({ onSceneChange, trackRef }) => {
  const s1Ref = useRef<HTMLDivElement | null>(null);
  const s2Ref = useRef<HTMLDivElement | null>(null);
  const s3Ref = useRef<HTMLDivElement | null>(null);
  const s4Ref = useRef<HTMLDivElement | null>(null);
  const s5Ref = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [istTime, setIstTime] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Formspree Integration with form key 'xdegapyl'
  const [formState, handleFormSubmit, resetForm] = useForm('xdegapyl');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    opportunityType: 'Full-Time SDE / AI',
    message: '',
  });

  // IST Real-Time Clock
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
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Formspree celebration
  useEffect(() => {
    if (formState.succeeded) {
      sound.playSuccess();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#c084fc', '#f472b6', '#ffffff'],
      });
    }
  }, [formState.succeeded]);

  // Master GSAP ScrollTrigger Cinematic Scene Timeline
  useEffect(() => {
    if (!trackRef.current) return;

    const scenes = [s1Ref.current, s2Ref.current, s3Ref.current, s4Ref.current, s5Ref.current];

    // Initial state: Scene 1 visible, others hidden with autoAlpha
    gsap.set(scenes[0], { autoAlpha: 1, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto' });
    for (let i = 1; i < scenes.length; i++) {
      gsap.set(scenes[i], { autoAlpha: 0, scale: 0.96, filter: 'blur(4px)', pointerEvents: 'none' });
    }

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);
          const currentSceneIndex = Math.min(5, Math.max(1, Math.floor(p * 4.99) + 1));
          onSceneChange(currentSceneIndex - 1);
        },
      },
    });

    // Add initial hold on Scene 1 so it stays perfectly crisp
    masterTl.to({}, { duration: 0.6 });

    const addTransition = (fromScene: HTMLDivElement | null, toScene: HTMLDivElement | null) => {
      if (!fromScene || !toScene) return;

      masterTl
        .to(fromScene, {
          autoAlpha: 0,
          scale: 0.96,
          filter: 'blur(4px)',
          pointerEvents: 'none',
          duration: 1,
          ease: 'power2.inOut',
        })
        .to(
          toScene,
          {
            autoAlpha: 1,
            scale: 1,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            duration: 1,
            ease: 'power2.out',
          },
          '<0.3'
        )
        .to({}, { duration: 0.8 });
    };

    addTransition(s1Ref.current, s2Ref.current);
    addTransition(s2Ref.current, s3Ref.current);
    addTransition(s3Ref.current, s4Ref.current);
    addTransition(s4Ref.current, s5Ref.current);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [trackRef, onSceneChange]);

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <>
      <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-auto bg-[#0a0915] text-zinc-100 flex items-center justify-center select-none z-10">
        <div className="absolute -right-20 top-10 w-[700px] h-[700px] bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 bottom-10 w-[700px] h-[700px] bg-indigo-950/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.06)_0%,transparent_75%)] pointer-events-none" />

        {/* PERSISTENT 3D PARALLAX CANVAS: 3D Robot descending down glowing laser wire */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <CharacterRunnerCanvas scrollProgress={scrollProgress} />
        </div>

        {/* SCENE 1: 3D CHARACTER RUNNER & GLOWING RIBBON HERO */}
        <div
          ref={s1Ref}
          className="absolute inset-0 w-full h-full overflow-hidden z-10"
        >
          <CharacterHero
            onStartJourney={() => {
              if (trackRef.current) {
                const maxScroll = trackRef.current.offsetHeight - window.innerHeight;
                window.scrollTo({ top: (1 / 4) * maxScroll, behavior: 'smooth' });
              }
            }}
          />
        </div>

        {/* SCENE 2: ABOUT ME (BACKGROUND & ENGINEERING RECORD) */}
        <div
          ref={s2Ref}
          className="absolute inset-0 w-full h-full px-6 sm:px-10 md:px-14 lg:px-16 pt-20 pb-12 flex flex-col justify-center items-center lg:items-start z-10 pointer-events-auto overflow-hidden"
        >

          <div className="max-w-4xl xl:max-w-5xl w-full lg:mr-24 xl:mr-44 z-10">
            {/* Header row: Badge, Headline & Floating "About Me" Capsule */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-7">
              <div className="flex flex-col items-start">
                {/* 02 // ABOUT ME Badge */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/35 bg-[#150f2b]/80 text-purple-300 font-mono text-[11px] tracking-widest uppercase font-semibold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    <span>02 // ABOUT ME</span>
                  </div>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-zinc-500/60 to-transparent" />
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-3">
                  <span>Academic Rigor &amp;</span><br />
                  <span className="italic font-serif bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(192,132,252,0.4)]">
                    Proven Leadership.
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-xl">
                  A technology enthusiast with a strong academic foundation and hands-on industry experience, building scalable and impactful solutions.
                </p>
              </div>

              {/* Floating "About Me" Capsule with Glowing Connector Filament */}
              <div className="relative pointer-events-auto hidden xl:flex items-center mb-2">
                <div className="px-5 py-3 rounded-full bg-[#180e33]/85 backdrop-blur-xl border border-purple-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-3.5 hover:scale-105 transition-transform duration-300">
                  <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                    <User className="w-4 h-4 text-purple-300" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white tracking-wide">About Me</div>
                    <div className="text-[11px] text-zinc-400 font-sans">Education, Experience &amp; Beyond</div>
                  </div>
                </div>

                {/* Delicate connector filament & glowing node towards the rope */}
                <div className="w-16 h-[2px] bg-gradient-to-r from-purple-500/80 to-fuchsia-400/40 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-fuchsia-300 shadow-[0_0_10px_#e879f9,0_0_18px_rgba(232,121,249,0.8)] animate-pulse" />
                </div>
              </div>
            </div>

            {/* 3 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              
              {/* Card 1: ACADEMIC DEGREE */}
              <div className="rounded-3xl bg-[#120b24]/85 backdrop-blur-xl border border-purple-500/30 p-6 flex flex-col justify-between hover:border-purple-400/50 shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300 group">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="flex items-center gap-2 font-bold text-white tracking-wider text-[11px]">
                      <GraduationCap className="w-4 h-4 text-purple-400" />
                      ACADEMIC DEGREE
                    </span>
                    <span className="text-purple-300 font-mono font-bold text-xs">2022 — 2026</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-sans mb-1.5 group-hover:text-purple-100 transition-colors">
                    B.Tech in Information Technology
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">
                    Anil Neerukonda Institute of Technology (ANITS)
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-sans flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                    CGPA Achieved
                  </span>
                  <span className="text-2xl font-mono font-bold text-white tracking-tight">
                    9.23 <span className="text-sm font-normal text-zinc-400">/ 10</span>
                  </span>
                </div>
              </div>

              {/* Card 2: PROFESSIONAL SDE */}
              <div className="rounded-3xl bg-[#120b24]/85 backdrop-blur-xl border border-purple-500/30 p-6 flex flex-col justify-between hover:border-purple-400/50 shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300 group">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="flex items-center gap-2 font-bold text-white tracking-wider text-[11px]">
                      <Briefcase className="w-4 h-4 text-purple-400" />
                      PROFESSIONAL SDE
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                      ACTIVE
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-sans mb-1.5 group-hover:text-purple-100 transition-colors">
                    Coastal Seven Technologies
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">
                    Junior Software Engineer architecting enterprise RAG chatbots, FastAPI microservices, and React interfaces.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-sans flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-purple-400" />
                    Leadership
                  </span>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#e879f9]">VP, Coding Club</div>
                    <div className="text-[11px] text-[#e879f9]/80">(500+ Peers)</div>
                  </div>
                </div>
              </div>

              {/* Card 3: IST CLOCK */}
              <div className="rounded-3xl bg-[#120b24]/85 backdrop-blur-xl border border-purple-500/30 p-6 flex flex-col justify-between hover:border-purple-400/50 shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300 group">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="flex items-center gap-2 font-bold text-white tracking-wider text-[11px]">
                      <Clock className="w-4 h-4 text-purple-400" />
                      IST CLOCK
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[10px] tracking-wider uppercase">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      VISAKHAPATNAM
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-wider mb-1">
                    {istTime || '16:20:30'}
                  </div>
                  <div className="text-xs font-mono text-purple-400 font-semibold mb-6">
                    UTC +5:30 (India Standard Time)
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Open to full-time remote and hybrid Software Development Engineer roles globally.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SCENE 3: SKILLS & 3D GLOBE */}
        <div
          ref={s3Ref}
          className="absolute inset-0 w-full h-full px-6 sm:px-10 md:px-14 lg:px-16 pt-16 sm:pt-20 pb-4 flex flex-col justify-center items-center lg:items-start lg:pl-20 xl:pl-32 z-10 pointer-events-auto overflow-hidden"
        >
          <div className="w-full max-w-4xl xl:max-w-5xl flex flex-col items-start z-10">
            {/* Header: Left-Aligned Badge, Headline & Subtitle */}
            <div className="flex flex-col items-start text-left w-full mb-3">
              {/* 03 // SKILLS & TECHNOLOGIES Badge */}
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/35 bg-[#150f2b]/80 text-purple-300 font-mono text-[11px] tracking-widest uppercase font-semibold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>03 // SKILLS &amp; TECHNOLOGIES</span>
                </div>
                <div className="h-[1px] w-12 bg-gradient-to-r from-zinc-500/60 to-transparent" />
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-1.5">
                <span>Technical Capabilities &amp;</span>{' '}
                <span className="italic font-serif bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(192,132,252,0.4)]">
                  Engineering Stack.
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-xl">
                A versatile skill set across the modern development stack, with a focus on building scalable, intelligent, and user-centric solutions.
              </p>
            </div>

            {/* 2-Column Balanced Layout: Left Core Expertise Card | Right Interactive 3D Wireframe Skill Globe */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14 xl:gap-16 w-full max-w-[880px] my-2">
              {/* Left Column: Core Expertise Glassmorphism Card */}
              <div className="w-full max-w-[260px] h-[330px] flex-shrink-0 rounded-3xl bg-[#0e0720]/85 backdrop-blur-xl border border-purple-500/30 p-5 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_25px_rgba(168,85,247,0.15)] hover:border-purple-400/50 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-2.5 pb-3 border-b border-purple-500/20">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                      <Target className="w-4 h-4 text-purple-300" />
                    </div>
                    <h3 className="text-sm font-bold text-white font-sans tracking-wide">
                      Core Expertise
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    {[
                      'Full-Stack Development',
                      'AI & LLM Integration (RAG)',
                      'Backend & API Design',
                      'Database Architecture',
                      'Cloud & DevOps'
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 group/item">
                        <div className="w-5 h-5 rounded-full bg-purple-500/25 border border-purple-400/50 flex items-center justify-center text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.35)] flex-shrink-0 group-hover/item:border-purple-300 group-hover/item:shadow-[0_0_12px_rgba(192,132,252,0.6)] transition-all">
                          <Check className="w-3 h-3 text-purple-300 stroke-[2.5]" />
                        </div>
                        <span className="text-xs font-sans text-zinc-200/90 group-hover/item:text-white transition-colors leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Centre: Large Interactive 3D Wireframe Skill Globe */}
              <div className="flex-1 flex items-center justify-center">
                <InteractiveSkillsSphere />
              </div>
            </div>

            {/* Bottom Statistics Strip */}
            <div className="w-full max-w-[880px] rounded-full bg-[#0d0722]/90 backdrop-blur-xl border border-purple-500/35 px-6 sm:px-8 py-2.5 shadow-[0_12px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(168,85,247,0.22)] flex items-center justify-between">
              {/* Stat 1 */}
              <div className="flex items-center gap-3">
                <span className="text-purple-400 font-mono font-bold text-base">&lt;/&gt;</span>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white leading-tight font-sans">6+</div>
                  <div className="text-[11px] text-zinc-400 font-sans">Languages</div>
                </div>
              </div>

              <div className="h-6 w-[1px] bg-purple-500/25" />

              {/* Stat 2 */}
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-sm sm:text-base font-bold text-white leading-tight font-sans">10+</div>
                  <div className="text-[11px] text-zinc-400 font-sans">Technologies</div>
                </div>
              </div>

              <div className="h-6 w-[1px] bg-purple-500/25" />

              {/* Stat 3 */}
              <div className="flex items-center gap-3">
                <Brain className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-sm sm:text-base font-bold text-white leading-tight font-sans">3+</div>
                  <div className="text-[11px] text-zinc-400 font-sans">AI &amp; LLM Tools</div>
                </div>
              </div>

              <div className="h-6 w-[1px] bg-purple-500/25" />

              {/* Stat 4 */}
              <div className="flex items-center gap-3">
                <Cloud className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-sm sm:text-base font-bold text-white leading-tight font-sans">2+</div>
                  <div className="text-[11px] text-zinc-400 font-sans">Cloud Platforms</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SCENE 4: EXPERIENCE — COASTAL SEVEN TECHNOLOGIES */}
        <div
          ref={s4Ref}
          className="absolute inset-0 w-full h-full px-6 sm:px-10 md:px-14 lg:px-16 pt-24 sm:pt-28 pb-8 flex flex-col justify-center items-center lg:items-start z-10 pointer-events-auto overflow-hidden"
        >
          <div className="max-w-4xl xl:max-w-5xl w-full lg:mr-24 xl:mr-44 z-10">
            {/* Header row: Badge, Headline & Subtitle */}
            <div className="flex flex-col items-start mb-4 text-left">
              {/* 04 // WORK EXPERIENCE Badge */}
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/35 bg-[#150f2b]/80 text-purple-300 font-mono text-[11px] tracking-widest uppercase font-semibold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                  <span>04 // WORK EXPERIENCE</span>
                </div>
                <div className="h-[1px] w-12 bg-gradient-to-r from-zinc-500/60 to-transparent" />
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-1.5">
                <span>Production Engineering at</span>{' '}
                <span className="italic font-serif bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(192,132,252,0.4)]">
                  Coastal Seven Technologies.
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-2xl">
                Engineering production web, mobile, and AI platforms. Delivering enterprise RAG chatbots, government systems, client applications, and cross-platform mobile apps.
              </p>
            </div>

            {/* Company Banner / Role Capsule */}
            <div className="rounded-2xl bg-[#120b24]/90 backdrop-blur-xl border border-purple-500/35 px-5 py-3 mb-3.5 flex flex-wrap items-center justify-between gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(168,85,247,0.15)]">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-[0_0_14px_rgba(168,85,247,0.3)]">
                  <Briefcase className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-sm sm:text-base font-bold text-white font-sans tracking-wide">
                      COASTAL SEVEN TECHNOLOGIES
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(16,185,129,0.25)] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE SDE
                    </span>
                  </div>
                  <p className="text-xs text-purple-300/80 font-mono">
                    Full-Stack Developer &amp; AI Engineer • May 2024 – Present
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Visakhapatnam, India (Hybrid)</span>
              </div>
            </div>

            {/* 6 Key Client & Production Projects Grid (3 cols x 2 rows) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  title: 'Enterprise RAG Chatbots',
                  tag: 'AI & RAGAS EVALUATION',
                  desc: 'Engineered production RAG chatbots evaluated with RAGAS metrics for faithfulness, answer relevance, and context precision with low latency.',
                  skills: ['LangChain', 'LlamaIndex', 'RAGAS', 'FastAPI'],
                  icon: <Brain className="w-4 h-4 text-purple-400" />
                },
                {
                  title: 'Innotribe Client Project',
                  tag: 'FULL-STACK APPLICATION',
                  desc: 'Developed modular React.js frontend interfaces and integrated robust backend REST APIs for complex client workflows and operations.',
                  skills: ['React.js', 'Node.js', 'PostgreSQL', 'REST APIs'],
                  icon: <Layers className="w-4 h-4 text-purple-400" />
                },
                {
                  title: 'RTIH Government Platform',
                  tag: 'GOVERNMENT & INSTITUTIONAL',
                  desc: 'Contributed to the RTIH government portal, building high-reliability dashboard workflows, role-based access, and secure data handling.',
                  skills: ['Full-Stack', 'Gov Portal', 'Secure APIs', 'DBMS'],
                  icon: <ShieldCheck className="w-4 h-4 text-purple-400" />
                },
                {
                  title: 'Snappod.ai',
                  tag: 'AI INTERFACES & FRONTEND',
                  desc: 'Engineered responsive React.js and Next.js interfaces, modular component libraries, and custom hooks delivering interactive AI experiences.',
                  skills: ['React.js', 'Next.js', 'Tailwind', 'Redux'],
                  icon: <Cpu className="w-4 h-4 text-purple-400" />
                },
                {
                  title: 'Scholar Lens',
                  tag: 'RESEARCH & SEARCH INTELLIGENCE',
                  desc: 'Built contextual document search and semantic retrieval pipelines for academic literature indexing and scholarly discovery.',
                  skills: ['AI Search', 'Document Parsing', 'Python', 'APIs'],
                  icon: <Search className="w-4 h-4 text-purple-400" />
                },
                {
                  title: 'MediPocket (React Native)',
                  tag: 'MOBILE HEALTHCARE APP',
                  desc: 'Developed cross-platform mobile healthcare app in React Native featuring 60 FPS gesture navigation, state management, and secure APIs.',
                  skills: ['React Native', 'Mobile UI', 'Cross-Platform', 'REST'],
                  icon: <Smartphone className="w-4 h-4 text-purple-400" />
                }
              ].map((proj, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => sound.playHover()}
                  className="rounded-2xl bg-[#100922]/85 backdrop-blur-xl border border-purple-500/25 p-3.5 flex flex-col justify-between hover:border-purple-400/60 hover:bg-purple-950/40 shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_15px_rgba(168,85,247,0.1)] transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-purple-400 tracking-wider uppercase px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20">
                        {proj.tag}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {proj.icon}
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-white font-sans group-hover:text-purple-100 transition-colors mb-1">
                      {proj.title}
                    </h4>
                    <p className="text-[11px] text-zinc-300/80 leading-relaxed font-sans mb-2.5 line-clamp-2">
                      {proj.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-purple-500/15">
                    {proj.skills.map((s, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/25 text-purple-300 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SCENE 5: CONTACT (Formspree xdegapyl) */}
        <div
          ref={s5Ref}
          className="absolute inset-0 w-full h-full px-6 md:px-12 lg:px-16 pt-24 pb-16 flex flex-col justify-center items-center lg:items-start z-10 pointer-events-auto"
        >
          <div className="max-w-3xl xl:max-w-4xl w-full lg:mr-24 xl:mr-36">
            <div className="flex flex-col items-start mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 font-mono text-[11px] tracking-widest uppercase mb-2 font-bold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <Mail className="w-3.5 h-3.5" />
                <span>05 // Initiate Direct Transmission</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.1]">
                Let's Build Something <br />
                <span className="italic font-serif bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(192,132,252,0.4)]">
                  Remarkable Together.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="glass-panel-dark p-5 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1 font-bold">
                    DIRECT INBOX
                  </span>
                  <div className="flex items-center justify-between gap-2 bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
                    <span className="font-mono text-xs text-zinc-200 select-all font-bold truncate">
                      {PERSONAL_INFO.email}
                    </span>
                    <button
                      onClick={copyEmail}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors shrink-0"
                      title="Copy email"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {copiedEmail && (
                    <p className="text-[11px] font-mono text-emerald-400 mt-1 font-semibold">
                      ✓ Copied to clipboard!
                    </p>
                  )}
                </div>

                <div className="glass-panel-dark p-5 rounded-2xl border border-zinc-800 space-y-2 text-xs font-mono text-zinc-300">
                  <div className="flex items-center justify-between py-1 border-b border-zinc-800/80">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" /> Base:
                    </span>
                    <span className="text-white font-bold">{PERSONAL_INFO.location}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-zinc-800/80">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <Phone className="w-3.5 h-3.5 text-purple-400" /> Phone:
                    </span>
                    <span className="text-white font-bold">{PERSONAL_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <a
                    href="https://github.com/abhisri30"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-mono font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-all hover:border-purple-500/40"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-purple-400" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/abhinayasri"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-mono font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-all hover:border-purple-500/40"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-purple-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 glass-panel-dark p-6 rounded-3xl border border-zinc-800">
                {formState.succeeded ? (
                  <div className="py-10 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">
                      Message Dispatched to Abhinayasri
                    </h3>
                    <p className="text-zinc-400 text-xs max-w-sm mx-auto leading-relaxed font-sans">
                      Thank you! Your transmission was delivered directly to Abhinayasri's priority inbox via Formspree.
                    </p>
                    <button
                      onClick={() => {
                        sound.playClick();
                        resetForm();
                        setFormData({ name: '', email: '', opportunityType: 'Full-Time SDE / AI', message: '' });
                      }}
                      className="mt-3 px-5 py-2 rounded-xl text-xs font-mono text-purple-400 border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 font-bold transition-all"
                    >
                      Send Another Transmission
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      sound.playClick();
                      await handleFormSubmit(e);
                    }}
                    className="space-y-4"
                  >
                    <input type="hidden" name="opportunityType" value={formData.opportunityType} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-[11px] font-mono text-zinc-400 mb-1 font-bold">
                          YOUR NAME *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Alex Mercer"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-purple-500 text-white text-xs placeholder:text-zinc-600 outline-none transition-all font-sans"
                        />
                        <ValidationError prefix="Name" field="name" errors={formState.errors} className="text-[10px] text-rose-400 font-mono mt-0.5" />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-[11px] font-mono text-zinc-400 mb-1 font-bold">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-purple-500 text-white text-xs placeholder:text-zinc-600 outline-none transition-all font-sans"
                        />
                        <ValidationError prefix="Email" field="email" errors={formState.errors} className="text-[10px] text-rose-400 font-mono mt-0.5" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1.5 font-bold">
                        ROLE / OPPORTUNITY TYPE
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['Full-Time SDE / AI', 'Frontend / React', 'Backend / FastAPI', 'Consulting / Tech'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              sound.playClick();
                              setFormData({ ...formData, opportunityType: opt });
                            }}
                            className={`py-1.5 px-2 rounded-xl text-[10px] font-mono border transition-all text-center ${
                              formData.opportunityType === opt
                                ? 'bg-purple-600 text-white border-purple-500 font-bold shadow-md shadow-purple-500/30'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[11px] font-mono text-zinc-400 mb-1 font-bold">
                        MESSAGE / SPECIFICATIONS *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        required
                        placeholder="Project requirements, engineering opening, or team specifications..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-purple-500 text-white text-xs placeholder:text-zinc-600 outline-none transition-all font-sans resize-none"
                      />
                      <ValidationError prefix="Message" field="message" errors={formState.errors} className="text-[10px] text-rose-400 font-mono mt-0.5" />
                    </div>

                    {formState.errors && (
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-mono flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Formspree transmission error. Please check fields or email directly.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formState.submitting}
                      onMouseEnter={() => sound.playHover()}
                      className="w-full py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(192,132,252,0.65)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 active:scale-[0.98]"
                    >
                      {formState.submitting ? (
                        <span>Transmitting to Abhinaya's Inbox...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          <span>Dispatch Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
