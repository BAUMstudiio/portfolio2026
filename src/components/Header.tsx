"use client";

import { motion } from "framer-motion";
import { PillarId } from "@/data/projects";

interface HeaderProps {
  activePillar: PillarId | "all";
  onSelectPillar: (pillar: PillarId | "all") => void;
  counts: Record<PillarId | "all", number>;
}

export default function Header({ activePillar, onSelectPillar, counts }: HeaderProps) {
  const navItems: { id: PillarId | "all"; label: string; code: string }[] = [
    { id: "all", label: "Tous les cas", code: "ALL" },
    { id: "product-tech", label: "Product & Tech", code: "01" },
    { id: "marketing-strategy", label: "Marketing & CX", code: "02" },
    { id: "creation-design", label: "Innovation & Design", code: "03" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#09090b]/80 border-b border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Profile Branding */}
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center font-display font-bold text-xs tracking-widest text-white">
            MB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-sm uppercase tracking-wider text-white">
                Matthieu Baudier
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
                Paris
              </span>
            </div>
            <p className="text-[11px] font-mono text-zinc-400 tracking-tight">
              Product Manager • Ingénieur Systémique • Fondateur BAUM Studio
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <nav className="flex items-center overflow-x-auto no-scrollbar gap-1 py-1 -mx-2 px-2 md:mx-0 md:px-0">
          {navItems.map((item) => {
            const isActive = activePillar === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectPillar(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider transition-colors duration-200 rounded-md whitespace-nowrap flex items-center gap-2 ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-white/[0.08] border border-white/10 rounded-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 text-[10px] opacity-60">{item.code}</span>
                <span className="relative z-10 font-medium">{item.label}</span>
                <span className="relative z-10 text-[10px] px-1.5 py-0.2 rounded bg-white/[0.05] text-zinc-400 font-mono">
                  {counts[item.id]}
                </span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
