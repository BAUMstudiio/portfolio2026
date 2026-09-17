"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "fr" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
  translate: (fr: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang") as Language;
    if (saved === "fr" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("portfolio_lang", newLang);
  };

  const toggleLang = () => {
    const next = lang === "fr" ? "en" : "fr";
    setLang(next);
  };

  const translate = (fr: string, en: string) => {
    return lang === "en" ? en : fr;
  };

  // Structured Dictionary for standardized keys
  const t = (key: string): string => {
    const dict: Record<string, Record<Language, string>> = {
      // Header
      nav_expertise: { fr: "Expertise", en: "Expertise" },
      nav_projets: { fr: "Projets", en: "Projects" },
      nav_about: { fr: "À propos", en: "About" },
      nav_contact: { fr: "Contact", en: "Contact" },
      profile_name: { fr: "Matthieu Baudier", en: "Matthieu Baudier" },
      profile_title: { fr: "Ingénieur innovation & produit", en: "Innovation & Product Engineer" },
      profile_status: { fr: "En recherche d'opportunités", en: "Seeking opportunities" },

      // Hero
      hero_availability: { fr: "À la recherche de nouvelles opportunités à Paris", en: "Seeking new opportunities in Paris" },
      hero_pill_innovation: { fr: "Innovation", en: "Innovation" },
      hero_pill_produit: { fr: "Produit", en: "Product" },
      hero_pill_design: { fr: "Design", en: "Design" },
      hero_title_1: { fr: "Concevoir des produits qui font", en: "Designing products that make" },
      hero_title_highlight: { fr: "JUMPER", en: "JUMP" },
      hero_title_2: { fr: "les utilisateurs.", en: "users forward." },
      hero_subtitle_1: { fr: "Ingénieur diplômé de l'UTBM et Product Manager.", en: "Graduate Engineer from UTBM and Product Manager." },
      hero_subtitle_2: { fr: "Je transforme des problématiques complexes en expériences simples, désirables et performantes.", en: "I turn complex challenges into simple, desirable, and high-performing experiences." },
      hero_cta_projects: { fr: "Explorer les projets", en: "Explore projects" },
      hero_cta_contact: { fr: "Me contacter", en: "Contact me" },

      // Expertise
      expertise_title: { fr: "Là où j'interviens", en: "Where I intervene" },
      expertise_step_prefix: { fr: "Étape", en: "Step" },
      expertise_step1_title: { fr: "Stratégie & Cadrage", en: "Strategy & Framing" },
      expertise_step1_desc: { fr: "Alignement des équipes, définition de la vision et analyse du marché.", en: "Team alignment, vision definition, and market analysis." },
      expertise_step2_title: { fr: "Idéation & Innovation", en: "Ideation & Innovation" },
      expertise_step2_desc: { fr: "Génération de concepts nouveaux et résolution de problèmes complexes.", en: "Generating novel concepts and solving complex problems." },
      expertise_step3_title: { fr: "Design & Conception", en: "Design & Conception" },
      expertise_step3_desc: { fr: "Matérialisation des idées et définition de l'expérience utilisateur.", en: "Materializing ideas and defining user experience." },
      expertise_step4_title: { fr: "Déploiement & Industrialisation", en: "Deployment & Industrialization" },
      expertise_step4_desc: { fr: "Passage à l'échelle, mise sur le marché et garantie de la qualité produit.", en: "Scaling up, go-to-market execution, and product quality assurance." },
      expertise_stack_title: { fr: "Ma stack d'outils", en: "My tool stack" },

      // Projects / HomeClient
      projects_title: { fr: "Projets sélectionnés", en: "Selected Projects" },
      domain_1: { fr: "Product Management & Tech", en: "Product Management & Tech" },
      domain_2: { fr: "Stratégie & Expérience Client", en: "Strategy & Customer Experience" },
      domain_3: { fr: "Direction Artistique & Design", en: "Art Direction & Design" },
      studio_button: { fr: "Studio Flipbook 📖", en: "Studio Flipbook 📖" },

      // About
      about_title: { fr: "À propos", en: "About" },
      letter_title: { fr: "Lettre à moi-même", en: "Letter to myself" },
      letter_p1: {
        fr: "J'ai la conviction qu'une idée ne vaut rien si elle reste sur le papier. C'est ce qui me pousse à mettre les mains dans le cambouis pour faire exister les choses.",
        en: "I firmly believe an idea is worth nothing if it stays on paper. That's what drives me to get my hands dirty and make things happen."
      },
      letter_p2: {
        fr: "Je vis ma vie avec beaucoup de créativité. Face à un défi, mon premier réflexe est de penser out of the box pour bousculer les évidences. Je veux transformer des concepts audacieux en solutions concrètes qui ont un impact direct sur la vie des gens.",
        en: "I approach life with deep creativity. Faced with a challenge, my first instinct is to think out of the box to challenge the status quo. I want to turn bold concepts into concrete solutions that directly impact people's lives."
      },
      letter_p3: {
        fr: "Pour moi, on ne crée pas un simple produit, on crée une histoire. J'aime concevoir des expériences complètes, imaginer des immersions dans des univers singuliers. Mon but n'est pas seulement de concevoir, mais de marquer les esprits.",
        en: "To me, you don't just create a product—you create a story. I love crafting end-to-end experiences and designing immersive worlds. My goal isn't just to design, but to leave a lasting impression."
      },
      passions_title: { fr: "Passions", en: "Passions" },
      mini_cuisine_title: { fr: "Cuisine", en: "Cooking" },
      mini_cuisine_sub: { fr: "Expérimentation · Partage · Saveurs", en: "Experimentation · Sharing · Flavors" },
      mini_nature_title: { fr: "Nature & Rando", en: "Nature & Hiking" },
      mini_nature_sub: { fr: "Trail · Bivouac · Exploration", en: "Trail · Bivouac · Exploration" },
      mini_musique_title: { fr: "Musique", en: "Music" },
      mini_musique_sub: { fr: "Rythme · Flow · Écoute", en: "Rhythm · Flow · Listening" },
      mini_design_title: { fr: "Design & Peinture", en: "Design & Painting" },
      mini_design_sub: { fr: "Identité · Pop · Abstrait", en: "Identity · Pop · Abstract" },

      certs_title: { fr: "Certifications & Distinctions", en: "Certifications & Honors" },
      cert_toeic_sub: { fr: "Niveau C1", en: "C1 Level" },
      cert_72h_sub: { fr: "Sprint Hackathon", en: "Sprint Hackathon" },
      cert_72h_badge: { fr: "Vainqueur", en: "Winner" },
      cert_lean_sub: { fr: "Lean Six Sigma", en: "Lean Six Sigma" },
      cert_lean_badge: { fr: "Certifié Six Sigma", en: "Six Sigma Certified" },
      cert_lvmh_sub: { fr: "Luxe & Excellence", en: "Luxury & Excellence" },
      cert_lvmh_badge: { fr: "Certifié luxe & retail", en: "Luxury & Retail Certified" },

      nights_label: { fr: "nuits passées sous tentes.", en: "nights spent under tents." },
      music_card_subtitle: { fr: "Ma musique all-time :", en: "My all-time favorite song:" },

      // Footer
      footer_status: { fr: "À la recherche de nouvelles opportunités à Paris", en: "Seeking new opportunities in Paris" },
      footer_email_label: { fr: "Écrivez-moi", en: "Email me" },
      footer_phone_label: { fr: "Appelez-moi", en: "Call me" },
      footer_linkedin_label: { fr: "Réseautons", en: "Let's connect" },
      footer_copyright: {
        fr: "© 2026 Matthieu Baudier. Tous droits réservés. // Ingénieur mais pas que...",
        en: "© 2026 Matthieu Baudier. All rights reserved. // Engineer and much more..."
      },

      // Project Modal
      modal_close: { fr: "Fermer", en: "Close" },
      modal_context: { fr: "Contexte & Problématique", en: "Context & Challenge" },
      modal_role: { fr: "Rôle & Responsabilités", en: "Role & Responsibilities" },
      modal_summary: { fr: "Résumé de la mission", en: "Mission Summary" },
    };

    if (dict[key]) {
      return dict[key][lang];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
