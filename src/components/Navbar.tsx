import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { portfolioConfig } from '../portfolio.config';

interface NavbarProps {
  onPrivacyOpen: () => void;
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Software', href: '#software' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onPrivacyOpen }) => {
  const [activeSection, setActiveSection] = useState<string>('#about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['#contact', '#skills', '#software', '#experience', '#about'];
      for (const sectionId of sections) {
        const el = document.querySelector(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className="pointer-events-auto flex items-center justify-between w-full max-w-4xl px-4 py-2.5 rounded-2xl transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'rgba(7, 8, 12, 0.88)' : 'rgba(7, 8, 12, 0.68)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          boxShadow: isScrolled
            ? '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 210, 255, 0.1)'
            : '0 8px 25px -10px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer text-sm font-black tracking-[0.18em] uppercase transition-colors duration-200 hover:text-[#00d2ff] px-2 py-1"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {portfolioConfig.hero.name}
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="cursor-pointer relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-200"
                style={{
                  color: isActive ? '#00d2ff' : 'var(--color-text-secondary)',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ backgroundColor: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.25)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Mobile Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo('#contact')}
            className="cursor-pointer hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 btn-primary-gradient text-white shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            Get in Touch
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="cursor-pointer md:hidden p-2 rounded-xl transition-colors duration-200 hover:bg-white/5"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="pointer-events-auto fixed top-20 left-4 right-4 z-40 rounded-2xl p-4 shadow-2xl"
            style={{
              backgroundColor: 'rgba(14, 16, 23, 0.96)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.8), 0 0 20px rgba(0, 210, 255, 0.1)',
            }}
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => {
                      scrollTo(item.href);
                      setMobileMenuOpen(false);
                    }}
                    className="cursor-pointer flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 hover:bg-white/5 text-left"
                    style={{
                      color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    }}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#2b7fff' }} />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                onClick={() => {
                  scrollTo('#contact');
                  setMobileMenuOpen(false);
                }}
                className="cursor-pointer flex items-center justify-center w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest btn-primary-gradient text-white"
              >
                Get in Touch
              </button>
            </div>

            <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPrivacyOpen();
                }}
                className="cursor-pointer w-full text-center py-2 text-xs font-medium transition-colors duration-200 hover:text-white"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Privacy Policy
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
