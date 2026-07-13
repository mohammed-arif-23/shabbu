import type { Transition, Variants } from "framer-motion";

// ─────────────────────────────────────────────
// EASING CURVES — cinematic-grade beziers
// ─────────────────────────────────────────────
export const ease = {
  /** Smooth deceleration — content arriving */
  out:     [0.16, 1, 0.3, 1]  as [number,number,number,number],
  /** Sharp in, smooth out — emphasis */
  inOut:   [0.87, 0, 0.13, 1] as [number,number,number,number],
  /** Spring-like overshoot feel in pure tween */
  elastic: [0.34, 1.56, 0.64, 1] as [number,number,number,number],
} as const;

// ─────────────────────────────────────────────
// SPRING PRESETS
// ─────────────────────────────────────────────
export const spring = {
  /** Snappy UI feedback */
  snappy:  { type: "spring", stiffness: 400, damping: 30 } as Transition,
  /** Natural float — cards, images */
  gentle:  { type: "spring", stiffness: 120, damping: 20 } as Transition,
  /** Slow reveal — headings, heroes */
  slow:    { type: "spring", stiffness: 60,  damping: 18 } as Transition,
  /** Micro interaction — hover pills, buttons */
  micro:   { type: "spring", stiffness: 600, damping: 28 } as Transition,
} as const;

// ─────────────────────────────────────────────
// VARIANTS — composable motion building blocks
// ─────────────────────────────────────────────

/** Staggered container — wraps children that stagger in */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren: stagger, delayChildren } },
});

/** Fade up — the most fundamental content reveal */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  show:   {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: ease.out },
  },
};

/** Fade up — subtle version for small elements */
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: ease.out },
  },
};

/** Fade in — pure opacity */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6 } },
};

/** Slide in from left */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(4px)" },
  show:   {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: ease.out },
  },
};

/** Slide in from right */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 50, filter: "blur(4px)" },
  show:   {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: ease.out },
  },
};

/** Scale reveal — cards, panels */
export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  show:   {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.75, ease: ease.out },
  },
};

/** Clip reveal from bottom — text line masks */
export const clipUp: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 },
  show:   {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.75, ease: ease.out },
  },
};

/** Clip reveal from left — horizontal wipe */
export const clipLeft: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  show:   {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.9, ease: ease.out },
  },
};

/** Counter number reveal */
export const counterReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: ease.elastic },
  },
};

/** Section heading — split stagger parent */
export const headingContainer: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/** Individual heading word */
export const headingWord: Variants = {
  hidden: { opacity: 0, y: "110%", rotateX: -15 },
  show:   {
    opacity: 1, y: "0%", rotateX: 0,
    transition: { duration: 0.8, ease: ease.out },
  },
};

/** Card hover — lift + glow trigger */
export const cardHover = {
  rest:  { y: 0,  boxShadow: "0 0 0 rgba(0,242,254,0)" },
  hover: { y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.35)", transition: spring.gentle },
};

/** Dot / pip pulse */
export const pulseDot = {
  animate: {
    scale:   [1, 1.4, 1],
    opacity: [0.7, 1, 0.7],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};
