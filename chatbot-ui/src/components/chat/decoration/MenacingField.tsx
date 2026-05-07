'use client';

import { useMemo } from "react";
import { motion } from "framer-motion";

export default function MenacingField({ reduce }: { reduce: boolean }) {
  // Drifting columns of ゴゴゴ in the background.
  const cols = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        left: `${10 + i * 19}%`,
        delay: i * 0.6,
        size: 22 + ((i * 7) % 14),
        opacity: 0.06 + ((i * 13) % 7) / 100,
      })),
    []
  );
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {cols.map((c, i) => (
        <motion.div
          key={i}
          className="absolute top-[-10%] text-amber-300 font-black"
          style={{
            left: c.left,
            fontSize: c.size,
            opacity: c.opacity,
            writingMode: "vertical-rl",
            letterSpacing: "0.18em",
            textShadow: "2px 2px 0 #b3104a55",
          }}
          initial={{ y: "-10%" }}
          animate={reduce ? {} : { y: ["-10%", "110%"] }}
          transition={{
            duration: 22 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: c.delay,
          }}
        >
          {Array.from({ length: 4 }).map((_, j) => (
            <span key={j}>ゴゴゴゴゴ</span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}