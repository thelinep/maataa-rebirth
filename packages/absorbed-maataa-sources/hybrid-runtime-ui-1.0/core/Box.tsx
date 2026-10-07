'use client';
import React from "react";
export function Box({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}
