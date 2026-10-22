# wnderin's Developer Portfolio

A high-performance, dark-mode developer portfolio for wnderin, rebuilt and upgraded from [bytez.wtf](https://bytez.wtf/).

## ✨ Features Included

- **Blurred Background Terminal**: Live code typing engine synchronized with mouse scroll progress.
- **Grain & Vignette Texture**: SVG fractal noise filter + subtle radial darkness for depth.
- **Ultra-Smooth Scrolling**: Powered by [Lenis](https://github.com/darkroomengineering/lenis) connected to GSAP ticker.
- **Pinned Desktop Experience Showcase**: Left-column sticky counter (`01 / 07`) with real-time scrubbed progress bar + full-height project slides.
- **Responsive Mobile Layout**: Stacked card architecture with status pills, solved problem achievements, copyable IP badges, and external links.
- **Dynamic Typewriter Headline**: Terminal-style blinking cursor with auto-typing headline.
- **Live Metrics**: Count-up animated statistics and pulsating availability status lights.
- **Categorized Skills Matrix**: Expandable micro-interactions on hover.
- **Interactive Discord Contact Card**: One-click username copy with feedback toast.
- **Legal / Privacy Policy View**: Seamless dedicated view with numbered legal clauses.
- **100% Centralized Config**: Customize the entire portfolio in `src/portfolio.config.ts`.

---

## 🛠️ Quick Start

```bash
# Navigate to the portfolio folder
cd C:\Users\mattc\.gemini\antigravity\scratch\portfolio

# Install dependencies (already installed)
npm install

# Run the local development server
npm run dev
```

The site will be available at: **http://localhost:5173/**

---

## 🎨 How to Personalize for Yourself ("Me")

Open [`src/portfolio.config.ts`](file:///C:/Users/mattc/.gemini/antigravity/scratch/portfolio/src/portfolio.config.ts) to customize:

1. **Your Name & Tagline**:
   - `hero.name`: Your display name or handle (e.g. `"MATT"`).
   - `hero.roleDescription`: Your primary title (e.g. `"Full-Stack Engineer & Systems Architect"`).
   - `hero.roles`: Array of rotating roles.

2. **Metrics & Availability**:
   - `stats`: Years of experience, delivered projects, etc.
   - `availability`: Statuses (e.g. "Full-time", "Freelance", "Advisory").

3. **About Me**:
   - Personal facts, languages spoken, core engineering interests.

4. **Projects & Experience**:
   - Title, role, description, date range, image thumbnail, live links, and key problems solved.
   - Add new images into [`public/assets/`](file:///C:/Users/mattc/.gemini/antigravity/scratch/portfolio/public/assets/).

5. **Technologies**:
   - Categorized tech stacks (Languages, Frameworks, Cloud, Databases).

6. **Socials & Discord**:
   - Discord username & ID, GitHub profile URL, email address.

7. **Background Code Snippet**:
   - Replace `backgroundCode` with code tokens in your preferred language (TypeScript, Rust, Python, Go, Java, etc.).
