import type { AnchorHTMLAttributes, ReactNode } from "react";

export type GlowCardProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function GlowCard({ children, className = "", ...props }: GlowCardProps) {
  return (
    <a className={`glow-card ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}
