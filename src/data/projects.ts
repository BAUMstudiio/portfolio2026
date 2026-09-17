export type PillarId = "product-tech" | "marketing-strategy" | "creation-design";

export interface Pillar {
  id: PillarId;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
}

export interface CaseStudySection {
  problem: {
    title: string;
    painPoint: string;
    objective: string;
  };
  solution: {
    title: string;
    methodology: string;
    deliverable: string;
  };
  impact: {
    title: string;
    measurable: string;
    deliverablesList: string[];
  };
  stack: {
    methodologies: string[];
    toolsAndTech: string[];
  };
}

export interface Project {
  id: string;
  pillarId: PillarId;
  title: string;
  role: string;
  context: string;
  year: string;
  summary: string;
  highlightMetric?: string;
  tags: string[];
  caseStudy: CaseStudySection;
}

export const PILLARS: Pillar[] = [
  {
    id: "product-tech",
    number: "01",
    title: "Product Management & Tech",
    subtitle: "Conception & Exécution Systémique",
    description: "Pilotage de produits digitaux et physiques à forte valeur industrielle. Méthodologie Double Diamant, architecture RAG, ergonomie et industrialisation.",
    accentColor: "#38bdf8",
  },
  {
    id: "marketing-strategy",
    number: "02",
    title: "Marketing, CX & Stratégie",
    subtitle: "Positionnement & Expérience Client",
    description: "Stratégies d'adoption produit, modélisation de l'offre et repositionnement de marque. Analyse de marché rigoureuse et structuration des parcours.",
    accentColor: "#f43f5e",
  },
  {
    id: "creation-design",
    number: "03",
    title: "Innovation & Brand Design",
    subtitle: "Exploration & Identité Visuelle",
    description: "Direction artistique, création d'univers de marque et expérimentations immersives via BAUM Studio et projets d'ingénierie créative.",
    accentColor: "#a855f7",
  },
];

