"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ArcFanDeck from "@/components/ArcFanDeck";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import StudioFlipbookButton from "@/components/StudioFlipbookButton";
import { ProjectData } from "@/lib/projects";
import { formatImageUrl } from "@/lib/utils";

const DOMAINS = [
  "Product Management & Tech",
  "Stratégie & Expérience Client",
  "Direction Artistique & Design",
] as const;

export type DomainType = (typeof DOMAINS)[number];

const FLOATING_IMAGES = [
  // 1. Upper-Left
  {
    url: formatImageUrl("/assets/Product management & Tech/Produit Onboarding/IntégrationAugmenté.webp"),
    alt: "MyAR Starter",
    className: "top-[6%] left-[3%] sm:left-[5%] md:left-[6%] w-24 sm:w-32 md:w-40 aspect-[4/3] z-1 -rotate-6",
    duration: 6.2,
    delay: 0.1,
    rotate: [-6, -4, -8, -6],
    y: [0, -14, 0],
  },
  // 2. Upper-Right
  {
    url: formatImageUrl("/assets/Marketing:Experience client/Création d’un produit cosmétique/PackshotPackaging.webp"),
    alt: "Solisséo L'Oréal",
    className: "top-[5%] right-[4%] sm:right-[7%] md:right-[9%] w-24 sm:w-32 md:w-40 aspect-[4/3] z-5 rotate-4",
    duration: 5.4,
    delay: 0.4,
    rotate: [4, 6, 2, 4],
    y: [0, -12, 0],
  },
  // 3. Mid-Far-Right
  {
    url: formatImageUrl("/assets/Design & Création/Identité visuelle d’un restaurant d’altitude/Projet_radaz_logo_fondphoto.webp"),
    alt: "Le Radaz",
    className: "top-[36%] right-[2%] sm:right-[4%] md:right-[5%] w-24 sm:w-36 md:w-44 aspect-[4/3] z-2 -rotate-3",
    duration: 7.1,
    delay: 0.2,
    rotate: [-3, -1, -5, -3],
    y: [0, -18, 0],
  },
  // 4. Lower-Right
  {
    url: formatImageUrl("/assets/Marketing:Experience client/Création d’une expérience virtuelle/photoR5.webp"),
    alt: "Immersion VR R5",
    className: "bottom-[6%] right-[3%] sm:right-[6%] md:right-[8%] w-28 sm:w-36 md:w-44 aspect-[4/3] z-6 rotate-5",
    duration: 6.5,
    delay: 0.7,
    rotate: [5, 7, 3, 5],
    y: [0, -15, 0],
  },
  // 5. Lower-Left
  {
    url: formatImageUrl("/assets/Product management & Tech/Projet international ingénieure/VisionDome.webp"),
    alt: "Vision Dôme",
    className: "bottom-[5%] left-[4%] sm:left-[7%] md:left-[9%] w-24 sm:w-32 md:w-40 aspect-[4/3] z-2 -rotate-4",
    duration: 5.9,
    delay: 0.3,
    rotate: [-4, -2, -6, -4],
    y: [0, -13, 0],
  },
  // 6. Mid-Far-Left
  {
    url: formatImageUrl("/assets/Product management & Tech/Conception d’un siège ergonomique/SoudeurEnAction.webp"),
    alt: "Siège Ergonomique Soudeur",
    className: "top-[40%] left-[2%] sm:left-[4%] md:left-[5%] w-24 sm:w-32 md:w-40 aspect-[4/3] z-3 rotate-3",
    duration: 6.7,
    delay: 0.6,
    rotate: [3, 5, 1, 3],
    y: [0, -16, 0],
  },
];

