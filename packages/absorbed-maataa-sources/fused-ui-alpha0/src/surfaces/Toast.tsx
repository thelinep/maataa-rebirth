/**
 * @maataa/ui/surfaces/Toast
 * Toast notification component
 */

import React, { useEffect } from "react";
import { colorTokens, radiusTokens, spacingTokens } from "../tokens";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const toastIcons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

/**
 * Toast Component
 * A notification component that appears temporarily
 *
 * @example
 * ```tsx
 * <Toast
 *   id="1"
 *   message="Operation successful!"
 *   type="success"
 *   onClose={() => removeToast("1")}
 * />
 * ```
 */
export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = "info",
  duration = 3000,
  onClose,
  action,
}) => {
  const style = colorTokens.semantic[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [id, duration, onClose]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: spacingTokens.sm,
        padding: `${spacingTokens.sm} ${spacingTokens.md}`,
        backgroundColor: style.bg,
        color: style.text,
        borderRadius: radiusTokens.md,
        boxShadow: colorTokens.shadow.md,
        marginBottom: spacingTokens.xs,
        animation: "slideInRight 0.3s ease",
      }}
    >
      <span style={{ fontSize: "18px", fontWeight: "bold" }}>{toastIcons[type]}</span>
      <span style={{ flex: 1, fontSize: "14px" }}>{message}</span>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            fontWeight: "600",
            textDecoration: "underline",
            padding: "0",
            fontSize: "12px",
          }}
        >
          {action.label}
        </button>
      )}
      <button
        onClick={() => onClose(id)}
        aria-label="Dismiss notification"
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "inherit",
          cursor: "pointer",
          fontSize: "18px",
          padding: "0",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ×
      </button>

      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(400px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

Toast.displayName = "Toast";

/**
 * ToastContainer Component
 * Container for displaying multiple toasts
 */
export interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 2000,
        maxWidth: "400px",
      }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
};

ToastContainer.displayName = "ToastContainer";
