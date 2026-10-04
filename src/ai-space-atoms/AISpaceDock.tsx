import React from "react";
import { cx } from "../utils";

export type AISpaceDockProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceDock({ className, ...props }: AISpaceDockProps) { return <section data-ai-space-region="aispacedock" className={cx("m-ai-space-atom", "m-ai-space-aispacedock", className)} {...props} />; }
