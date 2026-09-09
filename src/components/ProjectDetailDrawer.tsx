"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Wrench, Layers, Target, ArrowRight } from "lucide-react";
import { Project, PILLARS } from "@/data/projects";

interface ProjectDetailDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailDrawer({ project, onClose }: ProjectDetailDrawerProps) {
  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const pillar = PILLARS.find((p) => p.id === project.pillarId);
  const accentColor = pillar?.accentColor || "#ffffff";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#09090b] border-l border-white/10 h-full overflow-y-auto z-10 shadow-2xl flex flex-col justify-between"
        >
          {/* Top Sticky Header */}
          <div>
            <div className="sticky top-0 z-20 bg-[#09090b]/95 backdrop-blur-md px-6 md:px-12 py-6 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest"
                  style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
                >
                  PILIER {pillar?.number} • {pillar?.title}
                </span>
                <span className="font-mono text-xs text-zinc-500 hidden sm:inline uppercase tracking-widest">
                  {project.context} ({project.year})
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                aria-label="Fermer la fiche projet"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Fiche Projet Content */}
            <div className="px-6 md:px-12 py-10 space-y-12">
              
              {/* Project Hero Header */}
              <div className="space-y-4 border-b border-white/[0.06] pb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                    {project.role}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="font-mono text-xs text-zinc-400">
                    {project.context} — {project.year}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
                  {project.title}
                </h3>

                <p className="text-zinc-300 text-base sm:text-lg font-normal leading-relaxed max-w-3xl">
                  {project.summary}
                </p>
              </div>

              {/* SECTION 1: LE PROBLÈME MÉTIER / LE BRIEF CRÉATIF */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-widest">
                  <AlertCircle className="w-4 h-4" />
                  <span>01. {project.caseStudy.problem.title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="space-y-2">
                    <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                      Point de douleur initial
                    </h4>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {project.caseStudy.problem.painPoint}
                    </p>
                  </div>

                  <div className="space-y-2 border-t md:border-t-0 md:border-l border-white/[0.06] pt-4 md:pt-0 md:pl-6">
                    <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                      Objectif métier & créatif
                    </h4>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {project.caseStudy.problem.objective}
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 2: LA SOLUTION / L'APPROCHE */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-widest">
                  <Wrench className="w-4 h-4" />
                  <span>02. {project.caseStudy.solution.title}</span>
                </div>

                <div className="space-y-6 p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="space-y-2">
                    <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                      Démarche & Méthodologie
                    </h4>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {project.caseStudy.solution.methodology}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/[0.05]">
                    <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                      Réalisation clé
                    </h4>
                    <p className="text-zinc-200 text-sm leading-relaxed font-medium">
                      {project.caseStudy.solution.deliverable}
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 3: L'IMPACT / LE RÉSULTAT */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest">
                  <Target className="w-4 h-4" />
                  <span>03. {project.caseStudy.impact.title}</span>
                </div>

                <div className="p-6 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/20 space-y-6">
                  <div>
                    <h4 className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-semibold mb-2">
                      Impact Mesurable & Valeur Amenée
                    </h4>
                    <p className="text-white text-base font-medium leading-relaxed">
                      {project.caseStudy.impact.measurable}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-3">
                      Livrables finaux
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.caseStudy.impact.deliverablesList.map((del, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* SECTION 4: STACK & COMPÉTENCES (Minimalist Typographic Tags) */}
              <section className="space-y-6 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest">
                  <Layers className="w-4 h-4" />
                  <span>04. Stack & Compétences</span>
                </div>

                <div className="space-y-6">
                  {/* Methodologies */}
                  <div>
                    <h4 className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-3">
                      Méthodologies & Approches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.caseStudy.stack.methodologies.map((m) => (
                        <span
                          key={m}
                          className="font-mono text-[11px] uppercase tracking-[0.2em] px-3 py-1.5 rounded bg-white/[0.04] text-zinc-200 border border-white/[0.06]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Tech */}
                  <div>
                    <h4 className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-3">
                      Outils & Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.caseStudy.stack.toolsAndTech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] uppercase tracking-[0.2em] px-3 py-1.5 rounded bg-white/[0.06] text-white border border-white/10 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Bottom Footer inside drawer */}
          <div className="px-6 md:px-12 py-6 border-t border-white/[0.08] bg-[#09090b] flex items-center justify-between">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
              {project.id}
            </span>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              Fermer la fiche <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
