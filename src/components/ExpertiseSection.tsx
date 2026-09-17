"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { formatImageUrl } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const CLASH_FONT = "'Clash Display', sans-serif";

const EXPERTISE_STEPS_DATA = [
  {
    number: "01",
    title: { fr: "Stratégie & Cadrage", en: "Strategy & Framing" },
    description: {
      fr: "Alignement des équipes, définition de la vision et analyse du marché.",
      en: "Team alignment, vision definition, and market analysis.",
    },
    tags: {
      fr: ["Analyse des besoins", "Analyse de la valeur (AFAV)", "Analyse concurrentielle"],
      en: ["Needs Analysis", "Value Analysis (AFAV)", "Competitive Analysis"],
    },
    offsetClass: "lg:translate-y-4",
  },
  {
    number: "02",
    title: { fr: "Idéation & Innovation", en: "Ideation & Innovation" },
    description: {
      fr: "Génération de concepts nouveaux et résolution de problèmes complexes.",
      en: "New concept generation and complex problem solving.",
    },
    tags: {
      fr: ["Design Thinking", "Double Diamant", "Méthode TRIZ", "Séances de créativité"],
      en: ["Design Thinking", "Double Diamond", "TRIZ Method", "Creativity Workshops"],
    },
    offsetClass: "lg:-translate-y-4",
  },
  {
    number: "03",
    title: { fr: "Design & Conception", en: "Design & Engineering" },
    description: {
      fr: "Matérialisation des idées et définition de l'expérience utilisateur.",
      en: "Materializing ideas and defining the user experience.",
    },
    tags: {
      fr: ["User Journey", "Prototypage rapide", "UX/UI", "Cahier des charges"],
      en: ["User Journey", "Rapid Prototyping", "UX/UI", "Specifications"],
    },
    offsetClass: "lg:translate-y-4",
  },
  {
    number: "04",
    title: { fr: "Déploiement & Industrialisation", en: "Deployment & Industrialization" },
    description: {
      fr: "Passage à l'échelle, mise sur le marché et garantie de la qualité produit.",
      en: "Scaling, go-to-market, and product quality assurance.",
    },
    tags: {
      fr: ["Industrialisation", "Suivi qualité", "Lean Six Sigma"],
      en: ["Industrialization", "Quality Control", "Lean Six Sigma"],
    },
    offsetClass: "lg:-translate-y-4",
  },
];

const STACK_ITEMS = [
  { name: "Figma", logo: "/assets/logos/logos applications/logoFigma.svg" },
  { name: "Illustrator", logo: "/assets/logos/logos applications/logoIllustrator.svg.webp" },
  { name: "Photoshop", logo: "/assets/logos/logos applications/logoPhotophop.svg.webp" },
  { name: "InDesign", logo: "/assets/logos/logos applications/logoInDesign.svg.webp" },
  { name: "Premiere Pro", logo: "/assets/logos/logos applications/logoPremierePro.svg.webp" },
  { name: "VS Code", logo: "/assets/logos/logos applications/logoVSCode.svg.webp" },
  { name: "AntiGravity", logo: "/assets/logos/logos applications/logoAntigravity.webp" },
  { name: "Lovable", logo: "/assets/logos/logos applications/logoLovable.webp" },
  { name: "GitHub Copilot", logo: "/assets/logos/logos applications/logoGithubCopilot.webp" },
  { name: "n8n", logo: "/assets/logos/logos applications/logon8n.webp" },
  { name: "Claude", logo: "/assets/logos/logos applications/logoClaude.svg.webp" },
  { name: "Gemini", logo: "/assets/logos/logos applications/logoGemini.webp" },
  { name: "Perplexity", logo: "/assets/logos/logos applications/logoPreplexity.png" },
  { name: "Onshape", logo: "/assets/logos/logos applications/logoOneShape.webp" },
  { name: "SimaPro", logo: "/assets/logos/logos applications/logoSimaPro.png" },
];

const tagContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.03,
    },
  },
};

