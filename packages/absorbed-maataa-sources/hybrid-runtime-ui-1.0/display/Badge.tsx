import React from "react";
export const Badge = ({ label, color = "heart" }: any) => (
  <span
    className={`inline-block text-xs px-2 py-1 rounded-full bg-[var(--chakra-${color})]/20 text-[var(--chakra-${color})]`}
  >
    {label}
  </span>
);
