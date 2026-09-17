import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "@/lib/projects";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import { formatImageUrl } from "@/lib/utils";

interface ArcFanDeckProps {
  projects: ProjectData[];
  activeDomain: string;
  onSelectProject: (project: ProjectData) => void;
}

function getCompanyInfo(project: ProjectData): { name: string; logo: string } {
  const ctx = (project.context || "").toLowerCase();
  const title = (project.title || "").toLowerCase();
  const slug = (project.slug || "").toLowerCase();

  if (title.includes("soudeur") || slug.includes("siege-ergonomique") || ctx.includes("natran") || title.includes("natran")) {
    return { name: "NaTran", logo: "/assets/logos/logos entreprises/logoNatran.webp" };
  }
  if (ctx.includes("radaz") || title.includes("radaz") || slug.includes("restaurant-altitude")) {
    return { name: "Le Radaz", logo: "/assets/logos/logos entreprises/LogoRadaz.svg" };
  }
  if (ctx.includes("renault") || title.includes("telmi") || title.includes("r5")) {
    return { name: "Renault Group", logo: "/assets/logos/logos entreprises/logoRenault.webp" };
  }
  if (ctx.includes("oréal") || ctx.includes("brandstorm") || title.includes("solisséo") || title.includes("solisseo")) {
    return { name: "L'Oréal Brandstorm", logo: "/assets/logos/logos entreprises/logolOreal.webp" };
  }
  if (ctx.includes("natran") || ctx.includes("grtgaz") || title.includes("natran")) {
    return { name: "Natran / GRTgaz", logo: "/assets/logos/logos entreprises/logoNatran.webp" };
  }
  if (ctx.includes("algoé") || ctx.includes("algoe")) {
    return { name: "Algoé Consultants", logo: "/assets/logos/logos entreprises/logoAlgoe.webp" };
  }
  if (ctx.includes("elanavriin")) {
    return { name: "Elanavriin", logo: "/assets/logos/logos entreprises/logoElanavriin.webp" };
  }
  if (ctx.includes("dôme") || ctx.includes("dome") || title.includes("dôme") || title.includes("vision")) {
    return { name: "Vision Dôme", logo: "/assets/logos/logos entreprises/logoVisionDome.webp" };
  }
  if (title.includes("72h") || title.includes("agile") || title.includes("agiles")) {
    return { name: "72h Agiles", logo: "/assets/logos/logos entreprises/logoCarsat.webp" };
  }
  if (ctx.includes("carsat") || title.includes("carsat")) {
    return { name: "CARSAT Moselle", logo: "/assets/logos/logos entreprises/logoCarsat.webp" };
  }

  return { name: project.context || "BAUM Studio", logo: "/assets/logos/logos entreprises/logoRenault.webp" };
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
      <div className="w-full max-w-sm mx-auto px-4 pt-6 pb-8 flex flex-col items-center justify-center pointer-events-auto relative select-none">
        
        {/* 3D Card Stack Container with Airy Vertical Protrusion */}
        <div className="relative w-full h-[450px] flex items-center justify-center">
          <AnimatePresence>
            {deckList.slice(0, 3).map((project, idx) => {
              const isTop = idx === 0;
              const company = getCompanyInfo(project);

              // Airy Stack offsets: cards 1 & 2 protrude significantly upwards (-48px and -96px)
              const scale = isTop ? 1 : idx === 1 ? 0.94 : 0.88;
              const yOffset = isTop ? 0 : idx === 1 ? -48 : -96;
              const zIndex = isTop ? 30 : idx === 1 ? 20 : 10;
              const opacity = isTop ? 1 : idx === 1 ? 0.95 : 0.85;
              const rotation = isTop ? 0 : idx === 1 ? -3 : 3;

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
                  className={`w-[86vw] max-w-[330px] h-[410px] sm:h-[430px] rounded-3xl bg-[#FFFDF9] dark:bg-[#0F172A] border border-[#1A1A1A]/12 dark:border-slate-800 shadow-xl p-4 flex flex-col justify-between cursor-grab active:cursor-grabbing overflow-hidden transition-colors duration-500 ${
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] dark:from-[#0F172A] via-transparent to-transparent opacity-60" />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-[#1A1A1A]/5 dark:bg-slate-800 shrink-0 rounded-2xl flex items-center justify-center font-display font-bold text-xl text-[#717171] dark:text-slate-400">
                      {project.title.substring(0, 2)}
                    </div>
                  )}

                  {/* Card Content - Pure & Épuré */}
                  <div className="flex-1 flex flex-col justify-start pt-3 pb-16">
                    <div>
                      <span className="font-body text-xs text-[#00B2A9] font-medium uppercase tracking-wider block mb-1">
                        {project.role}
                      </span>
                      <h3 className="font-display font-semibold text-base text-[#1A1A1A] dark:text-slate-100 tracking-tight leading-tight mb-1">
                        {project.title}
                      </h3>
                      <p className="font-body text-xs text-[#5A5A5A] dark:text-slate-300 leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>
                    </div>

                    {/* Company & Real Image Logo Header */}
                    <div className="mt-4 pt-2.5 border-t border-[#1A1A1A]/[0.08] dark:border-slate-800 flex items-center justify-between font-body text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-6 px-2 rounded-full bg-white dark:bg-[#1E293B] border border-[#1A1A1A]/10 dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                          <img
                            src={formatImageUrl(company.logo)}
                            alt={company.name}
                            className="h-4 sm:h-4.5 w-auto max-w-[70px] object-contain shrink-0"
                          />
                        </div>
                        <span className="font-body text-xs font-semibold text-[#1A1A1A] dark:text-slate-200 truncate max-w-[180px]">
                          {company.name}
                        </span>
                      </div>
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
    <div className="relative w-full h-[480px] md:h-[520px] flex items-end justify-center overflow-visible pointer-events-none pb-0">
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
            const company = getCompanyInfo(project);

            const xStep = total > 3 ? 13.2 : 14.2;
            const rotateStep = total > 3 ? 9.5 : 10.5;

            const rotateAngle = offset * rotateStep;
            const xOffset = offset * xStep;
            const yBase = Math.abs(offset) * 22; // parabolic arc drop
            
            const isHovered = hoveredIndex === index;
            const isAnotherHovered = hoveredIndex !== null && !isHovered;

            // When hovered: pull straight out of the deck while CONSERVING xOffset and rotateAngle!
            const currentY = isHovered ? yBase - 45 : yBase;
            const zIndex = isHovered ? 25 : 10 + index;
            const opacity = isAnotherHovered ? 0.45 : 1;

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
                className={`absolute bottom-0 w-80 md:w-88 lg:w-[21vw] max-w-[340px] h-[440px] md:h-[480px] rounded-t-3xl cursor-pointer border-t border-x border-[#1A1A1A]/10 dark:border-slate-800 select-none transition-colors duration-200 flex flex-col justify-start overflow-hidden shadow-lg pb-16 ${
                  isHovered
                    ? "bg-[#FFFDF9] dark:bg-[#0F172A] border-[#00B2A9] shadow-2xl"
                    : "bg-[#FFFDF9]/95 dark:bg-[#0F172A]/95 hover:border-[#00B2A9]/40"
                }`}
              >
                {/* Upper Half: Visual / Image Header */}
                {project.coverImage ? (
                  <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-[#1A1A1A]/5 shrink-0 border-b border-[#1A1A1A]/06">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="450px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] dark:from-[#0F172A] via-transparent to-transparent opacity-80" />
                  </div>
                ) : (
                  <div className="w-full h-36 bg-[#1A1A1A]/5 dark:bg-slate-800 shrink-0 flex items-center justify-center font-display font-bold text-lg text-[#717171] dark:text-slate-400">
                    {project.title.substring(0, 2)}
                  </div>
                )}

                {/* Upper Half: Card Content - Grouped cleanly above slot line */}
                <div className="p-5 pt-3 flex flex-col justify-start">
                  <div>
                    <span className="font-body text-xs text-[#00B2A9] font-medium uppercase tracking-wider block mb-1">
                      {project.role}
                    </span>

                    <h3 className="font-display font-semibold text-lg sm:text-xl text-[#1A1A1A] dark:text-slate-100 tracking-tight leading-tight mb-1.5">
                      {project.title}
                    </h3>

                    <p className="font-body text-xs text-[#5A5A5A] dark:text-slate-300 leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  {/* Company & Real Image Logo Header */}
                  <div className="mt-4 pt-2.5 border-t border-[#1A1A1A]/[0.08] dark:border-slate-800 flex items-center justify-between font-body text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-6 px-2 rounded-full bg-white dark:bg-[#1E293B] border border-[#1A1A1A]/10 dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                        <img
                          src={formatImageUrl(company.logo)}
                          alt={company.name}
                          className="h-3.5 sm:h-4 w-auto max-w-[75px] object-contain shrink-0"
                        />
                      </div>
                      <span className="font-body text-xs font-semibold text-[#1A1A1A] dark:text-slate-200 truncate max-w-[170px]">
                        {company.name}
                      </span>
                    </div>

                    <span className="text-[#00B2A9] font-bold text-sm">→</span>
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



