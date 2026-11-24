import React, { useEffect, useRef } from 'react';
import type { LabSettings } from '../types';

interface BackgroundCanvasProps {
  settings: LabSettings;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  hueOffset: number;
}

const PALETTES = {
  cyber: {
    primary: '234, 88, 12',     // Mild Warm Orange #EA580C
    secondary: '249, 115, 22',  // Tangerine #F97316
    accent: '24, 24, 27',       // Jet Black #18181B
    glow1: 'rgba(234, 88, 12, 0.08)',
    glow2: 'rgba(249, 115, 22, 0.06)',
  },
  ultraviolet: {
    primary: '24, 24, 27',      // Jet Black #18181B
    secondary: '113, 113, 122', // Charcoal Grey #71717A
    accent: '234, 88, 12',      // Mild Orange
    glow1: 'rgba(24, 24, 27, 0.06)',
    glow2: 'rgba(234, 88, 12, 0.05)',
  },
  solar: {
    primary: '245, 158, 11',    // Amber #F59E0B
    secondary: '234, 88, 12',   // Mild Orange #EA580C
    accent: '217, 119, 6',      // Gold Amber #D97706
    glow1: 'rgba(245, 158, 11, 0.08)',
    glow2: 'rgba(234, 88, 12, 0.06)',
  },
  emerald: {
    primary: '16, 185, 129',    // Emerald
    secondary: '24, 24, 27',    // Jet Black
    accent: '234, 88, 12',      // Mild Orange
    glow1: 'rgba(16, 185, 129, 0.07)',
    glow2: 'rgba(234, 88, 12, 0.05)',
  }
};

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; radius: number }>({ x: -1000, y: -1000, radius: 170 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const initParticles = () => {
      const count = settings.particleCount;
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const baseRadius = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * settings.speed,
          vy: (Math.random() - 0.5) * settings.speed,
          radius: baseRadius,
          baseRadius,
          alpha: Math.random() * 0.4 + 0.2,
          hueOffset: Math.random(),
        });
      }
      particlesRef.current = particles;
    };

    initParticles();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const palette = PALETTES[settings.palette] || PALETTES.cyber;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft ambient light radial gradients
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.2, 80, width * 0.2, height * 0.2, 600);
      grad1.addColorStop(0, palette.glow1);
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 100, width * 0.8, height * 0.7, 700);
      grad2.addColorStop(0, palette.glow2);
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const connectionDist = settings.connectionDistance;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 3;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force;
          p.y -= Math.sin(angle) * force;
          p.radius = p.baseRadius * 1.8;
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.08;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const color = p.hueOffset > 0.5 ? palette.primary : palette.secondary;
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist2 < connectionDist) {
            const alpha = (1 - dist2 / connectionDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${palette.primary}, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [settings]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: 0.9 }}
    />
  );
};
