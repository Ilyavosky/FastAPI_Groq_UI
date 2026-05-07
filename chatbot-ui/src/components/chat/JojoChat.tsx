"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ChatMessage } from "./types";
import { STAND_CRIES } from "./constants";
import { uid, pick } from "./utils";
import Header from "./Header";
import UserBubble from "./UserBubble";
import AssistantBubble from "./AssistantBubble";
import ThinkingBubble from "./ThinkingBubble";
import Composer from "./Composer";
import SunBurst from "./decoration/SunBurst";
import MenacingField from "./decoration/MenacingField";

export default function JojoChat() {
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      cry: "BUONGIORNO!",
      text: "Soy tu asistente ligado al Stand. Habla — y responderé con la resolución de Passione.",
      ts: Date.now(),
    },
  ]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = async () => {
    const text = input.trim();
    if (!text || thinking) return;
    setMessages((m) => [...m, { id: uid(), role: "user", text, ts: Date.now() }]);
    setInput("");
    setThinking(true);
    try {
      const res = await fetch("http://localhost:8000/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, max_words: 100 }),
      });
      const data = await res.json();
      setMessages((m) => [...m, {
        id: uid(), role: "assistant",
        cry: pick(STAND_CRIES), text: data.answer, ts: Date.now(),
      }]);
    } catch {
      setMessages((m) => [...m, {
        id: uid(), role: "assistant",
        cry: "WRYYYYY!", text: "La conexión con el Stand fue interrumpida. Inténtalo de nuevo.", ts: Date.now(),
      }]);
    } finally {
      setThinking(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="relative w-full h-full min-h-[640px] overflow-hidden text-zinc-100"
      style={{ background: "radial-gradient(1200px 600px at 18% -10%, #4a1d6e 0%, transparent 55%), radial-gradient(900px 500px at 110% 110%, #b3104a 0%, transparent 55%), linear-gradient(180deg, #14071f 0%, #0a0410 100%)" }}>
      <SunBurst />
      <MenacingField reduce={reduce} />
      <Header />
      <div ref={scrollerRef} className="relative z-10 h-[calc(100%-184px)] overflow-y-auto px-5 sm:px-8 pt-4 pb-6">
        <div className="mx-auto max-w-3xl flex flex-col gap-7">
          <AnimatePresence initial={false}>
            {messages.map((m) => m.role === "user"
              ? <UserBubble key={m.id} msg={m} reduce={reduce} />
              : <AssistantBubble key={m.id} msg={m} reduce={reduce} />
            )}
            {thinking && <ThinkingBubble key="thinking" />}
          </AnimatePresence>
        </div>
      </div>
      <Composer value={input} onChange={setInput} onSubmit={send} onKey={onKey} disabled={thinking} />
    </div>
  );
}