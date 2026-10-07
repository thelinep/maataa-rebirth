'use client';
import React from "react";
export const ChakraStream = ({ levels }: { levels: number[] }) => (
  <div className="flex space-x-1 items-end h-20">
    {levels.map((h, i) => (
      <div key={i} className="w-2 bg-[var(--chakra-heart)] rounded-t" style={{ height: `${h}%` }} />
    ))}
  </div>
);
