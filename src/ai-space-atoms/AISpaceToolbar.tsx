import React from "react";
import { cx } from "../utils";

export type AISpaceToolbarProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceToolbar({ className, ...props }: AISpaceToolbarProps) { return <section data-ai-space-region="aispacetoolbar" className={cx("m-ai-space-atom", "m-ai-space-aispacetoolbar", className)} {...props} />; }
