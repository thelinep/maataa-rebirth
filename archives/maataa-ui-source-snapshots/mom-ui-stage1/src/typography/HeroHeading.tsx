import type { HTMLAttributes, ReactNode } from "react";

export function HeroHeading({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) {
  return (
    <h1 className={`hero-heading ${className}`.trim()} {...props}>
      {children}
    </h1>
  );
}
