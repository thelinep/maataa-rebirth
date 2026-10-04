import React from "react";
import { cx } from "../utils";

export type ToolTraceProps = React.HTMLAttributes<HTMLElement>;
export function ToolTrace({ className, ...props }: ToolTraceProps) { return <section data-tool-region="tooltrace" className={cx("m-tool-atom", "m-tool-tooltrace", className)} {...props} />; }
