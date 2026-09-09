import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Award, 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Terminal,
  Download
} from "lucide-react";

const CAREER_NODES = [
  {
    id: "paymentus",
    role: "Technical Implementation Manager",
    company: "Paymentus",
    period: "2024 - Present",
    type: "Full-Time",
    shortDesc: "Enterprise SaaS delivery, complex API integrations & database management.",
    bullets: [
      "Oversee end-to-end technical onboarding, API client integrations, and custom database configurations.",
      "Diagnose complex system behaviors, troubleshooting REST APIs, XML, XOTP, JSON payloads, and database connections.",
      "Serve as the core technical translator between engineering teams, product stakeholders, and client IT leadership.",
    ],
    tech: ["REST APIs", "XML", "XOTP", "JSON", "SQL", "SaaS Delivery", "System Architecture"],
  },
  {
    id: "toronto-hydro",
    role: "Business System Analyst & Project Coordinator",
    company: "Toronto Hydro",
    period: "2021 - 2024",
    type: "Full-Time",
    shortDesc: "Enterprise integrations, Oracle databases, legacy systems & SDLC frameworks.",
    bullets: [
      "Managed system integration workflows across legacy enterprise architectures and Oracle database products.",
      "Coordinated cross-functional release cycles, environment deployments, and technical requirement specifications.",
      "Engineered data-driven operational reports and process optimizations to enhance system stability.",
    ],
    tech: ["Oracle Databases", "SDLC", "Release Management", "API Troubleshooting", "Process Optimization"],
  },
  {
    id: "innovfin",
    role: "Software Developer",
    company: "InnovFin Consulting",
    period: "2020 - 2021",
    type: "Contract",
    shortDesc: "Full-stack software development, data pipelines & API builds.",
    bullets: [
      "Developed web modules and data transformation pipelines in Python and JavaScript.",
      "Architected backend microservices and RESTful API endpoints for client-facing financial web applications.",
    ],
    tech: ["Python", "JavaScript", "REST APIs", "SQL", "Data Pipelines"],
  },
];

const SKILLS = [
  { category: "Languages & Protocols", items: ["Python", "SQL", "JavaScript", "REST APIs", "XML", "XOTP", "JSON", "React"] },
  { category: "AI & ML", items: ["Machine Learning Pipelines", "Generative AI", "Auto-sklearn", "Pandas", "Data Analytics"] },
  { category: "Enterprise & Delivery", items: ["Oracle Databases", "SaaS Implementation", "SDLC", "Agile / Scrum", "Jira", "Client Integrations"] },
];

const CERTIFICATIONS_STATEMENTS = [
  "Earned IBM Professional Credentials in Data Analytics, Python for AI, and Generative AI Applications",
  "Holds IIBA Business Analysis Certifications (ECBA, CCBA, CBAP pathway)",
];

export default function ExperienceSection() {
  const [selectedNode, setSelectedNode] = useState(CAREER_NODES[0]);

  return (
    <div className="space-y-12" data-testid="experience-section">
      {/* Header & Resume Download Action */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E1DA] pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#6B7280]">
            02 · EXPERIENCE &amp; BACKGROUND
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1F2937]">
            Career Journey &amp; Technical Focus
          </h2>
        </div>

        {/* Prominent Resume Button */}
        <a
          href="/Yuna_Punyaja_Resume.pdf"
          download="Yuna_Punyaja_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F2937] px-5 py-3 text-xs font-mono uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-purple-900 hover:shadow-lg hover:-translate-y-0.5 shrink-0"
          data-testid="download-resume-btn-experience"
        >
          <Download className="h-4 w-4" />
          <span>Download Full Resume</span>
        </a>
      </div>

      {/* Interactive Career Timeline Nodes */}
      <div className="space-y-6">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
          <Terminal className="w-4 h-4 text-purple-600" />
          Interactive Career Nodes (Click or Hover)
        </h3>

        {/* Node Buttons Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CAREER_NODES.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setSelectedNode(node)}
                className={`relative flex flex-col p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#FAF9F6] border-purple-400 shadow-md ring-2 ring-purple-200/50"
                    : "bg-white/60 border-[#E5E1DA] hover:bg-[#FAF9F6] hover:border-purple-200"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-mono text-purple-900 font-semibold">{node.period}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FBEBE8] text-[#1F2937]">
                    {node.type}
                  </span>
                </div>
                <h4 className="font-bold text-[#1F2937] text-sm">{node.company}</h4>
                <p className="text-xs text-[#6B7280] truncate mt-0.5">{node.role}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Node Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-8 rounded-2xl border border-[#E5E1DA] bg-[#FAF9F6] shadow-sm space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E1DA] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#1F2937]">{selectedNode.role}</h3>
                <p className="text-sm font-medium text-purple-900 flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-4 h-4" />
                  {selectedNode.company}
                </p>
              </div>
              <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[#FBEBE8] text-[#1F2937]">
                {selectedNode.period}
              </span>
            </div>

            <p className="text-sm text-[#4B5563] italic">{selectedNode.shortDesc}</p>

            <ul className="space-y-2 text-sm text-[#4B5563]">
              {selectedNode.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-wrap gap-2">
              {selectedNode.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white border border-[#E5E1DA] text-[#1F2937]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Current Focus Subsection */}
        <div className="p-6 rounded-2xl border border-purple-200/80 bg-gradient-to-r from-purple-50/50 to-indigo-50/40 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-purple-900">
              <Sparkles className="w-4 h-4" />
            </span>
            <h4 className="text-sm font-bold text-[#1F2937] uppercase tracking-wider font-mono">
              Current Focus
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-[#4B5563]">
            Building at the intersection of enterprise technology and applied AI — with a focus on intelligent systems, implementation, and technical leadership.
          </p>
        </div>
      </div>

      <hr className="border-[#E5E1DA]" />

      {/* Split Section 1: Technical Skills */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-800" />
          <h3 className="text-lg font-bold text-[#1F2937]">Technical &amp; Functional Skills</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SKILLS.map((skillGroup, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-[#E5E1DA] bg-[#FAF9F6] space-y-3"
            >
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B7280] font-bold">
                {skillGroup.category}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {skillGroup.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white border border-[#E5E1DA] text-[#1F2937]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Split Section 2: Certifications */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-800" />
          <h3 className="text-lg font-bold text-[#1F2937]">Certifications &amp; Credentials</h3>
        </div>

        <div className="space-y-3">
          {CERTIFICATIONS_STATEMENTS.map((statement, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-3 rounded-xl border border-[#E5E1DA] bg-[#FAF9F6] px-4 py-3.5 shadow-2xs hover:border-purple-300 transition-colors"
              data-testid={`cert-statement-${idx}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FBEBE8]">
                <GraduationCap className="h-4 w-4 text-[#1F2937]" />
              </span>
              <span className="text-sm text-[#4B5563] font-medium leading-relaxed">
                {statement}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}