export const PROJECTS: Project[] = [
  // PILIER 1: Product Management & Tech
  {
    id: "renault-onboarding",
    pillarId: "product-tech",
    title: "Application d'Intégration Onboarding",
    role: "Product Manager",
    context: "Renault Group",
    year: "2025 - 2026",
    summary: "Conception d'un cockpit unifié et d'un assistant RAG d'onboarding réduisant le délai d'intégration de 1 mois à 2 semaines pour 120 collaborateurs.",
    highlightMetric: "-50% temps d'onboarding",
    tags: ["Product Management", "Double Diamant", "RAG Assistant", "Next.js", "PRD"],
    caseStudy: {
      problem: {
        title: "Le Problème Métier",
        painPoint: "Processus d'intégration complexe et morcelé entre de multiples points de contact, générant des délais de traitement élevés, une perte de charge cognitive pour les managers et des procédures non formalisées.",
        objective: "Fluidifier l'expérience d'onboarding, réduire drastiquement le temps d'opérationnalité des nouveaux arrivants et centraliser le suivi managérial.",
      },
      solution: {
        title: "La Solution & L'Approche",
        methodology: "Application de la méthode Double Diamant : recueil des besoins par interviews, cartographie du parcours utilisateur, détection des points de friction et cadrage fonctionnel (PRD). Conception itérative d'un assistant RAG dédié et développement d'une application unifiée.",
        deliverable: "Cockpit web pour les managers centralisant les jalons d'onboarding, interface adaptative pour le collaborateur et agent conversationnel RAG spécialisé dans les bases de connaissances Renault.",
      },
      impact: {
        title: "L'Impact & Les Résultats",
        measurable: "Adoption du produit par 70% du service cible dès la première itération et réduction du cycle d'onboarding de 4 semaines à 2 semaines.",
        deliverablesList: ["Application web fonctionnelle", "Assistant RAG conversationnel", "PRD & Roadmap d'industrialisation"],
      },
      stack: {
        methodologies: ["Agile", "Design Thinking", "Product Discovery", "Analyse Fonctionnelle", "Vibe Coding"],
        toolsAndTech: ["Next.js", "Prisma", "Figma", "Copilot Studio", "GitHub Copilot", "Confluence"],
      },
    },
  },
  {
    id: "natran-seat-ergonomics",
    pillarId: "product-tech",
    title: "Dispositif Ergonomique Industriel",
    role: "Chef de Projet Développement Produit",
    context: "Natran / GRTgaz",
    year: "2024 - 2025",
    summary: "Conception et prototypage Fablab d'un siège modulaire pour soudeurs industriels visant l'éradication des TMS sur chantiers complexes.",
    highlightMetric: "0 TMS ressenti après 7h",
    tags: ["Industrial Design", "Prototypage Fablab", "TMS", "Onshape", "Matériaux"],
    caseStudy: {
      problem: {
        title: "Le Problème Métier",
        painPoint: "Soumission des soudeurs industriels à d'importants troubles musculo-squelettiques (TMS) sur chantiers extérieurs accidentés, dus à des postures répétitives et contraintes prolongées.",
        objective: "Développer une solution ergonomique nomade et adaptable permettant d'atténuer les contraintes physiologiques sur les postures à haut risque.",
      },
      solution: {
        title: "La Solution & L'Approche",
        methodology: "Immersion chantier, modélisation des mouvements de soudure, ateliers de créativité (analogie & problème inversé), sélection de matériaux légers et prototypage itératif low-to-high fidelity en Lab d'innovation.",
        deliverable: "Chaise ergonomique modulaire s'adaptant aux angles de soudure critiques et dossier de faisabilité industrielle.",
      },
      impact: {
        title: "L'Impact & Les Résultats",
        measurable: "Validation d'usage concluante avec absence totale de douleurs articulaires rapportées par les opérateurs après des sessions de 7h.",
        deliverablesList: ["Prototype fonctionnel validé", "Plan d'industrialisation", "Étude prospective des gestes métiers"],
      },
      stack: {
        methodologies: ["Design Thinking", "Ergonomie Industrielle", "Atelier de Co-création", "Analyse des Matériaux"],
        toolsAndTech: ["Onshape", "Impression 3D", "Découpe Laser", "Figma", "Canva"],
      },
    },
  },
  {
    id: "72h-agiles-carsat",
    pillarId: "product-tech",
    title: "Hackathon 72h Agiles",
    role: "Product Designer & Developer",
    context: "Carsat / 72h Agiles",
    year: "2024",
    summary: "Conception et développement d'une solution d'assistance et de prévention des risques en 72 heures chrono.",
    highlightMetric: "Projet finaliste",
    tags: ["Hackathon", "Agile", "Prototypage Rapide", "UX/UI"],
    caseStudy: {
      problem: {
        title: "Le Problème Métier",
        painPoint: "Besoin d'une solution innovante et déployable rapidement pour répondre aux enjeux de prévention des risques de la Carsat.",
        objective: "Prototyper une solution digitale fonctionnelle et centrée utilisateur en un temps record (72h).",
      },
      solution: {
        title: "La Solution & L'Approche",
        methodology: "Méthodologie agile condensée, idéation rapide, maquettage intensif et développement d'un MVP démontrable.",
        deliverable: "Application MVP interactive présentée devant le jury d'experts.",
      },
      impact: {
        title: "L'Impact & Les Résultats",
        measurable: "Validation du concept par les experts métiers et sélection parmi les projets finalistes.",
        deliverablesList: ["Maquettes UX/UI", "MVP Fonctionnel", "Pitch Deck"],
      },
      stack: {
        methodologies: ["Agile", "Design Thinking", "Rapid Prototyping"],
        toolsAndTech: ["Figma", "Next.js", "GitHub"],
      },
    },
  },
  {
    id: "renault-ai-assistants",
    pillarId: "product-tech",
    title: "Assistants IA & Prototypage Dynamique",
    role: "Product Manager Tech",
    context: "Renault Group",
    year: "2025 - 2026",
    summary: "Déploiement d'une suite d'assistants RAG et automatisation des workflows internes pour accélérer la prise de décision opérationnelle.",
    highlightMetric: "Workflows RAG opérationnels",
    tags: ["IA Générative", "RAG Workflows", "POCs", "Product Strategy"],
    caseStudy: {
      problem: {
        title: "Le Problème Métier",
        painPoint: "Dispersion de l'information technique et complexité d'accès aux procédures internes limitant la réactivité des équipes projet.",
        objective: "Concevoir des prototypes dynamiques d'assistants IA et structurer des workflows RAG directement intégrés dans les outils du quotidien.",
      },
      solution: {
        title: "La Solution & L'Approche",
        methodology: "Cartographie des cas d'usage à fort ROI, prototypage rapide de POCs conversationnels, itération continue avec les utilisateurs métiers et affinement des règles de grounding.",
        deliverable: "Suite d'assistants IA spécialisés et connectés aux bases documentaires métiers avec interfaces de test interactives.",
      },
      impact: {
        title: "L'Impact & Les Résultats",
        measurable: "Réduction significative du temps de recherche documentaire et validation de la faisabilité pour déploiement à l'échelle du groupe.",
        deliverablesList: ["POCs interactifs RAG", "Spécifications d'intégration IA", "Guide de prompt engineering métier"],
      },
      stack: {
        methodologies: ["Product Discovery", "Prototypage IA", "UX Conversationnelle", "Workflow Engineering"],
        toolsAndTech: ["Copilot Studio", "Next.js", "Python", "OpenAI APIs", "Figma"],
      },
    },
  },

  // PILIER 2: Marketing, CX & Stratégie
  {
    id: "renault-cx-strategy",
    pillarId: "marketing-strategy",
    title: "Stratégie Expérientielle Produits Digitaux",
    role: "Product Manager & CX Strategist",
    context: "Renault Group (Augmented Renault)",
    year: "2025 - 2026",
    summary: "Définition du cadre d'expérience unifié et du Tone of Voice pour la suite d'outils augmentés à destination des collaborateurs.",
    highlightMetric: "Cohérence multi-produits",
    tags: ["CX Strategy", "User Journey", "Tone of Voice", "Design System"],
    caseStudy: {
      problem: {
        title: "Le Brief Créatif / Problème Métier",
        painPoint: "Expérience utilisateur morcelée en raison de la multiplication des produits digitaux internes développés indépendamment par le pôle Augmented Renault.",
        objective: "Instaurer une ligne d'expérience produit homogène, fluide et reconnaissable pour soutenir l'adoption applicative globale.",
      },
      solution: {
        title: "La Solution & L'Approche",
        methodology: "Animation d'ateliers de co-conception, modélisation des User Journey Maps transversales, benchmark ergonomique et structuration d'un UX Brief stratégique.",
        deliverable: "Stratégie d'adoption globale incluant la grille de maturité UX, la ligne éditoriale (Tone of Voice) et le système de composants unifié.",
      },
      impact: {
        title: "L'Impact & Les Résultats",
        measurable: "Harmonisation des standards de conception sur 5 produits stratégiques de la suite applicative.",
        deliverablesList: ["UX Brief Global", "User Journey Map transverse", "Guide de Tone of Voice"],
      },
      stack: {
        methodologies: ["Design Thinking", "CX Benchmarking", "User Journey Mapping", "Tone of Voice"],
        toolsAndTech: ["Figma", "Miro", "Confluence"],
      },
    },
  },
  {
    id: "loreal-solisseo",
    pillarId: "marketing-strategy",
    title: "Innovation Cosmétique 'Solisséo'",
    role: "Chef de Produit Innovation",
    context: "L'Oréal Brandstorm",
    year: "2025",
    summary: "Conception et stratégie Go-To-Market d'un soin masculin express et éco-conçu simplifiant l'accès à la cosmétique quotidienne.",
    highlightMetric: "Projet Sélectionné L'Oréal",
    tags: ["Go-To-Market", "Éco-Conception", "Mix Marketing", "Blender", "Branding"],
    caseStudy: {
      problem: {
        title: "Le Brief Créatif / Problème Métier",
        painPoint: "Désintérêt et réticence de la cible masculine envers les routines cosmétiques traditionnelles, perçues comme trop longues et complexes.",
        objective: "Créer un produit cosmétique masculin universel, instantané et éco-responsable brisant les barrières d'usage.",
      },
      solution: {
        title: "La Solution & L'Approche",
        methodology: "Analyse des comportements de consommation, co-développement de la formule avec une formulatrice cosmétique, élaboration du Mix Marketing et du packaging 3D.",
        deliverable: "Dossier de marque 'Solisséo' intégrant le business model, le plan de déploiement omnicanal et les modélisations packaging.",
      },
      impact: {
        title: "L'Impact & Les Résultats",
        measurable: "Proposition saluée par le jury L'Oréal pour l'équilibre entre faisabilité technique, éco-conception et stratégie d'acquisition.",
        deliverablesList: ["Visuels Packaging 3D", "Deck de Présentation Strategic Go-To-Market", "Dossier d'Éco-conception"],
      },
      stack: {
        methodologies: ["Étude de Marché", "Mix Marketing", "Business Modeling", "Branding Produit"],
        toolsAndTech: ["Figma", "Blender", "Illustrator", "Suite Office"],
      },
    },
  },
  {
    id: "elanavriin-retail-repositioning",
    pillarId: "marketing-strategy",
    title: "Repositionnement Stratégique Retail",
    role: "Chef de Projet Marketing",
    context: "Elanavriin",
    year: "2024 - 2025",
    summary: "Pivot stratégique et conception d'un modèle commercial nomade hybride (live-shopping & itinérance) suite à la fermeture du point de vente physique.",
    highlightMetric: "Nouveau Concept Vente Nomade",
    tags: ["Retail Pivot", "Modèle Kano", "Market Analysis", "Business Model"],
    caseStudy: {
      problem: {
        title: "Le Problème Métier",
        painPoint: "Chute d'activité contraignant l'enseigne de prêt-à-porter de seconde main Elanavriin à fermer sa boutique physique et réinventer son canal de vente.",
        objective: "Redéfinir le positionnement de marque et structurer un nouveau concept retail rentable à fort engagement communautaire.",
      },
      solution: {
        title: "La Solution & L'Approche",
        methodology: "Étude comparative du marché de l'upcycling, enquêtes clients, hiérarchisation des attentes par le Modèle Kano et conception du concept de boutique nomade itinérante.",
        deliverable: "Recommandation stratégique complète englobant le plan de transition, la proposition de valeur et la modélisation financière.",
      },
      impact: {
        title: "L'Impact & Les Résultats",
        measurable: "Validation du concept de vente hybride combinant itinérance urbaine ciblée et sessions de live-shopping digital.",
        deliverablesList: ["Deck de Positionnement Stratégique", "Business Model & Roadmap", "Maquettes Concept Nomade"],
      },
      stack: {
        methodologies: ["Modèle Kano", "Analyse Concurrentielle", "Interview Client", "User Journey"],
        toolsAndTech: ["Figma", "Canva", "Suite Office"],
      },
    },
  },

  // PILIER 3: Innovation, Création & Design
  {
    id: "carsat-board-game",
    pillarId: "creation-design",
    title: "Direction Artistique Jeu de Société",
    role: "Directeur Artistique & Graphiste",
    context: "CARSAT Moselle / BAUM Studio",
    year: "2025 - 2026",
    summary: "Création graphique complète et suivi de fabrication pour un jeu pédagogique de prévention des risques professionnels.",
    highlightMetric: "200+ Assets Print Produits",
    tags: ["Direction Artistique", "Print Design", "BAUM Studio", "Packaging"],
    caseStudy: {
      problem: {
        title: "Le Brief Créatif",
        painPoint: "Besoin de la CARSAT d'éditer un outil ludique de formation à la prévention des risques professionnels pour captiver les équipes en entreprise.",
        objective: "Concevoir l'univers visuel global et assurer la direction de production d'un jeu de société complet (cartes, plateau, jetons, livret).",
      },
      solution: {
        title: "La Solution & L'Approche",
        methodology: "Étude des contraintes d'impression industrielle, idéation d'un langage graphique accessible et vectorisation d'un set de 200 cartes et éléments de jeu.",
        deliverable: "Ensemble complet des fichiers prêts à l'impression : packaging, plateau rigide, pions sur mesure, cartes thématiques et règles du jeu.",
      },
      impact: {
        title: "L'Impact & Les Résultats",
        measurable: "Livraison d'un kit de jeu clé en main conforme aux exigences d'accessibilité et aux contraintes de production de l'imprimeur.",
        deliverablesList: ["Set de 200 cartes", "Plateau de jeu & Packaging", "Livret de règles & Signalétique"],
      },
      stack: {
        methodologies: ["Direction Artistique", "Moodboarding", "Suivi d'Impression", "Design Système Print"],
        toolsAndTech: ["Illustrator", "InDesign", "Photoshop"],
      },
    },
  },
  {
    id: "radaz-brand-identity",
    pillarId: "creation-design",
    title: "Identité Visuelle 'Le Radaz'",
    role: "Directeur Artistique",
    context: "Le Radaz / BAUM Studio",
    year: "2025",
    summary: "Rebranding global d'un restaurant d'altitude : identité de marque, logotype, charte typographique et supports physiques.",
    highlightMetric: "Rebranding complet d'Établissement",
    tags: ["Brand Identity", "Tone of Voice", "Logotype", "Branding Hospitality"],
    caseStudy: {
      problem: {
        title: "Le Brief Créatif",
        painPoint: "Nécessité de moderniser la marque d'un restaurant d'altitude emblématique afin d'affirmer son positionnement premium face à la concurrence.",
        objective: "Créer un univers visuel fort, ancré dans l'héritage alpin tout en instaurant une élégance contemporaine sur l'ensemble des points de contact.",
      },
      solution: {
        title: "La Solution & L'Approche",
        methodology: "Mapping concurrentiel, formalisation des piliers de marque, création d'une typographie emblématique, déclinaisons d'illustrations et habillage des éléments physiques.",
        deliverable: "Charte graphique complète, déclinaisons logotypiques, cartes des menus, signalétique extérieure et vêtements du personnel.",
      },
      impact: {
        title: "L'Impact & Les Résultats",
        measurable: "Repositionnement réussi avec une identité visuelle unifiée valorisant l'expérience gastronomique en altitude.",
        deliverablesList: ["Brand Book complet", "Logotype & Système Visuel", "Assets physiques (Menus, Signalétique)"],
      },
      stack: {
        methodologies: ["Brand Identity", "Tone of Voice", "Mapping Concurrentiel", "Art Direction"],
        toolsAndTech: ["Illustrator", "InDesign", "Photoshop", "Figma"],
      },
    },
  },
  {
    id: "renault-r5-turbo-3e",
    pillarId: "creation-design",
    title: "Expérience Virtuelle R5 Turbo 3E",
    role: "Product Manager Transverse & Creative Tech",
    context: "Renault Group",
    year: "2026",
    summary: "Pistes d'expérience immersive VR et génération d'assets IA pour accompagner le parcours d'attente des futurs acquéreurs.",
    highlightMetric: "3 Pistes Créatives Immersives",
    tags: ["Creative Tech", "Generative AI", "Virtual Reality", "Motion Design"],
    caseStudy: {
      problem: {
        title: "Le Brief Créatif",
        painPoint: "Délai d'attente conséquent entre la commande et la livraison d'un véhicule d'exception, risquant de diluer l'enthousiasme du client.",
        objective: "Concevoir une immersion virtuelle haut de gamme permettant au futur propriétaire de s'approprier son véhicule à distance.",
      },
      solution: {
        title: "La Solution & L'Approche",
        methodology: "Exploration de concepts immersifs en réalité virtuelle, génération guidée de visuels via IA générative et itération sur les pistes de motion design.",
        deliverable: "Trois concepts d'expérience VR modélisés et présentés sous forme de storyboards dynamiques et d'intentions de design.",
      },
      impact: {
        title: "L'Impact & Les Résultats",
        measurable: "Sélection des pistes créatives par le pôle innovation pour la concrétisation du prototype d'expérience client.",
        deliverablesList: ["Storyboards VR", "Assets Visuels IA", "Dossier d'Intentions Design"],
      },
      stack: {
        methodologies: ["Génération IA", "Creative Direction", "Storyboarding Immersif"],
        toolsAndTech: ["Google AI Studio", "Midjourney", "Figma", "Illustrator"],
      },
    },
  },
  {
    id: "vision-dome-engineering",
    pillarId: "creation-design",
    title: "Projet Ingénierie 'Vision Dôme'",
    role: "Consultant Design Thinking",
    context: "Vision Dôme (Allemagne)",
    year: "2024",
    summary: "Prototypage de solutions passives en énergie pour dômes géodésiques et identité visuelle de la marque Custdome.",
    highlightMetric: "Prototypage Énergétique Passif",
    tags: ["Systemic Engineering", "Design Thinking", "Fablab", "Custdome Branding"],
    caseStudy: {
      problem: {
        title: "Le Problème Métier",
        painPoint: "Coût énergétique et contrainte de maintenance des serres géodésiques pour le maintien d'un écosystème végétal optimal.",
        objective: "Implémenter des mécanismes passifs en énergie (irrigation & drainage autonomes) et créer l'identité visuelle de l'offre.",
      },
      solution: {
        title: "La Solution & L'Approche",
        methodology: "Personas utilisateurs de serres, benchmark des transferts d'eau passifs, prototypage en FabLab et branding du projet sous le nom Custdome.",
        deliverable: "Dispositif d'irrigation et de drainage autonome fonctionnel assorti des posters et de la charte visuelle du groupe.",
      },
      impact: {
        title: "L'Impact & Les Résultats",
        measurable: "Validation technique du système d'arrosage sans apport électrique externe lors des essais en laboratoire.",
        deliverablesList: ["Prototype d'irrigation passif", "Posters stratégiques", "Identité Visuelle Custdome"],
      },
      stack: {
        methodologies: ["Design Thinking", "Analyse de la Valeur", "Prototypage Rapide", "Branding"],
        toolsAndTech: ["Impression 3D", "Découpe Laser", "Adobe Illustrator", "Mural"],
      },
    },
  },
  {
    id: "sgdf-content-creation",
    pillarId: "creation-design",
    title: "Content Creation & Supports C-Level",
    role: "Directeur de Création & Media Designer",
    context: "SGDF & Projets Stratégiques",
    year: "2024 - 2026",
    summary: "Production de contenus vidéo à fort impact et templates de présentations stratégiques pour comités de direction.",
    highlightMetric: "Supports C-Level Premium",
    tags: ["Video Production", "Executive Presentations", "Storytelling", "Visual Assets"],
    caseStudy: {
      problem: {
        title: "Le Brief Créatif",
        painPoint: "Manque d'homogénéité visuelle dans les présentations de haut niveau et besoin d'incarner les projets stratégiques par la vidéo.",
        objective: "Créer des standards visuels d'excellence pour valoriser les messages clés auprès des décideurs.",
      },
      solution: {
        title: "La Solution & L'Approche",
        methodology: "Scénarisation, tournage et montage vidéo, conception d'un système de templates PPT/Keynote au design éditorial épuré.",
        deliverable: "Vidéos institutionnelles finalisées et système de slides modulaires à forte lisibilité.",
      },
      impact: {
        title: "L'Impact & Les Résultats",
        measurable: "Adoption des templates par la direction et augmentation de l'engagement lors des comités de validation.",
        deliverablesList: ["Master Templates Présentation", "Capsules Vidéo Produits", "Banque d'Assets Visuels"],
      },
      stack: {
        methodologies: ["Executive Storytelling", "Montage Vidéo", "Design Système Slide"],
        toolsAndTech: ["Premiere Pro", "After Effects", "PowerPoint", "Figma"],
      },
    },
  },
];