const tagItemVariants = {
  hidden: { opacity: 0, y: 4, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function ExpertiseSection() {
  const { lang, translate } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Synchronisation parfaite du chemin : commence dès 90% et atteint 100% exactement au centrage de la section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center center"],
  });

  const rawPathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const pathLength = useSpring(rawPathProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="w-full min-h-screen py-16 flex flex-col justify-center items-start select-none bg-[#FCFAF8] dark:bg-[#0B0F19] transition-colors duration-500 overflow-hidden"
    >
      {/* 1. Titre "Là où j'interviens" - Aligné strictly à gauche */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="w-full text-left mb-8 px-[6%] md:px-[10%]"
      >
        <h2
          className="font-normal text-4xl md:text-5xl text-[#00B2A9] tracking-tight leading-none text-left"
          style={{ fontFamily: CLASH_FONT, fontWeight: 400 }}
        >
          {translate("Là où j'interviens", "Areas of Expertise")}
        </h2>
      </motion.div>

      {/* 2. Undulating Horizontal SVG Wave Pathway */}
      <div className="relative w-full px-[6%] md:px-[10%] my-4">
        {/* Synchronized Wave SVG Line (Desktop) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block overflow-visible z-0 px-[6%] md:px-[10%]"
          viewBox="0 0 1000 240"
          preserveAspectRatio="none"
        >
          <path
            d="M 60 120 C 180 50, 320 190, 440 120 C 560 50, 700 190, 820 120 C 900 70, 940 100, 980 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-900 dark:text-slate-700 opacity-15 dark:opacity-30"
          />
          <motion.path
            d="M 60 120 C 180 50, 320 190, 440 120 C 560 50, 700 190, 820 120 C 900 70, 940 100, 980 120"
            fill="none"
            stroke="#00B2A9"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ pathLength }}
            className="filter drop-shadow-[0_0_10px_rgba(0,178,169,0.75)]"
          />
        </svg>

        {/* 4 Steps Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative z-10 items-center">
          {EXPERTISE_STEPS_DATA.map((step, idx) => {
            const isHovered = hoveredStep === idx;
            const title = lang === "en" ? step.title.en : step.title.fr;
            const description = lang === "en" ? step.description.en : step.description.fr;
            const tags = lang === "en" ? step.tags.en : step.tags.fr;
            const stepPrefix = lang === "en" ? "Step" : "Étape";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`flex flex-col ${step.offsetClass} transition-transform duration-300`}
              >
                {/* Carte d'expertise à contenance stricte (overflow-hidden) */}
                <div
                  className={`bg-white dark:bg-[#0F172A] border rounded-2xl p-6 sm:p-7 shadow-xs transition-all duration-300 relative flex flex-col justify-between w-full min-w-[250px] h-[285px] sm:h-[300px] overflow-hidden ${
                    isHovered
                      ? "border-[#00B2A9] shadow-lg -translate-y-1"
                      : "border-stone-200/80 dark:border-slate-800 hover:border-[#00B2A9]/40"
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-3 shrink-0">
                    <span className="font-display font-semibold text-xs uppercase tracking-widest text-[#00B2A9]">
                      {stepPrefix} {step.number}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isHovered ? "bg-[#00B2A9] shadow-[0_0_8px_#00B2A9] scale-125" : "bg-[#00B2A9]/50"
                      }`}
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 mb-3 shrink-0">
                    <h3
                      className={`font-display font-semibold text-base sm:text-lg leading-snug transition-colors duration-300 ${
                        isHovered ? "text-[#00B2A9]" : "text-slate-900 dark:text-slate-100"
                      }`}
                    >
                      {title}
                    </h3>
                    <p className="font-body text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Tags au survol (Strictement contenus dans les limites de la carte) */}
                  <motion.div
                    variants={tagContainerVariants}
                    initial="hidden"
                    animate={isHovered ? "visible" : "hidden"}
                    className="flex flex-wrap gap-1.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 overflow-hidden shrink-0 min-h-[64px] items-center"
                  >
                    {tags.map((tag, tagIdx) => (
                      <motion.span
                        key={tagIdx}
                        variants={tagItemVariants}
                        className="inline-block px-2.5 py-1 rounded-full bg-stone-100 dark:bg-[#1E293B] border border-stone-200/60 dark:border-slate-700 text-[11px] font-body font-medium text-slate-700 dark:text-slate-300 truncate max-w-full"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Titre "Ma stack d'outils" */}
      <div className="w-full mt-12 pt-8 border-t border-stone-200/60 dark:border-slate-800/80 flex flex-col items-start px-[6%] md:px-[10%]">
        <h2
          className="font-medium text-base sm:text-lg text-[#00B2A9] tracking-widest uppercase leading-none text-left mb-6"
          style={{ fontFamily: CLASH_FONT, fontWeight: 500 }}
        >
          {translate("Ma stack d'outils", "My Tool Stack")}
        </h2>

        {/* Pills Grid Aligné à Gauche */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap justify-start gap-2.5 sm:gap-3 w-full max-w-6xl">
          {STACK_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.025 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-xs hover:border-[#00B2A9] hover:shadow-md transition-all duration-200 cursor-default group"
            >
              <div className="w-4 sm:w-5 h-4 sm:h-5 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <img
                  src={formatImageUrl(item.logo)}
                  alt={item.name}
                  className="w-4 sm:w-5 h-4 sm:h-5 object-contain shrink-0"
                />
              </div>
              <span className="text-xs sm:text-sm font-body font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#00B2A9] transition-colors truncate">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
