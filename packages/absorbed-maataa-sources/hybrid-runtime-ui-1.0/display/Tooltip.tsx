'use client';
import React, { useState } from "react";

export const Tooltip = ({ text, children }: any) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {hover && (
        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
          {text}
        </div>
      )}
    </div>
  );
};
