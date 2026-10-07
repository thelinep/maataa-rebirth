import React from "react";
export const Container = ({ children, className = "" }: any) => (
  <div className={`max-w-5xl mx-auto p-6 ${className}`}>{children}</div>
);
