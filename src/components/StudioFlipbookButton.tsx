"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

const STUDIO_IMAGES = [
  "/assets/images studio/Projet_Radaz_site_mockup.webp",
  "/assets/images studio/Projet_APF_affiche_mockup.webp",
  "/assets/images studio/Illustration_hug_hug.webp",
  "/assets/images studio/Projet_custdome_bureautique_mockup.webp",
  "/assets/images studio/Projet_LaDuele_Illustration_étiquette.webp",
  "/assets/images studio/Projet_radaz_stickers_mockup.webp",
  "/assets/images studio/Image_exemple_branding.webp",
  "/assets/images studio/Projet_wow_fin_planche_mockup.webp",
  "/assets/images studio/Projet_origin_conteneur_mockup.webp",
  "/assets/images studio/Projet_APF_explication_logo.webp",
  "/assets/images studio/Projet_XII_logo_fondblanc.webp",
  "/assets/images studio/Projet_wow_logo_creme.webp",
];

export default function StudioFlipbookButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for Awwwards custom cursor inertia
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28 });

  // Preload studio images for zero-flicker instant flipbook
  useEffect(() => {
    STUDIO_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Track mouse position on window while hovered
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Float preview card near the cursor (offset 100px left, 140px up)
      mouseX.set(e.clientX - 100);
      mouseY.set(e.clientY - 140);
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, mouseX, mouseY]);

  // High-speed stroboscopic cycling (100ms) while hovered
  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STUDIO_IMAGES.length);
    }, 100);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <>
      {/* Floating Custom Cursor Preview (Follows mouse, pointer-events-none, ZERO parasite text) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              x: springX,
              y: springY,
            }}
            className="fixed top-0 left-0 w-56 h-36 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/90 pointer-events-none z-[100] bg-black shrink-0"
          >
            <Image
              src={STUDIO_IMAGES[currentIndex]}
              alt="Studio Design Visual"
              fill
              sizes="240px"
              className="object-cover"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Vivid Red-Orange Pill Button */}
      <motion.div
        initial={{ opacity: 0, x: 15, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 10, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        className="relative inline-flex items-center shrink-0 ml-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          href="https://baumstudio.fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-5 py-2.5 rounded-full bg-[#FF3300] hover:bg-[#E02D00] text-white font-display text-xs sm:text-sm font-bold tracking-tight shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-[#FF3300] group shrink-0 whitespace-nowrap cursor-pointer"
        >
          <span className="text-white font-bold tracking-tight">
            découvrir mon studio de design
          </span>
          <span className="text-white font-bold group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200">
            ↗
          </span>
        </a>
      </motion.div>
    </>
  );
}
