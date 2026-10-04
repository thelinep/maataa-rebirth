import React from "react";
import { cx } from "../utils";

export type ToolRootProps = React.HTMLAttributes<HTMLElement>;
export function ToolRoot({ className, ...props }: ToolRootProps) { return <section data-tool-region="toolroot" className={cx("m-tool-atom", "m-tool-toolroot", className)} {...props} />; }
