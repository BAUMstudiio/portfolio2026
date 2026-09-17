"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface CanvasDot {
  x: number;
  y: number;
  opacity: number;
}

const CLASH_FONT = "'Clash Display', sans-serif";
const AVERIA_FONT = "'Averia Serif Libre', 'Averia Libre', Georgia, serif";

interface AutonomousDisappearingWaveCanvasProps {
  isEasterEggActive: boolean;
}

function AutonomousDisappearingWaveCanvas({ isEasterEggActive }: AutonomousDisappearingWaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<CanvasDot[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number | null>(null);
  const easterEggRef = useRef(isEasterEggActive);

  useEffect(() => {
    easterEggRef.current = isEasterEggActive;
  }, [isEasterEggActive]);

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleWindowMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseleave", handleWindowMouseLeave);

    const initGrid = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Moins dense sur mobile pour préserver les performances
      const isMobile = w < 768;
      const spacing = isMobile ? 34 : 22; 
      const cols = Math.ceil(w / spacing);
      const rows = Math.ceil(h / spacing);
      const dots: CanvasDot[] = [];

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots.push({
            x: c * spacing + spacing / 2,
            y: r * spacing + spacing / 2,
            opacity: 0.1,
          });
        }
      }
      dotsRef.current = dots;
    };

    initGrid();

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = container.clientWidth;
      const h = container.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const isDarkMode = document.documentElement.classList.contains("dark");
      const now = Date.now() * 0.0016;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const isEE = easterEggRef.current;

      const mouseRadius = 180;

      dotsRef.current.forEach((dot) => {
        // 1. Restauration de la vague (Idle) avec Date.now() & Math.sin/cos sur X et Y
        const wave1 = Math.sin(dot.x * 0.005 + now * 1.5);
        const wave2 = Math.cos(dot.y * 0.005 - now * 1.2);
        const wave3 = Math.sin((dot.x + dot.y) * 0.004 + now * 0.8);
        const waveCombined = (wave1 + wave2 + wave3) / 3;

        // Modifie l'opacité idle pour descendre jusqu'à 0% (disparition totale) et monter jusqu'à 0.35 (très subtil)
        const idleOpacity = ((waveCombined + 1) / 2) * 0.35;

        // 2. Interaction Souris (Impact Fort : 180px - 200px)
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const dist = Math.hypot(dx, dy);
        let mouseEffect = 0;

        if (dist < mouseRadius) {
          mouseEffect = Math.pow(1 - dist / mouseRadius, 1.4);
        }

        // Opacité des points à proximité de la souris passe à 0.8 (visibilité élégante)
        let targetOpacity = Math.max(idleOpacity, mouseEffect * 0.8);
        if (isEE) {
          targetOpacity = 1.0;
        }

        // Estompe doucement la traînée avec le lerp
        dot.opacity += (targetOpacity - dot.opacity) * (isEE ? 0.08 : 0.18);

        // 3. Logique de couleur 2D "Mesh Gradient / Color Field" (Bleu -> Violet -> Rose)
        const normX = Math.min(Math.max(dot.x / (w || 1), 0), 1);
        const normY = Math.min(Math.max(dot.y / (h || 1), 0), 1);
        const hue = 210 + normX * 80 + normY * 40;
        const saturation = isDarkMode ? 95 : 90; // Saturation élevée pour préserver la teinte
        
        // Luminosité et opacité réactives (Respiration & Survol)
        const baseLightness = isDarkMode ? 50 : 42;
        const waveBonusLightness = ((waveCombined + 1) / 2) * (isDarkMode ? 8 : 6);
        const mouseBonusLightness = mouseEffect * (isDarkMode ? 15 : 12);
        // On cap la luminosité à 70 maximum pour ne jamais blanchir les points et garder la couleur
        const lightness = Math.min(baseLightness + waveBonusLightness + mouseBonusLightness, 70);

        // Effet Halo Glow très léger sur les vagues de respiration & le survol de la souris
        if (mouseEffect > 0.02 || waveCombined > 0.3 || isEE) {
          ctx.shadowBlur = isEE ? 14 : 8 * mouseEffect + 2 * ((waveCombined + 1) / 2);
          ctx.shadowColor = `hsla(${hue}, 90%, 60%, ${Math.min(dot.opacity, 0.7)})`;
        } else {
          ctx.shadowBlur = 0;
        }

        const radius = isEE
          ? 2.6
          : 1.0 + mouseEffect * 1.5 + ((waveCombined + 1) / 2) * 0.4;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${dot.opacity})`;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseleave", handleWindowMouseLeave);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default function HeroSection() {
  const [clickedKeys, setClickedKeys] = useState<Set<string>>(new Set());
  const [isEasterEggActive, setIsEasterEggActive] = useState<boolean>(false);
  const [flashingKey, setFlashingKey] = useState<string | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { t, translate } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePillClick = (key: "innovation" | "produit" | "design") => {
    if (isEasterEggActive) return;

    setFlashingKey(key);
    setTimeout(() => {
      setFlashingKey(null);
    }, 250);

    const nextSet = new Set(clickedKeys);
    nextSet.add(key);
    setClickedKeys(nextSet);

    if (nextSet.has("innovation") && nextSet.has("produit") && nextSet.has("design")) {
      setIsEasterEggActive(true);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        setIsEasterEggActive(false);
        setClickedKeys(new Set());
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-[#FDFBF7] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 select-none transition-colors duration-500">
      
      {/* Clean background to let the dot mesh gradient shine. */}
      <div className="absolute inset-0 pointer-events-none z-0"></div>

      {/* 1. Le Canvas de points interactifs en arrière-plan */}
      <AutonomousDisappearingWaveCanvas isEasterEggActive={isEasterEggActive} />

      {/* 2. Emplacement Paris (Top Left) */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
        className="absolute top-6 left-6 md:top-8 md:left-8 z-10 pointer-events-auto"
      >
        <span className="font-sans text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 backdrop-blur-sm bg-white/40 dark:bg-slate-900/40 px-3 py-1 rounded-full border border-stone-200/50 dark:border-slate-800/50 shadow-2xs">
          Paris, Île-de-France
        </span>
      </motion.div>

      {/* 3. Le Conteneur Principal (Aligné à gauche) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="absolute top-[18%] sm:top-[20%] left-[6%] md:left-[10%] w-[88%] max-w-6xl flex flex-col items-start text-left pointer-events-auto z-10"
      >
        {/* Label statut */}
        <div
          className={`bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md shadow-sm border border-stone-200/70 dark:border-slate-800 rounded-full px-4 py-1.5 flex items-center gap-2 text-xs md:text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-700 ease-out ${
            isEasterEggActive ? "border-[#00B2A9] shadow-[0_0_15px_rgba(0,178,169,0.4)] scale-105" : ""
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B2A9] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B2A9]"></span>
          </span>
          <span>{t("hero_availability")}</span>
        </div>

        {/* Grand Titre */}
        <h1
          className="font-medium text-[clamp(2.2rem,6vw,4.2rem)] leading-[1.1] text-[#00B2A9] mt-6 mb-8 text-left filter drop-shadow-xs text-balance"
          style={{ fontFamily: CLASH_FONT, fontWeight: 500 }}
        >
          {t("profile_title")}
        </h1>

        {/* Bloc Nom & Portfolio */}
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border-2 border-white/80 dark:border-slate-700 shadow-md bg-stone-200 dark:bg-slate-800 relative">
              <Image
                src="/assets/PhotoDeProfil.webp"
                alt="Matthieu Baudier"
                fill
                sizes="56px"
                priority
                className="object-cover"
              />
            </div>
            <span
              className="text-xl md:text-2xl font-medium text-slate-900 dark:text-slate-100 tracking-wide drop-shadow-2xs"
              style={{ fontFamily: AVERIA_FONT }}
            >
              Matthieu Baudier
            </span>
          </div>

          <span
            className="text-xl md:text-2xl font-normal text-slate-600 dark:text-slate-400 tracking-wide shrink-0 hidden sm:block"
            style={{ fontFamily: AVERIA_FONT }}
          >
            portfolio 2026
          </span>
        </div>

        {/* Sous-titre Renault Group */}
        <span className="mt-4 text-xs md:text-sm text-slate-600 dark:text-slate-400 tracking-widest uppercase font-sans font-semibold">
          {translate("PRÉCÉDEMMENT PRODUCT MANAGER IA @ RENAULT GROUP", "PREVIOUSLY AI PRODUCT MANAGER @ RENAULT GROUP")}
        </span>
      </motion.div>

      {/* 4. LE FOOTER DE LA HERO */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
        className="absolute bottom-8 left-0 right-0 w-full flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        {/* Boutons interactifs pilules pour l'Easter Egg */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 pointer-events-auto">
          {[
            { key: "innovation", label: t("hero_pill_innovation") },
            { key: "produit", label: t("hero_pill_produit") },
            { key: "design", label: t("hero_pill_design") },
          ].map((btn) => {
            const isFlashing = flashingKey === btn.key;
            return (
              <button
                key={btn.key}
                onClick={() => handlePillClick(btn.key as "innovation" | "produit" | "design")}
                className={`rounded-full px-4 py-1.5 text-xs md:text-sm font-medium border transition-all duration-300 cursor-pointer select-none ${
                  isEasterEggActive
                    ? "bg-[#00B2A9] text-white border-[#00B2A9] shadow-[0_0_20px_rgba(0,178,169,0.7)] scale-110 font-bold"
                    : isFlashing
                    ? "border-[#00B2A9] text-[#00B2A9] bg-[#00B2A9]/10 shadow-[0_0_12px_rgba(0,178,169,0.5)] scale-105 font-semibold"
                    : "bg-white/90 dark:bg-[#0F172A]/90 border-stone-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#00B2A9]/60 hover:text-[#00B2A9] hover:bg-white shadow-2xs"
                }`}
                style={{ fontFamily: AVERIA_FONT }}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollToSection("expertise")}
          className="mt-6 text-sm font-semibold text-slate-800 dark:text-slate-200 flex flex-col items-center gap-2 pointer-events-auto hover:text-[#00B2A9] dark:hover:text-[#00B2A9] transition-colors cursor-pointer"
        >
          {translate("Découvrir plus", "Discover more")}
          <svg className="w-4 h-4 animate-bounce text-[#00B2A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
