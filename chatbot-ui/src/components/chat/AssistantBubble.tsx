'use client';

import { motion } from "framer-motion";
import { User2 } from "lucide-react";
import { ChatMessage } from "./types";
import { MENACING } from "./constants";

export default function AssistantBubble({
  msg,
  reduce,
}: {
  msg: ChatMessage;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={
        reduce ? { opacity: 0 } : { opacity: 0, x: -90, rotate: -2, scale: 0.96 }
      }
      animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
        mass: 0.9,
      }}
      className="self-start max-w-[80%] flex flex-col items-start gap-2 relative"
    >
      {/* Menacing aura behind assistant message */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute -inset-y-2 -left-3 right-2 pointer-events-none select-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 flex flex-wrap content-start gap-x-2 gap-y-0 text-[14px] font-black text-amber-300/30 leading-[1.05]"
            style={{
              fontFamily:
                "var(--jojo-display, 'Bebas Neue'), Impact, sans-serif",
              letterSpacing: "0.08em",
              textShadow: "1px 1px 0 #b3104a55",
            }}
            initial={{ y: 4 }}
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>{MENACING}</span>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Stand cry */}
      {msg.cry && (
        <motion.div
          initial={{ opacity: 0, y: 8, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ delay: 0.05, type: "spring", stiffness: 300 }}
          className="ml-2 px-2.5 py-0.5 bg-fuchsia-500 text-white text-[10px] font-black tracking-[0.18em]"
          style={{
            fontFamily:
              "var(--jojo-display, 'Bebas Neue'), Impact, sans-serif",
            clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
            boxShadow: "3px 3px 0 0 #0a0410",
          }}
        >
          {msg.cry}
        </motion.div>
      )}

      <div className="relative flex items-start gap-3">
        {/* Avatar */}
        <div
          className="shrink-0 grid place-items-center w-10 h-10 bg-fuchsia-600 text-amber-200"
          style={{
            clipPath:
              "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
            boxShadow: "3px 3px 0 0 #f5c518",
          }}
        >
          <User2 className="w-5 h-5" strokeWidth={2.5} />
        </div>

        {/* Bubble */}
        <div
          className="relative px-5 py-3.5 bg-zinc-950 text-zinc-50 text-[15px] leading-snug border-2 border-amber-300"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% 88%, 96% 100%, 4% 100%, 0 92%)",
            boxShadow:
              "6px 6px 0 0 #4a1d6e, 6px 6px 0 4px #f5c518, 6px 6px 0 6px #0a0410",
          }}
        >
          <span className="block whitespace-pre-wrap break-words">
            {msg.text}
          </span>
        </div>
      </div>
    </motion.div>
  );
}