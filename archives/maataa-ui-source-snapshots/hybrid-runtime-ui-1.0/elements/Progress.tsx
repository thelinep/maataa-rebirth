'use client';
import React from "react";

export function Progress({
  value = 0,
  color = "solar",
}: {
  value?: number;
  color?: string;
}) {
  return (
    <div className="w-full bg-gray-800 rounded-full h-3 relative overflow-hidden">
      <div
        className="h-full transition-all duration-300 rounded-full"
        style={{
          width: `${value}%`,
          background: `var(--chakra-${color})`,
        }}
      />
    </div>
  );
}
