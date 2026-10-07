'use client';
import { useState } from "react";

export function useToast() {
  const [messages, setMessages] = useState<string[]>([]);
  const show = (msg: string) => {
    setMessages([...messages, msg]);
    setTimeout(() => setMessages((m) => m.slice(1)), 3000);
  };
  const ToastContainer = () => (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {messages.map((m, i) => (
        <div
          key={i}
          className="px-4 py-2 rounded bg-[var(--chakra-heart)] text-white shadow-lg animate-fade-in"
        >
          {m}
        </div>
      ))}
    </div>
  );
  return { show, ToastContainer };
}
