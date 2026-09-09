"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, Image as ImageIcon } from "lucide-react";
import { ProjectData } from "@/lib/projects";
import Image from "next/image";

interface NuancierFanDeckProps {
  projects: ProjectData[];
  onSelectProject: (project: ProjectData) => void;
}

export default function NuancierFanDeck({ projects, onSelectProject }: NuancierFanDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!projects || projects.length === 0) {
    return (
      <div className="py-20 text-center text-[#717171] font-body">
        Aucun projet trouvé dans ce domaine.
      </div>
    );
  }

  const total = projects.length;
  const safeIndex = currentIndex % total;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Drag physics for top card
  const dragX = useMotionValue(0);
  const rotateDrag = useTransform(dragX, [-200, 200], [-12, 12]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 70) {
      handlePrev();
    } else if (info.offset.x < -70) {
      handleNext();
    }
  };

  return (
    <div className="relative py-8">
      
      {/* Top Deck Info Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[#1A1A1A]/[0.06]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#00B2A9]/10 text-[#00B2A9] uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Nuancier Interactif
          </span>
          <span className="font-mono text-xs text-[#717171]">
            {safeIndex + 1} / {total}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-white hover:bg-[#00B2A9] hover:text-white border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A] transition-colors shadow-sm"
            title="Précédent"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-white hover:bg-[#00B2A9] hover:text-white border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A] transition-colors shadow-sm"
            title="Suivant"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Fan Deck Display Stage */}
      <div className="relative min-h-[520px] md:min-h-[580px] flex items-center justify-center perspective-1000 my-4 overflow-visible">
        <div className="relative w-full max-w-lg md:max-w-xl h-[460px] md:h-[500px] flex items-center justify-center">
          {projects.map((project, index) => {
            const relativeIndex = (index - safeIndex + total) % total;

            if (relativeIndex > 4 && relativeIndex < total - 2) return null;

            const isTop = relativeIndex === 0;
            const offsetFactor = relativeIndex <= 2 ? relativeIndex : relativeIndex - total;

            const rotateAngle = offsetFactor * 6.5;
            const translateX = offsetFactor * 28;
            const translateY = Math.abs(offsetFactor) * 10;
            const scale = isTop ? 1 : 1 - Math.abs(offsetFactor) * 0.04;
            const zIndex = total - Math.abs(offsetFactor);

            return (
              <motion.div
                key={project.slug}
                layoutId={`project-card-${project.slug}`}
                style={{
                  zIndex,
                  ...(isTop ? { x: dragX, rotate: rotateDrag } : {}),
                }}
                animate={{
                  rotate: isTop ? 0 : rotateAngle,
                  x: isTop ? 0 : translateX,
                  y: isTop ? 0 : translateY,
                  scale: scale,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 26,
                }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (isTop) {
                    onSelectProject(project);
                  } else {
                    setCurrentIndex(index);
                  }
                }}
                className={`absolute inset-0 rounded-2xl cursor-pointer border flex flex-col justify-between select-none overflow-hidden transition-colors duration-300 ${
                  isTop
                    ? "bg-[#FFFDF9] border-[#1A1A1A]/15 shadow-xl hover:border-[#00B2A9]"
                    : "bg-[#F5F2EC] border-[#1A1A1A]/08 opacity-90 hover:opacity-100"
                }`}
              >
                {/* Subtle Electric Duck Blue Accent Edge Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#00B2A9] z-10" />

                {/* Cover Image Header if available */}
                {project.coverImage ? (
                  <div className="relative w-full h-44 bg-[#1A1A1A]/5 overflow-hidden shrink-0">
                    <img
                      src={encodeURI(project.coverImage)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-transparent opacity-80" />
                  </div>
                ) : null}

                {/* Card Content Header */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2 font-mono text-[11px] text-[#717171] uppercase tracking-wider">
                      <span>{project.context}</span>
                      <span className="px-2 py-0.5 rounded bg-[#1A1A1A]/[0.05] text-[#1A1A1A] font-semibold">
                        {project.year}
                      </span>
                    </div>

                    <span className="font-mono text-xs text-[#00B2A9] uppercase tracking-widest block mb-1.5 font-semibold">
                      {project.role}
                    </span>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1A1A1A] tracking-tight leading-tight mb-2">
                      {project.title}
                    </h3>

                    <p className="text-[#4A4A4A] font-body text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  {/* Card Content Footer */}
                  <div className="pt-4 mt-2 border-t border-[#1A1A1A]/[0.06] flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#1A1A1A]/[0.04] text-[#4A4A4A]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#00B2A9] hover:text-[#1A1A1A] transition-colors shrink-0"
                    >
                      <span>Explorer</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Swatch Quick Selector Pills */}
      <div className="max-w-3xl mx-auto mt-8 pt-4 flex items-center justify-center overflow-x-auto no-scrollbar gap-2 py-2">
        {projects.map((project, idx) => {
          const isActive = idx === safeIndex;
          return (
            <button
              key={project.slug}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3 py-1.5 rounded-full font-mono text-[11px] transition-all flex items-center gap-2 border ${
                isActive
                  ? "bg-[#1A1A1A] text-[#FBF9F6] border-[#1A1A1A]"
                  : "bg-white text-[#717171] border-[#1A1A1A]/10 hover:text-[#1A1A1A] hover:border-[#00B2A9]"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#00B2A9]" : "bg-[#1A1A1A]/20"}`} />
              <span className="truncate max-w-[130px]">{project.title}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
