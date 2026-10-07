'use client';
import React from "react";
export const Alert = ({ type = "info", message }: any) => {
  const colors: any = {
    info: "bg-blue-700",
    success: "bg-green-700",
    warning: "bg-yellow-600",
    error: "bg-red-700"
  };
  return (
    <div className={`p-3 text-white rounded ${colors[type]}`}>
      {message}
    </div>
  );
};
