"use client";

import type { ComponentPropsWithoutRef } from "react";
import { cx } from "./shared.ts";

const inputBase =
  "w-full rounded-xl border border-[color:var(--maataa-border)] bg-[color:var(--maataa-surface-alt)] px-3 py-2 text-sm text-[color:var(--maataa-text)] outline-none transition placeholder:text-[color:var(--maataa-muted)] focus:border-[color:var(--maataa-primary)]";

export function RuntimeInput({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return <input className={cx(inputBase, className)} {...props} />;
}

export function RuntimeTextarea({ className, ...props }: ComponentPropsWithoutRef<"textarea">) {
  return <textarea className={cx(inputBase, "min-h-28 resize-y", className)} {...props} />;
}

export function RuntimeSelect({ className, ...props }: ComponentPropsWithoutRef<"select">) {
  return <select className={cx(inputBase, className)} {...props} />;
}

export function RuntimeCheckbox({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      type="checkbox"
      className={cx(
        "h-4 w-4 rounded border-[color:var(--maataa-border)] accent-[color:var(--maataa-primary)]",
        className
      )}
      {...props}
    />
  );
}

export function RuntimeSwitch({
  className,
  checked,
  ...props
}: ComponentPropsWithoutRef<"button"> & { checked?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={Boolean(checked)}
      className={cx(
        "inline-flex h-6 w-11 items-center rounded-full border border-[color:var(--maataa-border)] p-0.5 transition",
        checked ? "bg-[color:var(--maataa-primary)]" : "bg-[color:var(--maataa-surface-alt)]",
        className
      )}
      {...props}
    >
      <span
        className={cx(
          "h-[18px] w-[18px] rounded-full bg-[color:var(--maataa-text)] transition",
          checked && "translate-x-5 bg-black"
        )}
      />
    </button>
  );
}
