'use client';

import { motion } from "framer-motion";
import { ChatMessage } from "./types";

export default function UserBubble({
  msg,
  reduce,
}: {
  msg: ChatMessage;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 80, rotate: 1.5 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 22,
        mass: 0.7,
      }}
      className="self-end max-w-[78%] flex flex-col items-end gap-1.5"
    >
      <div className="text-[10px] tracking-[0.28em] font-bold text-amber-300/90">
        TÚ
      </div>
      <div
        className="relative px-5 py-3.5 bg-amber-300 text-zinc-950 font-semibold text-[15px] leading-snug"
        style={{
          clipPath:
            "polygon(0 12%, 8% 0, 100% 0, 100% 84%, 92% 100%, 0 100%)",
          boxShadow: "6px 6px 0 0 #b3104a, 6px 6px 0 4px #0a0410",
        }}
      >
        {/* inner outline */}
        <span className="block whitespace-pre-wrap break-words">
          {msg.text}
        </span>
      </div>
    </motion.div>
  );
}