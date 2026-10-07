/**
 * @maataa/ui/surfaces/Modal
 * Modal dialog component for focused user interactions
 */

import React from "react";
import { colorTokens, radiusTokens, spacingTokens } from "../tokens";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  closeButton?: boolean;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const modalSizes = {
  sm: { width: "400px" },
  md: { width: "600px" },
  lg: { width: "800px" },
};

/**
 * Modal Component
 * A dialog component for displaying content in a focused modal overlay
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Settings">
 *   <p>Modal content here</p>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  footer,
  closeButton = true,
  size = "md",
  children,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(61, 40, 23, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: colorTokens.background.primary,
          borderRadius: radiusTokens.lg,
          boxShadow: colorTokens.shadow.xl,
          maxHeight: "90vh",
          overflowY: "auto",
          ...modalSizes[size],
          animation: "slideUp 0.3s ease",
        }}
      >
        {(title || closeButton) && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: spacingTokens.md,
              borderBottom: `1px solid ${colorTokens.interactive.secondary}`,
            }}
          >
            {title && (
              <h2
                style={{
                  margin: "0",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: colorTokens.text.primary,
                }}
              >
                {title}
              </h2>
            )}
            {closeButton && (
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: colorTokens.text.secondary,
                  padding: "0",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            )}
          </div>
        )}

        <div style={{ padding: spacingTokens.md }}>{children}</div>

        {footer && (
          <div
            style={{
              padding: `${spacingTokens.sm} ${spacingTokens.md}`,
              borderTop: `1px solid ${colorTokens.interactive.secondary}`,
              backgroundColor: colorTokens.background.secondary,
            }}
          >
            {footer}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

Modal.displayName = "Modal";
