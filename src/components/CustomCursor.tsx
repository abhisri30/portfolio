import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], .cursor-pointer, [data-magnetic="true"]');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer fluid aura ring in glowing electric violet */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-purple-400/40 bg-purple-500/[0.06] backdrop-blur-[1px] pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 56 : isClicked ? 24 : 34,
          height: isHovered ? 56 : isClicked ? 24 : 34,
          borderColor: isHovered ? 'rgba(192, 132, 252, 0.9)' : 'rgba(168, 85, 247, 0.45)',
          backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.16)' : 'rgba(168, 85, 247, 0.05)',
          boxShadow: isHovered
            ? '0 0 25px rgba(168, 85, 247, 0.45)'
            : '0 0 12px rgba(168, 85, 247, 0.2)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Inner sharp precision dot - crystal white with radiant neon purple core */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff,0_0_16px_rgba(192,132,252,0.95)] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.6 : isHovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450 }}
      />
    </div>
  );
};
