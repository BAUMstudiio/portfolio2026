"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sparkles, RotateCcw, Rocket, Play, Pause } from "lucide-react";
import Matter from "matter-js";
import { useLanguage } from "@/context/LanguageContext";

// Real Audio Samples from assets/audio/audio musique/
const AUDIO_MUSIQUE_SAMPLES = {
  kick: "/assets/audio/audio musique/KICK - DOWNFALL (0db).wav",
  snare: "/assets/audio/audio musique/SNARE - ACOUSTIC.wav",
  hihat: "/assets/audio/audio musique/HI-HAT - MARS.wav",
  noteC: "/assets/audio/audio musique/nico - fly brass.wav",
} as const;

function playSampleSound(type: "kick" | "snare" | "hihat" | "noteC") {
  if (typeof window === "undefined") return;
  try {
    const src = AUDIO_MUSIQUE_SAMPLES[type];
    if (src) {
      const audio = new Audio(src);
      audio.volume = 0.9;
      audio.currentTime = 0;
      audio.play().catch(() => {
        playSynthSound(type);
      });
      return;
    }
  } catch (e) {
    playSynthSound(type);
  }
}

// Web Audio API synth sound generator fallback
function playSynthSound(type: "kick" | "snare" | "hihat" | "noteC") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "kick") {
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.25);
      gain.gain.setValueAtTime(1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "hihat") {
      osc.type = "square";
      osc.frequency.setValueAtTime(7000, now);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "snare") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(261.63, now);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    }
  } catch (e) {
    // Audio fallback
  }
}

// Web Audio synth generator for "Jump" - Van Halen (Oberheim OB-Xa 80s synth riff)
function playVanHalenJumpSynth() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const chords = [
      { notes: [392.00, 493.88, 587.33], duration: 0.3, timeOffset: 0.0 }, // G major
      { notes: [523.25, 659.25, 783.99], duration: 0.3, timeOffset: 0.35 }, // C major
      { notes: [440.00, 523.25, 698.46], duration: 0.45, timeOffset: 0.7 }, // F/A chord
    ];

    chords.forEach(({ notes, duration, timeOffset }) => {
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + timeOffset);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1600, now + timeOffset);
        filter.frequency.exponentialRampToValueAtTime(450, now + timeOffset + duration);

        gain.gain.setValueAtTime(0.12, now + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + duration);
      });
    });
  } catch (e) {
    // Audio fallback
  }
}

// ==================== SVG VECTOR COMPONENTS ====================
function FryingPanSVG() {
  return (
    <svg width="64" height="22" viewBox="0 0 64 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="panGrad" x1="0" y1="0" x2="0" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="rimGrad" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>
      <rect x="40" y="8" width="22" height="5" rx="2.5" fill="#334155" stroke="#64748B" strokeWidth="1" />
      <rect x="56" y="9" width="5" height="3" rx="1" fill="#F59E0B" />
      <path
        d="M 3,5 C 3,5 7,18 24,18 C 41,18 45,5 45,5 L 41,5 C 41,5 37,15 24,15 C 11,15 7,5 7,5 Z"
        fill="url(#panGrad)"
        stroke="url(#rimGrad)"
        strokeWidth="1.2"
      />
      <ellipse cx="24" cy="6" rx="18" ry="3.5" fill="#0F172A" stroke="url(#rimGrad)" strokeWidth="1" />
    </svg>
  );
}

function CrepeSVG() {
  return (
    <svg
      width="58"
      height="24"
      viewBox="0 0 58 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: 'drop-shadow(0 4px 12px rgba(180,100,10,0.5)) drop-shadow(0 1px 3px rgba(0,0,0,0.5))',
        display: 'block',
      }}
    >
      <defs>
        {/* Top face: golden with pop teal-to-amber gradient */}
        <radialGradient id="cTop" cx="42%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#FFFDE7" />
          <stop offset="25%" stopColor="#FFE082" />
          <stop offset="60%" stopColor="#FFA726" />
          <stop offset="85%" stopColor="#E65100" />
          <stop offset="100%" stopColor="#BF360C" />
        </radialGradient>
        {/* Pop accent: subtle teal iridescence on top */}
        <radialGradient id="cIrid" cx="30%" cy="25%" r="45%">
          <stop offset="0%" stopColor="rgba(0,230,200,0.22)" />
          <stop offset="100%" stopColor="rgba(0,230,200,0)" />
        </radialGradient>
        {/* Specular shine */}
        <radialGradient id="cShine" cx="35%" cy="28%" r="32%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        {/* Rim vignette */}
        <radialGradient id="cRim" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(100,40,0,0.45)" />
        </radialGradient>
        {/* Side (thickness) gradient */}
        <linearGradient id="cSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C55A00" />
          <stop offset="100%" stopColor="#7A2D00" />
        </linearGradient>
      </defs>

      {/* ---- Side thickness (the 3D rim) ---- */}
      {/* Bottom arc of top face → bottom rim arc */}
      <path
        d="M3 13 Q29 20 55 13 L55 17 Q29 24 3 17 Z"
        fill="url(#cSide)"
      />

      {/* ---- Top face (slightly squashed ellipse for perspective) ---- */}
      <ellipse cx="29" cy="11" rx="26" ry="9.5" fill="url(#cTop)" />
      {/* Iridescent teal sheen */}
      <ellipse cx="29" cy="11" rx="26" ry="9.5" fill="url(#cIrid)" />
      {/* Specular highlight */}
      <ellipse cx="29" cy="11" rx="26" ry="9.5" fill="url(#cShine)" />
      {/* Rim vignette */}
      <ellipse cx="29" cy="11" rx="26" ry="9.5" fill="url(#cRim)" />

      {/* Texture: caramelized bubble spots */}
      <circle cx="16" cy="10" r="1.8" fill="#C45500" opacity="0.35" />
      <circle cx="24" cy="13.5" r="2.2" fill="#BF4400" opacity="0.30" />
      <circle cx="35" cy="9" r="1.6" fill="#C45500" opacity="0.28" />
      <circle cx="42" cy="12" r="1.4" fill="#BF4400" opacity="0.32" />
      <circle cx="20" cy="7" r="1.1" fill="#D06000" opacity="0.22" />
      <circle cx="38" cy="7.5" r="1.3" fill="#D06000" opacity="0.20" />

      {/* Crisp top-rim highlight line */}
      <ellipse cx="29" cy="11" rx="25.5" ry="9" stroke="rgba(255,220,100,0.35)" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function CardboardBoxSVG({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.9)}
      viewBox="0 0 32 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)] select-none pointer-events-none"
    >
      {/* 3D Isometric Kraft Cardboard Box */}
      {/* Top Face */}
      <polygon points="16,2 30,8 16,14 2,8" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" strokeLinejoin="round" />

      {/* Left Front Face */}
      <polygon points="2,8 16,14 16,26 2,20" fill="#D97706" stroke="#B45309" strokeWidth="0.8" strokeLinejoin="round" />

      {/* Right Front Face (Shaded) */}
      <polygon points="16,14 30,8 30,20 16,26" fill="#B45309" stroke="#92400E" strokeWidth="0.8" strokeLinejoin="round" />

      {/* Top Adhesive Seam Tape */}
      <polygon points="16,2 23,5 16,8 9,5" fill="#78350F" opacity="0.85" />

      {/* White Shipping Label on Left Face */}
      <polygon points="5,12 11,14.5 11,19.5 5,17" fill="#FEF3C7" opacity="0.9" />
      <line x1="6" y1="14" x2="10" y2="15.6" stroke="#78350F" strokeWidth="0.7" opacity="0.8" />
      <line x1="6" y1="16" x2="9" y2="17.2" stroke="#78350F" strokeWidth="0.7" opacity="0.8" />

      {/* Logistics Barcode Detail on Right Face */}
      <line x1="20" y1="15" x2="20" y2="21" stroke="#451A03" strokeWidth="0.8" opacity="0.7" />
      <line x1="22" y1="14" x2="22" y2="20" stroke="#451A03" strokeWidth="0.8" opacity="0.7" />
      <line x1="24" y1="13" x2="24" y2="19" stroke="#451A03" strokeWidth="0.8" opacity="0.7" />
      <line x1="26" y1="12" x2="26" y2="18" stroke="#451A03" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

