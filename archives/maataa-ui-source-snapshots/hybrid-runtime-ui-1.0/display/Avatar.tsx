import React from "react";
export const Avatar = ({ src, name }: any) => (
  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
    {src ? (
      <img src={src} alt={name} className="object-cover w-full h-full" />
    ) : (
      <span className="text-white text-sm">{name?.[0]}</span>
    )}
  </div>
);
