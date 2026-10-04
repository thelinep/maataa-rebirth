import React from "react";
import { cx } from "../utils";

export type AISpaceCommandBarProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceCommandBar({ className, ...props }: AISpaceCommandBarProps) { return <section data-ai-space-region="aispacecommandbar" className={cx("m-ai-space-atom", "m-ai-space-aispacecommandbar", className)} {...props} />; }
