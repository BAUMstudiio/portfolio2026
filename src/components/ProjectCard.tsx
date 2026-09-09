"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project, PILLARS } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

export default function ProjectCard({ project, onSelect, index }: ProjectCardProps) {
  const pillar = PILLARS.find((p) => p.id === project.pillarId);
  const accentColor = pillar?.accentColor || "#ffffff";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(project)}
      className="group relative cursor-pointer rounded-2xl p-8 md:p-10 transition-all duration-500 bg-gradient-to-b from-white/[0.02] to-white/[0.003] hover:from-white/[0.05] hover:to-white/[0.015] border border-white/[0.04] hover:border-white/[0.12]"
    >
      {/* Background Hover Accent Glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${accentColor}0d, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-8">
        
        {/* Top Header: Context, Year & Metric Badge */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-medium tracking-widest text-zinc-400 uppercase">
                {project.context}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="font-mono text-[11px] text-zinc-400 tracking-wider">
                {project.year}
              </span>
            </div>

            {project.highlightMetric && (
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white/[0.04] text-white border border-white/[0.08]">
                {project.highlightMetric}
              </span>
            )}
          </div>

          {/* Role & Title */}
          <div className="mb-3">
            <span className="font-mono text-xs text-zinc-400 block mb-1 uppercase tracking-widest">
              {project.role}
            </span>
            <h4 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-white transition-colors tracking-tight leading-tight">
              {project.title}
            </h4>
          </div>

          {/* Factual Summary */}
          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 font-sans font-normal">
            {project.summary}
          </p>
        </div>

        {/* Bottom Section: Typographic Minimalist Tags & Action Button */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Tags (Uppercase, tracking-widest, low opacity bg) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded bg-white/[0.03] text-zinc-400 border border-white/[0.03] group-hover:border-white/[0.08] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Case Study Trigger */}
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-zinc-400 group-hover:text-white transition-colors shrink-0">
            <span className="uppercase tracking-wider text-[11px]">Étude de cas</span>
            <div className="w-7 h-7 rounded-full bg-white/[0.04] group-hover:bg-white/10 flex items-center justify-center transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