function GreenBeltMatterPhysics() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [renderedBoxes, setRenderedBoxes] = useState<
    Array<{ id: number; x: number; y: number; angle: number; size: number }>
  >([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const parent = container.parentElement;

    const width = container.clientWidth || parent?.clientWidth || 180;
    const height = Math.max(container.clientHeight, parent?.clientHeight || 0, 220);
    const topLimitY = 56; // Barrière invisible pour s'arrêter juste sous le titre Green Belt

    // 1. Initialisation du moteur Matter.js
    const { Engine, World, Bodies } = Matter;
    const engine = Engine.create();
    engine.world.gravity.y = 1.35;

    // 2. Délimitation des murs (Le sol est calé à height pour aller tout en bas)
    const ground = Bodies.rectangle(width / 2, height + 10, width * 2, 20, {
      isStatic: true,
      friction: 0.95,
      restitution: 0.05,
    });
    const leftWall = Bodies.rectangle(-10, height / 2, 20, height * 2, {
      isStatic: true,
      friction: 0.9,
    });
    const rightWall = Bodies.rectangle(width + 10, height / 2, 20, height * 2, {
      isStatic: true,
      friction: 0.9,
    });

    // Submergence totale : Pas de limite haute (topLimit supprimé)
    World.add(engine.world, [ground, leftWall, rightWall]);

    // 3. Génération des cartons en vrac (22 cartons)
    const boxBodies: Array<{ id: number; body: Matter.Body; size: number }> = [];
    const totalBoxes = 22;

    for (let i = 0; i < totalBoxes; i++) {
      const size = 26 + Math.random() * 6; // Taille de carton ~26px - 32px
      const x = Math.random() * (width - 40) + 20;
      const y = -Math.random() * 350 - 40; // Tombent depuis le haut du conteneur
      const randomAngle = (Math.random() - 0.5) * Math.PI;

      const body = Bodies.rectangle(x, y, size, size, {
        restitution: 0.2,
        friction: 0.6,
        frictionAir: 0.012,
        density: 0.003,
        angle: randomAngle,
      });

      boxBodies.push({ id: i, body, size });
      World.add(engine.world, body);
    }

    // 4. Boucle d'animation synchronisant la physique 2D au DOM
    let animId: number;
    const frameLoop = () => {
      Engine.update(engine, 1000 / 60);

      const boxState = boxBodies.map(({ id, body, size }) => ({
        id,
        x: body.position.x,
        y: body.position.y,
        angle: body.angle,
        size,
      }));

      setRenderedBoxes(boxState);
      animId = requestAnimationFrame(frameLoop);
    };

    animId = requestAnimationFrame(frameLoop);

    // 5. Cleanup à la sortie de la souris
    return () => {
      cancelAnimationFrame(animId);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {renderedBoxes.map((b) => (
        <div
          key={b.id}
          style={{
            transform: `translate3d(${b.x - b.size / 2}px, ${b.y - b.size / 2}px, 0) rotate(${b.angle}rad)`,
            willChange: "transform",
          }}
          className="absolute top-0 left-0 flex items-center justify-center origin-center"
        >
          <span
            style={{ fontSize: `${b.size}px` }}
            className="select-none pointer-events-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-none"
          >
            📦
          </span>
        </div>
      ))}
    </div>
  );
}

function ModernRocketSVG() {
  return (
    <span className="text-4xl sm:text-5xl select-none pointer-events-none filter drop-shadow-[0_0_16px_rgba(245,158,11,0.85)] inline-block transform -rotate-45 origin-center">
      🚀
    </span>
  );
}

// ==================== 1. MINI-GAME CUISINE (JEU DE LA CRÊPE — JONGLAGE) ====================
// Physics constants
// Crepe disc dimensions (flat SVG: 58w × 24h)
const CREPE_DW = 58;
const CREPE_DH = 24;
const CREPE_HW = CREPE_DW / 2;  // half-width for collision
const CREPE_HH = CREPE_DH / 2;  // half-height for collision
const GRAVITY = 680;              // px/s²
const PAN_HALF_W = 36;            // catch zone half-width
// Launch velocity is computed dynamically in handleBoost:
// v = sqrt(2 × GRAVITY × targetRise)  —  targetRise = cardH × 0.82

type CrepePhase = 'idle' | 'playing' | 'falling' | 'gameover';

function CuisineFlippedCard() {
  const { translate } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<CrepePhase>('idle');
  // Squish state — applied to the disc container
  const [squishXY, setSquishXY] = useState<[number, number]>([1, 1]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  // posRef — outer div, receives imperative translate + rotateX (never touched by React)
  const posRef = useRef<HTMLDivElement | null>(null);
  // discRef — inner div, receives React squish state only
  const discRef = useRef<HTMLDivElement | null>(null);
  const panRef = useRef<HTMLDivElement | null>(null);

  // Physics refs (never trigger re-render)
  const panX = useRef(100);
  const cx = useRef(100);   // crepe center X
  const cy = useRef(50);    // crepe center Y
  const vx = useRef(0);
  const vy = useRef(0);
  const rotAngle = useRef(0);
  const rotVel = useRef(200);   // deg/s constant spin
  const lastT = useRef<number>(0);
  const animId = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const phaseRef = useRef<CrepePhase>('idle');
  const squishTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const stopLoop = () => {
    if (animId.current !== null) {
      cancelAnimationFrame(animId.current);
      animId.current = null;
    }
  };

  // applyDisc: imperative position/rotation update on posRef only
  // posRef is NEVER managed by React state, so there's no override conflict.
  const applyDisc = () => {
    if (!posRef.current) return;
    posRef.current.style.transform =
      `translate(${cx.current - CREPE_HW}px, ${cy.current - CREPE_HH}px) ` +
      `perspective(260px) rotateX(${rotAngle.current}deg)`;
  };

  // 4-frame squish sequence
  const triggerSquish = () => {
    squishTimeouts.current.forEach(clearTimeout);
    setSquishXY([1.4, 0.6]);
    squishTimeouts.current = [
      setTimeout(() => setSquishXY([0.85, 1.25]), 75),
      setTimeout(() => setSquishXY([1.05, 0.96]), 155),
      setTimeout(() => setSquishXY([1, 1]),       240),
    ];
  };

  // Main physics loop
  const loop = useCallback((ts: number) => {
    if (phaseRef.current !== 'playing' && phaseRef.current !== 'falling') return;
    if (!containerRef.current) return;
    if (!lastT.current) lastT.current = ts;
    const dt = Math.min((ts - lastT.current) / 1000, 0.05);
    lastT.current = ts;

    const cW = containerRef.current.clientWidth;
    const cH = containerRef.current.clientHeight;
    const panY = cH - 28;   // pan surface Y

    // Physics
    vy.current += GRAVITY * dt;
    cx.current += vx.current * dt;
    cy.current += vy.current * dt;
    rotAngle.current += rotVel.current * dt;

    // Wall bounce (sides) — elastic, satisfying rebound
    if (cx.current < CREPE_HW) {
      cx.current = CREPE_HW;
      vx.current = Math.abs(vx.current) * 0.72; // keep most energy
    }
    if (cx.current > cW - CREPE_HW) {
      cx.current = cW - CREPE_HW;
      vx.current = -Math.abs(vx.current) * 0.72;
    }

    // Ceiling: no hard bounce — just clamp so crepe can't go off-screen
    const ceilY = CREPE_HH + 34;
    if (cy.current < ceilY) {
      cy.current = ceilY;
      if (vy.current < 0) vy.current = 0; // stop upward movement, start falling
    }

    // Landing check: crepe bottom touches pan surface (only check while playing)
    if (phaseRef.current === 'playing' && cy.current + CREPE_HH >= panY && vy.current > 0) {
      const panLeft  = panX.current - PAN_HALF_W;
      const panRight = panX.current + PAN_HALF_W;
      if (cx.current >= panLeft && cx.current <= panRight) {
        // Caught on pan!
        cy.current = panY - CREPE_HH;
        // Vertical auto-bounce: 45% of card height
        const autoVy = -Math.sqrt(2 * GRAVITY * (cH * 0.45));
        vy.current = autoVy;
        // Horizontal: inject random lateral force
        const minMag = cW * 0.15;
        const extraMag = Math.random() * cW * 0.25;
        const dir = scoreRef.current % 2 === 0 ? 1 : -1;
        const jitter = Math.random() > 0.3 ? dir : -dir;
        vx.current = jitter * (minMag + extraMag);
        
        // Fluid synced rotation: exact 360 degree spin matched to flight time
        const t_flight = (2 * Math.abs(autoVy)) / GRAVITY;
        const dirRot = scoreRef.current % 2 === 0 ? 1 : -1;
        rotVel.current = dirRot * (360 / t_flight);

        scoreRef.current += 1;
        setScore(scoreRef.current);
        triggerSquish();
      } else {
        // Missed — start falling out of bounds
        phaseRef.current = 'falling';
        setPhase('falling');
        // Do not stop the loop here; let physics simulate the fall
      }
    }

    // Fell off bottom completely
    if (cy.current > cH + 60) {
      phaseRef.current = 'gameover';
      setPhase('gameover');
      stopLoop();
      return;
    }

    applyDisc();
    animId.current = requestAnimationFrame(loop);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Boost: click gives upward impulse — also starts the game
  const handleBoost = useCallback(() => {
    if (phaseRef.current === 'gameover') return;
    if (!containerRef.current) return;
    const cW = containerRef.current.clientWidth;
    const cH = containerRef.current.clientHeight;

    if (phaseRef.current === 'idle') {
      // First click: compute launch velocity dynamically so crepe reaches 82% of card height
      cx.current = panX.current;
      cy.current = cH - 28 - CREPE_HH;
      const panYLocal = cH - 28;
      const targetRise = panYLocal * 0.82;           // rise = 82% of available Y
      const launchVy = -Math.sqrt(2 * GRAVITY * targetRise);
      // Lateral drift: organic parabola, increases with card width
      vx.current = (Math.random() - 0.5) * (cW * 0.45);
      vy.current = launchVy;
      
      // Synced 360 degree rotation
      const t_flight = (2 * Math.abs(launchVy)) / GRAVITY;
      const dirRot = Math.random() > 0.5 ? 1 : -1;
      rotVel.current = dirRot * (360 / t_flight);

      lastT.current = 0;
      phaseRef.current = 'playing';
      setPhase('playing');
      stopLoop();
      animId.current = requestAnimationFrame(loop);
    } else if (phaseRef.current === 'playing') {
      // Subsequent clicks: add boost impulse proportional to card height
      const boost = -Math.sqrt(2 * GRAVITY * (cH * 0.55));
      vy.current += boost;
      // Clamp: can't go faster than a fresh launch
      const maxVy = -Math.sqrt(2 * GRAVITY * (cH * 0.88));
      if (vy.current < maxVy) vy.current = maxVy;
      
      // Resync rotation to new flight time
      const t_flight = (2 * Math.abs(vy.current)) / GRAVITY;
      const dirRot = rotVel.current > 0 ? 1 : -1; // maintain current spin direction
      rotVel.current = dirRot * (360 / t_flight);
    }
  }, [loop]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    panX.current = Math.max(PAN_HALF_W + 4, Math.min(rect.width - PAN_HALF_W - 4, x));
    if (panRef.current) {
      panRef.current.style.transform = `translateX(${panX.current - PAN_HALF_W - 8}px)`;
    }
    // Sync idle crepe to pan
    if (phaseRef.current === 'idle') {
      const cH = containerRef.current.clientHeight;
      cx.current = panX.current;
      cy.current = cH - 28 - CREPE_HH;
      applyDisc();
    }
  };

  const resetGame = useCallback(() => {
    stopLoop();
    squishTimeouts.current.forEach(clearTimeout);
    setSquishXY([1, 1]);
    scoreRef.current = 0;
    setScore(0);
    rotAngle.current = 0;
    phaseRef.current = 'idle';
    setPhase('idle');
    if (containerRef.current) {
      const cH = containerRef.current.clientHeight;
      cx.current = panX.current;
      cy.current = cH - 28 - CREPE_HH;
      applyDisc();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Park disc on card flip-in
  useEffect(() => {
    if (!isFlipped) return;
    const t = setTimeout(() => {
      if (containerRef.current) {
        const cH = containerRef.current.clientHeight;
        cx.current = panX.current || containerRef.current.clientWidth / 2;
        cy.current = cH - 28 - CREPE_HH;
        rotAngle.current = 0;
        phaseRef.current = 'idle';
        setPhase('idle');
        applyDisc();
      }
    }, 340);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlipped]);

  useEffect(() => {
    return () => {
      stopLoop();
      squishTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => {
    setIsFlipped(false);
    stopLoop();
    phaseRef.current = 'idle';
  };

  const isGameOver = phase === 'gameover';
  const isFalling = phase === 'falling';
  const hintText = (isGameOver || isFalling)
    ? ''
    : phase === 'idle'
      ? translate('clic pour lancer', 'click to start')
      : translate('clic pour booster', 'click to boost');

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="[perspective:1000px] w-full h-full min-h-[160px]"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {/* Front face */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center cursor-pointer hover:border-purple-400/40 hover:shadow-md transition-all group">
          <h3 className="font-display font-normal text-lg sm:text-xl tracking-wide text-slate-900 dark:text-slate-100 text-center group-hover:text-purple-400 transition-colors">
            {translate('Cuisine', 'Cooking')}
          </h3>
          <span className="font-body text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1.5 font-normal">
            {translate('Expérimentation · Partage · Saveurs', 'Experimentation · Sharing · Flavors')}
          </span>
        </div>

        {/* Game face */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onClick={handleBoost}
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl shadow-2xl overflow-hidden border border-slate-700/60 cursor-pointer select-none"
          style={{ background: 'linear-gradient(135deg, #0F0C29 0%, #1a1040 45%, #0c1a2e 100%)' }}
        >
          {/* Ambient glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-25 blur-2xl"
              style={{ background: 'radial-gradient(circle, #C084FC, #7C3AED)' }} />
            <div className="absolute -bottom-6 -left-4 w-24 h-24 rounded-full opacity-20 blur-2xl"
              style={{ background: 'radial-gradient(circle, #FB923C, #EC4899)' }} />
            <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full opacity-10 blur-3xl"
              style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
          </div>

          {/* Glassmorphism HUD */}
          <div className="flex items-center justify-between z-20 p-3 relative pointer-events-none">
            <div className="flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-1 shadow-lg">
              <span className="text-[9px] font-mono text-white/50 uppercase tracking-wider">Flips</span>
              <span className="text-sm font-display font-bold text-white tabular-nums">{score}</span>
            </div>
            {hintText ? (
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{hintText}</span>
            ) : null}
          </div>

          {/* Glassmorphism Game Over Overlay */}
          <AnimatePresence>
            {isGameOver && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/40 pointer-events-auto"
                onClick={(e) => { e.stopPropagation(); resetGame(); }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 bg-white/10 p-6 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md"
                >
                  <div className="text-center">
                    <p className="text-white/60 font-mono text-[10px] uppercase tracking-widest mb-1">
                      {translate('Score final', 'Final Score')}
                    </p>
                    <p className="text-5xl font-display font-bold text-white tabular-nums drop-shadow-lg">{score}</p>
                  </div>
                  <button
                    className="mt-2 text-sm font-display font-bold bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-400 hover:to-pink-400 text-white px-6 py-2.5 rounded-full cursor-pointer transition-all shadow-lg hover:scale-105 active:scale-95"
                  >
                    {translate('Réessayer', 'Retry')}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Crepe disc — two-layer: posRef handles position/rotation imperatively,
               discRef handles squish via React state. Separated to avoid transform conflicts. */}
          <div
            ref={posRef}
            className="absolute top-0 left-0 pointer-events-none z-20"
            style={{ willChange: 'transform', perspective: '260px' }}
          >
            <div
              ref={discRef}
              style={{
                willChange: 'transform',
                transformOrigin: 'center bottom',
                transform: `scaleX(${squishXY[0]}) scaleY(${squishXY[1]})`,
                transition: 'none',
              }}
            >
              <CrepeSVG />
            </div>
          </div>

          {/* Pan */}
          <div
            ref={panRef}
            className="absolute bottom-2 left-0 pointer-events-none z-20"
            style={{ willChange: 'transform' }}
          >
            <FryingPanSVG />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ==================== 2. MINI-GAME NATURE: CAIRNS CANVAS (ORGANIC PEBBLES + DELAYED GAME OVER) ====================
interface StoneCanvasObj {
  x: number;
  y: number;
  w: number;
  h: number;
  colorGrad: [string, string];
  radii: [number, number, number, number];
}

const STONE_PALETTES: [string, string][] = [
  ["#9E9288", "#5C5249"], // Granite Dark
  ["#C4BDB6", "#7A7169"], // Warm Slate
  ["#2DD4BF", "#0D9488"], // Teal Quartz Accent
  ["#BAC8D9", "#647892"], // Mountain Basalt
  ["#FBBF24", "#D97706"], // Amber Pebble
  ["#94A3B8", "#475569"], // River Stone
  ["#C084FC", "#7C3AED"], // Amethyst
];

function drawOrganicBlob(
  ctx: CanvasRenderingContext2D,
  st: { x: number; y: number; w: number; h: number; colorGrad: [string, string]; radii: [number, number, number, number] },
  isStacked: boolean = true
) {
  const cx = st.x;
  const top = st.y;
  const hw = st.w / 2;
  const h = st.h;

  ctx.save();

  // Dynamic drop shadow - deeper for lower (heavier) stones
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = isStacked ? 16 : 10;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = isStacked ? 8 : 5;

  // Organic blob body using bezierCurveTo
  // Control points offset for asymmetric, natural feel
  const r = st.radii;
  const blobTop = top;
  const blobBot = top + h;
  const left = cx - hw;
  const right = cx + hw;

  const wobble = [r[0] * 0.3, r[1] * 0.3, r[2] * 0.3, r[3] * 0.3];

  ctx.beginPath();
  ctx.moveTo(left + r[0], blobTop);
  // Top edge: slight curve up in middle for organic feel
  ctx.bezierCurveTo(
    cx - hw * 0.2, blobTop - wobble[0],
    cx + hw * 0.2, blobTop - wobble[1],
    right - r[1], blobTop
  );
  // Right side
  ctx.bezierCurveTo(
    right + wobble[1] * 0.5, blobTop + h * 0.4,
    right + wobble[2] * 0.3, blobBot - h * 0.35,
    right - r[2], blobBot
  );
  // Bottom edge: slight curve down
  ctx.bezierCurveTo(
    cx + hw * 0.2, blobBot + wobble[2] * 0.5,
    cx - hw * 0.2, blobBot + wobble[3] * 0.5,
    left + r[3], blobBot
  );
  // Left side
  ctx.bezierCurveTo(
    left - wobble[3] * 0.4, blobBot - h * 0.3,
    left - wobble[0] * 0.5, blobTop + h * 0.4,
    left + r[0], blobTop
  );
  ctx.closePath();

  // Main body gradient (top-to-bottom light)
  const grad = ctx.createLinearGradient(left, blobTop, left, blobBot);
  grad.addColorStop(0, st.colorGrad[0]);
  grad.addColorStop(0.5, st.colorGrad[1]);
  grad.addColorStop(1, adjustBrightness(st.colorGrad[1], -25));
  ctx.fillStyle = grad;
  ctx.fill();

  // Reset shadow for overlays
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Specular rim highlight (top edge)
  ctx.beginPath();
  ctx.moveTo(left + r[0], blobTop + 1);
  ctx.bezierCurveTo(cx - hw * 0.2, blobTop - wobble[0] + 1, cx + hw * 0.2, blobTop - wobble[1] + 1, right - r[1], blobTop + 1);
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Inner highlight spot (top-left)
  const spotGrad = ctx.createRadialGradient(cx - hw * 0.35, blobTop + h * 0.28, 0, cx - hw * 0.35, blobTop + h * 0.28, hw * 0.4);
  spotGrad.addColorStop(0, 'rgba(255,255,255,0.28)');
  spotGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = spotGrad;
  ctx.beginPath();
  ctx.ellipse(cx - hw * 0.35, blobTop + h * 0.28, hw * 0.4, h * 0.25, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Bottom inner shadow
  const botGrad = ctx.createLinearGradient(left, blobBot - h * 0.3, left, blobBot);
  botGrad.addColorStop(0, 'rgba(0,0,0,0)');
  botGrad.addColorStop(1, 'rgba(0,0,0,0.3)');
  ctx.fillStyle = botGrad;
  ctx.beginPath();
  ctx.moveTo(left + r[3], blobBot);
  ctx.bezierCurveTo(cx - hw * 0.2, blobBot + wobble[3] * 0.5, cx + hw * 0.2, blobBot + wobble[2] * 0.5, right - r[2], blobBot);
  ctx.lineTo(right, blobBot - h * 0.35);
  ctx.lineTo(left, blobBot - h * 0.35);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function adjustBrightness(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function NatureFlippedCard() {
  const { translate } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const [cairnScore, setCairnScore] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const stackedStonesRef = useRef<StoneCanvasObj[]>([]);
  const currentStoneRef = useRef<{
    x: number;
    y: number;
    w: number;
    h: number;
    vy: number;
    vx: number;
    isDropping: boolean;
    isFailing: boolean;
    colorGrad: [string, string];
    radii: [number, number, number, number];
  }>({
    x: 100,
    y: 20,
    w: 48,
    h: 15,
    vy: 0,
    vx: 0,
    isDropping: false,
    isFailing: false,
    colorGrad: STONE_PALETTES[0],
    radii: [6, 7, 5, 8],
  });

  const animFrameRef = useRef<number | null>(null);
  const failTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimeRef = useRef<number>(0);
  const swingTimeRef = useRef<number>(0);

  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;

    if (failTimeoutRef.current) clearTimeout(failTimeoutRef.current);

    stackedStonesRef.current = [
      {
        x: w / 2,
        y: h - 18,
        w: 58,
        h: 16,
        colorGrad: STONE_PALETTES[0],
        radii: [7, 8, 6, 9],
      },
    ];
    currentStoneRef.current = {
      x: w / 2,
      y: 20,
      w: 50,
      h: 16,
      vy: 0,
      vx: 0,
      isDropping: false,
      isFailing: false,
      colorGrad: STONE_PALETTES[1],
      radii: [8, 10, 9, 7],
    };
    setCairnScore(1);
    setGameOver(false);
  }, []);

  const triggerDrop = () => {
    if (gameOver || currentStoneRef.current.isDropping || currentStoneRef.current.isFailing) return;
    currentStoneRef.current.isDropping = true;
    currentStoneRef.current.vy = 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initGame();
    };

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);

    return () => observer.disconnect();
  }, [initGame]);

  useEffect(() => {
    if (!isFlipped) return;

    const renderLoop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min(0.05, (timestamp - lastTimeRef.current) / 1000);
      lastTimeRef.current = timestamp;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;

        if (ctx) {
          ctx.clearRect(0, 0, w, h);

          // Backdrop mountains
          ctx.fillStyle = "rgba(30, 41, 59, 0.4)";
          ctx.beginPath();
          ctx.moveTo(0, h);
          ctx.lineTo(w * 0.3, h * 0.4);
          ctx.lineTo(w * 0.6, h);
          ctx.fill();

          ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
          ctx.beginPath();
          ctx.moveTo(w * 0.35, h);
          ctx.lineTo(w * 0.7, h * 0.3);
          ctx.lineTo(w, h);
          ctx.fill();

          // Update current dropping/swinging stone
          const curr = currentStoneRef.current;
          if (!curr.isDropping && !curr.isFailing) {
            swingTimeRef.current += dt * 2.8;
            curr.x = w / 2 + Math.sin(swingTimeRef.current) * (w * 0.36);
          } else {
            curr.vy += 750 * dt; // Gravity
            curr.y += curr.vy * dt;
            curr.x += curr.vx * dt;

            // Check collision with top stacked stone
            const stack = stackedStonesRef.current;
            const topStone = stack[stack.length - 1];
            const targetY = topStone.y - curr.h;

            if (!curr.isFailing && curr.y >= targetY) {
              const diff = Math.abs(curr.x - topStone.x);
              if (diff <= topStone.w * 0.55) {
                // Stack successful! — Bounce physics
                curr.y = targetY;
                curr.vy = -curr.vy * 0.28; // Elastic bounce
                if (Math.abs(curr.vy) < 15) {
                  // Settle: lock to stack after small bounce
                  curr.vy = 0;
                  curr.isDropping = false;
                  const grad = STONE_PALETTES[stack.length % STONE_PALETTES.length];
                  const radii: [number, number, number, number] = [
                    Math.floor(curr.h * (0.5 + Math.random() * 0.4)),
                    Math.floor(curr.h * (0.5 + Math.random() * 0.4)),
                    Math.floor(curr.h * (0.45 + Math.random() * 0.35)),
                    Math.floor(curr.h * (0.45 + Math.random() * 0.35)),
                  ];
                  stack.push({
                    x: curr.x,
                    y: curr.y,
                    w: curr.w,
                    h: curr.h,
                    colorGrad: grad,
                    radii,
                  });
                  setCairnScore(stack.length);

                  // Next stone, slightly narrower
                  const nextW = Math.max(26, curr.w - 5);
                  const nextH = 16;
                  const nextRadii: [number, number, number, number] = [
                    Math.floor(nextH * (0.5 + Math.random() * 0.4)),
                    Math.floor(nextH * (0.5 + Math.random() * 0.4)),
                    Math.floor(nextH * (0.45 + Math.random() * 0.35)),
                    Math.floor(nextH * (0.45 + Math.random() * 0.35)),
                  ];
                  currentStoneRef.current = {
                    x: w / 2,
                    y: 20,
                    w: nextW,
                    h: nextH,
                    vy: 0,
                    vx: 0,
                    isDropping: false,
                    isFailing: false,
                    colorGrad: STONE_PALETTES[(stack.length + 1) % STONE_PALETTES.length],
                    radii: nextRadii,
                  };
                }
              } else {
                // Missed -> falling + delayed Game Over
                curr.isFailing = true;
                curr.vx = curr.x > topStone.x ? 140 : -140;
                failTimeoutRef.current = setTimeout(() => {
                  setGameOver(true);
                }, 1200);
              }
            }
          }

          // Draw stacked stones (bottom first for correct shadow overlap)
          stackedStonesRef.current.forEach((st, i) => {
            drawOrganicBlob(ctx, st, i > 0);
          });

          // Draw current (floating/dropping) stone
          drawOrganicBlob(ctx, curr, false);
        }
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isFlipped]);

  return (
    <div
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="[perspective:1000px] w-full h-full min-h-[160px]"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/40 hover:shadow-md transition-all group">
          <h3 className="font-display font-normal text-lg sm:text-xl tracking-wide text-slate-900 dark:text-slate-100 text-center group-hover:text-amber-600 transition-colors">
            {translate("Nature & Rando", "Nature & Hiking")}
          </h3>
          <span className="font-body text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1.5 font-normal">
            {translate("Trail · Bivouac · Exploration", "Trail · Bivouac · Exploration")}
          </span>
        </div>

        <div
          ref={containerRef}
          onClick={triggerDrop}
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl shadow-2xl flex flex-col justify-between cursor-pointer overflow-hidden border border-slate-700/50"
          style={{
            background: 'linear-gradient(160deg, #0a0e1a 0%, #0d1e17 45%, #0e1420 100%)',
          }}
        >
          {/* Atmospheric glow blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(ellipse, #2DD4BF, transparent)' }} />
            <div className="absolute top-2 right-2 w-16 h-16 rounded-full opacity-10 blur-2xl" style={{ background: 'radial-gradient(circle, #FBBF24, transparent)' }} />
          </div>

          {/* Glassmorphism HUD */}
          <div className="flex items-center justify-between z-20 p-3 pointer-events-none">
            <div className="flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-1 shadow-lg">
              <span className="text-[9px] font-mono text-white/50 uppercase tracking-wider">Cairn</span>
              <span className="text-sm font-display font-bold text-white tabular-nums">{cairnScore}</span>
            </div>
            {gameOver ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  initGame();
                }}
                className="text-[10px] font-display font-bold bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 px-3 py-1 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-amber-500/30 hover:scale-105 active:scale-95 pointer-events-auto"
              >
                ↺ Retry
              </button>
            ) : (
              <span className="text-[9px] font-mono text-white/35 uppercase tracking-widest">
                {translate("clic pour lâcher", "click to drop")}
              </span>
            )}
          </div>

          <canvas ref={canvasRef} className="block w-full h-full absolute inset-0 z-10" />
        </div>
      </motion.div>
    </div>
  );
}

// ==================== 3. MINI-GAME MUSIQUE ====================
function MusiqueFlippedCard() {
  const { translate } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const [activePad, setActivePad] = useState<number | null>(null);

  const triggerPad = (
    e: React.MouseEvent,
    padIdx: number,
    soundType: "kick" | "snare" | "hihat" | "noteC"
  ) => {
    e.stopPropagation();
    setActivePad(padIdx);
    playSampleSound(soundType);
    setTimeout(() => setActivePad(null), 180);
  };

  return (
    <div
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="[perspective:1000px] w-full h-full min-h-[160px]"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-[#0F172A] rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center cursor-pointer hover:border-purple-400/40 hover:shadow-md transition-all group">
          <h3 className="font-display font-normal text-lg sm:text-xl tracking-wide text-slate-900 dark:text-slate-100 text-center group-hover:text-purple-500 transition-colors">
            {translate("Musique", "Music")}
          </h3>
          <span className="font-body text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1.5 font-normal">
            {translate("Rythme · Flow · Écoute", "Rhythm · Flow · Listening")}
          </span>
        </div>

        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#181C24] text-white rounded-2xl p-2.5 shadow-2xl flex flex-col justify-between overflow-hidden border-2 border-stone-700/60">
          <div className="flex items-center justify-between px-2.5 py-1 bg-[#0B0F19] rounded-lg border border-[#00B2A9]/40 font-mono text-[10px] text-[#00B2A9]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              OP-1 // SYNTH
            </span>
            <span>44.1kHz</span>
          </div>

          <div className="grid grid-cols-2 gap-2 flex-1 w-full h-full my-1">
            <button
              onClick={(e) => triggerPad(e, 0, "kick")}
              className={`rounded-xl font-mono text-[10px] font-medium flex flex-col items-center justify-between p-1.5 transition-all cursor-pointer border ${
                activePad === 0
                  ? "bg-[#00B2A9] text-white border-[#00B2A9] shadow-inner translate-y-0.5"
                  : "bg-slate-800 text-stone-200 border-slate-700 hover:border-purple-400"
              }`}
            >
              <span>🥁 KICK</span>
            </button>
            <button
              onClick={(e) => triggerPad(e, 1, "snare")}
              className={`rounded-xl font-mono text-[10px] font-medium flex flex-col items-center justify-between p-1.5 transition-all cursor-pointer border ${
                activePad === 1
                  ? "bg-[#00B2A9] text-white border-[#00B2A9] shadow-inner translate-y-0.5"
                  : "bg-slate-800 text-stone-200 border-slate-700 hover:border-pink-400"
              }`}
            >
              <span>🪘 SNARE</span>
            </button>
            <button
              onClick={(e) => triggerPad(e, 2, "hihat")}
              className={`rounded-xl font-mono text-[10px] font-medium flex flex-col items-center justify-between p-1.5 transition-all cursor-pointer border ${
                activePad === 2
                  ? "bg-[#00B2A9] text-white border-[#00B2A9] shadow-inner translate-y-0.5"
                  : "bg-slate-800 text-stone-200 border-slate-700 hover:border-amber-400"
              }`}
            >
              <span>🔔 HI-HAT</span>
            </button>
            <button
              onClick={(e) => triggerPad(e, 3, "noteC")}
              className={`rounded-xl font-mono text-[10px] font-medium flex flex-col items-center justify-between p-1.5 transition-all cursor-pointer border ${
                activePad === 3
                  ? "bg-[#00B2A9] text-white border-[#00B2A9] shadow-inner translate-y-0.5"
                  : "bg-slate-800 text-stone-200 border-slate-700 hover:border-teal-400"
              }`}
            >
              <span>🎹 SYNTH</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ==================== 4. MINI-GAME DESIGN ====================
function DesignFlippedCard() {
  const { translate } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState("#00B2A9");
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = (e: React.MouseEvent) => {
    e.stopPropagation();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="[perspective:1000px] w-full h-full min-h-[160px]"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center cursor-pointer hover:border-[#00B2A9]/40 hover:shadow-md transition-all group">
          <h3 className="font-display font-normal text-lg sm:text-xl tracking-wide text-slate-900 dark:text-slate-100 text-center group-hover:text-[#00B2A9] transition-colors">
            {translate("Design & Peinture", "Design & Painting")}
          </h3>
          <span className="font-body text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1.5 font-normal">
            {translate("Identité · Pop · Abstrait", "Identity · Pop · Abstract")}
          </span>
        </div>

        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0D1117] text-white rounded-2xl p-2 shadow-2xl flex flex-col justify-between overflow-hidden border border-slate-800">
          <div className="flex items-center justify-between z-10 px-1 mb-1">
            <span className="text-[10px] font-mono text-[#00B2A9]">🎨 ART</span>
            <button
              onClick={clearCanvas}
              className="p-0.5 px-1.5 rounded bg-white/10 hover:bg-red-500 text-white transition-colors cursor-pointer text-[9px] flex items-center gap-1 font-body"
            >
              <RotateCcw className="w-2.5 h-2.5" /> CLEAR
            </button>
          </div>

          <div
            ref={containerRef}
            className="relative flex-1 bg-white rounded-lg overflow-hidden cursor-crosshair"
          >
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="block w-full h-full"
            />
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-1 z-10">
            {["#1A1A1A", "#00B2A9", "#FF5A5F", "#F4A261", "#10B981"].map((c) => (
              <button
                key={c}
                onClick={(e) => {
                  e.stopPropagation();
                  setColor(c);
                }}
                style={{ backgroundColor: c }}
                className={`w-3.5 h-3.5 rounded-full border border-white/40 cursor-pointer ${
                  color === c ? "scale-125 border-white" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ==================== CARTE MUSIQUE ALL-TIME (VAN HALEN - JUMP) ====================
class VanHalenAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private fadeInterval: any = null;

  private getAudio(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;
    if (!this.audio) {
      this.audio = new Audio("/assets/audio/Van Halen - Jump (Official Music Video).mp3");
      this.audio.loop = true;
    }
    return this.audio;
  }

  public play() {
    const audio = this.getAudio();
    if (!audio) return;

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    audio.volume = 1;
    audio.play().catch((err) => {
      console.warn("Audio playback issue:", err);
    });
  }

  public fadeOut(onComplete?: () => void) {
    const audio = this.audio;
    if (!audio || audio.paused) {
      if (onComplete) onComplete();
      return;
    }

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    const startVolume = audio.volume;
    const fadeDuration = 1200; // 1.2s fondu sonore
    const steps = 30;
    const stepTime = fadeDuration / steps;
    let currentStep = 0;

    this.fadeInterval = setInterval(() => {
      currentStep++;
      if (audio) {
        const newVol = Math.max(0, startVolume * (1 - currentStep / steps));
        audio.volume = newVol;
      }
      if (currentStep >= steps) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 1;
        }
        if (onComplete) onComplete();
      }
    }, stepTime);
  }

  public stop() {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.volume = 1;
    }
  }
}

const vanHalenAudio = new VanHalenAudioEngine();

function VanHalenJumpCard() {
  const { translate } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      vanHalenAudio.stop();
      setIsPlaying(false);
    } else {
      vanHalenAudio.play();
      setIsPlaying(true);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isPlaying) {
      // Déclenche un fondu sonore progressif (1.2s) au départ de la souris
      vanHalenAudio.fadeOut(() => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="md:col-span-3 rounded-3xl min-h-[240px] relative overflow-hidden select-none cursor-pointer border border-slate-200/80 dark:border-slate-800 transition-all duration-500 shadow-sm"
    >
      {/* 1. ÉTAT AU REPOS (Souris hors de la carte) */}
      <div
        className={`absolute inset-0 bg-white dark:bg-[#0F172A] p-6 flex flex-col items-start justify-center transition-all duration-500 ease-out z-10 ${
          isHovered ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
        }`}
      >
        <span className="font-body text-[11px] text-slate-500 dark:text-slate-400 font-normal uppercase tracking-widest block mb-1.5">
          {translate("Ma musique all-time :", "My all-time track:")}
        </span>
        <h3 className="font-display font-normal text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight leading-none mb-1">
          Jump
        </h3>
        <span className="font-body font-medium text-xs sm:text-sm text-[#00B2A9] tracking-wide">
          Van Halen
        </span>
      </div>

      {/* 2. ÉTAT AU SURVOL (Vinyle vu de haut + Bouton de lecture) */}
      <div
        className={`absolute inset-0 bg-[#0B0F19] p-4 flex flex-col items-center justify-center transition-all duration-500 ease-out z-20 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-105"
        }`}
      >
        {/* Vinyl Record 3D Top-down Graphic */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div
            className={`w-52 h-52 rounded-full bg-gradient-to-tr from-slate-950 via-zinc-900 to-slate-950 shadow-2xl relative border-2 border-zinc-800 flex items-center justify-center transition-transform ${
              isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
            }`}
            style={{
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            {/* Concentric Vinyl Grooves */}
            <div className="absolute inset-2.5 rounded-full border border-white/10 opacity-40 pointer-events-none" />
            <div className="absolute inset-6 rounded-full border border-white/10 opacity-30 pointer-events-none" />
            <div className="absolute inset-10 rounded-full border border-white/10 opacity-40 pointer-events-none" />
            <div className="absolute inset-14 rounded-full border border-white/10 opacity-20 pointer-events-none" />
            <div className="absolute inset-18 rounded-full border border-white/10 opacity-30 pointer-events-none" />

            {/* Glossy Sheen Highlights */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

            {/* Vintage Center Label (Van Halen 1984 Red/Yellow Label) */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-red-600 to-amber-500 border-2 border-zinc-900 flex flex-col items-center justify-center shadow-inner text-center p-1 relative">
              <span className="text-[8px] font-semibold text-white uppercase tracking-tighter leading-none">
                VAN HALEN
              </span>
              <span className="text-[10px] font-medium text-yellow-200 uppercase tracking-tight leading-none mt-0.5">
                JUMP
              </span>
              <span className="text-[7px] font-mono text-white/80 mt-0.5">
                33 ⅓ RPM
              </span>

              {/* Spindle Hole */}
              <div className="w-3 h-3 rounded-full bg-[#0B0F19] border border-zinc-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Central Glassmorphism Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="relative z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-[#00B2A9] text-white border border-white/40 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group/btn"
          aria-label={isPlaying ? translate("Mettre en pause", "Pause") : translate("Jouer la musique", "Play music")}
        >
          {isPlaying ? (
            <Pause className="w-5.5 h-5.5 fill-current text-white" />
          ) : (
            <Play className="w-5.5 h-5.5 fill-current text-white translate-x-0.5" />
          )}
        </button>

        {/* Audio Status & Equalizer Badge when active */}
        <div className="absolute bottom-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-white/10 text-[11px] font-mono text-white/90">
          <span className="text-[#00B2A9] font-semibold">VAN HALEN</span>
          <span>•</span>
          <span className="text-amber-400 font-medium">JUMP</span>
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3 ml-1">
              <span className="w-0.5 bg-[#00B2A9] animate-pulse h-3" />
              <span className="w-0.5 bg-[#00B2A9] animate-pulse h-2 delay-75" />
              <span className="w-0.5 bg-[#00B2A9] animate-pulse h-2.5" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ==================== MASTER COMPONENT: ABOUT BENTO SECTION ====================
interface ToeicBubbleItem {
  id: number;
  xOffset: number;
}

export default function AboutBentoSection() {
  const { lang, translate } = useLanguage();
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);
  const [toeicBubbles, setToeicBubbles] = useState<ToeicBubbleItem[]>([]);
  const [rocketKey, setRocketKey] = useState<number>(0);
  const [isPlayingJump, setIsPlayingJump] = useState<boolean>(false);

  const spawnHelloBubble = useCallback(() => {
    const newBubble: ToeicBubbleItem = {
      id: Date.now() + Math.random(),
      xOffset: (Math.random() - 0.5) * 14,
    };
    setToeicBubbles((prev) => [...prev.slice(-8), newBubble]);
  }, []);

  return (
    <section id="about" className="w-full min-h-screen flex flex-col justify-center py-16 bg-[#FCFAF8] dark:bg-[#0B0F19] relative select-none transition-colors duration-500">
      
      {/* 1. Titre "À propos" - Aligné strictement à gauche */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="w-full text-left mb-8 px-[6%] md:px-[10%]"
      >
        <h2
          className="font-medium text-4xl md:text-5xl text-[#00B2A9] tracking-tight leading-none text-left"
          style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 500 }}
        >
          {translate("À propos", "About")}
        </h2>
      </motion.div>

      {/* 12-Column Grid Master Container */}
      <div className="w-full px-[6%] md:px-[10%]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        
          {/* ==================== ROW 1, LEFT: LETTRE À MOI-MÊME (6 COLUMNS) ==================== */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="md:col-span-6 rounded-3xl bg-[#FCFAF8] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 p-8 sm:p-9 md:p-10 flex flex-col justify-between shadow-sm border border-slate-200/80 dark:border-slate-800 min-h-[380px] transition-colors duration-500 relative overflow-hidden group"
          >
            {/* Papier à carreaux subtil - Révélé uniquement au survol */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out bg-[linear-gradient(to_right,rgba(0,178,169,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,178,169,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-[#00B2A9]/10 text-[#00B2A9] border border-[#00B2A9]/20">
                  <Zap className="w-5 h-5" />
                </span>
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-slate-900 dark:text-slate-100 tracking-tight">
                  {translate("Lettre à moi-même", "Letter to myself")}
                </h3>
              </div>

              <div className="font-body text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-5 pt-1">
                <p>
                  {translate(
                    "J'ai la conviction qu'une idée ne vaut rien si elle reste sur le papier. C'est ce qui me pousse à mettre les mains dans le cambouis pour faire exister les choses.",
                    "I firmly believe an idea is worthless if it stays on paper. That's what drives me to roll up my sleeves and make things happen."
                  )}
                </p>
                <p>
                  {translate(
                    "Je vis ma vie avec beaucoup de créativité. Face à un défi, mon premier réflexe est de penser ",
                    "I live my life with plenty of creativity. When facing a challenge, my first instinct is to think "
                  )}
                  <span className="italic font-normal text-slate-900 dark:text-slate-100">
                    out of the box
                  </span>
                  {translate(
                    " pour bousculer les évidences. Je veux transformer des concepts audacieux en solutions concrètes qui ont un impact direct sur la vie des gens.",
                    " to challenge the obvious. I want to turn bold concepts into concrete solutions that directly impact people's lives."
                  )}
                </p>
                <p>
                  {translate(
                    "Pour moi, on ne crée pas un simple produit, on crée une histoire. J'aime concevoir des expériences complètes, imaginer des immersions dans des univers singuliers. Mon but n'est pas seulement de concevoir, mais de marquer les esprits.",
                    "To me, we don't just create a product, we create a story. I love designing end-to-end experiences and crafting unique immersive worlds. My goal isn't just to design, but to leave a lasting impression."
                  )}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ==================== ROW 1, RIGHT: PASSIONS (6 COLUMNS WITH 2x2 MINI-GAMES) ==================== */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="md:col-span-6 rounded-3xl bg-slate-100 dark:bg-[#0F172A]/80 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 flex flex-col justify-between shadow-sm min-h-[380px] transition-colors duration-500"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="p-2 rounded-xl bg-[#00B2A9]/10 text-[#00B2A9]">
                <Sparkles className="w-5 h-5" />
              </span>
              <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-slate-100 transition-colors duration-500">
                {translate("Passions", "Passions")}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3.5 flex-1 mt-1">
              <DesignFlippedCard />
              <MusiqueFlippedCard />
              <NatureFlippedCard />
              <CuisineFlippedCard />
            </div>
          </motion.div>

          {/* ==================== ROW 2, LEFT: CERTIFICATIONS (SINGLE PARENT CARD WITH 4 INTERNAL DIVIDED COLUMNS) ==================== */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="md:col-span-6 rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-sm min-h-[240px] flex flex-col justify-between overflow-hidden transition-colors duration-500"
          >
            {/* Card Header */}
            <div className="p-5 pb-3 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#00B2A9]/10 text-[#00B2A9]">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="font-display font-semibold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                  {translate("Certifications & Distinctions", "Certifications & Honors")}
                </h3>
              </div>
            </div>

            {/* 4 Internal Vertical Columns divided by fine vertical lines */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800/80 flex-1">
              
              {/* Section 1: TOEIC - Survol en Bleu */}
              <div
                onClick={spawnHelloBubble}
                onMouseEnter={() => {
                  setHoveredCert("toeic");
                  spawnHelloBubble();
                }}
                onMouseLeave={() => setHoveredCert(null)}
                className="p-4 flex flex-col justify-between cursor-pointer group relative overflow-hidden transition-all duration-300 ease-out hover:bg-sky-500/10 dark:hover:bg-sky-500/20"
              >
                <div className="flex items-center justify-between z-10">
                  <span className="text-sm">🇬🇧</span>
                </div>

                <div className="py-2 z-10">
                  <h4 className="font-display font-medium text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    TOEIC
                  </h4>
                  <p className="font-display font-semibold text-lg sm:text-xl text-slate-900 dark:text-slate-100 group-hover:text-sky-500 transition-colors duration-300 mt-0.5">
                    910/990
                  </p>
                </div>

                {/* Animated Speech Bubbles Container */}
                <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                  <AnimatePresence>
                    {toeicBubbles.map((bubble) => (
                      <motion.div
                        key={bubble.id}
                        initial={{ y: 35, opacity: 0, scale: 0.85, x: bubble.xOffset }}
                        animate={{ y: -130, opacity: [0, 1, 1, 1, 0], scale: [0.9, 1, 1, 1, 0.95] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.9, ease: [0.25, 0.1, 0.25, 1] }}
                        onAnimationComplete={() => {
                          setToeicBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
                        }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-3"
                      >
                        <div className="relative bg-sky-500 text-white font-body text-[11px] font-medium px-2.5 py-1 rounded-xl shadow-md tracking-wide flex items-center justify-center whitespace-nowrap">
                          Hello
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-sky-500" />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <span className="text-[10px] font-body text-[#00B2A9] group-hover:text-sky-500 font-medium z-10 transition-colors duration-300">
                  {translate("Niveau C1", "C1 Level")}
                </span>
              </div>

              {/* Section 2: 72h Agiles - Survol en Orangé */}
              <div
                onClick={() => {
                  setHoveredCert("72h");
                  setRocketKey((prev) => prev + 1);
                }}
                onMouseEnter={() => {
                  setHoveredCert("72h");
                  setRocketKey((prev) => prev + 1);
                }}
                onMouseLeave={() => setHoveredCert(null)}
                className="p-4 flex flex-col justify-between cursor-pointer group relative overflow-hidden transition-all duration-300 ease-out hover:bg-amber-500/10 dark:hover:bg-amber-500/20"
              >
                <div className="flex items-center justify-between z-10">
                  <span className="text-sm">🏆</span>
                </div>

                <div className="py-2 z-10">
                  <h4 className="font-display font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors duration-300">
                    72h Agiles
                  </h4>
                  <p className="font-body text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Sprint Hackathon
                  </p>
                </div>

                {/* HOVER ANIMATED ROCKET LAUNCH SEQUENCE */}
                <AnimatePresence mode="wait">
                  {hoveredCert === "72h" && (
                    <div
                      key={rocketKey}
                      className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
                    >
                      <div className="absolute bottom-3 right-3 flex flex-col items-center justify-center origin-center animate-rocket-launch">
                        <div className="relative flex flex-col items-center">
                          <ModernRocketSVG />
                          <div className="absolute top-[82%] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
                            <div className="w-3.5 h-10 bg-gradient-to-b from-white via-amber-300 to-red-600 rounded-full blur-[0.5px] animate-pulse shadow-[0_0_20px_rgba(245,158,11,1)]" />
                            <div className="absolute top-0 w-6 h-14 bg-gradient-to-b from-amber-400/80 via-orange-500/60 to-transparent rounded-full blur-sm" />
                            <div className="w-3.5 h-24 -mt-2 bg-gradient-to-b from-red-500/90 via-orange-500/60 to-transparent rounded-full blur-sm" />
                            <div className="w-6 h-16 -mt-4 bg-gradient-to-b from-orange-400/40 via-slate-400/40 to-transparent rounded-full blur-md" />
                            <div className="absolute top-4 w-10 h-10 bg-slate-300/70 dark:bg-slate-400/60 rounded-full blur-md animate-rocket-smoke" />
                            {[0, 1, 2].map((i) => (
                              <div
                                key={i}
                                style={{
                                  animationDelay: `${0.05 * i}s`,
                                  willChange: "transform, opacity",
                                }}
                                className="absolute top-3 w-1.5 h-1.5 bg-amber-300 rounded-full blur-[0.5px] shadow-[0_0_6px_#F59E0B] animate-ping"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </AnimatePresence>

                <span className="text-[10px] font-body text-amber-500 font-medium z-10">
                  {translate("Vainqueur", "Winner")}
                </span>
              </div>

              {/* Section 3: Green Belt - Survol en Vert (Chaotic Vector Boxes Heap) */}
              <div
                onMouseEnter={() => setHoveredCert("lean")}
                onMouseLeave={() => setHoveredCert(null)}
                className="p-4 flex flex-col justify-between cursor-pointer group relative overflow-hidden transition-all duration-300 ease-out hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20"
              >
                <div className="flex items-center justify-between z-0 relative">
                  <span className="text-sm">📦</span>
                </div>

                <div className="py-2 z-0 relative">
                  <h4 className="font-display font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors duration-300">
                    Green Belt
                  </h4>
                  <p className="font-body text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Lean Six Sigma
                  </p>
                </div>

                {/* GREEN BELT LEAN SIX SIGMA: MATTER.JS 2D PHYSICS CONTAINER SIMULATION */}
                <AnimatePresence mode="wait">
                  {hoveredCert === "lean" && <GreenBeltMatterPhysics />}
                </AnimatePresence>

                <span className="text-[10px] font-body text-emerald-500 font-medium z-0 relative">
                  {translate("Certifié Six Sigma", "Six Sigma Certified")}
                </span>
              </div>

              {/* Section 4: Inside LVMH - Survol en Rouge / Bordeaux */}
              <div
                onMouseEnter={() => setHoveredCert("lvmh")}
                onMouseLeave={() => setHoveredCert(null)}
                className={`p-4 flex flex-col justify-between cursor-pointer group relative overflow-hidden transition-all duration-300 ease-out ${
                  hoveredCert === "lvmh" ? "bg-[#4A131A] text-amber-200" : "hover:bg-rose-950/20"
                }`}
              >
                <motion.div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-amber-300/40 to-transparent z-20"
                  animate={hoveredCert === "lvmh" ? { x: ["-100%", "200%"] } : { x: "-100%" }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                />

                <div className="flex items-center justify-between z-10">
                  <span className="text-sm">✨</span>
                </div>

                <div className="py-2 z-10">
                  <h4 className={`font-display font-semibold text-sm sm:text-base ${hoveredCert === "lvmh" ? "text-amber-200" : "text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400"} transition-colors duration-300`}>
                    Inside LVMH
                  </h4>
                  <p className={`font-body text-[11px] ${hoveredCert === "lvmh" ? "text-amber-100/80" : "text-slate-500 dark:text-slate-400"} mt-0.5`}>
                    {translate("Luxe & Excellence", "Luxury & Excellence")}
                  </p>
                </div>

                <span className={`text-[10px] font-body font-medium z-10 ${hoveredCert === "lvmh" ? "text-amber-300" : "text-amber-500"}`}>
                  {translate("Certifié luxe & retail", "Luxury & Retail Certified")}
                </span>
              </div>

            </div>
          </motion.div>

          {/* ==================== ROW 2, CENTER: CHIFFRE CLÉ 182 NUITS SOUS TENTES (3 COLUMNS) ==================== */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="md:col-span-3 rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl relative overflow-hidden min-h-[240px] select-none group cursor-pointer transition-all duration-500"
          >
            {/* Top Bar: Only Moon Easter Egg Button in top-right */}
            <div className="flex items-center justify-end z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (document.documentElement.classList.contains("dark")) {
                    document.documentElement.classList.remove("dark");
                    localStorage.setItem("theme", "light");
                  } else {
                    document.documentElement.classList.add("dark");
                    localStorage.setItem("theme", "dark");
                  }
                }}
                title={translate("Basculez en Mode Sombre 🌙", "Toggle Dark Mode 🌙")}
                className="group/moon opacity-0 group-hover:opacity-100 transition-all duration-300 relative p-2 rounded-full hover:bg-amber-400/25 active:scale-90 cursor-pointer focus:outline-none z-30 pointer-events-auto"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.25 }}
                  whileTap={{ scale: 0.9, rotate: -20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex items-center justify-center"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-amber-300 drop-shadow-[0_0_12px_rgba(252,211,77,0.95)] transition-all duration-300 filter group-hover/moon:drop-shadow-[0_0_18px_rgba(252,211,77,1)]"
                  >
                    <path
                      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                      fill="currentColor"
                      stroke="#FCD34D"
                      strokeWidth="1.5"
                    />
                  </svg>
                </motion.div>
              </button>
            </div>

            {/* Background SVG Artwork (/assets/SVG/tenteSVG.svg) */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <img
                src="/assets/SVG/tenteSVG.svg"
                alt="Illustration tente"
                className="w-full h-full object-cover object-center scale-[1.45] group-hover:scale-[1.55] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"
              />
            </div>

            <div className="relative z-10 text-left pt-4">
              <span className="font-display font-semibold text-5xl sm:text-6xl text-slate-900 dark:text-slate-100 group-hover:text-amber-300 tracking-tight transition-colors duration-300 block drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                182
              </span>
              <p className="font-body text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300 group-hover:text-white leading-snug mt-1 transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {translate("nuits passées sous tentes.", "nights spent in tents.")}
              </p>
            </div>
          </motion.div>

          {/* ==================== ROW 2, RIGHT: MUSIQUE ALL-TIME (VAN HALEN - JUMP) ==================== */}
          <VanHalenJumpCard />

        </div>

      </div>

    </section>
  );
}

