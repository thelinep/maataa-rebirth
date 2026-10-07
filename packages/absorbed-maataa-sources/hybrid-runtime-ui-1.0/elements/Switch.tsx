'use client';
import React from "react";

export const Switch = ({ checked, onChange }: any) => (
  <label className="inline-flex items-center cursor-pointer">
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    <span
      className={`w-10 h-6 flex items-center rounded-full p-1 transition ${
        checked ? "bg-green-500" : "bg-gray-600"
      }`}
    >
      <span
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          checked ? "translate-x-4" : ""
        }`}
      />
    </span>
  </label>
);
