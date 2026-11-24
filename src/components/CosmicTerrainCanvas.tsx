import React, { useEffect, useRef } from 'react';

export const CosmicTerrainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 180;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.015;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Multiple undulating rows of neon purple dots forming the terrain
      const rows = 12;
      const cols = Math.floor(width / 16);

      for (let r = 0; r < rows; r++) {
        const depth = r / rows; // 0 (back) to 1 (front)
        const baseY = height * 0.45 + depth * height * 0.55;
        const dotAlpha = 0.15 + depth * 0.65;
        const dotSize = 0.8 + depth * 1.6;

        ctx.fillStyle = `rgba(192, 132, 252, ${dotAlpha})`;

        for (let c = 0; c <= cols; c++) {
          const x = (c / cols) * width;
          // Complex undulating wave function
          const wave1 = Math.sin(c * 0.08 + time + r * 0.4) * (14 + depth * 20);
          const wave2 = Math.cos(c * 0.04 - time * 0.7 + r * 0.2) * (10 + depth * 15);
          const wave3 = Math.sin((x / width) * Math.PI * 2 + time * 0.5) * 8;
          const y = baseY + wave1 + wave2 + wave3;

          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Add a soft bottom purple ambient haze gradient
      const haze = ctx.createLinearGradient(0, height * 0.3, 0, height);
      haze.addColorStop(0, 'rgba(10, 9, 21, 0)');
      haze.addColorStop(0.7, 'rgba(168, 85, 247, 0.08)');
      haze.addColorStop(1, 'rgba(147, 51, 234, 0.22)');
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-44 pointer-events-none overflow-hidden z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
