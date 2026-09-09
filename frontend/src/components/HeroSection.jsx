import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import PixelCanvas from "@/components/PixelCanvas";
import { ChevronDown, Download, Mail } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.2]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh]" data-testid="hero-scroll-container">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#FDFBF7]">
        <div
          className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-[#FBEBE8] blur-3xl opacity-70"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 -right-24 h-[520px] w-[520px] rounded-full bg-[#EAE7EC] blur-3xl opacity-70"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-[#F5EBE0] blur-3xl opacity-60"
          aria-hidden="true"
        />

        <PixelCanvas progress={progress} />

        <motion.div
          style={{ scale: textScale, opacity: textOpacity }}
          className="relative z-10 flex flex-col items-center px-6 text-center"
          data-testid="hero-text-overlay"
        >
          <span className="mb-5 rounded-full border border-[#E5E1DA] bg-white/60 px-5 py-1.5 text-xs font-mono uppercase tracking-[0.3em] text-[#6B7280] backdrop-blur-md">
            Portfolio · 2026
          </span>
          <h1
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1F2937]"
            data-testid="hero-headline"
          >
            Yuna Punyaja
          </h1>
          <p
            className="mt-4 text-lg sm:text-xl font-light tracking-wide text-[#4B5563]"
            data-testid="hero-subtitle"
          >
            Technical Implementation &amp; AI Solutions
          </p>
          <p
            className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-[#6B7280]"
            data-testid="hero-pitch"
          >
            Bridging enterprise technology, business needs, and applied AI — turning complex ideas into solutions that actually ship.
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/Yuna_Punyaja_Resume.pdf"
              download="Yuna_Punyaja_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1F2937] px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-purple-900 hover:shadow-lg hover:-translate-y-0.5"
              data-testid="download-resume-btn"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
            </a>

            <a
              href="mailto:yunapunyaja@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E5E1DA] bg-white/80 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#1F2937] backdrop-blur-sm transition-all duration-200 hover:bg-white hover:border-purple-300"
              data-testid="get-in-touch-btn"
            >
              <Mail className="h-4 w-4" />
              <span>Get in Touch</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6B7280]"
          data-testid="scroll-hint"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.25em]">Scroll to explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
}