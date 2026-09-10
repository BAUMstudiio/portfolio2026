"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "@/lib/projects";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";

interface ArcFanDeckProps {
  projects: ProjectData[];
  activeDomain: string;
  onSelectProject: (project: ProjectData) => void;
}

export default function ArcFanDeck({ projects, activeDomain, onSelectProject }: ArcFanDeckProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { isMobile } = useWindowSize();

  // Mobile 3D Stack Deck state
  const [deckList, setDeckList] = useState<ProjectData[]>(projects);

  // Sync deckList when category changes or projects prop changes
  useEffect(() => {
    setDeckList(projects);
  }, [projects, activeDomain]);

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

  // ---------------------------------------------------------------------------
  // MOBILE LAYOUT (< 768px): Airy 3D Stacked Deck (Purified Minimalist Swipe)
  // ---------------------------------------------------------------------------
  if (isMobile) {
    const cycleNextCard = () => {
      setDeckList((prev) => (prev.length > 1 ? [...prev.slice(1), prev[0]] : prev));
    };

    return (
      <div className="w-full max-w-sm mx-auto px-4 pt-16 pb-8 flex flex-col items-center justify-center pointer-events-auto relative select-none">
        
        {/* 3D Card Stack Container with Airy Vertical Protrusion */}
        <div className="relative w-full h-[470px] flex items-center justify-center">
          <AnimatePresence>
            {deckList.slice(0, 3).map((project, idx) => {
              const isTop = idx === 0;

              // Airy Stack offsets: cards 1 & 2 protrude significantly upwards (-48px and -96px)
              const scale = isTop ? 1 : idx === 1 ? 0.94 : 0.88;
              const yOffset = isTop ? 0 : idx === 1 ? -48 : -96;
              const zIndex = isTop ? 30 : idx === 1 ? 20 : 10;
              const opacity = isTop ? 1 : idx === 1 ? 0.95 : 0.85;
              const rotation = isTop ? 0 : idx === 1 ? -3 : 3;

              const tagBg =
                project.slug.includes("solisseo")
                  ? "bg-[#FF5A5F]/15 text-[#FF5A5F] border-[#FF5A5F]/20"
                  : project.slug.includes("radaz")
                  ? "bg-[#E2FF31]/25 text-[#1A1A1A] border-[#E2FF31]/50 font-bold"
                  : "bg-[#00B2A9]/10 text-[#00B2A9] border-[#00B2A9]/20";

              return (
                <motion.div
                  key={project.slug}
                  layout
                  layoutId={`project-card-${project.slug}`}
                  initial={{ scale: 0.8, y: -80, opacity: 0 }}
                  animate={{
                    scale,
                    y: yOffset,
                    opacity,
                    rotate: rotation,
                  }}
                  exit={{
                    x: 320,
                    opacity: 0,
                    rotate: 22,
                    transition: { duration: 0.24 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 25,
                  }}
                  style={{
                    zIndex,
                    position: "absolute",
                  }}
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.65}
                  onDragEnd={(e, info) => {
                    if (!isTop) return;
                    if (
                      Math.abs(info.offset.x) > 90 ||
                      Math.abs(info.velocity.x) > 350
                    ) {
                      cycleNextCard();
                    } else if (
                      Math.abs(info.offset.x) < 8 &&
                      Math.abs(info.offset.y) < 8
                    ) {
                      onSelectProject(project);
                    }
                  }}
                  onClick={() => {
                    if (isTop) {
                      onSelectProject(project);
                    }
                  }}
                  className={`w-[86vw] max-w-[330px] h-[410px] sm:h-[430px] rounded-3xl bg-[#FFFDF9] border border-[#1A1A1A]/12 shadow-xl p-4 flex flex-col justify-between cursor-grab active:cursor-grabbing overflow-hidden ${
                    isTop ? "touch-pan-y" : "pointer-events-none"
                  }`}
                >
                  {/* Visual Header */}
                  {project.coverImage ? (
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-[#1A1A1A]/5 shrink-0 border border-[#1A1A1A]/06">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        sizes="320px"
                        className="object-cover"
                        priority={isTop}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-transparent opacity-60" />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-[#1A1A1A]/5 rounded-2xl shrink-0 flex items-center justify-center font-display font-bold text-xl text-[#717171]">
                      {project.title.substring(0, 2)}
                    </div>
                  )}

                  {/* Card Content - Pure & Épuré (Complete description without line-clamp truncation) */}
                  <div className="flex-1 flex flex-col justify-between pt-3">
                    <div>
                      <span className="font-body text-xs text-[#00B2A9] font-bold uppercase tracking-wider block mb-1">
                        {project.role}
                      </span>
                      <h3 className="font-display font-bold text-base text-[#1A1A1A] tracking-tight leading-tight mb-1">
                        {project.title}
                      </h3>
                      <p className="font-body text-xs text-[#5A5A5A] leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#1A1A1A]/[0.08] flex items-center justify-between font-body text-xs">
                      <span className={`font-body text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${tagBg}`}>
                        {project.tags[0] || project.year}
                      </span>
                      <span className="text-[#00B2A9] font-bold text-sm">→</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // DESKTOP LAYOUT (>= 768px): Signature Awwwards Arc Fan Deck (Parabolic curves)
  // ---------------------------------------------------------------------------
  return (
    <div className="absolute -bottom-24 md:-bottom-32 left-0 right-0 w-full h-[540px] sm:h-[600px] md:h-[680px] flex items-end justify-center overflow-visible pointer-events-none">
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
            
            const xStep = total > 3 ? 13.2 : 14.2;
            const rotateStep = total > 3 ? 9.5 : 10.5;

            const rotateAngle = offset * rotateStep;
            const xOffset = offset * xStep;
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
                    y: yBase + 80,
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
                    y: yBase + 100,
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
                className={`absolute bottom-0 w-80 md:w-88 lg:w-[21vw] max-w-[340px] h-[540px] md:h-[620px] rounded-t-3xl cursor-pointer border-t border-x border-[#1A1A1A]/10 select-none transition-colors duration-200 flex flex-col justify-between overflow-hidden shadow-lg pb-28 md:pb-36 ${
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
                      sizes="450px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-transparent opacity-80" />
                  </div>
                ) : (
                  <div className="w-full h-36 bg-[#1A1A1A]/5 shrink-0 flex items-center justify-center font-display font-bold text-lg text-[#717171]">
                    {project.title.substring(0, 2)}
                  </div>
                )}

                {/* Lower Half: Card Content - Complete description without truncation */}
                <div className="p-6 pt-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-body text-xs text-[#00B2A9] font-bold uppercase tracking-wider block mb-1">
                      {project.role}
                    </span>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1A1A1A] tracking-tight leading-tight mb-2">
                      {project.title}
                    </h3>

                    <p className="font-body text-xs text-[#5A5A5A] leading-relaxed">
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


