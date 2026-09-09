import React from "react";
import { ExternalLink, FolderGit2 } from "lucide-react";

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Real-Time CV Hand Tracker",
    description: "Real-time hand gesture recognition and tracking using OpenCV and MediaPipe, with a Random Forest classifier trained to recognize gestures from extracted hand landmarks.",
    image: "/projects/hand-tracker.jpg",
    githubUrl: "https://github.com/yunamishra/cv-hand-tracker",
    tags: ["Python", "OpenCV", "MediaPipe", "Machine Learning"],
  },
  {
    id: 2,
    title: "KPI Dental Analytics Dashboard",
    description: "Full-stack analytics dashboard transforming raw dental clinic data into interactive KPI models and visualizations for tracking operational performance.",
    image: "/projects/dental-dashboard.jpg",
    githubUrl: "https://github.com/yunamishra/KPI-Dental-Dashboard",
    tags: ["Python", "SQL", "JavaScript", "Data Analytics"],
  },
];

export default function ProjectsSection() {
  return (
    <div className="space-y-8" data-testid="projects-section">
      <div>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#6B7280]">
          03 · PROJECTS
        </span>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1F2937]">
          Selected Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col justify-between bg-[#FAF9F6] rounded-2xl border border-[#E5E1DA] p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-purple-300 hover:bg-white"
          >
            <div>
              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-purple-50 mb-4 border border-purple-100 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <FolderGit2 className="w-10 h-10 text-purple-300 opacity-60 absolute" />
              </div>

              <h3 className="text-lg font-bold text-[#1F2937] mb-2 group-hover:text-purple-900 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#FBEBE8] text-[#1F2937]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-purple-900 hover:text-purple-700 transition-colors"
              >
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}