import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioConfig } from '../portfolio.config';
import type { TechCategory } from '../types/portfolio';

const TechCard: React.FC<{ category: TechCategory; delay: number }> = ({ category, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <h3
        className="text-xs uppercase tracking-[0.2em] font-semibold mb-6"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {category.name}
      </h3>
      <ul className="space-y-0">
        {category.items.map((item, idx) => (
          <motion.li
            key={item}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: delay + idx * 0.05 }}
            className="group flex items-center gap-3 py-2.5 cursor-default transition-colors duration-200"
          >
            {/* Animated accent tick */}
            <div
              className="w-0 group-hover:w-4 h-px transition-all duration-300 flex-shrink-0"
              style={{ backgroundColor: '#8b5cf6' }}
            />
            <span
              className="text-base md:text-lg font-medium transition-colors duration-200 text-[#a6abbf] group-hover:text-[#f4f4f8]"
            >
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export const Technologies: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12"
        >
          Technologies
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          {portfolioConfig.technologies.map((cat, idx) => (
            <TechCard key={cat.name} category={cat} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};
