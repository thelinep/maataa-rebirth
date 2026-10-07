'use client';
import React from "react";
export const Modal = ({ open, onClose, children }: any) =>
  open ? (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
      <div className="bg-gray-900 p-6 rounded-lg relative max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  ) : null;
