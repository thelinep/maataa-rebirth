import React from "react";
export const Card = ({ title, children }: any) => (
  <div className="p-4 bg-gray-900 rounded-lg shadow-lg space-y-2">
    {title && <h3 className="text-lg font-semibold">{title}</h3>}
    <div>{children}</div>
  </div>
);


