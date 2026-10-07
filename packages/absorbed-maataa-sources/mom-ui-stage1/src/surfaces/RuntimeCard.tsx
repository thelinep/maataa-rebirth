import type { HTMLAttributes, ReactNode } from "react";

export type RuntimeCardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function RuntimeCard({ children, className = "", ...props }: RuntimeCardProps) {
  return (
    <article className={`runtime-card ${className}`.trim()} {...props}>
      {children}
    </article>
  );
}
