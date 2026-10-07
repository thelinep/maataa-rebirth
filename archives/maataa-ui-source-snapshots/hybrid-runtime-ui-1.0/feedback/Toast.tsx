'use client';
import React from "react";
export const Toast = ({ message }: { message: string }) => (
  <div className="px-4 py-2 bg-[var(--chakra-heart)] text-white rounded shadow-md">{message}</div>
);
