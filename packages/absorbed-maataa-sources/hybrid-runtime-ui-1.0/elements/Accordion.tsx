'use client';
import React, { useState } from "react";

export const Accordion = ({
  sections,
}: {
  sections: { title: string; content: string }[];
}) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {sections.map((s, i) => (
        <div key={i} className="border border-gray-700 rounded-lg">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-4 py-3 bg-gray-900 hover:bg-gray-800 flex justify-between"
          >
            <span>{s.title}</span>
            <span>{open === i ? "–" : "+"}</span>
          </button>
          {open === i && (
            <div className="px-4 py-3 text-gray-300 bg-gray-950 animate-fade-in">
              {s.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
