import React from "react";
export const Grid = ({ children, className = "" }: any) => (
  <div className={`grid gap-4 ${className}`}>{children}</div>
);
