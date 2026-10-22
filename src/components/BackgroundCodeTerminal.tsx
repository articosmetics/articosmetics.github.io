import React, { useCallback, useEffect, useRef } from 'react';
import { portfolioConfig } from '../portfolio.config';

interface FlatChar {
  char: string;
  cls: string;
}

export const BackgroundCodeTerminal: React.FC = () => {
  const textSpanRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const renderedLengthRef = useRef<number>(-1);
  const scrollRatioRef = useRef<number>(0);
  const smoothedScrollRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const autoTypeCountRef = useRef<number>(0);
  const initialDoneRef = useRef<boolean>(false);
  const startTimeRef = useRef<number | null>(null);

  // Flatten code tokens into characters
  const flatCharsRef = useRef<FlatChar[]>([]);
  if (flatCharsRef.current.length === 0) {
    const chars: FlatChar[] = [];
    portfolioConfig.backgroundCode.forEach((line) => {
      if (line.length === 0) {
        chars.push({ char: '\n', cls: 'pl' });
        return;
      }
      line.forEach((token) => {
        for (const ch of token.text) {
          chars.push({ char: ch, cls: token.cls });
        }
      });
      chars.push({ char: '\n', cls: 'pl' });
    });
    flatCharsRef.current = chars;
  }

  const flatChars = flatCharsRef.current;

  // Find next newline after initial 30% of code for smooth entry
  const getInitialCutoff = () => {
    const target = Math.floor(flatChars.length * 0.3);
    for (let i = target; i < flatChars.length; i++) {
      if (flatChars[i].char === '\n') return i + 1;
    }
    return target;
  };
  const initialTargetRef = useRef(getInitialCutoff());

  const renderSubstringHtml = (count: number) => {
    let html = '';
    const limit = Math.min(count, flatChars.length);
    for (let i = 0; i < limit; i++) {
      const item = flatChars[i];
      if (item.char === '\n') {
        html += '\n';
      } else if (item.char === ' ') {
        html += ' ';
      } else {
        html += `<span class="code-${item.cls}">${item.char}</span>`;
      }
    }
    return html;
  };

  // Track window scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      scrollRatioRef.current = totalScrollable > 0 ? Math.min(Math.max(window.scrollY / totalScrollable, 0), 1) : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation frame loop for typing and scroll synchronization
  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    let targetChars: number;

    if (!initialDoneRef.current) {
      if (elapsed < 200) {
        targetChars = 0;
      } else {
        autoTypeCountRef.current = Math.min(autoTypeCountRef.current + 0.6, initialTargetRef.current);
        if (autoTypeCountRef.current >= initialTargetRef.current) {
          initialDoneRef.current = true;
        }
        targetChars = Math.floor(autoTypeCountRef.current);
      }
    } else {
      smoothedScrollRef.current += (scrollRatioRef.current - smoothedScrollRef.current) * 0.08;
      const remaining = flatChars.length - initialTargetRef.current;
      targetChars = initialTargetRef.current + Math.floor(smoothedScrollRef.current * remaining);
    }

    if (targetChars !== renderedLengthRef.current && textSpanRef.current) {
      renderedLengthRef.current = targetChars;
      textSpanRef.current.innerHTML = renderSubstringHtml(targetChars);
    }

    if (cursorRef.current) {
      cursorRef.current.style.opacity = Math.floor(timestamp / 450) % 2 === 0 ? '1' : '0';
    }

    rafIdRef.current = requestAnimationFrame(animate);
  }, [flatChars]);

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [animate]);

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Blurred background code terminal */}
      <div className="code-terminal">
        <pre className="code-text">
          <span ref={textSpanRef} />
          <span className="code-cursor" ref={cursorRef} />
        </pre>
      </div>

      {/* SVG noise grain filter */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
        style={{ pointerEvents: 'none' }}
      >
        <filter id="noise-desktop">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-desktop)" />
      </svg>

      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(7,8,12,0.4) 45%, rgba(7,8,12,0.92) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
