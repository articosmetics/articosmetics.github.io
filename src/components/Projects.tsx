import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { portfolioConfig } from '../portfolio.config';
import type { SoftwareProject } from '../types/portfolio';

// GitHub SVG Icon
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectCard: React.FC<{ project: SoftwareProject; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={cardRef}
      data-glow="true"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col justify-between rounded-2xl p-6 md:p-8 transition-all duration-300 custom-card"
      style={{
        backgroundColor: 'rgba(14, 16, 23, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(168, 85, 247, 0.18)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
      }}
    >
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-[#00d2ff]">
            {project.category}
          </span>
          {project.badge && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-purple-500/25 bg-purple-500/10 text-[#c084fc]">
              {project.badge}
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1.5 group-hover:text-[#00d2ff] transition-colors">
          {project.title}
        </h3>
        <p className="text-xs font-semibold text-[#8b5cf6] mb-3">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#a6abbf] mb-5">
          {project.description}
        </p>

        {/* Technical Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-1.5 mb-6">
            {project.highlights.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#a6abbf]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00d2ff] mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-[#8888a0] border border-white/[0.06]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub Repository Link Button */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.08] hover:border-cyan-500/40 cursor-pointer group/link"
        >
          <div className="flex items-center gap-2">
            <GithubIcon className="w-4 h-4 text-[#00d2ff]" />
            <span>articosmetics / {project.title.toLowerCase().replace(/['\s]+/g, '-')}</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-[#8888a0] group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const softwareProjects = portfolioConfig.softwareProjects || [];

  return (
    <section id="software" className="py-24 px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8b5cf6]">
              Open Source &amp; Custom Software
            </span>
          </motion.div>

          <motion.h2
            ref={headerRef}
            initial={{ opacity: 0, y: 25 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white"
          >
            Mods &amp; Core Plugins
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base max-w-2xl text-[#a6abbf] leading-relaxed"
          >
            A history of production-grade Minecraft modifications, bytecode mixin patches, Paper/Folia plugins, and performance utilities authored by Wnderin.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {softwareProjects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
