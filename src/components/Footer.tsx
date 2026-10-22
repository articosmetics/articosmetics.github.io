import React from 'react';
import { portfolioConfig } from '../portfolio.config';

interface FooterProps {
  onPrivacyOpen: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPrivacyOpen }) => {
  return (
    <footer className="relative z-10 py-12 text-center">
      <button
        onClick={onPrivacyOpen}
        className="cursor-pointer text-xs font-medium transition-colors duration-200 hover:text-white"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Privacy Policy
      </button>
      <p className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
        © {new Date().getFullYear()} {portfolioConfig.hero.name} &bull; Minecraft Systems &amp; Server Engineering
      </p>
    </footer>
  );
};
