"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle, Building2, ImageIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ProjectData } from "@/lib/projects";
import { formatImageUrl } from "@/lib/utils";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const { lang, translate } = useLanguage();
  const [lightboxItem, setLightboxItem] = useState<{ url: string; caption?: string } | null>(null);

  const domainLabels: Record<string, { fr: string; en: string }> = {
    "Product Management & Tech": { fr: "Product Management & Tech", en: "Product Management & Tech" },
    "Stratégie & Expérience Client": { fr: "Stratégie & Expérience Client", en: "Strategy & Customer Experience" },
    "Direction Artistique & Design": { fr: "Direction Artistique & Design", en: "Art Direction & Design" },
  };

  // Lock body scroll on open & bind ESC key (closes lightbox first if open, else closes modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxItem) {
          setLightboxItem(null);
        } else {
          onClose();
        }
      }
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
  }, [project, lightboxItem, onClose]);

  const domainText = project
    ? domainLabels[project.domain]
      ? lang === "en"
        ? domainLabels[project.domain].en
        : domainLabels[project.domain].fr
      : project.domain
    : "";

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm"
          />

          {/* Expanded Card Modal with Shared Layout Animation */}
          <motion.div
            layoutId={`project-card-${project.slug}`}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="relative w-full max-w-4xl bg-[#F0EBE1] dark:bg-[#0F172A] border border-[#1A1A1A]/10 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col justify-between transition-colors duration-500"
          >
            {/* Top Bar with Minimalist Close Button */}
            <div className="sticky top-0 z-20 bg-[#F0EBE1]/95 dark:bg-[#0F172A]/95 backdrop-blur-md px-4 sm:px-8 py-3.5 sm:py-5 border-b border-[#1A1A1A]/[0.08] dark:border-slate-800 flex items-center justify-between transition-colors duration-500">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="font-body text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#00B2A9]/10 text-[#00B2A9] uppercase tracking-wider border border-[#00B2A9]/20 whitespace-nowrap">
                  {domainText}
                </span>
                <span className="font-body text-xs text-[#5A5A5A] dark:text-slate-400 hidden sm:inline">
                  {project.context} — {project.year}
                </span>
              </div>

              <button
                onClick={onClose}
                className="group flex items-center gap-1.5 sm:gap-2 font-body text-xs text-[#1A1A1A] dark:text-slate-200 hover:text-[#00B2A9] dark:hover:text-[#00B2A9] transition-colors cursor-pointer"
                aria-label={translate("Fermer la vue détaillée", "Close detailed view")}
              >
                <span className="uppercase tracking-widest text-[10px] sm:text-[11px] font-bold">
                  {translate("Fermer", "Close")}
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1A1A1A]/[0.05] dark:bg-slate-800 group-hover:bg-[#00B2A9]/10 flex items-center justify-center transition-colors">
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1A1A1A] dark:text-slate-200 group-hover:text-[#00B2A9]" />
                </div>
              </button>
            </div>

            {/* Modal Body Content - 6 Structured Sections & Markdown */}
            <div className="px-4 sm:px-8 md:px-14 py-5 sm:py-8 overflow-y-auto space-y-6 sm:space-y-10">
              
              {/* Cover Banner Image if available */}
              {project.coverImage && (
                <div
                  onClick={() => setLightboxItem({ url: formatImageUrl(project.coverImage!), caption: project.title })}
                  className="relative w-full h-48 sm:h-72 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden bg-[#1A1A1A]/5 dark:bg-slate-800 border border-[#1A1A1A]/08 dark:border-slate-800 cursor-zoom-in group"
                >
                  <Image
                    src={formatImageUrl(project.coverImage)}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white font-body text-xs px-3.5 py-1.5 rounded-full backdrop-blur-sm font-semibold tracking-wide">
                      {translate("🔍 Cliquez pour agrandir", "🔍 Click to zoom")}
                    </span>
                  </div>
                </div>
              )}

              {/* Header Title & Role */}
              <div className="space-y-3 sm:space-y-4 border-b border-[#1A1A1A]/[0.08] dark:border-slate-800 pb-5 sm:pb-8">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-body text-[#5A5A5A] dark:text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-[#00B2A9] font-bold">
                    <Building2 className="w-3.5 h-3.5" />
                    {project.role}
                  </span>
                  <span>•</span>
                  <span>{project.context}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>

                <h1 className="font-display font-semibold text-2xl sm:text-4xl md:text-6xl text-[#1A1A1A] dark:text-slate-100 tracking-tight leading-tight">
                  {project.title}
                </h1>

                {project.impactMetric && (
                  <div className="inline-block font-body text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#00B2A9]/10 text-[#00B2A9] border border-[#00B2A9]/20">
                    {translate("Impact : ", "Impact: ")}{project.impactMetric}
                  </div>
                )}
              </div>

              {/* Main Markdown Content formatted in the 6 mandatory sections */}
              <div className="prose prose-lg max-w-none text-[#1A1A1A] dark:text-slate-100 font-body leading-relaxed space-y-6 sm:space-y-8">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-[#1A1A1A] dark:text-slate-100 pt-4 sm:pt-6 pb-2 border-b border-[#1A1A1A]/[0.08] dark:border-slate-800">
                        {children}
                      </h2>
                    ),
                    h2: ({ children }) => (
                      <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-[#00B2A9] pt-3 sm:pt-4 pb-2">
                        {children}
                      </h3>
                    ),
                    h3: ({ children }) => (
                      <h4 className="font-display font-bold text-base sm:text-lg text-[#1A1A1A] dark:text-slate-100 pt-2 sm:pt-3 pb-1">
                        {children}
                      </h4>
                    ),
                    p: ({ children, node }) => {
                      const hasImg = (node as any)?.children?.some(
                        (c: any) => c.type === "element" && c.tagName === "img"
                      );
                      if (hasImg) {
                        return <div className="my-4 sm:my-6">{children}</div>;
                      }
                      return (
                        <p className="text-[#1A1A1A] dark:text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-body">
                          {children}
                        </p>
                      );
                    },
                    img: ({ src, alt }) => {
                      if (!src) return null;
                      const cleanSrc = formatImageUrl(src);
                      const captionText = alt && alt !== "Image d'illustration projet" && alt !== "Illustration" ? alt : "";

                      return (
                        <figure className="my-6 sm:my-8 w-full flex flex-col items-center">
                          <div
                            onClick={() => setLightboxItem({ url: cleanSrc, caption: captionText })}
                            className="relative w-full h-48 sm:h-72 md:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#1A1A1A]/5 border border-[#1A1A1A]/08 shadow-md cursor-zoom-in group"
                          >
                            <Image
                              src={cleanSrc}
                              alt={alt || "Image d'illustration projet"}
                              fill
                              sizes="(max-width: 768px) 100vw, 800px"
                              className="object-cover group-hover:scale-102 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white font-body text-xs px-3.5 py-1.5 rounded-full backdrop-blur-sm font-semibold tracking-wide">
                                {translate("🔍 Cliquez pour agrandir", "🔍 Click to zoom")}
                              </span>
                            </div>
                          </div>
                          {captionText && (
                            <figcaption className="font-body text-xs sm:text-sm text-stone-500/80 dark:text-stone-400 italic text-center mt-2.5 px-4">
                              — {captionText}
                            </figcaption>
                          )}
                        </figure>
                      );
                    },
                    ul: ({ children }) => (
                      <ul className="space-y-2.5 sm:space-y-3 my-3 sm:my-4 pl-0">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base text-[#1A1A1A] dark:text-slate-300 font-body">
                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00B2A9] shrink-0 mt-1" />
                        <span>{children}</span>
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-[#1A1A1A] dark:text-slate-100">
                        {children}
                      </strong>
                    ),
                  }}
                >
                  {project.content}
                </ReactMarkdown>
              </div>

              {/* Section 4: Stack & Outils Tags */}
              <div className="pt-6 sm:pt-8 border-t border-[#1A1A1A]/[0.08] dark:border-slate-800 space-y-3">
                <span className="font-display font-bold text-sm sm:text-base text-[#1A1A1A] dark:text-slate-100 block">
                  {translate("4. Stack, Frameworks & Outils", "4. Stack, Frameworks & Tools")}
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-[10px] sm:text-xs uppercase tracking-widest px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white dark:bg-slate-800 text-[#1A1A1A] dark:text-slate-200 border border-[#1A1A1A]/10 dark:border-slate-700 font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Section 6: La Galerie Visuelle avec légendes (figure & figcaption) */}
              {project.images && project.images.length > 0 && (
                <div className="pt-6 sm:pt-8 border-t border-[#1A1A1A]/[0.08] dark:border-slate-800 space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-2 font-display font-bold text-lg sm:text-xl text-[#1A1A1A] dark:text-slate-100">
                    <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B2A9]" />
                    <span>
                      {translate("6. La Galerie Visuelle", "6. Visual Gallery")} ({project.images.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {project.images.map((image, idx) => {
                      const cleanSrc = formatImageUrl(image.url);

                      return (
                        <figure key={idx} className="group flex flex-col">
                          <div
                            onClick={() => setLightboxItem({ url: cleanSrc, caption: image.caption })}
                            className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#1A1A1A]/5 border border-[#1A1A1A]/08 aspect-video shadow-sm cursor-zoom-in"
                          >
                            <Image
                              src={cleanSrc}
                              alt={image.caption || `${project.title} - Visuel ${idx + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 500px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white font-body text-xs px-3.5 py-1.5 rounded-full backdrop-blur-sm font-semibold tracking-wide">
                                {translate("🔍 Agrandir", "🔍 Zoom")}
                              </span>
                            </div>
                          </div>
                          {image.caption && (
                            <figcaption className="text-sm text-stone-500/80 italic text-center mt-3">
                              {image.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Footer */}
            <div className="px-4 sm:px-8 py-3 sm:py-4 border-t border-[#1A1A1A]/[0.08] bg-[#F0EBE1] flex items-center justify-between">
              <span className="font-body text-[11px] sm:text-xs text-[#5A5A5A] truncate max-w-[140px] sm:max-w-none">
                {project.slug}
              </span>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#1A1A1A] text-[#F0EBE1] hover:bg-[#00B2A9] font-body text-[11px] sm:text-xs uppercase tracking-wider transition-colors font-bold shrink-0"
              >
                {translate("Fermer", "Close")} <span className="hidden sm:inline">{translate("et ranger la carte", "and put away card")}</span> <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>

          {/* Fullscreen Lightbox Modal with Caption at bottom */}
          <AnimatePresence>
            {lightboxItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={() => setLightboxItem(null)}
                className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out select-none"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxItem(null);
                  }}
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                  aria-label={translate("Fermer le zoom", "Close zoom")}
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <motion.div
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.94, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="relative max-w-6xl max-h-[82vh] w-full h-full flex items-center justify-center pointer-events-none"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={lightboxItem.url}
                      alt={lightboxItem.caption || "Vue agrandie"}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>

                {lightboxItem.caption && (
                  <div className="absolute bottom-6 left-0 right-0 z-10 text-center max-w-3xl mx-auto px-6 pointer-events-none">
                    <p className="font-body text-sm sm:text-base text-white italic font-medium drop-shadow-md">
                      {lightboxItem.caption}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
