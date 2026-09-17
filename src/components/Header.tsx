"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { lang, toggleLang, t } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const NAV_ITEMS = [
    { id: "expertise", label: t("nav_expertise") },
    { id: "projets", label: t("nav_projets") },
    { id: "about", label: t("nav_about") },
    { id: "contact", label: t("nav_contact") },
  ];

  // 1. Détection du scroll pour la sortie de la section Hero (> 180px)
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 180) {
      setIsPastHero(true);
    } else {
      setIsPastHero(false);
      setIsProfileOpen(false); // Ferme automatiquement l'encart sur la Hero
    }
  });

  // 2. Scrollspy : Détection de la section actuellement visible
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      const navIds = ["expertise", "projets", "about", "contact"];
      for (let i = navIds.length - 1; i >= 0; i--) {
        const id = navIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }

      if (window.scrollY < 180) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Fermeture de l'encart au clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Défilement fluide vers une section au clic
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={headerRef}
      onMouseLeave={() => setIsProfileOpen(false)}
      className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center select-none"
    >
      {/* Barre / Pilule Flottante de Navigation */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-black/[0.04] rounded-full px-3.5 sm:px-5 py-2 flex items-center gap-2 sm:gap-4 transition-all duration-500"
      >
        {/* Photo de profil (Coulissante / Détachable au scroll hors Hero) */}
        <AnimatePresence>
          {isPastHero && (
            <motion.div
              initial={{ width: 0, opacity: 0, scale: 0.8, marginRight: 0 }}
              animate={{ width: "auto", opacity: 1, scale: 1, marginRight: 4 }}
              exit={{ width: 0, opacity: 0, scale: 0.8, marginRight: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="overflow-hidden flex items-center"
            >
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                title={lang === "fr" ? "Dérouler le profil de Matthieu Baudier" : "Toggle Matthieu Baudier profile details"}
                className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shrink-0 border-2 border-[#00B2A9]/40 hover:border-[#00B2A9] shadow-xs cursor-pointer focus:outline-none transition-all duration-300 hover:scale-105 group/avatar"
              >
                <img
                  src="/assets/PhotoDeProfil.webp"
                  alt="Matthieu Baudier"
                  className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-300"
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Liens de Catégories avec Indicateur Bleu pour la Section Active */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-body text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "font-bold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-sky-950/60 border border-blue-200/80 dark:border-sky-800/80 shadow-xs"
                    : "font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Sélecteur de Langue (Bascule instantanée FR / EN) */}
        <div className="pl-1 sm:pl-2 border-l border-slate-200 dark:border-slate-800 flex items-center">
          <button
            onClick={toggleLang}
            title={lang === "fr" ? "Switch to English 🇬🇧" : "Passer en Français 🇫🇷"}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-body font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <span className="text-sm">{lang === "fr" ? "🇬🇧" : "🇫🇷"}</span>
            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-800 dark:text-slate-100 uppercase">
              {lang === "fr" ? "EN" : "FR"}
            </span>
          </button>
        </div>
      </motion.header>

      {/* Encart Coulissant Déroulant sous la photo de profil */}
      <AnimatePresence>
        {isProfileOpen && isPastHero && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="mt-2 z-50 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl rounded-2xl p-4 sm:p-4.5 min-w-[290px] sm:min-w-[340px] flex items-center justify-between gap-4 pointer-events-auto"
          >
            {/* À Gauche : Nom & Prénom */}
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 tracking-tight leading-none">
                {t("profile_name")}
              </span>
              <span className="font-body text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                {t("profile_title")}
              </span>
            </div>

            {/* À Droite : Mention statut */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-body text-xs font-semibold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                {t("profile_status")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
