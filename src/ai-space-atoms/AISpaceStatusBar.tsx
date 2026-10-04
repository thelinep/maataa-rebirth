import React from "react";
import { cx } from "../utils";

export type AISpaceStatusBarProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceStatusBar({ className, ...props }: AISpaceStatusBarProps) { return <section data-ai-space-region="aispacestatusbar" className={cx("m-ai-space-atom", "m-ai-space-aispacestatusbar", className)} {...props} />; }
