"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F6]/90 backdrop-blur-md border-b border-[#1A1A1A]/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4">
        
        {/* Brand Identification */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1A1A1A] text-[#FBF9F6] font-display font-bold text-xs tracking-widest flex items-center justify-center">
            MB
          </div>
          <div>
            <h2 className="font-display font-bold text-sm tracking-wide text-[#1A1A1A] uppercase">
              Matthieu Baudier
            </h2>
            <p className="text-[11px] font-mono text-[#717171] tracking-tight">
              Product Manager & Ingénieur Innovation
            </p>
          </div>
        </div>

        {/* Contact CTA Button */}
        <a
          href="mailto:contact@matthieubaudier.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] hover:bg-[#00B2A9] text-[#FBF9F6] font-mono text-xs uppercase tracking-wider transition-colors duration-200"
        >
          <Mail className="w-3.5 h-3.5 text-[#00B2A9] group-hover:text-white" />
          <span className="hidden sm:inline">Contact Direct</span>
        </a>

      </div>
    </header>
  );
}
