# Design Guidelines : Portfolio Hybride  
  
## 1. Vision & Principes UX  
L'interface doit refléter l'exigence d'un studio créatif tout en offrant une expérience utilisateur (UX) irréprochable et intuitive. Le rendu est premium, épuré et chaleureux. La technique s'efface au profit du contenu créatif et stratégique.  
*   **Minimalisme chaleureux :** L'espace blanc (whitespace) structure la page pour éviter toute surcharge cognitive et guider l'œil naturellement.  
*   **Affordance claire :** Les éléments cliquables et interactifs se distinguent par l'usage maîtrisé de la couleur, sans recourir à des boutons massifs.  
*   **Démarcation fluide :** Exclusion totale des systèmes de classification lourds (pas de bordures épaisses, pas de "bento boxes"). Les sections se séparent par la respiration de la mise en page et de très légers gradients.  
  
## 2. Fondations Visuelles  
  
### 2.1. Palette de Couleurs  
Un équilibre entre la douceur du fond et l'énergie électrique des accents pour rythmer l'interface.  
*   **Fond Principal (Background) :** Beige très clair / Alabaster (ex: `#FBF9F6`). Apporte de la chaleur et de l'élégance.  
*   **Texte Principal :** Gris anthracite profond (ex: `#1A1A1A`) pour un contraste optimal et une lecture confortable.  
*   **Couleur Primaire (Accent) :** Bleu Canard électrique (ex: `#459B8D` ou `#0CB0A9`). Utilisé pour les appels à l'action, les interactions au survol et les éléments de mise en valeur.  
*   **Couleur Secondaire (Soutien) :** Une teinte électrique complémentaire (ex: un Corail vif `#FF5A5F` ou un Jaune acide `#E2FF31`) utilisée avec une extrême parcimonie (ex: pour un tag ou une micro-interaction spécifique) pour maintenir la cohérence colorée.  
  
### 2.2. Typographie  
Une combinaison radicale qui marque instantanément l'identité du portfolio.  
*   **Titres (Display) :** *Clash Display*. Utilisée pour les accroches et les titres de sections. Géométrique, audacieuse, avec un tracking légèrement resserré pour un impact visuel fort.  
*   **Corps de texte (Body) :** *Averia* (Averia Serif ou Sans Libre). Organique et adoucie, elle crée un contraste texturé avec les titres tout en restant très lisible pour les descriptions de projets. Hauteur de ligne généreuse (1.6).  
  
## 3. Architecture & Tone of Voice  
  
### 3.1. Structure des Domaines d'Expertise  
L'architecture de l'information est divisée en trois champs d'action clairs, sans utiliser le mot "pilier" :  
1.  **Product Management & Tech**  
2.  **Stratégie & Expérience Client**  
3.  **Direction Artistique & Design**  
  
### 3.2. Tonalité Éditoriale  
*   **Clair et Professionnel :** Le discours permet à tout interlocuteur de comprendre immédiatement la valeur apportée, les problèmes résolus et les résultats concrets.  
*   **Vocabulaire Mesuré :** Le ton est direct et factuel. Exclusion totale des formulations agressives, du terme "résilience", ou des expressions type "approche terrain".  
  
## 4. Composants & Interactions  
  
### 4.1. Fiches Projets  
*   Mise en page asymétrique autorisée pour valoriser les visuels.  
*   Au repos, la fiche projet se fond dans l'environnement beige.  
*   Au survol (Hover), une micro-interaction organique (via Framer Motion) révèle subtilement le bleu canard électrique (ex: changement de couleur du titre, apparition d'un tag, ou léger dégradé interactif très transparent).  
  
### 4.2. Navigation  
*   Fluide et discrète. Le scroll est l'interaction principale, accompagné d'apparitions douces des éléments textuels et visuels (Fade-in).  
