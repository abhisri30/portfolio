import React from 'react';
import { Volume2, VolumeX, Sparkles, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface NavbarProps {
  currentScene: number;
  onJumpToScene: (sceneIndex: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReplayIntro?: () => void;
}

const SCENE_PILLS = [
  { id: 1, label: 'HERO' },
  { id: 2, label: 'ABOUT' },
  { id: 3, label: 'SKILLS 3D' },
  { id: 4, label: 'TIMELINE' },
  { id: 5, label: 'WORKS' },
  { id: 6, label: 'CONTACT' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentScene,
  onJumpToScene,
  soundEnabled,
  onToggleSound,
  onReplayIntro,
}) => {
  const handleDownloadResume = (e: React.MouseEvent) => {
    sound.playSuccess();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const xPos = (rect.left + rect.width / 2) / window.innerWidth;
    const yPos = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: xPos, y: yPos },
      colors: ['#EA580C', '#F97316', '#FBBF24', '#09090B'],
    });

    const link = document.createElement('a');
    link.href = '/Abhinayasri_Resume.pdf';
    link.download = 'Abhinayasri_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="fixed top-5 inset-x-0 z-40 px-6 md:px-12 pointer-events-none flex items-center justify-between select-none">
      {/* Left Brand Identity */}
      <div className="pointer-events-auto flex items-center gap-3">
        <button
          onClick={() => onJumpToScene(1)}
          className="text-left group flex items-center gap-2.5"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-200 font-bold group-hover:text-orange-400 transition-colors">
            BURUGUPALLI ABHINAYA SRI
          </span>
        </button>
      </div>

      {/* Center Cinematic Scene Navigation Pills */}
      <nav className="pointer-events-auto hidden lg:flex items-center gap-1 bg-zinc-900/80 p-1 rounded-full border border-zinc-700/70 shadow-xl backdrop-blur-md">
        {SCENE_PILLS.map((pill) => {
          const isActive = currentScene === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => {
                sound.playClick();
                onJumpToScene(pill.id);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-3 py-1.5 text-xs font-mono rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-orange-600 text-white font-bold shadow-[0_0_15px_rgba(234,88,12,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>{pill.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Audio, Replay 3D 'A', Resume */}
      <div className="pointer-events-auto flex items-center gap-2">
        {onReplayIntro && (
          <button
            onClick={() => {
              sound.playClick();
              onReplayIntro();
            }}
            onMouseEnter={() => sound.playHover()}
            title='Replay 3D Particle Vortex "A"'
            className="p-2 rounded-full border border-zinc-700/70 hover:border-orange-500 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-orange-400 transition-all shadow-md backdrop-blur-md hidden sm:flex items-center gap-1.5 text-xs font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden xl:inline">3D "A" Intro</span>
          </button>
        )}

        <button
          onClick={() => {
            onToggleSound();
            sound.playClick();
          }}
          onMouseEnter={() => sound.playHover()}
          title={soundEnabled ? 'Mute procedural audio' : 'Enable audio'}
          className="p-2 rounded-full border border-zinc-700/70 hover:border-orange-500 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-orange-400 transition-all shadow-md backdrop-blur-md flex items-center"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-orange-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-zinc-500" />
          )}
        </button>

        <button
          onClick={handleDownloadResume}
          onMouseEnter={() => sound.playHover()}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase rounded-full bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_18px_rgba(234,88,12,0.4)] transition-all hover:scale-105"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Resume</span>
        </button>
      </div>
    </header>
  );
};
