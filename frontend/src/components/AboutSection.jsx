import { motion } from "framer-motion";
import { Sparkles, Cpu, Users } from "lucide-react";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1762341124796-530c0085f7d8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwzfHxhc2lhbiUyMGZlbWFsZSUyMHRlY2glMjBlbmdpbmVlciUyMHBvcnRyYWl0JTIwZWxlZ2FudCUyMHByb2Zlc3Npb25hbHxlbnwwfHx8fDE3ODg4MTQ1Mjh8MA&ixlib=rb-4.1.0&q=85",
    rotate: "-3deg",
    testId: "about-photo-1",
  },
  {
    src: "https://images.unsplash.com/photo-1767164057919-61acae4612c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHw0fHxhc2lhbiUyMGZlbWFsZSUyMHRlY2glMjBlbmdpbmVlciUyMHBvcnRyYWl0JTIwZWxlZ2FudCUyMHByb2Zlc3Npb25hbHxlbnwwfHx8fDE3ODg4MTQ1Mjh8MA&ixlib=rb-4.1.0&q=85",
    rotate: "4deg",
    testId: "about-photo-2",
  },
];

const HIGHLIGHTS = [
  { icon: Cpu, text: "AI Engineer specializing in computer vision & ML pipelines" },
  { icon: Users, text: "Technical Implementation Manager at enterprise scale" },
  { icon: Sparkles, text: "Bridge between engineering, product & client stakeholders" },
];

export default function AboutSection() {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10" data-testid="about-section">
      <div className="relative flex items-center justify-center md:col-span-5" data-testid="about-photos">
        {PHOTOS.map((p, i) => (
          <motion.div
            key={p.testId}
            initial={{ opacity: 0, y: 30, rotate: p.rotate }}
            whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
            whileHover={{ rotate: "0deg", scale: 1.03 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={`relative w-52 sm:w-60 overflow-hidden rounded-2xl border-4 border-white bg-[#F5EBE0] p-2 shadow-[0_20px_50px_rgba(31,41,55,0.12)] ${
              i === 1 ? "-ml-16 mt-20" : "z-10"
            }`}
            style={{ rotate: p.rotate }}
          >
            <img
              src={p.src}
              alt={i === 0 ? "Yuna Punyaja portrait" : "Yuna Punyaja at work"}
              className="aspect-[3/4] w-full rounded-xl object-cover"
              data-testid={p.testId}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      <div className="md:col-span-7" data-testid="about-content">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#6B7280]">01 · About</span>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1F2937]" data-testid="about-heading">
          Who is Yuna
        </h2>
        <p className="mt-6 text-base leading-relaxed text-[#4B5563]">
          I started in enterprise integrations — wiring together Oracle databases, legacy
          systems, and the APIs that keep large organisations running. That foundation taught me
          how complex architecture behaves in the real world: messy, interconnected, and
          unforgiving of shortcuts.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
          Today I've transitioned into AI, ML, and data science — building real-time computer
          vision systems with MediaPipe and OpenCV, and shipping machine learning pipelines that
          move from notebook prototypes to production. What drives me is visual computing:
          turning raw pixels into decisions.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
          As a Technical Implementation Manager, I sit at the intersection of engineering,
          product, and clients — translating ambitious AI ideas into systems that actually ship.
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
                <span className="text-sm text-[#4B5563]">{h.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
