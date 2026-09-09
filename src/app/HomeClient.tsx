"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ArcFanDeck from "@/components/ArcFanDeck";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import StudioFlipbookButton from "@/components/StudioFlipbookButton";
import { ProjectData } from "@/lib/projects";

const DOMAINS = [
  "Product Management & Tech",
  "Stratégie & Expérience Client",
  "Direction Artistique & Design",
] as const;

export type DomainType = (typeof DOMAINS)[number];

export default function HomeClient({ projects }: { projects: ProjectData[] }) {
  const [activeDomain, setActiveDomain] = useState<DomainType>("Product Management & Tech");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Intro State: Triggered STRICTLY on the user's FIRST scroll / wheel / touch gesture
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const triggerScroll = () => {
      setHasScrolled(true);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5 || Math.abs(e.deltaX) > 5) {
        triggerScroll();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) > 10) {
        triggerScroll();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space", " "].includes(e.key)) {
        triggerScroll();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Compute count of projects per domain from REAL markdown files
  const counts = useMemo(() => {
    const res: Record<string, number> = {};
    projects.forEach((p) => {
      res[p.domain] = (res[p.domain] || 0) + 1;
    });
    return res;
  }, [projects]);

  // Filter projects by active domain from REAL markdown files (ZERO hallucination)
  const activeProjects = useMemo(() => {
    return projects.filter((p) => p.domain === activeDomain);
  }, [projects, activeDomain]);

  // Conditional check for BAUM Studio link (ONLY visible in Direction Artistique & Design)
  const isDesignDomain = activeDomain === "Direction Artistique & Design";

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F0EBE1] text-[#1A1A1A] font-body selection:bg-[#00B2A9]/20 selection:text-[#1A1A1A] flex flex-col justify-between p-4 sm:p-8 md:p-12 relative">
      
      {/* 1. INITIAL CENTERED INTRO OVERLAY (VISIBLE BEFORE FIRST SCROLL) */}
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            onClick={() => setHasScrolled(true)}
            className="fixed inset-0 z-50 bg-[#F0EBE1] flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 text-center cursor-pointer select-none"
          >
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
              className="font-body font-medium text-sm sm:text-lg md:text-xl text-[#5A5A5A] max-w-2xl mt-4 sm:mt-6 leading-relaxed"
            >
              Ingénieur innovation, Product Manager & Directeur Artistique. Un profil hybride reliant la stratégie produit, la conception technique et le design visuel pour développer des solutions numériques complètes.
            </motion.p>

            {/* Subtle Scroll Call-to-Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute bottom-8 sm:bottom-10 flex flex-col items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-widest font-display text-[#1A1A1A]/60"
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
            <motion.h1
              layoutId="name"
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A] tracking-tight leading-none uppercase"
            >
              Matthieu BAUDIER
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: hasScrolled ? 1 : 0, y: hasScrolled ? 0 : 10 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-semibold text-lg sm:text-xl md:text-2xl text-[#5A5A5A] tracking-tight mt-1.5 sm:mt-2"
            >
              Ingénieur innovation & Produit
            </motion.h2>
          </div>

          {/* Minimalist Navigation Pills + Studio Flipbook CTA strictly on the SAME LINE */}
          <motion.nav
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: hasScrolled ? 1 : 0, y: hasScrolled ? 0 : 15 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="w-full flex items-center justify-between gap-2 sm:gap-3 pt-1 overflow-hidden"
          >
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto snap-x no-scrollbar min-w-0 flex-1 py-1 pr-1">
              {DOMAINS.map((domain, idx) => {
                const isActive = activeDomain === domain;
                const count = counts[domain] || 0;

                // Color accents per domain: Bleu Canard, Corail, Jaune Acide
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
                    className={`snap-start shrink-0 relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-display text-[11px] sm:text-xs md:text-sm tracking-tight transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 sm:gap-2 border ${
                      isActive
                        ? `${activeBg} shadow-sm font-bold scale-105`
                        : "bg-white/70 text-[#5A5A5A] border-[#1A1A1A]/10 hover:text-[#1A1A1A] hover:border-[#00B2A9]/40 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span>{domain}</span>
                    <span
                      className={`font-body text-[10px] px-1.5 sm:px-2 py-0.2 rounded-full ${
                        isActive
                          ? idx === 2 ? "bg-[#1A1A1A]/10 text-[#1A1A1A]" : "bg-white/20 text-white"
                          : "bg-[#1A1A1A]/[0.06] text-[#5A5A5A]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Contextual Studio Flipbook CTA on the EXACT SAME HORIZONTAL LINE */}
            <AnimatePresence>
              {hasScrolled && isDesignDomain && (
                <StudioFlipbookButton key="studio-flipbook-button" />
              )}
            </AnimatePresence>
          </motion.nav>
        </div>

        {/* Right Column: Profile Picture (Strict Perfect Circle Container) */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: hasScrolled ? 1 : 0, scale: hasScrolled ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#1A1A1A]/10 shadow-sm bg-[#1A1A1A]/05 group"
          >
            <Image
              src="/assets/PhotoDeProfil.webp"
              alt="Matthieu Baudier"
              fill
              sizes="80px"
              priority
              className="object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
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
