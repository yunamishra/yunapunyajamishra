import React, { useState, useEffect, useRef } from "react";
import { User, Briefcase, FolderGit2, BookOpen, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AboutSection from "./components/AboutSection.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";
import BlogSection from "./components/BlogSection.jsx";
import ContactSection from "./components/ContactSection.jsx";

const GRID_X = 54;
const GRID_Y = 40;

const FALLBACK_PALETTE = [
  "#F5DCD7",
  "#FBEBE8",
  "#EAE7EC",
  "#E2E8E4",
  "#F5EBE0",
  "#E8D5CF",
  "#D9CFDD",
  "#F3E4DE",
];

const TABS = [
  { id: "about", label: "About", icon: User, component: AboutSection },
  { id: "experience", label: "Experience", icon: Briefcase, component: ExperienceSection },
  { id: "projects", label: "Projects", icon: FolderGit2, component: ProjectsSection },
  { id: "blog", label: "Blog", icon: BookOpen, component: BlogSection },
  { id: "contact", label: "Contact", icon: Mail, component: ContactSection },
];

const rand = (seed) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function buildPixelsFromImage(img) {
  const pixels = [];
  const offscreen = document.createElement("canvas");
  offscreen.width = GRID_X;
  offscreen.height = GRID_Y;
  const offCtx = offscreen.getContext("2d");

  if (img) {
    const scale = GRID_Y / img.height;
    const drawW = img.width * scale;
    const drawH = GRID_Y;
    const x = (GRID_X - drawW) / 2;
    const y = 0;
    offCtx.drawImage(img, x, y, drawW, drawH);
  }

  const imgData = img ? offCtx.getImageData(0, 0, GRID_X, GRID_Y).data : null;

  for (let y = 0; y < GRID_Y; y++) {
    for (let x = 0; x < GRID_X; x++) {
      let color;
      if (imgData) {
        const idx = (y * GRID_X + x) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];
        const a = imgData[idx + 3] / 255;
        if (a < 0.1) continue;
        color = `rgb(${r}, ${g}, ${b})`;
      } else {
        const seed = x * 73 + y * 149;
        color = FALLBACK_PALETTE[Math.floor(rand(seed + 1) * FALLBACK_PALETTE.length)];
      }

      const seed = x * 73 + y * 149;
      const dx = x + 0.5 - GRID_X / 2;
      const dy = y + 0.5 - GRID_Y / 2;
      const angle = Math.atan2(dy, dx);
      const speed = 0.4 + rand(seed) * 1.2;

      pixels.push({
        gx: x,
        gy: y,
        color,
        vx: Math.cos(angle) * speed + (rand(seed + 2) - 0.5) * 0.6,
        vy: Math.sin(angle) * speed + (rand(seed + 3) - 0.5) * 0.6 - 0.15,
        delay: rand(seed + 4) * 0.2,
        size: 0.88 + rand(seed + 5) * 0.25,
        spin: (rand(seed + 6) - 0.5) * 2.8,
      });
    }
  }
  return pixels;
}

