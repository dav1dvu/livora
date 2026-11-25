import type { Transition, Variants } from "framer-motion";

export const motionTokens = {
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.38,
    slow: 0.65,
    reveal: 0.8,
  },
  easing: {
    smooth: [0.22, 1, 0.36, 1] as const,
    sharp: [0.4, 0, 0.2, 1] as const,
    soft: [0.33, 1, 0.68, 1] as const,
  },
  distance: {
    xs: 6,
    sm: 12,
    md: 20,
    lg: 32,
  },
  scale: {
    subtle: 0.98,
    press: 0.96,
    pop: 1.02,
  },
} as const;

export const springs = {
  snappy: {
    type: "spring",
    stiffness: 340,
    damping: 28,
    mass: 0.8,
  } satisfies Transition,
  gentle: {
    type: "spring",
    stiffness: 160,
    damping: 20,
    mass: 0.9,
  } satisfies Transition,
  tab: {
    type: "spring",
    stiffness: 380,
    damping: 32,
  } satisfies Transition,
} as const;

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.12,
} as const;

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: motionTokens.distance.md,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.slow,
      ease: motionTokens.easing.smooth,
    },
  },
};
