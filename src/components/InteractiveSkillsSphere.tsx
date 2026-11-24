import React, { useEffect, useRef, useState } from 'react';
import {
  Zap,
  Cpu,
  Cloud,
  Database,
  Infinity as InfinityIcon,
  Layers,
  Camera,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/sound';

interface SpherePill {
  id: string;
  name: string;
  category?: string;
  icon: React.ReactNode;
  theta: number; // azimuth (around Y axis)
  phi: number;   // polar angle (from top to bottom)
  isProminent?: boolean;
}

const PILLS: SpherePill[] = [
  // Front face (matching reference image positions)
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    icon: (
      <svg className="w-3.5 h-3.5 text-cyan-300 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </svg>
    ),
    theta: 0.0,
    phi: 0.64,
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'ai',
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" />,
    theta: -0.62,
    phi: 0.92,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    icon: (
      <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px] font-bold text-yellow-300 bg-blue-500/30 rounded-xs">
        Py
      </span>
    ),
    theta: 0.62,
    phi: 0.94,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'languages',
    icon: (
      <span className="w-3.5 h-3.5 flex items-center justify-center text-[9px] font-bold text-white bg-blue-600 rounded-xs">
        TS
      </span>
    ),
    theta: -0.82,
    phi: 1.34,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    icon: (
      <span className="w-3.5 h-3.5 flex items-center justify-center text-[9px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-400/60 rounded-xs">
        JS
      </span>
    ),
    theta: -0.05,
    phi: 1.48,
  },
  {
    id: 'rest',
    name: 'REST APIs',
    category: 'backend',
    icon: <Layers className="w-3.5 h-3.5 text-indigo-300" />,
    theta: 0.76,
    phi: 1.36,
  },
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    icon: <span className="text-[11px] leading-none">☕</span>,
    theta: -0.68,
    phi: 1.82,
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'backend',
    icon: <Database className="w-3.5 h-3.5 text-blue-300" />,
    theta: 0.58,
    phi: 1.72,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: <span className="text-cyan-400 text-xs leading-none">🌊</span>,
    theta: -0.45,
    phi: 2.14,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    icon: <span className="w-3.5 h-3.5 rounded-full bg-white text-black flex items-center justify-center text-[9px] font-black">N</span>,
    theta: 0.46,
    phi: 2.08,
  },
  {
    id: 'rag',
    name: 'RAG & LLMs',
    category: 'ai',
    icon: <Cpu className="w-3.5 h-3.5 text-fuchsia-300" />,
    theta: -0.28,
    phi: 2.42,
    isProminent: true,
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'cloud',
    icon: <Cloud className="w-3.5 h-3.5 text-amber-400" />,
    theta: 0.36,
    phi: 2.44,
  },
  // Sides & back orbits (orbiting through 3D space during rotation)
  {
    id: 'llamaindex',
    name: 'LlamaIndex',
    category: 'ai',
    icon: <InfinityIcon className="w-3.5 h-3.5 text-fuchsia-400" />,
    theta: 1.82,
    phi: 1.32,
    isProminent: true,
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
    theta: 2.25,
    phi: 2.1,
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    icon: (
      <svg className="w-3.5 h-3.5 text-cyan-400 fill-current" viewBox="0 0 24 24">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 2.714h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.185-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m0-2.714h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.955 2.714h2.12a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954 0h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H.186A.186.186 0 000 9.006v1.887c0 .102.083.185.186.185m23.805 1.573a6.83 6.83 0 00-4.084-3.52c-.17-.066-.35-.098-.535-.098-.316 0-.623.097-.884.282-.544.384-1.127.708-1.742.969-.31.13-.538.385-.62.704-.15.586-.023 1.205.342 1.673.722.923 1.65 1.636 2.705 2.083.218.093.456.14.695.14.484 0 .952-.194 1.298-.543.834-.842 1.185-1.996.825-3.69m-11.87 3.522c-.672 0-1.32-.128-1.927-.381a.573.573 0 00-.51.047 11.2 11.2 0 01-3.682 1.488.583.583 0 01-.65-.332.585.585 0 01.126-.677c.725-.745 1.238-1.63 1.516-2.612a.58.58 0 00-.236-.615 12.39 12.39 0 01-3.41-3.328.58.58 0 00-.776-.178 7.33 7.33 0 00-3.36 4.388c-.615 2.11.026 4.417 1.674 6.02 2.673 2.6 6.776 3.42 10.395 2.078 4.29-1.59 7.158-5.748 7.158-10.375 0-.256-.01-.512-.027-.768a.58.58 0 00-.47-.533 13.56 13.56 0 01-4.032-.976.58.58 0 00-.638.163c-.563.633-1.22 1.168-1.95 1.583a.58.58 0 00-.294.498c.005.18.008.36.008.54 0 1.964-1.22 3.65-2.91 4.195z" />
      </svg>
    ),
    theta: -1.82,
    phi: 0.88,
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'ai',
    icon: <Camera className="w-3.5 h-3.5 text-emerald-400" />,
    theta: -2.35,
    phi: 1.2,
  },
];

