/**
 * @maataa/ui/actions/ConfirmButton
 * A button that requires an inline second confirmation before firing
 */

import React, { useState } from "react";
import { spacingTokens, typographyTokens } from "../tokens";
import { Button, type ButtonProps } from "../primitives/Button";
import { colorTokens } from "../tokens";

export interface ConfirmButtonProps extends Omit<ButtonProps, "onClick"> {
  /**
   * Called only after the user confirms the action
   */
  onConfirm: () => void;

  /**
   * Prompt text shown once the button is clicked
   * @default 'Are you sure?'
   */
  confirmText?: string;

  /**
   * Label for the confirming action button
   * @default 'Yes'
   */
  confirmLabel?: string;

  /**
   * Label for the button that cancels the confirmation
   * @default 'Cancel'
   */
  cancelLabel?: string;
}

/**
 * ConfirmButton
 * Guards a destructive or hard-to-undo action behind an inline
 * "Are you sure?" step, rather than a blocking modal dialog. The
 * initial button's label and variant are shown until clicked, at
 * which point it's replaced by a confirm/cancel prompt in place.
 *
 * @example
 * ```tsx
 * <ConfirmButton variant="danger" onConfirm={() => deleteItem(id)}>
 *   Delete
 * </ConfirmButton>
 * ```
 */
export const ConfirmButton = React.forwardRef<HTMLButtonElement, ConfirmButtonProps>(
  (
    {
      onConfirm,
      confirmText = "Are you sure?",
      confirmLabel = "Yes",
      cancelLabel = "Cancel",
      children,
      variant = "danger",
      size,
      ...props
    },
    ref
  ) => {
    const [confirming, setConfirming] = useState(false);

    if (confirming) {
      return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: spacingTokens.sm }}>
          <span
            style={{ fontSize: typographyTokens.fontSize.sm, color: colorTokens.text.secondary }}
          >
            {confirmText}
          </span>
          <Button
            variant={variant}
            size={size}
            onClick={() => {
              setConfirming(false);
              onConfirm();
            }}
          >
            {confirmLabel}
          </Button>
          <Button variant="secondary" size={size} onClick={() => setConfirming(false)}>
            {cancelLabel}
          </Button>
        </div>
      );
    }

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        onClick={() => setConfirming(true)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ConfirmButton.displayName = "ConfirmButton";
