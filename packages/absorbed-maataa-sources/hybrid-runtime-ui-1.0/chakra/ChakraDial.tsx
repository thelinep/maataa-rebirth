'use client';
import React from "react";

export function ChakraDial({ value = 50, color = "heart" }) {
  const deg = (value / 100) * 270 - 135;
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div className="absolute rounded-full border-8 border-gray-700 w-28 h-28" />
      <div
        className="absolute w-3 h-3 rounded-full"
        style={{
          background: `var(--chakra-${color})`,
          transform: `rotate(${deg}deg) translate(56px)`,
          transformOrigin: "center center",
        }}
      />
      <span className="text-white text-sm">{value}%</span>
    </div>
  );
}
