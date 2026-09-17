"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import AboutBentoSection from "@/components/AboutBentoSection";
import FooterSection from "@/components/FooterSection";
import ArcFanDeck from "@/components/ArcFanDeck";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import StudioFlipbookButton from "@/components/StudioFlipbookButton";
import { ProjectData } from "@/lib/projects";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

const DOMAINS = [
  "Product Management & Tech",
  "Stratégie & Expérience Client",
  "Direction Artistique & Design",
] as const;

export type DomainType = (typeof DOMAINS)[number];

function HomeContent({ projects }: { projects: ProjectData[] }) {
  const { lang, translate } = useLanguage();
  const [activeDomain, setActiveDomain] = useState<DomainType>("Product Management & Tech");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const domainLabels: Record<DomainType, { fr: string; en: string }> = {
    "Product Management & Tech": {
      fr: "Product Management & Tech",
      en: "Product Management & Tech",
    },
    "Stratégie & Expérience Client": {
      fr: "Stratégie & Expérience Client",
      en: "Strategy & Customer Experience",
    },
    "Direction Artistique & Design": {
      fr: "Direction Artistique & Design",
      en: "Art Direction & Design",
    },
  };

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

  return (
    <div className="min-h-screen w-full bg-[#FCFAF8] dark:bg-[#0B0F19] text-slate-900 dark:text-[#F0EBE1] font-body selection:bg-[#00B2A9]/20 selection:text-[#1A1A1A] overflow-x-hidden relative transition-colors duration-500">
      
      {/* Dynamic Auto-hide Header */}
      <Header />

      {/* 1. Welcoming Hero (h-screen) */}
      <HeroSection />

      {/* 2. Expertise & Tech Stack Section */}
      <ExpertiseSection />

      {/* 3. Projects Section (Domain Selector + Interactive Fan Deck) */}
      <section id="projets" className="w-full py-12 flex flex-col items-start gap-8 relative overflow-visible bg-[#FCFAF8] dark:bg-[#0B0F19] transition-colors duration-500">
        {/* Header Title */}
        <div className="w-full flex flex-col items-start text-left px-[6%] md:px-[10%]">
          <h2
            className="font-medium text-4xl md:text-5xl text-[#00B2A9] tracking-tight leading-none text-left"
            style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 500 }}
          >
            {translate("Projets sélectionnés", "Selected Projects")}
          </h2>
        </div>

        {/* Filters & Studio CTA Bar (Full width max-w-6xl with justify-between) */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200/60 dark:border-slate-800/80 pb-6 px-[6%] md:px-[10%]">
          {/* À gauche : Les 3 Filtres */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {DOMAINS.map((domain, idx) => {
              const isActive = activeDomain === domain;
              const count = counts[domain] || 0;
              const label = lang === "en" ? domainLabels[domain].en : domainLabels[domain].fr;

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
                  className={`shrink-0 relative px-4 py-2 rounded-full font-display text-xs sm:text-sm tracking-tight transition-all duration-300 flex items-center gap-2 border ${
                    isActive
                      ? `${activeBg} shadow-sm font-bold scale-105`
                      : "bg-[#FFFDF9] dark:bg-slate-900 text-[#5A5A5A] dark:text-slate-300 border-[#1A1A1A]/10 dark:border-slate-800 hover:text-[#1A1A1A] dark:hover:text-white hover:border-[#00B2A9]/40"
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-current"
                        : "bg-[#1A1A1A]/10 dark:bg-slate-800 text-[#5A5A5A] dark:text-slate-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* À droite : Le Bouton Studio */}
          <div className="shrink-0 self-start sm:self-auto">
            <StudioFlipbookButton />
          </div>
        </div>

        {/* The 3D Mobile Deck / Desktop Arc Fan Deck with Lowered Centered Slot Line */}
        <div className="w-full flex items-center justify-center relative h-[480px] md:h-[520px] pt-1 overflow-hidden">
          <ArcFanDeck
            activeDomain={activeDomain}
            projects={activeProjects}
            onSelectProject={setSelectedProject}
          />
          {/* Ligne de coupe Fente élargie et élégamment centrée */}
          <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 w-[85%] md:w-[65%] max-w-4xl h-[1.5px] bg-stone-300 dark:bg-slate-700 z-30 pointer-events-none"></div>
          {/* Le Masque cache beige aligné exactement sous la ligne */}
          <div className="absolute bottom-0 left-0 w-full h-8 md:h-10 bg-[#FCFAF8] dark:bg-[#0B0F19] z-30 pointer-events-none transition-colors duration-500"></div>
        </div>
      </section>

      {/* 4. About Bento Box */}
      <AboutBentoSection />

      {/* 5. Minimalist Magnetic Contact Footer */}
      <FooterSection />

      {/* Expanded Project Case Study View Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}

export default function HomeClient({ projects }: { projects: ProjectData[] }) {
  return (
    <LanguageProvider>
      <HomeContent projects={projects} />
    </LanguageProvider>
  );
}
