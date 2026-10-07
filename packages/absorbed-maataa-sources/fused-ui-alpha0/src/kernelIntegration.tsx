import React from "react";
import { canDispatch } from "@maataa/governance";
import { createMaataaReact } from "@maataa/react";
import { Button as VisualButton, type ButtonProps } from "./primitives/Button";

export type ProductPolicyDecision = {
  id: string;
  outcome: "allow" | "deny" | "allow_with_approval" | "allow_with_constraints";
  reasonCodes: string[];
  requiredApprovalIds?: string[];
};

export type ProductApproval = { id: string; status: string };

export interface GovernedButtonProps extends Omit<ButtonProps, "disabled"> {
  policyDecision: ProductPolicyDecision | null;
  approvals?: ProductApproval[];
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

/** Creates the combined UI surface. Its default Button requires a dispatchable kernel decision. */
export function createMaataaProduct(host: typeof React, services: Record<string, unknown> = {}) {
  const kernelComponents = createMaataaReact(host, services);

  const GovernedButton: React.FC<GovernedButtonProps> = ({
    policyDecision,
    approvals = [],
    onAction,
    onClick,
    disabled,
    ...buttonProps
  }) => {
    const allowed = canDispatch({ policyDecision, approvals });
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      if (!canDispatch({ policyDecision, approvals })) return;
      onClick?.(event);
      onAction?.(event);
    };

    return React.createElement(
      VisualButton,
      { ...buttonProps, disabled: disabled || !allowed, onClick: handleClick },
      buttonProps.children
    );
  };

  return Object.freeze({
    ...kernelComponents,
    VisualButton,
    Button: GovernedButton,
    GovernedButton,
  });
}
