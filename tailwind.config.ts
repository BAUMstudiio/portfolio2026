import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: "#F0EBE1", // Warmer, richer editorial beige background
          card: "#FFFDF9",
          subtle: "#E5DEC9",
        },
        anthracite: {
          DEFAULT: "#1A1A1A",
          muted: "#5A5A5A",
          light: "#8A8A8A",
        },
        duck: {
          DEFAULT: "#00B2A9", // Bleu Canard électrique
          hover: "#009189",
          light: "rgba(0, 178, 169, 0.1)",
        },
        coral: {
          DEFAULT: "#FF5A5F", // Corail vif accent
          light: "rgba(255, 90, 95, 0.12)",
        },
        acid: {
          DEFAULT: "#E2FF31", // Jaune acide accent
          dark: "#b8d400",
        },
      },
      fontFamily: {
        display: ["Clash Display", "var(--font-clash)"],
        body: ["Averia Libre", "var(--font-averia)"],
        sans: ["Averia Libre", "var(--font-averia)"],
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter: "-0.025em",
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
