import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioConfig } from '../portfolio.config';

interface CounterProps {
  value: number;
  suffix?: string;
}

const CountUpNumber: React.FC<CounterProps> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [current, setCurrent] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const duration = 900;
    const start = performance.now();

    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  );
};

export const StatsAvailability: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {portfolioConfig.stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ backgroundColor: 'var(--color-surface)', translateY: -2 }}
                transition={{ duration: 0.25 }}
                className="text-center py-8 px-6 rounded-2xl cursor-default border border-white/[0.04] hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(0,210,255,0.08)] transition-all"
                style={{ backgroundColor: 'rgba(14, 16, 23, 0.4)' }}
              >
                <div className="text-4xl md:text-6xl font-black tracking-tight mb-2 text-[#f4f4f8]">
                  {stat.value !== null ? (
                    <CountUpNumber value={stat.value} suffix={stat.suffix} />
                  ) : (
                    stat.display
                  )}
                </div>
                <div
                  className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a6abbf]"
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Availability Status Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 py-4">
            {portfolioConfig.availability.map((item, idx) => (
              <div key={item.type} className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  {item.pulse && (
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: item.color }}
                  />
                </span>
                <span className="text-sm font-medium" style={{ color: item.color }}>
                  {item.type}
                </span>
                {idx < portfolioConfig.availability.length - 1 && (
                  <span
                    className="ml-3 text-sm select-none"
                    style={{ color: 'var(--color-border-hover)' }}
                  >
                    /
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
