import type { BlockquoteHTMLAttributes, ReactNode } from "react";

export function DharmaQuote({ children, className = "", ...props }: BlockquoteHTMLAttributes<HTMLQuoteElement> & { children: ReactNode }) {
  return (
    <blockquote className={`dharma-quote ${className}`.trim()} {...props}>
      {children}
    </blockquote>
  );
}
