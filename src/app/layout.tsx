import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matthieu Baudier — Product Manager, Ingénieur & Directeur Artistique",
  description: "Portfolio hybride : Ingénieur en Innovation, Product Manager & Directeur Artistique (BAUM Studio). Spécialiste de la conception produit, de l'IA et de l'expérience de marque à Paris.",
  keywords: ["Product Manager", "Ingénieur Innovation", "Directeur Artistique", "Design Thinking", "Renault Group", "Paris"],
  authors: [{ name: "Matthieu Baudier" }],
  openGraph: {
    title: "Matthieu Baudier — Product Manager & Ingénieur Innovation",
    description: "Portfolio hybride : Conception produit, IA, ergonomie et direction artistique.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-[#F0EBE1] text-[#1A1A1A] antialiased selection:bg-[#00B2A9]/20 selection:text-[#1A1A1A] h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
