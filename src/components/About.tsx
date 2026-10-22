import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Shield, BookOpen, Terminal, Sparkles } from 'lucide-react';
import { portfolioConfig } from '../portfolio.config';
import type { AboutCategory } from '../types/portfolio';

const iconMap: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="w-4 h-4" />,
  MapPin: <MapPin className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  Terminal: <Terminal className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
};

interface CategoryCardProps {
  section: AboutCategory;
  delay: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ section, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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
        {section.category}
      </h3>
      <ul className="space-y-1">
        {section.items.map((item, idx) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: delay + idx * 0.05 }}
            className="group flex items-start gap-3 py-2.5 cursor-default"
          >
            {/* Animated accent tick line */}
            <div
              className="w-0 group-hover:w-4 h-px mt-3 transition-all duration-300 flex-shrink-0"
              style={{ backgroundColor: '#00d2ff' }}
            />
            <div>
              <div className="flex items-center gap-2">
                {item.iconName && iconMap[item.iconName] && (
                  <span className="text-[#a6abbf] group-hover:text-[#00d2ff] transition-colors">
                    {iconMap[item.iconName]}
                  </span>
                )}
                <span
                  className="text-base md:text-lg font-medium transition-colors duration-200 text-[#a6abbf] group-hover:text-[#f4f4f8]"
                >
                  {item.label}
                </span>
              </div>
              {item.value && (
                <p
                  className="text-xs md:text-sm mt-0.5"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {item.value}
                </p>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export const About: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {portfolioConfig.about.map((category, idx) => (
            <CategoryCard key={category.category} section={category} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};
