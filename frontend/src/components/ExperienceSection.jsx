import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Database, BrainCircuit, Rocket, Globe } from "lucide-react";

const MILESTONES = [
  {
    icon: GraduationCap,
    title: "Graduation",
    period: "Foundation",
    detail: "Computer science fundamentals with a focus on data structures, systems design, and mathematics for machine learning.",
  },
  {
    icon: Database,
    title: "Enterprise Integrations",
    period: "Years 1–3",
    detail: "Led Oracle database integrations and API architecture for large-scale enterprise clients, managing cross-functional delivery.",
  },
  {
    icon: BrainCircuit,
    title: "AI/ML Engineering",
    period: "Years 3–5",
    detail: "Built real-time computer vision systems with MediaPipe & OpenCV; deployed scikit-learn pipelines into production.",
  },
  {
    icon: Rocket,
    title: "Current Focus",
    period: "Now",
    detail: "Technical Implementation Manager bridging enterprise architecture with applied AI — shipping vision systems that scale.",
  },
];

const SKILLS = ["Python", "MediaPipe", "OpenCV", "Scikit-Learn", "Next.js", "REST APIs", "Oracle DBs", "Docker", "PyTorch"];
const PILL_COLORS = ["bg-[#FBEBE8]", "bg-[#EAE7EC]", "bg-[#E2E8E4]", "bg-[#F5EBE0]"];

const LANGUAGES = [
  { name: "English", level: "Native / Fluent", width: "100%" },
  { name: "French", level: "Conversational / Working", width: "55%" },
];

export default function ExperienceSection() {
  const [activeNode, setActiveNode] = useState(3);

  return (
    <div data-testid="experience-section">
      <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#6B7280]">02 · Experience</span>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1F2937]" data-testid="experience-heading">
        Experience, Skills &amp; Languages
      </h2>

      <div className="mt-12" data-testid="timeline">
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-[#E5E1DA] sm:left-0 sm:top-6 sm:h-px sm:w-full" aria-hidden="true" />
          {MILESTONES.map((m, i) => {
            const Icon = m.icon;
            const isActive = i === activeNode;
            return (
              <button
                key={m.title}
                onClick={() => setActiveNode(i)}
                onMouseEnter={() => setActiveNode(i)}
                data-testid={`timeline-node-${i}`}
                className="group relative z-10 flex flex-row items-center gap-4 text-left sm:flex-col sm:items-center sm:gap-3 sm:text-center"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isActive
                      ? "border-[#F5DCD7] bg-[#FBEBE8] shadow-[0_8px_24px_rgba(245,220,215,0.8)] scale-110"
                      : "border-[#E5E1DA] bg-white group-hover:border-[#D9CFDD]"
                  }`}
                >
                  <Icon className="h-5 w-5 text-[#1F2937]" />
                </span>
                <span>
                  <span className={`block text-sm font-medium transition-colors ${isActive ? "text-[#1F2937]" : "text-[#6B7280]"}`}>
                    {m.title}
                  </span>
                  <span className="block text-xs text-[#6B7280]">{m.period}</span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-8 rounded-2xl border border-[#E5E1DA] bg-[#FAF9F6] p-6"
            data-testid="timeline-detail"
          >
            <h3 className="font-serif text-xl font-medium text-[#1F2937]">{MILESTONES[activeNode].title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{MILESTONES[activeNode].detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div data-testid="skills-card">
          <h3 className="font-serif text-2xl font-medium text-[#1F2937]">Technical Skills &amp; Certifications</h3>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {SKILLS.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className={`cursor-default rounded-full border border-[#E5E1DA] ${PILL_COLORS[i % PILL_COLORS.length]} px-4 py-2 text-xs font-mono uppercase tracking-widest text-[#1F2937] shadow-sm`}
                data-testid={`skill-pill-${skill.toLowerCase().replace(/[\s/.]+/g, "-")}`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E1DA] bg-[#FAF9F6] p-6" data-testid="languages-card">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAE7EC]">
              <Globe className="h-4 w-4 text-[#1F2937]" />
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#1F2937]">Languages</h3>
          </div>
          <div className="mt-6 space-y-5">
            {LANGUAGES.map((lang) => (
              <div key={lang.name} data-testid={`language-${lang.name.toLowerCase()}`}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-[#1F2937]">{lang.name}</span>
                  <span className="text-xs text-[#6B7280]">{lang.level}</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#EAE7EC]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: lang.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#F5DCD7] to-[#D9CFDD]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
