import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Sparkles, Move } from 'lucide-react';
import { sound } from '../utils/sound';

interface SkillTag {
  name: string;
  category: string;
  level: number;
}

const ALL_SKILLS: SkillTag[] = [
  { name: 'React.js', category: 'Frontend', level: 98 },
  { name: 'Next.js', category: 'Frontend', level: 96 },
  { name: 'TypeScript', category: 'Languages', level: 96 },
  { name: 'Python', category: 'Languages', level: 95 },
  { name: 'RAG & LLMs', category: 'AI', level: 96 },
  { name: 'RAGAS Metrics', category: 'AI', level: 95 },
  { name: 'LangChain', category: 'AI', level: 94 },
  { name: 'LlamaIndex', category: 'AI', level: 93 },
  { name: 'PyTorch', category: 'AI', level: 90 },
  { name: 'FastAPI', category: 'Backend', level: 93 },
  { name: 'Node.js', category: 'Backend', level: 94 },
  { name: 'React Native', category: 'Mobile', level: 92 },
  { name: 'PostgreSQL', category: 'Databases', level: 92 },
  { name: 'MongoDB', category: 'Databases', level: 90 },
  { name: 'AWS Cloud', category: 'Cloud', level: 88 },
  { name: 'Docker', category: 'DevOps', level: 90 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 96 },
  { name: 'Redux', category: 'Frontend', level: 94 },
  { name: 'Java', category: 'Languages', level: 88 },
  { name: 'Vector DB', category: 'AI', level: 92 },
  { name: 'OpenCV', category: 'AI', level: 89 },
  { name: 'GraphQL', category: 'Backend', level: 87 },
  { name: 'REST APIs', category: 'Backend', level: 96 },
  { name: 'Git & CI/CD', category: 'DevOps', level: 94 },
];

export const SkillsGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState({ rx: 0.002, ry: 0.003 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<SkillTag | null>(null);

  // Distribute skills over a sphere using Fibonacci spiral
  const tags = useMemo(() => {
    const N = ALL_SKILLS.length;
    const radius = 175; // Sphere radius in px
    return ALL_SKILLS.map((skill, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        ...skill,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      };
    });
  }, []);

  const [positions, setPositions] = useState(tags);

  useEffect(() => {
    let animId: number;

    const animate = () => {
      setPositions((prev) =>
        prev.map((p) => {
          // Rotate around X axis
          const cosX = Math.cos(rotation.rx);
          const sinX = Math.sin(rotation.rx);
          const y1 = p.y * cosX - p.z * sinX;
          const z1 = p.z * cosX + p.y * sinX;

          // Rotate around Y axis
          const cosY = Math.cos(rotation.ry);
          const sinY = Math.sin(rotation.ry);
          const x2 = p.x * cosY + z1 * sinY;
          const z2 = z1 * cosY - p.x * sinY;

          return { ...p, x: x2, y: y1, z: z2 };
        })
      );

      // Dampen rotation slightly when dragging stops
      if (!isDragging) {
        setRotation((r) => ({
          rx: r.rx * 0.992 + 0.0015 * 0.008,
          ry: r.ry * 0.992 + 0.0025 * 0.008,
        }));
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [rotation, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    setRotation({
      rx: -dy * 0.0008,
      ry: dx * 0.0008,
    });
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D Sphere Interactive Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] mx-auto select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Central glowing core */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-400/20 via-amber-300/10 to-transparent blur-xl" />
        </div>

        {/* Orbit ring decorative geometry */}
        <div className="absolute inset-6 rounded-full border border-orange-500/10 pointer-events-none [transform:rotateX(68deg)]" />
        <div className="absolute inset-14 rounded-full border border-black/[0.04] pointer-events-none [transform:rotateY(68deg)]" />

        {/* Projected 3D Skill Tags */}
        {positions.map((p) => {
          const depth = 280;
          const scale = depth / (depth - p.z);
          const alpha = Math.max(0.2, (p.z + 180) / 360);
          const isFront = p.z > 20;

          return (
            <button
              key={p.name}
              onMouseEnter={() => {
                sound.playHover();
                setHoveredSkill(p);
              }}
              onClick={() => sound.playClick()}
              style={{
                transform: `translate3d(${p.x + 170}px, ${p.y + 170}px, 0) scale(${Math.max(0.65, scale)})`,
                opacity: alpha,
                zIndex: Math.round(p.z + 200),
              }}
              className={`absolute top-0 left-0 px-3 py-1 rounded-full text-xs font-mono font-semibold transition-colors shadow-sm ${
                isFront
                  ? 'bg-white text-zinc-900 border border-orange-400/60 shadow-[0_2px_12px_rgba(249,115,22,0.18)]'
                  : 'bg-white/60 text-zinc-500 border border-zinc-200/70'
              } hover:bg-orange-500 hover:text-white hover:border-orange-600 hover:scale-125 hover:z-50 hover:shadow-lg`}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {/* Interactive Drag & Hover Telemetry pill */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm text-zinc-600">
          <Move className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
          <span>Click & Drag to Rotate 3D Globe</span>
        </div>

        {hoveredSkill && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-300 text-orange-800 font-semibold shadow-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>{hoveredSkill.name}</span>
            <span className="text-zinc-400">|</span>
            <span className="text-orange-600 font-bold">{hoveredSkill.level}% Mastery</span>
          </div>
        )}
      </div>
    </div>
  );
};
