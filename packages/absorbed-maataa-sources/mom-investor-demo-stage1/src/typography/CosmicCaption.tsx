import type { HTMLAttributes, ReactNode } from "react";

export function CosmicCaption({ children, className = "", ...props }: HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }) {
  return (
    <p className={`cosmic-caption ${className}`.trim()} {...props}>
      {children}
    </p>
  );
}
