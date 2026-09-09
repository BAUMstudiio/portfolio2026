"use client";

import { ArrowUpRight, Mail, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#09090b] pt-20 pb-16 relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(1000px circle at 50% 100%, rgba(255, 255, 255, 0.05), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Main CTA & Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
              Prise de contact & Collaborations
            </span>
            <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight uppercase">
              Concevons le prochain produit stratégique.
            </h3>
            <p className="text-zinc-400 text-base max-w-xl leading-relaxed">
              Disponible pour des rôles de Head of Product, Senior Product Manager, ou des missions de direction créative et d'innovation systémique à Paris & Remote.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4 font-mono text-xs">
            <a
              href="mailto:contact@matthieubaudier.com"
              className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-400" />
                <span className="text-zinc-200 font-medium">contact@matthieubaudier.com</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-zinc-300">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-zinc-300">GitHub</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Matthieu Baudier — All rights reserved.
          </div>

          <div className="flex items-center gap-4 tracking-wider">
            <span>Next.js App Router</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Framer Motion</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
