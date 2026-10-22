import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { portfolioConfig } from '../portfolio.config';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const policy = portfolioConfig.privacyPolicy;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen relative"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Subtle top ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(0, 210, 255, 0.08) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onClick={onBack}
          className="cursor-pointer flex items-center gap-2 mb-12 text-sm font-medium transition-colors duration-200 group text-[#a6abbf] hover:text-[#00d2ff]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to portfolio</span>
        </motion.button>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-[#00d2ff]">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-[#f4f4f8]">
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Last updated: {policy.lastUpdated}
          </p>
        </motion.div>

        {/* Divider line */}
        <div
          className="mb-14"
          style={{ height: '1px', background: 'var(--color-border)' }}
        />

        {/* Policy Sections */}
        <div className="flex flex-col gap-12">
          {policy.sections.map((section, idx) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + idx * 0.04 }}
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span
                  className="text-xs font-bold tabular-nums text-[#2b7fff]"
                  style={{ minWidth: '1.5rem' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h2 className="text-lg font-bold tracking-tight text-[#f0f0f5]">
                  {section.title}
                </h2>
              </div>

              {section.content && (
                <p
                  className="text-sm leading-relaxed pl-10"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {section.content}
                </p>
              )}

              {section.bullets && (
                <ul className="flex flex-col gap-3 pl-10 mt-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.label} className="text-sm leading-relaxed">
                      <span className="font-semibold text-[#f0f0f5]">
                        {bullet.label}
                      </span>
                      <span style={{ color: 'var(--color-text-secondary)' }}>
                        {' '}- {bullet.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 pt-8"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {policy.notice}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
