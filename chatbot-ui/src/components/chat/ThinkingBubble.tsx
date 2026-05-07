'use client';

import { motion } from "framer-motion";

export default function ThinkingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="self-start flex items-center gap-3"
    >
      <div
        className="px-4 py-3 bg-zinc-950 border-2 border-amber-300 flex items-center gap-2"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 88%, 96% 100%, 4% 100%, 0 92%)",
          boxShadow: "5px 5px 0 0 #4a1d6e, 5px 5px 0 3px #f5c518",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-2.5 h-2.5 bg-amber-300"
            style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}
            animate={{ y: [-2, -8, -2], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}
        <span className="ml-1.5 text-[10px] tracking-[0.28em] text-amber-200/90 font-bold">
          STAND ACTIVÁNDOSE
        </span>
      </div>
    </motion.div>
  );
}