'use client';
import React from "react";

export function Button({
  children,
  // className,
  onClick,
  color = "heart",
  variant = "solid",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  color?: string;
  variant?: "solid" | "outline";
}) {
  const base = variant === "solid"
    ? `bg-[var(--chakra-${color})] text-white`
    : `border border-[var(--chakra-${color})] text-[var(--chakra-${color})]`;
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition ${base}`}
    >
      {children}
    </button>
  );
}