export default function HomeClient({ projects }: { projects: ProjectData[] }) {
  const [activeDomain, setActiveDomain] = useState<DomainType>("Product Management & Tech");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const triggerScroll = () => {
      setHasScrolled(true);
    };

    window.addEventListener("wheel", triggerScroll, { passive: true });
    window.addEventListener("touchmove", triggerScroll, { passive: true });
    window.addEventListener("keydown", triggerScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", triggerScroll);
      window.removeEventListener("touchmove", triggerScroll);
      window.removeEventListener("keydown", triggerScroll);
    };
  }, []);

  const counts = useMemo(() => {
    const res: Record<string, number> = {};
    projects.forEach((p) => {
      res[p.domain] = (res[p.domain] || 0) + 1;
    });
    return res;
  }, [projects]);

  const activeProjects = useMemo(() => {
    return projects.filter((p) => p.domain === activeDomain);
  }, [projects, activeDomain]);

  const isDesignDomain = activeDomain === "Direction Artistique & Design";

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F0EBE1] text-[#1A1A1A] font-body selection:bg-[#00B2A9]/20 selection:text-[#1A1A1A] flex flex-col justify-between p-4 sm:p-8 md:p-12 relative">
      
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            onClick={() => setHasScrolled(true)}
            className="fixed inset-0 z-50 bg-[#F0EBE1] flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 text-center cursor-pointer select-none overflow-hidden"
          >
            {/* Organic Moodboard Disparate Background */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              {FLOATING_IMAGES.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 0.75,
                    scale: 1,
                    y: img.y,
                    rotate: img.rotate,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ opacity: 1, scale: 1.07 }}
                  transition={{
                    opacity: { duration: 0.8, delay: img.delay },
                    scale: { duration: 0.8, delay: img.delay },
                    y: { duration: img.duration, repeat: Infinity, ease: "easeInOut", delay: img.delay },
                    rotate: { duration: img.duration, repeat: Infinity, ease: "easeInOut", delay: img.delay },
                  }}
                  className={`absolute rounded-xl sm:rounded-2xl overflow-hidden border border-[#1A1A1A]/12 shadow-md bg-[#1A1A1A]/05 pointer-events-auto transition-opacity duration-300 ${img.className}`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 180px, 300px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              ))}
            </div>

            {/* Central Text Container (Clean text directly on background, no box or border) */}
            <div className="relative z-30 flex flex-col items-center justify-center max-w-4xl px-4 pointer-events-auto my-auto">
              <motion.h1
                layoutId="name"
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-bold text-4xl sm:text-7xl md:text-8xl lg:text-9xl text-[#1A1A1A] tracking-tight uppercase leading-none"
              >
                Matthieu BAUDIER
              </motion.h1>

              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-[#00B2A9] tracking-tight mt-3 sm:mt-4 uppercase"
              >
                Portfolio
              </motion.span>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-body font-medium text-sm sm:text-lg md:text-xl text-[#5A5A5A] max-w-2xl mt-4 sm:mt-6 leading-relaxed text-center"
              >
                Ingénieur innovation, Product Manager & Directeur Artistique. Un profil hybride reliant la stratégie produit, la conception technique et le design visuel pour développer des solutions numériques complètes.
              </motion.p>
            </div>

            {/* Subtle Scroll Call-to-Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute bottom-8 sm:bottom-10 z-30 flex flex-col items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-widest font-display text-[#1A1A1A]/60"
            >
              <span>Scrollez pour découvrir</span>
              <span className="text-[#00B2A9] font-bold text-sm sm:text-base">↓</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION A. EN-TÊTE (FUNCTIONAL HEADER CREATED ON FIRST SCROLL) */}
      <header className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6 z-20 shrink-0">
        
        {/* Left Column: Morphing Name + Functional Title + Single Horizontal Line Navigation */}
        <div className="space-y-3 sm:space-y-4 w-full max-w-4xl">
          <div>
            {!hasScrolled ? (
              <div className="h-10 sm:h-14" />
            ) : (
              <motion.h1
                layoutId="name"
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-bold text-2xl sm:text-4xl text-[#1A1A1A] tracking-tight uppercase"
              >
                Matthieu BAUDIER
              </motion.h1>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: hasScrolled ? 1 : 0, y: hasScrolled ? 0 : 15 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="font-body text-xs sm:text-sm text-[#5A5A5A] font-medium tracking-wide mt-1"
            >
              Ingénieur innovation, Product Manager & Directeur Artistique
            </motion.h2>
          </div>

          {/* Minimalist Navigation Pills + Studio Flipbook CTA (Flex-wrap on mobile, justify-between on desktop) */}
          <motion.nav
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: hasScrolled ? 1 : 0, y: hasScrolled ? 0 : 15 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-2.5 sm:gap-4 pt-1"
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {DOMAINS.map((domain, idx) => {
                const isActive = activeDomain === domain;
                const count = counts[domain] || 0;

                const activeBg =
                  idx === 0
                    ? "bg-[#00B2A9] text-white border-[#00B2A9]"
                    : idx === 1
                    ? "bg-[#FF5A5F] text-white border-[#FF5A5F]"
                    : "bg-[#E2FF31] text-[#1A1A1A] border-[#E2FF31]";

                return (
                  <button
                    key={domain}
                    onClick={() => setActiveDomain(domain)}
                    className={`shrink-0 relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-display text-[11px] sm:text-xs md:text-sm tracking-tight transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 sm:gap-2 border ${
                      isActive
                        ? `${activeBg} shadow-sm font-bold scale-105`
                        : "bg-white/70 text-[#5A5A5A] border-[#1A1A1A]/10 hover:text-[#1A1A1A] hover:border-[#00B2A9]/40 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span>{domain}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-current"
                          : "bg-[#1A1A1A]/10 text-[#5A5A5A]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Contextual Studio Flipbook CTA pushed to the right on desktop, wrapping on mobile */}
            <AnimatePresence>
              {hasScrolled && isDesignDomain && (
                <StudioFlipbookButton key="studio-flipbook-button" />
              )}
            </AnimatePresence>
          </motion.nav>
        </div>

        {/* Right Column: Profile Picture (Sleek Circle Container - Fits Cleanly) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: hasScrolled ? 1 : 0, scale: hasScrolled ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 border border-[#1A1A1A]/15 shadow-sm bg-[#1A1A1A]/05"
          >
            <Image
              src="/assets/PhotoDeProfil.webp"
              alt="Matthieu Baudier"
              fill
              sizes="(max-width: 768px) 80px, 96px"
              priority
              className="object-cover rounded-full"
            />
          </motion.div>
        </div>

      </header>

      {/* SECTION B. ZONE PROJETS : LE NUANCIER EN ARC DE CERCLE */}
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: hasScrolled ? 1 : 0, y: hasScrolled ? 0 : 50 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="w-full max-w-7xl mx-auto flex-1 flex items-end justify-center relative overflow-visible pt-2"
      >
        <ArcFanDeck
          activeDomain={activeDomain}
          projects={activeProjects}
          onSelectProject={setSelectedProject}
        />
      </motion.main>

      {/* Expanded Project Case Study View */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}