export function PixelCanvas({ progress = 0 }) {
  const canvasRef = useRef(null);
  const pixelsRef = useRef(null);
  const progressRef = useRef(progress);
  const rafRef = useRef(null);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    pixelsRef.current = buildPixelsFromImage(null);

    const img = new Image();
    img.src = "/yuna-portrait-5.jpg";
    img.crossOrigin = "anonymous";
    img.onload = () => {
      pixelsRef.current = buildPixelsFromImage(img);
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cell = h / GRID_Y;
      const p = progressRef.current ?? 0;

      ctx.clearRect(0, 0, w, h);

      if (!pixelsRef.current) return;

      const explode = Math.min(Math.max((p - 0.05) / 0.85, 0), 1);
      const ease = explode * explode * (3 - 2 * explode);

      for (const px of pixelsRef.current) {
        const local = Math.min(Math.max((ease - px.delay * 0.4) / (1 - px.delay * 0.4), 0), 1);
        const dist = local * Math.max(w, h) * 1.2;
        
        const x = (px.gx - GRID_X / 2) * cell + w / 2 + px.vx * dist;
        const y = (px.gy - GRID_Y / 2) * cell + h / 2 + px.vy * dist;
        
        const alpha = Math.max(1 - local * local * 1.1, 0);
        if (alpha <= 0.01) continue;

        const size = cell * px.size * (1 - local * 0.3);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x, y);
        ctx.rotate(px.spin * local);
        ctx.fillStyle = px.color;
        const half = size / 2;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-half, -half, size, size, size * 0.22);
        } else {
          ctx.rect(-half, -half, size, size);
        }
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-30 mix-blend-multiply"
      data-testid="hero-pixel-canvas"
      aria-hidden="true"
    />
  );
}

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const cardRef = useRef(null);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(Math.max(window.scrollY / totalHeight, 0), 1));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeTab = (newIdx) => {
    if (newIdx === activeIdx || isTransitioningRef.current) return;
    
    // Prevent rapid tab switching during animations
    isTransitioningRef.current = true;
    setDirection(newIdx > activeIdx ? 1 : -1);
    setActiveIdx(newIdx);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);
  };

  // Scroll threshold listener: advances to next tab when scrolling past bottom of card
  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioningRef.current || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const isAtBottom = rect.bottom <= window.innerHeight + 20;
      const isAtTop = rect.top >= 80;

      // Scrolling DOWN at bottom of card -> next tab
      if (e.deltaY > 30 && isAtBottom && activeIdx < TABS.length - 1) {
        changeTab(activeIdx + 1);
      }
      // Scrolling UP at top of card -> previous tab
      else if (e.deltaY < -30 && isAtTop && activeIdx > 0) {
        changeTab(activeIdx - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIdx]);

  const handleDragEnd = (event, { offset }) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold && activeIdx < TABS.length - 1) {
      changeTab(activeIdx + 1);
    } else if (offset.x > swipeThreshold && activeIdx > 0) {
      changeTab(activeIdx - 1);
    }
  };

  const ActiveComponent = TABS[activeIdx].component;

  return (
    <div className="relative min-h-screen bg-[#EBE5F2] text-gray-800 font-sans selection:bg-purple-200 overflow-x-hidden">
      
      {/* Background Ambient Lavender Gradient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-150 h-150 bg-purple-300/40 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-1/3 -right-30 w-160 h-160 bg-indigo-200/50 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-20 left-1/4 w-180 h-180 bg-violet-200/40 rounded-full blur-3xl opacity-50" />
      </div>

      <PixelCanvas progress={scrollProgress} />

      {/* Hero Section */}
      <section className="relative z-20 w-full h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-7xl font-serif font-bold tracking-tight mb-4 text-[#8C580C] drop-shadow-sm">
          Yuna Punyaja
        </h1>

        <p className="text-lg md:text-xl font-sans font-semibold max-w-2xl mb-2 text-[#7A4B08]">
          Technical Implementation Manager & AI Engineer
        </p>

        <p className="text-sm font-sans font-medium max-w-xl mx-auto mb-12 text-[#7A4B08]/90">
          Bridging complex enterprise architecture with real-time computer vision and machine learning.
        </p>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#7A4B08]">
            SCROLL TO EXPLORE
          </span>
          <span className="animate-bounce font-bold text-[#7A4B08]">
            ↓
          </span>
        </div>
      </section>

      {/* Navigation Bar */}
      <div className="sticky top-6 z-40 flex justify-center px-4 mb-12">
        <nav className="flex items-center gap-1 p-1.5 bg-white/70 backdrop-blur-md rounded-full border border-purple-200/60 shadow-md">
          {TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeIdx === idx;
            return (
              <button
                key={tab.id}
                onClick={() => changeTab(idx)}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive ? "text-purple-950" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-purple-100 rounded-full shadow-xs"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 w-4 h-4" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Carousel Viewport */}
      <main className="relative z-30 max-w-5xl mx-auto px-4 pb-24">
        {activeIdx > 0 && (
          <button
            onClick={() => changeTab(activeIdx - 1)}
            aria-label="Previous tab"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-40 h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-purple-200/60 shadow-md text-gray-700 hover:text-purple-900 hover:bg-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {activeIdx < TABS.length - 1 && (
          <button
            onClick={() => changeTab(activeIdx + 1)}
            aria-label="Next tab"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-40 h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-purple-200/60 shadow-md text-gray-700 hover:text-purple-900 hover:bg-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <div ref={cardRef} className="relative overflow-hidden rounded-3xl min-h-[500px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-14 border border-purple-100/60 shadow-2xl cursor-grab active:cursor-grabbing"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => changeTab(idx)}
              aria-label={`Go to ${tab.label}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIdx ? "w-8 bg-purple-900" : "w-2 bg-purple-200 hover:bg-purple-300"
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}