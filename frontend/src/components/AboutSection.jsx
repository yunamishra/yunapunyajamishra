import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Cpu, Users } from "lucide-react";

const PHOTOS = [
  {
    src: "/yuna-portrait-1.jpg",
    fallback: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    rotate: -10,
    desktop: { top: "0px", left: "-20px" },
    mobile: { top: "0px", left: "0px" },
    zIndex: 40,
    testId: "about-photo-1",
  },
  {
    src: "/yuna-portrait-2.jpg",
    fallback: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    rotate: 9,
    desktop: { top: "155px", left: "110px" },
    mobile: { top: "15px", left: "70px" },
    zIndex: 30,
    testId: "about-photo-2",
  },
  {
    src: "/yuna-portrait-3.jpg",
    fallback: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop",
    rotate: -9,
    desktop: { top: "310px", left: "-15px" },
    mobile: { top: "5px", left: "140px" },
    zIndex: 20,
    testId: "about-photo-3",
  },
  {
    src: "/yuna-portrait-4.jpg",
    fallback: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
    rotate: 11,
    desktop: { top: "465px", left: "100px" },
    mobile: { top: "20px", left: "210px" },
    zIndex: 10,
    testId: "about-photo-4",
  },
];

const HIGHLIGHTS = [
  { icon: Cpu, text: "AI Engineer working with ML pipelines & data systems" },
  { icon: Users, text: "Technical Implementation Manager at enterprise scale" },
  { icon: Sparkles, text: "Bridge between engineering, product & client stakeholders" },
];

export default function AboutSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 items-start" data-testid="about-section">
      {/* Photo Column */}
      <div className="relative min-h-[320px] md:min-h-[720px] w-full flex justify-center md:justify-start md:col-span-5 pr-2" data-testid="about-photos">
        <div className="relative w-full max-w-[340px] h-[300px] md:h-[680px]">
          {PHOTOS.map((p, i) => {
            const pos = isMobile ? p.mobile : p.desktop;
            return (
              <motion.div
                key={p.testId}
                initial={{ opacity: 0, y: 20, rotate: p.rotate }}
                whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
                whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="absolute w-36 sm:w-44 md:w-52 overflow-hidden rounded-2xl border-4 border-white bg-[#F5EBE0] p-1.5 shadow-xl cursor-pointer"
                style={{
                  top: pos.top,
                  left: pos.left,
                  zIndex: p.zIndex,
                }}
              >
                <img
                  src={p.src}
                  alt={`Yuna Punyaja ${i + 1}`}
                  className="aspect-[3/4] w-full rounded-xl object-cover pointer-events-none"
                  data-testid={p.testId}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = p.fallback;
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* About Content */}
      <div className="md:col-span-7 pl-0 md:pl-4" data-testid="about-content">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#6B7280]">01 · About</span>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1F2937]" data-testid="about-heading">
          Who is Yuna
        </h2>
        
        <p className="mt-6 text-base leading-relaxed text-[#4B5563]">
          I started in enterprise technology, working across systems analysis, release management, integrations, and technical delivery. That foundation taught me one thing early: <strong className="font-semibold text-[#1F2937]">technology rarely exists in isolation</strong>. Systems connect, requirements evolve, and solving the actual problem usually takes more than just writing the code.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
          Today, I lead complex enterprise implementations, working between clients, developers, architects, and vendors to turn requirements into something that can actually be built and delivered. I’m technical enough to troubleshoot the messy stuff, analytical enough to question the scope, and curious enough to figure out what nobody has documented yet.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
          That same curiosity has pulled me deeper into AI, machine learning, and data science. I firmly believe AI is a tool — <strong className="font-semibold text-[#1F2937]">and the people who understand how to use the tool will be the ones creating what comes next</strong>. I want to be on that side of the table: building, evaluating, and eventually leading technology that is genuinely useful, not just wearing an AI label.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
          Outside of work, I’m usually moving in some direction — basketball, volleyball, skiing, gym workouts, or attempting whatever new sport has caught my attention that week. Add board games, new food, coffee, and the occasional baking experiment, and that’s pretty much me.
        </p>

        <div className="mt-8 space-y-3">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12 }}
                className="flex items-center gap-3 rounded-xl border border-[#E5E1DA] bg-[#FAF9F6] px-4 py-3"
                data-testid={`about-highlight-${i}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FBEBE8]">
                  <Icon className="h-4 w-4 text-[#1F2937]" />
                </span>
                <span className="text-sm text-[#4B5563] font-medium">{h.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}