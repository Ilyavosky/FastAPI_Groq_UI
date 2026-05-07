'use client';

import { Send } from "lucide-react";

function SendButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="shrink-0 grid place-items-center w-10 h-10 bg-amber-300 text-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
      style={{
        clipPath: "polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)",
        boxShadow: "3px 3px 0 0 #b3104a, 3px 3px 0 2px #0a0410",
      }}
    >
      <Send className="w-4 h-4" strokeWidth={2.5} />
    </button>
  );
}

export default function Composer({
  value,
  onChange,
  onSubmit,
  onKey,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onKey: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
}) {
  return (
    <div className="absolute bottom-0 inset-x-0 z-20 px-4 sm:px-8 pb-5 pt-4 bg-gradient-to-t from-[#0a0410] via-[#0a0410]/95 to-transparent">
      <div className="mx-auto max-w-3xl">
        <div
          className="relative flex items-end gap-3 p-2 bg-zinc-950 border-2 border-amber-300"
          style={{
            clipPath:
              "polygon(0 14%, 2% 0, 98% 0, 100% 14%, 100% 86%, 98% 100%, 2% 100%, 0 86%)",
            boxShadow:
              "6px 6px 0 0 #b3104a, 6px 6px 0 3px #f5c518, 6px 6px 0 5px #0a0410",
          }}
        >
          <textarea
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKey}
            placeholder="Di tu verdad, JoJo..."
            rows={1}
            className="flex-1 resize-none bg-transparent outline-none text-zinc-100 placeholder:text-amber-200/40 text-[15px] leading-snug px-3 py-2 max-h-32"
          />

          <SendButton onClick={onSubmit} disabled={disabled || !value.trim()} />
        </div>

        <div className="flex items-center justify-between mt-2 px-1 text-[10px] tracking-[0.22em] font-bold text-amber-200/70">
          <span>ENTER &nbsp;//&nbsp; ENVIAR</span>
          <span>SHIFT + ENTER &nbsp;//&nbsp; NUEVA LÍNEA</span>
        </div>
      </div>
    </div>
  );
}