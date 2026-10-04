import React from "react";
import { cx } from "../utils";

export type AISpaceNavProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceNav({ className, ...props }: AISpaceNavProps) { return <section data-ai-space-region="aispacenav" className={cx("m-ai-space-atom", "m-ai-space-aispacenav", className)} {...props} />; }
