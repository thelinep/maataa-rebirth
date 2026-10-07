import type { HTMLAttributes, ReactNode } from "react";

export type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function GlassPanel({ children, className = "", ...props }: GlassPanelProps) {
  return (
    <div className={`glass-panel ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
