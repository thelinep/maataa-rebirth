'use client';
import React from "react";

export function ChakraPulse({ color = "heart" }: { color?: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="absolute animate-ping rounded-full opacity-75"
        style={{
          width: "6rem",
          height: "6rem",
          background: `var(--chakra-${color})`,
        }}
      />
      <div
        className="rounded-full w-10 h-10"
        style={{ background: `var(--chakra-${color})` }}
      />
    </div>
  );
}
