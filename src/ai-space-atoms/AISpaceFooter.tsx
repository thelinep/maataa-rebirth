import React from "react";
import { cx } from "../utils";

export type AISpaceFooterProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceFooter({ className, ...props }: AISpaceFooterProps) { return <section data-ai-space-region="aispacefooter" className={cx("m-ai-space-atom", "m-ai-space-aispacefooter", className)} {...props} />; }
