import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

interface ParticleIntroProps {
  onComplete: () => void;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  tx: number; // Target X on the 3D 'AS'
  ty: number; // Target Y on the 3D 'AS'
  tz: number; // Target Z on the 3D 'AS'
  angle: number;
  radius: number;
  baseSize: number;
  color: string;
  alpha: number;
}

export const ParticleIntro: React.FC<ParticleIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const triggerRef = useRef<((strikeX?: number, strikeY?: number) => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2;

    // Mouse tracking for 3D camera sway, particle repulsion, and strike detection
    const mouse = { x: centerX, y: centerY, targetX: 0, targetY: 0, isHovering: false };
    let prevMouseX = centerX;
    let prevMouseY = centerY;
    let prevMouseTime = performance.now();
    let isMouseDown = false;

    // Strike shockwave ring state
    let strikeWave: { x: number; y: number; progress: number } | null = null;

    // Sample flawless typographic 3D coordinates for 'AS' (Abhinaya Sri)
    const NUM_PARTICLES = 1350;
    const sampleMonogramPoints = (): { x: number; y: number; z: number }[] => {
      const offCanvas = document.createElement('canvas');
      const offW = 760;
      const offH = 380;
      offCanvas.width = offW;
      offCanvas.height = offH;
      const offCtx = offCanvas.getContext('2d');

      if (!offCtx) {
        return Array.from({ length: NUM_PARTICLES }, () => ({
          x: (Math.random() - 0.5) * 320,
          y: (Math.random() - 0.5) * 200,
          z: (Math.random() - 0.5) * 60,
        }));
      }

      offCtx.fillStyle = '#ffffff';
      offCtx.font = '900 250px "Space Grotesk", "Syne", sans-serif';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText('AS', offW / 2, offH / 2);

      const imgData = offCtx.getImageData(0, 0, offW, offH);
      const data = imgData.data;
      const candidatePixels: { x: number; y: number }[] = [];

      for (let y = 0; y < offH; y += 3) {
        for (let x = 0; x < offW; x += 3) {
          const idx = (y * offW + x) * 4;
          if (data[idx + 3] > 110) {
            candidatePixels.push({
              x: (x - offW / 2) * 1.05,
              y: (y - offH / 2) * 1.05,
            });
          }
        }
      }

      if (candidatePixels.length === 0) {
        return Array.from({ length: NUM_PARTICLES }, () => ({
          x: (Math.random() - 0.5) * 320,
          y: (Math.random() - 0.5) * 200,
          z: (Math.random() - 0.5) * 60,
        }));
      }

      const points: { x: number; y: number; z: number }[] = [];
      const step = candidatePixels.length / NUM_PARTICLES;
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const pixel = candidatePixels[Math.floor(i * step) % candidatePixels.length];
        points.push({
          x: pixel.x + (Math.random() - 0.5) * 3.5,
          y: pixel.y + (Math.random() - 0.5) * 3.5,
          z: (Math.random() - 0.5) * 55, // Volumetric depth
        });
      }
      return points;
    };

    const targets = sampleMonogramPoints();

    // Re-sample when fonts are fully loaded from Google Fonts
    if (document.fonts) {
      document.fonts.ready.then(() => {
        const refreshed = sampleMonogramPoints();
        if (refreshed.length > 0) {
          for (let i = 0; i < particles.length; i++) {
            const target = refreshed[i % refreshed.length];
            particles[i].tx = target.x;
            particles[i].ty = target.y;
            particles[i].tz = target.z;
          }
        }
      });
    }

    // Portfolio Purple, Electric Violet, Neon Lavender, and Glowing White Palette
    const palette = ['#c084fc', '#a855f7', '#d8b4fe', '#9333ea', '#e879f9', '#ffffff', '#818cf8'];

    // Initialize 3D particles in a vortex spiral
    const particles: Particle3D[] = targets.map((target, idx) => {
      const angle = (idx / NUM_PARTICLES) * Math.PI * 14 + Math.random();
      const radius = Math.random() * Math.max(width, height) * 0.7 + 240;
      const z = (Math.random() - 0.5) * 700;
      const isHeroColor = idx % 2 === 0;

      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z,
        vx: 0,
        vy: 0,
        vz: 0,
        tx: target.x,
        ty: target.y,
        tz: target.z,
        angle,
        radius,
        baseSize: isHeroColor ? Math.random() * 2.2 + 1.5 : Math.random() * 1.4 + 1.0,
        color: isHeroColor
          ? (idx % 4 === 0 ? '#ffffff' : idx % 4 === 1 ? '#c084fc' : '#a855f7')
          : palette[idx % palette.length],
        alpha: Math.random() * 0.7 + 0.35,
      };
    });

    const startTime = performance.now();
    let isExploding = false;
    let cameraZ = 450;
    let camRotX = 0;
    let camRotY = 0;

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      // Deep dark space canvas matching portfolio aesthetic
      ctx.fillStyle = '#0a0915';
      ctx.fillRect(0, 0, width, height);

      // Smooth camera sway driven by cursor
      camRotY += (mouse.targetX * 0.22 - camRotY) * 0.05;
      camRotX += (-mouse.targetY * 0.18 - camRotX) * 0.05;

      const cosY = Math.cos(camRotY);
      const sinY = Math.sin(camRotY);
      const cosX = Math.cos(camRotX);
      const sinX = Math.sin(camRotX);

      // Radial ambient purple bloom behind the "AS" monogram
      const grad = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, Math.min(width, height) * 0.55);
      grad.addColorStop(0, 'rgba(168, 85, 247, 0.38)');
      grad.addColorStop(0.35, 'rgba(147, 51, 234, 0.16)');
      grad.addColorStop(0.7, 'rgba(88, 28, 135, 0.05)');
      grad.addColorStop(1, 'rgba(10, 9, 21, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const projectedList: { px: number; py: number; size: number; alpha: number; color: string; z: number }[] = [];

      // Transition factor: starts in wide spiral vortex, rapidly forms clean "AS" monogram
      const swirlFactor = Math.max(0, 1 - elapsed * 1.5);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!isExploding) {
          // Magnetic pull towards the 3D 'AS' letter points
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          const dz = p.tz - p.z;

          const spring = 0.09 + (1 - swirlFactor) * 0.04;
          const damping = 0.81;

          p.vx += dx * spring;
          p.vy += dy * spring;
          p.vz += dz * spring;

          // Add swirl tangential force during entrance
          if (swirlFactor > 0.01) {
            const curDist = Math.hypot(p.x, p.y) || 1;
            const tangentialSpeed = swirlFactor * 12;
            p.vx += (-p.y / curDist) * tangentialSpeed;
            p.vy += (p.x / curDist) * tangentialSpeed;
          }

          // Interactive mouse repulsion
          if (mouse.isHovering) {
            const screenDx = p.x + centerX - mouse.x;
            const screenDy = p.y + centerY - mouse.y;
            const screenDist = Math.hypot(screenDx, screenDy);
            if (screenDist < 120) {
              const force = (120 - screenDist) * 0.22;
              p.vx += (screenDx / screenDist) * force;
              p.vy += (screenDy / screenDist) * force;
            }
          }

          p.vx *= damping;
          p.vy *= damping;
          p.vz *= damping;

          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
        } else {
          // Warp explosion outwards
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          p.alpha *= 0.93;
        }

        // Apply 3D camera rotation
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Perspective projection
        const scale = cameraZ / (cameraZ + z2);
        if (scale > 0) {
          const px = centerX + x1 * scale;
          const py = centerY + y2 * scale;
          const size = Math.max(0.5, p.baseSize * scale);
          const alpha = Math.min(1, Math.max(0.1, p.alpha * scale));

          projectedList.push({ px, py, size, alpha, color: p.color, z: z2 });
        }
      }

      // Sort by Z for realistic depth
      projectedList.sort((a, b) => b.z - a.z);

      // Draw connective electric filaments in glowing purple
      const maxDist = 28;
      for (let i = 0; i < projectedList.length; i += 2) {
        const p1 = projectedList[i];
        for (let j = i + 1; j < Math.min(i + 6, projectedList.length); j++) {
          const p2 = projectedList[j];
          const d = Math.hypot(p1.px - p2.px, p1.py - p2.py);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(192, 132, 252, ${0.45 * (1 - d / maxDist)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Render glowing 3D Dots
      for (let i = 0; i < projectedList.length; i++) {
        const p = projectedList[i];
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        if (p.color === '#c084fc' || p.color === '#a855f7' || p.color === '#e879f9' || p.color === '#ffffff') {
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(168, 85, 247, 0.9)';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // Render strike shockwave ring if struck
      if (strikeWave) {
        strikeWave.progress += 0.045;
        const radius = strikeWave.progress * 420;
        const opacity = Math.max(0, 1 - strikeWave.progress);
        ctx.beginPath();
        ctx.arc(strikeWave.x, strikeWave.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232, 121, 249, ${opacity * 0.9})`;
        ctx.lineWidth = 4 * opacity;
        ctx.shadowBlur = 16;
        ctx.shadowColor = '#e879f9';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Camera Warp Zoom during explosion
      if (isExploding) {
        cameraZ += 32;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    // Trigger strike explosion
    const triggerExplode = (strikeX = centerX, strikeY = centerY) => {
      if (isExploding) return;
      isExploding = true;
      sound.playSuccess();

      // Initiate expanding shockwave ring from the strike point
      strikeWave = { x: strikeX, y: strikeY, progress: 0 };

      // Convert strike point to relative centered coordinates
      const impactX = strikeX - centerX;
      const impactY = strikeY - centerY;

      // Blast particles violently away from the strike impact point
      particles.forEach((p) => {
        const dx = p.x - impactX;
        const dy = p.y - impactY;
        const dist = Math.hypot(dx, dy) || 1;
        const angle = Math.atan2(dy, dx);
        const impulse = Math.random() * 32 + 24 + (180 / Math.max(20, dist)) * 14;
        p.vx = Math.cos(angle) * impulse;
        p.vy = Math.sin(angle) * impulse;
        p.vz = (Math.random() - 0.5) * 55;
      });

      // Complete transition after explosion plays out
      setTimeout(() => {
        onComplete();
      }, 750);
    };

    triggerRef.current = triggerExplode;

    // Strike Event Listeners:

    // 1. Mouse move with velocity / strike slash detection
    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - prevMouseTime);
      const dist = Math.hypot(e.clientX - prevMouseX, e.clientY - prevMouseY);
      const speed = dist / dt; // px/ms

      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.targetX = (e.clientX - centerX) / (width * 0.5);
      mouse.targetY = (e.clientY - centerY) / (height * 0.5);
      mouse.isHovering = true;

      // If user slashes/strikes across the AS monogram area
      const nearCenter = Math.hypot(e.clientX - centerX, e.clientY - centerY) < Math.min(width, height) * 0.38;
      const elapsed = (now - startTime) / 1000;
      if ((speed > 1.2 || isMouseDown) && nearCenter && elapsed > 0.4) {
        triggerExplode(e.clientX, e.clientY);
      }

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      prevMouseTime = now;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 2. Mouse click / strike
    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      triggerExplode(e.clientX, e.clientY);
    };
    const onMouseUp = () => {
      isMouseDown = false;
    };
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // 3. Touch strike / swipe
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        triggerExplode(touch.clientX, touch.clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const nearCenter = Math.hypot(touch.clientX - centerX, touch.clientY - centerY) < Math.min(width, height) * 0.38;
        if (nearCenter) {
          triggerExplode(touch.clientX, touch.clientY);
        }
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // 4. Keyboard key strike (Space, Enter, or any key)
    const onKeyDown = () => {
      triggerExplode(centerX, centerY);
    };
    window.addEventListener('keydown', onKeyDown);

    // 5. Wheel scroll strike
    const onWheel = () => {
      triggerExplode(centerX, centerY);
    };
    window.addEventListener('wheel', onWheel, { passive: true });

    // Generous fallback timer (30s) so it doesn't prematurely trigger before user strikes it
    const idleFallbackTimer = setTimeout(() => {
      triggerExplode(centerX, centerY);
    }, 30000);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(idleFallbackTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('wheel', onWheel);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#0a0915] select-none overflow-hidden cursor-crosshair"
      onClick={(e) => triggerRef.current?.(e.clientX, e.clientY)}
      title="Strike or click anywhere to enter portfolio"
    >
      {/* 3D Canvas Viewport: Glowing Purple 'AS' Monogram */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Sleek bottom strike prompt */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center gap-2">
        <p className="text-xs font-mono tracking-[0.35em] uppercase text-purple-300/90 animate-pulse drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
          Strike or Click to Enter
        </p>
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500/70">
          [ Strike across, click, or press any key ]
        </p>
      </div>
    </motion.div>
  );
};
