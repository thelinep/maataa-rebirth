import React, { useState } from "react";
import { Button, type ButtonProps } from "./index";

export type ConfirmButtonProps = Omit<ButtonProps, "onClick"> & {
  onConfirm: () => void;
  confirmText?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
};

/** A reversible inline confirmation step for actions that need an extra check. */
export const ConfirmButton = React.forwardRef<
  HTMLButtonElement,
  ConfirmButtonProps
>(
  (
    {
      onConfirm,
      confirmText = "Are you sure?",
      confirmLabel = "Confirm",
      cancelLabel = "Cancel",
      onCancel,
      children,
      variant = "destructive",
      disabled,
      ...buttonProps
    },
    ref,
  ) => {
    const [confirming, setConfirming] = useState(false);

    if (!confirming) {
      return (
        <Button
          {...buttonProps}
          ref={ref}
          variant={variant}
          disabled={disabled}
          onClick={() => setConfirming(true)}
        >
          {children}
        </Button>
      );
    }

    return (
      <span
        role="group"
        aria-label={
          typeof confirmText === "string" ? confirmText : "Confirm action"
        }
        className="m-confirm-button"
      >
        <span>{confirmText}</span>
        <Button
          {...buttonProps}
          variant={variant}
          onClick={() => {
            setConfirming(false);
            onConfirm();
          }}
        >
          {confirmLabel}
        </Button>
        <Button
          {...buttonProps}
          variant="secondary"
          onClick={() => {
            setConfirming(false);
            onCancel?.();
          }}
        >
          {cancelLabel}
        </Button>
      </span>
    );
  },
);

ConfirmButton.displayName = "ConfirmButton";
