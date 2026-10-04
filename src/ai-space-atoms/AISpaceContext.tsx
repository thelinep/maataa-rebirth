import React from "react";
import { cx } from "../utils";

export type AISpaceContextProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceContext({ className, ...props }: AISpaceContextProps) { return <section data-ai-space-region="aispacecontext" className={cx("m-ai-space-atom", "m-ai-space-aispacecontext", className)} {...props} />; }
