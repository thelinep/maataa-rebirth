'use client';
import React from "react";
import { motion } from "framer-motion";

export const ChakraRing = ({
  size = 120,
  thickness = 12,
  color = "heart",
  progress = 75,
}: {
  size?: number;
  thickness?: number;
  className?: string;
  color?: string;
  progress?: number;
}) => {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="block"
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        stroke="#333"
        fill="transparent"
        strokeWidth={thickness}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <motion.circle
        stroke={`var(--chakra-${color})`}
        fill="transparent"
        strokeWidth={thickness}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        cx={size / 2}
        cy={size / 2}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1 }}
      />
    </svg>
  );
};
