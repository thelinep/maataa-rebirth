'use client';
import React from "react";

export const Button = ({ children, onClick, color = "heart" }: any) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded bg-[var(--chakra-${color})] text-white hover:opacity-80 transition`}
  >
    {children}
  </button>
);
