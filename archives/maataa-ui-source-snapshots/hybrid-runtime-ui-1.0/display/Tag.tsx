import React from "react";
export const Tag = ({ text, color = "heart" }: any) => (
  <span className={`text-sm px-2 py-1 border rounded border-[var(--chakra-${color})]`}>
    {text}
  </span>
);
