'use client';
import React from "react";
export const Backdrop = ({ show }: { show: boolean }) =>
  show ? (
    <div className="fixed inset-0 bg-black/50 z-30 animate-fade-in"></div>
  ) : null;
