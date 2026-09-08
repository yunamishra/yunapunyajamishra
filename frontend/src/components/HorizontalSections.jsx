import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Mail } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";

const SECTIONS = [
  { id: "about", label: "About", icon: User, component: AboutSection },
  { id: "experience", label: "Experience", icon: Briefcase, component: ExperienceSection },
  { id: "contact", label: "Contact", icon: Mail, component: ContactSection },
];

export default function HorizontalSections() {
  const [active, setActive] = useState(0);
  const lockRef = useRef(false);
  const rootRef = useRef(null);

  const goTo = useCallback((idx) => {
    setActive(Math.max(0, Math.min(SECTIONS.length - 1, idx)));
  }, []);

  useEffect(() => {
    const onWheel = (e) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.6;
      if (!inView || lockRef.current) return;
      if (Math.abs(e.deltaY) < 24) return;

      if (e.deltaY > 0 && active < SECTIONS.length - 1) {
        lockRef.current = true;
        goTo(active + 1);
        setTimeout(() => (lockRef.current = false), 900);
      } else if (e.deltaY < 0 && active > 0) {
        lockRef.current = true;
        goTo(active - 1);
        setTimeout(() => (lockRef.current = false), 900);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [active, goTo]);

  const ActiveComponent = SECTIONS[active].component;

  return (
    <section ref={rootRef} className="relative min-h-screen bg-[#FAF9F6] py-20" data-testid="horizontal-sections">
      <nav
        className="sticky top-6 z-30 mx-auto mb-12 flex w-fit items-center gap-1 rounded-full border border-[#E5E1DA] bg-white/70 p-1.5 shadow-[0_8px_30px_rgba(31,41,55,0.06)] backdrop-blur-xl"
        data-testid="section-tabs"
      >
        {SECTIONS.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === active;
          return (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              data-testid={`tab-${s.id}`}
              className={`relative flex items-center gap-2 rounded-full px-4 sm:px-6 py-2.5 text-sm font-medium transition-colors duration-300 ${
                isActive ? "text-[#1F2937]" : "text-[#6B7280] hover:text-[#1F2937]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-[#FBEBE8] border border-[#F5DCD7]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10 hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="pointer-events-none absolute inset-x-8 top-6 -z-0 hidden md:block">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="absolute inset-x-0 rounded-3xl border border-[#E5E1DA] bg-[#F5EBE0]/60"
              style={{ transform: `translateX(${-n * 14}px) translateY(${n * 12}px) scale(${1 - n * 0.02})`, height: "100%", minHeight: "70vh", opacity: 0.6 / n }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={SECTIONS[active].id}
            initial={{ x: 120, opacity: 0, rotate: 0.5 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: -160, opacity: 0, rotate: -0.5 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="relative z-10 rounded-3xl border border-[#E5E1DA] bg-white/80 p-8 shadow-[0_24px_60px_rgba(31,41,55,0.08)] backdrop-blur-xl sm:p-12"
            data-testid={`panel-${SECTIONS[active].id}`}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-2" data-testid="section-dots">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to ${s.label}`}
              onClick={() => goTo(i)}
              data-testid={`dot-${s.id}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-[#1F2937]" : "w-2 bg-[#E5E1DA] hover:bg-[#D9CFDD]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
