"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, SlidersHorizontal, Sparkles } from "lucide-react";
import { Project, PILLARS } from "@/data/projects";

interface NuancierCarouselProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function NuancierCarousel({ projects, onSelectProject }: NuancierCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fanSpread, setFanSpread] = useState(1); // 0 (Compact Stack) -> 1 (Full Fan Spread)
  const [viewMode, setViewMode] = useState<"fan" | "deck">("fan");

  const total = projects.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Drag physics motion values for swiping top card
  const dragX = useMotionValue(0);
  const rotateDrag = useTransform(dragX, [-200, 200], [-15, 15]);
  const opacityDrag = useTransform(dragX, [-200, -100, 0, 100, 200], [0.5, 0.9, 1, 0.9, 0.5]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 80) {
      handlePrev();
    } else if (info.offset.x < -80) {
      handleNext();
    }
  };

  return (
    <div className="relative py-12 px-4 md:px-0">
      
      {/* Nuancier Controls Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-white/10 text-white uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            NUANCIER INTERACTIF
          </span>
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider hidden sm:inline">
            {currentIndex + 1} / {total} PROJETS
          </span>
        </div>

        {/* Interactive Fan & View Toggles */}
        <div className="flex items-center gap-4 font-mono text-xs">
          
          {/* Fan Spread Slider */}
          <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-lg">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-400 text-[11px] uppercase tracking-wider">Éventail</span>
            <input
              type="range"
              min="0"
              max="1.5"
              step="0.1"
              value={fanSpread}
              onChange={(e) => setFanSpread(parseFloat(e.target.value))}
              className="w-20 accent-white bg-zinc-800 cursor-pointer h-1 rounded-lg"
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors"
              title="Projet précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors"
              title="Projet suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Nuancier Swatch Fan Stack Stage */}
      <div className="relative min-h-[520px] md:min-h-[580px] flex items-center justify-center perspective-1000 my-4 overflow-visible">
        
        <div className="relative w-full max-w-lg md:max-w-xl h-[460px] md:h-[500px] flex items-center justify-center">
          {projects.map((project, index) => {
            // Calculate relative index from current
            const relativeIndex = (index - currentIndex + total) % total;
            
            // Only render cards that are close to active view to maintain 60fps performance
            if (relativeIndex > 5 && relativeIndex < total - 2) return null;

            // Compute stacked fan properties
            const isTop = relativeIndex === 0;
            const offsetFactor = relativeIndex <= 3 ? relativeIndex : relativeIndex - total;
            
            // Angle and displacement calculation for the Fan Effect (Nuancier)
            const rotateAngle = offsetFactor * 7 * fanSpread;
            const translateX = offsetFactor * 32 * fanSpread;
            const translateY = Math.abs(offsetFactor) * 12 * fanSpread;
            const scale = isTop ? 1 : 1 - Math.abs(offsetFactor) * 0.04;
            const zIndex = total - Math.abs(offsetFactor);

            const pillar = PILLARS.find((p) => p.id === project.pillarId);
            const accentColor = pillar?.accentColor || "#38bdf8";

            return (
              <motion.div
                key={project.id}
                style={{
                  zIndex,
                  ...(isTop ? { x: dragX, rotate: rotateDrag, opacity: opacityDrag } : {}),
                }}
                animate={{
                  rotate: isTop ? 0 : rotateAngle,
                  x: isTop ? 0 : translateX,
                  y: isTop ? 0 : translateY,
                  scale: scale,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
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
                className={`absolute inset-0 rounded-2xl p-8 md:p-10 cursor-pointer shadow-2xl border border-white/10 flex flex-col justify-between select-none transition-all duration-300 ${
                  isTop
                    ? "bg-[#121215] border-white/20 hover:border-white/30"
                    : "bg-[#0d0d10] opacity-90 hover:opacity-100"
                }`}
              >
                {/* Nuancier Color Accent Top Edge Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-2.5 rounded-t-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}55)`,
                  }}
                />

                {/* Card Top Meta */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6 pt-2">
                    <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-zinc-400">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span>PILIER {pillar?.number}</span>
                      <span>•</span>
                      <span>{project.context}</span>
                    </div>

                    <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-white/[0.06] text-white border border-white/10">
                      {project.year}
                    </span>
                  </div>

                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-2">
                    {project.role}
                  </span>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight mb-4">
                    {project.title}
                  </h3>

                  <p className="text-zinc-300 text-sm leading-relaxed font-sans line-clamp-4">
                    {project.summary}
                  </p>
                </div>

                {/* Card Bottom Actions */}
                <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.05]"
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
                    className="flex items-center gap-1.5 text-xs font-mono text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                  >
                    <span>Inspecter</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Swatch Quick Picker Bar (Bottom Nuancier Color Tiles) */}
      <div className="max-w-4xl mx-auto mt-10 pt-6 border-t border-white/[0.06] flex items-center justify-center overflow-x-auto no-scrollbar gap-2 py-2">
        {projects.map((project, idx) => {
          const isActive = idx === currentIndex;
          const pillar = PILLARS.find((p) => p.id === project.pillarId);
          const accentColor = pillar?.accentColor || "#ffffff";

          return (
            <button
              key={project.id}
              onClick={() => setCurrentIndex(idx)}
              className={`group relative px-3 py-2 rounded-lg font-mono text-[11px] transition-all flex items-center gap-2 border ${
                isActive
                  ? "bg-white/10 text-white border-white/20"
                  : "bg-white/[0.02] text-zinc-400 hover:text-zinc-200 border-white/[0.04]"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125"
                style={{ backgroundColor: accentColor }}
              />
              <span className="truncate max-w-[120px]">{project.title}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
