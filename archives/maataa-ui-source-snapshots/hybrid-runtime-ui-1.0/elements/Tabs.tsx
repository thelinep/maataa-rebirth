'use client';
import React, { useState } from "react";

export const Tabs = ({ tabs }: { tabs: string[] }) => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex border-b border-gray-700">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 ${
              active === i ? "border-b-2 border-[var(--chakra-heart)] text-heart" : "text-gray-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

