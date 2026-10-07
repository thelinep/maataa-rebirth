'use client';
import React from "react";
export const ChakraAura = ({ color = "heart", intensity = 0.8 }) => (
  <div
    className="absolute rounded-full blur-3xl opacity-70"
    style={{
      width: "200px",
      height: "200px",
      background: `radial-gradient(circle, var(--chakra-${color}) ${intensity * 100}%, transparent 70%)`
    }}
  />
);
