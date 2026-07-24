/* ── Easing presets ── */
const smooth = [0.22, 1, 0.36, 1]; // Apple-style deceleration
const spring = [0.34, 1.56, 0.64, 1]; // Slight overshoot

/* ── Core entrance variants ── */
export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: smooth },
  }),
};

export const fadeDown = {
  hidden: { opacity: 0, y: -36 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: smooth },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

export const fadeLeft = {
  hidden: { opacity: 0, x: 60 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: smooth },
  }),
};

export const fadeRight = {
  hidden: { opacity: 0, x: -60 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: smooth },
  }),
};

// Legacy alias
export const slideRight = fadeRight;

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: spring },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: smooth },
  }),
};

/* ── Container / stagger helpers ── */
export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const staggerCards = (stagger = 0.08) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: 0.1 },
  },
});

/* ── Viewport helpers ── */
export const viewportOnce = { once: true, margin: "-60px" };

/* ── Page transitions ── */
export const pageTransition = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.4, ease: smooth },
};

/* ── Card hover (for whileHover) ── */
export const cardLift = {
  y: -6,
  transition: { duration: 0.3, ease: smooth },
};

/* ── Icon / image hover ── */
export const iconPop = {
  scale: 1.12,
  transition: { duration: 0.25, ease: spring },
};
