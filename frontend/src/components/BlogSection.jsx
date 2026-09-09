import React from "react";
import { HardHat, Sparkles } from "lucide-react";

export default function BlogSection() {
  return (
    <div className="space-y-8" data-testid="blog-section">
      <div>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#6B7280]">
          04 · BLOG & PERSPECTIVES
        </span>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1F2937]">
          Technical Writing & Insights
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center text-center p-12 md:p-16 bg-[#FAF9F6] rounded-3xl border border-dashed border-[#E5E1DA] my-6">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FBEBE8] text-[#1F2937] flex items-center justify-center shadow-inner">
            <HardHat className="w-8 h-8" />
          </div>
          <Sparkles className="w-5 h-5 text-amber-500 absolute -top-2 -right-2 animate-pulse" />
        </div>

        <h3 className="text-xl font-bold text-[#1F2937] mb-2">
          Blog Under Construction 🚧
        </h3>
        
        <p className="text-sm text-[#4B5563] max-w-md leading-relaxed">
          I'm drafting technical articles covering enterprise AI implementations, MLOps monitoring, and scoping practical computer vision models. Stay tuned!
        </p>
      </div>
    </div>
  );
}