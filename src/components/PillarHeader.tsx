"use client";

import { Pillar } from "@/data/projects";

interface PillarHeaderProps {
  pillar: Pillar;
}

export default function PillarHeader({ pillar }: PillarHeaderProps) {
  return (
    <div className="pt-24 pb-10 relative">
      {/* Subtle Color Accent Gradient background for section demarcation */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-30"
        style={{
          background: `radial-gradient(800px circle at 10% 40%, ${pillar.accentColor}0a, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className="font-mono text-xs font-bold px-2 py-0.5 rounded uppercase tracking-widest text-zinc-300"
              style={{ backgroundColor: `${pillar.accentColor}18`, color: pillar.accentColor }}
            >
              PILIER {pillar.number}
            </span>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              {pillar.subtitle}
            </span>
          </div>
          
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            {pillar.title}
          </h3>
        </div>

        <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
          {pillar.description}
        </p>
      </div>
    </div>
  );
}
