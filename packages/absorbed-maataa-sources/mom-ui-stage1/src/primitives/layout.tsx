"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { ThemeStackInput } from "../../themes/index.ts";
import { cx, panelClass, runtimeStyle } from "./shared.ts";

type DivProps = ComponentPropsWithoutRef<"div">;

export function Layout({ className, children, ...props }: DivProps) {
  return (
    <div
      className={cx("min-h-screen bg-[color:var(--maataa-bg)] text-[color:var(--maataa-text)]", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function RuntimePage({
  children,
  className,
  themeStack,
  title,
  eyebrow,
  description,
  ...props
}: DivProps & {
  themeStack?: ThemeStackInput;
  title?: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
}) {
  return (
    <main
      className={cx(
        "min-h-screen bg-[color:var(--maataa-bg)] px-4 py-6 text-[color:var(--maataa-text)] sm:px-6 lg:px-8",
        className
      )}
      style={runtimeStyle(themeStack, props.style)}
      {...props}
    >
      {(title || eyebrow || description) && (
        <RuntimeContainer className="mb-6">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--maataa-primary)]">
              {eyebrow}
            </p>
          )}
          {title && <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>}
          {description && (
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[color:var(--maataa-muted)] sm:text-base">
              {description}
            </p>
          )}
        </RuntimeContainer>
      )}
      {children}
    </main>
  );
}

export function RuntimeContainer({ className, ...props }: DivProps) {
  return <div className={cx("mx-auto w-full max-w-7xl", className)} {...props} />;
}

export function RuntimeGrid({ className, ...props }: DivProps) {
  return <div className={cx("grid gap-4 sm:grid-cols-2 xl:grid-cols-4", className)} {...props} />;
}

export function RuntimePanel({ className, ...props }: DivProps) {
  return <section className={cx(panelClass, "p-4", className)} {...props} />;
}

export function RuntimeStack({ className, ...props }: DivProps) {
  return <div className={cx("flex flex-col gap-4", className)} {...props} />;
}
