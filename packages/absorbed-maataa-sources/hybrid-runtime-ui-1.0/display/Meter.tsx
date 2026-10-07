'use client';
import React from "react";

export const Meter = ({ value, color = "heart" }: any) => (
  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
    <div
      className="h-full"
      style={{ width: `${value}%`, background: `var(--chakra-${color})` }}
    />
  </div>
);
