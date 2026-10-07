import React from "react";
export const Flex = ({ children, className = "" }: any) => (
  <div className={`flex items-center ${className}`}>{children}</div>
);
