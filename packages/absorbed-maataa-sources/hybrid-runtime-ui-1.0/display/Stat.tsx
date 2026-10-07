import React from "react";
export const Stat = ({ label, value }: any) => (
  <div className="text-center">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="text-xl font-bold text-white">{value}</p>
  </div>
);
