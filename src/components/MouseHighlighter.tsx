import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const MouseHighlighter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  // Smooth spring physics for circle follower
  const cursorX = useSpring(-100, { stiffness: 450, damping: 32 });
  const cursorY = useSpring(-100, { stiffness: 450, damping: 32 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Global cursor coordinates for CSS radial glow
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Card-specific relative coordinates for interactive dynamic lighting
      const target = (e.target as HTMLElement)?.closest(
        '[data-glow="true"], .project-card, .tech-card, .stat-card, .custom-card'
      ) as HTMLElement | null;

      if (target) {
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty('--card-x', `${x}px`);
        target.style.setProperty('--card-y', `${y}px`);
      }

      // Check if hovering clickable interactive elements
      const isClickable = Boolean(
        (e.target as HTMLElement)?.closest('a, button, input, [role="button"], .cursor-pointer')
      );
      setIsHoveringClickable(isClickable);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      {/* 1. Global Ambient Radial Spotlight */}
      <div
        className="fixed inset-0 pointer-events-none select-none transition-opacity duration-300"
        style={{
          zIndex: 1,
          opacity: isVisible ? 1 : 0,
          background:
            'radial-gradient(750px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(0, 210, 255, 0.055), rgba(139, 92, 246, 0.035), transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* 2. Sleek Circular Mouse Highlighter Ring / Cursor Follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none select-none rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHoveringClickable ? 48 : 34,
          height: isHoveringClickable ? 48 : 34,
          borderColor: isHoveringClickable ? 'rgba(0, 210, 255, 0.85)' : 'rgba(139, 92, 246, 0.55)',
          backgroundColor: isHoveringClickable ? 'rgba(0, 210, 255, 0.08)' : 'rgba(139, 92, 246, 0.04)',
          boxShadow: isHoveringClickable
            ? '0 0 20px rgba(0, 210, 255, 0.45), inset 0 0 12px rgba(0, 210, 255, 0.25)'
            : '0 0 14px rgba(139, 92, 246, 0.35)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        aria-hidden="true"
      >
        {/* Subtle center highlighter pip */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200"
          style={{
            width: isHoveringClickable ? '6px' : '4px',
            height: isHoveringClickable ? '6px' : '4px',
            backgroundColor: isHoveringClickable ? '#00d2ff' : '#c084fc',
            boxShadow: isHoveringClickable ? '0 0 8px #00d2ff' : '0 0 6px #c084fc',
          }}
        />
      </motion.div>
    </>
  );
};