export const InteractiveSkillsSphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initial front-facing rotation angles matching reference mockup
  const rotRef = useRef({ rotX: 0.08, rotY: 0.0 });
  const velRef = useRef({ vx: 0, vy: 0.002 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const [activeHoverPill, setActiveHoverPill] = useState<string | null>(null);

  // Projected 2D coordinates and depth for each pill
  const [projectedPills, setProjectedPills] = useState<
    {
      pill: SpherePill;
      x: number;
      y: number;
      scale: number;
      opacity: number;
      zIndex: number;
      isFront: boolean;
    }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    // Sphere radius optimized for balanced 3-column layout
    const radius = 135; // Sphere radius in px

    const render = () => {
      // 1. Update rotation with inertia & auto-idle spin
      if (!isDraggingRef.current) {
        velRef.current.vx *= 0.95;
        velRef.current.vy = velRef.current.vy * 0.95 + 0.002 * 0.05;
        rotRef.current.rotX += velRef.current.vx;
        rotRef.current.rotY += velRef.current.vy;
      }

      const { rotX, rotY } = rotRef.current;
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Rotate a 3D point (x, y, z) by rotY (around Y) then rotX (around X)
      const rotatePoint = (x: number, y: number, z: number) => {
        // Y-axis rotation
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // X-axis rotation
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        return { x: x1, y: y2, z: z2 };
      };

      // 2. Draw canvas wireframe globe
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // (Bottom shadow/flare disc removed as requested for clean floating globe)

      // B. Ambient central purple core glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.95);
      coreGrad.addColorStop(0, 'rgba(192, 132, 252, 0.45)');
      coreGrad.addColorStop(0.4, 'rgba(147, 51, 234, 0.2)');
      coreGrad.addColorStop(1, 'rgba(126, 34, 206, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.95, 0, Math.PI * 2);
      ctx.fill();

      // C. Draw latitude circles (horizontal wireframe rings)
      const latSteps = 8;
      for (let i = 1; i < latSteps; i++) {
        const lat = ((i / latSteps) - 0.5) * Math.PI * 0.88;
        const rLat = radius * Math.cos(lat);
        const yLat = -radius * Math.sin(lat);

        ctx.beginPath();
        const segments = 60;
        for (let s = 0; s <= segments; s++) {
          const a = (s / segments) * Math.PI * 2;
          const px = rLat * Math.sin(a);
          const py = yLat;
          const pz = rLat * Math.cos(a);
          const rp = rotatePoint(px, py, pz);

          // Projected point with gentle perspective
          const fov = 480;
          const scale = fov / (fov - rp.z);
          const screenX = cx + rp.x * scale;
          const screenY = cy + rp.y * scale;

          if (s === 0) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);
        }
        ctx.strokeStyle = i === Math.floor(latSteps / 2) ? 'rgba(232, 121, 249, 0.75)' : 'rgba(192, 132, 252, 0.45)';
        ctx.lineWidth = i === Math.floor(latSteps / 2) ? 1.7 : 1.1;
        ctx.stroke();
      }

      // D. Draw longitude lines (vertical wireframe meridians)
      const lonSteps = 10;
      for (let i = 0; i < lonSteps; i++) {
        const lon = (i / lonSteps) * Math.PI;

        ctx.beginPath();
        const segments = 60;
        for (let s = 0; s <= segments; s++) {
          const a = (s / segments) * Math.PI * 2;
          const px = radius * Math.sin(a) * Math.sin(lon);
          const py = -radius * Math.cos(a);
          const pz = radius * Math.sin(a) * Math.cos(lon);
          const rp = rotatePoint(px, py, pz);

          const fov = 480;
          const scale = fov / (fov - rp.z);
          const screenX = cx + rp.x * scale;
          const screenY = cy + rp.y * scale;

          if (s === 0) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);
        }
        ctx.strokeStyle = 'rgba(192, 132, 252, 0.38)';
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // E. Outer edge ring glow
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(232, 121, 249, 0.65)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 3. Project 3D Pill Badges
      const nextPills = PILLS.map((pill) => {
        // Base 3D coordinate on sphere matching unified latitude/longitude coordinates
        const px = radius * Math.sin(pill.phi) * Math.sin(pill.theta);
        const py = -radius * Math.cos(pill.phi);
        const pz = radius * Math.sin(pill.phi) * Math.cos(pill.theta);

        const rp = rotatePoint(px, py, pz);

        const fov = 480;
        const scale = fov / (fov - rp.z);
        const screenX = cx + rp.x * scale;
        const screenY = cy + rp.y * scale;

        // Front depth factor (-1 to +1)
        const depthNorm = rp.z / radius;
        const isFront = rp.z > 0;
        // Fade smoothly based on z-depth: front items full crisp opacity, back items fade out to prevent overlapping
        const opacity = isFront ? Math.max(0.65, Math.min(1, 0.65 + depthNorm * 0.4)) : 0;
        const zIndex = Math.round(rp.z + 200);

        return {
          pill,
          x: screenX,
          y: screenY,
          scale: Math.max(0.75, Math.min(1.15, scale)),
          opacity,
          zIndex,
          isFront,
        };
      });

      setProjectedPills(nextPills);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Pointer drag controls (Mouse & Touch)
  const handlePointerDown = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const dx = clientX - lastMouseRef.current.x;
    const dy = clientY - lastMouseRef.current.y;

    velRef.current = {
      vx: dy * 0.005,
      vy: dx * 0.005,
    };

    rotRef.current.rotX += dy * 0.005;
    rotRef.current.rotY += dx * 0.005;

    lastMouseRef.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
      onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={(e) => {
        if (e.touches.length > 0) {
          handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchMove={(e) => {
        if (e.touches.length > 0) {
          handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchEnd={handlePointerUp}
      className="relative w-full h-[350px] sm:h-[360px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
    >
      {/* Inner Centered Stage: Exact coordinate match for canvas and 3D pills */}
      <div className="relative w-[440px] h-[360px] flex-shrink-0">
        {/* Canvas rendering wireframe 3D sphere rings & glow */}
        <canvas
          ref={canvasRef}
          width={440}
          height={360}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Floating 3D Pills */}
        {projectedPills.map(({ pill, x, y, scale, opacity, zIndex, isFront }) => {
          const isCenterGlow = pill.isProminent && isFront;
          const isHovered = activeHoverPill === pill.id;

          return (
            <button
              key={pill.id}
              onClick={() => sound.playClick()}
              onMouseEnter={() => {
                sound.playHover();
                setActiveHoverPill(pill.id);
              }}
              onMouseLeave={() => setActiveHoverPill(null)}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${isHovered ? scale * 1.15 : scale})`,
                opacity: isHovered ? 1 : opacity,
                zIndex: isHovered ? zIndex + 50 : zIndex,
                pointerEvents: isFront ? 'auto' : 'none',
                visibility: opacity > 0.05 ? 'visible' : 'hidden',
              }}
              className={`absolute top-0 left-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-150 backdrop-blur-md group ${
                isCenterGlow || isHovered
                  ? 'bg-[#1e103c]/95 border-2 border-purple-400 text-white shadow-[0_0_30px_rgba(168,85,247,0.8),inset_0_0_15px_rgba(192,132,252,0.35)]'
                  : isFront
                  ? 'bg-[#150c2a]/90 border border-purple-500/40 text-white shadow-[0_0_18px_rgba(168,85,247,0.35)] hover:border-purple-300 hover:shadow-[0_0_25px_rgba(192,132,252,0.6)]'
                  : 'bg-[#100822]/60 border border-purple-500/20 text-zinc-400 shadow-none'
              }`}
            >
              <span className="flex-shrink-0 group-hover:scale-110 transition-transform">
                {pill.icon}
              </span>
              <span
                className={`font-mono text-xs font-bold tracking-wide whitespace-nowrap ${
                  isCenterGlow || isHovered
                    ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]'
                    : isFront
                    ? 'text-zinc-100 group-hover:text-white'
                    : 'text-zinc-400'
                }`}
              >
                {pill.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
