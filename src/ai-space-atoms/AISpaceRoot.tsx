import React from "react";
import { cx } from "../utils";

export type AISpaceRootProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceRoot({ className, ...props }: AISpaceRootProps) { return <section data-ai-space-region="aispaceroot" className={cx("m-ai-space-atom", "m-ai-space-aispaceroot", className)} {...props} />; }
