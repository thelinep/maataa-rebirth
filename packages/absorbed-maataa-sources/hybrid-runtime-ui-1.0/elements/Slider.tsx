'use client';
import React from "react";

export const Slider = ({ value, onChange }: any) => (
  <input
    type="range"
    min="0"
    max="100"
    value={value}
    onChange={onChange}
    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
  />
);
