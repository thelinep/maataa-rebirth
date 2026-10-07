/**
 * @maataa/ui/primitives/Input
 * Core input field primitive component
 */

import React, { useState } from "react";
import { colorTokens, radiusTokens } from "../tokens";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

/**
 * Input Component
 * A text input component with optional label, error messaging, and helper text
 *
 * @example
 * ```tsx
 * <Input label="Email" type="email" placeholder="user@example.com" />
 * <Input label="Password" type="password" error="Password is required" />
 * <Input helperText="Enter a valid email address" />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className, style, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
        {label && (
          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: error ? colorTokens.interactive.error : colorTokens.text.primary,
            }}
          >
            {label}
          </label>
        )}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <input
            ref={ref}
            className={className}
            style={{
              width: "100%",
              padding: icon ? "10px 10px 10px 36px" : "10px",
              fontSize: "14px",
              border: `2px solid ${
                error
                  ? colorTokens.interactive.error
                  : focused
                    ? colorTokens.interactive.primary
                    : colorTokens.interactive.secondary
              }`,
              borderRadius: radiusTokens.md,
              outline: "none",
              transition: "all 0.2s ease",
              backgroundColor: colorTokens.background.primary,
              color: colorTokens.text.primary,
              boxSizing: "border-box",
              ...style,
            }}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          {icon && (
            <div
              style={{
                position: "absolute",
                left: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                color: colorTokens.interactive.primary,
              }}
            >
              {icon}
            </div>
          )}
        </div>
        {error && (
          <span style={{ fontSize: "12px", color: colorTokens.interactive.error }}>{error}</span>
        )}
        {helperText && !error && (
          <span style={{ fontSize: "12px", color: colorTokens.text.secondary }}>{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
