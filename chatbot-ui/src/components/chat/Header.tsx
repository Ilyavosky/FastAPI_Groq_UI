'use client';

import { Star, Sparkles, Zap } from "lucide-react";

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-amber-300/40 text-amber-200/80 text-[10px] font-bold tracking-[0.18em]"
      style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
    >
      {icon}
      {label}
    </div>
  );
}

export default function Header() {
  return (
    <div className="relative z-20 flex items-center justify-between px-5 sm:px-8 pt-5 pb-4 border-b-2 border-amber-300/70">
      <div className="flex items-center gap-3">
        <div
          className="grid place-items-center w-11 h-11 bg-amber-300 text-zinc-950"
          style={{
            clipPath:
              "polygon(20% 0, 100% 0, 100% 78%, 80% 100%, 0 100%, 0 22%)",
            boxShadow: "5px 5px 0 0 #ff2d95, 5px 5px 0 2px #0a0410",
          }}
        >
          <Star className="w-5 h-5" strokeWidth={3} />
        </div>
        <div className="flex flex-col leading-none">
          <span
            className="text-amber-300 tracking-[0.18em] text-xs font-bold"
            style={{ textShadow: "2px 2px 0 #b3104a" }}
          >
            STAND // EN LÍNEA
          </span>
          <span
            className="text-2xl font-black text-white tracking-wider mt-1"
            style={{
              fontFamily:
                "var(--jojo-display, 'Bebas Neue'), Impact, sans-serif",
              textShadow: "3px 3px 0 #b3104a, 6px 6px 0 #4a1d6e",
              letterSpacing: "0.06em",
            }}
          >
            BIZARRE&nbsp;CHAT
          </span>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2">
        <Pill icon={<Sparkles className="w-3.5 h-3.5" />} label="PASSIONE" />
        <Pill icon={<Zap className="w-3.5 h-3.5" />} label="VENTO AUREO" />
      </div>
    </div>
  );
}