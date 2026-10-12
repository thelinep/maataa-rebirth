import React, { useCallback, useState } from "react";
import { cx } from "../utils";

export interface LiveStatusProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "role" | "children"> {
  message: React.ReactNode;
  /** Shown on screen as well as announced; default hides it visually. */
  visible?: boolean;
  /** "assertive" interrupts the screen reader; use only for errors that block the task. */
  politeness?: "polite" | "assertive";
}

/** One live region for confirmations ("Saved", "Added"). Render it once per screen. */
export function LiveStatus({ message, visible = false, politeness = "polite", className, ...rest }: LiveStatusProps) {
  return <p role={politeness === "assertive" ? "alert" : "status"} aria-live={politeness} className={cx(visible ? "m-live-status" : "m-sr-only", className)} {...rest}>{message}</p>;
}

/** Message state for LiveStatus. announce() also re-announces the same text twice in a row. */
export function useAnnouncer(initial = "") {
  const [message, setMessage] = useState(initial);
  const announce = useCallback((text: string) => {
    setMessage((current) => (current === text ? `${text} ` : text));
  }, []);
  return [message, announce] as const;
}
