'use client';
import React from "react";
import { ChakraRing } from "./ChakraRing";
import { ChakraPulse } from "./ChakraPulse";

export const ChakraHUD = ({
  chakras,
}: {
  chakras: { name: string; level: number; color: string }[];
}) => (
  <div className="grid grid-cols-3 gap-6 justify-items-center p-4 bg-black/30 rounded-xl">
    {chakras.map((c, i) => (
      <div key={i} className="flex flex-col items-center space-y-2">
        <ChakraRing color={c.color} progress={c.level} />
        <ChakraPulse color={c.color} />
        <span className="text-sm text-gray-300 uppercase">{c.name}</span>
      </div>
    ))}
  </div>
);
