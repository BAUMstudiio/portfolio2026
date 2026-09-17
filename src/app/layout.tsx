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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#FCFAF8] dark:bg-[#121212] text-slate-900 dark:text-[#F0EBE1] transition-colors duration-500 antialiased selection:bg-[#00B2A9]/20 selection:text-slate-900 min-h-screen overflow-y-auto overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
