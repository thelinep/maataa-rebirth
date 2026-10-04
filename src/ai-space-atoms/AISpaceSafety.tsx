import React from "react";
import { cx } from "../utils";

export type AISpaceSafetyProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceSafety({ className, ...props }: AISpaceSafetyProps) { return <section data-ai-space-region="aispacesafety" className={cx("m-ai-space-atom", "m-ai-space-aispacesafety", className)} {...props} />; }
