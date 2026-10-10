"use client";

import { motion, type HTMLMotionProps } from "motion/react";

/** Fade-and-rise on scroll into view. Respects reduced motion via MotionConfig. */
export function Reveal({
  delay = 0,
  y = 24,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    />
  );
}
