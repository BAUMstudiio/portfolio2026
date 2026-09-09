"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle, Building2, ImageIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ProjectData } from "@/lib/projects";
import Image from "next/image";

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Lock body scroll on open & bind ESC key (closes lightbox first if open, else closes modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxSrc) {
          setLightboxSrc(null);
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
  }, [project, lightboxSrc, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
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
            className="relative w-full max-w-4xl bg-[#F0EBE1] border border-[#1A1A1A]/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col justify-between"
          >
            {/* Top Bar with Minimalist Close Button */}
            <div className="sticky top-0 z-20 bg-[#F0EBE1]/95 backdrop-blur-md px-8 py-5 border-b border-[#1A1A1A]/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-body text-xs font-semibold px-3.5 py-1 rounded-full bg-[#00B2A9]/10 text-[#00B2A9] uppercase tracking-wider border border-[#00B2A9]/20">
                  {project.domain}
                </span>
                <span className="font-body text-xs text-[#5A5A5A] hidden sm:inline">
                  {project.context} — {project.year}
                </span>
              </div>

              <button
                onClick={onClose}
                className="group flex items-center gap-2 font-body text-xs text-[#1A1A1A] hover:text-[#00B2A9] transition-colors"
                aria-label="Fermer la vue détaillée"
              >
                <span className="uppercase tracking-widest text-[11px] font-bold">Fermer</span>
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/[0.05] group-hover:bg-[#00B2A9]/10 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-[#1A1A1A] group-hover:text-[#00B2A9]" />
                </div>
              </button>
            </div>

            {/* Modal Body Content - 6 Structured Sections & Markdown */}
            <div className="px-8 md:px-14 py-8 overflow-y-auto space-y-10">
              
              {/* Cover Banner Image if available */}
              {project.coverImage && (
                <div
                  onClick={() => setLightboxSrc(project.coverImage!)}
                  className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-[#1A1A1A]/5 border border-[#1A1A1A]/08 cursor-zoom-in group"
                >
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white font-body text-xs px-3.5 py-1.5 rounded-full backdrop-blur-sm font-semibold tracking-wide">
                      🔍 Cliquez pour agrandir
                    </span>
                  </div>
                </div>
              )}

              {/* Header Title & Role */}
              <div className="space-y-4 border-b border-[#1A1A1A]/[0.08] pb-8">
                <div className="flex flex-wrap items-center gap-4 text-xs font-body text-[#5A5A5A] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-[#00B2A9] font-bold">
                    <Building2 className="w-3.5 h-3.5" />
                    {project.role}
                  </span>
                  <span>•</span>
                  <span>{project.context}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>

                <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-[#1A1A1A] tracking-tight leading-tight">
                  {project.title}
                </h1>

                {project.impactMetric && (
                  <div className="inline-block font-body text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#00B2A9]/10 text-[#00B2A9] border border-[#00B2A9]/20">
                    Impact : {project.impactMetric}
                  </div>
                )}
              </div>

              {/* Main Markdown Content formatted in the 6 mandatory sections */}
              <div className="prose prose-lg max-w-none text-[#1A1A1A] font-body leading-relaxed space-y-8">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1A1A1A] pt-6 pb-2 border-b border-[#1A1A1A]/[0.08]">
                        {children}
                      </h2>
                    ),
                    h2: ({ children }) => (
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1A1A1A] pt-4 pb-2 text-[#00B2A9]">
                        {children}
                      </h3>
                    ),
                    h3: ({ children }) => (
                      <h4 className="font-display font-bold text-lg text-[#1A1A1A] pt-3 pb-1">
                        {children}
                      </h4>
                    ),
                    p: ({ children, node }) => {
                      const hasImg = (node as any)?.children?.some(
                        (c: any) => c.type === "element" && c.tagName === "img"
                      );
                      if (hasImg) {
                        return <div className="my-6">{children}</div>;
                      }
                      return (
                        <p className="text-[#1A1A1A] text-base sm:text-lg leading-relaxed font-body">
                          {children}
                        </p>
                      );
                    },
                    img: ({ src, alt }) => {
                      if (!src) return null;
                      return (
                        <div
                          onClick={() => setLightboxSrc(src)}
                          className="relative w-full h-64 sm:h-80 md:h-[420px] my-6 rounded-2xl overflow-hidden bg-[#1A1A1A]/5 border border-[#1A1A1A]/08 shadow-md cursor-zoom-in group"
                        >
                          <Image
                            src={src}
                            alt={alt || "Image d'illustration projet"}
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-cover group-hover:scale-102 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white font-body text-xs px-3.5 py-1.5 rounded-full backdrop-blur-sm font-semibold tracking-wide">
                              🔍 Cliquez pour agrandir
                            </span>
                          </div>
                        </div>
                      );
                    },
                    ul: ({ children }) => (
                      <ul className="space-y-3 my-4 pl-0">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex items-start gap-3 text-base text-[#1A1A1A] font-body">
                        <CheckCircle className="w-4 h-4 text-[#00B2A9] shrink-0 mt-1" />
                        <span>{children}</span>
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-[#1A1A1A]">
                        {children}
                      </strong>
                    ),
                  }}
                >
                  {project.content}
                </ReactMarkdown>
              </div>

              {/* Section 4: Stack & Outils Tags */}
              <div className="pt-8 border-t border-[#1A1A1A]/[0.08] space-y-3">
                <span className="font-display font-bold text-base text-[#1A1A1A] block">
                  4. Stack, Frameworks & Outils
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs uppercase tracking-widest px-3 py-1.5 rounded-full bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Section 6: La Galerie Visuelle (CSS Grid Exhaustive - Rendu unique) */}
              {project.images && project.images.length > 0 && (
                <div className="pt-8 border-t border-[#1A1A1A]/[0.08] space-y-6">
                  <div className="flex items-center gap-2 font-display font-bold text-xl text-[#1A1A1A]">
                    <ImageIcon className="w-5 h-5 text-[#00B2A9]" />
                    <span>6. La Galerie Visuelle ({project.images.length})</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxSrc(imgSrc)}
                        className="group relative rounded-2xl overflow-hidden bg-[#1A1A1A]/5 border border-[#1A1A1A]/08 aspect-video shadow-sm cursor-zoom-in"
                      >
                        <Image
                          src={imgSrc}
                          alt={`${project.title} - Visuel ${idx + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white font-body text-xs px-3.5 py-1.5 rounded-full backdrop-blur-sm font-semibold tracking-wide">
                            🔍 Agrandir
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Footer */}
            <div className="px-8 py-4 border-t border-[#1A1A1A]/[0.08] bg-[#F0EBE1] flex items-center justify-between">
              <span className="font-body text-xs text-[#5A5A5A]">
                {project.slug}
              </span>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A1A1A] text-[#F0EBE1] hover:bg-[#00B2A9] font-body text-xs uppercase tracking-wider transition-colors font-bold"
              >
                Fermer et ranger la carte <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>

          {/* Fullscreen Lightbox Modal */}
          <AnimatePresence>
            {lightboxSrc && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={() => setLightboxSrc(null)}
                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out select-none"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxSrc(null);
                  }}
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                  aria-label="Fermer le zoom"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <motion.div
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.94, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="relative max-w-6xl max-h-[88vh] w-full h-full flex items-center justify-center pointer-events-none"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={lightboxSrc}
                      alt="Vue agrandie"
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
