'use client';
import React from "react";

export function ChakraTimeline({ stages }: { stages: { label: string; level: number; color: string }[] }) {
  return (
    <div className="space-y-4">
      {stages.map((s, i) => (
        <div key={i} className="flex items-center space-x-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: `var(--chakra-${s.color})` }}
          />
          <div className="flex-1 bg-gray-800 rounded-full h-2">
            <div
              className="h-full rounded-full"
              style={{ width: `${s.level}%`, background: `var(--chakra-${s.color})` }}
            />
          </div>
          <span className="text-sm text-gray-300">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
