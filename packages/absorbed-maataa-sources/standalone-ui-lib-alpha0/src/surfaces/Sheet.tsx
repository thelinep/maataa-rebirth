/**
 * @maataa/ui/surfaces/Sheet
 * Bottom sheet overlay — the mobile-friendly counterpart to Modal/Drawer
 */

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { colorTokens, radiusTokens, spacingTokens } from "../tokens";

export interface SheetProps {
  /**
   * Whether the sheet is open
   */
  isOpen: boolean;

  /**
   * Called when the backdrop is clicked or the Escape key is pressed
   */
  onClose: () => void;

  /**
   * Title shown above the content, with a drag handle above it
   */
  title?: string;

  /**
   * How much of the viewport height the sheet occupies
   * @default 'md'
   */
  height?: "sm" | "md" | "lg" | "full";

  children: React.ReactNode;
}

const heightByToken = {
  sm: "33vh",
  md: "50vh",
  lg: "75vh",
  full: "100vh",
};

/**
 * Sheet
 * A panel that slides up from the bottom of the screen, with a drag
 * handle and rounded top corners — the standard mobile pattern for
 * contextual actions and forms. Closes on backdrop click or Escape.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Share" height="sm">
 *   <p>Sheet content</p>
 * </Sheet>
 * ```
 */
export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  title,
  height = "md",
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
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        animation: "maataa-sheet-fade-in 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "640px",
          maxHeight: heightByToken[height],
          display: "flex",
          flexDirection: "column",
          backgroundColor: colorTokens.background.primary,
          borderTopLeftRadius: radiusTokens.xl,
          borderTopRightRadius: radiusTokens.xl,
          boxShadow: colorTokens.shadow.xl,
          animation: "maataa-sheet-slide-up 0.25s ease",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "center", padding: `${spacingTokens.sm} 0` }}
        >
          <div
            aria-hidden="true"
            style={{
              width: "40px",
              height: "4px",
              borderRadius: radiusTokens.full,
              backgroundColor: colorTokens.border.primary,
            }}
          />
        </div>
        {title && (
          <div
            style={{
              padding: `0 ${spacingTokens.md} ${spacingTokens.md}`,
              borderBottom: `1px solid ${colorTokens.border.secondary}`,
            }}
          >
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
          </div>
        )}
        <div style={{ flex: 1, overflowY: "auto", padding: spacingTokens.md }}>{children}</div>
      </div>
      <style>
        {`
          @keyframes maataa-sheet-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes maataa-sheet-slide-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}
      </style>
    </div>,
    document.body
  );
};

Sheet.displayName = "Sheet";
