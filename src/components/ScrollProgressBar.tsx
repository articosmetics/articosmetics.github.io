import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth out scroll progress updates
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] pointer-events-none"
      style={{ zIndex: 100 }}
      aria-hidden="true"
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-white/[0.04]" />

      {/* Animated themed gradient fill */}
      <motion.div
        className="h-full w-full origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #00d2ff 0%, #8b5cf6 50%, #ec4899 100%)',
          boxShadow: '0 0 14px rgba(0, 210, 255, 0.65), 0 0 28px rgba(139, 92, 246, 0.45)',
        }}
      />
    </div>
  );
};
