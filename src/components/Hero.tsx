import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioConfig } from '../portfolio.config';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState<string>('');
  const [isBlinking, setIsBlinking] = useState<boolean>(true);
  const fullName = portfolioConfig.hero.name;

  useEffect(() => {
    let charIndex = 0;
    let typeInterval: ReturnType<typeof setInterval>;
    let blinkTimeout: ReturnType<typeof setTimeout>;

    const initialDelay = setTimeout(() => {
      typeInterval = setInterval(() => {
        charIndex++;
        setDisplayText(fullName.slice(0, charIndex));
        if (charIndex >= fullName.length) {
          clearInterval(typeInterval);
          blinkTimeout = setTimeout(() => setIsBlinking(false), 2400);
        }
      }, 120);
    }, 500);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(typeInterval);
      clearTimeout(blinkTimeout);
    };
  }, [fullName]);

  const handleGetInTouch = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 relative pt-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Availability / Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
              {portfolioConfig.hero.tagline}
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-semibold">
            Netherlands • Game Server Specialist
          </span>
        </motion.div>

        {/* Scaled & Balanced Typewriter Headline */}
        <h1 className="text-[clamp(2.75rem,7.5vw,5.75rem)] font-black leading-[0.95] tracking-[-0.03em] mb-6 select-none">
          {displayText}
          <motion.span
            className="inline-block font-light ml-1 text-[#00d2ff]"
            animate={isBlinking ? { opacity: [1, 1, 0, 0] } : { opacity: 0 }}
            transition={
              isBlinking
                ? { duration: 0.9, repeat: Infinity, times: [0, 0.45, 0.5, 1] }
                : { duration: 0.3 }
            }
          >
            |
          </motion.span>
        </h1>

        {/* Subhead / Role description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[clamp(1.05rem,1.8vw,1.4rem)] font-normal leading-relaxed mb-10 max-w-2xl"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {portfolioConfig.hero.roleDescription}
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
        >
          <motion.a
            href={portfolioConfig.hero.primaryCta.href}
            onClick={handleGetInTouch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary-gradient group inline-flex items-center justify-center gap-3 px-8 py-3.5 text-white font-bold text-sm tracking-wide rounded-xl cursor-pointer"
          >
            <span>{portfolioConfig.hero.primaryCta.text}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>

          <motion.a
            href={portfolioConfig.hero.secondaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 font-semibold text-sm rounded-xl transition-all duration-300 hover:bg-white/5 cursor-pointer"
            style={{
              border: '1px solid rgba(168, 85, 247, 0.25)',
              color: 'var(--color-text-primary)',
            }}
          >
            <GithubIcon className="w-4 h-4" />
            <span>{portfolioConfig.hero.secondaryCta.text}</span>
          </motion.a>
        </motion.div>

        {/* Engineering Specialty Highlights Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center gap-6 text-xs font-mono text-[#a6abbf]"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
            <span>Folia & Paper Architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
            <span>Plugin & Economy Balancing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
            <span>Senior Staff & Community Leadership</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
