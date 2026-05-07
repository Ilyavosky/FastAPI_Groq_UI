'use client';

import { useMemo } from "react";

export default function SunBurst() {
  const rays = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        rot: (360 / 28) * i,
        len: 60 + ((i * 37) % 40),
      })),
    []
  );
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-40 -left-40 w-[680px] h-[680px] opacity-[0.18]"
    >
      {rays.map((r, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 origin-left bg-amber-200"
          style={{
            width: `${r.len}%`,
            height: 2,
            transform: `rotate(${r.rot}deg)`,
            filter: "blur(0.3px)",
          }}
        />
      ))}
    </div>
  );
}