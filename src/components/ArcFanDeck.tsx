"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "@/lib/projects";
import Image from "next/image";

interface ArcFanDeckProps {
  projects: ProjectData[];
  activeDomain: string;
  onSelectProject: (project: ProjectData) => void;
}

export default function ArcFanDeck({ projects, activeDomain, onSelectProject }: ArcFanDeckProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = projects.length;
  const middleIndex = (total - 1) / 2;

  // Staggered choreography for category switching
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: 1,
      },
    },
  };

  return (
    <div className="absolute -bottom-24 md:-bottom-32 left-0 right-0 w-full h-[600px] md:h-[680px] flex items-end justify-center overflow-visible pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDomain}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full max-w-4xl h-full flex items-end justify-center pointer-events-auto"
        >
          {projects.map((project, index) => {
            const offset = index - middleIndex;
            
            // Goldilocks spacing (~13.5vw - 14vw) for perfectly readable card edges and zero overflow
            const xStep = total > 3 ? 13.2 : 14.2;
            const rotateStep = total > 3 ? 9.5 : 10.5;

            const rotateAngle = offset * rotateStep;
            const xOffset = offset * xStep; // Goldilocks horizontal spread
            const yBase = Math.abs(offset) * 22; // parabolic arc drop
            
            const isHovered = hoveredIndex === index;
            const isAnotherHovered = hoveredIndex !== null && !isHovered;

            // When hovered: pull straight out of the deck (translate Y up by 45px) while CONSERVING xOffset and rotateAngle!
            const currentY = isHovered ? yBase - 45 : yBase;
            const zIndex = isHovered ? 50 : 10 + index;
            const opacity = isAnotherHovered ? 0.45 : 1;

            // Tag accent styling
            const tagBg =
              project.slug.includes("solisseo")
                ? "bg-[#FF5A5F]/15 text-[#FF5A5F] border-[#FF5A5F]/20"
                : project.slug.includes("radaz")
                ? "bg-[#E2FF31]/25 text-[#1A1A1A] border-[#E2FF31]/50 font-bold"
                : "bg-[#00B2A9]/10 text-[#00B2A9] border-[#00B2A9]/20";

            return (
              <motion.div
                key={project.slug}
                variants={{
                  initial: {
                    opacity: 0,
                    x: "-25vw",
                    rotate: rotateAngle - 12,
                    y: yBase + 100,
                  },
                  animate: {
                    opacity: 1,
                    x: `${xOffset}vw`,
                    y: yBase,
                    rotate: rotateAngle,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 24,
                    },
                  },
                  exit: {
                    opacity: 0,
                    x: `${xOffset + 25}vw`,
                    rotate: rotateAngle + 12,
                    y: yBase + 120,
                    transition: {
                      duration: 0.22,
                      ease: "easeIn",
                    },
                  },
                }}
                animate={{
                  x: `${xOffset}vw`,
                  y: currentY,
                  rotate: rotateAngle,
                  opacity: opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 26,
                }}
                style={{
                  transformOrigin: "bottom center",
                  zIndex: zIndex,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelectProject(project)}
                className={`absolute bottom-0 w-72 sm:w-80 md:w-88 lg:w-[21vw] max-w-[340px] h-[520px] sm:h-[560px] md:h-[620px] rounded-t-3xl cursor-pointer border-t border-x border-[#1A1A1A]/10 select-none transition-colors duration-200 flex flex-col justify-between overflow-hidden shadow-lg pb-28 md:pb-36 ${
                  isHovered
                    ? "bg-[#FFFDF9] border-[#00B2A9] shadow-2xl"
                    : "bg-[#FFFDF9]/95 hover:border-[#00B2A9]/40"
                }`}
              >
                {/* Upper Half: Visual / Image Header */}
                {project.coverImage ? (
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#1A1A1A]/5 shrink-0 border-b border-[#1A1A1A]/06">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 350px, 450px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-transparent opacity-80" />
                  </div>
                ) : (
                  <div className="w-full h-36 bg-[#1A1A1A]/5 shrink-0 flex items-center justify-center font-display font-bold text-lg text-[#717171]">
                    {project.title.substring(0, 2)}
                  </div>
                )}

                {/* Lower Half: Card Content (Clash Display Title & Averia Body) */}
                <div className="p-6 pt-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-body text-xs text-[#00B2A9] font-bold uppercase tracking-wider block mb-1">
                      {project.role}
                    </span>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1A1A1A] tracking-tight leading-tight mb-2">
                      {project.title}
                    </h3>

                    <p className="font-body text-xs text-[#5A5A5A] leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  {/* Minimalist Tag with Accent Color */}
                  <div className="pt-3 border-t border-[#1A1A1A]/[0.06] flex items-center justify-between font-body text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className={`font-body text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${tagBg}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="text-[#00B2A9] font-bold">→</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
