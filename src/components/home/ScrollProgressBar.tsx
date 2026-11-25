"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { springs } from "@/lib/motion-tokens";

export function ScrollProgressBar() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, springs.snappy);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-[#933D33] origin-left pointer-events-none"
      style={{ scaleX }}
    />
  );
}
