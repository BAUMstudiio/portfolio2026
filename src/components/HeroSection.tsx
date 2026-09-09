"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles, Compass, Cpu, Layers } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#FBF9F6]">
      {/* Subtle organic light accent gradient background (Bleu Canard électrique transparent) */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-20 rounded-full filter blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(0, 178, 169, 0.25) 0%, rgba(251, 249, 246, 0) 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#00B2A9]/10 text-[#00B2A9] text-xs font-mono tracking-wider mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00B2A9] animate-pulse"></span>
          <span className="font-semibold uppercase tracking-widest text-[11px]">
            Disponible pour CDI • Paris & Remote
          </span>
        </motion.div>

        {/* Main Display Title - Clash Display */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.98] text-[#1A1A1A] max-w-5xl">
            Ingénierie, Product Management <br />
            <span className="text-[#00B2A9]">
              & Direction Artistique.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle & Presentation - Averia Libre */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pt-4">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-[#1A1A1A] text-xl sm:text-2xl font-normal leading-relaxed">
              Profil hybride combinant la <strong className="font-bold text-[#1A1A1A]">rigueur technique d'un ingénieur</strong>, 
              l'<strong className="font-bold text-[#1A1A1A]">exécution stratégique d'un Product Manager</strong> et 
              l'<strong className="font-bold text-[#00B2A9]">exigence esthétique d'un Directeur Artistique</strong>.
            </p>
            <p className="text-[#4A4A4A] text-base leading-relaxed">
              Expérience éprouvée chez <strong className="text-[#1A1A1A]">Renault Group</strong> (onboarding applicatif, workflows RAG & stratégie CX) et <strong className="text-[#1A1A1A]">GRTgaz / Natran</strong> (ergonomie industrielle), complétée par la création de marque au sein de mon studio.
            </p>
          </motion.div>

          {/* 3 Domains of Expertise List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-3 font-mono text-xs"
          >
            <span className="text-[#717171] uppercase tracking-widest text-[10px] block mb-2 font-bold">
              Domaines d'expertise
            </span>

            <div className="p-4 rounded-xl bg-white/60 border border-[#1A1A1A]/[0.06] hover:border-[#00B2A9]/40 transition-colors flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-[#00B2A9]" />
                <span className="text-[#1A1A1A] font-semibold tracking-wider">Product Management & Tech</span>
              </div>
              <span className="text-[#717171] text-[11px] group-hover:text-[#00B2A9] transition-colors">01</span>
            </div>

            <div className="p-4 rounded-xl bg-white/60 border border-[#1A1A1A]/[0.06] hover:border-[#00B2A9]/40 transition-colors flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-[#00B2A9]" />
                <span className="text-[#1A1A1A] font-semibold tracking-wider">Stratégie & Expérience Client</span>
              </div>
              <span className="text-[#717171] text-[11px] group-hover:text-[#00B2A9] transition-colors">02</span>
            </div>

            <div className="p-4 rounded-xl bg-white/60 border border-[#1A1A1A]/[0.06] hover:border-[#00B2A9]/40 transition-colors flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-[#00B2A9]" />
                <span className="text-[#1A1A1A] font-semibold tracking-wider">Direction Artistique & Design</span>
              </div>
              <span className="text-[#717171] text-[11px] group-hover:text-[#00B2A9] transition-colors">03</span>
            </div>
          </motion.div>

        </div>

        {/* Scroll CTA Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-[#1A1A1A]/[0.08] flex items-center justify-between text-[#717171] text-xs font-mono"
        >
          <span className="uppercase tracking-widest flex items-center gap-2 text-[#1A1A1A]">
            <ArrowDownRight className="w-4 h-4 text-[#00B2A9] animate-bounce" />
            Découvrir les travaux
          </span>
          <span className="tracking-wider">MATTHIEU BAUDIER — 2026</span>
        </motion.div>

      </div>
    </section>
  );
}
