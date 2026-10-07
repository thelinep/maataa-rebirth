import type { HTMLAttributes, ReactNode } from "react";

export function SectionLabel({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }) {
  return (
    <p className={`section-label ${className}`.trim()} {...props}>
      {children}
    </p>
  );
}
