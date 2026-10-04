import React from "react";
import { cx } from "../utils";

export type AISpaceToolsProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceTools({ className, ...props }: AISpaceToolsProps) { return <section data-ai-space-region="aispacetools" className={cx("m-ai-space-atom", "m-ai-space-aispacetools", className)} {...props} />; }
