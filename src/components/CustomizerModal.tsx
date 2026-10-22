import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Sparkles, Server, Shield, Code2 } from 'lucide-react';
import { portfolioConfig } from '../portfolio.config';

export const CustomizerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-2xl transition-all duration-200"
          style={{
            backgroundColor: 'rgba(14, 16, 23, 0.92)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 210, 255, 0.3)',
            color: 'var(--color-text-primary)',
            boxShadow: '0 0 20px rgba(0, 210, 255, 0.25), 0 0 40px rgba(139, 92, 246, 0.15)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00d2ff]" />
          <span>Inspo taken from bytez.wtf</span>
        </motion.button>
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-8"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1a1a24]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Design Inspiration & Credits</h3>
                    <p className="text-xs text-[#8888a0]">
                      Rebuilt and custom-tailored for {portfolioConfig.hero.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-[#8888a0] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Attribution Content */}
              <div className="space-y-4 text-sm text-[#8888a0]">
                <div className="p-4 rounded-2xl bg-[#111118] border border-[#1a1a24]">
                  <p className="text-xs leading-relaxed text-[#c0c0d8]">
                    This portfolio draws UI aesthetic and motion inspiration from{' '}
                    <a
                      href="https://bytez.wtf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#38bdf8] font-semibold underline underline-offset-2 hover:text-cyan-300 inline-flex items-center gap-1"
                    >
                      bytez.wtf
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    . It has been rebuilt from scratch and personalized with custom Minecraft systems engineering branding, unique project artwork, server history, and bespoke styling.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#111118] border border-[#1a1a24] text-center">
                    <Server className="w-4 h-4 mx-auto mb-2 text-cyan-400" />
                    <p className="text-xs font-semibold text-white">25+ Networks</p>
                    <p className="text-[11px] text-[#8888a0]">Staffed & Developed</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#111118] border border-[#1a1a24] text-center">
                    <Shield className="w-4 h-4 mx-auto mb-2 text-indigo-400" />
                    <p className="text-xs font-semibold text-white">Community Lead</p>
                    <p className="text-[11px] text-[#8888a0]">Senior Admin & Owner</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#111118] border border-[#1a1a24] text-center">
                    <Code2 className="w-4 h-4 mx-auto mb-2 text-emerald-400" />
                    <p className="text-xs font-semibold text-white">Java & Folia</p>
                    <p className="text-[11px] text-[#8888a0]">Game Server Engine</p>
                  </div>
                </div>
              </div>

              {/* Bottom Close Button */}
              <div className="mt-6 pt-4 border-t border-[#1a1a24] flex items-center justify-between gap-3">
                <a
                  href="https://bytez.wtf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-[#1a1a24] hover:bg-white/5 text-[#8888a0] hover:text-white transition-colors"
                >
                  <span>Visit original site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider chrome-btn text-black shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
