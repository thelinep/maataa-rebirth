import React from "react";
import { cx } from "../utils";

export type AISpaceHeaderProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceHeader({ className, ...props }: AISpaceHeaderProps) { return <section data-ai-space-region="aispaceheader" className={cx("m-ai-space-atom", "m-ai-space-aispaceheader", className)} {...props} />; }
