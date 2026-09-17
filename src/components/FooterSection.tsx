"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function MagneticBlock({
  label,
  value,
  href,
  isCopy = false,
}: {
  label: string;
  value: string;
  href: string;
  isCopy?: boolean;
}) {
  const { translate } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 220, damping: 22, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 22, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    mouseX.set(distanceX * 0.25);
    mouseY.set(distanceY * 0.25);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isCopy) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative flex flex-col items-center group cursor-pointer select-none"
    >
      {/* Action Verb Label Prompt */}
      <span className="font-body text-sm uppercase tracking-widest text-gray-400 mb-2 group-hover:text-[#00B2A9] transition-colors font-medium">
        {label}
      </span>

      {/* Giant Data Value */}
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        className="font-display font-medium text-4xl md:text-5xl lg:text-7xl text-white group-hover:text-[#00B2A9] group-hover:opacity-90 tracking-tight transition-all duration-300"
      >
        {value}
      </a>

      {copied && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -bottom-8 font-body text-xs text-[#00B2A9] bg-white/10 px-3.5 py-1 rounded-full border border-[#00B2A9]/30 backdrop-blur-xs"
        >
          {translate("✓ Copié dans le presse-papier !", "✓ Copied to clipboard!")}
        </motion.span>
      )}
    </motion.div>
  );
}

export default function FooterSection() {
  const { translate } = useLanguage();

  return (
    <footer id="contact" className="w-full min-h-screen flex flex-col justify-between items-center bg-[#1A1A1A] dark:bg-[#070A10] text-[#F0EBE1] py-16 px-6 sm:px-12 relative overflow-hidden select-none border-t border-white/10 dark:border-slate-800/80 mt-16 transition-colors duration-500">
      {/* Background Decorative Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-[#00B2A9]/10 blur-3xl pointer-events-none" />

      {/* Top Spacer / Layout Balancer */}
      <div className="w-full" />

      {/* Main Content Area (3 Magnetic Blocks) */}
      <div className="w-full max-w-5xl flex flex-col items-center text-center z-10 py-6">
        
        {/* Availability Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-body text-[#F0EBE1] backdrop-blur-md mb-12"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-medium tracking-wide">
            {translate("À la recherche de nouvelles opportunités à Paris", "Seeking new opportunities in Paris")}
          </span>
        </motion.div>

        {/* 3 Distinct Action Blocks */}
        <div className="flex flex-col gap-12 md:gap-16 items-center justify-center w-full my-4">
          
          {/* Block 1: Email */}
          <MagneticBlock
            label={translate("Écrivez-moi", "Email me")}
            value="matthieubaudier@gmail.com"
            href="mailto:matthieubaudier@gmail.com"
            isCopy
          />

          {/* Block 2: Phone */}
          <MagneticBlock
            label={translate("Appelez-moi", "Call me")}
            value="07.69.17.19.09"
            href="tel:0769171909"
          />

          {/* Block 3: LinkedIn */}
          <MagneticBlock
            label={translate("Réseautons", "Let's connect")}
            value="LinkedIn ↗"
            href="https://www.linkedin.com/in/matthieu-baudier/"
          />

        </div>

      </div>

      {/* Signature & Copyright */}
      <div className="pt-10 text-center border-t border-white/10 w-full max-w-4xl z-10 opacity-60">
        <p className="font-body text-xs sm:text-sm text-gray-400 tracking-wide font-medium">
          {translate(
            "© 2026 Matthieu Baudier. Tous droits réservés. // Ingénieur mais pas que...",
            "© 2026 Matthieu Baudier. All rights reserved. // Engineer and then some..."
          )}
        </p>
      </div>

    </footer>
  );
}

