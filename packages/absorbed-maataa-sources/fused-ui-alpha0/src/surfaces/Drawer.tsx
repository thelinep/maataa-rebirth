/**
 * @maataa/ui/surfaces/Drawer
 * Slide-in overlay panel anchored to a screen edge
 */

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { colorTokens, radiusTokens, spacingTokens } from "../tokens";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  /**
   * Whether the drawer is open
   */
  isOpen: boolean;

  /**
   * Called when the backdrop is clicked, the close button is pressed,
   * or the Escape key is pressed
   */
  onClose: () => void;

  /**
   * Edge the drawer slides in from
   * @default 'right'
   */
  placement?: DrawerPlacement;

  /**
   * Drawer title, shown in the header along with the close button
   */
  title?: string;

  /**
   * Whether to render the close ("×") button
   * @default true
   */
  closeButton?: boolean;

  /**
   * Size along the sliding axis (width for left/right, height for top/bottom)
   * @default '320px'
   */
  size?: string;

  children: React.ReactNode;
}

const placementStyles: Record<DrawerPlacement, (size: string) => React.CSSProperties> = {
  left: (size) => ({ top: 0, left: 0, bottom: 0, width: size, height: "100%" }),
  right: (size) => ({ top: 0, right: 0, bottom: 0, width: size, height: "100%" }),
  top: (size) => ({ top: 0, left: 0, right: 0, height: size, width: "100%" }),
  bottom: (size) => ({ bottom: 0, left: 0, right: 0, height: size, width: "100%" }),
};

/**
 * Drawer
 * An overlay panel that slides in from a screen edge, with a backdrop
 * that closes it on click. Closes on Escape as well.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Filters" placement="right">
 *   <p>Drawer content</p>
 * </Drawer>
 * ```
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = "right",
  title,
  closeButton = true,
  size = "320px",
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(61, 40, 23, 0.4)",
        zIndex: 1000,
        animation: "maataa-drawer-fade-in 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          backgroundColor: colorTokens.background.primary,
          boxShadow: colorTokens.shadow.xl,
          animation: `maataa-drawer-slide-in-${placement} 0.25s ease`,
          ...placementStyles[placement](size),
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
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 600,
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
                  padding: 0,
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: radiusTokens.sm,
                }}
              >
                ×
              </button>
            )}
          </div>
        )}
        <div style={{ flex: 1, overflowY: "auto", padding: spacingTokens.md }}>{children}</div>
      </div>
      <style>
        {`
          @keyframes maataa-drawer-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes maataa-drawer-slide-in-left {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes maataa-drawer-slide-in-right {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes maataa-drawer-slide-in-top {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }
          @keyframes maataa-drawer-slide-in-bottom {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}
      </style>
    </div>,
    document.body
  );
};

Drawer.displayName = "Drawer";
