import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Copy, Check, ExternalLink, Globe, CheckCircle2, Terminal } from 'lucide-react';
import { portfolioConfig } from '../portfolio.config';
import type { ProjectItem } from '../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

// Custom Discord SVG Icon
const DiscordIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 640 512" fill="currentColor">
    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
  </svg>
);

// Copy Server IP Button
const ServerIpButton: React.FC<{ ip: string }> = ({ ip }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/5 active:scale-95"
      style={{
        border: '1px solid var(--color-border)',
        color: copied ? 'var(--color-available)' : 'var(--color-text-primary)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      <span>{copied ? 'Copied!' : ip}</span>
    </button>
  );
};

// Desktop Single Project Slide
const DesktopProjectSlide: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const displayDate = project.startDate && project.startDate !== project.endDate
    ? `${project.startDate} — ${project.endDate}`
    : project.endDate;

  return (
    <div className="flex items-center project-slide min-h-screen py-16">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ margin: '-15%' }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Header: Image & Title */}
        <div className="flex items-center gap-6 mb-8">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
              style={{
                border: '1px solid var(--color-border)',
                boxShadow: '0 0 24px rgba(43, 127, 255, 0.15)',
              }}
            />
          ) : (
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[#111118] border border-cyan-500/25 shadow-[0_0_24px_rgba(6,182,212,0.15)] text-cyan-400"
            >
              <Terminal className="w-9 h-9" />
            </div>
          )}
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-none mb-2">
              {project.title}
            </h3>
            <p className="text-sm md:text-base font-bold text-[#00d2ff]">{project.role}</p>
          </div>
        </div>

        {/* Date and Status */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            {displayDate}
          </span>
          {project.ongoing && (
            <span
              className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                color: '#22c55e',
                border: '1px solid rgba(34, 197, 94, 0.25)',
              }}
            >
              Active
            </span>
          )}
        </div>


        {/* Description */}
        <p
          className="text-lg leading-relaxed mb-8 max-w-2xl"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {project.description}
        </p>

        {/* Problems Solved */}
        {project.problems && project.problems.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
              <span
                className="text-xs uppercase tracking-[0.15em] font-semibold"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Key Achievements & Highlights
              </span>
            </div>
            <ul className="space-y-2">
              {project.problems.map((prob, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#2b7fff' }}
                  />
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {project.ip && <ServerIpButton ip={project.ip} />}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/5 cursor-pointer"
              style={{
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <DiscordIcon className="w-4 h-4" />
              <span>{project.discordLabel || 'Discord'}</span>
            </a>
          )}

          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/5 cursor-pointer"
              style={{
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <Globe className="w-4 h-4" />
              <span>Website</span>
            </a>
          )}

          {project.pricingLink && (
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 chrome-btn text-black cursor-pointer hover:shadow-lg"
            >
              <span>Get in Touch</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Mobile Project Card
const MobileProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      className="py-10 border-b"
      style={{ borderColor: 'var(--color-border)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: '-10%' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center gap-4 mb-4">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-12 h-12 rounded-xl object-cover"
            style={{ border: '1px solid var(--color-border)' }}
          />
        ) : (
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#111118] border border-cyan-500/25 text-cyan-400">
            <Terminal className="w-5 h-5" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-xs font-semibold text-[#38bdf8]">{project.role}</p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {project.startDate && project.startDate !== project.endDate
              ? `${project.startDate} — ${project.endDate}`
              : project.endDate}
          </p>
        </div>
        {project.ongoing && (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium ml-auto"
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              color: '#22c55e',
              border: '1px solid rgba(34, 197, 94, 0.25)',
            }}
          >
            Active
          </span>
        )}
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        {project.description}
      </p>

      {project.problems && project.problems.length > 0 && (
        <ul className="space-y-1.5 mb-5">
          {project.problems.map((prob, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span
                className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#38bdf8' }}
              />
              <span>{prob}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {project.ip && <ServerIpButton ip={project.ip} />}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:bg-white/5"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <DiscordIcon className="w-3.5 h-3.5" />
            <span>{project.discordLabel || 'Discord'}</span>
          </a>
        )}
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:bg-white/5"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Website</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const mobileHeaderRef = useRef<HTMLHeadingElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileHeaderInView = useInView(mobileHeaderRef, { once: true });

  const projects = portfolioConfig.projects;

  // Responsive breakpoint detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP ScrollTrigger for pinned desktop view
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    if (!section || !pinRef.current || !progressBarRef.current) return;

    const slides = section.querySelectorAll<HTMLElement>('.project-slide');
    if (!slides || slides.length === 0) return;

    // Pin the left column
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinRef.current,
      pinSpacing: false,
      pinType: 'transform',
    });

    // Scrub progress bar
    const progressTween = gsap.to(progressBarRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    // Track active slide index
    const triggers: ScrollTrigger[] = [];
    const lastIndex = slides.length - 1;

    slides.forEach((slide, idx) => {
      const isLast = idx === lastIndex;
      triggers.push(
        ScrollTrigger.create({
          trigger: slide,
          start: isLast ? 'top 80%' : 'top 65%',
          end: isLast ? 'bottom+=9999 bottom' : 'bottom 65%',
          onEnter: () => setCurrentIndex(idx),
          onEnterBack: () => !isLast && setCurrentIndex(idx),
          onLeaveBack: () => idx > 0 && setCurrentIndex(idx - 1),
        })
      );
    });

    return () => {
      pinTrigger.kill();
      progressTween.scrollTrigger?.kill();
      progressTween.kill();
      triggers.forEach((t) => t.kill());
    };
  }, [isMobile, projects.length]);

  if (isMobile) {
    return (
      <section id="experience" className="py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            ref={mobileHeaderRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isMobileHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isMobileHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs md:text-sm mb-6"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {String(projects.length).padStart(2, '0')} projects delivered
          </motion.p>

          <div>
            {projects.map((proj, idx) => (
              <MobileProjectCard key={proj.title} project={proj} index={idx} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative px-6 md:px-12 lg:px-20"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="max-w-7xl mx-auto h-full relative">
        <div className="flex h-full">
          {/* Left Pinned Column (Sticky) */}
          <div
            ref={pinRef}
            className="w-[28%] flex-shrink-0 h-screen flex flex-col justify-center pr-16 select-none"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Experience
            </h2>

            {/* Dynamic Counter: 01 / 11 */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-black text-[#00d2ff]">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-xs md:text-sm" style={{ color: 'var(--color-text-muted)' }}>
                / {String(projects.length).padStart(2, '0')}
              </span>
            </div>

            {/* Vertical Scroll Progress Bar */}
            <div
              className="w-px h-28 relative overflow-hidden"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 w-full origin-top"
                style={{
                  backgroundColor: '#00d2ff',
                  height: '100%',
                  transform: 'scaleY(0)',
                  boxShadow: '0 0 10px rgba(0, 210, 255, 0.8)',
                }}
              />
            </div>
          </div>

          {/* Right Slides Column */}
          <div className="w-[72%] flex-shrink-0 pl-8">
            {projects.map((proj) => (
              <DesktopProjectSlide key={proj.title} project={proj} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
