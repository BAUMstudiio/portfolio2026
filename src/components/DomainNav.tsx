"use client";

import { motion } from "framer-motion";

export const DOMAINS = [
  "Tous les projets",
  "Product Management & Tech",
  "Stratégie & Expérience Client",
  "Direction Artistique & Design",
] as const;

export type DomainName = (typeof DOMAINS)[number];

interface DomainNavProps {
  activeDomain: DomainName;
  onSelectDomain: (domain: DomainName) => void;
  counts: Record<string, number>;
}

export default function DomainNav({ activeDomain, onSelectDomain, counts }: DomainNavProps) {
  return (
    <nav className="sticky top-0 z-30 bg-[#FBF9F6]/95 backdrop-blur-md border-b border-[#1A1A1A]/[0.06] py-5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Profile Branding Header */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#FBF9F6] font-display font-bold text-xs flex items-center justify-center">
            MB
          </div>
          <div>
            <h2 className="font-display font-bold text-sm text-[#1A1A1A] uppercase tracking-wider">
              Matthieu Baudier
            </h2>
            <p className="text-[11px] font-mono text-[#717171]">
              Product Manager & Ingénieur Innovation
            </p>
          </div>
        </div>

        {/* Minimalist Typographic Domain Selector */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1">
          {DOMAINS.map((domain) => {
            const isActive = activeDomain === domain;
            const countKey = domain === "Tous les projets" ? "all" : domain;
            const count = counts[countKey] || 0;

            return (
              <button
                key={domain}
                onClick={() => onSelectDomain(domain)}
                className={`relative font-display text-sm tracking-tight transition-opacity duration-300 whitespace-nowrap flex items-center gap-2 py-1 ${
                  isActive ? "opacity-100 font-bold text-[#1A1A1A]" : "opacity-50 hover:opacity-80 text-[#1A1A1A]"
                }`}
              >
                <span>{domain}</span>
                <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-[#1A1A1A]/[0.05] text-[#717171]">
                  {count}
                </span>

                {/* Subtle Electric Duck Blue Indicator Dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeDomainDot"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00B2A9] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </nav>
  );
}
