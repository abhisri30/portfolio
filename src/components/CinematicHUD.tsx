import React, { useEffect, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface CinematicHUDProps {
  currentScene: number; // 1 to 6
  totalScenes?: number;
}

export const CinematicHUD: React.FC<CinematicHUDProps> = ({ currentScene, totalScenes = 6 }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer className="fixed bottom-5 inset-x-0 z-40 px-6 md:px-12 pointer-events-none flex items-end justify-between select-none">
      {/* Left Pill: Award Badge / Status */}
      <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/70 shadow-lg backdrop-blur-md text-[11px] font-mono text-zinc-300">
        <Sparkles className="w-3.5 h-3.5 text-orange-500" />
        <span className="font-semibold text-zinc-200">ABHINAYASRI.DEV</span>
        <span className="text-zinc-500">|</span>
        <span className="text-orange-400 font-bold">OPEN TO SDE / AI</span>
      </div>

      {/* Center: Scroll To Advance Indicator */}
      <div className="pointer-events-auto hidden sm:flex flex-col items-center gap-1.5 cursor-pointer">
        <div className="w-8 h-8 rounded-full border border-zinc-700/70 bg-zinc-900/80 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform hover:scale-110">
          <ChevronDown className="w-4 h-4 text-orange-400 animate-bounce" />
        </div>
        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-semibold">
          SCROLL TO EXPLORE
        </span>
      </div>

      {/* Right: Scene Tracker & Dynamic Coordinates */}
      <div className="pointer-events-auto inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/70 shadow-lg backdrop-blur-md text-[11px] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500">SCENE</span>
          <span className="text-orange-400 font-bold">0{currentScene}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">0{totalScenes}</span>
        </div>
        <span className="hidden md:inline text-zinc-600">•</span>
        <span className="hidden md:inline text-zinc-500 font-medium">
          X: {coords.x} Y: {coords.y}
        </span>
      </div>
    </footer>
  );
};
