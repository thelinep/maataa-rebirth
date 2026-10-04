import React from "react";
import { cx } from "../utils";

export type ToolOutputProps = React.HTMLAttributes<HTMLElement>;
export function ToolOutput({ className, ...props }: ToolOutputProps) { return <section data-tool-region="tooloutput" className={cx("m-tool-atom", "m-tool-tooloutput", className)} {...props} />; }
