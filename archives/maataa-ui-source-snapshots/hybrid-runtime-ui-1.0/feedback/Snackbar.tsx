'use client';
import React from "react";
export const Snackbar = ({ open, message }: any) => (
  <div
    className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 transition-all ${
      open ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">{message}</div>
  </div>
);
