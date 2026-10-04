import React from "react";
import { cx } from "../utils";

export type AISpaceMainProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceMain({ className, ...props }: AISpaceMainProps) { return <section data-ai-space-region="aispacemain" className={cx("m-ai-space-atom", "m-ai-space-aispacemain", className)} {...props} />; }
