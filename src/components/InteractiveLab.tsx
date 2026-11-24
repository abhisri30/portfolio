import React from 'react';
import { Sliders, Zap, RefreshCw, Music, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { LabSettings } from '../types';
import { sound } from '../utils/sound';

interface InteractiveLabProps {
  settings: LabSettings;
  onUpdateSettings: (newSettings: Partial<LabSettings>) => void;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ settings, onUpdateSettings }) => {
  const palettes: { key: LabSettings['palette']; label: string; color: string; desc: string }[] = [
    { key: 'cyber', label: 'Sunset Industrial', color: '#EA580C', desc: 'Charcoal & Mild Orange' },
    { key: 'solar', label: 'Amber Flare', color: '#F59E0B', desc: 'Warm Amber & Tangerine' },
    { key: 'emerald', label: 'Cyber Matrix', color: '#10B981', desc: 'Clean Emerald & Mint' },
    { key: 'ultraviolet', label: 'Obsidian Core', color: '#18181B', desc: 'Cool Grey & Jet Black' },
  ];

  const triggerExplosion = (e: React.MouseEvent) => {
    sound.playSuccess();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { x, y },
      colors: ['#EA580C', '#F97316', '#FBBF24', '#09090B', '#71717A'],
    });
  };

  const playSynthNote = (freq: number) => {
    sound.playTone(freq, 'sine', 0.25);
  };

  const resetDefaults = () => {
    sound.playClick();
    onUpdateSettings({
      particleCount: 85,
      connectionDistance: 130,
      speed: 0.9,
      palette: 'cyber',
    });
  };

  return (
    <section id="lab" className="py-28 px-4 md:px-8 max-w-7xl mx-auto relative">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-orange-100/50 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-300 bg-orange-50 text-orange-900 font-mono text-xs tracking-wider uppercase mb-3 font-semibold">
            <Sliders className="w-3.5 h-3.5 text-orange-600" />
            <span>06 // Interactive Physics Sandbox</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-zinc-900 font-display tracking-tight uppercase">
            Generative Canvas & <br />
            <span className="text-outline-dark hover:text-orange-600 transition-colors">Particle Physics Lab</span>
            <span className="text-orange-600">.</span>
          </h2>
          <p className="text-zinc-600 text-sm max-w-xl mt-3 font-sans">
            Take full control of this portfolio's live background physics simulation. Adjust particle count, connection radius, velocities, and color palettes in real-time.
          </p>
        </div>

        <button
          onClick={resetDefaults}
          onMouseEnter={() => sound.playHover()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-zinc-700 hover:text-zinc-950 border border-zinc-200 hover:border-orange-400 bg-white shadow-sm transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-orange-600" />
          <span>Reset Lab Defaults</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (Span 7) */}
        <div className="lg:col-span-7 glass-panel bg-white/95 p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-md space-y-8">
          {/* Palette Selector */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center justify-between mb-4 font-bold">
              <span className="flex items-center gap-1.5 text-zinc-900">
                <Eye className="w-4 h-4 text-orange-600" />
                Color Theme Palette
              </span>
              <span className="text-orange-600 font-mono text-[11px] uppercase font-bold">
                Active: {settings.palette}
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {palettes.map((p) => {
                const isSelected = settings.palette === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => {
                      sound.playClick();
                      onUpdateSettings({ palette: p.key });
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/80 shadow-sm'
                        : 'border-zinc-200 bg-zinc-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-xs font-bold text-zinc-900 font-display">{p.label}</span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500">{p.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Particle Count Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-700 font-bold">PARTICLE DENSITY</span>
              <span className="text-orange-600 font-bold">{settings.particleCount} Nodes</span>
            </div>
            <input
              type="range"
              min="20"
              max="160"
              value={settings.particleCount}
              onChange={(e) => onUpdateSettings({ particleCount: Number(e.target.value) })}
              className="w-full accent-orange-600 cursor-pointer"
            />
          </div>

          {/* Connection Distance Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-700 font-bold">CONNECTION RADIUS</span>
              <span className="text-orange-600 font-bold">{settings.connectionDistance}px</span>
            </div>
            <input
              type="range"
              min="60"
              max="220"
              value={settings.connectionDistance}
              onChange={(e) => onUpdateSettings({ connectionDistance: Number(e.target.value) })}
              className="w-full accent-orange-600 cursor-pointer"
            />
          </div>

          {/* Speed Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-700 font-bold">DRIFT VELOCITY</span>
              <span className="text-orange-600 font-bold">{settings.speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.1"
              value={settings.speed}
              onChange={(e) => onUpdateSettings({ speed: Number(e.target.value) })}
              className="w-full accent-orange-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Audio Synthesizer & Shockwave Column (Span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="glass-panel bg-white/95 p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-md">
            <h3 className="text-lg font-bold text-zinc-900 font-display flex items-center gap-2 mb-4">
              <Music className="w-4 h-4 text-orange-600" />
              <span>Web Audio Synthesizer</span>
            </h3>
            <p className="text-zinc-600 text-xs mb-5 font-sans leading-relaxed">
              Test procedural acoustic feedback generated on-the-fly using the Web Audio API oscillator.
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[261.63, 329.63, 392.00, 523.25].map((freq, i) => (
                <button
                  key={i}
                  onClick={() => playSynthNote(freq)}
                  className="py-3 rounded-xl bg-zinc-100 hover:bg-orange-500 hover:text-white border border-zinc-200 text-xs font-mono font-bold transition-all text-center"
                >
                  {['C4', 'E4', 'G4', 'C5'][i]}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel bg-white/95 p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-md text-center">
            <h3 className="text-lg font-bold text-zinc-900 font-display mb-2">
              Celebration Confetti
            </h3>
            <p className="text-zinc-600 text-xs mb-5 font-sans">
              Test physics-driven canvas particle burst.
            </p>
            <button
              onClick={triggerExplosion}
              onMouseEnter={() => sound.playHover()}
              className="w-full py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Trigger Confetti Blast</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
