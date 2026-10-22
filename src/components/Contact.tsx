import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { portfolioConfig } from '../portfolio.config';

// GitHub SVG Icon
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Discord SVG Icon
const DiscordIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = 'w-4 h-4',
  style,
}) => (
  <svg className={className} style={style} viewBox="0 0 640 512" fill="currentColor">
    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
  </svg>
);

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-120px' });

  const contact = portfolioConfig.contact;

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(contact.discordUsername);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 relative py-28"
    >
      <div className="max-w-3xl w-full text-center relative z-10">
        {/* Preferred Contact Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,210,255,0.15)]"
        >
          <DiscordIcon className="w-4 h-4 text-[#00d2ff]" />
          <span className="text-sm font-semibold text-[#00d2ff]">
            {contact.badge}
          </span>
        </motion.div>

        {/* Heading: Title scaled down and 'work' highlighted in signature accent */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6"
        >
          Let's{' '}
          <span className="bg-gradient-to-r from-[#00d2ff] via-[#c084fc] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,210,255,0.45)]">
            work
          </span>
          <br />
          together.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg max-w-md mx-auto mb-12 leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {contact.subheading}
        </motion.p>

        {/* Interactive Discord Tag Copy Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center mb-10"
        >
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: '0 0 35px rgba(0, 210, 255, 0.25)' }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              boxShadow: '0 0 25px rgba(0, 210, 255, 0.08)',
            }}
          >
            <span
              className="inline-flex items-center gap-3 font-mono text-base md:text-lg font-medium px-6 py-3.5 select-all"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <DiscordIcon className="w-5 h-5 text-[#00d2ff]" />
              {contact.discordUsername}
            </span>

            <span className="w-px h-8 flex-shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

            <button
              onClick={handleCopyDiscord}
              className="cursor-pointer inline-flex items-center justify-center gap-2 min-w-[120px] px-6 py-3.5 font-semibold text-sm transition-colors duration-200 hover:bg-white/5"
              style={{
                color: copied ? 'var(--color-available)' : 'var(--color-text-primary)',
              }}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href={contact.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary-gradient group inline-flex items-center justify-center gap-3 px-8 py-3.5 font-bold text-sm tracking-wide rounded-xl cursor-pointer"
          >
            <DiscordIcon className="w-5 h-5 text-white" />
            <span>Open Discord</span>
            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          <motion.a
            href={contact.githubUrl}
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
            <GithubIcon className="w-5 h-5" />
            <span>GitHub</span>
          </motion.a>
        </motion.div>

        {/* Discord ID Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-xs mt-14 font-medium"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Discord ID: {contact.discordId}
        </motion.p>
      </div>
    </section>
  );
};
